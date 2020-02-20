const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  no: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  regions: {
    type: String
  },
  address: {
    type: String
  },
  price: {
    type: Number,
    default: 0.00
  },
  isPayed: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
