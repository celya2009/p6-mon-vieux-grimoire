// =================== Fichier : connectDB.js ===================
// Fonction principale : connectDB
// But : Se connecter à la base de données MongoDB avec Mongoose
// Utilité : Toutes les opérations sur les livres (CRUD) passent par cette connexion

const mongoose = require("mongoose"); // On importe Mongoose pour gérer MongoDB

// Fonction asynchrone pour se connecter à MongoDB
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true); // Active le mode strict pour éviter les warnings
    await mongoose.connect(process.env.MONGO_URI); // Connexion à MongoDB avec l'URL stockée dans les variables d'environnement
    console.log("✅ MongoDB connecté"); // Message si la connexion réussit
  } catch (err) {
    console.error("❌ Erreur de connexion à MongoDB :", err.message); // Message si la connexion échoue
    process.exit(1); // Arrête le serveur si impossible de se connecter
  }
};

// On exporte la fonction pour pouvoir l'utiliser ailleurs (ex: server.js)
module.exports = connectDB;



