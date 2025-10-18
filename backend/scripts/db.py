import psycopg2
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT")
DB_HOST = os.getenv("DB_HOST")





def main():
    try:
        con = psycopg2.connect(dbname=DB_NAME, user=DB_USER ,password=DB_PASSWORD, host=DB_HOST, port=DB_PORT)
        cursor = con.cursor()

        obj_cur_path = Path('.')
        cur_path = obj_cur_path.resolve()

        #afficher le contenu du path
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