import { db } from "../models/db.js";

// this is the predefined workouts which used to be hardcoded views, now all in one page and importing here.
import { getPredefinedWorkout } from "../models/predefined-workouts.js";


/**
 * How this works:
 * index gets the workout type from the the URL and uses that to find the worokout in predefined-workkouts.js
 * It then renders the view for the workout with the type(upper,lower,full or core).
 * 
 *  */
export const predefinedCardController = {
  index: {
    handler: (request, h) => {
      const workout = getPredefinedWorkout(request.params.type);

      return h.view("predefined-workout-view", {
        title: workout.title,
        workout,
      });
    },
  },



  /**
   * How it works:
   * It looks for the users credentials, then gets the workout type from the path, then gets that predefined workout type.
   * 
   * For loop then itirates through the exericises in the workout and updates the weight,sets and reps with values entered by the user.
   * Then it calls the addTrackedWrokout method in the tracker store to track the workout with the usersID.
   * 
   */
  trackWorkout: {
  handler: async (request, h) => {

    const user = request.auth.credentials;
    const workout = getPredefinedWorkout(request.params.type);


    for (let i = 0; i < workout.exercises.length; i += 1) {
      workout.exercises[i].weight = Number(request.payload.weight[i]) || 0;
      workout.exercises[i].sets = Number(request.payload.sets[i]) || 0;
      workout.exercises[i].reps = Number(request.payload.reps[i]) || 0;
    }

    await db.trackerStore.addTrackedWorkout(user._id, workout);

    return h.redirect("/tracker");
  },
},
};