// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import WorkerModel from "../db/Worker.ts";

const postWorker = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (!name) {
      res.status(400).send("Name is required");
      return;
    }

    const newWorker = new WorkerModel({ name });
    await newWorker.save();

    res.status(200).send({
      name: newWorker.name,
      id: newWorker._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default postWorker;