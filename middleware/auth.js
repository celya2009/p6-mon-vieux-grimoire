// =================== Fichier : auth.middleware.js ===================
// Fonction principale : authentifier les utilisateurs via JWT
// But : Vérifier que l'utilisateur est connecté avant de lui permettre d'accéder à certaines routes

require("dotenv").config({ path: ".env" }); // Charge les variables d'environnement
const jwt = require("jsonwebtoken");        // Module pour manipuler les JWT

// Middleware pour authentifier les requêtes
module.exports = (req, res, next) => {
  try {
    // 1️⃣ Récupère le token depuis l'en-tête Authorization (format : "Bearer TOKEN")
    const token = req.headers.authorization.split(" ")[1];

    // 2️⃣ Vérifie le token avec la clé secrète et décode le contenu
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Récupère l'ID de l'utilisateur depuis le token décodé
    const userId = decodedToken.userId;

    // 4️⃣ Ajoute l'ID de l'utilisateur à l'objet request pour que les contrôleurs puissent l'utiliser
    req.auth = {
      userId: userId,
    };

    // 5️⃣ Passe au middleware suivant ou au contrôleur
    next();
  } catch (error) {
    // En cas d'erreur (token absent ou invalide), renvoie un statut 401 Unauthorized
    res.status(401).json({ error });
  }
};


