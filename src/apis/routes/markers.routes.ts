import { Router }from "express" 
import MarkerController from "../../modules/markers/markers.controller";


const router = Router()

const markerController = new MarkerController();

router.post("/create", markerController.create);
router.delete("/delete", markerController.delete);
router.get("/", markerController.fetchAllMarkers);

export default router;
