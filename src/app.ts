import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectedDb from "./config/db";
import UserRouter from "./routes/userRoutes";
import AuthRouter from "./routes/authRoutes";
import CommentRouter from "./routes/commentRoutes";
import ReservationRouter from "./routes/reservationRoutes";
import ServiceRouter from "./routes/serviceRoutes";
import TaskerSpecificsRouter from "./routes/taskerSpecificsRoutes";
import ReviewRouter from "./routes/reviewRoutes";
import serviceOptionsRouter from "./routes/serviceOptionRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

dotenv.config();
const app = express();

// Connect to the database
connectedDb();

// Middleware: CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://easy-reserve-backend-mzfv.onrender.com",
    "https://esea-reserve.vercel.app",
  ], // Localhost for development
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Allow credentials (cookies)
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",

    "http://localhost:3000"
    /* "https://easy-reserve-backend-production.up.railway.app",
      "https://esea-reserve.vercel.app", */ // Ajoutez l'URL de production de votre frontend
  );
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

// Middleware: JSON parsing and cookie parsing
app.use(express.json());
app.use(cookieParser());

// Middleware: Log cookies for debugging
app.use((req, res, next) => {
  console.log("Cookies:", req.headers.cookie); // For checking cookies
  next();
});

// Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
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

// Middleware: Error handling
app.use(errorMiddleware);

export default app;
