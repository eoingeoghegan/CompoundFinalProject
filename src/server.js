// for authentication and authorization
import Cookie from "@hapi/cookie";
// static images
import Inert from "@hapi/inert";
// to view the application neeeded hapi, vision and handlebars
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
// to get the path of the current file and directory
import path from "path";
//for secret keys and environment variables
import dotenv from "dotenv";
// to get the routes for the web pages
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
// imported to allow the server to use the authentication.
import { accountsController } from "./controllers/accounts-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// to initialize the server, set up the view engine, and start the server.
async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  // to allow the server to use vision and inert, and then to set up the handlebars view engine.
  // cookie intriduced to allow for authentication.
  await server.register([Vision, Inert]);
  await server.register(Cookie);
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  const result = dotenv.config();
    if (result.error) {
    console.log(result.error.message);
    process.exit(1);
  }

  /**
   * COOKIE BEFORE .ENV
   *  to set up the authentication strategy, using cookies. The cookie is named "compound" and 
   * has a password for encryption. The validate function is defined in the accountsController,
   * which checks if the user is authenticated.
   * Triggered for all routes.
   * 
   * COOKIE AFTER .ENV, name and password stored in .env file for security.
  */
  server.auth.strategy("session", "cookie", {
     cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");




  // to allow static images to be rendered
  server.route({
  method: "GET",
  path: "/public/{param*}",
  handler: {
    directory: {
      path: path.join(__dirname, "public"),
      listing: false,
      index: false,
    },
  },
});
// allows db to work.
  db.init();
// to allow the routes defined in web-routes.js to be used in the server.
  server.route(webRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}
// to catch any unhandled rejections and log the error, then exit the process.
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
