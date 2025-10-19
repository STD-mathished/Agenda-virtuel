from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskCreate(BaseModel):
    titre: str
    description: Optional[str] = None
    date_echeance: Optional[datetime] = None
    priorite: int = 2
    est_termine: bool = False
