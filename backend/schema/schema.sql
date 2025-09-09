-- Création de la table des tâches
CREATE TABLE IF NOT EXISTS taches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    description TEXT,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_echeance DATETIME,
    priorite INTEGER DEFAULT 2 CHECK(priorite BETWEEN 1 AND 3),
    est_termine BOOLEAN DEFAULT 0
);

-- Création de la table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL UNIQUE
);

-- Table de liaison pour associer les tâches aux catégories
CREATE TABLE IF NOT EXISTS taches_categories (
    tache_id INTEGER,
    categorie_id INTEGER,
    PRIMARY KEY (tache_id, categorie_id),
    FOREIGN KEY (tache_id) REFERENCES taches (id) ON DELETE CASCADE,
    FOREIGN KEY (categorie_id) REFERENCES categories (id) ON DELETE CASCADE
);

-- Insertion des catégories par défaut
INSERT OR IGNORE INTO categories (nom) VALUES 
('Travail'),
('Personnel'),
('Courses'),
('Santé'),
('Urgent');