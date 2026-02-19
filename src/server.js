// static images
import Inert from "@hapi/inert";
// to view the application neeeded hapi, vision and handlebars
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
// to get the path of the current file and directory
import path from "path";
// to get the routes for the web pages
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// to initialize the server, set up the view engine, and start the server.
async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  // to allow the server to use vision and inert, and then to set up the handlebars view engine.
  await server.register([Vision, Inert]);
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
