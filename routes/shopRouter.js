const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController');

Router.get('/',userController.getShopHomePage);
Router.get('/products/:id',userController.getProductDetails);
Router.get('/cart/add/:id',userController.getAddProductInCart);
Router.get('/cart',userController.getCart);
Router.get('/cart/increase/:id',userController.getIncreaseQuantity);
Router.get('/cart/decrease/:id',userController.getDecreaseQuantity);


module.exports = Router;