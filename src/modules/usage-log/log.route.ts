import { Router } from "express";
import { logController } from "./log.controller";
import authorize from "../../middleware/authorize";


const logRoute: Router = Router();



logRoute.post("/",authorize("ADMIN", "USER"), logController.createLog);
logRoute.get("/", authorize("ADMIN", "USER"), logController.getLogs);


export default logRoute;