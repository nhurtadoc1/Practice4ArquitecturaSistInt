// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import WorkerModel from "../db/Worker.ts";

export const getWorkers = async (req:Request, res: Response) => {
    try {
      const workers = await WorkerModel.find();
      res.status(200).send(
        workers.map((worker) => ({
            name: worker.name,
            id: worker._id.toString(),
        }))
      );
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong: " + error,
      });
    }
  };

  export default getWorkers;