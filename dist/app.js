"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const taskerSpecificsRoutes_1 = __importDefault(require("./routes/taskerSpecificsRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const path_1 = __importDefault(require("path"));
const serviceOptionRoutes_1 = __importDefault(require("./routes/serviceOptionRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)(corsOptions));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("optionsSuccessStatus", 200);
    next();
});
(0, db_1.default)();
app.use(express_1.default.json());
// Routes
// Route par défaut
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
