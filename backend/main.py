from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import get_db

app = FastAPI(title="WattWatch API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, this should be specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the WattWatch API"}

@app.get("/api/v1/health")
def health_check(db=Depends(get_db)):
    try:
        # A simple query to check if the connection is alive
        db.table("telemetry").select("id").limit(1).execute()
        db_status = "connected"
    except Exception as e:
        db_status = f"disconnected ({str(e)})"

    return {"status": "healthy", "database": db_status}

@app.get("/api/v1/telemetry")
def get_telemetry(db=Depends(get_db)):
    try:
        # Fetch the most recent 50 telemetry records
        response = db.table("telemetry").select("*").order("timestamp", desc=True).limit(50).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# End of main.py
