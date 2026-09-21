# 22. SAP S/4HANA Integration Architecture

## 22.1 Integration principle

The preferred pattern is SAP released APIs for request/response, events/IDocs for asynchronous changes, and RFC only when a released API is not available and an integration architecture exception is approved. SAP Integration Suite/Cloud Integration may be used as the managed integration layer in hybrid deployments; SAP documentation confirms it supports cloud-to-on-premise and hybrid integration, and SAP Cloud Connector can provide controlled on-premise access without opening inbound ports. \[SRC-04\]\[SRC-05\]

## 22.2 Recommended integration matrix

| **Object**              | **Direction**        | **Preferred pattern**                                  | **Fallback**         | **Frequency**                         |
|-------------------------|----------------------|--------------------------------------------------------|----------------------|---------------------------------------|
| Material master         | SAP -\> Platform     | Released OData/API                                     | IDoc                 | Initial + delta                       |
| BOM                     | SAP -\> Platform     | Released API / IDoc                                    | RFC exception        | Initial + release/delta               |
| Routing/work center     | SAP -\> Platform     | Released API                                           | RFC exception        | Initial + delta                       |
| Production orders       | SAP \<-\> Platform   | OData/API + async event                                | IDoc/RFC exception   | Near real-time + batch reconciliation |
| Operation confirmations | SAP/MES -\> Platform | Event/IDoc/API                                         | Batch file           | Near real-time/batch                  |
| Inventory stock         | SAP -\> Platform     | API/query + periodic snapshot                          | IDoc                 | Near real-time + daily reconciliation |
| Purchasing/receipts     | SAP -\> Platform     | API/event                                              | IDoc                 | Near real-time                        |
| Actual cost             | SAP -\> Platform     | API/extract                                            | Batch                | Daily/periodic                        |
| Business partner        | SAP -\> Platform     | BP API                                                 | IDoc                 | Initial + delta                       |
| Quality hold            | SAP -\> Platform     | Quality API/event                                      | IDoc                 | Near real-time                        |
| Maintenance status      | SAP -\> Platform     | PM API/event/MES                                       | IDoc                 | Near real-time                        |
| Plan write-back         | Platform -\> SAP     | Released production planning/order API where supported | Approved RFC wrapper | On commit                             |

## 22.2A SAP master/transaction mapping baseline

| **Platform object**                    | **SAP semantic object**                                           | **Ownership**      | **Read/write rule**                                          |
|----------------------------------------|-------------------------------------------------------------------|--------------------|--------------------------------------------------------------|
| Material                               | Material Master / relevant released material API                  | SAP MM             | SAP -\> Platform; platform never authors SAP material master |
| Business Partner / Customer / Supplier | Business Partner                                                  | SAP                | SAP -\> Platform                                             |
| BOM                                    | BOM / production or engineering BOM according to configured use   | SAP PP/Engineering | SAP -\> Platform; planning snapshot is versioned             |
| Routing / Operation                    | Task list / routing / operation                                   | SAP PP             | SAP -\> Platform                                             |
| Work Center / Capacity                 | Work center + capacity/shift/calendar data                        | SAP PP/CRP         | SAP -\> Platform; dynamic outage overlay is platform-owned   |
| Production Order                       | Production order header / item / operations                       | SAP PP             | Bidirectional only through approved business APIs/events     |
| Confirmation                           | Operation confirmation / final confirmation                       | SAP PP or MES      | SAP/MES -\> Platform as actual fact                          |
| Inventory / MRP elements               | Stock and relevant receipts/reservations                          | SAP MM/PP          | SAP -\> Platform                                             |
| Purchase receipt                       | Purchase order/schedule line/goods receipt                        | SAP MM             | SAP -\> Platform                                             |
| Quality hold                           | Inspection lot / quality notification/status where applicable     | SAP QM             | SAP -\> Platform                                             |
| Maintenance state                      | Equipment / maintenance order / breakdown status where applicable | SAP PM             | SAP -\> Platform                                             |
| Actual cost                            | CO/FI actual postings relevant to governed objects                | SAP FI/CO          | SAP -\> Platform; never rewritten by platform                |
| Document/revision                      | Document info/DMS/engineering revision reference where used       | SAP DMS/PLM        | SAP -\> Platform                                             |

| **API RELEASE RULE:** The exact SAP service or event name is release/configuration dependent. The integration team must select the released interface from SAP Business Accelerator Hub for the target S/4HANA release and record that concrete endpoint, version, authorization object and payload mapping in the integration repository before build. The architecture does not authorize direct table/DB access merely because a field is visible in SAP. |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 22.3 Integration reliability pattern

SAP -\> Adapter -\> Inbox(idempotent) -\> Canonical Event -\> Domain Handler -\> Outbox -\> Read Models

Failures:

1\. Schema validation failure -\> QUARANTINE

2\. Temporary network failure -\> RETRY with exponential backoff

3\. Duplicate -\> ACK/no-op

4\. Business validation failure -\> REJECTED with remediation code

5\. Persistent failure -\> DEAD LETTER + alert

Never: distributed 2-phase commit between SAP and platform.

## 22.4 Security

- TLS 1.2+; prefer TLS 1.3 where supported.

- mTLS for system-to-system channels where supported.

- OAuth2/client credentials or SAP-supported technical user mechanism for APIs.

- Use SAP Cloud Connector for hybrid connectivity where applicable; no direct inbound exposure of SAP internal ports.

- Principal propagation only where end-user traceability is explicitly required and supported.

- Store certificates/secrets in enterprise vault, not Git or container images.
