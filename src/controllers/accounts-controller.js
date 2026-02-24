// import the db which allows access to the userStore
import { db } from "../models/db.js";

//auth false added to allow access to the login and signup pages without being authenticated.
export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Compound" });
    },
  },

  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Compound" });
    },
  },
  // requests info from the signup form, creates a new user object, adds it to the userStore.
  signup: {
    auth: false,
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      console.log(user, "Created");
      return h.redirect("/login");
    },
  },

  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Compound" });
    },
  },
  /** 
   * gets the email/password from login form, checks if the user exists, if the password is correct
   * and then redirects to the dashboard if successful, or back to the login page if not.
   */

  // validate checks if the user is authenticated by checking the session.id againat the userstore.
   async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },

  /**
   * updated login with cookie for session authentication. 
   * If the user is authenticated, sets the cookie with the user id and redirects to dashboard.
   */
  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },

  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

 
};

