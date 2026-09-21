# 2. Business Context and Domain Boundaries

## 2.1 Publicly verified business context

| **Domain**                         | **Verified context**                                                                                  | **Architecture implication**                                                                                   |
|------------------------------------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| Power generation equipment         | Hydro, thermal and wind generator products are stated on the official site.                           | Product-family model must support different BOM/routing structures and long lead-time resource profiles.       |
| Busduct                            | Power-plant busducts are explicitly stated as a product area.                                         | Discrete manufacturing flow must support non-generator product routings.                                       |
| Industrial / traction / mobility   | Industrial generators, traction motors, electric motors and electric-vehicle drive motors are stated. | Product model must not assume every product is a generator.                                                    |
| After-sales / specialized services | After-sales and specialized power services are explicitly stated.                                     | Service-order and installed-base concepts are included as configurable domain modules.                         |
| Technology transfer / engineering  | Website describes technology-transfer and improvement work.                                           | Engineering revision and controlled configuration management are first-class master data.                      |
| International business             | Exports to Syria, Iraq and Tajikistan are stated.                                                     | Delivery commitment model must support export logistics, country-specific milestones and long lead-time risks. |

## 2.2 Internal-domain assumptions required for implementation

The following are architectural assumptions rather than public claims: discrete production orders form the execution bridge; BOM and routing determine material and capacity demand; operation confirmations form the minimum execution evidence; daily planning uses time buckets of one day; resource bottlenecks can be machines, material, manpower or cash; multiple commitments may compete for the same scarce resource; and management may change priorities or inject resources. These assumptions are encoded as configurable rules so the platform can be validated against internal PARS policy during implementation.

## 2.3 Domain boundaries

| **Domain**          | **Owned by platform**                                   | **Referenced from SAP / external**                                           | **Notes**                                                  |
|---------------------|---------------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------|
| Commitment          | Commitment risk, forecast and decision views            | Sales orders, project milestones, customer data                              | No duplicate commercial master unless explicitly approved. |
| Product engineering | Scenario-facing product configuration/version reference | Material, BOM, routing, engineering documents                                | Platform stores planning snapshot/version references.      |
| Production          | Dynamic plan, scenario schedule, allocation             | Production orders, operations, confirmations                                 | SAP remains transaction system of record.                  |
| Resources           | Future state, capacity overlays, scenario allocations   | Work center/master calendars, inventory, HR availability, maintenance status | Dynamic event stream is platform-owned.                    |
| Finance             | Planning cash constraints/injections and impact         | Actual FI/CO balances and postings                                           | Planning finance is not ledger accounting.                 |
| Learning            | Lessons, patterns, calibration links                    | Actual outcome evidence                                                      | Platform-owned.                                            |
| Integration         | Canonical event log and message status                  | SAP/other endpoints                                                          | Platform-owned integration audit.                          |
