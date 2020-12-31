const { encryptMessageWithPassphrase, getAddressAndPublicKeyFromPassphrase } = require ("@liskhq/lisk-cryptography");
const restaurantPassphrase = "unfair canvas settle chief pattern solar three village fat barely mean ethics";
const restaurantAddress = '12155463429267245415L';

class RestaurantInfo {

    static getCryptographedMessage(message){        
        var restaurantClientData = encryptMessageWithPassphrase(
            message, restaurantPassphrase, getAddressAndPublicKeyFromPassphrase(restaurantPassphrase).publicKey
        );

        return restaurantClientData.encryptedMessage .concat("****").concat(restaurantClientData.nonce);
    }

    static getRestaurantAddress(){
        return restaurantAddress;
    }

    static getRestaurantPassphrase(){
        return restaurantPassphrase;
    }

    static getRestaurantPublicKey(){
        return getAddressAndPublicKeyFromPassphrase(restaurantPassphrase).publicKey;
    }
}

module.exports = RestaurantInfo;