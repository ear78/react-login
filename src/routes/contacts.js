const express = require('express');
const CrmModel = require('../../models/crmModel');

const router = express.Router();
const userController = require('../../controllers/userControllers');

// Get contacts
router.get('/contacts', userController.loginRequired, async (req, res) => {
  const contacts = await CrmModel.find();

  try {
    res.send(contacts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create contact
router.post('/contact', userController.loginRequired, async (req, res) => {
  const contact = new CrmModel(req.body);
  const contacts = CrmModel.find();

  try {
    await contact.save();
    res.send(await contacts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get contact by ID
router.get('/contact/:contactId', userController.loginRequired, async (req, res) => {
  const contact = CrmModel.findById({ _id: req.params.contactId });

  try {
    res.send(await contact);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
router.patch('/contact/:contactId', userController.loginRequired, async (req, res) => {
  try {
    await CrmModel.findByIdAndUpdate(req.params.contactId, req.body);
    const contact = await CrmModel.findById({ _id: req.params.contactId });
    res.send(contact);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete
router.delete('/contact/:contactId', userController.loginRequired, async (req, res) => {
  // Delete Contact
  await CrmModel.deleteOne({ _id: req.params.contactId });

  try {
    res.send(`Deleted contact ${req.params.contactId}!`);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
