const Activity =require( "../models/Activity");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  return res.status(401).json({ message: 'No token, authorization denied' });
};


 exports.addActivity = async (req, res) => {
  try {
    const { category, description, emissionValue } = req.body;
    const activity = new Activity({
      userId: req.user._id,
      category,
      description,
      emissionValue,
    });
    await activity.save();
    res.status(201).json({ message: "Activity added successfully", activity });
  } catch (error) {
    res.status(500).json({ message: "Failed to add activity" });
  }
};

// Get all user activities
exports.getUserActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activities" });
  }
};

// Weekly emission aggregation
exports.getWeeklyEmission = async (req, res) => {
  try {
    const weeklyData = await Activity.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: { $week: "$date" },
          totalEmission: { $sum: "$emissionValue" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(weeklyData);
  } catch (error) {
    res.status(500).json({ message: "Aggregation failed" });
  }
};
