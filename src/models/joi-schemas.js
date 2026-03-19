import Joi from "joi";

/**
 * IdSpec works by allows a field to be either a string or an object.
 */
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");



/**
 * UserCredentials works by validating user login credentials.
 * Makes sure:
 *  - email is a valid email string
 *  - password is a non-empty string
 * Used for login forms and endpoints.
 */
export const UserCredentials = Joi.object()
  .keys({
    email: Joi.string().email().example("eoin@mail.com").required(),
    password: Joi.string().example("a").required(),
  })
  .label("UserCredentials");


/**
 * UserValidation extends UserCredentials for creating a new user.
 * Adds these fields:
 *  - firstName: string
 *  - lastName: string
 * Used for payload validation when creating a usr.
 */
export const UserValidation = UserCredentials
 .keys({
   firstName: Joi.string().example("Eoin").required(),
   lastName: Joi.string().example("Geoghegan").required(),
})
.label("UserDetails");

/**
 * UserFullValidation extends UserValidation to include thesefields:
 *  - _id: unique ID of the user
 *  - __v: version number
 */
export const UserFullValidation = UserValidation.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsFull");

export const UserArray = Joi.array().items(UserFullValidation).label("UserArray");



/**
 * ExerciseSpec for validating exercise payloads.
 * Makes sure these fields are correct:
 *  - title: name of the exercise
 *  - equipment: equipment used
 *  - weight: number, optional
 *  - sets: number, optional
 *  - reps: number, optional
 *  - workoutid: ID of the workout this exercise belongs to
 */
export const ExerciseSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Bench Press"),
    equipment: Joi.string().required().example("Barbell"),
    weight: Joi.number().allow("").optional().example(40),
    sets: Joi.number().allow("").optional().example(4),
    reps: Joi.number().allow("").optional().example(12),
    workoutid: IdSpec,
  })
  .label("Exercise");

  /**
 * ExerciseSpecPlus extends ExerciseSpec to include these fields:
 *  - _id: unique ID of the exercise
 *  - __v: version number
 */
export const ExerciseSpecPlus = ExerciseSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ExercisePlus");

export const ExerciseArray = Joi.array().items(ExerciseSpecPlus).label("ExerciseArray");






export const WorkoutTitleSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Back Workout"),
    userid: IdSpec,  
  })
  .label("Workout Title");

export const WorkoutTitleSpecPlus = WorkoutTitleSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("WorkoutPlus");

export const WorkoutArray = Joi.array().items(WorkoutTitleSpecPlus).label("WorkoutArray");
