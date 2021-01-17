const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

router.get('/', async function(req, res, next) {
  const menuItemList = await MenuItem.find();
  res.status(200).json(menuItemList);
});

router.get('/:id', async function(req, res, next) {
  console.log(req.params.id)
  const menuItem = await MenuItem.find({ _id: req.params.id});
  res.status(200).json(menuItem);
});

module.exports = router;


