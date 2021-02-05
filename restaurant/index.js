const { Application, genesisBlockDevnet, configDevnet } = require ('lisk-sdk');
const FoodTransaction = require('./transactions/FoodTransaction');
const RefundTransaction = require('./transactions/RefundTransaction');
const MenuTransaction = require('./transactions/MenuTransaction');

configDevnet.app.label = 'restaurant-sidechain-app';
configDevnet.components.storage.port = 5435;
configDevnet.components.storage.password = 'lisk';
configDevnet.components.storage.database = 'lisk_dev';
configDevnet.components.storage.host = 'localhost';
configDevnet.modules.http_api.access.public = true;

configDevnet.app.genesisConfig.BLOCK_TIME = 10;

const app = new Application(genesisBlockDevnet, configDevnet);

app.registerTransaction(FoodTransaction);
app.registerTransaction(RefundTransaction);
app.registerTransaction(MenuTransaction);

app.run()
    .then(() => app.logger.info('App started...') )
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });