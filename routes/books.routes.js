// ------------------- Modules -------------------
const express = require("express");
const router = express.Router();  // Création d'un routeur Express

// ------------------- Middlewares -------------------
const auth = require("../middleware/auth");                 // Vérifie que l'utilisateur est authentifié
const multer = require("../middleware/multer-config");      // Gère l'upload d'une image
const sharpConfig = require("../middleware/sharp-config");  // Optimise et compresse l'image

// ------------------- Contrôleur -------------------
const BooksController = require("../controllers/books.controller"); // Gestion des livres

// ------------------- Routes -------------------

// 1️⃣ Récupérer tous les livres
// GET /api/books
router.get("/", BooksController.getBooks);

// 2️⃣ Récupérer les 3 livres les mieux notés
// GET /api/books/bestrating
router.get("/bestrating", BooksController.getBestRating);

// 3️⃣ Récupérer un livre précis par son ID
// GET /api/books/:id
router.get("/:id", BooksController.getOneBook);

// 4️⃣ Ajouter un nouveau livre
// Authentification obligatoire, upload image, optimisation image
// POST /api/books
router.post(
  "/",
  auth,
  multer,       // Upload d'une seule image avec le champ "image"
  sharpConfig,  // Optimisation de l'image uploadée
  BooksController.setBooks
);

// 5️⃣ Modifier un livre existant
// PUT /api/books/:id
router.put(
  "/:id",
  auth,
  multer,       // Upload image si l'utilisateur veut changer l'image
  sharpConfig,  // Optimisation de la nouvelle image
  BooksController.editBook
);

// 6️⃣ Supprimer un livre
// DELETE /api/books/:id
router.delete("/:id", auth, BooksController.deleteBook);

// 7️⃣ Ajouter une note à un livre
// POST /api/books/:id/rating
router.post("/:id/rating", auth, BooksController.setRating);

// ------------------- Export -------------------
module.exports = router;



