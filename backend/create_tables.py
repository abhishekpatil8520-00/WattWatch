import os
import psycopg2
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

DATABASE_URL = os.getenv("DATABASE_URL")

def create_tables():
    if not DATABASE_URL:
        print("DATABASE_URL not found in .env file.")
        return

    print("Connecting to Supabase PostgreSQL database...")
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()

        # Create telemetry table
        create_telemetry_table = """
        CREATE TABLE IF NOT EXISTS telemetry (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            timestamp TIMESTAMPTZ NOT NULL,
            voltage FLOAT,
            current FLOAT,
            power FLOAT,
            energy FLOAT,
            frequency FLOAT,
            power_factor FLOAT,
            anomaly_score FLOAT DEFAULT 0.0,
            is_anomaly BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        """
        
        cur.execute(create_telemetry_table)
        
        # Create an index on timestamp for faster queries
        cur.execute("CREATE INDEX IF NOT EXISTS idx_telemetry_timestamp ON telemetry(timestamp);")
        
        conn.commit()
        cur.close()
        conn.close()
        print("Successfully created 'telemetry' table in Supabase!")
        
    except Exception as e:
        print(f"Error creating tables: {e}")

if __name__ == "__main__":
    create_tables()
