/**
 * Works by: importing the JSONFilePreset from lowdb, 
 * creating a new instance of the db using the JSONFilePreset with the path to 
 * the db.json file and an initial structure for the data.
 */
import { JSONFilePreset } from "lowdb/node";

export const db = await JSONFilePreset("src/models/json/db.json", {
  users: [],
  workouts: [],
  exercises: [],
  trackedWorkouts: [],
  
});