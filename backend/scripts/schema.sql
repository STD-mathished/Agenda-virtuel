CREATE TABLE IF NOT EXISTS categories (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS taches (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titre TEXT NOT NULL,
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_echeance TIMESTAMP,
    priorite INTEGER DEFAULT 2 CHECK (priorite BETWEEN 1 AND 3),
    est_termine BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS taches_categories (
    tache_id INTEGER NOT NULL,
    categorie_id INTEGER NOT NULL,
    PRIMARY KEY (tache_id, categorie_id),
    CONSTRAINT fk_tache FOREIGN KEY (tache_id) REFERENCES taches (id) ON DELETE CASCADE,
    CONSTRAINT fk_categorie FOREIGN KEY (categorie_id) REFERENCES categories (id) ON DELETE CASCADE
);

INSERT INTO categories (nom) VALUES
('Travail'), ('Personnel'), ('Courses'), ('Sante'), ('Urgent')
ON CONFLICT (nom) DO NOTHING;
