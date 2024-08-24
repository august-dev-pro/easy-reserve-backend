"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const PORT = parseInt(process.env.PORT, 10) || 5000;
// Création du serveur HTTP
const server = http_1.default.createServer(app_1.default);
//lencement du server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Gestion des événements du serveur
server.on("error", (error) => {
    console.error("Server error:", error.message);
});
server.on("listening", () => {
    console.log("Server is listening...");
});
