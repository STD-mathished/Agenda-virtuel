import os
from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.engine import URL
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

url = URL.create(
    drivername="postgresql+psycopg2",
    username=os.getenv("DB_USER", "postgres"),
    password=os.getenv("DB_PASSWORD", "postgres"),
    host=os.getenv("DB_HOST", "localhost"),
    port=int(os.getenv("DB_PORT", "5432")),
    database=os.getenv("DB_NAME", "app"),
)

engine: Engine = create_engine(url, future=True, pool_pre_ping=True)

def get_connection():
    return engine.connect()

def init_schema():
    here = Path(__file__).resolve()
    schema_path = here.parent / "schema.sql"
    print("-> Je cherche :", schema_path)
    sql = schema_path.read_text(encoding="utf-8")
    with engine.begin() as conn:
        conn.execute(text(sql))

if __name__ == "__main__":
    with engine.connect() as c:
        print("✅ Connecté à :", c.exec_driver_sql("select current_database()").scalar_one())
    init_schema()
    print("✅ Schéma PostgreSQL appliqué.")

