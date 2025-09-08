const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
});

// Hasher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Méthode pour comparer le mot de passe lors du login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour générer un token JWT
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  this.token = token;
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
