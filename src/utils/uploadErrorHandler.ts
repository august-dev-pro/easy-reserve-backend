import multer from "multer";
import { ErrorHandler } from "./errorHandle";

// Middleware pour gérer les erreurs liées à Multer
const uploadErrorHandler = (err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Erreur lors de l'upload du fichier, verifié le nom du champ.",
      stack: err.message,
    });
  } else if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
      stack: err.stack,
    });
  } else {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Erreur serveur interne",
      stack: err.stack,
    });
  }
};

export default uploadErrorHandler;
