// route path for application, renders the main.hbs view.
export const dashboardController = {
  index: {
    handler: async function (request, h) {
      return h.view("dashboard-view", {title: "Dashboard"});
    },
  },
};

