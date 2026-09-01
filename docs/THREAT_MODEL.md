# Threat Model & Security

While WattWatch is a decision-support tool (and not a grid control system), it still handles sensitive data and produces insights that could be misused.

## 1. Trust Boundaries

-   **Data Ingestion:** The boundary between the external smart meters (or data lakes) and the WattWatch backend.
-   **API Layer:** The boundary between the backend engines and the operator dashboard.
-   **Operator Interface:** The boundary between the human user and the system.

## 2. Identified Threats & Mitigations

### Threat 1: Data Poisoning (Tampering with Input)
An attacker (e.g., an individual stealing electricity) might manipulate their smart meter to send fake "normal" data to the ingestion pipeline, hiding their theft.
-   **Mitigation:** This is primarily an IoT security issue outside the scope of WattWatch. However, WattWatch mitigates this via **Peer Deviation** detection. If a tampered meter reports a perfect 5.0 kWh flatline while the rest of the neighborhood spikes due to a heatwave, the system will flag the irregular pattern.

### Threat 2: PII Leakage
Smart meter data can reveal when a person is home, sleeping, or on vacation.
-   **Mitigation:** WattWatch enforces strict data masking at ingestion. The `meter_id` must be an opaque hash. The system does not store names, addresses, or billing data. If an anomaly is confirmed, the operator copies the `meter_id` to a separate, highly secure billing system to look up the customer.

### Threat 3: Alert Fatigue & Insider Threat
A malicious or negligent operator might mass-dismiss alerts (`FALSE_ALARM`) to avoid work, or to protect a specific property from inspection.
-   **Mitigation:** The system maintains an immutable audit trail. Every action (`CONFIRM`, `IGNORE`, `FALSE_ALARM`) is logged with the operator's ID and timestamp. The Evaluation module tracks operator performance and review times.

### Threat 4: Automated Action Overreach
A developer might attempt to link the WattWatch API to an automated shutoff script to "save time."
-   **Mitigation:** Architectural constraint. The API does not expose any "write" operations back to the smart meters. The only write operations allowed are state changes on the anomaly queue itself (e.g., updating status to `reviewed`).
