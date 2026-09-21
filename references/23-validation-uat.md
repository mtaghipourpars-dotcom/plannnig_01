# 29. Verification, Validation and UAT

## 29.1 Major feature acceptance criteria

| **Feature**           | **Acceptance criterion**                                                                                                                           |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Daily planning        | Given frozen actuals and governed master snapshot, the engine produces a reproducible day-by-day future plan with documented resource constraints. |
| Scenario engine       | A scenario can be forked, changed, calculated, compared and discarded without altering the baseline.                                               |
| Material forecast     | The system identifies first shortage date and affected orders with traceable demand lines.                                                         |
| Resource feasibility  | Every selected alternative has a machine/material/manpower/cash feasibility explanation.                                                           |
| Optimization          | The engine produces one or more feasible alternatives and exposes objective terms and opportunity cost.                                            |
| Commitment trace      | A user can trace commitment -\> product -\> PO -\> operation -\> resource -\> event -\> impact.                                                    |
| Actual reconciliation | Closed-day actuals remain immutable and future plan is recalculated from them.                                                                     |
| Learning              | Forecast errors become reusable lessons and can alter configured parameters after approval.                                                        |
| SAP integration       | Source identifiers, message status, retries and reconciliation are fully auditable.                                                                |

## 29.2 UAT scenarios tailored to PARS business context

| **ID** | **Business scenario**                | **UAT goal**                                                                                       |
|--------|--------------------------------------|----------------------------------------------------------------------------------------------------|
| UAT-01 | Thermal generator commitment at risk | Simulate machine capacity loss; show impact through production flow and delivery.                  |
| UAT-02 | Hydro generator long-lead material   | Delay a critical imported material; forecast shortage and compare procurement vs sequence options. |
| UAT-03 | Busduct production conflict          | Create new order competing for shared capacity; quantify impact on existing commitments.           |
| UAT-04 | Wind product priority change         | Raise wind product priority; show cross-product opportunity cost.                                  |
| UAT-05 | Industrial/traction motor demand     | Add production order and validate material/capacity time-phased loading.                           |
| UAT-06 | Cash injection                       | Inject funding; validate that only blocked procurement paths from the effective date are released. |
| UAT-07 | Quality hold                         | Block a component; propagate downstream effect; release hold and replan.                           |
| UAT-08 | Daily actualization                  | Post actual confirmations and consumption; close day; validate new tomorrow baseline.              |
| UAT-09 | Decision committee                   | Compare alternatives; approve one; publish actions and record audit.                               |
| UAT-10 | Lesson reuse                         | Create lesson from an actual breakdown and surface it on a similar future risk.                    |
