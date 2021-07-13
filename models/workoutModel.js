const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercise: [
    {
      type: {
        type: String,
        required: "Exercise type is required.",
        trim: true
      },
      name: {
        type: String,
        require: "Exercise name is required.",
        trim: true
      },
      duration: {
        type: Number,
        require: "Exercise duration is required."
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      }
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;