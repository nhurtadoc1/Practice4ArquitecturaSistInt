// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import BusinessModel from "../db/Business.ts";

const deleteBusiness = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const business = await BusinessModel.findByIdAndDelete(id).exec();
    if (!business) {
      res.status(404).send("Business not found");
      return;
    }
    res.status(200).send("Business deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteBusiness;