import express from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/userRoutes";
import AuthRouter from "./routes/authRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";
import cors from "cors";
import connectedDb from "./config/db";
import CommentRouter from "./routes/commentRoutes";
import ReservationRouter from "./routes/reservationRoutes";
import ServiceRouter from "./routes/serviceRoutes";
import TaskerSpecificsRouter from "./routes/taskerSpecificsRoutes";
import ReviewRouter from "./routes/reviewRoutes";
import path from "path";
import serviceOptionsRouter from "./routes/serviceOptionRoutes";
dotenv.config();
const app = express();

// Configuration CORS
const corsOptions = {
  origin: [
    "http://localhost:3000", // Localhost pour le développement
    "https://esea-reserve.vercel.app", // Frontend en production
    "https://easy-reserve-backend-mzfv.onrender.com", // Backend en production
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Si vous utilisez des cookies ou des identifiants
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("optionsSuccessStatus", 200);
  next();
});

connectedDb();

app.use(express.json());
// Routes
// Route par défaut
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      statusCode: 200,
      message: "Bienvenue sur EasyReserve API",
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      message: "Une erreur est survenue.",
    });
  }
});
app.use("/user", UserRouter);
app.use("/comment", CommentRouter);
app.use("/reservation", ReservationRouter);
app.use("/service", ServiceRouter);
app.use("/taskerSpecifics", TaskerSpecificsRouter);
app.use("/review", ReviewRouter);
app.use("/auth", AuthRouter);
app.use("/serviceOptions", serviceOptionsRouter);

// Middleware de gestion des erreurs
app.use(errorMiddleware);

export default app;
