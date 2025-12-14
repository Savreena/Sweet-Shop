const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Syrup-based', 'Dry', 'Fried', 'Milk-based', 'Other'],
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please add quantity'],
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Sweet', sweetSchema);
