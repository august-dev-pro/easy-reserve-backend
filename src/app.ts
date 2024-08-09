import express from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/userRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";
import cors from "cors";
import connectedDb from "./config/db";
dotenv.config();
const app = express();

// Configuration CORS
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

connectedDb();

app.use(express.json());

app.use("/user/", UserRouter);
// Middleware de gestion des erreurs
app.use(errorMiddleware);
export default app;
