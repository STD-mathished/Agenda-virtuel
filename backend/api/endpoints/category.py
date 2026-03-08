from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from backend.api.basemodels.category import CategorySchema
from backend.db.models.category import Category
from backend.db.scripts.db import get_db

router = APIRouter(
    prefix="/categories",
    tags=["categories"]
)

@router.get("/", response_model=List[CategorySchema])
async def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()