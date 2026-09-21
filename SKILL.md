---
name: mapna-generator-architecture
description: Production-grade architecture and implementation guidance for MAPNA Generator Engineering and Manufacturing (PARS) dynamic production planning, resource allocation, daily simulation, scenario analysis, decision support, and SAP S/4HANA integration. Use when designing, implementing, reviewing, testing, integrating, or extending the MAPNA manufacturing platform, including generator manufacturing, busduct, motors, wind products, after-sales, planning, execution, or enterprise resource control.
license: Internal project architecture baseline; see README.md and references/ for scope and source boundaries.
compatibility: Agent Skills-compatible AI coding agents. The skill is implementation-first and assumes access to the project repository, SAP S/4HANA interface metadata, governed master data, and the listed architecture references.
metadata:
  author: OpenAI
  version: "1.0.0"
  project: "MAPNA PARS Dynamic Production Planning & Resource Allocation Platform"
  domain: "industrial-manufacturing"
  tags: "MAPNA,SAP S/4HANA,generator manufacturing,production planning,resource allocation,what-if,optimization,MES,architecture"
---

# Purpose

Use this skill as the single implementation baseline for the MAPNA PARS dynamic production planning platform. Do not invent internal MAPNA values. Treat the public MAPNA website as business-context evidence only and use SAP/MES/MDM/project sources for operational facts.

## Non-negotiable architecture rules

1. **Past is Fact; Future is Plan.** Actual consumption, actual progress, actual cost, actual confirmations, and closed-day resource state are immutable. Corrections are compensating events, not history edits.
2. **Time is a first-class dimension.** Minimum planning quantum is one day. Every future state is evaluated in ordered planning-day buckets across a rolling horizon.
3. **Dynamic means state + event + time.** A new production order, priority change, machine failure, material receipt/delay, manpower change, financial injection, due-date change, or quality hold is represented as a typed event.
4. **Scenario branches start from the current fact-anchored baseline.** Do not maintain standalone scenario datasets. Scenarios fork a known plan version and overlay future events.
5. **Impact must propagate.** Changes must be traceable through commitment → product → BOM/routing → production order → operation → resource → daily plan → forecast/risk → financial/commitment impact.
6. **Feasibility is a gate, not a ranking.** Do not present an alternative as selectable until hard constraints are checked for every impacted planning day.
7. **Resource competition is explicit.** Shared machine, material, manpower and cash are scarce resources. Opportunity cost must be computed for competing allocations.
8. **Optimization is configurable.** Never hard-code one universal objective. Objective weights, thresholds and hard constraints are versioned configuration with approval.
9. **No silent cross-system writes.** SAP changes occur only through approved contracts; no direct SAP database writes. Use transactional local persistence + outbox/inbox + retry/idempotency.
10. **Execution closes the loop.** Selected plans become baselines, execution produces immutable actuals, actuals are reconciled against plan, and lessons can alter future parameters only through governed rules.
11. **No autonomous management decisions.** The platform calculates and compares feasible alternatives; configured human approval remains authoritative.
12. **Every forecast has provenance.** Record source, confidence, model version, rule-set version, calculation timestamp and baseline plan version.

## Progressive disclosure — read these references as required

- Business scope and evidence: `references/00-source-register.md`, `references/00-scope-and-sources.md`, `references/01-business-context.md`.
- C4/logical/deployment architecture: `references/02-high-level-architecture.md`, `references/03-deployment-and-technology.md`.
- Time and domain model: `references/04-temporal-and-domain-model.md`.
- Business processes and use cases: `references/05-business-processes.md`, `references/06-use-cases.md`.
- Planning/scenario/optimization: `references/07-daily-planning-engine.md`, `references/08-scenario-engine.md`, `references/09-feasibility-optimization.md`.
- Execution/decision/learning: `references/10-execution-and-day-close.md`, `references/11-decision-governance.md`, `references/12-learning.md`.
- Data: `references/13-master-data.md`, `references/14-database-design.md`.
- APIs/SAP: `references/15-api-and-implementation.md`, `references/16-sap-integration.md`.
- Security/operations: `references/17-security.md`, `references/18-observability.md`, `references/19-ha-dr.md`, `references/20-devops.md`.
- Migration/quality/product UI: `references/21-migration.md`, `references/22-testing.md`, `references/23-validation-uat.md`, `references/24-ui-ux.md`, `references/25-configuration.md`.
- Delivery governance: `references/26-implementation-plan.md`, `references/27-risks.md`, `references/28-adrs.md`, `references/29-glossary.md`, `references/30-appendices.md`, `references/31-baseline-checklist.md`.
- Full consolidated architecture: `references/99-complete-architecture.md`.

## Machine-readable assets

Before implementing a corresponding area, load the matching asset: 

- API contract: `assets/schemas/openapi.yaml`
- Event contract: `assets/schemas/event-catalog.yaml`
- DB catalog manifest: `assets/schemas/database-catalog.json`
- Core DDL baseline: `assets/schemas/core-schema.sql`
- C4 context: `assets/diagrams/c4-context.mmd`
- Dynamic planning state machine: `assets/diagrams/daily-planning-state-machine.mmd`
- Scenario lifecycle: `assets/diagrams/scenario-lifecycle.mmd`
- Reference configuration: `assets/examples/reference-config.yaml`
- Example commands/events: `assets/examples/command-samples.json`

## Required implementation workflow

### 1. Establish the authoritative state

Identify the latest closed planning day, the active baseline plan version, the governed master-data snapshot, and the effective rule-set version. Never calculate against a mix of versions.

### 2. Classify the requested change

Classify it as one of: actual event, future planning event, master-data change, rule/configuration change, scenario event, or management decision. Validate authority, effective day, target object and version preconditions.

### 3. Persist the event before recalculation

Commands create immutable domain events/decision records. Use an idempotency key, correlation ID, optimistic concurrency (`If-Match`/version), validation, and a transactional outbox record.

### 4. Recalculate the minimum affected graph

First recalculate directly affected resource/day/order paths; then run a portfolio reconciliation when shared resources or commitment priorities create cross-case effects. Never return a partial result without a `calculationScope` and status.

### 5. Build daily future state

For each planning day in horizon: start from prior state, add approved receipts/capacity events, apply operation precedence, consume projected material, allocate capacity/manpower/cash, calculate WIP/progress, and emit shortage/overload/commitment impacts.

### 6. Run feasibility before optimization

Hard constraints must pass. Classify candidates as `FEASIBLE_NOW`, `FEASIBLE_CONDITIONAL`, `NOT_FEASIBLE`, or `RESOURCE_CRISIS` when no candidate can satisfy the hard constraints.

### 7. Generate alternatives and calculate opportunity cost

For every alternative, calculate resource injection, delivery impact, business value/objective value, conflict with other commitments, opportunity cost, assumptions, confidence and affected planning days.

### 8. Compare and approve

Persist all evaluated alternatives, not only the selected one. Record decision owner, approval chain, objective/rule version, rationale, expected impact and review date.

### 9. Commit and integrate

Approved future plan changes become a new immutable plan version. Write back only the SAP objects permitted by the integration contract and record external IDs, request/correlation IDs and acknowledgements.

### 10. Close the day

Freeze actuals, reconcile plan vs actual, capture variances, roll the planning horizon forward one day, and mark stale scenarios for rebase.

### 11. Learn under governance

Only publish lessons with evidence. A lesson may propose parameter changes; such changes become active only through an approved configuration/rule version.

## Implementation rules for AI coding agents

- Do not create new entities, statuses, event types, API paths, or SAP mappings unless the relevant reference is explicitly updated.
- Do not replace a defined relational field with free-form JSON merely for convenience.
- Do not use the SAP database directly.
- Do not mutate actual history.
- Do not treat `PCNF` or `CNF` as a numeric progress percentage unless an explicit configured progress rule exists.
- Do not treat `TECO` as an unconditional generic accounting action; follow the validated SAP settlement/actual-cost configuration.
- Do not call synthetic demonstration identifiers live MAPNA data.
- Do not let LLM output bypass deterministic constraint validation, approval or audit.
- Any assumption required to implement behavior must be added to `references/` as a governed assumption or to `references/28-adrs.md` as an ADR before code relies on it.

## Definition of Done

A feature is complete only when: API/schema contracts are updated; database migrations exist; state/event transitions are defined; authorization/audit are implemented; positive and negative tests exist; integration mappings are documented; observability is instrumented; idempotency/concurrency are tested; UI state clearly distinguishes actual vs plan vs scenario; and `scripts/validate_skill.py` passes.
