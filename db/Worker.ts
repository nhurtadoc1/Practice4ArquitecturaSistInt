import mongoose from "mongoose";
import { Worker } from "../types.ts";

const Schema = mongoose.Schema;

const workerSchema = new Schema(
  {
    name: { type: String, required: true, unique: false },
  },
  { timestamps: true }
);

export type WorkerModelType = mongoose.Document & Omit<Worker, "id">;

export const WorkerModel = mongoose.model<WorkerModelType>(
    "Worker",
    workerSchema
);

export default mongoose.model<WorkerModelType>("Worker", workerSchema);