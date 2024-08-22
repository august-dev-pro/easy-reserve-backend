import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { commentController } from "../controllers/commentController";

const commentRouter = Router();

commentRouter.get("/", commentController.getAllComments);
commentRouter.post("/", commentController.createComment);
commentRouter
  .route("/:id")
  .get(commentController.getCommentById)
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

export default commentRouter;
