// event schema
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., comment, follow
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);