import { userApi } from "./api/user-api.js";
import { workoutApi } from "./api/workout-api.js";
import { exerciseApi } from "./api/exercise-api.js";

import { trackedWorkoutApi } from "./api/tracker-api.js";


// routes to get information from the db from endpoints
export const apiRoutes = [

    //Users 
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  //Workouts 
  { method: "POST", path: "/api/workouts", config: workoutApi.create },
  { method: "DELETE", path: "/api/workouts", config: workoutApi.deleteAll },
  { method: "GET", path: "/api/workouts", config: workoutApi.find },
  { method: "GET", path: "/api/workouts/{id}", config: workoutApi.findOne },
  { method: "DELETE", path: "/api/workouts/{id}", config: workoutApi.deleteOne },

  // Exercises
  { method: "POST", path: "/api/workouts/{id}/exercises", config: exerciseApi.create },
  { method: "DELETE", path: "/api/exercises", config: exerciseApi.deleteAll },
  { method: "GET", path: "/api/exercises", config: exerciseApi.find },
  { method: "GET", path: "/api/exercises/{id}", config: exerciseApi.findOne },
  { method: "DELETE", path: "/api/exercises/{id}", config: exerciseApi.deleteOne },

  { method: "POST", path: "/api/trackedworkouts", config: trackedWorkoutApi.create },
  { method: "GET", path: "/api/trackedworkouts", config: trackedWorkoutApi.find },
  { method: "GET", path: "/api/trackedworkouts/{id}", config: trackedWorkoutApi.findOne },
  { method: "DELETE", path: "/api/trackedworkouts/{id}", config: trackedWorkoutApi.deleteOne },
  { method: "DELETE", path: "/api/trackedworkouts", config: trackedWorkoutApi.deleteAll },

];