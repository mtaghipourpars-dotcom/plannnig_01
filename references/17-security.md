# 23. Security Architecture and Threat Model

## 23.1 Trust zones

| **Zone**          | **Assets**                  | **Control**                                              |
|-------------------|-----------------------------|----------------------------------------------------------|
| User zone         | Browsers/workstations       | SSO, MFA where corporate IdP supports, endpoint security |
| Presentation zone | Ingress/WAF                 | TLS, rate limiting, WAF, headers, bot controls           |
| Application zone  | APIs/planning workers       | Service identities, mTLS, least privilege                |
| Data zone         | DB/Kafka/Redis/object store | Network isolation, encryption, backup                    |
| Integration zone  | SAP adapters                | Allow-listed routes, connector, certificate auth         |
| Admin zone        | Ops tools                   | Privileged access, session recording where required      |

## 23.2 STRIDE controls

| **Threat**             | **Example**                         | **Control**                                         |
|------------------------|-------------------------------------|-----------------------------------------------------|
| Spoofing               | Fake user/service identity          | OIDC, mTLS, short-lived tokens                      |
| Tampering              | Plan or scenario altered            | RBAC/ABAC, optimistic concurrency, audit hashes     |
| Repudiation            | Decision denied later               | Immutable audit, approval evidence, correlation IDs |
| Information disclosure | Plan/costs exposed                  | Row-level authorization, TLS, encryption at rest    |
| Denial of service      | Calculation flood                   | Rate limits, job quotas, circuit breakers           |
| Elevation              | Planner performs executive approval | SoD roles and approval thresholds                   |

## 23.3 Authorization model

Use RBAC for coarse roles and ABAC for plant/organization/product-family scope. A user must satisfy both capability and scope. Example permission: DECISION_APPROVE plus scope=PLANT:PL01 and threshold \<= configured monetary limit. Executive decisions require a separate role and cannot be approved by the initiating user.
