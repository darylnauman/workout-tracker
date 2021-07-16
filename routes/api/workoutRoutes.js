const router = require('express').Router();
const { Workout } = require('../../models');

// Get all workouts without total duration - for reference
// router.get('/', (req, res) => {
//   Workout.find({})
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     })
//   });

router.get('/', (req, res) => {
  Workout.aggregate([{
      $addFields: {
          totalDuration: {
          $sum: "$exercises.duration"
        }
      }
  }])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});

router.put("/:id", ({body, params}, res) => {
  Workout.findOneAndUpdate(
    {_id: params.id }, 
    {
      $push: {
        exercises: body
      }
    },
    {
      new: true
    }
    )
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

router.post("/", ({body}, res) => {
  Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

router.get("/range", ({body}, res) => {
  Workout.aggregate([{
        $addFields: {
            totalDuration: {
            $sum: "$exercises.duration"
          }
        }
    }]).sort({_id:-1}).limit(7)
      .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      })
});

module.exports = router;