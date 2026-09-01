# Local Demo Instructions

Follow these steps to run a completely local, self-contained demonstration of WattWatch using synthetic data.

## Prerequisites
- Python 3.10+
- Node.js 18+ (for the dashboard)
- Git

## Step 1: Generate Synthetic Data
We will generate 30 days of mock smart meter data for a virtual neighborhood, complete with injected anomalies (theft, outages, broken meters).

```bash
# Navigate to the data generator
cd scripts/data_generator

# Install requirements
pip install -r requirements.txt

# Run the generator
python generate.py --meters 50 --days 30 --output ../../data/synthetic_readings.csv
```

## Step 2: Start the Backend Engine
The backend will ingest the CSV, run the baseline forecaster, apply anomaly detection rules, and expose the REST API.

```bash
# Navigate to backend
cd backend

# Install requirements
pip install -r requirements.txt

# Run the ingestion and inference engine
python run_engine.py --source ../data/synthetic_readings.csv

# Start the API server
uvicorn api.main:app --reload --port 8000
```
*The API is now running at `http://localhost:8000`.*

## Step 3: Start the Dashboard
The frontend connects to the local API to display the insights.

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```
*Open `http://localhost:3000` in your browser.*

## Step 4: Explore the System
1. Go to the **Overview** page to see high-risk zones.
2. Go to the **Anomaly Review** queue. You should see the injected anomalies flagged here.
3. Click on a flag to view the **Explanation** and the baseline context.
4. Try marking a flag as `CONFIRM_INSPECTION` to see the queue update.
