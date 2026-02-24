import { exerciseMemoryStore } from "./exercise-memory-store.js";

import { v4 as uuidv4 } from "uuid";
// workouts starts off as blank array
let workouts = [];



export const workoutsMemoryStore = {
  async getAllWorkouts() {
    return workouts;
  },
// retunrd workouts that match the user id
    async getUserWorkouts(userid) {
    return workouts.filter((workout) => workout.userid === userid);
  },


  /**
   * generates a unique id, adds the id to the workout, pushes the workout object 
   * to the workouts array, and then returns the workout with the new id.
   */
  async addWorkout(workout) {
    workout._id = uuidv4();
    workouts.push(workout);
    return workout;
  },

  // finds the workout by its id, then gets the exercises for that workout and 
  // adds them to the workout object before returning it.
  async getWorkoutById(id) {
    const list = workouts.find((workout) => workout._id === id);
    list.exercises = await exerciseMemoryStore.getExercisesByWorkoutId(list._id);
    return list;
  },

 
/**
 * finds the workout by its id, gets the index of the workout in the array,
 *  and then removes it from the array. 
 */ 
  async deleteWorkoutById(id) {
    const index = workouts.findIndex((workout) => workout._id === id);
    workouts.splice(index, 1);
  },

  async deleteAllWorkouts() {
    workouts = [];
  },
};
