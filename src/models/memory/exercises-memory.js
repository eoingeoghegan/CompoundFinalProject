import { v4 as uuidv4 } from "uuid";
// exercise starts off as blank array
let exercises = [];

export const exercisesMemoryStore = {
  async getAllExercises() {
    return exercises;
  },

  /**
   * generates a unique id, adds the id to the exercise, pushes the exercise object 
   * to the exercises array, and then returns the exercise with the new id.
   */
  async addExercise(exercise) {
    exercise._id = uuidv4();
    exercises.push(exercise);
    return exercise;
  },

  // finds the exercise by id and returns it.
  async getExerciseById(id) {
    return exercises.find((exercise) => exercise._id === id);
  },

/**
 * finds the exercise by its id, gets the index of the exercise in the array,
 *  and then removes it from the array. 
 */ 
  async deleteExerciseById(id) {
    const index = exercises.findIndex((exercise) => exercise._id === id);
    exercises.splice(index, 1);
  },

  async deleteAllExercises() {
    exercises = [];
  },
};
