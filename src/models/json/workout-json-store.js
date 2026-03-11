import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { exerciseJsonStore } from "./exercise-json-store.js";

export const workoutJsonStore = {
  async getAllWorkouts() {
    await db.read();
    return db.data.workouts;
  },

  async addWorkout(workout) {
    await db.read();
    workout._id = v4();
    db.data.workouts.push(workout);
    await db.write();
    return workout;
  },

  async getWorkoutById(id) {
    await db.read();
    const list = db.data.workouts.find((workout) => workout._id === id);
    list.exercises = await exerciseJsonStore.getExercisesByWorkoutId(list._id);
    return list;
  },

  async getUserWorkouts(userid) {
    await db.read();
    return db.data.workouts.filter((workout) => workout.userid === userid);
  },

  async deleteWorkoutById(id) {
    await db.read();
    const index = db.data.workouts.findIndex((workout) => workout._id === id);
    db.data.workouts.splice(index, 1);
    await db.write();
  },

  async deleteAllWorkouts() {
    db.data.workouts = [];
    await db.write();
  },
};