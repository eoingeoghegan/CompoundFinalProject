import { db } from "../models/db.js";
import { WorkoutArray, IdSpec, WorkoutTitleValidation } from "../models/joi-schemas.js";

import { validationError } from "./logger.js";

export const workoutApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      
        const workouts = await db.workoutStore.getAllWorkouts();
        return workouts;
    },
    tags: ["api"],
    description: "Get all workouts",
    notes: "Returns all workouts",
    response: { schema: WorkoutArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    async handler(request) {
      
        const workout = await db.workoutStore.getWorkoutById(request.params.id);
        return workout;
    },
    tags: ["api"],
    description: "Find a Workout",
    notes: "Returns a workout",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: WorkoutTitleValidation, failAction: validationError },
  },

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
    description: "Create a workout",
    notes: "Returns the newly created workout",
    validate: { payload: WorkoutTitleValidation, failAction: validationError },
    response: { schema: WorkoutTitleValidation, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      
        const workout = await db.workoutStore.getWorkoutById(request.params.id);
        await db.workoutStore.deleteWorkoutById(workout._id);
        return h.response().code(204);
    },
    tags: ["api"],
    description: "Delete a workout",
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      
        await db.vStore.deleteAllWorkouts();
        return h.response().code(204);
    },
    tags: ["api"],
    description: "Delete all Workouts",
  },
};