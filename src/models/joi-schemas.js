import Joi from "joi";

/**
 * Schemas for validating the forms in the application.
 */
export const JoiValidation = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  
};

export const loginValidation = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};


export const ExercisesValidation = {
  title: Joi.string().required(),
  equipment: Joi.string().required(),
  weight: Joi.number().allow("").optional(),
  sets: Joi.number().allow("").optional(),
  reps: Joi.number().allow("").optional(),
};

export const WorkoutTitleValidation = {
  title: Joi.string().required(),
};