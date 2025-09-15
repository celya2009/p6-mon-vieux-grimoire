// ------------------- Fichier : server.js -------------------
// Objectif : démarrer le serveur Node.js qui écoute les requêtes HTTP

const app = require("./app"); // 1️⃣ On importe l'application Express configurée (routes, middlewares, etc.)

// 2️⃣ Définition du port sur lequel le serveur va écouter
// On prend soit la variable d'environnement PORT, soit 4000 par défaut
const PORT = process.env.PORT || 4000;

// 3️⃣ Lancement du serveur
app.listen(PORT, () => {
  // Quand le serveur démarre correctement, on affiche ce message
  console.log(`Le serveur a démarré sur le port ${PORT}`);
})
// 4️⃣ Gestion des erreurs lors du démarrage du serveur
.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    // Si le port est déjà utilisé par une autre application
    console.log(`Erreur : le port ${PORT} est déjà utilisé.`);
  } else {
    // Autres erreurs possibles
    console.log(err);
  }
});

