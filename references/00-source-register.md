# Source Register and Evidence Boundaries

## MAPNA PARS business context

- SRC-MAPNA-01 — MAPNA Generator official homepage: https://mapnagenerator.com/
  - Use: company overview, stated capabilities, product families, current site context.
- SRC-MAPNA-02 — MAPNA Generator official introduction: https://mapnagenerator.com/Fa/Intro
  - Use: history, thermal/hydro generator capacity statements, busducts, wind turbines, industrial/traction/electric products, after-sales and services, export statements.
- SRC-MAPNA-03 — MAPNA Generator official achievements: https://mapnagenerator.com/Fa/Achivements
  - Use: public achievements and engineering improvement examples. The page contains a numeric inconsistency; architecture does not hard-code the disputed KPI.

## Agent Skills Specification

- SRC-SKILL-01 — Agent Skills Specification: https://agentskills.io/specification
  - Mandatory rules applied by this package: SKILL.md + YAML frontmatter; `name` naming constraints; description requirement; relative file references; progressive disclosure; recommended SKILL.md size; optional scripts/references/assets layout; validation guidance.

## SAP integration evidence

- SRC-SAP-01 — SAP APIs on Business Accelerator Hub: https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2628c891a3a04f05a293c7ca5d23e4b6/1e60f14bdc224c2c975c8fa8bcfd7f3f.html
- SRC-SAP-02 — SAP Cloud Connector for S/4HANA on-premise connectivity: https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/738a456365c0414faba6426d05fd8674/78931da97cb34bb6b6b81bbdf1253dfd.html
- SRC-SAP-03 — SAP Integration Suite on-premise connectivity guidance: https://help.sap.com/docs/integration-suite/sap-integration-suite/outbound-on-premise-reverse-proxy-or-sap-cloud-connector
- SRC-SAP-04 — SAP Event Mesh overview: https://help.sap.com/docs/event-mesh/event-mesh/set-up-sap-event-mesh-in-btp-cockpit
- SRC-SAP-05 — SAP Production Order API example (protocol/service details are release-specific and must be verified in the target S/4HANA release): https://help.sap.com/docs/SAP_S4HANA_CLOUD/d35113ee62644d3abee1aaec148291d9/0a4262096d2e43258df27c594bdd1468.html

## Engineering references

- Spring Boot system requirements: https://docs.spring.io/spring-boot/system-requirements.html
- PostgreSQL documentation: https://www.postgresql.org/docs/

## Evidence boundary

Public web content is used only to establish externally verifiable MAPNA PARS context. Internal machine identifiers, SAP customizing, routings, production volumes, stock, customer commitments, prices, maintenance calendars, workforce assignments, and supplier lead times are NOT inferred from public content. Such values are modeled as governed master/configuration data and must be loaded from authoritative enterprise sources during implementation.
