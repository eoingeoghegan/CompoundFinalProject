// memory stores imported
import { userMemoryStore } from "./memory/user-memory-store.js";
import { exercisesMemoryStore } from "./memory/exercises-memory.js";

/**
 * The db object is defined with properties for userStore and exerciseStore, 
 * which are set to null.
 */
export const db = {
  userStore: null,
  exerciseStore: null,

/**
 * This works by allowing the db to be initialized with the userMemoryStore and exercisesMemoryStore,
 * which are imported at the top of the file.
 */

  init() {
    this.userStore = userMemoryStore;
    this.exerciseStore = exercisesMemoryStore;
  },
};
