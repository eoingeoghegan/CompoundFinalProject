// loads environment variables from the .env file, and mongoose for MongoDB
import * as dotenv from "dotenv";
import Mongoose from "mongoose";
// imported Seeder for startup data for app
import * as mongooseSeeder from "mais-mongoose-seeder";
import { seedData } from "./seed-data.js";


/**
 * Works by: inserts the seed data into the database,
 * creates a new seeder instance using mongoose
 * seeds the database with the data from seed-data.js
 * dropCollections clears existing collections before adding new data
 */
const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

/**
 * Works by: connects the application to MongoDB
 *  loads environment variables (like database connection string)
 * tells mongoose to enforce strict query filtering
 * connects to the MongoDB database using the URL in .env and creates a connection object
 */

export function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  // added seed method here.
  db.once("open", function() {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed();
  });
}

