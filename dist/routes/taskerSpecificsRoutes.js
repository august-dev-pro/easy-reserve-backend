"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskerSpecificsController_1 = require("../controllers/taskerSpecificsController");
const taskerSpecificsRouter = (0, express_1.Router)();
//routes
taskerSpecificsRouter.get("/", taskerSpecificsController_1.taskerSpecificsController.getAllTaskerSpecifics);
taskerSpecificsRouter.post("/", taskerSpecificsController_1.taskerSpecificsController.createTaskerSpecifics);
//id routes
taskerSpecificsRouter
    .route("/:id")
    .get(taskerSpecificsController_1.taskerSpecificsController.getTaskerSpecificsById)
    .put(taskerSpecificsController_1.taskerSpecificsController.updateTaskerSpecifics)
    .delete(taskerSpecificsController_1.taskerSpecificsController.deleteOneTaskerSpecifics);
//delete many
taskerSpecificsRouter
    .route("/delete-many")
    .post(taskerSpecificsController_1.taskerSpecificsController.deleteManyTaskerSpecifics);
exports.default = taskerSpecificsRouter;
