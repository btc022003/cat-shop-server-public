const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  order: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1
  },
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Product',
  },
  price: {
    type: Number,
    default: 0.00
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
