# WattWatch

> **Explainable Smart Grid Intelligence for Demand Forecasting and Anomaly Detection**

WattWatch is a standalone, human-in-the-loop decision-support platform designed for electricity utilities. It forecasts short-term electricity demand and detects suspicious smart meter consumption patterns, helping operators identify potential electricity theft, meter tampering, and faulty hardware before they cause critical grid failures or significant financial losses.

> [!IMPORTANT]
> **Human-in-the-Loop Philosophy**
> WattWatch is built on the strict principle that **no automatic action is ever taken against a customer or utility system**. The platform generates insights, flags anomalies, and provides evidence. A human operator reviews, confirms, and dictates the next steps.

---

## 📖 Documentation

Welcome to the WattWatch documentation. This project is built incrementally to showcase a robust architecture that goes from simple rule-based baselines to advanced machine learning models, always prioritizing **explainability** and **auditability**.

| Document | Description |
|---|---|
| [Project Spec](docs/PROJECT_SPEC.md) | Problem definition, goals, non-goals, and constraints. |
| [Architecture](docs/ARCHITECTURE.md) | High-level system design and component interaction. |
| [Roadmap](docs/ROADMAP.md) | Phased development plan from baselines to ML. |
| [Data Contract](docs/DATA_CONTRACT.md) | Smart meter schema and validation rules. |
| [ML Strategy](docs/ML_STRATEGY.md) | Progression from heuristics to advanced forecasting. |
| [Explainability](docs/EXPLAINABILITY.md) | How the system justifies its predictions to non-technical users. |
| [API Spec](docs/API_SPEC.md) | RESTful API endpoints for the dashboard. |
| [Evaluation](docs/EVALUATION.md) | Metrics for accuracy, false positives, and success. |
| [Decisions (ADR)](docs/DECISIONS.md) | Technical architecture decision records. |
| [Threat Model](docs/THREAT_MODEL.md) | Security and data protection considerations. |
| [Demo Instructions](docs/DEMO.md) | How to run WattWatch locally using synthetic data. |

---

## 🚀 Key Features

### 1. Explainable Anomaly Detection
Identifies sudden drops, near-zero consumption, unprecedented spikes, irregular patterns, and peer deviations. Every anomaly comes with a clear reason, peer context, confidence score, and plain-language explanation.

### 2. Demand Forecasting
Predicts day-ahead electricity demand with 24-hour granular forecasts at the meter, zone, and area levels. Compares predictions against historical baselines and tracks model drift.

### 3. Human-Centric Dashboard
A non-technical operator dashboard featuring:
- **Overview:** High-risk zones and anomaly counts.
- **Demand Forecast:** Real-time baseline comparison charts.
- **Anomaly Review:** Filtered queue of flagged meters with audit trails.
- **Performance:** Model accuracy and false positive tracking.

---

## 🛠 Getting Started

See the [Demo Instructions](docs/DEMO.md) for how to set up the environment, generate synthetic data, and spin up the dashboard locally.

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
