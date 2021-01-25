const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

const {addOrder} = require('../controllers/ordersController');

router.get('/', async function(req, res, next) {
  const orderList = await Order.find();
  res.json(orderList);
});

router.post('/', async function(req, res, next) {
  try {
    const body = req.body;
    const order = new Order(body);
    console.log(order)
    await order.save();
    const data = order.getPublicFields();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;


