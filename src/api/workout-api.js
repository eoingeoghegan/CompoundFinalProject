//Similar to User-api.js which explains how they work.
import { db } from "../models/db.js";

export const workoutApi = {

  create: {
    auth: false,
    handler: async function (request, h) {
        const workout = request.payload;
        const newWorkout = await db.workoutStore.addWorkout(workout);
        if (newWorkout) {
          return h.response(newWorkout).code(201);
      }
    },
    tags: ["api"],
  },


   find: {
    auth: false,
    handler: async function (request, h) {
        const workouts = await db.workoutStore.getAllWorkouts();
        return workouts;
    },
    tags: ["api"],
    description: "Get all WorkoutsApi",
    notes: "Returns details of saved workout titles",
  },

  findOne: {
    auth: false,
    async handler(request) {
        const workout = await db.workoutStore.getWorkoutById(request.params.id);
        return workout;
    },
    tags: ["api"],
  },


  deleteOne: {
    auth: false,
    handler: async function (request, h) {
        const workout = await db.workoutStore.getWorkoutById(request.params.id);
        await db.workoutStore.deleteWorkoutById(workout._id);
        return h.response().code(204);
    },
    tags: ["api"],
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
        await db.workoutStore.deleteAllWorkouts();
        return h.response().code(204);
    },
    tags: ["api"],
  },
};
