# 10. End-to-End Business Processes

| **ID** | **Process**                         | **E2E map**                                                                                                    |
|--------|-------------------------------------|----------------------------------------------------------------------------------------------------------------|
| P01    | Demand/Commitment to Plan           | Commitment -\> product -\> production flow -\> resource requirements -\> baseline plan -\> risk forecast       |
| P02    | Engineering to Production Readiness | Engineering revision -\> BOM/routing release -\> planning snapshot -\> order readiness                         |
| P03    | Plan to Produce                     | Planned order/production order -\> release -\> operation execution -\> confirmations -\> actual consumption    |
| P04    | Procure to Availability             | Material shortage -\> supply action -\> purchase/receipt forecast -\> stock projection -\> production impact   |
| P05    | Machine Availability                | Maintenance/breakdown -\> capacity state -\> affected operations -\> replan -\> repair confirmation -\> replan |
| P06    | Daily Rolling Planning              | Close actuals -\> rebuild future state -\> resource forecast -\> risks -\> alternatives -\> commit next plan   |
| P07    | Scenario / What-if                  | Fork baseline -\> inject future event(s) -\> recalculate -\> feasibility -\> optimization -\> compare          |
| P08    | Management Decision                 | Escalation -\> alternatives -\> approval -\> commit selected plan -\> distribute actions                       |
| P09    | Quality Constraint                  | Quality hold -\> block operation/product -\> propagate impact -\> disposition -\> resume/replan                |
| P10    | Delivery and After-sales            | Product completion -\> delivery -\> installed base/service case -\> service execution -\> lesson evidence      |

## 10.1 BPMN-style daily process

Figure 10-1 — Daily rolling planning BPMN-style flow

START

-\> Ingest actual events

-\> Validate event completeness

-\> Freeze prior day

-\> Build fact-anchored current state

-\> Generate/refresh baseline forecast

-\> Check material/capacity/manpower/cash constraints

-\> If risk found: create risk case

-\> Generate feasible alternatives

-\> If no feasible alternative: RESOURCE_CRISIS

-\> Otherwise optionally optimize

-\> Management approval where threshold requires

-\> Commit next baseline plan

-\> Publish work/resource requirements

-\> Execute

-\> Collect actuals

-\> END OF DAY

-\> repeat
