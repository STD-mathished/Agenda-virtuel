from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class TaskSchema(BaseModel):
    id: UUID         
    titre: str
    description: str | None
    date_creation: datetime
    date_echeance: datetime | None
    priorite: int
    est_termine: bool
    class Config:
        from_attributes = True
