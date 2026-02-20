from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import Date, cast
from datetime import date as dt_date
from typing import List


from backend.api.basemodels.category import CategorySchema
from backend.api.basemodels.task import TaskCreate, TaskOut

from backend.db.models.category import Category
from backend.db.models.task import Task 

from backend.db.scripts.db import get_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],         
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes pour les catégories
@app.get("/categories", response_model=List[CategorySchema])
async def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

# Routes pour les tâches
@app.get("/taches", response_model=List[TaskOut])
async def get_tasks(db: Session = Depends(get_db)):
    # Les catégories sont chargées via la relation 'relationship' définie dans le modèle Task
    return db.query(Task).all()

@app.get("/taches/{jour}", response_model=List[TaskOut])
async def get_task_by_date(jour: dt_date, db: Session = Depends(get_db)):
    tasks = (
        db.query(Task)
        .filter(cast(Task.date_creation, Date) == jour)
        .all()
    )
    return tasks

@app.post("/taches", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    # 1. On extrait les IDs de catégories fournis par le frontend
    data = payload.model_dump()
    category_ids = data.pop("category_ids", [])

    # 2. Création de l'objet Task sans les catégories
    new_task = Task(**data)

    # 3. Association des catégories existantes via leurs IDs (UUID)
    if category_ids:
        categories = db.query(Category).filter(Category.id.in_(category_ids)).all()
        new_task.categories = categories

    db.add(new_task)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erreur lors de la création : {str(e)}",
        )
    db.refresh(new_task)
    return new_task