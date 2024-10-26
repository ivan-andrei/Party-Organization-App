const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String }, // Optional email field for future use
});

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  responsibilities: { type: [String], required: true }, // Changed to an array to hold multiple responsibilities
  participants: { type: [ParticipantSchema], required: true }, // Use the ParticipantSchema here
});

module.exports = mongoose.model('Event', EventSchema);
