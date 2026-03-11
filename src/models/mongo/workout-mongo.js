// same as exercise-mongo.js - strcuture for workout in MongoDB

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const workoutSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Workout = Mongoose.model("Workout", workoutSchema);