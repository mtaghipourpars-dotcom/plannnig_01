# 4. C4 Level 1 — System Context

Figure 4-1 — C4 Level 1 context (Mermaid)

flowchart LR

USER\[Planners / Production Managers / Supply / Finance / Maintenance / Quality / Executives\]

MAPNA\[Dynamic Production Planning & Resource Allocation Platform\]

SAP\[SAP S/4HANA On-Premise\]

MES\[MES / Shop-floor / Machine data\]

P6\[Primavera / Project planning if used\]

SCADA\[SCADA / equipment status if used\]

HR\[HR / Workforce source\]

SUP\[Suppliers / logistics / external commitments\]

IDP\[Enterprise Identity Provider\]

OBS\[Monitoring / SIEM / SOC\]

USER --\> MAPNA

SAP \<--\> MAPNA

MES \<--\> MAPNA

P6 \<--\> MAPNA

SCADA --\> MAPNA

HR --\> MAPNA

SUP --\> MAPNA

IDP --\> MAPNA

MAPNA --\> OBS

## 4.1 External actors

| **Actor/system**               | **Interaction**                                           | **Authority**                                                     |
|--------------------------------|-----------------------------------------------------------|-------------------------------------------------------------------|
| Production Planner             | Create/revise plan, inspect constraints, create scenarios | Planning authority within assigned scope                          |
| Product/Project Owner          | Raise deviation, quantify impact, submit alternatives     | Owner of case facts and mitigation proposals                      |
| Supply/Procurement             | Review material constraints and supply actions            | Supply commitments and procurement actions                        |
| Maintenance                    | Report breakdown/repair state and maintenance windows     | Machine availability state                                        |
| Finance                        | Review cash constraints and approve injections            | Financial planning authority                                      |
| Quality                        | Raise quality holds and release constraints               | Quality disposition authority                                     |
| Executive / Steering Committee | Approve high-impact plan changes                          | Final business decision within governance threshold               |
| SAP S/4HANA                    | Provide governed master and transactional facts           | System of record for SAP-owned data                               |
| MES/Shop-floor                 | Provide execution status and machine signals              | System of record for production execution events where applicable |
| Identity Provider              | Authentication/claims                                     | Identity authority                                                |


---

# 5. Macro Logical Architecture

Figure 5-1 — Logical architecture

+---------------------------+

\| Presentation / Experience \|

\| Web / RTL / Mobile Web \|

+-------------+-------------+

\|

+-------------v-------------+

\| API Gateway / BFF \|

+-------------+-------------+

\|

+-------------------+---------------+--------------------+-------------------+

\| \| \| \|

+----v-----+ +------v------+ +--------v------+ +-------v-------+

\| Planning \| \| Scenario / \| \| Decision / \| \| Master & \|

\| Domain \| \| What-if \| \| Governance \| \| Configuration\|

+----+-----+ +------+------+ +-------+-------+ +------+-------+

\| \| \| \|

+-------------------+----------------+-------------------+-------------------+

\|

+-------------v-------------+

\| Domain / Rules Kernel \|

\| State + Event + Time \|

+-------------+-------------+

\|

+----------------+---------------+----------------+------------------+

\| \| \| \|

+-------v------+ +------v--------+ +--------v------+ +-------v------+

\| Feasibility \| \| Optimization \| \| Learning / \| \| Integration \|

\| Engine \| \| Engine \| \| Calibration \| \| Gateway \|

+-------+------+ +------+--------+ +--------+------+ +-------+------+

\| \| \| \|

+----------------+---------------+----------------+------------------+

\|

+---------v---------+

\| Data Platform \|

\| PostgreSQL / \|

\| Redis / Kafka / \|

\| Object Storage \|

+-------------------+

## 5.1 Component responsibilities

| **Component**       | **Primary responsibility**                                                                                  |
|---------------------|-------------------------------------------------------------------------------------------------------------|
| Experience UI       | Dashboards, planning workspace, scenario lab, timeline, resource boards, approvals, audit and lesson views. |
| API Gateway/BFF     | Authentication enforcement, rate limiting, aggregation, tenant and role context, request correlation.       |
| Planning Domain     | Baseline plan generation, daily state transition, schedule and allocation management.                       |
| Scenario Domain     | Branch creation, event overlays, branch comparison, scenario lifecycle.                                     |
| Decision Domain     | Alternative packages, approvals, decision record, plan commit.                                              |
| Rules Kernel        | Calendars, capacity equations, priority rules, business constraints and effective-dating.                   |
| Feasibility Engine  | Time-phased capacity/material/manpower/cash constraints and conflict propagation.                           |
| Optimization Engine | Generates feasible candidates and solves configurable objectives.                                           |
| Learning Domain     | Actual-vs-forecast analysis, lesson capture, pattern matching, parameter calibration.                       |
| Integration Gateway | SAP and non-SAP adapters, canonical model mapping, idempotency, retries, monitoring.                        |
| Data Platform       | Transactional relational store, event log, cache, object storage and analytics read models.                 |

## 5.2 Reference codebase structure

/platform

/apps

/web

/api

/planning-worker

/scenario-worker

/integration-worker

/modules

/domain-core

/planning

/scenario

/feasibility

/optimization

/decision

/learning

/integration

/contracts

/openapi

/events

/sap-mappings

/db

/migrations

/seed-reference

/infra

/k8s

/helm

/terraform-or-iac

/tests

/unit /component /integration /e2e /performance /security

/docs

/adr /runbooks /operations

The repository must enforce dependency direction: domain-core cannot depend on SAP adapters, web UI cannot call repositories directly, and optimization/solver adapters depend on a solver-neutral domain contract. Database migrations are forward-only in normal release flow; destructive migrations require a separately approved migration version and rollback plan.
