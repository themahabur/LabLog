import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Role } from "../../generated/prisma/enums";

const userRouter: Router = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/:id", auth([Role.Student]), userController.getUserById);

export default userRouter;
