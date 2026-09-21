# 32. Implementation Plan and Work Breakdown

## 32.1 Delivery waves

| **Wave** | **Theme**                | **Deliverables**                                                                              |
|----------|--------------------------|-----------------------------------------------------------------------------------------------|
| Wave 0   | Foundation               | Identity, platform, DB, CI/CD, observability, canonical model, SAP connectivity.              |
| Wave 1   | Fact and baseline        | Master sync, production orders, operations, daily state, baseline plan, executive read model. |
| Wave 2   | Dynamic events           | Breakdown, material receipt/shortage, priority change, cash injection, replan engine.         |
| Wave 3   | Scenario lab             | Branching, scenario calculation, resource requirements, comparison.                           |
| Wave 4   | Feasibility/optimization | Hard constraints, optimization adapter, opportunity cost, resource crisis.                    |
| Wave 5   | Decision and execution   | Approvals, plan commit, SAP write-back, actual reconciliation.                                |
| Wave 6   | Learning                 | Lessons, pattern matching, calibration and accuracy metrics.                                  |
| Wave 7   | Industrialization        | Performance hardening, DR, security hardening, UAT, cutover.                                  |

## 32.2 Team structure

| **Team**              | **Primary skills**                                    | **Ownership**               |
|-----------------------|-------------------------------------------------------|-----------------------------|
| Architecture          | Enterprise, solution, SAP, security                   | Architecture baseline, ADRs |
| Backend               | Java/Spring, domain design                            | Core services, APIs         |
| Planning/Optimization | Operations research, scheduling, Java/Python          | Planning and solver         |
| Frontend              | React/TS, data visualization, RTL                     | UI                          |
| SAP Integration       | ABAP/OData/IDoc/Cloud Integration                     | Adapters/mappings           |
| Data                  | PostgreSQL, data quality                              | Schema, migration           |
| QA                    | Automation, performance, security                     | All quality gates           |
| DevOps/SRE            | K8s, CI/CD, observability, backup                     | Platform                    |
| Business SMEs         | PP, production, supply, finance, maintenance, quality | Rules/UAT                   |
