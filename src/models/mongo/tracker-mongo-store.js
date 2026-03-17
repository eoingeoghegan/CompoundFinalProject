import Mongoose from "mongoose";
import { TrackedWorkout } from "./tracker-mongo.js";
import { ExerciseMongoStore } from "./exercises-mongo-store.js";


export const trackerMongoStore = {

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
   * NOT WORKING, NEED TO FIX. 
   
  async updateTrackedExercise(workoutId, exerciseId, updatedExercise) {
  const trackedWorkout = await TrackedWorkout.findOne({ _id: workoutId });
  if (!trackedWorkout) return;

  const exercise = trackedWorkout.exercises.id(exerciseId);

  if (exercise) {
    exercise.title = updatedExercise.title;
    exercise.equipment = updatedExercise.equipment;
    exercise.weight = updatedExercise.weight;
    exercise.sets = updatedExercise.sets;
    exercise.reps = updatedExercise.reps;

    await trackedWorkout.save();
  }
},
};
*/ 
/*
async updateTrackedExerciseMongo(workoutId, exerciseId, updatedExercise) {
  // Find the tracked workout by its ID
  const trackedWorkout = await TrackedWorkout.findOne({ _id: workoutId });
  if (!trackedWorkout) {
    console.log("Workout not found");
    return;
  }

  // Find the exercise inside the workout using .find() ??
  const exercise = trackedWorkout.exercises.find(
    e => e._id.toString() === exerciseId.toString()
  );

  if (!exercise) {
    console.log("Exercise not found in workout");
    return;
  }

  // Update 
  exercise.title = updatedExercise.title;
  exercise.equipment = updatedExercise.equipment;
  exercise.weight = updatedExercise.weight;
  exercise.sets = updatedExercise.sets;
  exercise.reps = updatedExercise.reps;

  // ave the tracked workout
  await trackedWorkout.save();
  console.log("Mongo exercise updated successfully");
}
};
*/
};