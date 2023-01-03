import { Router } from "express";
const router = Router();

import UserRoutes from "./users.routes";
import MarkerRoutes from "./markers.routes"


router.use("/users", UserRoutes)
router.use("/markers", MarkerRoutes);

export default router;
