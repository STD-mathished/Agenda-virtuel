from sqlalchemy import Column, Text, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from backend.db.scripts.db import Base
from backend.db.models.associations import task_category_association

class Category(Base):
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    nom = Column(Text, nullable=False, unique=True)

    tasks = relationship("Task", secondary=task_category_association, back_populates="categories")