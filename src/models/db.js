/**  memory stores imported
import { userMemoryStore } from "./memory/user-memory-store.js";
import { workoutsMemoryStore } from "./memory/workout-memory.js";
import { exerciseMemoryStore } from "./memory/exercise-memory-store.js";
import { trackerMemoryStore } from "./memory/tracker-memory.js";

*/

// JSON stores imported
import { userJsonStore } from "./json/user-json-store.js";
import { workoutJsonStore } from "./json/workout-json-store.js";
import { exerciseJsonStore } from "./json/exercise-json-store.js";
import { trackerJsonStore } from "./json/tracker-json-store.js";


/**
 * The db object is defined with properties for userStore and workoutStore, exerciseStore, and trackerStore,
 *  all of which are initially set to null. 
 * The init function is responsible for initializing these properties with the corresponding JSON stores,
 * which are set to null.
 */
export const db = {
  userStore: null,
  workoutStore: null,
  exerciseStore: null,
  trackerStore: null,
  

/**
 * Originally this worked by allowing the db to be initialized with the userMemoryStore and workouts MemoryStore, 
 * exercisesMemoryStore, and trackerMemoryStore. Now using JSON stores, the init function sets the userStore,
 *  workoutStore, exerciseStore, and trackerStore properties to the corresponding JSON stores
 * which are imported at the top of the file.
 */

  init() {
    this.userStore = userJsonStore;
    this.workoutStore = workoutJsonStore;
    this.exerciseStore = exerciseJsonStore;
    this.trackerStore = trackerJsonStore;
  
  },
};
