import { Router } from "express";
import { userController } from "./user.controller";
import authorize from "../../middleware/authorize";



const userRouter: Router = Router();

userRouter.get("/", authorize("ADMIN"), userController.getUsers);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/:id", authorize("ADMIN"), userController.getUserById);

export default userRouter;
