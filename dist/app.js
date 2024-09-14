"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const taskerSpecificsRoutes_1 = __importDefault(require("./routes/taskerSpecificsRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const serviceOptionRoutes_1 = __importDefault(require("./routes/serviceOptionRoutes"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to the database
(0, db_1.default)();
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
app.use((0, cors_1.default)(corsOptions));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"
    /* "https://easy-reserve-backend-production.up.railway.app",
      "https://esea-reserve.vercel.app", */ // Ajoutez l'URL de production de votre frontend
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("optionsSuccessStatus", 200);
    next();
});
// Middleware: JSON parsing and cookie parsing
app.use(express_1.default.json());
// Static files for uploads
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.get("/", (req, res) => {
    try {
        res.status(200).json({
            statusCode: 200,
            message: "Bienvenue sur EasyReserve API",
        });
    }
    catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Une erreur est survenue.",
        });
    }
});
app.use("/user", userRoutes_1.default);
app.use("/comment", commentRoutes_1.default);
app.use("/reservation", reservationRoutes_1.default);
app.use("/service", serviceRoutes_1.default);
app.use("/taskerSpecifics", taskerSpecificsRoutes_1.default);
app.use("/review", reviewRoutes_1.default);
app.use("/auth", authRoutes_1.default);
app.use("/serviceOptions", serviceOptionRoutes_1.default);
// Middleware de gestion des erreurs
app.use(errorMiddleware_1.default);
exports.default = app;
