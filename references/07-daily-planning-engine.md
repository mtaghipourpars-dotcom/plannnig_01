# 12. Dynamic Daily Planning Engine

## 12.1 Engine responsibility

The Daily Planning Engine converts fact-anchored state plus known future events into a deterministic, daily-bucketed future plan. It must be incremental where possible: a localized resource change recalculates only affected products/orders/resources first, followed by a portfolio reconciliation pass when cross-case competition can change.

## 12.2 State transition

Figure 12-1 — Daily planning pseudo-code

For planning day D:

FactState(D) = all immutable actuals through D

FutureEvents(D+1..H) = approved future events

BasePlan(D+1..H) = previous baseline version or new generation

NextPlan = Replan(FactState, FutureEvents, MasterDataSnapshot, RulesVersion)

For each day t in D+1..H:

capacity\[t\] = calendar(t) - maintenance(t) - confirmed_losses(t)

supply\[t\] = on_hand(t-1) + receipts(t) - allocations(t)

demand\[t\] = explosion(BOM, routing, scheduled_operations)

constraints\[t\] = capacity\[t\], supply\[t\], manpower\[t\], cash\[t\], precedence\[t\]

schedule\[t\] = feasible_allocation(constraints\[t\], priorities, commitments)

state\[t\] = state\[t-1\] + receipts - consumption + execution_events

## 12.3 Daily planning algorithm

1\. Load immutable actuals up to planning cut-off.

2\. Load the latest approved baseline version.

3\. Load master-data snapshot and rule-set version effective for the horizon.

4\. Apply future confirmed events: receipts, maintenance, planned capacity, approved commitments and other hard constraints.

5\. Apply flexible decision variables from the baseline plan.

6\. Build remaining production workload from open production orders and operations.

7\. Time-phase material, capacity, manpower and cash requirements.

8\. Run constraint propagation from resource shortage to operation, order, product and commitment.

9\. Generate candidate reallocations or schedule changes within configured search limits.

10\. Calculate a feasible baseline; if infeasible, create a crisis record identifying the blocking set.

11\. Persist a complete plan version with calculation metadata and hashes.

12\. Publish resource requirement and risk read models to the UI.

## 12.4 Incremental recalculation rules

| **Change**                  | **Minimum recalculation scope**                                                 | **Escalation rule**                                              |
|-----------------------------|---------------------------------------------------------------------------------|------------------------------------------------------------------|
| One machine breakdown       | All operations assigned/eligible to machine; affected products and commitments  | Expand to competing work centers if reallocation occurs.         |
| One material receipt delay  | All future demand lines for material; downstream orders                         | Expand to products/commitments with critical dates.              |
| One product priority change | All resources competing with product; impacted products sharing those resources | Expand to entire portfolio if optimization is enabled.           |
| Cash injection              | Procurement/finance-blocked future actions within horizon                       | Expand if resource release changes machine/material competition. |
| New production order        | Order plus competing resource/material pools                                    | Portfolio reconciliation if it displaces existing work.          |
| Quality hold                | Held item and all dependent/consuming operations                                | Expand through parent product and commitment graph.              |
