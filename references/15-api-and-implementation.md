# 21. API Architecture and Contracts

## 21.1 API conventions

- Base path: /api/v1.

- JSON over HTTPS; UTF-8; timestamps ISO-8601 with offset.

- Idempotency-Key required for POST commands.

- ETag / If-Match required for mutable aggregate updates.

- Every response contains request_id/correlation_id.

- Pagination is cursor-based for high-volume lists.

- Errors use RFC 7807 problem+json shape.

## 21.2 Core API catalog

| **Method** | **Path**                         | **Purpose**                          |
|------------|----------------------------------|--------------------------------------|
| POST       | /planning-days/{date}/close      | Close a planning day                 |
| GET        | /plans/current                   | Current active baseline plan         |
| POST       | /plans/recalculate               | Create/recalculate baseline plan     |
| POST       | /production-orders               | Create planning-side order reference |
| PATCH      | /production-orders/{id}/priority | Change future priority               |
| POST       | /resources/{id}/breakdowns       | Register breakdown event             |
| POST       | /finance/cash-injections         | Create future cash resource event    |
| GET        | /materials/{id}/forecast         | Material time-phased forecast        |
| POST       | /scenarios                       | Create scenario branch               |
| POST       | /scenarios/{id}/events           | Add scenario event                   |
| POST       | /scenarios/{id}/calculate        | Run scenario calculation             |
| GET        | /scenarios/{id}/impacts          | Scenario impacts                     |
| GET        | /scenarios/{id}/resources        | Future resource requirements         |
| POST       | /scenarios/{id}/optimize         | Optimize scenario                    |
| POST       | /scenarios/{id}/commit           | Commit approved scenario             |
| POST       | /decisions                       | Create decision record               |
| POST       | /decisions/{id}/approve          | Approve/reject decision              |
| POST       | /actual-events                   | Ingest actual fact                   |
| GET        | /commitments/{id}/timeline       | Commitment end-to-end trace          |
| GET        | /lessons/similar                 | Find reusable lessons                |
| POST       | /lessons                         | Create lesson                        |

## 21.3 Example — create scenario

POST /api/v1/scenarios

Idempotency-Key: 7d3f...

{

"basePlanVersionId": "7d0d...",

"name": "Prioritize P-017",

"horizon": {"from":"2026-09-22","to":"2026-12-20"},

"initialEvents": \[

{

"type":"PRIORITY_CHANGED",

"effectiveDay":"2026-09-22",

"targetType":"PRODUCT_PLAN",

"targetId":"91af...",

"payload":{"newPriority":1}

}

\]

}

## 21.4 Example — scenario calculation response

{

"scenarioId":"SC-0017",

"status":"CALCULATED",

"feasibility":"FEASIBLE_CONDITIONAL",

"commitmentImpacts":\[...\],

"resourceRequirements":\[...\],

"materialShortages":\[...\],

"opportunityCost":\[...\],

"calculation":{"modelVersion":"PLAN-1.0.0","rulesVersion":"R-2026.09","durationMs":18340}

}

## 21.5 Critical sequence diagrams

### 21.5.1 Machine breakdown -\> dynamic replan

sequenceDiagram

actor Maintenance

participant API

participant EventStore

participant Planner

participant Feasibility

participant ReadModel

Maintenance-\>\>API: POST /resources/{id}/breakdowns

API-\>\>EventStore: Persist event + idempotency key

EventStore--\>\>Planner: RESOURCE_BREAKDOWN

Planner-\>\>Planner: Freeze past; overlay future loss

Planner-\>\>Planner: Recalculate operations/order/product dates

Planner-\>\>Feasibility: Check capacity/material/manpower/cash

Feasibility--\>\>Planner: Feasible plan / RESOURCE_CRISIS

Planner-\>\>ReadModel: Publish new plan version + impacts

ReadModel--\>\>API: Updated at-risk commitments

### 21.5.2 Scenario -\> optimize -\> approve -\> commit

sequenceDiagram

actor Planner

participant API

participant Scenario

participant Engine

participant Optimization

participant Decision

participant SAP

Planner-\>\>API: Create scenario from active plan

API-\>\>Scenario: Store branch + future event(s)

Planner-\>\>API: Calculate scenario

API-\>\>Engine: Rebuild future state

Engine-\>\>Optimization: Generate feasible candidates

Optimization--\>\>Engine: Alternatives + gaps + objective values

Engine--\>\>Scenario: Persist scenario result

Planner-\>\>Decision: Submit selected candidate

Decision-\>\>Decision: Apply approval threshold / SoD

Decision--\>\>API: APPROVED

API-\>\>SAP: Commit/write-back approved changes

SAP--\>\>API: Business object IDs/status

API-\>\>Scenario: Mark COMMITTED and create baseline version

## 21.6 Command contract baseline

POST /api/v1/resources/{resourceId}/breakdowns

{

"effectiveDay": "2026-10-03",

"durationDays": 3,

"reasonCode": "MECH_FAILURE",

"confidence": "HIGH",

"source": "MAINTENANCE"

}

POST /api/v1/production-orders/{id}/priority

{

"effectiveDay": "2026-10-04",

"newPriority": 1,

"reasonCode": "EXECUTIVE_REPRIORITIZATION"

}

POST /api/v1/finance/cash-injections

{

"effectiveDay": "2026-10-05",

"currency": "IRR",

"amount": 20000000000,

"purpose": "MATERIAL_EXPEDITING",

"confidence": "MEDIUM"

}

POST /api/v1/scenarios/{id}/optimize

{

"objective": "MIN_RESOURCE_INJECTION",

"constraints": {

"criticalCommitmentsOnTime": true,

"maxCashInjection": 30000000000,

"maxOvertimeHoursPerDay": 4

}

}

| **COMMAND SEMANTICS:** Commands create events or immutable decision records; they do not directly mutate a read model. The domain engine consumes the command, validates authority/effective date/version, persists the event transactionally, and asynchronously or synchronously (by SLA) creates the next plan version. |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
