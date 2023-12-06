// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import BusinessModel from "../db/Business.ts";

const postBusiness = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (!name) {
      res.status(400).send("Name is required");
      return;
    }

    const newBusiness = new BusinessModel({ name });
    await newBusiness.save();

    res.status(200).send({
      name: newBusiness.name,
      workers: newBusiness.workers,
      id: newBusiness._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default postBusiness;