# 14. Feasibility and Optimization Engine

## 14.1 Feasibility gate

Feasibility is a hard gate, not a score. An alternative is feasible only if all mandatory constraints are satisfied for every day of the scenario horizon. Soft constraints may be violated only when explicitly configured with a penalty and approval policy.

| **Constraint class**  | **Hard/soft**                    | **Example test**                                            |
|-----------------------|----------------------------------|-------------------------------------------------------------|
| Material availability | Hard by default                  | Projected available \>= required quantity on consuming day. |
| Capacity              | Hard by default                  | Allocated hours \<= available hours for work center/day.    |
| Operation precedence  | Hard                             | Start(op2) \>= finish(op1) + lead/transfer time.            |
| Calendar              | Hard                             | Operation uses working capacity only.                       |
| Quality block         | Hard                             | Held lot/product cannot be consumed/processed.              |
| Manpower skill        | Hard by default                  | Required skill count available on day.                      |
| Cash                  | Configurable                     | Cumulative cash requirement \<= approved available cash.    |
| Delivery due date     | Soft or hard by commitment class | Penalty if commitment class permits slippage.               |
| Strategic priority    | Objective/constraint             | Used through configured priority weight or threshold.       |

## 14.2 Optimization objective model

Objective = w1\*BusinessValue + w2\*OnTimeDelivery + w3\*CashEfficiency

\+ w4\*CapacityStability + w5\*RiskReduction

\- w6\*ResourceInjection - w7\*OpportunityCost - w8\*Penalty

Weights are configuration for the decision context, not embedded business truth.

The engine must output the complete weighted terms so management can see why alternatives differ.

## 14.3 No-solution behavior

If no feasible solution exists within configured search limits, the engine emits RESOURCE_CRISIS. The crisis record must list the minimum blocking constraints, affected commitments, earliest failure date and the classes of intervention capable of changing feasibility (capacity, material, manpower, cash, sequence, outsourcing, or commitment change).

## 14.3 Optimization variable model

The reference formulation is a time-bucketed mixed-integer/linear model. A production implementation may use OR-Tools, Gurobi, CPLEX or another approved solver; the API contract must remain solver-neutral.

Decision variables

-----------------

x\[o,r,t\] = 1 if operation o is assigned to resource r on day t

y\[o,t\] = executable quantity/hours of operation o on day t

z\[p,t\] = 1 if product/commitment p is completed by day t

i\[r,t\] = injected capacity/resource amount on day t

Core constraints

----------------

1\. Assignment: sum_r x\[o,r,t\] \<= 1

2\. Capacity: sum_o demand\[o,r,t\] \<= capacity\[r,t\] + i\[r,t\]

3\. Material balance: opening\[m,t\] + receipts\[m,t\] - demand\[m,t\] \>= safety\[m,t\]

4\. Precedence: start\[o+1\] \>= finish\[o\] for every routing predecessor

5\. Quantity: cumulative y\[o,t\] \<= required_quantity\[o\]

6\. Commitment: completion\[p\] \<= due_date\[p\] for on-time target cases

7\. Skill: assigned skill-hours \<= available certified skill-hours

8\. Cash: cumulative planned cash use \<= available cash + approved injection

9\. Frozen facts: no decision variable may modify closed-day actuals

Minimum-injection objective example

-----------------------------------

Minimize Sum(i\[r,t\] \* unit_cost\[r,t\])

subject to all hard constraints and configured on-time / quality targets.

Value objective example

------------------------

Maximize business_value(completions)

\- delay_penalties

\- injection_cost

\- opportunity_cost

The engine may support lexicographic objectives or weighted objectives, but the selected objective, weights and constraint set must be persisted in optimization_run and decision records.

## 14.4 Determinism and solver governance

- Persist solver name, solver version, model version, rule-set version, input state hash and random seed where applicable.

- For regulated/decision-critical runs, require deterministic mode and a maximum acceptable solver gap.

- If the solver terminates early, status must be FEASIBLE_BEST_FOUND, not OPTIMAL.

- Never present a mathematical optimum as a business-optimal decision unless all governed constraints and objective weights are included.

- A solver failure does not imply a feasible plan; return CALCULATION_FAILED and preserve the run evidence.


---

# 15. Resource Allocation and Opportunity-Cost Model

## 15.1 Resource types

| **Resource**        | **Examples**                         | **State dimension**          | **Typical constraint** |
|---------------------|--------------------------------------|------------------------------|------------------------|
| Machine/work center | CNC, VPI, winding, assembly/test     | available hours by day       | Capacity               |
| Material            | Copper, insulation, steel, mica tape | quantity by day/lot          | Stock and receipts     |
| Manpower            | Technician, welder, test engineer    | headcount/skill-hours by day | Skill capacity         |
| Cash                | Working capital, procurement budget  | available cash by day        | Funding                |
| Energy              | Power availability                   | hours/energy window by day   | Utility limit          |
| Supplier            | Supplier capacity/ETA                | promise date/quantity        | Lead time              |
| Quality capacity    | Inspection/test capability           | hours/slots by day           | Test bottleneck        |

## 15.2 Opportunity cost

When a scarce resource is allocated to Product A, the engine computes the marginal impact on Products B..N that could otherwise consume the same capacity. Opportunity cost is represented in operational units (days/hours), commercial units where governed data exists, and resource-injection alternatives. It is never hidden inside an aggregate score only.

OpportunityCost(resource R, scenario S) =

Sum(impact_on_displaced_commitments)

\+ Sum(additional_resource_requirements_for_displaced_work)

\+ penalties(configured for displaced commitments)
