import os

from dotenv import load_dotenv

load_dotenv()


# Definission de la base de données
DB_USER = os.getenv("DB_USER", "user_agenda")
DB_PASSWORD = os.getenv("DB_PASSWORD", "password_agenda")
DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "agenda_db")