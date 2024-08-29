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
import { listRoutes } from "./utils/listRoutes";

dotenv.config();
const app = express();

// Configuration CORS
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://easy-reserve-backend-production.up.railway.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

connectedDb();

app.use(express.json());

// Routes
app.use("/user", UserRouter);
app.use("/comment", CommentRouter);
app.use("/reservation", ReservationRouter);
app.use("/service", ServiceRouter);
app.use("/taskerSpecifics", TaskerSpecificsRouter);
app.use("/review", ReviewRouter);
app.use("/auth", AuthRouter);
app.use("/serviceOptions", serviceOptionsRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware pour lister toutes les routes
app.use("/", (req, res, next) => {
  console.log("Liste des routes disponibles:");
  const routes = listRoutes(app._router);
  routes.forEach((route) => {
    console.log(`${route.method} -> ${route.path}`);
  });
  next();
});

// Middleware de gestion des erreurs
app.use(errorMiddleware);

export default app;
