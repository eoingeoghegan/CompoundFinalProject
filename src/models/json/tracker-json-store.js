import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { exerciseJsonStore } from "./exercise-json-store.js";


/**
 * works by: reading the db, retreving exercises by the workoutID ,
 * generating a new UUID for the tracked workout,
 * setting the userid, workoutid, workoutTitle, timestamp, and mapping through exercises
 *  while making a copy of exercises properties of the tracked workout object, 
 * pushing the tracked workout to the trackedWorkouts array in the db, 
 * writing the changes to the db, and returning the newly added tracked workout.
 */
export const trackerJsonStore = {

  async addTrackedWorkout(userId, workout) {
    await db.read();
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

  /**
   *Works by:  Reads the database, filters tracked workouts by userId,
  * and returns all workouts tracked by the specified user.
   */
  async getTrackedWorkoutsByUser(userId) {
    await db.read();
    return db.data.trackedWorkouts.filter(tw => tw.userid === userId);
  },

  /**
   * Works by: reading the database, 
   */
  async getTrackedWorkoutById(id) {
    await db.read();
    return db.data.trackedWorkouts.find(tw => tw._id === id);
  },

  /**
   * Works by: Reading the database and finds the trackedworkout by its id and returns
   * the workout by that id.
   * findIndex() returns the position of the workout in the array. If the workout
   * is not found it returns -1, (index !== -1) checks that the
   * workout exists in the array. If it does, splice() is used to remove that
   * workout from the trackedWorkouts array. The database is then written again
   * to save the updated data. 
   * 
   */
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
  },

  /**
   * Works by: Reading the database and finding the tracked workout
   * by trackedWorkoutId. If the workout exists, it then searches
   * for the exercise inside the workout using the exerciseId.
   * If the exercise is found, the properties (title, equipment, weight,
   * sets, and reps) are updated with the values from updatedExercise. 
   * 
   */ 
  async updateTrackedExercise(trackedWorkoutId, exerciseId, updatedExercise) {
  await db.read();

  const trackedWorkout = db.data.trackedWorkouts.find((tw) => tw._id === trackedWorkoutId);

  if (trackedWorkout) {
    const exercise = trackedWorkout.exercises.find((e) => e._id === exerciseId);

    if (exercise) {
      exercise.title = updatedExercise.title;
      exercise.equipment = updatedExercise.equipment;
      exercise.weight = updatedExercise.weight;
      exercise.sets = updatedExercise.sets;
      exercise.reps = updatedExercise.reps;

      await db.write();
    }
  }
},
  
};