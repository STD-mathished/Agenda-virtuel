# Agendai

Agendai est un projet d'application web full-stack d'agenda personnel. Il est conçu pour vous aider à organiser vos tâches de manière efficace et intuitive.

Le projet est divisé en deux parties principales :
* **`/frontend`** : Une application client construite avec **React** (utilisant Vite) et **TypeScript**.
* **`/backend`** : Une API RESTful construite avec **FastAPI** (Python) et **SQLAlchemy** pour la gestion de la base de données basée sur PostgreSQL.

## Architecture globale

L'application suit une architecture microservices conteneurisée avec Docker :

- **Frontend** : Interface utilisateur React/TypeScript servie par Vite, accessible sur le port 5173.
- **Backend** : API FastAPI exposant les endpoints REST pour la gestion des tâches et catégories, sur le port 8000.
- **Base de données** : PostgreSQL pour le stockage persistant des données, sur le port 5432.
- **Authentification** : Keycloak pour la gestion des utilisateurs et de l'authentification, sur le port 8080.

Les services communiquent via un réseau Docker, et les données sont persistées dans des volumes nommés.

### Diagramme d'architecture

```
[Frontend (React/Vite)] <--> [Backend (FastAPI)] <--> [PostgreSQL]
                              |
                              v
                       [Keycloak (Auth)]
```

## Fonctionnalités

* Lister les catégories de tâches.
* Lister toutes les tâches.
* Filtrer et afficher les tâches pour un jour spécifique.
* Créer, mettre à jour et supprimer des tâches (en développement).
* Authentification utilisateur via Keycloak.

## Technologies utilisées

* **Frontend** :
    * [React](https://reactjs.org/) - Bibliothèque pour l'interface utilisateur
    * [Vite](https://vitejs.dev/) - Outil de build rapide
    * [TypeScript](https://www.typescriptlang.org/) - Typage statique
    * [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitaire
    * [Zustand](https://zustand-demo.pmnd.rs/) - Gestion d'état légère
    * [React Router](https://reactrouter.com/) - Routage côté client

* **Backend** :
    * [FastAPI](https://fastapi.tiangolo.com/) - Framework web pour APIs
    * [SQLAlchemy](https://www.sqlalchemy.org/) - ORM Python
    * [PostgreSQL](https://www.postgresql.org/) - Base de données relationnelle
    * [Alembic](https://alembic.sqlalchemy.org/) - Outil de migration de base de données

* **Infrastructure** :
    * [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) - Conteneurisation
    * [Keycloak](https://www.keycloak.org/) - Gestion d'identité et d'accès

## Structure du projet

```
agenda-virtuel/
├── backend/                 # Code source du backend
│   ├── api/                 # Points d'entrée de l'API FastAPI
│   │   ├── basemodels/      # Schémas Pydantic
│   │   └── main.py          # Application FastAPI principale
│   ├── db/                  # Configuration et modèles de base de données
│   │   ├── models/          # Modèles SQLAlchemy
│   │   └── scripts/         # Scripts de base de données et seeds
│   ├── alembic/             # Migrations de base de données
│   ├── requirements.txt     # Dépendances Python
│   └── Dockerfile           # Configuration Docker pour le backend
├── frontend/                # Code source du frontend
│   ├── src/                 # Source React/TypeScript
│   │   ├── components/      # Composants React
│   │   ├── pages/           # Pages de l'application
│   │   ├── hooks/           # Hooks personnalisés
│   │   └── types/           # Types TypeScript
│   ├── package.json         # Dépendances Node.js
│   └── Dockerfile           # Configuration Docker pour le frontend
├── keycloak_data/           # Données persistantes Keycloak
├── docker-compose.yml       # Orchestration des services Docker
└── README.md                # Ce fichier
```

## Installation et Lancement

Le projet est entièrement conteneurisé avec Docker pour simplifier le lancement en local.

### 1. Prérequis

* [Docker](https://www.docker.com/) (version 20.10 ou supérieure)
* [Docker Compose](https://docs.docker.com/compose/) (version 2.0 ou supérieure)
* Au moins 4GB de RAM disponible pour les conteneurs

### 2. Configuration

1. Clonez le repository :
   ```bash
   git clone https://github.com/votre-username/agenda-virtuel.git
   cd agenda-virtuel
   ```

2. Créez un fichier `.env` à la racine du projet avec les variables d'environnement nécessaires :
   ```bash
   # Base de données
   DB_NAME=agenda_db
   DB_USER=user_agenda
   DB_PASSWORD=password_agenda
   DB_PORT=5432
   DB_HOST=db

   # Keycloak
   KEYCLOAK_ADMIN=admin
   KEYCLOAK_ADMIN_PASSWORD=admin
   KC_DB_URL=jdbc:postgresql://db:5432/agenda_db
   KC_DB_USERNAME=user_agenda
   KC_DB_PASSWORD=password_agenda
   ```

   **Note** : Modifiez les valeurs selon vos besoins de sécurité. `DB_HOST` doit correspondre au nom du service dans `docker-compose.yml`.

### 3. Lancement

1. Lancez tous les services :
   ```bash
   docker-compose up --build
   ```

   Cette commande :
   - Construit les images Docker pour le frontend et le backend
   - Démarre PostgreSQL, Keycloak, le backend et le frontend
   - Configure automatiquement les dépendances entre services

2. Attendez que tous les conteneurs soient prêts (cela peut prendre quelques minutes la première fois).

### 4. Accès aux services

Une fois les conteneurs démarrés, l'application est accessible aux adresses suivantes :

* **Frontend** : `http://localhost:5173` - Interface utilisateur principale
* **Backend API** : `http://localhost:8000` - API REST
* **Documentation API** : `http://localhost:8000/docs` - Interface Swagger UI
* **Keycloak Admin** : `http://localhost:8080` - Console d'administration (utilisateur: admin, mot de passe: admin)

### 5. Arrêt des services

Pour arrêter tous les services :
```bash
docker-compose down
```

Pour supprimer également les volumes (données persistantes) :
```bash
docker-compose down -v
```

## Développement

### Backend

Pour développer le backend localement :
```bash
cd backend
pip install -r requirements.txt
# Configurez votre base de données locale
alembic upgrade head  # Appliquer les migrations
uvicorn api.main:app --reload
```

### Frontend

Pour développer le frontend localement :
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints principaux

- `GET /categories` - Liste des catégories
- `GET /taches` - Liste de toutes les tâches
- `GET /taches/{date}` - Tâches pour une date spécifique
- `POST /taches` - Créer une nouvelle tâche

Consultez `http://localhost:8000/docs` pour la documentation complète.

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commitez vos changements (`git commit -am 'Ajout de nouvelle fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
