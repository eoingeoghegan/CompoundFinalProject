import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const exerciseJsonStore = {
  async getAllExercises() {
    await db.read();
    return db.data.exercises;
  },

  /**  
   * works by: reading the db, generating a new UUID for the exercise, 
   * setting the workoutid property to the provided workoutId, pushing the exercise 
   * to the exercises array in the db, writing the changes to the db, 
   * and returning the newly added exercise.
  */
  async addExercise(workoutId, exercise) {
    await db.read();
    exercise._id = v4();
    exercise.workoutid = workoutId;
    db.data.exercises.push(exercise);
    await db.write();
    return exercise;
  },

  /**
   * works by: reading the db, filtering the exercises array to find exercises 
   * that match the provided workout id,
    * and returning the filtered list of exercises.
   */
  async getExercisesByWorkoutId(id) {
    await db.read();
    return db.data.exercises.filter((exercise) => exercise.workoutid === id);
  },

  /**
   * works by: reading the db, finding the exercise in the exercises array that 
   * matches the provided id, and returning that exercise.
   */

  async getExerciseById(id) {
    await db.read();
    return db.data.exercises.find((exercise) => exercise._id === id);
  },

  /** 
   * works by: reading the db, finding the index of the exercise in the exercises array that 
   * matches the provided id, 
   * removing that exercise from the array using splice, and writing the changes back to the db.
  */
  async deleteExercise(id) {
    await db.read();
    const index = db.data.exercises.findIndex((exercise) => exercise._id === id);
    db.data.exercises.splice(index, 1);
    await db.write();
  },

  async deleteAllExercises() {
    db.data.exercises = [];
    await db.write();
  },

  /**
   * works by: updating the properties of the provided exercise object with the values from the
   *  updatedExercise object,
   * and then writing the changes back to the db.
   */
  async updateExercise(exercise, updatedExercise) {
    exercise.title = updatedExercise.title;
    exercise.equipment = updatedExercise.equipment;
    exercise.weight = updatedExercise.weight;
    exercise.sets = updatedExercise.sets;
    exercise.reps = updatedExercise.reps;
    await db.write();
  },
};
