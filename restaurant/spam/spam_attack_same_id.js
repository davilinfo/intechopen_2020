const axios = require('axios');
const transactions = require('@liskhq/lisk-transactions');
const { EPOCH_TIME } = require ("@liskhq/lisk-constants");
const { exception } = require('console');

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

var address = "12155463429267245415L";
let tx = new transactions.TransferTransaction({    
    amount: transactions.utils.convertLSKToBeddows('200000'),
    recipientId: address,
    timestamp: getTimestamp()    
});

tx.sign('wagon stock borrow episode laundry kitten salute link globe zero feed marble');

setInterval(function(){
    postResult(tx);
}, 100);