# Schéma de la Base de Données Agendai

```mermaid
erDiagram
    USERS ||--o{ TACHES : "possède"
    USERS ||--o{ CATEGORIES : "possède"
    TACHES }|--o{ TACHES_CATEGORIES : "est liée à"
    CATEGORIES }|--o{ TACHES_CATEGORIES : "contient"

    USERS {
        uuid sub PK "ID Keycloak (Identifiant unique)"
        string preferred_username
    }

    TACHES {
        uuid id PK "Généré aléatoirement"
        uuid createur_id FK "Lien vers l'ID Keycloak"
        text titre "Obligatoire"
        text description
        datetime date_creation "Défaut: Now"
        datetime date_echeance
        smallint priorite "Entre 1 et 3"
        boolean est_termine "Défaut: False"
    }

    CATEGORIES {
        uuid id PK "Généré aléatoirement"
        uuid createur_id FK "Lien vers l'ID Keycloak"
        text nom "Unique par utilisateur"
    }

    TACHES_CATEGORIES {
        uuid tache_id PK, FK
        uuid categorie_id PK, FK
    }