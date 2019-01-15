const express = require('express');
const router = express.Router();
const passport = require('passport');

const product = require('./controllers/products.controller');
const order = require('./controllers/orders.controller');
const auth = require('./controllers/auth.controller');



router.get('/', (req, res) => {
    res.send('The app is up and running!');
});

router.get('/api/products', product.all_products);

router.get('/api/product/:id', product.product_by_id);

router.get('/api/orders/', order.all_orders);

router.get('/api/order/:orderid', order.cart_items);

router.get('/api/order/:orderid/modify/', order.modify_items);

router.post('/api/order/', order.place_order);

router.post('/api/order/cancel/', order.cancel_order);

router.post('/api/login/', passport.authenticate('local'), auth.login);


module.exports = router