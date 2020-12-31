const Menu = require("../transactions/MenuTransaction");
const transactions = require("@liskhq/lisk-transactions");
const { EPOCH_TIME } = require("@liskhq/lisk-constants");

const getTimestamp = () => {
    const millisSinceEpoc = Date.now() - Date.parse(EPOCH_TIME);
    const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
    return parseInt(inSeconds);
}

let txMenu = new Menu({
    asset: {
        items: [
            {
                "name": "oysters entrance",
                "description": "12 fresh oysters served in a plate",
                "img": "images/ostras-in-natura.jpg",
                "price": 50,
                "discount": 1, 
                "type": 1,
                "category": 1
            },
            {
                "name": "cooked moules entrance",
                "description": "Several cooked fresh moules à la creme",
                "img": "images/moulmari.jpg",
                "price": 40,
                "discount": 1, 
                "type": 2,
                "category": 1
            },
            {
                "name": "vanilla ice cream dessert",
                "description": "vanilla ice cream with strawberry syrup",
                "img": "images/vanilla_icecream_strawberry_syrup.jpg",
                "price": 10,
                "discount": 1,
                "type": 3,
                "category": 3
            },
            {
                "name": "Ribs on the barbecue + vanilla ice cream dessert",
                "description": "10 baked ribs on the barbecue sauce + vanilla ice cream with strawberry syrup",
                "img": "images/ribs_on_the_barbie.jpg",
                "price":50,
                "discount":0.3,
                "type": 4,
                "category": 2
            },
            {
                "name": "oysters with baked cheese entrance",
                "description": "12 fresh oysters with baked cheeses served in a plate",
                "img": "images/oysters_gratines_aux_fromages.jpg",
                "price":70,
                "discount":1,
                "type": 5,
                "category": 1
            },
            {
                "name": "oysters with baked cheese entrance + ribs on the barbecue + vanilla ice cream dessert",
                "description": "12 fresh oysters with baked cheeses served in a plate + 10 baked ribs on the barbecue sauce + vanilla ice cream with strawberry syrup",
                "img": "images/baked-oysters-plus-ribs.jpg",
                "price": 120,
                "discount": 0.3,
                "type": 6,
                "category": 2
            },
            {
                "name": "Heineken beer can",
                "description": "Heineken beer can",
                "img": "images/heineken_can.jpg",
                "price": 3,
                "discount": 1,
                "type": 7,
                "category": 4
            },
            {
                "name": "Bottle of water",
                "description": "Bottle of water",
                "img": "images/bottle_water.jpg",
                "price": 2,
                "discount": 1,
                "type": 8,
                "category": 4
            }
        ]
    },
    amount: `${transactions.utils.convertLSKToBeddows('0')}`,
    recipientId: '12155463429267245415L',
    timestamp: getTimestamp()
});

//signing transaction
txMenu.sign('unfair canvas settle chief pattern solar three village fat barely mean ethics');

console.log(txMenu.stringify());
process.exit(0);
