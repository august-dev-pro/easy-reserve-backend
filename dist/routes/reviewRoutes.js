"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const reviewRouter = (0, express_1.Router)();
reviewRouter.post("/", reviewController_1.reviewController.createReview);
reviewRouter.get("/", reviewController_1.reviewController.getAllReviews);
reviewRouter
    .route("/:id")
    .get(reviewController_1.reviewController.getReviewById)
    .put(reviewController_1.reviewController.updateReview)
    .delete(reviewController_1.reviewController.deleteOneReview);
reviewRouter.route("/delete-many").post(reviewController_1.reviewController.deleteManyReviews);
exports.default = reviewRouter;
