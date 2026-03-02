import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { workoutController } from "./controllers/workout-controller.js";  
import { predefinedCardController } from "./controllers/predefinedCard-controller.js"; 
import { trackerController } from "./controllers/tracker-controller.js";

// this works getting the path leading to the controller where the functions are defined, 
// and then we can call the functions in the controller to render the pages.
export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },


  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addworkout", config: dashboardController.addWorkout },
  { method: "GET", path: "/dashboard/deleteworkout/{id}", config: dashboardController.deleteWorkout },

  
  { method: "GET", path: "/workout/{id}", config: workoutController.index },
  { method: "POST", path: "/workout/{id}/addexercise", config: workoutController.addExercise },
  { method: "GET", path: "/workout/{id}/deleteexercise/{exerciseid}", config: workoutController.deleteExercise },
  { method: "POST", path: "/workout/{id}/trackworkout", config: workoutController.trackWorkout },
  { method: "GET", path: "/workout/{id}/edit", config: workoutController.workoutEditView },
  { method: "POST", path: "/workout/{id}/edit", config: workoutController.updateWorkoutTitle },
  { method: "GET", path: "/workout/{id}/editexercise/{exerciseid}", config: workoutController.editExerciseView },
  { method: "POST", path: "/workout/{id}/editexercise/{exerciseid}", config: workoutController.updateExercise },


  { method: "GET", path: "/predefined/upper", config: predefinedCardController.upper },
  { method: "GET", path: "/predefined/lower", config: predefinedCardController.lower },
  { method: "GET", path: "/predefined/full", config: predefinedCardController.full },
  { method: "GET", path: "/predefined/core", config: predefinedCardController.core },
  

  { method: "GET", path: "/tracker", config: trackerController.index },
  { method: "GET", path: "/tracker/delete/{id}", config: trackerController.deleteTrackedWorkout },
  // explain
  { method: "GET", path: "/tracker/{id}/editexercise/{exerciseid}", config: trackerController.editTrackedWorkoutView },
  { method: "POST", path: "/tracker/{id}/editexercise/{exerciseid}", config: trackerController.updateTrackedExercise },

];
