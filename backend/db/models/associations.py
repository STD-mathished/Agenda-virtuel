from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from backend.db.scripts.db import Base

task_category_association = Table(
    "taches_categories",
    Base.metadata,
    Column("tache_id", UUID(as_uuid=True), ForeignKey("taches.id", ondelete="CASCADE"), primary_key=True),
    Column("categorie_id", UUID(as_uuid=True), ForeignKey("categories.id", ondelete="CASCADE"), primary_key=True)
)