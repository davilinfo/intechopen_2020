const transactions = require('@liskhq/lisk-transactions');
const { EPOCH_TIME } = require ("@liskhq/lisk-constants");
const { APIClient } = require('@liskhq/lisk-api-client');

const api = new APIClient(['http://localhost:4000']);

const getTimestamp = () => {
    const millisSinceEpoc = Date.now() - Date.parse(EPOCH_TIME);
    const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
    return parseInt(inSeconds);
}

var address = "12155463429267245415L";
let tx = new transactions.TransferTransaction({
    amount: transactions.utils.convertLSKToBeddows('200000'),
    recipientId: address,
    timestamp: getTimestamp()
});

tx.sign('wagon stock borrow episode laundry kitten salute link globe zero feed marble');

var address2 = "6181773985994883123L";
let tx2 = new transactions.TransferTransaction({
    amount: transactions.utils.convertLSKToBeddows('200000'),
    recipientId: address2,
    timestamp: getTimestamp()
});

tx2.sign('wagon stock borrow episode laundry kitten salute link globe zero feed marble');

var address3 = "6181773985994883123L";
let tx3 = new transactions.TransferTransaction({
    amount: transactions.utils.convertLSKToBeddows('100000'),
    recipientId: address3,
    timestamp: getTimestamp()
});

tx3.sign('dose air feed panther chalk rose couple sheriff strong clock mass help');
console.log(tx.stringify());
console.log(tx2.stringify());
console.log(tx3.stringify());
process.exit(0);
