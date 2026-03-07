from backend.db.scripts.db import Base, engine
from backend.db.models.task import Task 
from backend.db.models.category import Category
from backend.db.models.task_category_association import task_category_association

def reset_database():
    print(" Suppression de toutes les tables...")
    Base.metadata.drop_all(bind=engine)
    
    print(" Création des nouvelles tables avec le schéma sécurisé...")
    Base.metadata.create_all(bind=engine)
    print(" Base de données réinitialisée avec succès !")

if __name__ == "__main__":
    reset_database()