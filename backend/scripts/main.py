from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
        SELECT * FROM taches;
    """)
    rows = cur.fetchall()

    data = [dict(row) for row in rows]
    return data