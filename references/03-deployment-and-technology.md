# 6. Physical / Deployment Architecture

Figure 6-1 — Reference deployment

\[Corporate Users / Plant LAN\]

\|

\[Ingress / WAF / Load Balancer\]

\|

\[Kubernetes / OpenShift cluster\]

\| \| \|

\[Web\] \[App/API\] \[Planning/Optimization Workers\]

\| \| \|

+-------+--------+

\|

\[Kafka / Event Bus\]

\|

+-------+---------+-------------------+

\| \| \|

\[PostgreSQL HA\] \[Redis HA\] \[Object Storage\]

\|

\[Backup / DR Site\]

SAP S/4HANA On-Premise \<--\> \[Integration Gateway\] \<--\> \[Platform\]

External BTP/SAP Integration Suite is optional and may be inserted via Cloud Connector.

## 6.1 Reference node set

| **Layer**                | **Reference deployment**                | **Minimum HA pattern**                 | **Sizing note**                                     |
|--------------------------|-----------------------------------------|----------------------------------------|-----------------------------------------------------|
| Ingress                  | 2 reverse-proxy/load-balancer instances | Active/standby or external ADC         | TLS termination and WAF policy.                     |
| Kubernetes control plane | 3 nodes                                 | 3-node quorum                          | Use organization-standard K8s distribution.         |
| Application workers      | 3+ nodes                                | N+1                                    | Horizontal scaling; stateless services.             |
| Planning workers         | 3+ worker pods                          | N+1                                    | CPU-heavy; scale horizontally by optimization jobs. |
| Kafka                    | 3 brokers                               | Quorum                                 | Replication factor 3 for production.                |
| PostgreSQL               | 3 nodes                                 | Primary + 2 replicas                   | Patroni or equivalent HA manager.                   |
| Redis                    | 3 nodes                                 | HA/sentinel or cluster                 | Cache only; never sole source of truth.             |
| Object storage           | 4+ drives/nodes                         | Erasure-coded or enterprise equivalent | Attachments, exports, snapshots.                    |
| Observability            | 3 nodes/pods                            | HA                                     | Metrics, traces, logs and alerts.                   |

| **DEPLOYMENT RULE:** The exact hardware size must be calibrated by the performance test suite defined in Section 28. The architecture specifies minimum topology, not unverified production throughput. |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|


---

# 7. Technology Stack and Engineering Standards

| **Area**              | **Technology**                                                  | **Rationale**                                                                                             |
|-----------------------|-----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| Frontend              | React + TypeScript + Vite + enterprise component library        | Strong data-grid/chart ecosystem, maintainability, RTL support, mobile web.                               |
| Backend               | Java 21 LTS + Spring Boot 4.1.x + Spring Security + Spring Data | Enterprise integration ecosystem, strong typing, SAP-adjacent integration patterns, mature observability. |
| Planning/optimization | Java OR-Tools CP-SAT as default; optional MILP solver adapter   | Deterministic constraint solving; vendor-neutral adapter boundary.                                        |
| Database              | PostgreSQL 17                                                   | Strong transactional semantics, JSONB, partitioning and mature tooling.                                   |
| Event bus             | Apache Kafka-compatible platform                                | Durable asynchronous integration, replay and decoupling.                                                  |
| Cache                 | Redis 7+                                                        | Low-latency cache, distributed locks only with care.                                                      |
| Object storage        | S3-compatible on-prem object store                              | Large attachments, exports, scenario artifacts.                                                           |
| Identity              | OIDC/OAuth2 provider (Keycloak or enterprise IdP)               | Central authentication and federated roles.                                                               |
| Workflow              | BPMN workflow engine (Flowable recommended)                     | Human approvals and long-running business processes.                                                      |
| Observability         | OpenTelemetry + Prometheus + Grafana + Loki/OpenSearch          | Unified metrics/traces/logs.                                                                              |
| Containers            | Kubernetes/OpenShift + Helm                                     | Portable on-prem deployment and controlled scaling.                                                       |
| CI/CD                 | GitLab CI or equivalent + artifact registry + GitOps            | Traceable builds, signed artifacts, environment promotion.                                                |
| API specification     | OpenAPI 3.1                                                     | Machine-readable contracts and code generation.                                                           |
| Schema migration      | Flyway                                                          | Version-controlled DB migration.                                                                          |

## 7.1 Engineering patterns

- Hexagonal architecture inside each domain module.

- Domain commands and events must not depend on controller or database classes.

- All external identifiers are stored alongside internal UUIDs.

- All mutating APIs require idempotency keys.

- Use optimistic concurrency for plan and scenario commits.

- No business logic in database triggers except invariant enforcement that cannot safely exist in application code.

- No distributed transaction across SAP and local database; use outbox/inbox and compensating actions.
