import { v4 as uuidv4 } from "uuid";

let trackedWorkouts = [];


export const trackerMemoryStore = {

/**
 *Works by creating workout object where the exercises are copied from the object,
 * workout.exercises.map(e => ({ ...e })), works by mapping over the exercises in the worout
 * and creating a new object for each exercise with the same properties. 
 */
  async addTrackedWorkout(userId, workout) {
    const trackedWorkout = {
      _id: uuidv4(),
      userId: userId,
      workoutId: workout._id,
      workoutTitle: workout.title,
      exercises: workout.exercises.map(e => ({ ...e })), 
      timestamp: new Date().toLocaleString(),
    };
    trackedWorkouts.push(trackedWorkout);
    return trackedWorkout;
  },

// gets the tracked workout by user id, filters the tracked workouts to return 
// any that match the user id.
  async getTrackedWorkoutsByUser(userId) {
    return trackedWorkouts.filter(workout => workout.userId === userId);
  },

  async getTrackedWorkoutById(trackedWorkoutId) {
    return trackedWorkouts.find(workout => workout._id === trackedWorkoutId);
  },

  async deleteTrackedWorkout(trackedWorkoutId) {
    const index = trackedWorkouts.findIndex(w => w._id === trackedWorkoutId);
    if (index !== -1) trackedWorkouts.splice(index, 1);
  },

  async deleteAllTrackedWorkouts() {
    trackedWorkouts = [];
  },

  /**
   * How this works: 
   * 1. Find the tracked workout by trackedWorkoutId.
   * 2. If found, find the exercise within that workout by exerciseId.
   * 3. If found, update the exercise with the new values from updatedExercise.
   */
  async updateTrackedExercise(trackedWorkoutId, exerciseId, updatedExercise) {
  const workout = trackedWorkouts.find(w => w._id === trackedWorkoutId);

  if (workout) {
    const exercise = workout.exercises.find(e => e._id === exerciseId);

    if (exercise) {
      exercise.title = updatedExercise.title;
      exercise.equipment = updatedExercise.equipment;
      exercise.weight = updatedExercise.weight;
      exercise.sets = updatedExercise.sets;
      exercise.reps = updatedExercise.reps;
    }
  }
},
};
