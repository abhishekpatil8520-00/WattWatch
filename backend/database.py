import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from the root .env file
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Create a global Supabase client instance
# In a real production app, you might want to handle missing env vars more gracefully
if SUPABASE_URL and SUPABASE_KEY:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None

def get_db() -> Client:
    """Dependency to inject the Supabase client into FastAPI routes."""
    if supabase is None:
        raise RuntimeError("Supabase client is not initialized. Please check your .env file.")
    return supabase
