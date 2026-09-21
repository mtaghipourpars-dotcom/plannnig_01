# 16. Execution, Actuals and Day-Close Cycle

## 16.1 Execution states

Production Order:

DRAFT -\> RELEASED -\> PARTIALLY_CONFIRMED -\> CONFIRMED -\> TECHNICALLY_COMPLETED -\> CLOSED

\|

+------------------------------\> CANCELLED

Planning Day:

OPEN -\> FROZEN -\> CLOSED

Scenario:

DRAFT -\> CALCULATING -\> CALCULATED -\> APPROVED -\> COMMITTED -\> ARCHIVED

\|

+-\> INFEASIBLE / STALE / REJECTED

## 16.2 Day-close algorithm

1\. Stop acceptance of unapproved edits to the closing day.

2\. Reconcile SAP/MES confirmations and material movements received before cut-off.

3\. Persist immutable actual events.

4\. Compute closing KPIs and forecast error seeds.

5\. Generate the next open planning day.

6\. Recalculate baseline future plan from the frozen actual state.

7\. Re-evaluate risks and create/refresh cases.

8\. Notify affected planners/managers.

## 16.3 Daily state-transition pseudocode

function advancePlanningDay(day):

actual = freezeAndLoadActualFacts(day)

baseline = loadOpenPlan(day)

futureInputs = loadEffectiveFutureEvents(day + 1, horizon)

state = deriveEnterpriseState(actual, baseline)

requirements = explodeRequirements(state, BOM, ROUTING)

capacity = projectCapacity(state, futureInputs, calendars, maintenance)

material = projectMaterials(state, requirements, receipts, allocations)

manpower = projectSkills(state, requirements, HRAvailability)

cash = projectCash(state, procurement, approvedInjections)

constraints = buildConstraints(capacity, material, manpower, cash, precedence, commitments)

plan = solveBaselinePlan(state, constraints, rulesVersion, modelVersion)

risks = detectRisks(plan, constraints)

persistPlanVersion(plan, risks)

emitDerivedEvents(plan, risks)

return plan

## 16.4 Same-day vs next-day event policy

| **Event class**                  | **Default effect**         | **Override allowed?** | **Rule**                                                                                                         |
|----------------------------------|----------------------------|-----------------------|------------------------------------------------------------------------------------------------------------------|
| Actual fact                      | Immediate fact update      | No                    | Persist as immutable actual event; impacts next open plan                                                        |
| Machine breakdown reported today | Next open planning day     | Yes                   | Same-day replanning only if configured and unused capacity can be reallocated without violating frozen execution |
| Future priority change           | Effective date specified   | Yes                   | Apply from effective planning day onward                                                                         |
| Future cash injection            | Effective date specified   | Yes                   | Available only from funding effective day                                                                        |
| New production order             | Future start date required | No for closed day     | Cannot create executable historical work                                                                         |

## 16.3 Actual-vs-plan rules

| **Metric**           | **Actual source**                  | **Plan source**                        | **Comparison**               |
|----------------------|------------------------------------|----------------------------------------|------------------------------|
| Operation progress   | Confirmed actuals                  | Planned work quantity/hours            | Completion variance          |
| Material consumption | Goods movements/actual consumption | Time-phased BOM demand                 | Quantity and timing variance |
| Machine time         | Confirmation/MES                   | Routing standard + calendar allocation | Load/efficiency variance     |
| Cost                 | FI/CO or approved actual-cost feed | Planned cost/cash requirement          | Cost variance                |
| Commitment date      | Delivery confirmation              | Forecast completion                    | Date variance                |
