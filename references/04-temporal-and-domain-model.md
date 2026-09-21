# 8. Information Architecture and Temporal Model

## 8.1 Two temporal universes

PAST / FACT UNIVERSE

--------------------

Actual execution events

Actual consumption

Actual confirmations

Actual costs

Closed-day machine state

Closed-day inventory state

FUTURE / PLAN UNIVERSE

---------------------

Expected receipts

Planned operation start/end

Planned allocations

Forecast material consumption

Forecast cost/cash

Scenario assumptions

Future capacity events

## 8.2 Planning day

| **Field**         | **Definition**                                             |
|-------------------|------------------------------------------------------------|
| planning_day_id   | Stable internal identifier.                                |
| business_date     | Calendar date used as planning bucket.                     |
| plant_calendar_id | Working calendar governing capacity availability.          |
| status            | OPEN, FROZEN, CLOSED.                                      |
| actual_cutoff_ts  | Cut-off after which the day is treated as fact-anchored.   |
| plan_version_id   | Baseline plan active for the day.                          |
| closed_by         | User/system identity that closed the day.                  |
| closed_at         | Close timestamp.                                           |
| state_hash        | Deterministic hash of fact state used for reproducibility. |

## 8.3 Temporal rules

1\. Actual events are immutable after the day is closed; a correction creates a compensating event with a link to the original event.

2\. A future plan record may be replaced only by publishing a newer plan version; historical versions remain queryable.

3\. A scenario is evaluated against a specific baseline plan version. If the baseline changes, the scenario becomes STALE and must be rebased.

4\. No scenario may mutate actual facts.

5\. All forecast values carry source, confidence, model version and calculation timestamp.

6\. The system stores both effective_date and recorded_at so historical reconstruction is possible.


---

# 9. Core Domain Model

Figure 9-1 — Core conceptual domain

classDiagram

Commitment "1" --\> "1..\*" ProductPlan

ProductPlan "1" --\> "1..\*" ProductionOrder

ProductionOrder "1" --\> "1..\*" OperationPlan

OperationPlan "\*" --\> "1" WorkCenter

OperationPlan "\*" --\> "0..\*" MaterialDemand

MaterialDemand "\*" --\> "1" Material

ProductionOrder "\*" --\> "1" Product

Product "1" --\> "1..\*" BOMVersion

Product "1" --\> "1..\*" RoutingVersion

PlanningDay "1" --\> "1..\*" PlanVersion

PlanVersion "1" --\> "0..\*" Scenario

Scenario "1" --\> "0..\*" ScenarioEvent

Scenario "1" --\> "0..\*" ResourceRequirement

Scenario "1" --\> "0..\*" DecisionAlternative

Decision "1" --\> "1" DecisionAlternative

ActualEvent "\*" --\> "1" ProductionOrder

ActualEvent "\*" --\> "1" PlanningDay

## 9.1 Aggregate boundaries

| **Aggregate**    | **Root**        | **Owns**                                                | **Consistency boundary**               |
|------------------|-----------------|---------------------------------------------------------|----------------------------------------|
| Commitment       | Commitment      | Milestones, forecast, risk links                        | Commitment dates/status/priority.      |
| Product Plan     | ProductPlan     | Product-level planned completion and allocation summary | Plan version + product schedule.       |
| Production Order | ProductionOrder | Operations, allocation references, progress projection  | Order status and schedule.             |
| Resource         | Resource        | Calendar, capacity profile, dynamic availability        | Capacity availability by day.          |
| Material         | Material        | Planning parameters and alternative rules               | Material identity and planning policy. |
| Scenario         | Scenario        | Scenario events, computed impacts, candidate plans      | Scenario lifecycle and base version.   |
| Decision         | Decision        | Selected alternative, approval evidence                 | Decision authorization.                |
| Lesson           | Lesson          | Evidence, reusable pattern, calibration link            | Learning rule and applicability.       |

## 9.1 Temporal aggregate rules

| **Aggregate**          | **Immutable facts**                                | **Future plan state**                                             | **Branching rule**                                                       |
|------------------------|----------------------------------------------------|-------------------------------------------------------------------|--------------------------------------------------------------------------|
| Production Order       | Created/released/confirmed/cancelled actual events | Future release, priority, dates, resource allocation              | Scenario stores override/event delta; actual events remain global facts  |
| Work Center / Resource | Closed-day availability and actual downtime        | Future capacity calendar, maintenance windows, efficiency factors | Scenario overlays future capacity only                                   |
| Material               | Historical stock/consumption/receipts              | Expected receipts, reservations, projected balance                | Scenario may change future receipts/allocations                          |
| Cash                   | Posted/closed financial facts                      | Forecast cash availability and approved injections                | Scenario may inject or defer future funding assumptions                  |
| Commitment             | Confirmed historical milestone facts               | Forecast completion and due-date risk                             | Scenario may change priority/due-date assumptions according to authority |

| **IMPLEMENTATION RULE:** A scenario engine must never clone actual history into mutable rows. It references the immutable actual timeline and overlays only future deltas. This is the technical mechanism that guarantees that Scenario A cannot accidentally change the historical truth shared with Scenario B or the baseline plan. |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
