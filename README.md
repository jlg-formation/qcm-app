# QCM App - Application de Quiz Dynamique

## Description

QCM App est une application web permettant de générer et répondre à des questionnaires à choix multiples (QCM). L'application utilise l'API OpenAI pour générer dynamiquement des questions en fonction des préférences de l'utilisateur.

Développée avec **Vue 3**, **TypeScript**, **Vite**, et **TailwindCSS**, l'application offre une interface fluide et responsive.

## Fonctionnalités principales

- 📌 **Génération dynamique de questions** grâce à l'API OpenAI.
- 🎯 **Interface utilisateur intuitive et responsive** avec Vue 3 et TailwindCSS.
- 💾 **Sauvegarde de la clé API OpenAI** dans le `localStorage` pour éviter de la saisir à chaque utilisation.
- ✅ **Mode interactif** permettant aux utilisateurs de répondre aux questions générées.
- 📊 **Affichage des scores et résultats** après chaque session.
- 🚀 **Déploiement facile sur GitHub Pages**.

## Installation et exécution

### Prérequis

- Node.js installé (version recommandée: LTS)
- `pnpm` comme gestionnaire de paquets

### Étapes d'installation

1. **Cloner le dépôt**
   ```sh
   git clone https://github.com/jlg-formation/qcm-app.git
   cd qcm-app
   ```
2. **Installer les dépendances**
   ```sh
   pnpm install
   ```
3. **Lancer le serveur de développement**
   ```sh
   pnpm dev
   ```

L'application sera accessible sur `http://localhost:5173`.

## Déploiement sur GitHub Pages

L'application est configurée pour être déployée facilement via **GitHub Actions**.

1. Pousser les modifications sur la branche `main`.
2. Une action GitHub déploiera automatiquement la dernière version sur **GitHub Pages**.

## Contribution

Les contributions sont les bienvenues ! Pour proposer des améliorations :

1. Forker le projet.
2. Créer une nouvelle branche : `git checkout -b feature/nouvelle-fonctionnalite`.
3. Committer vos modifications : `git commit -m 'Ajout d'une nouvelle fonctionnalité'`.
4. Pousser la branche : `git push origin feature/nouvelle-fonctionnalite`.
5. Ouvrir une **Pull Request**.

## Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

---

🚀 **Profitez du QCM App et testez vos connaissances !**
