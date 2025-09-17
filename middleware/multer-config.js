// =================== Fichier : multer-config.js ===================
// Fonction principale : gérer l'upload des images envoyées par le client

const multer = require("multer"); // On importe Multer, le middleware pour gérer les fichiers

// ------------------- Types MIME autorisés -------------------
// On définit quels formats d'image sont acceptés
// Cela empêche les utilisateurs d'envoyer des fichiers non désirés
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
};

// ------------------- Configuration du stockage -------------------
// Définition de l'endroit où seront stockées les images et leur nom
const storage = multer.diskStorage({
  // destination : le dossier où Multer va stocker les fichiers
  destination: (req, file, callback) => {
    callback(null, "images"); // Tous les fichiers vont dans le dossier "images"
  },
  // filename : nom final du fichier stocké
  filename: (req, file, callback) => {
    // On remplace les espaces par des underscores pour éviter les problèmes
    const name = file.originalname.split(" ").join("_");
    // On récupère l'extension correcte selon le type MIME
    const extension = MIME_TYPES[file.mimetype];
    // On ajoute un timestamp pour éviter que deux fichiers aient le même nom
    callback(null, name + Date.now() + "." + extension);
  }
});

// ------------------- Export -------------------
// .single("image") signifie qu'on attend un seul fichier envoyé avec le champ 'image'
// Ce middleware sera utilisé dans les routes pour gérer l'upload des images
module.exports = multer({ storage: storage }).single("image");


