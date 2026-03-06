import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { exerciseJsonStore } from "./exercise-json-store.js";

export const trackerJsonStore = {
/**
 * works by: reading the db, generating a new UUID for the tracked workout,
 * setting the userid, workoutid, workoutTitle, timestamp, and exercises properties of the
 * tracked workout object, pushing the tracked workout to the trackedWorkouts array in the db, 
 * writing the changes to the db, and returning the newly added tracked workout.
 */
  async addTrackedWorkout(userId, workout) {
    await db.read();

    // Get exercises from template workout
    const exercises = await exerciseJsonStore.getExercisesByWorkoutId(workout._id);

    const trackedWorkout = {
      _id: v4(),
      userid: userId,
      workoutid: workout._id,
      workoutTitle: workout.title,
      timestamp: new Date(),
      exercises: exercises.map(e => ({
        _id: v4(),
        title: e.title,
        equipment: e.equipment,
        weight: e.weight || 0,
        sets: e.sets || 0,
        reps: e.reps || 0
      }))
    };

    db.data.trackedWorkouts.push(trackedWorkout);
    await db.write();

    return trackedWorkout;
  },

  async getTrackedWorkoutsByUser(userId) {
    await db.read();
    return db.data.trackedWorkouts.filter(tw => tw.userid === userId);
  },

  async getTrackedWorkoutById(id) {
    await db.read();
    return db.data.trackedWorkouts.find(tw => tw._id === id);
  },

  async deleteTrackedWorkout(id) {
    await db.read();
    const index = db.data.trackedWorkouts.findIndex(tw => tw._id === id);
    if (index !== -1) {
      db.data.trackedWorkouts.splice(index, 1);
      await db.write();
    }
  },

  async deleteAllTrackedWorkouts() {
    db.data.trackedWorkouts = [];
    await db.write();
  }
};