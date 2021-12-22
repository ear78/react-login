const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'Enter a first name',
  },
  lastName: {
    type: String,
    required: 'Enter a last name',
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
  created_data: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
