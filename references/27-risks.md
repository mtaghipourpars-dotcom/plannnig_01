# 33. Risks, Constraints, Assumptions and Mitigations

| **ID** | **Risk**                                             | **Severity** | **Mitigation**                                                      |
|--------|------------------------------------------------------|--------------|---------------------------------------------------------------------|
| R01    | Internal SAP APIs/configuration differ from expected | High         | API discovery pack + release-specific contract test before build.   |
| R02    | Poor master-data quality                             | High         | Data-quality gate and quarantine; no planning on unresolved master. |
| R03    | Planner distrust of optimization                     | High         | Explainable alternatives; show constraints and objective terms.     |
| R04    | Solver runtime too high                              | Medium       | Incremental replan, decomposition, time limits, warm starts.        |
| R05    | Conflicting calendars across sources                 | Medium       | Single planning calendar authority + reconciliation.                |
| R06    | Overuse of scenarios creates stale branches          | Medium       | Automatic stale detection and rebase workflow.                      |
| R07    | Integration outage                                   | High         | Last-known-state mode, freshness indicators, replayable inbox.      |
| R08    | False precision in forecast                          | High         | Confidence labels and evidence requirements.                        |
| R09    | Direct SAP write-back causes mismatch                | High         | Commit protocol + idempotent commands + reconciliation.             |
| R10    | AI recommendations bypass governance                 | High         | AI is advisory; typed APIs + approvals mandatory.                   |
| R11    | Production data volume grows unexpectedly            | Medium       | Partitioning, archive strategy, benchmark thresholds.               |
| R12    | Business rules are changed informally                | High         | Versioned config + approval + effective dating.                     |

## 33.1 Assumptions

- SAP remains authoritative for SAP-owned master/transactional facts.

- Production planning can be represented in one-day buckets for the initial product.

- Internal users can identify ownership for machine, material, manpower and cash data.

- Management approval thresholds can be expressed numerically and versioned.

- Internal interfaces needed for MES/SCADA/Primavera can be supplied as governed contracts.
