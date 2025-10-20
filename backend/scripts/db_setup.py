import psycopg2
from pathlib import Path
from .constants import *





def main():
    try:
        con = psycopg2.connect(dbname=DB_NAME, user=DB_USER ,password=DB_PASSWORD, host=DB_HOST, port=DB_PORT)
        cursor = con.cursor()

        obj_cur_path = Path('.')
        cur_path = obj_cur_path.resolve()

        schema_file = cur_path/"backend/schema/schema.sql"
  

        with open(schema_file, "r") as file:
            schema_str = file.read()
    
        cursor.execute(schema_str)

        con.commit()
        print("✅ Base de données PostgreSQL initialisée avec succès.")

    except psycopg2.Error as e:
        print(f"Erreur de base de données : {e}")
        
    finally:
        if con:
            con.close()

if __name__ == "__main__":
    main()