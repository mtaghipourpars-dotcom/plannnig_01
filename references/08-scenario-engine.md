# 13. Scenario / What-If Engine

## 13.1 Branching model

BASE PLAN V17

\|

+-- Scenario S-A: Priority P01 -\> 1

+-- Scenario S-B: CNC-04 unavailable 3 days

+-- Scenario S-C: +20B cash on 2026-10-01

+-- Scenario S-D: Outsource Operation 30

Each scenario stores:

\- base_plan_version_id

\- scenario_event list

\- rule/model version

\- calculated state hash

\- results / impacts

\- resource requirements

\- feasibility status

## 13.2 Scenario event schema

| **Field**               | **Meaning**                        | **Required**     |
|-------------------------|------------------------------------|------------------|
| scenario_event_id       | UUID                               | Yes              |
| scenario_id             | Parent scenario                    | Yes              |
| event_type              | Typed business event               | Yes              |
| effective_day           | First affected planning day        | Yes              |
| target_type / target_id | Target aggregate                   | Yes              |
| payload_json            | Typed event payload                | Yes              |
| expected_version        | Optimistic concurrency version     | Yes for mutation |
| confidence              | HIGH/MEDIUM/LOW where forecasted   | No               |
| source                  | USER / SAP / MES / RULE / EXTERNAL | Yes              |
| created_by              | Actor                              | Yes              |
| created_at              | Audit timestamp                    | Yes              |

## 13.3 Scenario result requirements

- Commitment impact by product and due date.

- Resource loading by day.

- Material projected balance and first shortage day.

- Manpower demand and overtime need.

- Cash requirement by day.

- Change in throughput/WIP.

- Opportunity cost on displaced products.

- Assumptions and confidence levels.

- Feasibility state and exact violated constraints.

- Comparison against selected baseline version.
