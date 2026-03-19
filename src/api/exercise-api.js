//Similar to User-api.js which explains how they work.

import { db } from "../models/db.js";

import { ExerciseArray, IdSpec, ExerciseSpecPlus, ExerciseSpec } from "../models/joi-schemas.js";

import { validationError } from "./logger.js";

export const exerciseApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      
        const exercises = await db.exerciseStore.getAllExercises();
        return exercises;
    },
     tags: ["api"],
    description: "Get all exercises",
    notes: "Returns all exercises",
    response: { schema: ExerciseArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    async handler(request) {
        const exercise = await db.exerciseStore.getExerciseById(request.params.id);
        return exercise;
    },
    tags: ["api"],
    description: "Get an exercise",
    notes: "Returns an exercise",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ExerciseSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      
        const exercise = await db.exerciseStore.addExercise(request.params.id, request.payload);
        if (exercise) 
          return h.response(exercise).code(201);
    },
    tags: ["api"],
    description: "Create a exercise",
    notes: "Returns the new exercise",
    validate: { payload: ExerciseSpec , failAction: validationError },
    response: { schema: ExerciseSpecPlus , failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      
        await db.exerciseStore.deleteAllExercises();
        return h.response().code(204);
    },
    tags: ["api"],
    description: "Delete all exercises",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
        const exercise = await db.exerciseStore.getExerciseById(request.params.id);
        
        await db.exerciseStore.deleteExercise(exercise._id);
        return h.response().code(204);
    },
    tags: ["api"],
    description: "Delete a excercise by ID",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
