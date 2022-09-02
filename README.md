# Pré-requis

* [Git](https://git-scm.com/download/win)
* [Node.js](https://nodejs.org/en/)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [Concurrently](https://www.npmjs.com/package/concurrently)
* [PM2](https://www.npmjs.com/package/pm2)
* [Parcel](https://www.npmjs.com/package/parcel-bundler)

# Instance PostgreSQL et variables d'environnement (fichier .env ou .env.sample)

L'outil fonctionne avec une base de données PostgreSQL dont il faut renseigner votre propre instance dans .env (ou .env.sample). Ensuite, exécutez le SQL situé dans data/data.sql. Les données seront regroupées dans un schéma nommé _a_gestion_projet. Vous pourrez modifier les membres dans la table membres. Par défaut les mots de passe de chaque membre correspondent à 'test'. Pensez à les modifier et à insérer un mot de passe crypté (https://bcrypt.online/).

# Documentation

Il s'agit d'un outil de gestion de projets. Chaque groupe de travail contient des membres, des projets et des routines. Les projets et routines sont associés aux membres. Des tickets de suivi permettent de suivre l'avancement des projets/routines et sont associés aux membres. Chaque ticket contient un système de notification envoyant un mail aux membres associés au ticket (le mail est renseigné au préalable dans la table PostgreSQL des membres, voir plus bas). Au niveau de groupe, une boîte à outils permet de partager des outils et liens à l'ensemble du groupe.

# Installation

```
npm install
```

# Lancer l'application

```
npm run dev
```

En environnement de production (pour définir et paramétrer les environnements, voir la [documentation](http://srv-gitlab.audiar.net/rfroger/obs-prototype/-/tree/master/doc/config.md)) :

```
npm start
```