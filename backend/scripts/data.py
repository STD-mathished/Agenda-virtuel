import psycopg2
from pathlib import Path
from .constants import *


def main():
    try:
        con = psycopg2.connect(dbname=DB_NAME, user=DB_USER ,password=DB_PASSWORD, host=DB_HOST, port=DB_PORT)
        cursor = con.cursor()

        obj_cur_path = Path('.')
        cur_path = obj_cur_path.resolve()

        insertion_file = cur_path/"../data/insertion.sql"
        
        with open(insertion_file, "r") as file:
            insertion_str = file.read()

        cursor.execute(insertion_str)
        con.commit()
        print("Données correctement insérées dans la base de données")


    except psycopg2.Error as e:
        print(f"Erreur lors de l'insertion en base de données : {e}")
        
    finally:
        if con:
            con.close()

if __name__ == "__main__":
    main()