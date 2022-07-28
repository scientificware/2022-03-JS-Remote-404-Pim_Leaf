![Logo Pimleaf](/frontend/src/assets/logo_text.png)

# Lancer l'application en local :rocket:

### Logiciels minimum à installer :

- vscode
- git
- node
- mysql

### Cloner le projet :

1. Lancer un git clone dans un dossier local lié à ce repo GitHub.
2. Lancer la commande `npm install` depuis un terminal sur le dossier racine.

   > la commande npm install peut s'aliaser en `npm i` ou `npm add`.

3. Lancer de nouveau la commande `npm install` depuis le dossier "/frontend" puis depuis le dossier **"/backend"**.
4. Depuis le dossier **"/backend"**, lancer la commande `npm run migrate` pour peupler la Base de Données des ressources d'exemple.
5. Copier les fichiers **".env.sample"** dans les dossiers **"/frontend"** et **"/backend"** respectivement.
6. Renommer les copies en **".env"** et injecter les données personnelles pour vous connecter à votre Base de Données.

### Déployer le projet :

- Lancer la commande `npm run dev` depuis le dossier racine pour voir le site déployé en http://localhost:3000 par défaut.

# Fonctionnement de ReactJS v6 :robot:

### Principe de base

Le principe de React est de gérer des composants qui sont affichés sur la page internet.

À chaque fois que l'état d'un composant change, React le recharge pour afficher les changements l'affectant. Cela a pour effet de changer dynamiquement l'affichage de la page internet sans consommer trop de ressources car seul le (ou les) composant affecté est re-rendu.

### Les States

L'état d'un composant change le plus souvent en fonction du changement des **"states"** qui l'affectent. Ces states sont des variables de React qui doivent être changées par React. Elles s'écrivent sous la forme :

```js
const [state, setState] = useState(initialValue);
```

### L'imbrication

Les composants sont **imbriqués** entre parents et enfants.

Les states peuvent passer en **_props_** _des parents aux enfants_, mais _pas des enfants aux parents_.

> Dans le contexte de ReactJS, une _props_ est un argument.

# Hiérarchie interne du projet :arrows_counterclockwise:

Le projet est découpé en deux parties distinctes : le **/backend** et **/frontend**.

## Backend

- "migrate.js" & "database.sql" : fichiers de ressources BDD.
- ".env" : contient les données confidentielles du back.
- "src"
  1. "app.js" : point d'entrée du back en Express. Il fait appel à plusieurs fichiers et renvoie vers "router.js".
  2. "router.js" : contient les routes qui passent par les middlewares ("/middlewares") avant d'être renvoyées vers les contrôleurs ("/controllers").
  3. "middlewares" : actions à réaliser pour formater les données envoyées depuis le front avant de pouvoir les transmettre aux contrôleurs.
  4. les contrôleurs renvoient vers les modèles/managers ("/models") qui réalisent les requêtes SQL.
  5. les modèles renvoient ensuite la donnée aux contrôleurs qui la renvoient au front.

## Frontend

- "tailwind.config.js", "postcss.config.js" : fichiers pour gérer le style de Tailwind appliqué dans le projet.
- "vite.config.js" : fichier de configuration de Vite (contient principalement les alias des routes front).
- ".env" : contient la route d'appel du back.
- "index.html" : point d'entrée du navigateur qui appelle le point d'entrée de l'application React : "main.jsx".
- "src"

  - assets : dossier des ressources utilisées
  - contexts : contient les fichiers pour pouvoir générer des states pour le profil utilisateur partout dans l'application.

  1. "main.jsx" : point d'entrée de React. Appelle "App.jsx".
  2. "App.jsx" : définit les routes front et appelle les pages et quelques composants comme le "layout" pour sécuriser les routes.
  3. pages : dossier qui contient les pages visibles sur le navigateur. Elles sont composées des composants ("/components") et lancent parfois des appels au back via **axios**.
  4. components : dossier qui contient des éléments de code réutilisables sur les pages.

  # Mot de la fin :smile_cat:

  Merci d'avoir fait confiance à l'équipe de 5DEV. On souhaite bonne route à PimLeaf.
