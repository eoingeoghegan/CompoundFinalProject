/**
 * how this works: the adminController has an index handler that checks if the user 
 * is authenticated as an admin by looking for admin credentials in the session. 
 * If the user is not authenticated as an admin, they are redirected to the admin login page. 
 * If they are authenticated, they are shown the admin dashboard view.
 */
import { db } from "../models/db.js";

export const adminController = {
  index: {
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      const viewData = {
        title: "Admin Dashboard",
        users, 
      };

      return h.view("admin-dashboard-view", viewData);
    },
  },
};