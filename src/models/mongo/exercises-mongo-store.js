import Mongoose from "mongoose";
import { Exercise } from "./exercises-mongo.js";

/**
 * Works by: Gets all exercises from the MogoDB exercise collection.
 * Uses Mongoose to find every exercise and returns them as plain JavaScript objects.
 */
export const ExerciseMongoStore = {
  async getAllExercises() {
    const exercises = await Exercise.find().lean();
    return exercises;
  },

  /**
   * Works by: Attaching the workoutId to the exercise so it knows which workout it belongs to.
 *  It  is then creating a new exercise document using the Mongoose model.
 * Saving the exercise to the MongoDB database.
 * Returning the saved exercise using its generated ID.
   *
   */
  async addExercise(workoutId, exercise) {
    exercise.workoutid = workoutId;
    const newExercise = new Exercise(exercise);
    const exerciseObj = await newExercise.save();
    return this.getExerciseById(exerciseObj._id);
  },

  
/**
 * Works by:
 * Finding all exercises that belong to a specific workout using the workout ID.
 * Returns the exercises as plain JavaScript objects.
 */
  async getExercisesByWorkoutId(id) {
    const exercises = await Exercise.find({ workoutid: id }).lean();
    return exercises;
  },

  /**
 * Works by: Checking if the ID is a valid MongoDB Id.
 * If it is, the exercise is searched for in the database and returned.
 * If the ID is not valid, it returns null.
 */
  async getExerciseById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const exercise = await Exercise.findOne({ _id: id }).lean();
      return exercise;
    }
    return null;
  },


/**
 * Works by:
 * Deleting an exercise from the database using its ID.
 * If the ID is invalid an error message is shown.
 */
  async deleteExercise(id) {
    try {
      await Exercise.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  /**
 * Works by: deleting every exercise from the database collection.
 */
  async deleteAllExercises() {
    await Exercise.deleteMany({});
  },

  /**
 * Works by:
 * Finding the existing exercise in the database.
 * Updating its fields with the new values provided.
 * Saving the updated exercise back to MongoDB.
 */
  async updateExercise(exercise, updatedExercise) {
    const exerciseDoc = await Exercise.findOne({ _id: exercise._id });
    exerciseDoc.title = updatedExercise.title;
    exerciseDoc.equipment = updatedExercise.equipment;
    exerciseDoc.weight = updatedExercise.weight;
    exerciseDoc.sets = updatedExercise.sets;
    exerciseDoc.reps = updatedExercise.reps;
    await exerciseDoc.save();
  },
};
