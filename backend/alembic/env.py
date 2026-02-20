import os
from sqlalchemy import engine_from_config, pool
from alembic import context

from backend.db.scripts.db import Base 

from backend.db.models.task import Task
from backend.db.models.category import Category
from backend.db.models.associations import task_category_association

target_metadata = Base.metadata
config = context.config

def run_migrations_offline() -> None:
    url = os.environ.get("DATABASE_URL")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    url = os.environ.get("DATABASE_URL")
    
    configuration = config.get_section(config.config_ini_section, {})
    
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
        url=url,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()