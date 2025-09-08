const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Critères de sécurité pour le mot de passe
const MIN_LENGTH = 8;
const REGEX_UPPERCASE = /[A-Z]/;
const REGEX_LOWERCASE = /[a-z]/;
const REGEX_DIGIT = /[0-9]/;
const REGEX_SPECIAL = /[\W_]/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Vérifie la force du mot de passe
function checkPasswordStrength(password) {
  let errors = [];

  if (!password) {
    errors.push("Password is not defined.");
    return errors;
  }

  if (password.length < MIN_LENGTH) {
    errors.push(`Password must have at least ${MIN_LENGTH} characters.`);
  }
  if (!REGEX_UPPERCASE.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!REGEX_LOWERCASE.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!REGEX_DIGIT.test(password)) {
    errors.push("Password must contain at least one digit.");
  }
  if (!REGEX_SPECIAL.test(password)) {
    errors.push("Password must contain at least one special character.");
  }

  return errors;
}

// Enregistrement d'un utilisateur
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errors = checkPasswordStrength(password);

    if (!REGEX_EMAIL.test(email)) {
      errors.push("Email is not valid.");
    }

    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      return res.status(400).json({ errors });
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ errors: ["Email already registered."] });
    }

    // Hash du mot de passe
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      email: email.toLowerCase(),
      password: hash,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Connexion d'un utilisateur
const login = (req, res, next) => {
  let email = req.body.email.toLowerCase();
  let password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found!" });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password!" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports = { register, login };
