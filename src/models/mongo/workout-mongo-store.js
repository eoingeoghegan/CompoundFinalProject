// same as exercises-mongo-store.js - methods for the data in mongoDB

import Mongoose from "mongoose";
import { Workout } from "./workout-mongo.js";
import { ExerciseMongoStore } from "./exercises-mongo-store.js";

export const WorkoutMongoStore = {
  async getAllWorkouts() {
    const workouts = await Workout.find().lean();
    return workouts;
  },

  async getWorkoutById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const workout = await Workout.findOne({ _id: id }).lean();
      if (workout) {
        workout.exercises = await ExerciseMongoStore.getExercisesByWorkoutId(workout._id);
      }
      return workout;
    }
    return null;
  },

  async addWorkout(workout) {
    const newWorkout = new Workout(workout);
    const workoutObj = await newWorkout.save();
    return this.getWorkoutById(workoutObj._id);
  },

  async getUserWorkouts(id) {
    const workout = await Workout.find({ userid: id }).lean();
    return workout;
  },

  async deleteWorkoutById(id) {
    try {
      await Workout.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllWorkouts() {
    await Workout.deleteMany({});
  }
};
