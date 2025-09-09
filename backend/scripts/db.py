import os
import sqlite3
from pathlib import Path
from time import sleep

def get_connection():
    obj_cur_path = Path('.')
    cur_path = obj_cur_path.resolve()
    app_file = cur_path/"backend/app.bd"
    con = sqlite3.connect(app_file)
    return con



def main():
    #recuperer la racine
    obj_cur_path = Path('.')
    cur_path = obj_cur_path.resolve()

    #afficher le contenu du path
    #for item in cur_path.iterdir(): print(item)    -- debug
    schema_file = cur_path/"backend/schema/schema.sql"
    app_file = cur_path/"backend/app.bd"

    #creer la bd
    if not app_file.is_file():
        #affichage utilisateur
        print("Creation de la base de donnees")
        sleep(2)
        print("...")

        #creation de la base de données
        #-------lire le fichier-------
        with open(schema_file, "r") as file:
            schema_str = file.read()

        con = get_connection()
        cur = get_cursor()
        
        cur.execute("PRAGMA foreign_keys = ON;")
        cur.executescript(schema_str)

        #------Commit de la transaction------
        con.commit()

    else:
        print("Un fichier n'existe pas")



if __name__ == "__main__":
    main()
