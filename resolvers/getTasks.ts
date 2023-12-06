// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import TaskModel from "../db/Task.ts";

export const getTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await TaskModel.find().populate("workerID businessID", '-createdAt -updatedAt -__v');

      res.status(200).send(
        tasks.map((task) => ({
            name: task.name,
            status: task.status,
            workerID: task.workerID,
            businessID: task.businessID,
            id: task._id.toString(),
        }))
      );
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong: " + error,
      });
    }
  };

  export default getTasks;