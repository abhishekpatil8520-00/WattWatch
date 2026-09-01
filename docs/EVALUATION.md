# Evaluation & Metrics

To ensure WattWatch provides tangible value to utility operators and does not overwhelm them with false alarms, we will track the following metrics.

## 1. System Success Metrics

These metrics evaluate the overall effectiveness of the platform as a decision-support tool.

| Metric | Definition | Target |
|---|---|---|
| **True Positive Rate (TPR)** | Percentage of flagged anomalies that operators confirmed as actual issues. | > 75% |
| **False Positive Rate (FPR)**| Percentage of flagged anomalies that operators marked as `FALSE_ALARM`. | < 10% |
| **Review Time per Alert** | Average time taken by a human operator to review and make a decision on an anomaly. | < 60 seconds |

*Note on False Positives:* A high FPR causes "alert fatigue," leading operators to ignore the system. It is better to tune the system to miss minor anomalies (lower recall) than to bombard the dashboard with false alarms.

## 2. Model Accuracy Metrics (Forecasting)

For the Demand Forecasting engine, standard time-series regression metrics will be logged daily:

*   **MAPE (Mean Absolute Percentage Error):** The primary metric for forecast accuracy. Target: < 5%.
*   **RMSE (Root Mean Square Error):** To heavily penalize large forecasting errors (e.g., predicting 500 kWh when actual is 2000 kWh).

## 3. Human Feedback Loop

The system relies on human review labels (`CONFIRM_INSPECTION`, `FALSE_ALARM`) to evaluate itself. 

1.  Every 30 days, an automated report is generated showing the FPR for each specific rule/model.
2.  If a specific rule (e.g., "Near Zero Consumption") has an FPR > 15%, that rule must be tuned or disabled.
3.  In Phase 3 (Machine Learning), these human labels will be fed back into the training data to fine-tune the anomaly detection models via supervised learning.
