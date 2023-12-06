// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import BusinessModel from "../db/Business.ts";

export const getBusinesses = async (req: Request, res: Response) => {
    try {
      const businesses = await BusinessModel.find().populate("workers", '-createdAt -updatedAt -__v');
      
      res.status(200).send(
        businesses.map((business) => ({
            name: business.name,
            workers: business.workers,
            id: business._id.toString(),
        }))
      );
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong: " + error,
      });
    }
  };

  export default getBusinesses;