const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '',
    },
    quantity: {
      type: Number,
      default: 10,
    },
    price: {
      type: Number,
      default: 0.0,
    },
    coverImg: {
      type: String,
    },
    productCategory: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ProductCategory',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
