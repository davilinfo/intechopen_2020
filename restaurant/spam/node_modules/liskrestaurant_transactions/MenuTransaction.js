const transaction = require('@liskhq/lisk-transactions');
const {
    BaseTransaction,
    TransactionError,
    utils
} = require('@liskhq/lisk-transactions');

class MenuTransaction extends BaseTransaction {
    static get TYPE() {
        return 800;
    }

    static get FEE () {
		return `100000000`;
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
                
        if(!utils.validateAddress(this.recipientId)){
            errors.push(new TransactionError(
                'Invalid client "Lisk address" defined on transaction',
                this.id,
                "client lisk address",
                this.senderId
            ));
        }              

        if (!this.asset.items){
            errors.push(
                new TransactionError(
                    'Restaurant menu should include food and/or beverages. Please include at least some item',
                    this.id,
                    '.asset.items',
                    this.asset.items,
                    'A collection of menu items of a restaurant menu'
                )
            )
        }

        for (var index=0; index < this.asset.items.length; index ++){

            if (!this.asset.items[0].name || typeof this.asset.items[index].name !== 'string' || this.asset.items[index].length > 200){
                errors.push(
                    new TransactionError(
                        'Invalid "name" defined on transaction',
                        this.id,
                        '.name',
                        this.asset.items[index].name,
                        'A string value no longer than 200 characters'
                    )
                );
            }
    
            if (!this.asset.items[index].description || typeof this.asset.items[index].description !== 'string' || this.asset.items[index].description.length > 2000){
                errors.push(
                    new TransactionError(
                        'Invalid "description" defined on transaction',
                        this.id,
                        '.description',
                        this.asset.items[index].description,
                        'A string value no longer than 2000 characters'
                    )
                );
            }
    
            if (!this.asset.items[index].price || this.asset.items[index].price < 0 ){
                errors.push(
                    new TransactionError(
                        'Invalid "price" defined on transaction',
                        this.id,
                        '.price',
                        this.asset.items[index].price,
                        'A number value bigger than 0'
                    )
                );
            }
    
            if (!this.asset.items[index].discount || this.asset.items[index].discount < 0 ){
                errors.push(
                    new TransactionError(
                        'Invalid "discount" defined on transaction',
                        this.id,
                        '.discount',
                        this.asset.items[index].discount,
                        'A number value bigger than or equal 0'
                    )
                );
            }
    
            if (!this.asset.items[index].type){
                errors.push(
                    new TransactionError(
                        'Invalid "type" defined on transaction',
                        this.id,
                        '.type',
                        this.asset.items[index].type,
                        'A number value bigger than 0'
                    )
                );
            }

            if (!this.asset.items[index].category){
                errors.push(
                    new TransactionError(
                        'Invalid "category" defined on transaction',
                        this.id,
                        '.category',
                        this.asset.items[index].category,
                        'A number value bigger than 0'
                    )
                );
            }

            if (!this.asset.items[index].img){
                errors.push(
                    new TransactionError(
                        'Invalid "img" defined on transaction',
                        this.id,
                        '.img',
                        this.asset.items[index].img,
                        'A string http address of the food image'
                    )
                );
            }

            if (this.senderId !== this.recipientId){
                errors.push(
                    new TransactionError(
                        'Invalid "recipient" defined on transaction',
                        this.id,
                        '.recipientId',
                        this.recipientId,
                        'Only the restaurant can define its own food menu.'
                    )
                );
            }

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

        const client = store.account.get(this.recipientId);
        const clientRestaurant = new utils.BigNum(client.balance).add(new utils.BigNum(this.amount));

        const clientUpdated = {
            ...client,
            ...{ balance: clientRestaurant.toString(),
                asset: {
                    transactionId: this.asset.transactionId
                }
            }
        };
        
        store.account.set(client.address, clientUpdated);
        return [];
    }

    undoAsset(store){
        const restaurantAccount = store.account.get(this.senderId);
        const restaurantAccountWithMenuRequest= new utils.BigNum(restaurantAccount.balance).add(new utils.BigNum(this.amount));

        const updatedRestaurant = {
            ...restaurantAccount,
            balance: restaurantAccountWithMenuRequest.toString()
        }
        store.account.set(restaurantAccount.address, updatedRestaurant);

        const client = store.account.get(this.recipientId);
        const clientDeducted = new utils.BigNum(client.balance).sub(new utils.BigNum(this.amount));

        const clientUpdated = {
            ...client,
            ...{ balance: clientDeducted.toString(),
                asset: null
            }
        };
                
        store.account.set(client.address, clientUpdated);
        return [];
    }
}

module.exports = MenuTransaction;