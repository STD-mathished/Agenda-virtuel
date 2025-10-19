from typing import Optional
from datetime import datetime
import uuid
from pydantic import BaseModel, ConfigDict

class TaskOut(BaseModel):
    id: uuid.UUID
    titre: str
    description: Optional[str] = None
    date_creation: datetime
    date_echeance: Optional[datetime] = None
    priorite: int
    est_termine: bool
    model_config = ConfigDict(from_attributes=True)
