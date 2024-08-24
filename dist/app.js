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
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
(0, db_1.default)();
app.use(express_1.default.json());
//user route
app.use("/user", userRoutes_1.default);
//comment route
app.use("/comment", commentRoutes_1.default);
//reservation route
app.use("/reservation", reservationRoutes_1.default);
//service route
app.use("/service", serviceRoutes_1.default);
//taskerSpecifics route
app.use("/taskerSpecifics", taskerSpecificsRoutes_1.default);
//review route
app.use("/review", reviewRoutes_1.default);
//auth route
app.use("/auth", authRoutes_1.default);
//serviceoptions routes
app.use("/serviceOptions", serviceOptionRoutes_1.default);
// Serve the static files from the 'uploads' directory
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
// Middleware de gestion des erreurs
app.use(errorMiddleware_1.default);
exports.default = app;
