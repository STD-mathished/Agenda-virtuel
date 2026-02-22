# Agendai

Agendai est un projet d'application web full-stack d'agenda personnel. Il est conçu pour vous aider à organiser vos tâches.

Le projet est divisé en deux parties principales :
* **`/frontend`** : Une application client construite avec **React** (utilisant Vite).
* **`/backend`** : Une API RESTful construite avec **FastAPI** (Python) et **SQLAlchemy** pour la gestion de la base de données basée sur postgreSQL.

## Fonctionnalités

* Lister les catégories de tâches.
* Lister toutes les tâches.
* Filtrer et afficher les tâches pour un jour spécifique.
* (Fonctionnalités à venir : Créer, mettre à jour et supprimer des tâches).

## Technologies utilisées

* **Frontend** :
    * [React]
    * [Vite]
* **Backend** :
    * [FastAPI]
    * [SQLAlchemy] (pour l'ORM)
    * [PostgresSQL]

## Installation et Lancement

Le projet est entièrement conteneurisé avec Docker pour simplifier le lancement en local.

### 1. Prérequis

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

### 2. Lancement

1.  Créez un fichier `.env` à la racine du projet avec les variables d'environnement nécessaires :
    ```bash
    DB_NAME=xxx
    DB_USER=xxxxx
    DB_PASSWORD=xxxx
    DB_PORT=xxxx
    DB_HOST=db
    ```
    *(Note : `DB_HOST` doit correspondre au nom du service de base de données dans votre `docker-compose.yml`, généralement `db` ou `postgres`)*

2.  Lancez les conteneurs depuis la racine du projet :
    ```bash
    docker-compose up --build
    ```

    Une fois les conteneurs démarrés, l'application est accessible aux adresses suivantes :
    *   **Frontend** : `http://localhost:5173`
    *   **Backend API** : `http://localhost:8000`
    *   **Documentation API** : `http://localhost:8000/docs`
