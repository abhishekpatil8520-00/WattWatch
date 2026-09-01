# Data Contract

This document defines the schema, constraints, and validation rules for the incoming smart meter data. Adhering to this contract ensures that the inference engines do not fail due to malformed data.

## 1. Schema Definition

Data can be ingested via JSON over HTTP or bulk CSV. 

### 1.1 JSON Payload Schema (Single Reading)

```json
{
  "meter_id": "string",
  "zone_id": "string",
  "timestamp": "ISO8601 string (UTC)",
  "consumption_kwh": "float",
  "status_code": "integer"
}
```

### 1.2 CSV Format (Bulk Ingestion)

| Column Name | Type | Description |
|---|---|---|
| `meter_id` | String | Unique identifier for the smart meter (e.g., `M-10293`). |
| `zone_id` | String | Geographic or topological grouping (e.g., `Z-North-4`). |
| `timestamp` | String | UTC Timestamp in ISO8601 (e.g., `2024-03-12T14:15:00Z`). |
| `consumption_kwh`| Float | Kilowatt-hours consumed since the last reading. |
| `status_code` | Integer | Hardware status code emitted by the meter (0 = OK). |

## 2. Validation Rules

The Data Validator component will apply the following rules. Any record violating these rules will be rejected and sent to a Dead Letter Queue (DLQ).

1.  **Non-Negative Consumption:** `consumption_kwh` must be $\ge 0$. (Negative values indicate hardware faults or net-metering configuration errors).
2.  **Maximum Threshold:** `consumption_kwh` must be $\le 500.0$ for a 15-minute interval. (Values beyond this indicate a severe sensor failure).
3.  **Temporal Integrity:** `timestamp` cannot be in the future relative to the ingestion server time.
4.  **Completeness:** `meter_id`, `zone_id`, `timestamp`, and `consumption_kwh` are required fields. `status_code` defaults to `0` if null.

## 3. Data Masking & Privacy

For the purposes of this open-source project and demonstrations, **all data must be synthetic or heavily masked**. 
- PII (Personally Identifiable Information) such as customer names, addresses, or exact coordinates must NEVER be ingested into the platform. 
- `meter_id` must be an opaque hash or synthetic string.
