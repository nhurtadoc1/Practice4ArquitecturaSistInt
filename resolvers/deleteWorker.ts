// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import WorkerModel from "../db/Worker.ts";

const deleteWorker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const worker = await WorkerModel.findByIdAndDelete(id).exec();
    if (!worker) {
      res.status(404).send("Worker not found");
      return;
    }
    res.status(200).send("Worker deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteWorker;