// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import BusinessModel from "../db/Business.ts";

const getBusinessByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const business = await BusinessModel.findOne({ name }).exec();

    if (!business) {
      res.status(404).send("Business not found");
      return;
    }
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

export default getBusinessByName;