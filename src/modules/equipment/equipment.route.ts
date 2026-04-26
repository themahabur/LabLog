import { Router } from "express";
import { equipmentController } from "./equipment.controller";

const equipmentRouter: Router = Router();

equipmentRouter.post("/", equipmentController.createEquipment);
equipmentRouter.get("/", equipmentController.getEquipment);
equipmentRouter.get("/:id", equipmentController.getEquipmentById);

export default equipmentRouter;
