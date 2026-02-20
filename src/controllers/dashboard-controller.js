import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const workouts = await db.workoutStore.getAllWorkouts();
      const viewData = {
        title: "Compound Dashboard",
        workouts: workouts,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addWorkout: {
    handler: async function (request, h) {
      const newWorkout = {
        title: request.payload.title,
      };
      await db.workoutStore.addWorkout(newWorkout);
      return h.redirect("/dashboard");
    },
  },
};
