from datetime import datetime, timedelta
from sqlalchemy import text
from db import engine


def get_or_create_category(con, name: str) -> int:
    """Crée une catégorie si elle n'existe pas, et retourne son id."""
    row = con.execute(text("SELECT id FROM categories WHERE nom = :n"), {"n": name}).fetchone()
    if row:
        return row[0]
    row = con.execute(text("""
        INSERT INTO categories (nom)
        VALUES (:n)
        ON CONFLICT (nom) DO UPDATE SET nom = EXCLUDED.nom
        RETURNING id
    """), {"n": name}).fetchone()
    return row[0]


def get_or_create_task(con, titre: str, description=None, date_creation=None, date_echeance=None, priorite=2, est_termine=False) -> int:
    """Crée une tâche si elle n'existe pas, et retourne son id."""
    row = con.execute(text("SELECT id FROM taches WHERE titre = :t"), {"t": titre}).fetchone()
    if row:
        return row[0]

    row = con.execute(text("""
        INSERT INTO taches (titre, description, date_creation, date_echeance, priorite, est_termine)
        VALUES (:t, :d, :dc, :de, :p, :done)
        RETURNING id
    """), {"t": titre, "d": description, "dc": date_creation, "de": date_echeance, "p": priorite, "done": est_termine}).fetchone()
    return row[0]


def link_task_category(con, tache_id: int, categorie_id: int):
    """Lie une tâche à une catégorie (ignore les doublons)."""
    con.execute(text("""
        INSERT INTO taches_categories (tache_id, categorie_id)
        VALUES (:t, :c)
        ON CONFLICT (tache_id, categorie_id) DO NOTHING
    """), {"t": tache_id, "c": categorie_id})


def seed_data():
    """Insère les données avec des dates de création différentes."""
    with engine.begin() as con:
        cat_names = ["Travail", "Personnel", "Courses", "Santé", "Urgent", "Loisirs"]
        cat_ids = {name: get_or_create_category(con, name) for name in cat_names}

        today = datetime.now()
        d = lambda days: (today + timedelta(days=days))
        c = lambda days: (today - timedelta(days=days))  # création = passé

        tasks = [
            ("Faire le ménage complet", "Nettoyer salon, cuisine, salle de bain, aspirateur.", c(10), d(-1), 2, True, ["Personnel"]),
            ("Livrer le rapport client", "Envoyer le rapport du sprint terminé.", c(9), d(-2), 3, True, ["Travail"]),
            ("Aller à la pharmacie", "Acheter vitamines et désinfectant.", c(8), d(-1), 2, True, ["Santé", "Courses"]),

            ("Faire les sauvegardes", "Sauvegarder la base de données et les documents importants.", c(7), d(0), 2, False, ["Travail"]),
            ("Appeler maman", "Prendre des nouvelles et fixer un déjeuner dimanche.", c(6), d(0), 1, False, ["Personnel"]),
            ("Arroser les plantes", "Vérifier les plantes du salon et du balcon.", c(6), d(0), 1, False, ["Personnel"]),
            ("Vérifier les stocks alimentaires", "Lister les produits à racheter avant la semaine prochaine.", c(5), d(0), 1, False, ["Courses"]),

            ("Préparer la réunion de projet", "Mettre à jour le plan de travail et les objectifs.", c(4), d(1), 3, False, ["Travail"]),
            ("Faire les courses bio", "Acheter fruits, légumes et céréales complètes.", c(4), d(1), 2, False, ["Courses"]),
            ("Réviser le plan de budget", "Analyser les dépenses du mois et prévoir les ajustements.", c(3), d(2), 2, False, ["Personnel"]),
            ("Jogging matinal", "5 km au parc + étirements.", c(3), d(2), 1, False, ["Santé", "Personnel"]),
            ("Mettre à jour la documentation API", "Ajouter les nouveaux endpoints et exemples.", c(2), d(3), 2, False, ["Travail"]),

            ("Rendez-vous médecin", "Bilan annuel de santé.", c(2), d(4), 3, False, ["Santé"]),
            ("Nettoyage du bureau", "Trier les papiers et ranger les câbles.", c(1), d(5), 1, False, ["Personnel"]),
            ("Atelier cuisine italienne", "Cours de cuisine avec un chef local.", c(0), d(6), 1, False, ["Loisirs", "Personnel"]),
            ("Planifier les vacances", "Réserver hôtel et transport pour août.", c(0), d(7), 2, False, ["Personnel"]),
            ("Livrer la version 2.0", "Déploiement production + vérification logs.", c(0), d(7), 3, False, ["Travail", "Urgent"]),
        ]

        for titre, desc, created, due, prio, done, cats in tasks:
            t_id = get_or_create_task(con, titre, desc, created, due, prio, done)
            for c in cats:
                link_task_category(con, t_id, cat_ids[c])


if __name__ == "__main__":
    seed_data()
    print("✅ Données insérées avec des dates de création étalées sur plusieurs jours.")
