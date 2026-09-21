# 27. Data Migration and Cutover

## 27.1 Migration stages

1\. Inventory source systems and data ownership.

2\. Extract SAP masters and historical transactional facts using approved APIs/extracts.

3\. Load staging tables without modifying target facts.

4\. Normalize keys and units of measure.

5\. Run referential and business-rule quality checks.

6\. Load master snapshot and historical fact events.

7\. Reconcile against SAP counts/totals.

8\. Dry-run plan calculation from migrated facts.

9\. Business sign-off.

10\. Cutover: freeze, final delta, reconcile, activate platform baseline.

## 27.2 Data quality gates

| **Check**               | **Blocking?**            | **Example**                                         |
|-------------------------|--------------------------|-----------------------------------------------------|
| Material key uniqueness | Yes                      | No duplicate material_no.                           |
| BOM completeness        | Yes for planned products | All required components resolve.                    |
| Routing completeness    | Yes for planned products | Every required operation maps to eligible capacity. |
| Calendar coverage       | Yes                      | Every horizon day has a calendar state.             |
| Stock reconciliation    | Yes                      | Snapshot matches source within approved tolerance.  |
| Production order status | Yes                      | Open orders mapped to known products.               |
