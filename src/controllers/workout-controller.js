import { db } from "../models/db.js";

import { ExercisesValidation } from "../models/joi-schemas.js";

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
    validate: {
      payload: ExercisesValidation,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("workouts-view", { title: "Add Exercise error", errors: error.details }).takeover().code(400);
      },
    },
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

  /**
   *  How this works:
   * The editExerciseView handler receives a request with an exercise ID parameter.
   * It retrieves the exercise by its ID using the exerciseStore.
   * It then renders the "edit-exercise-view" with the exercise data.
   */
  editExerciseView: {
  handler: async function(request, h) {
    const exercise = await db.exerciseStore.getExerciseById(request.params.exerciseid);
    return h.view("edit-exercise-view", {
      title: "Edit Exercise",
      exercise: exercise,
    });
  }
},

/**
 * How this works: 
 * The updateExercise handler receives a request with an exercise ID parameter.
 * It retrieves the exercise by its ID using the exerciseStore.
 * It constructs an updated exercise object from the request payload.
 * It calls the exerciseStore.updateExercise method to update the exercise in the database.
 * After updating, it redirects the user back to the workout page.
 */
  updateExercise: {
  handler: async function(request, h) {
    const exercise = await db.exerciseStore.getExerciseById(request.params.exerciseid);
    const updatedExercise = {
      title: request.payload.title,
      description: request.payload.description,
      equipment: request.payload.equipment,
      weight: request.payload.weight,
      sets: request.payload.sets,
      reps: request.payload.reps,
    };
    await db.exerciseStore.updateExercise(exercise, updatedExercise);
    return h.redirect(`/workout/${request.params.id}`);
  }
},

/** 
* requests users credentials, goes to workoutstore to get the workout by id.
* then adds the workout to the tracker store with user id + workout info.
* User redirected to tracker tab to see tracked workout.
*/
  trackWorkout: {
  handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
    const workout = await db.workoutStore.getWorkoutById(request.params.id);
    await db.trackerStore.addTrackedWorkout(loggedInUser._id, workout);
    return h.redirect("/tracker");
  },
},

/** 
 * How this works: 
 * The workoutEditView handler receives a request with a workout ID parameter.
 * It retrieves the workout by its ID using the workoutStore.
 * It then renders the "edit-workout-view" with the workout data.
*/
workoutEditView: {
  handler: async function (request, h) {
    const workout = await db.workoutStore.getWorkoutById(request.params.id);

    return h.view("edit-workout-view", {
      title: "Edit Workout",
      workout: workout,
    });
  },
},

/**
 * How this works:
 * The updateWorkoutTitle handler receives a request with a workout ID parameter and a new title in the payload.
 * It calls the workoutStore.updateWorkoutTitle method to update the title of the workout in the database.
 * After updating, it redirects the user back to the dashboard page.
 */
updateWorkoutTitle: {
  handler: async function (request, h) {
    await db.workoutStore.updateWorkoutTitle(request.params.id, request.payload.title);  
    return h.redirect("/dashboard");
  },
},
};

 