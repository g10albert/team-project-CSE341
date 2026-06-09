const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  tagName: { type: String, required: true, unique: true },
  colorHex: { type: String, default: '#3498db' }
});

module.exports = mongoose.model('Tag', TagSchema);