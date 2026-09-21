# 25. Availability, Disaster Recovery and Business Continuity

| **Requirement**          | **Target**                | **Design**                                            |
|--------------------------|---------------------------|-------------------------------------------------------|
| Application availability | 99.9% monthly             | N+1 app pods/nodes; rolling deploys                   |
| Planning data RPO        | \<= 15 minutes            | Synchronous DB replica where feasible + WAL archiving |
| Planning data RTO        | \<= 2 hours               | Automated restore/runbook + standby DB                |
| Message durability       | No lost committed events  | Kafka replication + persistent DB inbox/outbox        |
| Site failure             | Restore at secondary site | Replicated backups and IaC rebuild                    |
| Backup test              | Quarterly                 | Automated restore verification                        |

## 25.1 Business continuity modes

- Normal mode: SAP/MES feeds plus dynamic planning.

- Degraded mode: last-known facts plus manual event entry; integration freshness clearly shown.

- Offline contingency: read-only last-known plan export plus controlled manual planning worksheet; no false claim of real-time synchronization.

- Recovery mode: replay integration inbox from last durable point and regenerate plan version.
