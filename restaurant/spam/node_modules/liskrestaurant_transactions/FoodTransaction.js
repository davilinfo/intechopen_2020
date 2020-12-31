const {
    BaseTransaction,
    TransactionError,
    utils
} = require('@liskhq/lisk-transactions');

class FoodTransaction extends BaseTransaction {

    get sidechainAccountId () {
        return "6181773985994883123L";
    }

    get sidechainFee () {
        return '50000000';
    }

    static get TYPE() {
        return 820;
    }

    static get FEE () {
		return `10000000`;
    };        

    /* Prepare function stores both sender and recipient account in the cache so it is possible to
       modify the accounts during the `applyAsset` and `undoAsset` steps. */
    async prepare(store) {
        await store.account.cache([
            {
                address: this.recipientId,
            },
            {
                address: this.senderId,
            },
            {
                address: this.sidechainAccountId
            }
        ]);
    }

    validateAsset(){
        const errors = [];        

        if(!utils.validateAddress(this.senderId)){
            errors.push(new TransactionError(
                'Invalid client "Lisk address" defined on transaction',
                this.id,
                "client lisk address",
                this.senderId
            ));
        }

        if (!utils.validatePublicKey(this.senderPublicKey)){
            errors.push(new TransactionError(
                'Invalid client "Lisk public key" defined on transaction',
                this.id,
                "client public key",
                this.senderPublicKey
            ));
        }                               

        if (!this.asset.description || typeof this.asset.description !== 'string' || this.asset.name.length > 1500){
            errors.push(
                new TransactionError(
                    'Invalid "description" defined on transaction',
                    this.id,
                    '.asset.description',
                    this.asset.name,
                    'A string value no longer than 1500 characters'
                )
            );
        }

        if (!this.asset.foodType || this.asset.foodType <= 0){
            errors.push(
                new TransactionError(
                    'Invalid "food type" defined on transaction',
                    this.id,
                    '.foodType',
                    this.asset.foodType,
                    'A value bigger than 0'
                )
            );
        }

        if (!this.asset.deliveryaddress){
            errors.push(
                new TransactionError(
                    'Invalid "delivery address" defined on transaction',
                    this.id,
                    '.deliveryaddress',
                    this.asset.deliveryaddress,
                    'A string value bigger than 0'
                )
            );
        }

        if (!this.asset.phone){
            errors.push(
                new TransactionError(
                    'Invalid "phone" defined on transaction',
                    this.id,
                    '.phone',
                    this.asset.phone,
                    'A value bigger than 0'
                )
            );
        }

        if (!this.asset.username){
            errors.push(
                new TransactionError(
                    'Invalid "username" defined on transaction',
                    this.id,
                    '.username',
                    this.asset.username,
                    'A string value bigger than 0'
                )
            );
        }
        
        if (!this.amount || this.amount <= 0){
            errors.push(
                new TransactionError(
                    'Invalid "value" defined on transaction',
                    this.id,
                    '.amount',
                    this.amount,
                    'A value bigger than 0'
                )
            );
        }

        if (!this.asset.clientData || this.asset.clientData.length === 0){
            errors.push(
                new TransactionError(
                    'Invalid "clientData" defined on transaction',
                    this.id,
                    '.clientData',
                    this.amount,
                    'Not empty'
                )
            );
        }

        if (!this.asset.clientNonce || this.asset.clientNonce.length === 0){
            errors.push(
                new TransactionError(
                    'Invalid "clientNonce" defined on transaction',
                    this.id,
                    '.clientNonce',
                    this.amount,
                    'Not empty'
                )
            );
        }

        return errors;
    }

    applyAsset(store){               
        const errors = [];
        
        const sender = store.account.get(this.senderId);

        if (!sender){           
            errors.push(
                new TransactionError(
                    'Invalid "sender", please verify your passphrase',
                    this.id,
                    '.sender',
                    this.senderId,
                    'Verify your passpahrase and address'
                )
            );            
        }

        const senderBalanceDeducted = new utils.BigNum(sender.balance).sub(new utils.BigNum(this.amount));            

        if (senderBalanceDeducted < 0){
            errors.push(
                new TransactionError(
                    'Not enough "balance" for the transaction',
                    this.id,
                    '.amount',
                    this.amount,
                    'Need a balance at least equal than amount'
                )
            );
        }

        const updatedSender = {
            ...sender,
            balance: senderBalanceDeducted.toString()
        }
        store.account.set(sender.address, updatedSender);

        const restaurantAccount = store.account.get(this.recipientId);
        const restaurantBalanceWithFoodRequest = new utils.BigNum(restaurantAccount.balance).add(new utils.BigNum(this.amount)).sub(new utils.BigNum(this.sidechainFee)); 
        
        const updatedRestaurantAccount = {...restaurantAccount, 
            ...{ 
                balance: restaurantBalanceWithFoodRequest.toString(),
                asset: { 
                    name: this.asset.name, 
                    description: this.asset.description, 
                    foodType: this.asset.foodType, 
                    username: this.asset.username, 
                    phone: this.asset.phone, 
                    deliveryaddress: this.asset.deliveryaddress,
                    observation: this.asset.observation,
                    clientData: this.asset.clientData,
                    clientNonce: this.asset.clientNonce
                }
            }
        };        

        store.account.set(restaurantAccount.address, updatedRestaurantAccount);
        
        const sidechainAcc = store.account.get(this.sidechainAccountId);
        const sidechainBalanceWithFee = new utils.BigNum(sidechainAcc.balance).add(new utils.BigNum(this.sidechainFee));
        const updatedSidechainAccount = {
            ...sidechainAcc,
            balance: sidechainBalanceWithFee.toString(),
            asset: {
                message: "fee"
            }
        };

        store.account.set(sidechainAcc.address, updatedSidechainAccount);
                
        return errors;
    }

    /* UndoAsset function tells the blockchain how to rollback changes made in the applyAsset function.
        The original balance for both the sender and restaurant account is restored.
        In addition, the `asset` field for the restaurant account `null` is reseted, as it did not hold any previous data.*/
    /* --- Revert sender account --- */
    undoAsset(store){
        const sender = store.account.get(this.senderId);

        const senderBalanceWithFoodAmount = new utils.BigNum(sender.balance).add(new utils.BigNum(this.amount));
        const updatedSender = {
            ...sender,
            balance: senderBalanceWithFoodAmount.toString()
        };
        store.account.set(sender.address, updatedSender);

        const restaurantAccount = store.account.get(this.recipientId);
        const restaurantBalanceWithFoodRequest = new utils.BigNum(restaurantAccount.balance).sub(new utils.BigNum(this.amount).add(new utils.BigNum(this.sidechainFee)));

        const updatedRestaurantAccount = {...sender, 
            ... { balance: restaurantBalanceWithFoodRequest.toString(),
            asset: null }
        };
        store.account.set(restaurantAccount.address, updatedRestaurantAccount);

        const sidechainAcc = store.account.get(this.sidechainAccount);
        const sidechainBalanceWithoutFee = new utils.BigNum(sidechainAcc.balance).sub(new utils.BigNum(this.sidechainFee));

        const updatedSidechainAccount = {
            ...sidechainAcc,
            balance: sidechainBalanceWithoutFee.toString()
        };

        store.account.set(sidechainAcc.address, updatedSidechainAccount);

        return [];
    }
}

module.exports = FoodTransaction;