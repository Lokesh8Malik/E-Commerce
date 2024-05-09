const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
router.get('/',adminController.getAdminPage)
router.get('/products/all',adminController.getAllProducts);
router.get('/products/add',adminController.getAddProduct);
router.post('/products/add',adminController.postAddProduct);
router.get('/products/update/:id',adminController.getUpdateProduct);
router.post('/products/update',adminController.postUpdateProduct);
router.get('/products/delete/:id',adminController.getDeleteProduct);

module.exports = router;