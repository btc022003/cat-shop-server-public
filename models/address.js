const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  receiver: String,
  mobile: String,
  isDefault: {
    type: Boolean,
    default: false
  },
  regions: {
    type: String
  },
  address: {
    type: String
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserAddress', addressSchema);
