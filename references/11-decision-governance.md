# 17. Decision Governance and Approval Model

## 17.1 Decision authority levels

| **Level** | **Role archetype**                     | **Can do**                                                   | **Approval boundary**                           |
|-----------|----------------------------------------|--------------------------------------------------------------|-------------------------------------------------|
| L1        | Planner / Product Owner                | Create cases, run scenarios, quantify alternatives           | May commit within local threshold if authorized |
| L2        | Functional manager / portfolio manager | Review cross-product impact, select candidate for escalation | Approves functional resource reallocations      |
| L3        | Steering Committee / senior management | Approve high-impact commitment/resource changes              | Final for configured thresholds                 |
| L4        | System administrator                   | Technical config only                                        | No business approval                            |

## 17.2 Decision record

Every approved decision stores: decision_id, case_id, base_plan_version, alternatives considered, feasibility evidence, objective weights, selected alternative, approvers, timestamp, execution owner, expected outcomes and review date. The record is immutable; changes create a new decision version.
