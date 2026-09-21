# 26. DevOps, CI/CD and Release Management

git

\|

+--\> build -\> unit test -\> static analysis -\> dependency scan -\> container build

\|

+--\> contract test -\> integration test -\> performance smoke

\|

+--\> sign artifact -\> registry

\|

+--\> deploy DEV -\> TEST -\> UAT -\> PROD

Database: Flyway expand/contract migrations.

Config: versioned, environment-specific secrets externalized.

Deployment: Helm + GitOps promotion.

## 26.1 Branching

| **Branch**      | **Purpose**                        |
|-----------------|------------------------------------|
| main            | Release-ready code.                |
| feature/\*      | Short-lived development.           |
| release/\*      | UAT stabilization.                 |
| hotfix/\*       | Production fixes.                  |
| architecture/\* | ADR/reference implementation work. |

## 26.2 Quality gates

- Unit coverage target \>= 80% for domain/rule code.

- 100% contract coverage for SAP canonical messages.

- No critical/high known security vulnerabilities at release.

- Database migration forward and rollback/forward-compatibility test passed.

- Performance benchmark meets Section 28 target.

- Audit and authorization tests pass.
