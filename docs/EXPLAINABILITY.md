# Explainability Guidelines

Explainability is the core differentiator of WattWatch. An operator must never be presented with an anomaly flag or a prediction without the accompanying *why*.

## 1. The Anatomy of an Explanation

Every anomaly flagged by the backend engine must return an `Explanation` object to the API. This object consists of:

1.  **The Categorical Reason:** (e.g., `SUDDEN_DROP`, `PEER_DEVIATION`)
2.  **The Context Data:** The historical or peer baseline values used for comparison.
3.  **The Confidence Score:** (High, Medium, Low).
4.  **The Human-Readable String:** A dynamically generated sentence combining the above.

## 2. Example: Sudden Drop

**Scenario:** A meter that usually consumes 5 kWh per interval suddenly drops to 0.1 kWh.

*   **Bad (Black-Box):** `Anomaly Score: 0.92. Flag: True.`
*   **Good (WattWatch):** 
    *   **Reason:** `SUDDEN_DROP`
    *   **Context:** `historical_avg_kwh: 5.2, current_kwh: 0.1`
    *   **Confidence:** `High`
    *   **Human-Readable:** `"Consumption dropped to 0.1 kWh, which is 98% lower than its 30-day historical average of 5.2 kWh."`

## 3. Example: Peer Deviation

**Scenario:** A meter is consuming 12 kWh, which is normal for its history, but every other meter in its zone (e.g., during a blackout) is consuming 0 kWh.

*   **Human-Readable:** `"Meter consumption is 12 kWh, while the average for the 45 other meters in Zone North-4 is currently 0.0 kWh. Possible meter bypass or localized bypass."`

## 4. Translating ML to English

When the project advances to using XGBoost/LightGBM for anomaly detection, we will use **SHAP values**. 
We will take the top 2 features with the highest SHAP values for a given prediction and map them to text templates.

*   *Feature 1 (highest SHAP):* `var_night_time` (Nighttime variance)
*   *Feature 2:* `temp_difference`
*   *Translation:* `"Flagged primarily due to unusually high variation in nighttime consumption, despite normal temperatures."`
