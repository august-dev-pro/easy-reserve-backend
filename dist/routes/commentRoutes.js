"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../controllers/commentController");
const commentRouter = (0, express_1.Router)();
commentRouter.get("/", commentController_1.commentController.getAllComments);
commentRouter.post("/", commentController_1.commentController.createComment);
commentRouter
    .route("/:id")
    .get(commentController_1.commentController.getCommentById)
    .put(commentController_1.commentController.updateComment)
    .delete(commentController_1.commentController.deleteComment);
exports.default = commentRouter;
