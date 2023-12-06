// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import getBusiness from "./resolvers/getBusiness.ts";
import getBusinesses from "./resolvers/getBusinesses.ts";
import getBusinessByName from "./resolvers/getBusinessByName.ts";
import getTask from "./resolvers/getTask.ts";
import getTasks from "./resolvers/getTasks.ts";
import getWorker from "./resolvers/getWorker.ts";
import getWorkers from "./resolvers/getWorkers.ts";
import deleteBusiness from "./resolvers/deleteBusiness.ts";
import deleteTask from "./resolvers/deleteTask.ts";
import deleteWorker from "./resolvers/deleteWorker.ts";
import postBusiness from "./resolvers/postBusiness.ts";
import postTask from "./resolvers/postTask.ts";
import postWorker from "./resolvers/postWorker.ts";
import hireWorker from "./resolvers/hireWorker.ts";
import fireWorker from "./resolvers/fireWorker.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/worker/:id", getWorker)
  .get("/worker", getWorkers)
  .get("/business/:id", getBusiness)
  .get("/business", getBusinesses)
  .get("/businessByName/:name", getBusinessByName)
  .get("/task/:id", getTask)
  .get("/task", getTasks)
  .delete("/worker/:id", deleteWorker)
  .delete("/business/:id", deleteBusiness)
  .delete("/task/:id", deleteTask)
  .post("/worker", postWorker)
  .post("/business", postBusiness)
  .post("/task", postTask)
  .put("/business/:id/hire/:workerId", hireWorker)
  .put("/business/:id/fire/:workerId", fireWorker);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});