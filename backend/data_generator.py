import os
import random
import time
from datetime import datetime, timedelta
import psycopg2
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

DATABASE_URL = os.getenv("DATABASE_URL")

def generate_telemetry_data(num_records=100):
    if not DATABASE_URL:
        print("DATABASE_URL not found.")
        return

    print("Connecting to Supabase to inject synthetic data...")
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()

        # Generate data going back in time
        now = datetime.utcnow()
        
        insert_query = """
        INSERT INTO telemetry (timestamp, voltage, current, power, energy, frequency, power_factor, anomaly_score, is_anomaly)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        records = []
        cumulative_energy = 1000.0 # Starting energy kWh
        
        for i in range(num_records):
            # 5 minute intervals
            ts = now - timedelta(minutes=5 * (num_records - i))
            
            # Normal operating ranges
            voltage = random.uniform(220.0, 240.0)
            current = random.uniform(10.0, 50.0)
            power = (voltage * current * 0.9) / 1000.0 # kW
            cumulative_energy += (power * (5 / 60.0)) # Add kWh for 5 mins
            frequency = random.uniform(49.9, 50.1)
            power_factor = random.uniform(0.85, 0.99)
            
            # Inject occasional anomaly (5% chance)
            is_anomaly = random.random() < 0.05
            if is_anomaly:
                anomaly_type = random.choice(["voltage_drop", "current_spike"])
                if anomaly_type == "voltage_drop":
                    voltage = random.uniform(180.0, 200.0)
                else:
                    current = random.uniform(80.0, 120.0)
                power = (voltage * current * 0.9) / 1000.0
                anomaly_score = random.uniform(0.8, 1.0)
            else:
                anomaly_score = random.uniform(0.0, 0.3)
                
            records.append((ts, voltage, current, power, cumulative_energy, frequency, power_factor, anomaly_score, is_anomaly))
            
        cur.executemany(insert_query, records)
        conn.commit()
        
        cur.close()
        conn.close()
        print(f"Successfully injected {num_records} synthetic telemetry records!")
        
    except Exception as e:
        print(f"Error injecting data: {e}")

if __name__ == "__main__":
    generate_telemetry_data(200) # Generate last ~16 hours of data
