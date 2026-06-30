import sqlite3

try:
    conn = sqlite3.connect('d:/Experiment/CTFd/CTFd/ctfd.db')
    cursor = conn.cursor()
    cursor.execute("ALTER TABLE challenges ADD COLUMN hint TEXT;")
    conn.commit()
    conn.close()
    print("Successfully added hint column.")
except Exception as e:
    print(f"Error: {e}")
