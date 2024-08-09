import app from "./app";
import http from "http";

const PORT = parseInt(process.env.PORT!, 10) || 5000;

// Création du serveur HTTP
const server = http.createServer(app);

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
