from sqlalchemy import Column, Text, Boolean, SmallInteger, DateTime, text, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy.sql import func
from backend.db.scripts.db import Base
from backend.db.models.task_category_association import task_category_association

class Task(Base):
    __tablename__ = "taches"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    createur_id = Column(UUID(as_uuid=True), nullable=False, index=True) 
    
    titre = Column(Text, nullable=False)
    description = Column(Text)
    date_creation = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    date_echeance = Column(DateTime(timezone=True))
    priorite = Column(SmallInteger, server_default=text("2"), nullable=False)
    est_termine = Column(Boolean, server_default=text("FALSE"), nullable=False)

    __table_args__ = (
        CheckConstraint('priorite BETWEEN 1 AND 3', name='check_priorite_range'),
    )

    categories = relationship("Category", secondary=task_category_association, back_populates="tasks")