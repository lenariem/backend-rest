const mongoose = require('mongoose');
const { Schema } = mongoose;

const MenuItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    allerg: {
        type: String,
        required: true
    },
  }
);

module.exports = mongoose.model('MenuItem', MenuItemSchema);
