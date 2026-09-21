# Appendix A. Canonical Event Catalog

| **Event**                         | **Time class**        | **Target**       | **Effect**                                       |
|-----------------------------------|-----------------------|------------------|--------------------------------------------------|
| PRODUCTION_ORDER_CREATED          | Future                | production_order | Creates future workload.                         |
| PRODUCTION_ORDER_PRIORITY_CHANGED | Future                | production_order | Changes competition priority from effective day. |
| MACHINE_BREAKDOWN                 | Future/Actual trigger | work_center      | Removes capacity from effective day.             |
| MACHINE_REPAIRED                  | Future                | work_center      | Restores capacity from effective day.            |
| MATERIAL_RECEIPT_CONFIRMED        | Future/Actual         | material         | Adds supply to daily stock projection.           |
| MATERIAL_RECEIPT_DELAYED          | Future                | material receipt | Shifts supply date.                              |
| MATERIAL_SHORTAGE_DETECTED        | Derived               | material         | Raised by forecast engine.                       |
| CASH_INJECTED                     | Future                | cash bucket      | Adds future available cash.                      |
| QUALITY_HOLD_CREATED              | Future/Actual         | product/order    | Blocks affected operation path.                  |
| QUALITY_HOLD_RELEASED             | Future                | product/order    | Removes block.                                   |
| COMMITMENT_PRIORITY_CHANGED       | Future                | commitment       | Changes objective weight/priority.               |
| COMMITMENT_DUE_DATE_CHANGED       | Future                | commitment       | Changes hard/soft deadline.                      |
| MANPOWER_CAPACITY_CHANGED         | Future                | skill/resource   | Changes skill capacity.                          |
| PLAN_RECALCULATED                 | Derived               | plan             | New plan version generated.                      |
| SCENARIO_CREATED                  | Command               | scenario         | Creates branch.                                  |
| SCENARIO_CALCULATED               | Derived               | scenario         | Scenario result stored.                          |
| DECISION_APPROVED                 | Command               | decision         | Authorizes alternative.                          |
| PLAN_COMMITTED                    | Command               | plan             | Publishes selected plan.                         |
| ACTUAL_OPERATION_CONFIRMED        | Actual                | operation        | Immutable execution fact.                        |
| ACTUAL_MATERIAL_CONSUMED          | Actual                | material/order   | Immutable consumption fact.                      |
| ACTUAL_COST_POSTED                | Actual                | cost object      | Immutable financial fact.                        |
| LESSON_PUBLISHED                  | Derived               | lesson           | Makes lesson reusable.                           |


---

# Appendix B. API Error Catalog

| **Code** | **Error**              | **Meaning**                                          | **Resolution**                                        |
|----------|------------------------|------------------------------------------------------|-------------------------------------------------------|
| PLN-001  | PLAN_STALE             | Base plan changed since scenario was created.        | Rebase and recalculate.                               |
| PLN-002  | NO_FEASIBLE_PLAN       | All candidates violate at least one hard constraint. | Review RESOURCE_CRISIS interventions.                 |
| PLN-003  | RULE_VERSION_MISSING   | No effective rule set for planning date.             | Activate approved rule version.                       |
| PLN-004  | MASTER_DATA_INCOMPLETE | Required material/BOM/routing/calendar missing.      | Correct MDM data.                                     |
| INT-001  | DUPLICATE_MESSAGE      | Same source message already processed.               | No action; idempotent acknowledgement.                |
| INT-002  | SCHEMA_INVALID         | Message does not match contract.                     | Quarantine and correct source.                        |
| INT-003  | SOURCE_UNAVAILABLE     | Upstream endpoint unavailable.                       | Retry; use stale-state warning.                       |
| AUTH-001 | FORBIDDEN              | Actor lacks required permission/scope.               | Escalate to authorized role.                          |
| VAL-001  | INVALID_EFFECTIVE_DATE | Future event falls into closed/invalid day.          | Choose next open day or compensating correction flow. |


---

# Appendix C. Source Register

| **ID** | **Source**                                            | **URL**                                                                                                                     | **Usage**                                                                                                                                     |
|--------|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| SRC-01 | MAPNA Generator official homepage                     | https://mapnagenerator.com/                                                                                                 | Company overview, product/capability statements, contact and current site context.                                                            |
| SRC-02 | MAPNA Generator official About/Intro page             | https://mapnagenerator.com/Fa/Intro                                                                                         | History, thermal/hydro generator capacities, busduct, wind, industrial/traction/electric products, after-sales/services and export statement. |
| SRC-03 | MAPNA Generator official Achievements page            | https://mapnagenerator.com/Fa/Achivements                                                                                   | Stated installed-generation contribution and engineering improvement examples; note site numerical inconsistency.                             |
| SRC-04 | SAP Help — SAP Integration Suite / Cloud Integration  | https://help.sap.com/docs/integration-suite/sap-integration-suite/ci                                                        | Integration Suite supports process integration across cloud and on-premise landscapes.                                                        |
| SRC-05 | SAP Help — Cloud Connector for on-premise integration | https://help.sap.com/docs/integration-suite/sap-integration-suite/using-sap-cloud-connector-with-cloud-integration-adapters | Controlled access from SAP BTP integration to on-premise systems.                                                                             |
| SRC-06 | Spring Boot system requirements                       | https://docs.spring.io/spring-boot/system-requirements.html                                                                 | Current stable Spring Boot system requirements; Java 17+ minimum for Spring Boot 4.1.1.                                                       |
| SRC-07 | PostgreSQL 17 documentation                           | https://www.postgresql.org/docs/17/                                                                                         | PostgreSQL 17 architecture, declarative partitioning and operational features.                                                                |
| SRC-06 | PostgreSQL 17 documentation                           | https://www.postgresql.org/docs/17/ddl.html                                                                                 | Declarative partitioning and relational data-definition capabilities.                                                                         |
| SRC-07 | Spring Boot system requirements                       | https://docs.spring.io/spring-boot/system-requirements.html                                                                 | Current Spring Boot platform/runtime compatibility reference used for stack baseline.                                                         |
