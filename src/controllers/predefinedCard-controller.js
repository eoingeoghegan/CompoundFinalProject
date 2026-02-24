// views for each predefined card
export const predefinedCardController = {
  upper: {
    handler: (request, h) => {
      return h.view("predefined-upper-view", { title: "Upper Body Workout" });
    },
  },

  lower: {
    handler: (request, h) => {
      return h.view("predefined-lower-view", { title: "Lower Body Workout" });
    },
  },

  full: {
    handler: (request, h) => {
      return h.view("predefined-full-view", { title: "Full Body Workout" });
    },
  },

  core: {
    handler: (request, h) => {
      return h.view("predefined-core-view", { title: "Core Workout" });
    },
  },
};
