from backend.scripts.db_setup import get_connection


def get_cat(cursor):
    res = cursor.execute("SELECT * FROM CATEGORIES;")
    print(res.fetchall())

def get_taches(cursor):
    res = cursor.execute("SELECT * FROM taches;")
    print(res.fetchall())

def get_taches_date(cursor):
    res = cursor.execute("""SELECT DATE_FORMAT(date_creation,'%Y %m %e' ) FROM taches;""")
    print(res.fetchall())


def main():
    cur = get_connection().cursor()
    get_taches_date(cur)




if __name__ == "__main__":
    main()