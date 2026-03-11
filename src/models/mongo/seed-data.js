/**
 * Seed data that will be added to the application on startup, 
 * For Eoin it will add a custom workout with one exercise entry.
 */
export const seedData = {
  users: {
    _model: "User",
    eoin: {
      firstName: "Eoin",
      lastName: "Geoghegan",
      email: "eoin@mail.com",
      password: "a"
    },
    paul: {
      firstName: "Paul",
      lastName: "Geoghegan",
      email: "paul@mail.com",
      password: "a"
    },
    henry: {
      firstName: "Henry",
      lastName: "Geoghegan",
      email: "henry@mail.com",
      password: "a"
    }
  },

    workouts: {
    _model: "Workout",
    test: {
      title: "Eoin Seed",
      userid: "->users.eoin"
    }
  },
  exercises: {
    _model : "Exercise",
    exercise_1 : {
      title: "Bench Press Seed",
      equipment: "Bench",
      weight: 70,
      sets: 4,
      reps: 10,
      workoutid: "->workouts.test"
    },
  }
};
