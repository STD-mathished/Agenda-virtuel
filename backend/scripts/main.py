from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime, date as dt_date
from typing import List
from sqlalchemy import func, Date 


from db import get_db, Task, Category 

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CategorySchema(BaseModel):
    id: int
    nom: str
    
    class Config:        
        from_attributes = True

class TaskSchema(BaseModel):
    id: int
    titre: str
    description: str | None
    date_creation: datetime
    date_echeance: datetime | None
    priorite: int
    est_termine: bool

    class Config:
        from_attributes = True


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/categories", response_model=List[CategorySchema])
async def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return categories
    
# Injection de dépendance de session
@app.get("/taches", response_model=List[TaskSchema])
async def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks


@app.get("/taches/{jour}", response_model=List[TaskSchema])
async def get_task_by_date(jour: dt_date, db: Session = Depends(get_db)):    
    tasks = db.query(Task).filter(func.date(Task.date_creation.cast(Date)) == jour).all()
    
    if not tasks:
        raise HTTPException(status_code=404, detail=f"Aucune tâche trouvée pour la date {jour.isoformat()}")
        
    return tasks
