# 3. Architecture Principles and Non-Negotiable Rules

| **ID** | **Principle**                    | **Mandatory rule**                                                                                                        |
|--------|----------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| P01    | Past is Fact                     | Closed planning-day actuals are immutable. Corrections use compensating events.                                           |
| P02    | Future is Plan                   | Future allocations are versioned, recalculable and branchable.                                                            |
| P03    | Daily Time Quantum               | The default planning time bucket is one calendar working day.                                                             |
| P04    | State + Event + Time             | The model is defined by temporal state and typed events, not static master-data joins.                                    |
| P05    | Every Change Has Impact          | Any material planning event must be propagated through dependencies to resources and commitments.                         |
| P06    | Scenario Is a Branch             | Scenarios fork from a current plan version and store only the delta/override events.                                      |
| P07    | Feasibility Before Preference    | Infeasible alternatives are not selectable; optimization operates only on feasible plans.                                 |
| P08    | Resource Competition Is Explicit | Shared resources and opportunity cost must be visible.                                                                    |
| P09    | SAP Is Not Rebuilt               | ERP master/transaction processing remains in SAP; the platform adds dynamic planning and decision capabilities.           |
| P10    | No Direct SAP DB Access          | Only approved released APIs/events/IDocs/RFCs through the integration boundary are permitted.                             |
| P11    | Deterministic Baseline           | Same inputs and same rule/model version must produce the same baseline plan unless stochastic mode is explicitly enabled. |
| P12    | Explainable Decisions            | Every plan and scenario must expose constraints, assumptions, affected objects and calculated impacts.                    |
| P13    | AI Is Advisory                   | AI may explain/recommend/draft but deterministic engines and approval workflows control the committed plan.               |
| P14    | On-Premise Continuity            | Core planning must operate without mandatory public-internet availability.                                                |
| P15    | Everything Versioned             | Master-data references, rules, plans, scenarios, decisions and model parameters are versioned.                            |
