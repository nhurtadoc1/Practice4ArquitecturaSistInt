// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import BusinessModel from "../db/Business.ts";
import WorkerModel from "../db/Worker.ts";

const hireWorker = async (req: Request, res: Response) => {
  try {
    const { id, workerId } = req.params;
    if (!id || !workerId) {
      res.status(400).send("Company and worker ID are required");
      return;
    }

    const newWorker = await WorkerModel.findById(workerId).exec();

    if(!newWorker) {
        res.status(400).send("Worker not found");
        return;
    };

    const businessToUpdate = await BusinessModel.findById(id).exec();

    if(!businessToUpdate) {
        res.status(400).send("Business not found");
        return;
    };
    
    if(businessToUpdate.workers.includes(newWorker.id)) {
      res.status(400).send("Business already has this employee");
      return;
    }

    if(businessToUpdate.workers.length == 10) {
      res.status(400).send("Business already has ten employees");
      return;
    }

    businessToUpdate.workers.push(newWorker.id);
    await businessToUpdate.populate("workers", '-createdAt -updatedAt -__v');
    businessToUpdate.save();

    res.status(200).send({
      name: businessToUpdate.name,
      workers: businessToUpdate.workers,
      id: businessToUpdate._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default hireWorker;