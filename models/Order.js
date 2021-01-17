const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    order: [{
        title: {
            type: String,
            required: true
        },
        qtty: { 
            type: Number, 
            required: true 
        }
    }],
    totalPrice: { 
        type: Number, 
        required: true 
    },
    date: {
        type: String,
        required: true
    }
  }
);

OrderSchema.methods.getPublicFields = function () {
    return {
        _id: this._id,
        title: this.title,
        totalPrice: this.totalPrice,
        order: this.order,
        date: this.date
    };
};

module.exports = mongoose.model('Order', OrderSchema);
