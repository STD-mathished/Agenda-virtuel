from sqlalchemy import Column, Text, text, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from backend.db.scripts.db import Base
from backend.db.models.task_category_association import task_category_association 

class Category(Base):
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    createur_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    nom = Column(Text, nullable=False)

    # Relation vers les tâches
    tasks = relationship("Task", secondary=task_category_association, back_populates="categories")

    __table_args__ = (
        UniqueConstraint('nom', 'createur_id', name='_nom_createur_uc'),
    )