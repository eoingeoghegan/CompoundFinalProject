//Similar to User-api.js which explains how they work.

import { db } from "../models/db.js";

export const exerciseApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      
        const exercises = await db.exerciseStore.getAllExercises();
        return exercises;
    },
     tags: ["api"],
  },

  findOne: {
    auth: false,
    async handler(request) {
        const exercise = await db.exerciseStore.getExerciseById(request.params.id);
        return exercise;
    },
    tags: ["api"],
    description: "Get all ExercisesApi",
    notes: "Returns all exercises",
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      
        const exercise = await db.exerciseStore.addExercise(request.params.id, request.payload);
        if (exercise) 
          return h.response(exercise).code(201);
    },
    tags: ["api"],
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      
        await db.exerciseStore.deleteAllExercises();
        return h.response().code(204);
    },
    tags: ["api"],
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
        const exercise = await db.exerciseStore.getExerciseById(request.params.id);
        
        await db.exerciseStore.deleteExercise(exercise._id);
        return h.response().code(204);
    },
    tags: ["api"],
  },
};
