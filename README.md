# GridSentinel

**Explainable Smart Grid Intelligence for Demand Forecasting and Anomaly Detection**

GridSentinel is a standalone decision-support system built for electricity utilities. It forecasts short-term electricity demand and detects suspicious smart meter consumption patterns -- helping operators identify theft, tampering, and faulty meters before they become costly problems.

The system never takes automatic action. Every prediction and anomaly flag is routed to human operators for review.

---

## Why This Exists

Utility operators deal with growing data volumes from smart meters but often lack the tools to make sense of it all. GridSentinel bridges that gap by combining demand forecasting with anomaly detection in a single, explainable interface. It does not require a data science background to use.

---

## What It Does

### Demand Forecasting

- Predicts day-ahead electricity demand and 24-hour hourly forecasts
- Operates at individual meter, zone, and area levels
- Compares predictions against baselines: same time last week and historical averages
- Ranks zones by demand spike and grid stress risk
- Every forecast comes with a plain-language explanation of why the model expects what it expects

### Anomaly Detection

Identifies five categories of suspicious behavior:

| Anomaly Type | What It Means |
|---|---|
| Sudden drop | Consumption fell sharply compared to the meter's own history |
| Near-zero consumption | A previously active meter suddenly reports almost nothing |
| Sudden spike | Consumption jumped well above normal |
| Irregular pattern | Readings change unpredictably between consecutive periods |
| Peer deviation | A meter behaves very differently from similar or nearby meters |

Each flagged anomaly includes:

- The reason it was flagged
- Historical and peer comparison data
- A confidence level (low, medium, or high)
- A plain-language explanation

### Possible Causes the System Considers

- Electricity theft
- Meter tampering
- Meter malfunction
- Data collection issues
- Normal user behavior (e.g., someone traveling, a business closing temporarily, holidays)

---

## Human-in-the-Loop

This is a core design principle, not an afterthought. GridSentinel supports human decision-making -- it does not replace it.

**The system generates forecasts, calculates risk, detects anomalies, and presents evidence.**

**The human reviews forecasts, confirms issues, marks false alarms, and requests field inspections.**

No operational decision is made without a person in the loop.

---

## Explainability and Auditability

GridSentinel does not produce black-box outputs. Every prediction and anomaly flag is accompanied by:

- Key factors behind the result
- Baseline comparisons
- Predicted versus actual values (when available)
- Confidence scores
- A full audit trail: input data reference, timestamp, method used, result, explanation, and human review status

---

## Dashboard

The interface is organized around four views:

**Overview** -- Current high-risk zones, demand stress summary, anomaly flag counts, and review status at a glance.

**Demand Forecast** -- Forecast versus baseline and actual charts, zone and meter filtering, risk ranking, and accuracy metrics.

**Anomaly Review** -- A filtered list of flagged meters with supporting evidence, confidence levels, historical context, and review actions.

**Performance** -- Forecast accuracy over time, error rates, confirmed anomaly rates, false positive rates, and review outcome statistics.

---

## Data Support

GridSentinel works with:

- Synthetic data for development and testing
- Masked utility data for production evaluation
- Readings at 15-minute, hourly, or other available intervals
- Aggregation at individual meter, zone, area, and feeder levels

---

## Design Constraints

These are non-negotiable:

- No automatic actions without human approval
- Human review is required for all flagged items
- All outputs are explainable
- False positives remain visible for evaluation
- Synthetic and masked data are supported
- No modification to existing utility systems is needed
- Deployment as a standalone decision-support layer

---

## Getting Started

*Detailed setup and installation instructions will be added as the project takes shape.*

---

## License

*To be determined.*
