from pydantic import BaseModel, Field, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import List, Optional
from .category import CategorySchema

class TaskBase(BaseModel):
    titre: str
    description: Optional[str] = None
    priorite: int = Field(default=2, ge=1, le=3)
    date_echeance: Optional[datetime] = None
    est_termine: bool = False

class TaskCreate(TaskBase):
    category_ids: List[UUID] = []

class TaskOut(TaskBase):
    id: UUID
    date_creation: datetime
    categories: List[CategorySchema] = []

    model_config = ConfigDict(from_attributes=True)