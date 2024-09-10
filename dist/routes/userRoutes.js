"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const UserController_1 = require("../controllers/UserController");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const uploadErrorHandler_1 = __importDefault(require("../utils/uploadErrorHandler"));
const userRouter = (0, express_1.Router)();
userRouter.post("/", uploadMiddleware_1.uploadMiddleware.uploadImage("usersImages").single("profileImage"), UserController_1.userController.registerUser, uploadErrorHandler_1.default);
//protected routes
// userRouter.use(authMiddleware);
userRouter.get("/", authMiddleware_1.default, UserController_1.userController.getAllUsers);
userRouter
    .route("/:userId")
    .get(UserController_1.userController.getUserById)
    .put(UserController_1.userController.updateUser)
    .delete(UserController_1.userController.deleteUserById);
userRouter.delete("/delete-many", UserController_1.userController.deleteManyUsers);
// Route for updating the profile image
// Route pour mettre à jour la photo de profil de l'utilisateur
userRouter.post("/:id/profile-image", uploadMiddleware_1.uploadMiddleware.uploadImage("profileImages").single("profileImage"), UserController_1.userController.updateUserProfileImage, uploadErrorHandler_1.default);
// Route pour ajouter une image à la story de l'utilisateur
exports.default = userRouter;
