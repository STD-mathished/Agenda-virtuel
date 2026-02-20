from pydantic import BaseModel, ConfigDict
from uuid import UUID

class CategoryBase(BaseModel):
    nom: str

class CategoryCreate(CategoryBase):
    pass  

class CategorySchema(CategoryBase):
    id: UUID
    
    model_config = ConfigDict(from_attributes=True)