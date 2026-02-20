import sys
import os
from datetime import datetime, timedelta

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from backend.db.scripts.db import SessionLocal
from backend.db.models.category import Category
from backend.db.models.task import Task

def seed_data():
    db = SessionLocal()
    try:
        print("--- Début du seeding ---")


        cat_names = ["Travail", "Personnel", "Courses", "Santé", "Urgent"]
        categories = {}
        
        for name in cat_names:
            category = db.query(Category).filter_by(nom=name).first()
            if not category:
                category = Category(nom=name)
                db.add(category)
                db.flush() 
                print(f"Catégorie ajoutée : {name}")
            categories[name] = category

        sample_tasks = [
            {
                "titre": "Finir le Dockerfile",
                "description": "Terminer la configuration multi-conteneurs",
                "priorite": 1,
                "cat": "Travail"
            },
            {
                "titre": "Acheter du café",
                "description": "Indispensable pour coder",
                "priorite": 2,
                "cat": "Courses"
            },
            {
                "titre": "Séance de sport",
                "description": "30 minutes de cardio",
                "priorite": 3,
                "cat": "Santé"
            }
        ]

        for t_data in sample_tasks:
            exists = db.query(Task).filter_by(titre=t_data["titre"]).first()
            if not exists:
                new_task = Task(
                    titre=t_data["titre"],
                    description=t_data["description"],
                    priorite=t_data["priorite"],
                    date_echeance=datetime.now() + timedelta(days=2)
                )
                new_task.categories.append(categories[t_data["cat"]])
                db.add(new_task)
                print(f"Tâche ajoutée : {t_data['titre']}")

        db.commit()
        print("--- Seeding terminé avec succès ! ---")

    except Exception as e:
        print(f"Erreur lors du seeding : {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()