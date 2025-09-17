// ------------------- Modules -------------------
const mongoose = require("mongoose");  // Pour créer le schéma et interagir avec MongoDB

// ------------------- Schéma du livre -------------------
const bookSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true, // ID de l'utilisateur qui a créé le livre
    },
    title: {
      type: String,
      required: true, // Titre du livre obligatoire
    },
    author: {
      type: String,
      required: true, // Auteur obligatoire
    },
    imageUrl: {
      type: String,
      required: true, // URL de l'image du livre
    },
    year: {
      type: Number,
      required: true, // Année de publication
    },
    genre: {
      type: String,
      required: true, // Genre du livre
    },
    ratings: [
      {
        userId: {
          type: String,
          required: true, // ID de l'utilisateur qui a noté
        },
        grade: {
          type: Number,
          required: true, // Note donnée par l'utilisateur
        },
      },
    ],
    averageRating: {
      type: Number, // Moyenne des notes pour ce livre
      required: false,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// ------------------- Modèle -------------------
const Book = mongoose.model("Book", bookSchema);

// ------------------- Export -------------------
module.exports = Book;

