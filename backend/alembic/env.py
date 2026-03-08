import os
import sys
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# ✅ Correction du chemin : on remonte de deux niveaux pour atteindre la racine
# alembic/ -> backend/ -> racine_du_projet
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.insert(0, BASE_DIR)

# ✅ Imports des modèles pour qu'Alembic les enregistre dans Base.metadata
from backend.db.scripts.db import Base 
from backend.db.models.task import Task
from backend.db.models.category import Category
from backend.db.models.task_category_association import task_category_association

# Debug : Affiche les tables détectées dans ton terminal au lancement
print(f"DEBUG: Tables dans metadata : {Base.metadata.tables.keys()}")

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

def include_object(object, name, type_, reflected, compare_to):
    my_tables = ["taches", "categories", "taches_categories"]
    if type_ == "table":
        return name in my_tables
    return True

def get_url():
    return os.environ.get("DATABASE_URL", config.get_main_option("sqlalchemy.url"))

def run_migrations_offline() -> None:
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        include_object=include_object, 
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    url = get_url()
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
        url=url,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata,
            include_object=include_object, 
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()