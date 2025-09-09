from datetime import datetime, timedelta
from db import get_connection

# Essaye d'importer get_cursor(con) si tu l'as défini dans db.py
try:
    from db import get_cursor  
except Exception:
    get_cursor = None  


def ensure_foreign_keys(cur):
    cur.execute("PRAGMA foreign_keys = ON;")

def get_or_create_category(cur, name: str) -> int:
    cur.execute("SELECT id FROM categories WHERE nom = ?", (name,))
    row = cur.fetchone()
    if row:
        return row[0]
    cur.execute("INSERT INTO categories(nom) VALUES (?)", (name,))
    return cur.lastrowid

def get_or_create_task(cur, titre: str, description=None, date_echeance=None, priorite=2, est_termine=0) -> int:
    cur.execute("SELECT id FROM taches WHERE titre = ?", (titre,))
    row = cur.fetchone()
    if row:
        return row[0]
    cur.execute(
        """
        INSERT INTO taches (titre, description, date_echeance, priorite, est_termine)
        VALUES (?, ?, ?, ?, ?)
        """,
        (titre, description, date_echeance, priorite, est_termine),
    )
    return cur.lastrowid

def link_task_category(cur, tache_id: int, categorie_id: int):
    # idempotent grâce à la PK composite
    cur.execute(
        "INSERT OR IGNORE INTO taches_categories (tache_id, categorie_id) VALUES (?, ?)",
        (tache_id, categorie_id),
    )

def seed_data(cur):
    """
    Insère des tâches de démonstration + liaisons avec catégories.
    Catégories attendues par le schéma: Travail, Personnel, Courses, Santé, Urgent
    On les crée si elles n'existent pas encore (INSERT OR IGNORE déjà dans ton schema.sql,
    mais on couvre aussi le cas où il n'aurait pas été appliqué).
    """
    # Catégories de base
    cat_names = ["Travail", "Personnel", "Courses", "Santé", "Urgent"]
    cat_ids = {name: get_or_create_category(cur, name) for name in cat_names}

    today = datetime.now()
    d = lambda days: (today + timedelta(days=days)).strftime("%Y-%m-%d %H:%M:%S")

    # Données de tâches (titre, description, échéance, priorité, terminé, catégories)
    tasks = [
        (
            "Préparer la présentation sprint",
            "Compiler les stats de vélocité et rédiger les slides.",
            d(2), 3, 0, ["Travail", "Urgent"]
        ),
        (
            "Course hebdo",
            "Fruits, légumes, pâtes, lait, œufs, café.",
            d(1), 2, 0, ["Courses", "Personnel"]
        ),
        (
            "Révision contrôle médical",
            "Récupérer ordonnances et résultats d’analyses.",
            d(7), 2, 0, ["Santé", "Personnel"]
        ),
        (
            "Nettoyage appartement",
            "Salon + cuisine + salle de bain.",
            d(5), 1, 0, ["Personnel"]
        ),
        (
            "Déployer la version 1.2",
            "Tag release, migration SQLite, changelog, rollback plan.",
            d(0), 3, 0, ["Travail", "Urgent"]
        ),
        (
            "Appeler le dentiste",
            "Décaler le rendez-vous de contrôle d’une semaine.",
            d(3), 1, 0, ["Santé"]
        ),
        (
            "Payer la facture électricité",
            "Vérifier le montant et le prélèvement.",
            d(4), 2, 0, ["Urgent", "Personnel"]
        ),
        (
            "Préparer repas de la semaine",
            "Batch-cooking: bolognaise, curry de légumes, poulet rôti.",
            d(2), 1, 0, ["Personnel", "Courses"]
        ),
        (
            "Rédiger la doc d’installation",
            "README + scripts d’init + exemples d’ENV.",
            d(6), 2, 0, ["Travail"]
        ),
        (
            "Étirements & mobilité",
            "Routine 20 minutes (dos/épaules/ischios).",
            d(1), 1, 0, ["Santé", "Personnel"]
        ),
        (
            "Clore les tickets obsolètes",
            "Passer en DONE / WONTFIX selon le cas.",
            d(3), 2, 0, ["Travail"]
        ),
        (
            "Acheter médicaments",
            "Paracétamol + spray nasal.",
            d(0), 2, 0, ["Santé", "Courses", "Urgent"]
        ),
    ]

    for titre, desc, echeance, prio, done, cats in tasks:
        t_id = get_or_create_task(cur, titre, desc, echeance, prio, done)
        for c in cats:
            link_task_category(cur, t_id, cat_ids[c])


def main():
    con = get_connection()
    cur = get_cursor() if callable(get_cursor) else con.cursor()

    ensure_foreign_keys(cur)
    seed_data(cur)

    con.commit()
    con.close()
    print("✅ Données de démo insérées (ou déjà présentes).")

if __name__ == "__main__":
    main()
