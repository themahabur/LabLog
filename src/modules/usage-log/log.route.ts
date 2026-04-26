import { Router } from "express";
import { logController } from "./log.controller";


const logRoute: Router = Router();



logRoute.post("/", logController.createLog);
logRoute.get("/", logController.getLogs);


export default logRoute;