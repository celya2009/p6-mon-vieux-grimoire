// ------------------- Modules -------------------
const mongoose = require("mongoose");       // Pour gérer la base de données MongoDB
const bcrypt = require("bcryptjs");         // Pour hasher les mots de passe
const jwt = require("jsonwebtoken");        // Pour générer les tokens JWT
require("dotenv").config();                 // Charge les variables d'environnement (.env)

// ------------------- Schéma de l'utilisateur -------------------
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,     // Email obligatoire
    trim: true,         // Supprime les espaces inutiles
    unique: true,       // Pas deux mêmes emails
  },
  password: {
    type: String,
    required: true,     // Mot de passe obligatoire
    minlength: 8,       // Minimum 8 caractères
  },
  token: {
    type: String,       // Stocke le token JWT si besoin
  },
});

// ------------------- Middleware avant sauvegarde -------------------
// Hash le mot de passe automatiquement avant d'enregistrer l'utilisateur
userSchema.pre("save", async function (next) {
  // Si le mot de passe n'a pas été modifié, on ne refait pas le hash
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);        // Génère un "sel" pour sécuriser le hash
    this.password = await bcrypt.hash(this.password, salt); // Hash du mot de passe
    next();
  } catch (err) {
    next(err);
  }
});

// ------------------- Méthode pour comparer les mots de passe -------------------
userSchema.methods.comparePassword = async function (candidatePassword) {
  // Compare le mot de passe saisi avec le mot de passe hashé
  return bcrypt.compare(candidatePassword, this.password);
};

// ------------------- Méthode pour générer un token JWT -------------------
userSchema.methods.generateAuthToken = function () {
  // Génère un token JWT valable 24h
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  this.token = token; // Stocke le token dans l'utilisateur
  return token;
};

// ------------------- Création du modèle -------------------
const User = mongoose.model("User", userSchema);

// ------------------- Export -------------------
module.exports = User;
