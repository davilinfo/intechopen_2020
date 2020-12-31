const transaction = require('@liskhq/lisk-transactions');
const {
    BaseTransaction,
    TransactionError,
    utils
} = require('@liskhq/lisk-transactions');

class DeliveryTransaction extends BaseTransaction {
    static get TYPE() {
        return 19;
    }

    static get FEE () {
		return `0`;
    };
    
    async prepare(store) {
        await store.account.cache([
            {
                address: this.recipientId,
            },
            {
                address: this.senderId,
            }
        ]);
    }

    validateAsset(){
        const errors = [];                
        
        if (!this.amount || this.amount <= 0 || 100000000000 < this.amount ){
            errors.push(
                new TransactionError(
                    'Invalid "value" defined on transaction',
                    this.id,
                    '.amount',
                    this.amount,
                    'A value bigger than 0 and smaller than 1000'
                )
            );
        }

        if(!utils.validateAddress(this.recipientId)){
            errors.push(new TransactionError(
                'Invalid client "Lisk address" defined on transaction',
                this.id,
                "client lisk address",
                this.recipientId
            ));
        }              

        if (!this.asset.transactionId){
            errors.push(
                new TransactionError(
                    'Invalid "transactionId" defined on transaction',
                    this.id,
                    '.transactionId',
                    this.asset.transactionId,
                    'A string value bigger than 0'
                )
            );
        }                

        return errors;
    }

    applyAsset(store){            
        const restaurantAccount = store.account.get(this.senderId);
        const restaurantAccountBalanceDeducted= new utils.BigNum(restaurantAccount.balance).sub(new utils.BigNum(this.amount));

        const updatedRestaurant = {
            ...restaurantAccount,
            balance: restaurantAccountBalanceDeducted.toString()
        }
        store.account.set(restaurantAccount.address, updatedRestaurant);

        const delivery = store.account.get(this.recipientId);
        const deliveryPayed = new utils.BigNum(delivery.balance).add(new utils.BigNum(this.amount));

        const deliveryUpdated = {
            ...delivery,
            ...{ balance: deliveryPayed.toString(),
                asset: {
                    transactionId: this.asset.transactionId
                }
            }
        };
        
        store.account.set(delivery.address, deliveryUpdated);
        return [];
    }

    undoAsset(store){
        const restaurantAccount = store.account.get(this.senderId);
        const restaurantAccountWithFoodRequest= new utils.BigNum(restaurantAccount.balance).add(new utils.BigNum(this.amount));

        const updatedRestaurant = {
            ...restaurantAccount,
            balance: restaurantAccountWithFoodRequest.toString()
        }
        store.account.set(restaurantAccount.address, updatedRestaurant);

        const delivery = store.account.get(this.recipientId);
        const deliveryDeducted = new utils.BigNum(delivery.balance).sub(new utils.BigNum(this.amount));

        const deliveryUpdated = {
            ...delivery,
            ...{ balance: deliveryDeducted.toString(),
                asset: null
            }
        };
                
        store.account.set(delivery.address, deliveryUpdated);
        return [];
    }
}

module.exports = DeliveryTransaction;