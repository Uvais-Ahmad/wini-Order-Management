const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

//to retrive all order lists
router.get('/all',orderController.getAll);

router.post('/create' , orderController.create);

router.delete('/delete/:id',orderController.delete);



module.exports = router;