const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Create a new event
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent); // Return the created event
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Error creating event');
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

// Add a participant to an event
router.post('/:id/participants', async (req, res) => {
    const { name, email, responsibilities } = req.body; // Expecting name, email, and responsibilities
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).send('Event not found');
      }
  
      // Ensure the participant does not already exist
      if (event.participants.some(participant => participant.name === name)) {
        return res.status(400).send('Participant already exists');
      }
  
      // Add participant with responsibilities
      event.participants.push({ name, email, responsibilities });
      await event.save();
      res.status(201).json(event); // Return the updated event
    } catch (error) {
      console.error('Error adding participant:', error);
      res.status(500).send('Server error');
    }
  });
  
module.exports = router;
