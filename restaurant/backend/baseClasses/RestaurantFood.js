const { EPOCH_TIME } = require ("@liskhq/lisk-constants");
const { getAddressFromPassphrase } = require ("@liskhq/lisk-cryptography");
const transactions = require("@liskhq/lisk-transactions");
const blockchainClient = require ("../APIClient/blockchainClient");
const FoodRequest = require("../../transactions/FoodTransaction");
const ResultSchema = require("../models/result");
const RestaurantInfo = require("../baseClasses/RestaurantInfo");

class RestaurantFood{            

    constructor(){}

    getTimestamp(){
        const millisSinceEpoc = Date.now() - 8 - Date.parse(EPOCH_TIME);
        const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
        return parseInt(inSeconds);
    }    
    
    getTransactionById(options){
        return blockchainClient.transactions.get(options);
    }      

    broadcastTransaction(transaction){                        
        return blockchainClient.transactions.broadcast(transaction.toJSON());
    }

    broadcastTransaction2(transaction){                        
        return blockchainClient.transactions.broadcast(transaction);
    }

    getAccount(passphrase){
        const address = getAddressFromPassphrase(passphrase);
        return blockchainClient.accounts.get({ address, limit: 1 });
    }        

    async commandFood(passphrase, food, table, request_type, username, phone, deliveryaddress) {        

        food.table= table;
        food.request_type= request_type;
        food.username= username;        
        food.phone= phone;
        food.deliveryaddress= deliveryaddress;
        food.closed= true;

        const txFood = new FoodRequest({
            asset: {
                name: food.name,
                description: food.description,
                username: food.username,
                phone: food.phone,
                deliveryaddress: food.deliveryaddress,
                foodType: food.request_type
            },
            amount: `${transactions.utils.convertLSKToBeddows(food.amount.toString())}`,
            recipientId: RestaurantInfo.getRestaurantAddress(),
            timestamp: this.getTimestamp()
        });

        try{
            txFood.sign(passphrase);            
            ResultSchema.broadcastInfo = await this.broadcastTransaction(txFood);
            ResultSchema.transaction = txFood;   
            console.log(ResultSchema);
        }catch(e){
            console.log(e);
            ResultSchema.transaction = {
                "message": "not completed"
            };
            ResultSchema.broadcastInfo = {
                "meta": {
                  "status": false
                },
                "data": {
                  "message": e
                },
                "links": {}
            }
        }
        
        return ResultSchema;
    }

    async newFoodRequestObject(food, request_type, username, phone, deliveryaddress){        
        food.request_type= request_type;
        food.username= username;        
        food.phone= phone;
        food.deliveryaddress= deliveryaddress;
        
        const txFood = new FoodRequest({
            id: this.getTimestamp(),
            asset: {
                name: food.name,
                description: food.description,
                username: food.username,
                phone: food.phone,
                deliveryaddress: food.deliveryaddress,
                foodType: food.request_type
            },
            amount: `${transactions.utils.convertLSKToBeddows(food.amount.toString())}`,            
            recipientId: RestaurantInfo.getRestaurantAddress(),
            timestamp: this.getTimestamp()
        });

        return txFood;
    }

    async receivedSignedTransactionForBroadcast(txFood){
        try{                                
            ResultSchema.broadcastInfo = await this.broadcastTransaction2(txFood);
            ResultSchema.transaction = txFood;   
            console.log(ResultSchema);
        }catch(e){
            console.log(e);
            ResultSchema.transaction = {
                "message": "not completed"
            };
            ResultSchema.broadcastInfo = {
                "meta": {
                  "status": false
                },
                "data": {
                  "message": e
                },
                "links": {}
            }
        }
        
        return ResultSchema;
    }
}

module.exports = RestaurantFood;