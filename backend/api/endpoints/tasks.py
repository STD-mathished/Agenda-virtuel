from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import Date, cast
from datetime import date as dt_date
from typing import List

from backend.api.basemodels.task import TaskCreate, TaskOut
from backend.db.models.task import Task
from backend.db.models.category import Category
from backend.db.scripts.db import get_db

router = APIRouter(
    prefix="/taches",
    tags=["taches"]
)

@router.get("/", response_model=List[TaskOut])
async def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@router.get("/{jour}", response_model=List[TaskOut])
async def get_task_by_date(jour: dt_date, db: Session = Depends(get_db)):
    return db.query(Task).filter(cast(Task.date_creation, Date) == jour).all()

@router.post("/", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    data = payload.model_dump()
    category_ids = data.pop("category_ids", [])
    new_task = Task(**data) 

    if category_ids:
        categories = db.query(Category).filter(Category.id.in_(category_ids)).all()
        new_task.categories = categories

    db.add(new_task)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    db.refresh(new_task)
    return new_task