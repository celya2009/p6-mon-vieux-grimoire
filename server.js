const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config({ path: ".env" });
const cors = require("cors");

// connexion à la DB
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Middleware pour traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static("./images"));

app.use("/api/books", require("./routes/books.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

// Port depuis .env ou 4000 par défaut
const port = process.env.PORT || 4000;

// Lancer le serveur avec gestion d'erreur si le port est occupé
app.listen(port, () => console.log(`Le serveur a démarré au port ${port}`))
   .on("error", (err) => {
       if (err.code === "EADDRINUSE") {
           console.log(`Erreur : le port ${port} est déjà utilisé. Vérifie qu'aucun autre serveur Node n'est lancé.`);
       } else {
           console.log(err);
       }
   });
