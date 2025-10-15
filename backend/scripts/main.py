from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import date as dt_date
from db import get_connection
import sqlite3

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173", 
]

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
    con = get_connection()
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("""
        SELECT * FROM CATEGORIES;
    """)
    rows = cur.fetchall()
    data = [dict(row) for row in rows]
    return data
    
@app.get("/taches")
async def get_tasks():
    con = get_connection()
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("""
        SELECT id, titre, description, date(date_creation) as date_creation , date(date_echeance) as date_echeance, priorite, est_termine 
        FROM taches;
    """)
    rows = cur.fetchall()

    data = [dict(row) for row in rows]
    return data

@app.get("/taches/{jour}")
async def get_task(jour: dt_date):
    con = get_connection()
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("""
        SELECT id, titre, description,
               date(date_creation)  AS date_creation,
               date(date_echeance)  AS date_echeance,
               priorite, est_termine
        FROM taches 
        WHERE date(date_creation) = ?
    """, (jour.isoformat(),))  # <== paramètre, pas d'injection, bien quoté
    rows = cur.fetchall()
    return [dict(row) for row in rows]


#route test pour date 
@app.get("/taches_date")
async def get_tasks():
    con = get_connection()
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("""
        SELECT date(date_creation) as date from taches;
    """)
    rows = cur.fetchall()

    data = [dict(row) for row in rows]
    return data
