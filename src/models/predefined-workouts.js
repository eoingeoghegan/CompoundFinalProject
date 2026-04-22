/**
 * This is the predefined workout cards. I moved it to here and removed the hardcoded views for each type.
 * Now they are all in the one place, and exported so can be used in the controller. 
 * 
 * The values are hardcoded here, but i've updated the app to allow the user to input their own values
 * for weight, sets and reps.
 * 
 * 
 * getPredefinedWorkout(type): looks for the workout type, this is for the routes so can find the workout dynamically.
 * Basic for now but working and will try edit later for shorter code.
 */


export const predefinedWorkouts = {
  upper: {
    name: "upper",
    title: "Upper Body Workout",
    exercises: [
      { title: "Bench Press", equipment: "Barbell", weight: 60, sets: 4, reps: 8 },
      { title: "Shoulder Press", equipment: "Dumbbells", weight: 20, sets: 3, reps: 10 },
      { title: "Lat Pulldown", equipment: "Cable Machine", weight: 50, sets: 3, reps: 12 },
      { title: "Bicep Curls", equipment: "Dumbbells", weight: 12, sets: 3, reps: 12 },
      { title: "Tricep Pushdown", equipment: "Cable Machine", weight: 35, sets: 3, reps: 12 },
    ],
  },
  lower: {
    name: "lower",
    title: "Lower Body Workout",
    exercises: [
      { title: "Barbell Squat", equipment: "Barbell", weight: 80, sets: 4, reps: 6 },
      { title: "Leg Press", equipment: "Machine", weight: 120, sets: 3, reps: 10 },
      { title: "Romanian Deadlift", equipment: "Barbell", weight: 70, sets: 3, reps: 8 },
      { title: "Leg Curl", equipment: "Machine", weight: 45, sets: 3, reps: 12 },
      { title: "Standing Calf Raises", equipment: "Machine", weight: 60, sets: 4, reps: 15 },
    ],
  },
  full: {
    name: "full",
    title: "Full Body Workout",
    exercises: [
      { title: "Deadlift", equipment: "Barbell", weight: 90, sets: 4, reps: 5 },
      { title: "Bench Press", equipment: "Barbell", weight: 60, sets: 3, reps: 8 },
      { title: "Pull-Ups", equipment: "Bodyweight", weight: 0, sets: 3, reps: 8 },
      { title: "Walking Lunges", equipment: "Dumbbells", weight: 20, sets: 3, reps: 12 },
      { title: "Plank", equipment: "Bodyweight", weight: 0, sets: 3, reps: 45 },
    ],
  },
  core: {
    name: "core",
    title: "Core Workout",
    exercises: [
      { title: "Hanging Leg Raises", equipment: "Pull-Up Bar", weight: 0, sets: 3, reps: 10 },
      { title: "Cable Crunch", equipment: "Cable Machine", weight: 30, sets: 3, reps: 12 },
      { title: "Russian Twists", equipment: "Medicine Ball", weight: 10, sets: 3, reps: 20 },
      { title: "Back Extensions", equipment: "Roman Chair", weight: 0, sets: 3, reps: 12 },
      { title: "Side Plank", equipment: "Bodyweight", weight: 0, sets: 3, reps: 30 },
    ],
  },
};

export function getPredefinedWorkout(type) {
  if (type === "upper") {
    return predefinedWorkouts.upper;
  } else if (type === "lower") {
    return predefinedWorkouts.lower;
  } else if (type === "full") {
    return predefinedWorkouts.full;
  } else if (type === "core") {
    return predefinedWorkouts.core;
  }

  return null;
}