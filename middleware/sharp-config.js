// ------------------- Modules -------------------
// Sharp : pour redimensionner et optimiser les images
const sharp = require("sharp");
// FS : pour manipuler le système de fichiers, ex: supprimer un fichier
const fs = require("fs");

// ------------------- Middleware d'optimisation -------------------
module.exports = async (req, res, next) => {
  // Si aucun fichier n'est uploadé, on ne fait rien et on continue
  if (!req.file) return next();

  // Chemin vers le fichier original uploadé
  const originalPath = `images/${req.file.filename}`;
  // Chemin du fichier optimisé (ajout du préfixe "opt_")
  const optimizedPath = `images/opt_${req.file.filename}`;

  try {
    // Sharp : redimensionner et convertir en WebP pour réduire le poids
    await sharp(originalPath)
      .resize({ width: 800 })         // largeur max 800px, hauteur ajustée automatiquement
      .webp({ quality: 80 })          // compression qualité 80%
      .toFile(optimizedPath);         // sauvegarde du fichier optimisé

    // Supprimer l'image originale pour ne conserver que l'image optimisée
    fs.unlinkSync(originalPath);

    // Mise à jour du nom de fichier dans req.file pour que le contrôleur utilise le bon fichier
    req.file.filename = `opt_${req.file.filename}`;

    // Passage au middleware suivant
    next();
  } catch (err) {
    console.error("⚠️ Erreur lors de l'optimisation de l'image :", err);
    next(err);
  }
};

