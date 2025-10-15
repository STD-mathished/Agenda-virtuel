from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import date as dt_date
from sqlalchemy import text
from db import get_connection  

app = FastAPI()

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/categories")
async def get_categories():
    with get_connection() as con:
        rows = con.execute(text("SELECT id, nom FROM categories ORDER BY nom;")).mappings().all()
        return [dict(r) for r in rows]

@app.get("/taches")
async def get_tasks():
    with get_connection() as con:
        rows = con.execute(text("""
            SELECT id, titre, description,
                   date_creation::date AS date_creation,
                   date_echeance::date AS date_echeance,
                   priorite, est_termine
            FROM taches
            ORDER BY id;
        """)).mappings().all()
        return [dict(r) for r in rows]

@app.get("/taches/{jour}")
async def get_task(jour: dt_date):
    with get_connection() as con:
        rows = con.execute(text("""
            SELECT id, titre, description,
                   date_creation::date AS date_creation,
                   date_echeance::date AS date_echeance,
                   priorite, est_termine
            FROM taches
            WHERE date_creation::date = :day
            ORDER BY id;
        """), {"day": jour.isoformat()}).mappings().all()
        return [dict(r) for r in rows]

@app.get("/taches_date")
async def get_tasks_dates():
    with get_connection() as con:
        rows = con.execute(text("SELECT DISTINCT date_creation::date AS date FROM taches;")).mappings().all()
        return [dict(r) for r in rows]
