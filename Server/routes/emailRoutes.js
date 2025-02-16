// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const Email = require('../models/emailModel');

// POST route to save email to database
router.post('/save-email', async (req, res) => {
  try {
    console.log('Email received:', req.body.email); // Debugging log
    const newEmail = new Email({ email: req.body.email });
    await newEmail.save();
    res.status(201).json({ message: 'Email saved successfully!' });
  } catch (error) {
    console.error('Error saving email:', error);
    if (error.code === 11000) {
      res.status(409).json({ message: 'Email already exists.' });
    } else {
      res.status(500).json({ message: 'Server error.' });
    }
  }
});

module.exports = router;
