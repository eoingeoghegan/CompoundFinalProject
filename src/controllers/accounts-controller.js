// import the db which allows access to the userStore
import { db } from "../models/db.js";

// 
export const accountsController = {
  index: {
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Compound" });
    },
  },
  showSignup: {
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Compound" });
    },
  },
  signup: {
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      console.log(user, "Created");
      return h.redirect("/");
    },
  },
  showLogin: {
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Compound" });
    },
  },
  login: {
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      return h.redirect("/");
    },
  },
};

