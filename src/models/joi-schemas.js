import Joi from "joi";


/**
 * Joi Schemas for validating data structures in the application.
 * 
 * IdSpec: Allows either a string or an object to be a valid ID. 
 *    
 * JoiValidation: schema for a User object. 
 *    - makes sure firstName, lastName, email, and password are required strings.
 *    - Used for API responses and form validation the user data.
 * 
 * UserArray: Validates the users- JoiValidation.
 *   
 * 
 * loginValidation: Validates login form payloads.
 *    - Requires email to be a valid email string and password to be a string.
 * 
 * ExercisesValidation: Validates exercise data.
 *    - title and equipment are required strings.
 *    - weight, sets, and reps are optional numbers that can also be empty strings.
 * 
 * WorkoutTitleValidation: Validates a workout title object.
 *    - makes sure the title property is a required string.
 * 
 * 
 */

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");
/**
 * Schemas for validating the forms in the application.
 * 
 * updated JoiValidation for Users for exposing the endpoint 
 */

export const JoiValidation = Joi.object()
 .keys({
   firstName: Joi.string().example("Eoin").required(),
   lastName: Joi.string().example("Geoghegan").required(),
   email: Joi.string().email().example("eoin@mail.com").required(),
   password: Joi.string().example("a").required(), 
   _id: IdSpec,
    __v: Joi.number(),
})
.label("UserDetails");

export const UserArray = Joi.array().items(JoiValidation).label("UserArray");


export const loginValidation = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};


export const ExercisesValidation = Joi.object() 
.keys({
  title: Joi.string().example("Bench Press").required(),
  equipment: Joi.string().example("Barbell").required(),
  weight: Joi.number().allow("").optional().example(20),
  sets: Joi.number().allow("").optional().example(5),
  reps: Joi.number().allow("").optional().example(12),
})
.label("ExerciseJoi");

export const ExerciseArray = Joi.array().items(ExercisesValidation).label("ExerciseArray");



export const WorkoutTitleValidation = Joi.object()
.keys({
  title: Joi.string().example("Back Workout").required(),
})
.label("WorkoutJoi");
export const WorkoutArray = Joi.array().items(WorkoutTitleValidation).label("WorkoutArray");

