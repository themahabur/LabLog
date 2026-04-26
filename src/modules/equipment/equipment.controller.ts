import { Request, Response } from "express";
import { equipmentService } from "./equipment.service";

const createEquipment = async (req: Request, res: Response) => {
  try {
    const equipment = await equipmentService.createEquipment(req.body);
    return res
      .status(201)
      .json({ message: "Equipment created successfully", data: equipment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create equipment", error: error });
  }
};

const getEquipment = async (req: Request, res: Response) => {
  try {

    const equipment = await equipmentService.getEquipment();
    return res
      .status(200)
      .json({ message: "Equipment retrieved successfully", data: equipment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get equipment", error: error });
  }
};
const getEquipmentById = async (req: Request, res: Response) => {
  try {
    const equipmentId = req.params.id;

    if (!equipmentId || typeof equipmentId !== "string") {
      return res
        .status(400)
        .json({
          message: "Invalid equipment id",
          error: "Equipment id must be a non-empty string",
        });
    }

    const equipment = await equipmentService.getEquipmentById(equipmentId);
    return res
      .status(200)
      .json({ message: "Equipment retrieved successfully", data: equipment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get equipment", error: error });
  }
};

export const equipmentController = {
  createEquipment,
  getEquipmentById,
  getEquipment,
};
