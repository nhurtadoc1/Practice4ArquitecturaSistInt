// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import BusinessModel from "../db/Business.ts";
import TaskModel from "../db/Task.ts";
import WorkerModel from "../db/Worker.ts";

const postTask = async (req: Request, res: Response) => {
  try {
    const { name, status, worker, business } = req.query;
    if (!name || !status || !worker || !business ) {
      res.status(400).send("Name, status, worker, and business is required");
      return;
    }

    const taskWorker = await WorkerModel.findById(worker).exec();

    if(!taskWorker) {
      res.status(400).send("Worker not found");
      return;
    };

    const workerID = taskWorker._id;

    const taskBusiness = await BusinessModel.findById(business).exec();

    if(!taskBusiness) {
        res.status(400).send("Business not found");
        return;
    };

    const businessID = taskBusiness._id;

    const newTask = new TaskModel({ name, status, workerID , businessID });
    await newTask.populate("workerID businessID", '-createdAt -updatedAt -__v');
    await newTask.save();

    res.status(200).send({
      name: newTask.name,
      status: newTask.status.toString(),
      workerID: newTask.workerID,
      businessID: newTask.businessID,
      id: newTask._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default postTask;