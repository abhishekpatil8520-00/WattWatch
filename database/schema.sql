-- Supabase Schema for WattWatch

-- 1. Users Table (Public schema for custom auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Meters Table
CREATE TABLE IF NOT EXISTS meters (
    meter_id TEXT PRIMARY KEY,
    zone_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Readings Table (Optimized for Time-Series)
CREATE TABLE IF NOT EXISTS readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meter_id TEXT NOT NULL REFERENCES meters(meter_id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    consumption_kwh DOUBLE PRECISION NOT NULL CHECK (consumption_kwh >= 0),
    status_code INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast time-series queries
CREATE INDEX IF NOT EXISTS idx_readings_meter_timestamp ON readings(meter_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_readings_timestamp ON readings(timestamp DESC);

-- 4. Anomalies Table
CREATE TABLE IF NOT EXISTS anomalies (
    anomaly_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meter_id TEXT NOT NULL REFERENCES meters(meter_id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    type TEXT NOT NULL,
    confidence TEXT NOT NULL CHECK (confidence IN ('Low', 'Medium', 'High')),
    explanation TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'false_alarm')),
    anomaly_score DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for active queues
CREATE INDEX IF NOT EXISTS idx_anomalies_status ON anomalies(status);

-- 5. Telemetry Table (Live Feed)
CREATE TABLE IF NOT EXISTS telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meter_id TEXT REFERENCES meters(meter_id),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    voltage DOUBLE PRECISION NOT NULL,
    current DOUBLE PRECISION NOT NULL,
    power DOUBLE PRECISION NOT NULL,
    energy DOUBLE PRECISION NOT NULL,
    is_anomaly BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for telemetry
CREATE INDEX IF NOT EXISTS idx_telemetry_timestamp ON telemetry(timestamp DESC);
