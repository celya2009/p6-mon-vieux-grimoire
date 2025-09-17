// =================== Fichier : books.controller.js ===================
// Fonction principale : gérer les livres
// But : Créer, lire, modifier, supprimer et noter des livres
// Utilité : Permet de gérer la bibliothèque de l'application et les notes des utilisateurs

// ------------------- Modules -------------------
const Book = require("../models/books.model"); // Modèle Mongoose pour les livres
const fs = require("fs");                      // Pour manipuler les fichiers (ex: supprimer une image)

// ------------------- Contrôleurs -------------------

// 1️⃣ Récupérer tous les livres
const getBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Récupère tous les livres de la base
    res.status(200).json(books);     // Renvoie la liste
  } catch (error) {
    res.status(400).json({ error });
  }
};

// 2️⃣ Récupérer un livre précis par ID
const getOneBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Cherche le livre par son ID
    if (!book) return res.status(404).json({ message: "Livre non trouvé !" });
    res.status(200).json(book); // Renvoie le livre
  } catch (error) {
    res.status(404).json({ error });
  }
};

// 3️⃣ Récupérer les 3 meilleurs livres selon la note moyenne
const getBestRating = async (req, res) => {
  try {
    const books = await Book.find();
    const topThree = books
      .sort((a, b) => b.averageRating - a.averageRating) // Trie par note moyenne décroissante
      .slice(0, 3);                                      // Prend les 3 premiers
    res.status(200).json(topThree);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// 4️⃣ Créer un nouveau livre
const setBooks = async (req, res) => {
  try {
    if (!req.body.book) return res.status(400).json({ message: "Merci de remplir les champs." });

    const bookObject = JSON.parse(req.body.book); // Transforme la chaîne JSON en objet
    delete bookObject._id;                        // Supprime l'ID pour éviter les conflits

    // Vérification des champs vides
    const emptyFields = Object.keys(bookObject).filter(key => !bookObject[key]);
    if (emptyFields.length) return res.status(400).json({ message: `Champs vides : ${emptyFields.join(", ")}` });

    const book = new Book({
      ...bookObject,
      userId: req.auth.userId, // ID de l'utilisateur connecté
      imageUrl: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : "",
    });

    await book.save(); // Sauvegarde dans la DB
    res.status(201).json({ message: "Livre créé !", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5️⃣ Modifier un livre existant
const editBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Livre non trouvé !" });

    // Vérifie que l'utilisateur est le propriétaire
    if (String(book.userId) !== String(req.auth.userId)) {
      return res.status(403).json({ error: "Action non autorisée !" });
    }

    // Préparer les nouvelles données
    const bookObject = req.file
      ? { ...JSON.parse(req.body.book), imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }
      : { ...req.body };

    // Vérification des champs vides
    const emptyFields = Object.keys(bookObject).filter(key => !bookObject[key]);
    if (emptyFields.length) return res.status(400).json({ message: `Champs vides : ${emptyFields.join(", ")}` });

    await Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id });
    res.status(200).json({ message: "Livre mis à jour !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 6️⃣ Supprimer un livre
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Livre non trouvé !" });

    if (String(book.userId) !== String(req.auth.userId)) {
      return res.status(403).json({ error: "Action non autorisée !" });
    }

    // Supprimer l'image du serveur si elle existe
    if (book.imageUrl) {
      const filename = book.imageUrl.split("/images/")[1];
      if (filename) fs.unlink(`images/${filename}`, () => {});
    }

    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Livre supprimé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 7️⃣ Ajouter une note à un livre
const setRating = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Livre non trouvé !" });

    const userId = req.auth.userId;        // ID de l'utilisateur connecté
    const { rating } = req.body;           // Note envoyée par l'utilisateur

    if (rating === undefined) return res.status(400).json({ error: "Champs manquants." });

    // Empêche de noter plusieurs fois le même livre
    if (book.ratings.some(r => r.userId === userId)) {
      return res.status(400).json({ error: "Vous avez déjà noté ce livre." });
    }

    // Ajoute la note et recalcule la moyenne
    book.ratings.push({ userId, grade: rating });
    book.averageRating = book.ratings.reduce((sum, r) => sum + r.grade, 0) / book.ratings.length;

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ------------------- Export -------------------
module.exports = {
  getBooks,
  getOneBook,
  getBestRating,
  setBooks,
  editBook,
  deleteBook,
  setRating,
};




