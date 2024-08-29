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
//user route
app.use("/user", UserRouter);
//comment route
app.use("/comment", CommentRouter);
//reservation route
app.use("/reservation", ReservationRouter);
//service route
app.use("/service", ServiceRouter);
//taskerSpecifics route
app.use("/taskerSpecifics", TaskerSpecificsRouter);
//review route
app.use("/review", ReviewRouter);
//auth route
app.use("/auth", AuthRouter);
//serviceoptions routes
app.use("/serviceOptions", serviceOptionsRouter);
// Serve the static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Middleware de gestion des erreurs
app.use(errorMiddleware);
export default app;
