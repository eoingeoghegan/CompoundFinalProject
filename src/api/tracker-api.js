import { db } from "../models/db.js";

import {IdSpec } from "../models/joi-schemas.js";

import { validationError } from "./logger.js";

export const trackedWorkoutApi = {
  // Get all tracked workouts
  find: {
    auth: false,
    handler: async function (request, h) {
      const trackedWorkouts = await db.trackerStore.getAllTrackedWorkouts();
      return trackedWorkouts;
    },
    tags: ["api"],
    description: "Get all tracked workouts",
    notes: "Returns all tracked workouts with exercises",
  },

  // Get a single tracked workout by ID
  findOne: {
    auth: false,
    handler: async function (request, h) {
      const trackedWorkout = await db.trackerStore.getTrackedWorkoutById(request.params.id);
      return trackedWorkout;
    },
    tags: ["api"],
    description: "Get a tracked workout",
    notes: "Returns a tracked workout with exercises",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  // Create a tracked workout (copying exercises from a workout)
  create: {
    auth: false,
    handler: async function (request, h) {
      // Expecting payload: { workoutId, title }
      const { workoutId, title } = request.payload;

      // Use trackedWorkoutStore to copy the workout exercises
      const trackedWorkout = await db.trackerStore.trackWorkout(workoutId, title);

      if (trackedWorkout) return h.response(trackedWorkout).code(201);
    },
    tags: ["api"],
    description: "Create a tracked workout",
    notes: "Copies exercises from a workout and stores in tracker",
  },

  // Delete all tracked workouts
  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await db.trackerStore.deleteAllTrackedWorkouts();
      return h.response().code(204);
    },
    tags: ["api"],
    description: "Delete all tracked workouts",
  },

  // Delete a single tracked workout by ID
  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const trackedWorkout = await db.trackerStore.getTrackedWorkoutById(request.params.id);
      await db.trackerStore.deleteTrackedWorkout(trackedWorkout._id);
      return h.response().code(204);
    },
    tags: ["api"],
    description: "Delete a tracked workout",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};