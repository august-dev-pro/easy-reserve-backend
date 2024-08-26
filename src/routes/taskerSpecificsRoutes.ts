import { Router } from "express";
import { taskerSpecificsController } from "../controllers/taskerSpecificsController";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

const taskerSpecificsRouter = Router();

//routes
taskerSpecificsRouter.get("/", taskerSpecificsController.getAllTaskerSpecifics);
taskerSpecificsRouter.post(
  "/",
  taskerSpecificsController.createTaskerSpecifics
);

//id routes
taskerSpecificsRouter
  .route("/:id")
  .get(taskerSpecificsController.getTaskerSpecificsById)
  .put(taskerSpecificsController.updateTaskerSpecifics)
  .delete(taskerSpecificsController.deleteOneTaskerSpecifics);

//delete many
taskerSpecificsRouter
  .route("/delete-many")
  .post(taskerSpecificsController.deleteManyTaskerSpecifics);
export default taskerSpecificsRouter;
