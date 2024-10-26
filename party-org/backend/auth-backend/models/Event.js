const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String }, // Optional email field for future use
    responsibilities: { type: [String], required: true }, // Add responsibilities here
  });
  
  const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    participants: { type: [ParticipantSchema], required: true }, // Use the ParticipantSchema here
  });
  
  module.exports = mongoose.model('Event', EventSchema);
  