import mongoose from "mongoose";
import { Task } from "../types.ts";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: { type: String, required: true, unique: false },
    status: { type: String, required: true, unique: false },
    workerID: { type: Schema.Types.ObjectId, required: true, unique: false, ref: "Worker" },
    businessID: { type: Schema.Types.ObjectId, required: true, unique: false, ref: "Business" },
  },
  { timestamps: true }
);

export type TaskModelType = mongoose.Document & Omit<Task, "id">;

export const TaskModel = mongoose.model<TaskModelType>(
    "Task",
    taskSchema
)

export default mongoose.model<TaskModelType>("Task", taskSchema);