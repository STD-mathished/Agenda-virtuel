from db import get_connection
from sqlalchemy import text

def get_cat(con):
    res = con.execute(text("SELECT id, nom FROM categories;")).fetchall()
    print(res)

def get_taches(con):
    res = con.execute(text("SELECT * FROM taches;")).fetchall()
    print(res)

def get_taches_date(con):
    res = con.execute(text("SELECT to_char(date_creation, 'YYYY MM DD') FROM taches;")).fetchall()
    print(res)

def main():
    with get_connection() as con:
        get_taches_date(con)

if __name__ == "__main__":
    main()
