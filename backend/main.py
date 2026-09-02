from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import get_db
from auth import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta

app = FastAPI(title="WattWatch API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, this should be specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Auth Schemas ----
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# ---- Endpoints ----

@app.get("/")
def read_root():
    return {"message": "Welcome to the WattWatch API"}

@app.get("/api/v1/health")
def health_check(db=Depends(get_db)):
    try:
        db.table("telemetry").select("id").limit(1).execute()
        db_status = "connected"
    except Exception as e:
        db_status = f"disconnected ({str(e)})"
    return {"status": "healthy", "database": db_status}

@app.get("/api/v1/telemetry")
def get_telemetry(db=Depends(get_db)):
    try:
        response = db.table("telemetry").select("*").order("timestamp", desc=True).limit(50).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/api/v1/auth/signup")
def signup(user: UserCreate, db=Depends(get_db)):
    try:
        # Check if user exists
        existing = db.table("users").select("id").eq("email", user.email).execute()
        if existing.data:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Hash password and insert
        hashed_password = get_password_hash(user.password)
        new_user = db.table("users").insert({
            "email": user.email,
            "full_name": user.name,
            "password_hash": hashed_password
        }).execute()
        
        user_data = new_user.data[0]
        
        # Generate token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user_data["id"]}, expires_delta=access_token_expires
        )
        
        return {"access_token": access_token, "token_type": "bearer", "user": {"id": user_data["id"], "email": user_data["email"], "name": user_data["full_name"]}}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/auth/signin")
def signin(user: UserLogin, db=Depends(get_db)):
    try:
        # Fetch user
        db_user = db.table("users").select("*").eq("email", user.email).execute()
        if not db_user.data:
            raise HTTPException(status_code=400, detail="Incorrect email or password")
            
        user_data = db_user.data[0]
        
        # Verify password
        if not verify_password(user.password, user_data.get("password_hash", "")):
            raise HTTPException(status_code=400, detail="Incorrect email or password")
            
        # Generate token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user_data["id"]}, expires_delta=access_token_expires
        )
        
        return {"access_token": access_token, "token_type": "bearer", "user": {"id": user_data["id"], "email": user_data["email"], "name": user_data["full_name"]}}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# End of main.py
