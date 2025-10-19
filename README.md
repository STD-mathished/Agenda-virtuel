# Agendai

Agendai est un projet d'application web full-stack d'agenda personnel. Il est conçu pour vous aider à organiser vos tâches.

Le projet est divisé en deux parties principales :
* **`/frontend`** : Une application client construite avec **React** (utilisant Vite).
* **`/backend`** : Une API RESTful construite avec **FastAPI** (Python) et **SQLAlchemy** pour la gestion de la base de données basée sur postgreeSQL.

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

Pour lancer l'application en mode développement local il faut :

### 1. Prérequis

* [Node.js](https://nodejs.org/) (v18+)
* [Python](https://www.python.org/) (v3.10+ recommandée)

### 2. Configuration du Backend (API)

L'API doit être lancée pour que le frontend puisse récupérer des données.

1.  **Ouvrez un premier terminal.**
2.  Placez-vous dans le dossier `backend` :
    ```bash
    cd backend
    ```
3.  (Optionnel mais recommandé) Créez un environnement virtuel :
    ```bash
    python -m venv venv
    source venv/bin/activate 
    ```
4.  Installez les dépendances Python :
    ```bash
    pip install -r requirements.txt
    ```
5.  Lancez le serveur FastAPI (Uvicorn) :
    *(**Important** : Lancez cette commande depuis la racine du dossier `agenda-virtuel`)*
    ```bash
    uvicorn backend.scripts.main:app --reload
    ```
    L'API est maintenant accessible à l'adresse `http://127.0.0.1:8000`.

### 3. Configuration du Frontend (Application)

1.  **Ouvrez un second terminal.**
2.  Placez-vous dans le dossier `frontend` :
    ```bash
    cd frontend
    ```
3.  Installez les dépendances Node.js :
    ```bash
    npm install
    ```
4.  Lancez le serveur de développement Vite :
    ```bash
    npm run dev
    ```
    Votre application est maintenant accessible à l'adresse `http://localhost:5173`.
