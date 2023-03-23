const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'mongoose-user',
  },
);

module.exports = mongoose.model('User', userSchema);
