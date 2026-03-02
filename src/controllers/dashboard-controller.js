import { db } from "../models/db.js";
/**
 * The index now request the users credentials from the session. Then it gets the workouts for that user
 * so it wont be global. Viewdata is updated to include the user and workouts.
 */
export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const workouts = await db.workoutStore.getUserWorkouts(loggedInUser._id);
      const viewData = {
        title: "Compound Dashboard",
        user: loggedInUser,
        workouts: workouts,
      };
      return h.view("dashboard-view", viewData);
    },
  },

/** *
 *  creates a workout object, adds to the store and then redirects the the dashbaord with new data.
 * added loggedInUser so it will be associated with the user that is logged in.
*/
  addWorkout: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newWorkout = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.workoutStore.addWorkout(newWorkout);
      return h.redirect("/dashboard");
    },
  },


/**
 * How this works: 
 * The deleteWorkout handler receives a request with a workout ID parameter.
 * It retrieves the workout by its ID using the workoutStore, then calls the deleteWorkoutById method to remove it from the database.
 * After deletion, it redirects the user back to the dashboard view.
 */
   deleteWorkout: {
    handler: async function (request, h) {
      const workout = await db.workoutStore.getWorkoutById(request.params.id);
      await db.workoutStore.deleteWorkoutById(workout._id);
      return h.redirect("/dashboard");
    },
  },

  
};
