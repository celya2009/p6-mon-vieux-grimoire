// =================== Fichier : auth.controller.js ===================
// Fonction principale : register & login
// But : Gérer l'inscription et la connexion des utilisateurs
// Utilité : Permet de sécuriser l'accès à certaines parties de l'application (ex : créer/modifier des livres)

// ------------------- Modules -------------------
const User = require("../models/auth.model"); // Modèle Mongoose pour les utilisateurs
const bcrypt = require("bcryptjs");           // Pour hasher et comparer les mots de passe
const jwt = require("jsonwebtoken");          // Pour générer des tokens d'authentification

// ------------------- Critères de sécurité -------------------
const MIN_LENGTH = 8;                          // Mot de passe : minimum 8 caractères
const REGEX_UPPERCASE = /[A-Z]/;              // Au moins une majuscule
const REGEX_LOWERCASE = /[a-z]/;              // Au moins une minuscule
const REGEX_DIGIT = /[0-9]/;                  // Au moins un chiffre
const REGEX_SPECIAL = /[\W_]/;                // Au moins un caractère spécial
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Format email valide

// ------------------- Fonction utilitaire -------------------
// Vérifie la force du mot de passe selon les critères ci-dessus
function checkPasswordStrength(password) {
  let errors = [];

  if (!password) {
    errors.push("Password is not defined.");
    return errors;
  }

  if (password.length < MIN_LENGTH) errors.push(`Password must have at least ${MIN_LENGTH} characters.`);
  if (!REGEX_UPPERCASE.test(password)) errors.push("Password must contain at least one uppercase letter.");
  if (!REGEX_LOWERCASE.test(password)) errors.push("Password must contain at least one lowercase letter.");
  if (!REGEX_DIGIT.test(password)) errors.push("Password must contain at least one digit.");
  if (!REGEX_SPECIAL.test(password)) errors.push("Password must contain at least one special character.");

  return errors; // Retourne la liste des erreurs
}

// ------------------- Inscription -------------------
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Vérifie la force du mot de passe
    const errors = checkPasswordStrength(password);

    // Vérifie la validité de l'email
    if (!REGEX_EMAIL.test(email)) errors.push("Email is not valid.");

    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      return res.status(400).json({ errors }); // Retourne les erreurs si email ou mot de passe invalides
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(400).json({ errors: ["Email already registered."] });

    // Hash du mot de passe pour le stocker en sécurité
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      email: email.toLowerCase(),
      password: hash,
    });

    await user.save(); // Sauvegarde de l'utilisateur dans la base

    res.status(201).json({ message: "User registered successfully!", user }); // Succès
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ------------------- Connexion -------------------
const login = (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(401).json({ error: "User not found!" });

      // Vérifie si le mot de passe correspond au hash stocké
      bcrypt.compare(password, user.password)
        .then((valid) => {
          if (!valid) return res.status(401).json({ error: "Incorrect password!" });

          // Génère un token JWT valide 24h pour l'utilisateur
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// ------------------- Export -------------------
module.exports = { register, login };


