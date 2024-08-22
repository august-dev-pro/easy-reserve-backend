import { Router } from "express";
import { reviewController } from "../controllers/reviewController";

const reviewRouter = Router();
reviewRouter.post("/", reviewController.createReview);
reviewRouter.get("/", reviewController.getAllReviews);

reviewRouter
  .route("/:id")
  .get(reviewController.getReviewById)
  .put(reviewController.updateReview)
  .delete(reviewController.deleteOneReview);

reviewRouter.route("/delete-many").post(reviewController.deleteManyReviews);
export default reviewRouter;
