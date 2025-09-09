from db import get_connection


def get_cat(cursor):
    res = cursor.execute("SELECT * FROM CATEGORIES;")
    print(res.fetchall())

def main():
    cur = get_connection().cursor()
    get_cat(cur)



if __name__ == "__main__":
    main()