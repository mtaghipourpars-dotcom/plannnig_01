# 24. Logging, Monitoring and Observability

| **Signal**           | **Must capture**                                                                   | **Retention target**               |
|----------------------|------------------------------------------------------------------------------------|------------------------------------|
| Application logs     | timestamp, level, service, request_id, correlation_id, actor, error code, duration | 90 days online; archive per policy |
| Audit log            | who/what/when/object/before-after hashes/decision evidence                         | 7 years target, configurable       |
| Metrics              | API latency, job duration, plan calc time, Kafka lag, DB health, resource usage    | 13 months summarized               |
| Traces               | cross-service trace/span IDs                                                       | 30 days                            |
| Integration messages | message IDs, source, type, status, retry count                                     | 1 year or business retention       |
| Planning engine      | input version, output hash, runtime, solver status, gap                            | 7 years for decision-critical runs |

## 24.1 Critical alerts

- Planning calculation failure or timeout beyond SLA.

- Stale SAP/MES feed beyond configured freshness threshold.

- Duplicate or high-volume integration failures.

- Resource crisis for critical commitment class.

- Database replication lag or failover.

- Optimization solver gap above configured threshold.

- Unauthorized approval attempt.

- Audit-log write failure.
