from sqlalchemy import Column, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import text
from uuid import uuid4

Base = declarative_base()

class Category(Base):
    __tablename__ = "categories"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    nom = Column(Text, nullable=False, unique=True)
