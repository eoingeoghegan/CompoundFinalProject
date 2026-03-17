import Mongoose from "mongoose";

const { Schema } = Mongoose;

/**
 * Works by: defining the structure of a tracked workout in MongoDB.
 * Each tracked workout belongs to a user and contains a list of exercises.
 */

/**
 * Works by: defining the structure of a tracked workout in MongoDB.
 *  userid stores the ID of the user who tracked this workout.
 *  workoutid stores the ID of the workout.
 *  workoutTitle keeps the name of the workout at the time it was tracked.
 *  timestamp shows when the workout was done.
 *  exercises is an array of exercises done in this workout 
 *    each exercise has
 *      - title: the name of the exercise,
 *      - equipment: what equipment was used,
 *      - weight: weight lifted,
 *      - sets: number of sets,
 *      - reps: number of repetitions per set.
 * 
 * 
 */

const trackedExerciseSchema = new Schema({
  title: String,
  equipment: String,
  weight: Number,
  sets: Number,
  reps: Number
});

const trackedWorkoutSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  workoutid: {
    type: Schema.Types.ObjectId,
    ref: "Workout"
  },
  workoutTitle: String,
  timestamp: Date,
  exercises: [trackedExerciseSchema]
});

export const TrackedWorkout = Mongoose.model("TrackedWorkout", trackedWorkoutSchema);