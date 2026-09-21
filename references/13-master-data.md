# 19. Master Data Management and Governance

| **Entity**           | **Content**                                                   | **Primary system**                         | **Owner**                    |
|----------------------|---------------------------------------------------------------|--------------------------------------------|------------------------------|
| Organization         | Plant, planning area, storage location, work center hierarchy | SAP / platform reference                   | Enterprise Architecture / PP |
| Material/Product     | Material, product family, unit, criticality                   | SAP Material Master                        | MM/PP                        |
| BOM                  | BOM versions/items/effectivity                                | SAP BOM                                    | Engineering/PP               |
| Routing              | Routing/operations/work centers/standard values               | SAP task list/routing                      | Engineering/PP               |
| Work center          | Capacity, machine class, eligible alternatives                | SAP Work Center + platform dynamic overlay | Production/Maintenance       |
| Calendar/shift       | Working days, shifts, holidays                                | SAP/calendar + platform planning calendar  | HR/Production                |
| Resource skill       | Skill/certification matrix                                    | HR/competency source                       | HR/Production                |
| Customer/partner     | Business partner/customer                                     | SAP BP                                     | Sales                        |
| Supplier             | Business partner/supplier                                     | SAP BP                                     | Procurement                  |
| Commitment class     | Priority, penalty, due-date criticality                       | Platform configuration                     | Executive governance         |
| Planning rule        | Constraints/objective weights                                 | Platform configuration                     | Planning governance          |
| Confidence class     | HIGH/MEDIUM/LOW meaning                                       | Platform configuration                     | Planning governance          |
| Engineering revision | Revision, validity, release status                            | PLM/DMS/SAP document references            | Engineering                  |

## 19.1 MDM lifecycle

DRAFT -\> VALIDATED -\> APPROVED -\> EFFECTIVE -\> SUPERSEDED -\> RETIRED

No planning calculation may use RETIRED or unapproved master records.

Every planning calculation stores the effective master-data snapshot/version used.
