import { Router } from "express";
import userRouter from "../modules/user/user.route";
import equipmentRouter from "../modules/equipment/equipment.route";
import logRoute from "../modules/usage-log/log.route";



const routes: Router = Router();

routes.use("/user", userRouter);
routes.use("/equipment", equipmentRouter);
routes.use("/log", logRoute);

export default routes;