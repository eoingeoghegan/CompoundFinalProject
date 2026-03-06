/**
 * how this works: the adminController has an index handler that checks if the user 
 * is authenticated as an admin by looking for admin credentials in the session. 
 * If the user is not authenticated as an admin, they are redirected to the admin login page. 
 * If they are authenticated, they are shown the admin dashboard view.
 */
export const adminController = {
  index: {
    handler: async function (request, h) {
      if (!request.auth.credentials || !request.auth.credentials.admin) {
        return h.redirect("/admin/login");
      }

      const viewData = {
        title: "Admin Dashboard",
      };
      return h.view("admin-dashboard-view", viewData);
    },
  },
};