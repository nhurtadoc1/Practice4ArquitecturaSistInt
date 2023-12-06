// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import TaskModel from "../db/Task.ts";

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete(id).exec();
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteTask;