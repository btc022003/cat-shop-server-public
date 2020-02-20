const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
  },
  coverImg: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);
