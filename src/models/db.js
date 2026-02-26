// memory stores imported
import { userMemoryStore } from "./memory/user-memory-store.js";
import { workoutsMemoryStore } from "./memory/workout-memory.js";
import { exerciseMemoryStore } from "./memory/exercise-memory-store.js";
import { trackerMemoryStore } from "./memory/tracker-memory.js";

/**
 * The db object is defined with properties for userStore and workoutStore, 
 * which are set to null.
 */
export const db = {
  userStore: null,
  workoutStore: null,
  exerciseStore: null,
  trackerStore: null,

/**
 * This works by allowing the db to be initialized with the userMemoryStore and workouts MemoryStore,
 * which are imported at the top of the file.
 */

  init() {
    this.userStore = userMemoryStore;
    this.workoutStore = workoutsMemoryStore;
    this.exerciseStore = exerciseMemoryStore;
    this.trackerStore = trackerMemoryStore;
  },
};
