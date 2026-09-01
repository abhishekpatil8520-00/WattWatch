# Architecture Decision Records (ADR)

This document tracks major architectural decisions made during the development of WattWatch.

## ADR 001: Human-in-the-Loop Constraint

**Date:** 2024-03-12
**Status:** Accepted

**Context:** 
Smart grid anomalies can indicate hardware failure or electricity theft. If a system automatically acts on these anomalies (e.g., disconnecting power), a false positive could cut off a hospital or a vulnerable family. 

**Decision:** 
WattWatch will strictly act as a decision-support tool. It will generate anomalies and forecasts, but a human operator must review and confirm all actions through the dashboard. The system will not integrate with SCADA shutoff mechanisms.

**Consequences:**
- Eliminates the risk of catastrophic automated mistakes.
- Requires the development of a UI workflow for reviewing and managing anomaly queues.

---

## ADR 002: Explainability Over Accuracy

**Date:** 2024-03-12
**Status:** Accepted

**Context:** 
Deep learning models (like LSTMs or Transformers) can achieve highly accurate time-series forecasting and anomaly detection, but their internal logic is opaque ("black box").

**Decision:** 
We prioritize explainability over absolute accuracy. Any model used in production must be able to output a human-readable justification for its decision. 

**Consequences:**
- We will start with rule-based heuristics and statistical baselines.
- When transitioning to ML, we are restricted to models that support feature importance mapping (like Tree-based models via SHAP).

---

## ADR 003: Synthetic Data for Development

**Date:** 2024-03-12
**Status:** Accepted

**Context:** 
Real smart meter data is highly sensitive and protected by privacy laws (GDPR, CCPA). Securing real datasets for a portfolio project is difficult and legally risky.

**Decision:** 
We will build a robust synthetic data generator to create mock smart meter readings. The generator will inject synthetic anomalies (spikes, drops, zero-reads) into the dataset for the inference engine to find.

**Consequences:**
- Guarantees zero privacy leaks.
- Makes the repository easy to run and test for anyone cloning it from GitHub.
- Requires time investment to build a realistic data generator.
