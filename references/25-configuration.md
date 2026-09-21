# 31. Configuration, Rules and Reference Data

## 31.1 Configurable rule families

| **Rule family**  | **Examples**                                              | **Versioned?** | **Approval**           |
|------------------|-----------------------------------------------------------|----------------|------------------------|
| Priority         | Priority 1..N; escalation threshold                       | Yes            | Planning governance    |
| Commitment class | Hard/soft due date, penalty policy                        | Yes            | Executive governance   |
| Capacity         | Calendar, efficiency, downtime policy                     | Yes            | Production/Maintenance |
| Material         | Safety stock, alternative material policy, shortage class | Yes            | Supply/Engineering     |
| Manpower         | Skills, overtime limits                                   | Yes            | HR/Production          |
| Cash             | Budget and approval threshold                             | Yes            | Finance                |
| Optimization     | Objective weights, solver limits                          | Yes            | Planning governance    |
| Confidence       | Meaning and usage of HIGH/MEDIUM/LOW                      | Yes            | Planning governance    |
| Learning         | Calibration rules and evidence thresholds                 | Yes            | Planning governance    |
