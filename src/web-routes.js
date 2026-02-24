import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { workoutController } from "./controllers/workout-controller.js";  
import { predefinedCardController } from "./controllers/predefinedCard-controller.js"; 

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

  { method: "GET", path: "/predefined/upper", config: predefinedCardController.upper },
  { method: "GET", path: "/predefined/lower", config: predefinedCardController.lower },
  { method: "GET", path: "/predefined/full", config: predefinedCardController.full },
  { method: "GET", path: "/predefined/core", config: predefinedCardController.core },
];
