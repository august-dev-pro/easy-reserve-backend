"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const uploadErrorHandler_1 = __importDefault(require("../utils/uploadErrorHandler"));
const userRouter = (0, express_1.Router)();
userRouter.post("/register", UserController_1.userController.registerUser);
//protected routes
// userRouter.use(authMiddleware);
userRouter.get("/", UserController_1.userController.getAllUsers);
userRouter
    .route("/:id")
    .get(UserController_1.userController.getUserById)
    .put(UserController_1.userController.updateUser)
    .delete(UserController_1.userController.deleteUserById);
userRouter.delete("/delete-many", UserController_1.userController.deleteManyUsers);
// Route for updating the profile image
// Route pour mettre à jour la photo de profil de l'utilisateur
userRouter.post("/:id/profile-image", uploadMiddleware_1.uploadMiddleware.uploadImage("profileImages").single("profileImage"), UserController_1.userController.updateUserProfileImage, uploadErrorHandler_1.default);
// Route pour ajouter une image à la story de l'utilisateur
exports.default = userRouter;
