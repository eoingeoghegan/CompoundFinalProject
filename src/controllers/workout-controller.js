import { db } from "../models/db.js";


/**
 *  Workout controller has two functions, index and addExercise.
 * The index gets the workout by id, and then renders the workouts-view with the workout data.
 * addExercise gets the workout by id, creates a new exercise object with the data from the request payload.
 * Redirects to the workout page with the new exercise added to the workout.
*/ 

export const workoutController = {
  index: {
    handler: async function (request, h) {
      const workout = await db.workoutStore.getWorkoutById(request.params.id);
      const viewData = {
        title: "Workout",
        workout: workout,
      };
      return h.view("workouts-view", viewData);
    },
  },

  /**
   * gets the workout by id, request.params.id is the id from the url. Then it creates a new exercise
   * object from form on the workout page. add.exercise takes the workout ID and the object + adds
   * the exercise to the workout.
   */
  addExercise: {
    handler: async function (request, h) {
      const workout = await db.workoutStore.getWorkoutById(request.params.id);
      const newExercise = {
        title: request.payload.title,
        equipment: request.payload.equipment,
        weight: Number(request.payload.weight),
        sets: Number(request.payload.sets),
        reps: Number(request.payload.reps),
      };
      await db.exerciseStore.addExercise(workout._id, newExercise);
      return h.redirect(`/workout/${workout._id}`);
    },
  },

  deleteExercise: {
    handler: async function(request, h) {
      const workout = await db.workoutStore.getWorkoutById(request.params.id);
      await db.exerciseStore.deleteExercise(request.params.exerciseid);
      return h.redirect(`/workout/${workout._id}`);
    },
  },
};

 