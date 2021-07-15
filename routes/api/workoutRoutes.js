const router = require('express').Router();
const { Workout } = require('../../models');

// Add exercises to the most recent workout plan. DONE
// Add new exercises to a new workout plan.
// View the combined weight of multiple exercises from the past seven workouts on the stats page.
// View the total duration of each workout from the past seven workouts on the stats page.

// CLIENT SIDE
// async getLastWorkout() {
//   let res;
//   try {
//     res = await fetch("/api/workouts");
//   } catch (err) {
//     console.log(err)
//   }
//   const json = await res.json();

//   return json[json.length - 1];
// }

router.get('/', (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    })
  });

// CLIENT SIDE
// async addExercise(data) {
//   const id = location.search.split("=")[1];

//   const res = await fetch("/api/workouts/" + id, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
//   const json = await res.json();
//   return json;
// },

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

// CLIENT SIDE
// async createWorkout(data = {}) {
//   const res = await fetch("/api/workouts", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" }
//   });

//   const json = await res.json();

//   return json;
// },

// TO DO FIX ROUTE
router.post("/api/workouts/", ({body}, res) => {
  db.Workout.create(body)
  // .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true })) -- maybe not needed
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

// CLIENT SIDE
// async getWorkoutsInRange() {
//   const res = await fetch(`/api/workouts/range`);
//   const json = await res.json();

//   return json;
// },

router.get("/api/workouts/range", ({body}, res) => {
  db.Workout.find(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

module.exports = router;