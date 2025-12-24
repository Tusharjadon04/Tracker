
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    subType: { type: String, required: true },
    subTypeLabel: { type: String, required: true },
    value: { type: Number, required: true },
    unit: { type: String, required: true },
    emissions: { type: Number, required: true },
    date: { type: String, required: true }, // "YYYY-MM-DD"
  },
  { timestamps: true }
);

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
