# 1. Purpose, Scope, Design Authority and Source Basis

## 1.1 Purpose

This document defines the complete target architecture and implementable engineering baseline for a MAPNA PARS-oriented dynamic production planning platform. It is intended to be used as the architecture baseline for backend, frontend, integration, data, QA, DevOps, security and operations teams.

## 1.2 Scope

- Dynamic daily planning from commitment through actual result.

- Time-phased capacity planning for machines/work centers, manpower, materials, cash and selected external constraints.

- Production-order and operation-level planning aligned with SAP manufacturing concepts.

- Daily forecast of material shortages, capacity overloads and commitment impacts.

- What-if scenario branching from a fact-anchored current plan.

- Feasibility calculation, resource injection requirement and opportunity-cost analysis.

- Multi-criterion optimization with configurable objective functions.

- Management decision, approval, plan commitment and execution follow-up.

- Actual-vs-forecast reconciliation and first-class lesson learned.

- SAP S/4HANA integration, security, audit, observability and controlled deployment.

## 1.3 Explicit non-scope

- Replacing SAP FI/MM/PP/SD/PS/PM/QM transaction processing.

- Direct access to SAP application database tables for business processing.

- Replacing MES/shop-floor machine controllers.

- Real-time sub-second machine control or safety interlocks.

- Autonomous management decisions without configured approval authority.

- Uncontrolled AI-generated writes into SAP or the planning baseline.

## 1.4 Source basis

The official MAPNA Generator website states that PARS was established in 1377/1998, initially to transfer technology and manufacture thermal generators up to 160 MW, hydro generators up to 250 MW and power-plant busducts; it also describes wind-turbine activity, industrial generators, traction motors, electric motors, electric-vehicle drive motors, after-sales services and specialized power services. The site also states exports to Syria, Iraq and Tajikistan. These statements define the domain vocabulary used in this architecture; internal operational data is not inferred from them. \[SRC-01\]\[SRC-02\]

| **SOURCE DATA QUALITY NOTE:** The official achievements page contains a numerical inconsistency: its heading states 44,000 MW while the following paragraph states 45,000 MW. The architecture does not hard-code either figure. Any executive KPI is expected to originate from governed operational data or a separately approved corporate KPI definition. \[SRC-03\] |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
