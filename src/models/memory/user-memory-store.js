//to generate unique ids for users
import { v4 as uuidv4 } from "uuid";

// users starts off as blank array, as users are added they will be added to this array.
let users = [];

// gets all users in the array.
export const userMemoryStore = {
  async getAllUsers() {
    return users;
  },

// adds a user to the array with a random id.
  async addUser(user) {
    user._id = uuidv4();
    users.push(user);
    return user;
  },

  // finds the user by id and returns it.
  async getUserById(id) {
    return users.find((user) => user._id === id);
  },

 // find the user by their email address.
  async getUserByEmail(email) {
    return users.find((user) => user.email === email);
  },

  // deletes the user by their id
  async deleteUserById(id) {
    const index = users.findIndex((user) => user._id === id);
    users.splice(index, 1);
  },

  async deleteAll() {
    users = [];
  },
};
