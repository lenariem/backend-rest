const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const env = require('../config/config');
const fs = require('fs');

(async function () {
  /** CONNECT TO MONGO */
  mongoose.connect(env.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:')
  );

  mongoose.connection.on('open', () => {
    console.log(`Connected to the database...`);
  });

  console.log(`First, i will delete all the old users`);


  /** DELETE ALL MENU ITEMS*/
  try {
    await MenuItem.deleteMany({});
    console.log(
      'Removing previous menu items'
    );
  } catch (e) {
    console.log(e);
  }

  /** CREATE MENU FROM DB.JSON */
  
  let dbJson = fs.readFileSync('seed/db.json');
  let db = JSON.parse(dbJson);

  const menuItemPromises = db.menu
    .map(menuItemJson => {
      const menuItem = new MenuItem({
        title: menuItemJson.title,
        price: menuItemJson.price,
        url: menuItemJson.url,
        category: menuItemJson.category,
        descr: menuItemJson.descr,
        allerg: menuItemJson.allerg
      });

      return menuItem.save();
    });

  try {
    await Promise.all(menuItemPromises);
    console.log('Menu items stored in the database!');
  } catch (e) {
    console.log(e);
  }

  const orderPromises = db.orders
    .map(orderJson => {
      const orderItemJson = orderJson.order
      const order = new Order({
        order: orderItemJson,
        totalPrice: orderJson.totalPrice,
        date: orderJson.date
      });

      return order.save();
    });

  try {
    await Promise.all(orderPromises);
    console.log('Orders stored in the database!');
  } catch (e) {
    console.log(e);
  }

  console.log(`I am creating menu items`);
  console.log(`I am creating orders`);

  mongoose.connection.close();
})();
