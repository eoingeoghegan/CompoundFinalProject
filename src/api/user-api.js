// imports the database - mongoDB 
import { db } from "../models/db.js";


/**
 * How it works: in api-routes it is POST to this route, On Postman for example
 * if I did POST http://localhost:3000/api/users and added a new user using
{
  "firstName": "John",
  "lastName": "Geoghegan",
  "email": "john@mail.com",
  "password": "a"
 } 
  
 * then this would read the create method below, add the user to the DB and return a code to
 * confirm creation of user.
 * 
 * tags show the api end point on localhost:3000/documentation using hapi swagger.
 */ 
export const userApi = {
  create: {
    auth: false,
    handler: async function(request, h) {
      
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
    },
    tags: ["api"],
  },

/**  
 * works by getting the users from the store, the method uses .find() to get the users.
 * users are returned as object from .lean() in User-Mongo Store. In Api-routes it requesting this
 * which then shows the users on http://localhost:3000/api/users
*/ 
  find: {
    auth: false,
    handler: async function(request, h) {
        const users = await db.userStore.getAllUsers();
        return users;
      },
      tags: ["api"],
      description: "Get all userApi",
      notes: "Returns details of all userApi",
    },



   findOne: {
     auth: false,
     handler: async function (request, h) {
        const user = await db.userStore.getUserById(request.params.id);
        return user;
      },
      tags: ["api"],
    },

    
  deleteAll: {
    auth: false,
    handler: async function (request, h) {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } ,
      tags: ["api"],
  },
};