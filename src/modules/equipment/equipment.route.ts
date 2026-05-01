import { Router } from "express";
import { equipmentController } from "./equipment.controller";
import authorize from "../../middleware/authorize";

const equipmentRouter: Router = Router();

equipmentRouter.post("/",authorize("ADMIN"), equipmentController.createEquipment);
equipmentRouter.get("/", authorize("ADMIN" , "USER"), equipmentController.getEquipment);
equipmentRouter.get("/:id", authorize("ADMIN", "USER"), equipmentController.getEquipmentById);

export default equipmentRouter;
