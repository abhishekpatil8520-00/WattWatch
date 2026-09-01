from fastapi import FastAPI, Depends
from database import get_db

app = FastAPI(title="WattWatch API", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Welcome to the WattWatch API"}

@app.get("/api/v1/health")
def health_check(db=Depends(get_db)):
    try:
        # A simple query to check if the connection is alive
        db.table("meters").select("meter_id").limit(1).execute()
        db_status = "connected"
    except Exception as e:
        db_status = f"disconnected ({str(e)})"

    return {"status": "healthy", "database": db_status}

# End of main.py
