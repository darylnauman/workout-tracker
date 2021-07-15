const router = require('express').Router();
const workoutRoutes = require('./workoutRoutes.js');

router.use('/workouts', workoutRoutes);

module.exports = router;