import { db } from "../models/db.js";

/**
 * How this works: 
 * The trackerController.index handler retrieves the logged-in user's credentials from the request authentication.
 * It then fetches all tracked workouts associated with that user's ID using the database trackerStore.
 * It renders the "tracker-view" with the tracked workouts data.
 */
export const trackerController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const trackedWorkouts =
        await db.trackerStore.getTrackedWorkoutsByUser(loggedInUser._id);

      return h.view("tracker-view", {
        title: "Tracker View",
        trackedWorkouts: trackedWorkouts,
      });
    },
  },

  /**
   *  How this works:
   * The deleteTrackedWorkout handler receives a request with a tracked workout ID parameter.
   * It calls the trackerStore.deleteTrackedWorkout method to remove the tracked workout from the database.
   * After deletion, it redirects the user back to the tracker view.
   */
  deleteTrackedWorkout: {
  handler: async function(request, h) {
    await db.trackerStore.deleteTrackedWorkout(request.params.id);
    return h.redirect("/tracker");
  },
},

/**
 *  How this works:
 * The editTrackedExerciseView handler receives a request with tracked workout and exercise ID parameters.
 * It gets the tracked workout and finds the specific exercise within it.
 * It then renders the "edit-tracked-workout-view" with the workout and exercise data.
 */
editTrackedWorkoutView: {
  handler: async function(request, h) {
    const workout = await db.trackerStore.getTrackedWorkoutById(request.params.id);
    const exercise = workout.exercises.find(e => e._id === request.params.exerciseid);

    return h.view("edit-tracked-workout-view", {
      title: "Edit Tracked Exercise",
      workout: workout,
      exercise: exercise
    });
  }
},

/**
 *  How this works:
 * The updateTrackedExercise handler receives a request with tracked workout and exercise ID parameters.
 * It constructs an updated exercise object from the request payload.
 * It calls the trackerStore.updateTrackedExercise method to update the exercise in the database.
 * After updating, it redirects the user back to the tracker view.
 */
updateTrackedExercise: {
  handler: async function(request, h) {

    const updatedExercise = {
      title: request.payload.title,
      equipment: request.payload.equipment,
      weight: request.payload.weight,
      sets: request.payload.sets,
      reps: request.payload.reps
    };
   // works by: calling the updateTrackedExercise method in the trackerStore, passing in the tracked workout ID, exercise ID, and the updated exercise data.
    await db.trackerStore.updateTrackedExercise(request.params.id, request.params.exerciseid, updatedExercise);
    return h.redirect("/tracker");
  }
},
};