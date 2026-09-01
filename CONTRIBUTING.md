# Contributing to WattWatch

Thank you for your interest in contributing! WattWatch is an open-source decision support system for utilities, and we welcome improvements ranging from bug fixes to advanced anomaly detection algorithms.

## 1. Project Philosophy

Before contributing, please review our [Project Spec](docs/PROJECT_SPEC.md) and [Decisions (ADR)](docs/DECISIONS.md). The most important rules are:
- **No black-box models:** Every anomaly flag must be explainable in plain language.
- **No automated actions:** This is a human-in-the-loop system. Do not build features that automatically alter utility grid state.

## 2. Development Setup

See the [Demo Instructions](docs/DEMO.md) to set up the local environment and generate synthetic data for testing.

## 3. Pull Request Process

1.  **Fork the repo** and create your branch from `main`.
2.  **Ensure tests pass.** If you add a new heuristic or model, write a unit test to verify it catches the anomaly without an excessive false-positive rate.
3.  **Update documentation.** If you change the API, update `docs/API_SPEC.md`. If you add a new model, update `docs/ML_STRATEGY.md`.
4.  **Submit the PR.** Provide a clear description of the problem solved and link any relevant issues.

## 4. Code Style

-   **Python (Backend):** Follow PEP 8. We use `black` for formatting and `flake8` for linting. Type hinting is highly encouraged.
-   **JavaScript/TypeScript (Frontend):** We use Prettier for formatting. Ensure no linting errors remain before submitting.

## 5. Adding New AI/ML Features

If you are contributing to Phase 3 (Machine Learning), you must include a SHAP implementation (or equivalent) that maps the model's feature importance back to the `Explanation` object required by the API. Contributions introducing opaque, unexplainable neural networks will be rejected.
