import multer from "multer";
import path from "path";
import { ErrorHandler } from "../utils/errorHandle";
import fs from "fs";
const createStorage = (folder: string) => {
  const uploadDir = path.join(__dirname, "../uploads", folder);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir); // Utilisation de uploadDir ici
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });
};
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non supporté"), false);
  }
};

// Fonction pour créer un middleware d'upload avec un sous-dossier spécifique
const uploadImage = (specific: string) => {
  try {
    const result = multer({
      storage: createStorage(specific),
      limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB
      fileFilter: fileFilter,
    });
    if (!result) {
      throw new ErrorHandler(400, "erreur de base de donnée");
    }
    return result;
  } catch (error: any) {
    throw new ErrorHandler(400, "Erreur lors de la configuration de multer", {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};
/* const uploadServiceImage = (specific: string) => {
  try {
    const result = multer({
      storage: createStorage(specific),
      limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB
      fileFilter: fileFilter,
    });

    if (!result) {
      throw new ErrorHandler(400, "Erreur lors de la configuration de multer");
    }
    return result;
  } catch (error: any) {
    throw new ErrorHandler(400, "Erreur lors de la configuration de multer", {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};

const uploadServiceOptionImage = multer({
  storage: createStorage("serviceOptionImages"),
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const uploadTaskerSpecificsImage = multer({
  storage: createStorage("taskerSpecificsImages"),
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
}); */

export const uploadMiddleware = {
  uploadImage,
};
