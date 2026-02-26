import { db } from "../models/db.js";

/**
 * Request user credentials to render users trcaked workouts, then displays the
 * tracked workouts in the view.
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
};