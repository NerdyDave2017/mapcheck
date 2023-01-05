import { Router } from "express";
import UserController from "../../modules/users/users.controller";

const router = Router();

const userController = new UserController();

router.post("/create", userController.create);
router.post("/signin", userController.signIn);
router.put("/update", userController.updateData);
router.post("/find", userController.findUser);
// router.put("/updatePassword", userController.updatePassword);
router.get("/", userController.fetchAllUsers);

export default router;
