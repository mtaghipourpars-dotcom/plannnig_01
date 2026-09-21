# 28. Testing Strategy and Test Cases

## 28.1 Test levels

- Unit: domain rules, equations, state transitions.

- Component: database repositories, engine modules.

- Contract: API and SAP message schemas.

- Integration: SAP/inbound/outbound/idempotency.

- Scenario: branch isolation and deterministic results.

- Performance: baseline planning and optimization throughput.

- Security: authentication, authorization, injection, secrets, audit.

- Recovery: failover, replay, restore, data consistency.

- UAT: business scenarios and decision workflows.

## 28.2 Functional test catalog

| **ID** | **Test**                    | **Expected result**                                                             |
|--------|-----------------------------|---------------------------------------------------------------------------------|
| FT-001 | Close day freezes actuals   | Actual event after close cannot modify closed day; compensating event required. |
| FT-002 | Create production order     | Valid product/routing creates plan item and demand.                             |
| FT-003 | Invalid product             | Order rejected with PRODUCT_NOT_PLANNABLE.                                      |
| FT-004 | Machine breakdown           | Future capacity reduced and impacted work recalculated.                         |
| FT-005 | Repair event                | Capacity restored from repair day onward.                                       |
| FT-006 | Material shortage forecast  | First negative balance day identified correctly.                                |
| FT-007 | Priority change             | Portfolio impact and opportunity cost visible.                                  |
| FT-008 | Cash injection              | Procurement-blocked demand becomes feasible only from effective day.            |
| FT-009 | Scenario fork isolation     | Scenario changes do not alter baseline.                                         |
| FT-010 | Scenario compare            | Deltas match independent recalculation.                                         |
| FT-011 | Feasibility hard constraint | Plan exceeding machine capacity marked infeasible.                              |
| FT-012 | Soft delivery constraint    | Late commitment receives penalty when allowed.                                  |
| FT-013 | RESOURCE_CRISIS             | No feasible plan yields crisis record.                                          |
| FT-014 | Optimization determinism    | Same input/model returns same result within defined solver tolerance.           |
| FT-015 | Stale scenario              | Base plan change marks scenario stale.                                          |
| FT-016 | Commit scenario             | Approved scenario publishes new baseline.                                       |
| FT-017 | Concurrent commit           | Second commit rejected due to version conflict.                                 |
| FT-018 | Actual confirmation         | Future plan after actual day recalculates without changing actual.              |
| FT-019 | Quality hold                | Downstream production blocked.                                                  |
| FT-020 | Lesson generation           | Forecast-vs-actual creates evidence and lesson draft.                           |
| FT-021 | Lesson rule approval        | Calibration change requires authorized approval.                                |
| FT-022 | Duplicate integration       | Duplicate SAP message is idempotent.                                            |
| FT-023 | Integration quarantine      | Schema-invalid message isolated.                                                |
| FT-024 | Permission boundary         | Planner cannot approve executive decision.                                      |
| FT-025 | Audit completeness          | Every business mutation creates audit trail.                                    |

## 28.3 Performance tests

| **PT** | **Scenario**           | **Target**                                                                                       |
|--------|------------------------|--------------------------------------------------------------------------------------------------|
| PT-001 | Current plan dashboard | p95 \<= 2 s for cached/read-model queries.                                                       |
| PT-002 | Incremental replan     | \<= 30 s for reference test dataset.                                                             |
| PT-003 | Full 90-day baseline   | \<= 180 s for reference test dataset.                                                            |
| PT-004 | Scenario branch        | \<= 180 s for reference test dataset.                                                            |
| PT-005 | Concurrent users       | 500 authenticated users with no error rate \> 1% during test.                                    |
| PT-006 | Event ingestion        | Sustain at least 100 events/s in benchmark environment with p95 \< 1 s ingestion acknowledgment. |

## 28.4 Security tests

- Expired token rejected.

- Wrong role denied.

- Cross-plant data denied.

- SQL/NoSQL injection payloads rejected/sanitized.

- SSRF and file upload controls tested.

- Sensitive data not present in logs.

- Audit events cannot be edited by business roles.

- Secret rotation without application code change.
