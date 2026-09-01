# Machine Learning Strategy

WattWatch prioritizes a pragmatic, incremental approach to intelligence. We do not start with complex Deep Learning models; we start with heuristics and progress to ML only when necessary, and only if explainability can be maintained.

## 1. The Intelligence Progression

### Step 1: Rule-Based Heuristics (Current)
-   **Method:** Hard-coded thresholds (e.g., "Flag if consumption > 150% of the maximum historical value").
-   **Pros:** 100% explainable, trivial to implement, extremely fast.
-   **Cons:** Rigid, prone to false positives during seasonal changes.

### Step 2: Statistical Baselines
-   **Method:** Z-Scores, Interquartile Range (IQR), and Rolling Averages.
-   **Pros:** Adapts dynamically to changing consumption patterns, still highly explainable using standard deviations.
-   **Cons:** Struggles with complex seasonality (e.g., holidays).

### Step 3: Explainable Machine Learning (Future)
-   **Method:** Tree-based models (XGBoost, Random Forest) integrated with SHAP (SHapley Additive exPlanations).
-   **Pros:** Handles non-linear relationships, weather data, and complex seasonality perfectly.
-   **Cons:** Harder to deploy and requires translation layers to make the outputs understandable to human operators.

## 2. Forecasting Strategy

The demand forecasting engine will evolve as follows:
1.  **Naive Baseline:** $Y_{tomorrow} = \text{Average}(Y_{last\_7\_days})$
2.  **SARIMA:** Incorporating daily and weekly seasonality.
3.  **Gradient Boosting:** Predicting demand based on historical lags, weather forecasts, and calendar events.

## 3. The "Explainability First" Constraint

If a model achieves 99% accuracy but its decisions cannot be translated into a human-readable sentence for the dashboard, **it will be rejected**. 

For example, an Autoencoder neural network might be excellent at detecting anomalies, but if the output is just a "reconstruction error score of 0.84", the utility operator cannot act on it. We must be able to map the anomaly back to the raw input features (e.g., "Flagged because the variance between 2 AM and 4 AM was 5x higher than normal").
