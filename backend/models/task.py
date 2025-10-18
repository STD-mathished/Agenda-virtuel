from sqlalchemy import Column, Text, Boolean, SmallInteger, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import text
from uuid import uuid4

Base = declarative_base()

class Task(Base):
    __tablename__ = "taches"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    titre = Column(Text, nullable=False)
    description = Column(Text)
    date_creation = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("NOW()"))
    date_echeance = Column(TIMESTAMP(timezone=True))
    priorite = Column(SmallInteger, nullable=False, server_default=text("2"))
    est_termine = Column(Boolean, nullable=False, server_default=text("false"))
