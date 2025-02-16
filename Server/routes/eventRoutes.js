const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

router.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

module.exports = router;
