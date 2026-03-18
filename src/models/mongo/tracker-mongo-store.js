import Mongoose from "mongoose";
import { TrackedWorkout } from "./tracker-mongo.js";
import { ExerciseMongoStore } from "./exercises-mongo-store.js";


export const trackerMongoStore = {

  async getAllTrackedWorkouts() {
      const trackedWorkouts = await TrackedWorkout.find().lean();
      return trackedWorkouts;
    },

  /**
 * works by: retreving exercises by the workoutID ,
 * generating a new UUID for the tracked workout,
 * setting the userid, workoutid, workoutTitle, timestamp, and mapping through exercises
 *  while making a copy of exercises properties of the tracked workout object, it then 
 * stores them inside the tracked workout document.
 * 
 */
  async addTrackedWorkout(userId, workout) {

    const exercises = await ExerciseMongoStore.getExercisesByWorkoutId(workout._id);

    const trackedWorkout = {
      userid: userId,
      workoutid: workout._id,
      workoutTitle: workout.title,
      timestamp: new Date(),
      exercises: exercises.map(e => ({
        title: e.title,
        equipment: e.equipment,
        weight: e.weight || 0,
        sets: e.sets || 0,
        reps: e.reps || 0
      }))
    };

    const newTrackedWorkout = new TrackedWorkout(trackedWorkout);
    const trackedWorkoutObj = await newTrackedWorkout.save();

    return trackedWorkoutObj;
  },

  /**
   * Works by: Searching the database for tracked workouts by their userId. 
   * The find() method gets all workouts where the userid matches the given userId. 
   * The lean() method changes the results into plain JavaScript objects, and the
   * list of tracked workouts is then returned.
   */
  async getTrackedWorkoutsByUser(userId) {
    const trackedWorkouts = await TrackedWorkout.find({ userid: userId }).lean();
    return trackedWorkouts;
  },

  /**
   * Works by: Checking if the ID is a valid MongoDB ObjectId using Mongoose.isValidObjectId(). 
   *  If  it is, it searches for a tracked workout with that _id using findOne(). 
   * The lean() method changes the result into a plain JavaScript object. If the id is not
   * found, the function gives back null instead of querying the database.
   */
  async getTrackedWorkoutById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const trackedWorkout = await TrackedWorkout.findOne({ _id: id }).lean();
      return trackedWorkout;
    }
    return null;
  },

  
  async deleteTrackedWorkout(id) {
    try {
      await TrackedWorkout.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },


  async deleteAllTrackedWorkouts() {
    await TrackedWorkout.deleteMany({});
  },

   /**
    * Works by:
    * It gets a tracked workoutID, an exerciseID,and an updated exercise 
    * object with the new exercise details.
    * It gets the tracked workout from the database using the workout ID.
    * It then gets the exercise inside the workout's exercises array using the exercise ID.
    * The exercise's (title, equipment, weight, sets, and reps) are updated with the new values.
    * The tracked workout document is then saved to the database and the updated tracked workout is returned.
   */
  async updateTrackedExercise(workoutId, exerciseId, updatedExercise) {

  const trackedWorkout = await TrackedWorkout.findById(workoutId);
  const exercise = trackedWorkout.exercises.id(exerciseId);

  exercise.title = updatedExercise.title;
  exercise.equipment = updatedExercise.equipment;
  exercise.weight = updatedExercise.weight;
  exercise.sets = updatedExercise.sets;
  exercise.reps = updatedExercise.reps;

  await trackedWorkout.save();

  return trackedWorkout;
}
};