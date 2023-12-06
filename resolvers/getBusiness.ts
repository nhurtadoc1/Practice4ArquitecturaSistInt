// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import BusinessModel from "../db/Business.ts";

const getBusiness = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const business = await BusinessModel.findById(id).exec();

    if (!business) {
      res.status(404).send("Business not found");
      return;
    }

    await business.populate("workers", '-createdAt -updatedAt -__v');

    res.status(200).send({
      name: business.name,
      workers: business.workers,
      id: business._id.toString(),
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getBusiness;