from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from sqlalchemy import Date, cast
from datetime import date as dt_date
from typing import List

from backend.basemodels.category import CategorySchema
from backend.basemodels.task import TaskSchema

from backend.models.taskCreate import TaskCreate
from backend.models.taskOut import TaskOut

from backend.scripts.db import get_db
from backend.models.category import Category
from backend.models.task import Task  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],         
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/categories", response_model=List[CategorySchema])
async def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

@app.get("/taches", response_model=List[TaskSchema])
async def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@app.get("/taches/{jour}", response_model=List[TaskSchema])
async def get_task_by_date(jour: dt_date, db: Session = Depends(get_db)):
    tasks = (
        db.query(Task)
        .filter(cast(Task.date_creation, Date) == jour)
        .all()
    )
    return tasks

@app.post("/taches", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    task = Task(**payload.model_dump())
    db.add(task)
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Données invalides",
        )
    db.refresh(task)
    return TaskOut.model_validate(task)
