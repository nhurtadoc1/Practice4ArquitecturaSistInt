// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import WorkerModel from "../db/Worker.ts";

const getWorker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const worker = await WorkerModel.findById(id).exec();

    if (!worker) {
      res.status(404).send("Worker not found");
      return;
    }
    res.status(200).send({
      name: worker.name,
      id: worker._id.toString(),
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getWorker;