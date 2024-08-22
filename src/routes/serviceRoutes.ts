import { Router } from "express";
import { serviceController } from "../controllers/serviceController";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";
import uploadErrorHandler from "../utils/uploadErrorHandler";

const ServiceRouter = Router();
//service routes
ServiceRouter.get("/", serviceController.getAllServices);
ServiceRouter.post(
  "/",
  uploadMiddleware.uploadImage("serviceFronteImage").single("frontImage"),
  serviceController.createService,
  uploadErrorHandler
);
ServiceRouter.route("/:id")
  .get(serviceController.getServiceById)
  .put(serviceController.updateService)
  .delete(serviceController.deleteOneService);
ServiceRouter.post("/delete-many", serviceController.deleteManyService);

export default ServiceRouter;
