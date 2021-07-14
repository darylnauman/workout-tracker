const router = require('express').Router();
const path = require("path");
const { Workout } = require('../models');

router.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, '../public/exercise.html')));

router.get('/stats', (req, res) => res.sendFile(path.join(__dirname, '../public/stats.html')));

// router.get('/', (req, res) => {
//   Workout.find({})
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//       console.log(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     })
//   });

module.exports = router;