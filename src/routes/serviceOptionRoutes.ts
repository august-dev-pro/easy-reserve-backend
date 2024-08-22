import { Router } from "express";
import { serviceOptionController } from "../controllers/serviceOptionController";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";
import uploadErrorHandler from "../utils/uploadErrorHandler";

const serviceOptionsRouter = Router();

serviceOptionsRouter.post(
  "/",
  uploadMiddleware.uploadImage("serviceOptionsImage").single("image"),
  serviceOptionController.createServiceOption,
  uploadErrorHandler
);
serviceOptionsRouter.get("/", serviceOptionController.getAllServiceOptions);
serviceOptionsRouter.put("/:id", serviceOptionController.updateServiceOption);
serviceOptionsRouter.delete(
  "/:id",
  serviceOptionController.deleteServiceOption
);

export default serviceOptionsRouter;
