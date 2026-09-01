# Project Specification

## 1. Problem Statement

Utility operators manage vast amounts of data streaming from smart meters. However, they frequently lack the specialized tools to derive actionable insights from this data. When anomalies like electricity theft, meter tampering, or hardware failures occur, they often go unnoticed until a billing dispute arises or a physical inspection happens by chance. 

Furthermore, existing solutions often employ "black-box" machine learning algorithms that flag anomalies without context, leaving operators unable to justify field inspections or billing adjustments.

## 2. Core Goals

**WattWatch** aims to solve this by providing an explainable, human-in-the-loop decision-support platform with two primary functions:

1.  **Demand Forecasting:** Predict short-term electricity demand at the meter, zone, and grid levels to help operators anticipate spikes and grid stress.
2.  **Anomaly Detection:** Identify suspicious consumption patterns (sudden drops, unusual spikes, peer deviation) and flag them for human review.

The system must present these insights in a non-technical, explainable dashboard that provides a clear audit trail for every prediction.

## 3. Explicit Non-Goals

To maintain scope and adhere to ethical AI practices, the following are strictly out of scope:

-   **No Automated Actions:** The system will never automatically shut off power, issue fines, or contact customers.
-   **No Black-Box ML:** If a model's output cannot be explained in plain language, it will not be used in production.
-   **No Billing System Integration:** The platform will not handle financial transactions, calculate bills, or manage customer credit.
-   **No Real-Time (Sub-second) Processing:** The system is designed for 15-minute or hourly batch processing, not millisecond-level SCADA grid balancing.

## 4. Target Audience

The primary users of this system are **Utility Operators** and **Grid Analysts**. They are domain experts in electricity distribution but are *not* data scientists. They need clear visual evidence, historical context, and simple explanations to make operational decisions.

## 5. System Scope

The MVP scope includes:
-   A synthetic data generator mimicking smart meter readings.
-   A data ingestion and validation pipeline.
-   A backend engine running baseline forecasting and rule-based anomaly detection.
-   A REST API serving insights.
-   A web-based dashboard for human review and auditing.
