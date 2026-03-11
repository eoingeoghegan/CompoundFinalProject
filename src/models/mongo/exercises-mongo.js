/**
 * Mongo Model Schema works by:
 * Defining the structure of Exercises in MongoDB.
 * It gives the fields each exercise will have: title, equipment,
 * weight, sets, and reps. The workoutid links the exercise to a workout
 * using a MongoDB ObjectId reference.
 */
import Mongoose from "mongoose";

const { Schema } = Mongoose;

const exerciseSchema = new Schema({
  title: String,
  equipment: String,
  weight: Number,
  sets: Number,
  reps: Number,
  workoutid: {
    type: Schema.Types.ObjectId,
    ref: "Workout",
  },
});

export const Exercise = Mongoose.model("Exercise", exerciseSchema);