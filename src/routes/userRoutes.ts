import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { userController } from "../controllers/UserController";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";
import uploadErrorHandler from "../utils/uploadErrorHandler";
import authController from "../controllers/authController";

const userRouter = Router();

userRouter.post(
  "/",
  uploadMiddleware.uploadImage("usersImages").single("profileImage"),
  userController.registerUser,
  uploadErrorHandler
);
userRouter.post("/deco", authController.logoutUser);
//protected routes
// userRouter.use(authMiddleware);
userRouter.get("/", authMiddleware, userController.getAllUsers);
userRouter
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUserById);
userRouter.delete("/delete-many", userController.deleteManyUsers);
// Route for updating the profile image
// Route pour mettre à jour la photo de profil de l'utilisateur
userRouter.post(
  "/:id/profile-image",
  uploadMiddleware.uploadImage("profileImages").single("profileImage"),
  userController.updateUserProfileImage,
  uploadErrorHandler
);

// Route pour ajouter une image à la story de l'utilisateur

export default userRouter;
