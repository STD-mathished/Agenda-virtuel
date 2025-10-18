from pydantic import BaseModel
from uuid import UUID

class CategorySchema(BaseModel):
    id: UUID          
    nom: str
    class Config:
        from_attributes = True
