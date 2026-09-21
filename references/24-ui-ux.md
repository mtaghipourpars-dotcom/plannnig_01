# 30. UI/UX Information Architecture

## 30.1 Primary screens

| **Screen**              | **Purpose**                                                                                 |
|-------------------------|---------------------------------------------------------------------------------------------|
| Executive Control Tower | At-risk commitments, resource crises, decisions required, trend and drill-down.             |
| Planning Workspace      | Daily timeline, products, production orders, operations, resource load and replan controls. |
| Scenario Lab            | Create branch, inject events, calculate, compare, optimize, inspect resource requirements.  |
| Resource Board          | Machine/material/manpower/cash by day; bottlenecks and conflicts.                           |
| Material Risk           | Projected balance, first shortage date, consuming orders, supply actions.                   |
| Commitment Trace        | Commitment -\> product -\> order -\> operation -\> resource -\> event.                      |
| Decision Workbench      | Alternatives, feasibility, objective terms, opportunity cost, approvals.                    |
| Execution & Actuals     | Confirmations, actual cost, consumption and reconciliation.                                 |
| Lessons                 | Past cases, reusable patterns, calibration impact.                                          |
| Integration Monitor     | SAP messages, stale feeds, errors, quarantine, replay.                                      |
| Administration          | Rules, thresholds, calendars, roles and configuration versions.                             |

## 30.2 UX rules

- Progressive disclosure: executives see impact first; planners see causal detail on drill-down.

- Every red/amber status must be clickable to the underlying evidence.

- Past and future must have visually distinct states.

- Scenario changes must show BEFORE vs AFTER.

- Every scenario result must show the effective date of each assumption.

- Use Persian RTL and English localization from the same UI model; no hard-coded labels.

- No KPI without source timestamp and data freshness indicator.
