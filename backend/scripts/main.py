from fastapi import FastAPI
from db import get_connection

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/categories")
async def get_categories():
    con = get_connection()
    cur = con.cursor()
    cur.execute("""
        SELECT * FROM CATEGORIES;
    """)
    rows = cur.fetchall()
    return rows
    
@app.get("/taches")
async def get_tasks():
    con = get_connection()
    cur = con.cursor()
    cur.execute("""
        SELECT * FROM taches;
    """)
    data = cur.fetchall()
    return data