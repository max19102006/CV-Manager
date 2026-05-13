# 📄 CV Manager — Devoir 3

Application web de gestion de CVs développée en **TypeScript pur** (sans framework), avec persistance locale via **IndexedDB**.

---

## 📌 Description du projet

CV Manager est une application permettant à un utilisateur de créer, consulter, modifier et supprimer des CVs directement dans le navigateur. Toutes les données (informations personnelles, photos, vidéos, etc.) sont stockées localement dans **IndexedDB**, sans aucun backend.

---

## ✨ Fonctionnalités

- ✅ Créer un CV via un formulaire
- ✅ Enregistrer les données (textes, photos, vidéos) dans IndexedDB
- ✅ Afficher la liste des CVs enregistrés
- ✅ Modifier un CV existant (clic sur un CV → formulaire pré-rempli)
- ✅ Supprimer un CV

---

## 🛠️ Technologies utilisées

| Technologie | Rôle                                 |
|-------------|--------------------------------------|
| TypeScript  | Langage principal (sans framework)   |
| IndexedDB   | Base de données locale du navigateur |
| HTML / CSS  | Interface utilisateur                |

---

## 👥 Équipe & Répartition des tâches

| # | Membre | Tâche                                                                          |
|---|--------|--------------------------------------------------------------------------------|
| 1 | Membre 1 | Initialisation du projet, configurationTypeScript & structure des fichiers   |   
--                                                                   
| 2 | Membre 2 | Mise en place d'IndexedDB (connexion, création du store)                     |
--
| 3 | Membre 3 | Fonctionnalité **Créer** un CV (formulaire + sauvegarde)                     |
--
| 4 | Membre 4 | Fonctionnalité **Afficher** la liste des CVs                                 |
--
| 5 | Membre 5 | Fonctionnalité **Modifier** un CV (chargement dans le formulaire + mise à jour) |
--
| 6 | Membre 6 | Fonctionnalité **Supprimer** un CV                                           |
--
| 7 | Membre 7 | Interface utilisateur (HTML/CSS) + intégration finale                        |

---

## 🚀 Lancement du projet

```bash
# Cloner le dépôt
git clone https://github.com/max19102006/cv-manager.git
cd cv-manager

# Installer les dépendances (TypeScript)
npm install

# Compiler le TypeScript
npx tsc

# Ouvrir index.html dans le navigateur
```

---

## 📁 Structure du projet

```
cv-manager/
├── src/
│   ├── db.ts          # Initialisation et gestion d'IndexedDB
│   ├── cv.ts          # Modèle de données du CV
│   ├── form.ts        # Gestion du formulaire
│   └── main.ts        # Point d'entrée
├── dist/              # Fichiers compilés
├── index.html
├── style.css
├── tsconfig.json
└── README.md
```

---

## 📝 Auteurs

Groupe — Licence 2 Informatique | Université de Yaoundé 1
