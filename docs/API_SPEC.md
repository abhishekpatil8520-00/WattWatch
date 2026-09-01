# API Specification

The WattWatch backend exposes a RESTful API for the frontend dashboard to consume. 

> **Base URL:** `/api/v1`

---

## 1. Demand Forecasting

### `GET /forecast/zone/{zone_id}`
Retrieves the demand forecast for a specific zone.

**Query Parameters:**
- `horizon_hours` (int, default: 24)

**Response (200 OK):**
```json
{
  "zone_id": "Z-North-4",
  "forecast_generated_at": "2024-03-12T00:00:00Z",
  "data": [
    {
      "timestamp": "2024-03-12T01:00:00Z",
      "predicted_kwh": 450.2,
      "baseline_kwh": 430.0,
      "upper_bound_kwh": 480.5,
      "lower_bound_kwh": 420.0
    }
  ]
}
```

---

## 2. Anomaly Detection

### `GET /anomalies/queue`
Retrieves a list of active, unreviewed anomalies for the human operator to review.

**Query Parameters:**
- `status` (string, default: `pending`)
- `severity` (string, optional: `high`, `medium`, `low`)

**Response (200 OK):**
```json
{
  "anomalies": [
    {
      "anomaly_id": "anom_90123",
      "meter_id": "M-10293",
      "timestamp": "2024-03-12T14:15:00Z",
      "type": "SUDDEN_DROP",
      "confidence": "High",
      "explanation": "Consumption dropped to 0.1 kWh, which is 98% lower than its 30-day historical average of 5.2 kWh.",
      "status": "pending"
    }
  ]
}
```

---

## 3. Human-in-the-Loop Actions

### `POST /anomalies/{anomaly_id}/review`
Submits a human operator's decision regarding a flagged anomaly.

**Request Body:**
```json
{
  "operator_id": "user_456",
  "decision": "CONFIRM_INSPECTION", 
  "notes": "Looks like physical tampering based on the immediate drop to zero while the rest of the street is active."
}
```
*(Valid decisions: `CONFIRM_INSPECTION`, `FALSE_ALARM`, `IGNORE`)*

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Review recorded successfully."
}
```
