import mongoose from "mongoose";
import { Business } from "../types.ts";

const Schema = mongoose.Schema;

const businessSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    workers: { type: Array<Worker>, required: true, unique: false, ref: "Worker" },
  },
  { timestamps: true }
);

export type BusinessModelType = mongoose.Document & Omit<Business, "id">;

export default mongoose.model<BusinessModelType>("Business", businessSchema);