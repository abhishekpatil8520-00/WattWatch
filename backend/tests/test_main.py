import pytest
from fastapi.testclient import TestClient
from backend.main import app, get_db

# Create a test client
client = TestClient(app)

# Create a mock Supabase client
class MockTable:
    def __init__(self, should_fail=False):
        self.should_fail = should_fail
        
    def select(self, *args, **kwargs):
        return self
        
    def limit(self, *args, **kwargs):
        return self
        
    def execute(self):
        if self.should_fail:
            raise Exception("Mock Database Error")
        return {"data": [{"meter_id": "test_meter"}]}

class MockSupabase:
    def __init__(self, should_fail=False):
        self.should_fail = should_fail
        
    def table(self, table_name):
        return MockTable(should_fail=self.should_fail)

# Overrides for dependencies
def override_get_db_success():
    return MockSupabase(should_fail=False)

def override_get_db_failure():
    return MockSupabase(should_fail=True)

# Tests
def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the WattWatch API"}

def test_health_check_success():
    # Override get_db to return our success mock
    app.dependency_overrides[get_db] = override_get_db_success
    
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "database": "connected"}
    
    # Clear overrides
    app.dependency_overrides.clear()

def test_health_check_failure():
    # Override get_db to return our failure mock
    app.dependency_overrides[get_db] = override_get_db_failure
    
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "database": "disconnected (Mock Database Error)"}
    
    # Clear overrides
    app.dependency_overrides.clear()
