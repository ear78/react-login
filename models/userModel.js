const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

// eslint-disable-next-line max-len
UserSchema.methods.comparePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

module.exports = {
  UserSchema,
};
