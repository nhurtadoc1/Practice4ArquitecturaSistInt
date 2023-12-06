// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import TaskModel from "../db/Task.ts";

const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findById(id).exec();

    if (!task) {
      res.status(404).send("Task not found");
      return;
    }

    await task.populate("workerID businessID", '-createdAt -updatedAt -__v');

    res.status(200).send({
        name: task.name,
        status: task.status.toString,
        workerID: task.workerID,
        businessID: task.businessID,
        id: task._id.toString(),
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getTask;