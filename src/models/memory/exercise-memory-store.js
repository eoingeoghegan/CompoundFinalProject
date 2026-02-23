import { v4 } from "uuid";

let exercises = [];

export const exerciseMemoryStore = {
  async getAllExercises() {
    return exercises;
  },

  // Add id to exercise and workoutID to exercise, then push to exercises array.
  async addExercise(workoutId, exercise) {
    exercise._id = v4();
    exercise.workoutid = workoutId;
    exercises.push(exercise);
    return exercise;
  },

  // filters exercises by workoutID, then returns the exercises that match the workoutID.
  async getExercisesByWorkoutId(id) {
    return exercises.filter((exercise) => exercise.workoutid === id);
  },
 // filters exercises by id, then returns the exercise that matches the id.
  async getExerciseById(id) {
    return exercises.find((exercise) => exercise._id === id);
  },
  // filters exercises by workoutID, then returns the exercises that match the workoutID.
  async getWorkoutExercises(workoutId) {
    return exercises.filter((exercise) => exercise.workoutid === workoutId);
  },
  
  // filters exercises by id, then deletes the exercise that matches the id.
  async deleteExercise(id) {
    const index = exercises.findIndex((exercise) => exercise._id === id);
    exercises.splice(index, 1);
  },

  async deleteAllExercises() {
    exercises = [];
  },

  // 
  async updateExercise(exercise, updatedExercise) {
    exercise.title = updatedExercise.title;
    exercise.equipment = updatedExercise.equipment;
    exercise.weight = updatedExercise.weight;
    exercise.sets = updatedExercise.sets;
    exercise.reps = updatedExercise.reps;
  },
};
