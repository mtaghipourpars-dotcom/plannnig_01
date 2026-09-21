# 34. Architecture Decision Records

| **ADR** | **Decision**              | **Rationale**                                                                                                                                                       |
|---------|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ADR-001 | Daily planning bucket     | Use one working day as minimum planning quantum. Enables operational planning without sub-day simulation complexity; matches user-defined minimum effect principle. |
| ADR-002 | Temporal immutability     | Closed-day facts are immutable; corrections are compensating events. Preserves auditability and forecast-vs-actual learning.                                        |
| ADR-003 | Scenario branch model     | Scenario stores deltas against a baseline plan version. Avoids duplicated datasets and keeps comparisons explainable.                                               |
| ADR-004 | Modular monolith first    | Deploy one application boundary with internal modules before extracting services. Reduces distributed-system complexity while preserving bounded contexts.          |
| ADR-005 | On-premise first          | Core planning and data remain operational without internet. Supports plant continuity and local control.                                                            |
| ADR-006 | SAP integration boundary  | No direct SAP DB access; use released APIs/events/IDocs and approved RFC exceptions. Protects upgradeability and integrity.                                         |
| ADR-007 | Feasibility gate          | No infeasible alternative reaches final selection. Separates technical possibility from management preference.                                                      |
| ADR-008 | Explainable optimization  | Store objective terms, constraints, solver metadata and alternative deltas. Builds planner trust and enables audit.                                                 |
| ADR-009 | AI boundary               | AI cannot directly mutate baseline or SAP. Prevents uncontrolled automation in mission-critical planning.                                                           |
| ADR-010 | Learning as configuration | Initial lessons influence rules via explicit approved calibration links. Provides controlled learning before opaque ML.                                             |
