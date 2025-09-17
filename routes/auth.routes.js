// ------------------- Modules -------------------
const express = require("express");
const router = express.Router();  // Création d'un routeur Express

// ------------------- Contrôleur -------------------
const AuthController = require("../controllers/auth.controller"); // Import du contrôleur pour gérer l'authentification

// ------------------- Routes -------------------

// Endpoint pour enregistrer un nouvel utilisateur
// POST http://localhost:4000/api/auth/signup
router.post("/signup", AuthController.register);

// Endpoint pour connecter un utilisateur existant
// POST http://localhost:4000/api/auth/login
router.post("/login", AuthController.login);

// ------------------- Export -------------------
module.exports = router;


