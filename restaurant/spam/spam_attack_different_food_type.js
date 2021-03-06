const axios = require('axios');
const transactions = require('@liskhq/lisk-transactions');
const { EPOCH_TIME } = require ("@liskhq/lisk-constants");
const { exception } = require('console');
const cryptography = require('@liskhq/lisk-cryptography');
const FoodRequest = require("liskrestaurant_transactions");

const api = axios.create({
    baseURL : 'https://www.liskrestaurant.com:3334'
});

const getTimestamp = () => {
    const millisSinceEpoc = Date.now() - Date.parse(EPOCH_TIME);
    const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
    return parseInt(inSeconds);
}

const postTransaction = async (tx) => {
    const order = await api.post('/clientPayment', {transaction: tx, networkid: 'identifier'});
    console.log(order);
}

const postResult = async (tx) =>{
    await postTransaction(tx);
}

setInterval(async function(){

var passphrase = 'wagon stock borrow episode laundry kitten salute link globe zero feed marble';
var address = "12155463429267245415L";
let tx = new FoodRequest({
    asset: {
        name: 'not provided by restaurant',
        description: 'no description',
        username: 'client',
        phone: '12345678',
        deliveryaddress: 'delivery address',
        foodType: 0,
        observation: '',
        clientData: 'none',
        clientNonce: 'none',
        key: 'not included',
        keynonce: 'not included',
        clientpublickey: cryptography.getAddressAndPublicKeyFromPassphrase(passphrase).publicKey
    },
    amount: '9',
    recipientId: address, //restaurant lisk address
    timestamp: getTimestamp()
});

tx.sign('wagon stock borrow episode laundry kitten salute link globe zero feed marble');


    await postResult(tx);
}, 100);