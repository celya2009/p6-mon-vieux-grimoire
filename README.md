# Mon vieux Grimoire

Cette API est développée avec **Node.js** et **MongoDB**.  
Elle permet de :

- Consulter tous les livres présents dans la base de données
- Consulter un livre précis par son ID
- Consulter les 3 livres avec la meilleure note moyenne
- Créer des utilisateurs
- Permettre aux utilisateurs de se connecter
- Créer un livre (authentification requise)
- Modifier un livre (authentification requise)
- Supprimer un livre (authentification requise)
- Noter un livre (authentification requise)

---

## Lancer le projet

### Avec npm

1️⃣ Ouvrir un terminal à la racine du projet et exécuter :

Cela démarre le serveur backend sur le **port 4000**.

2️⃣ Le front-end doit être lancé sur le **port 3000**, car seul ce port est autorisé via le CORS.

- Backend = API qui gère les livres et les utilisateurs  
- Frontend = interface visible par l’utilisateur  
- CORS = sécurité qui permet au front-end de communiquer avec le backend uniquement depuis le port autorisé

