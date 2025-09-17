// app.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: ".env" });
const connectDB = require("./config/db");

// Connexion à MongoDB
connectDB();

const app = express();

// Middleware CORS pour autoriser ton frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Middleware pour parser le JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir les images uploadées
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/books", require("./routes/books.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app; // On exporte app pour server.js


