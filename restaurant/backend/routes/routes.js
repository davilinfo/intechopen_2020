const { Router } = require('express');
const RestaurantController = require('../controllers/RestaurantController');

const routes = Router();

//Query params: request.query  (Filters, sort, pagination)
//Routes params: request.params (identify a resource on edit or remove)
//Body: request.body (creation, change a register, mandatory action)

routes.get('/list', RestaurantController.index)
routes.get('/foodDetail/:id', RestaurantController.foodDetail);
routes.post('/storeQrCode', RestaurantController.storeQrCodeUrlRestaurant);
routes.post('/transaction', RestaurantController.getTransactionById);
routes.post('/refund/', RestaurantController.refund);
routes.post('/userRequest', RestaurantController.store);
routes.post('/clientPayment', RestaurantController.storePayment);
routes.post('/payment', RestaurantController.storePaymentWithPassphrase);
routes.post('/cryptography', RestaurantController.cryptographyText);

module.exports = routes;