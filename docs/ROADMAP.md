# Development Roadmap

WattWatch will be built in three distinct phases. This phased approach allows a single developer to deliver a working end-to-end system quickly using simple logic, before introducing complex machine learning.

---

## Phase 1: The Foundation (Current Phase)

**Goal:** Establish the architecture, data flow, and human-in-the-loop dashboard using simple, rule-based logic.

- [ ] **Synthetic Data Generator:** Build a script to generate realistic smart meter data (normal usage, spikes, drops, noise).
- [ ] **Data Ingestion & Validation:** Implement the data contract and validation pipeline.
- [ ] **Baseline Forecasting (Rule-Based):** Implement a naive forecaster (e.g., "Tomorrow's demand will equal the average of the last 3 days").
- [ ] **Heuristic Anomaly Detection:** Implement hard-coded rules (e.g., flag if consumption drops by >50% suddenly, or is exactly 0 for 24 hours).
- [ ] **API Layer:** Build the REST API to serve data.
- [ ] **Operator Dashboard MVP:** Build the UI to display charts and the anomaly review queue.

---

## Phase 2: Statistical Intelligence

**Goal:** Upgrade the inference engines from hard-coded heuristics to robust statistical methods, improving accuracy while maintaining perfect explainability.

- [ ] **Statistical Forecasting:** Implement ARIMA, Exponential Smoothing, or Prophet for better day-ahead predictions.
- [ ] **Statistical Anomaly Detection:** Implement Z-Score, Moving Average deviation, and Interquartile Range (IQR) methods to detect outliers dynamically based on historical variance.
- [ ] **Peer Comparison:** Group meters geographically (by zone) and flag meters deviating significantly from their neighbors' trends.
- [ ] **Enhanced Explainability:** Generate natural language strings based on statistical outputs (e.g., "Flagged because consumption is 3 standard deviations above the 30-day moving average").

---

## Phase 3: Explainable Machine Learning

**Goal:** Introduce advanced ML models while strictly adhering to the explainability constraints.

- [ ] **ML Forecasting:** Train XGBoost or LightGBM on historical data + weather data (if available) for highly accurate forecasting.
- [ ] **Isolation Forests / Autoencoders:** Use unsupervised learning to catch complex, non-linear anomalies that statistical methods miss.
- [ ] **SHAP Values Integration:** Integrate SHAP (SHapley Additive exPlanations) to translate ML decisions into human-readable factors (e.g., "Model confidence is 89% because feature X contributed +0.5 to the anomaly score").
- [ ] **Feedback Loop:** Allow the system to learn from the human operators' "Confirm" or "Dismiss" actions to reduce false positives over time.
