const mongoose = require('mongoose');

const shopCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    require: true,
    default: 1,
    min: 1,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ShopCart', shopCartSchema);
