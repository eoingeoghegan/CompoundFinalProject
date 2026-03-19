import Joi from "joi";


export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");


export const UserCredentials = Joi.object()
  .keys({
    email: Joi.string().email().example("eoin@mail.com").required(),
    password: Joi.string().example("a").required(),
  })
  .label("UserCredentials");

// UserValidation is Extension of UserCredentials for adding a user without id in swagger
export const UserValidation = UserCredentials
 .keys({
   firstName: Joi.string().example("Eoin").required(),
   lastName: Joi.string().example("Geoghegan").required(),
})
.label("UserDetails");

// UserFullValidation is extension of UserValidation
export const UserFullValidation = UserValidation.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsFull");

export const UserArray = Joi.array().items(UserFullValidation).label("UserArray");




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
