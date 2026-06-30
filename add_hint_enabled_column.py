import sqlite3

try:
    conn = sqlite3.connect('d:/Experiment/CTFd/CTFd/ctfd.db')
    cursor = conn.cursor()
    cursor.execute("ALTER TABLE challenges ADD COLUMN hint_enabled BOOLEAN DEFAULT 0;")
    conn.commit()
    conn.close()
    print("Successfully added hint_enabled column.")
except Exception as e:
    print(f"Error: {e}")
