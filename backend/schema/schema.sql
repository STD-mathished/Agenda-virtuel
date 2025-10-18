BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE : taches
CREATE TABLE IF NOT EXISTS taches (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titre           TEXT NOT NULL,
    description     TEXT,
    date_creation   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    date_echeance   TIMESTAMPTZ,
    priorite        SMALLINT NOT NULL DEFAULT 2 CHECK (priorite BETWEEN 1 AND 3),
    est_termine     BOOLEAN NOT NULL DEFAULT FALSE
);

-- TABLE : categories
CREATE TABLE IF NOT EXISTS categories (
    id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom  TEXT NOT NULL UNIQUE
);

-- TABLE : taches_categories
CREATE TABLE IF NOT EXISTS taches_categories (
    tache_id     UUID NOT NULL,
    categorie_id UUID NOT NULL,
    PRIMARY KEY (tache_id, categorie_id),
    FOREIGN KEY (tache_id) REFERENCES taches(id) ON DELETE CASCADE,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Données par défaut
INSERT INTO categories (nom) VALUES
  ('Travail'),
  ('Personnel'),
  ('Courses'),
  ('Sante'),
  ('Urgent')
ON CONFLICT (nom) DO NOTHING;

-- Validation de la transaction
COMMIT;
