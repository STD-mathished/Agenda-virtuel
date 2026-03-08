from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from backend.api.basemodels.category import CategorySchema, CategoryCreate
from backend.db.models.category import Category
from backend.db.scripts.db import get_db
from backend.api.usecases.auth import get_current_user_id 

router = APIRouter(
    prefix="/categories",
    tags=["categories"]
)

@router.post("/", response_model=CategorySchema, status_code=status.HTTP_201_CREATED)
async def create_category(
    payload: CategoryCreate, 
    db: Session = Depends(get_db),
    current_user_id: UUID = Depends(get_current_user_id) 
):
    existing = db.query(Category).filter(
        Category.nom == payload.nom, 
        Category.createur_id == current_user_id
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Tu as déjà une catégorie portant ce nom."
        )

    new_category = Category(
        nom=payload.nom,
        createur_id=current_user_id 
    )

    db.add(new_category)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Erreur lors de la sauvegarde.")
    
    db.refresh(new_category)
    return new_category

@router.get("/", response_model=List[CategorySchema])
async def get_categories(
    db: Session = Depends(get_db),
    current_user_id: UUID = Depends(get_current_user_id)
):
    return db.query(Category).filter(Category.createur_id == current_user_id).all()

@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    category_id: UUID,
    db: Session = Depends(get_db),
    current_user_id: UUID = Depends(get_current_user_id)
):
    category = db.query(Category).filter(
        Category.id == category_id, 
        Category.createur_id == current_user_id
    ).first()

    if not category:
        raise HTTPException(status_code=404, detail="Catégorie introuvable ou accès refusé.")

    db.delete(category)
    db.commit()
    return None