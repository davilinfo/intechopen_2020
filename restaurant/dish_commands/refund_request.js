const Refund = require("../transactions/RefundTransaction");
const transactions = require("@liskhq/lisk-transactions");
const { EPOCH_TIME } = require("@liskhq/lisk-constants");

const getTimestamp = () => {
    const millisSinceEpoc = Date.now() - Date.parse(EPOCH_TIME);
    const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
    return parseInt(inSeconds);
}

let txRefund = new Refund({
    asset: {
        transactionId: '15511989460955749890'
    },
    amount: `${transactions.utils.convertLSKToBeddows('48')}`,
    recipientId: '16313739661670634666L', //restaurant lisk address
    timestamp: getTimestamp()
});

//signing transaction
txRefund.sign('romance mansion replace police owner inmate angry aware render arrange moon order');

console.log(txRefund.stringify());
process.exit(0);
