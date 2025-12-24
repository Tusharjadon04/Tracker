// routes/activityRoutes.js
const express = require('express');
const Activity = require('../models/Activity');
const protect = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user._id }).sort({
      date: -1,
      createdAt: -1,
    });
    res.json(activities);
  } catch (err) {
    console.error('Get activities error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    console.log('Incoming activity body:', req.body);
    const activity = await Activity.create({
      user: req.user._id,
      activityType: req.body.activityType,
      subType: req.body.subType,
      subTypeLabel: req.body.subTypeLabel,
      value: req.body.value,
      unit: req.body.unit,
      emissions: req.body.emissions,
      date: req.body.date,
    });
    console.log('Saved activity:', activity);
    res.status(201).json(activity);
  } catch (err) {
    console.error('Create activity error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    Object.assign(activity, req.body);
    const updated = await activity.save();
    res.json(updated);
  } catch (err) {
    console.error('Update activity error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    await activity.deleteOne();
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    console.error('Delete activity error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

module.exports = router;
