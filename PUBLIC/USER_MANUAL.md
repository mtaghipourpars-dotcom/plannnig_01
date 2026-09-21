# MAPNA Generator Engineering & Manufacturing Co. (PARS)
## Production Planning & Execution Control Tower
### Comprehensive User Manual & Operational Guide

**Document Reference:** `DOC-MAPNA-PARS-MANUAL-003`  
**Classification:** Standard Operating Procedure (SOP) & User Manual  
**Version:** 1.0.0  
**Target Users:** Executive Directors, Production Planners, Shopfloor Supervisors, Procurement Controllers, and Quality Engineers  
**System URL:** `https://ais-dev-lq7v6mcebvdbgbmnfd5q5e-508614930939.europe-west3.run.app`  

---

### Table of Contents

1. [System Introduction & Core Principles](#1-system-introduction--core-principles)
2. [Getting Started & Workspace Orientation](#2-getting-started--workspace-orientation)
3. [Workflow 1: Daily Executive Situational Awareness](#3-workflow-1-daily-executive-situational-awareness)
4. [Workflow 2: Product Portfolio Inspection & Bottleneck Tracing](#4-workflow-2-product-portfolio-inspection--bottleneck-tracing)
5. [Workflow 3: Executing Daily Day-Close & Freezing Past Facts](#5-workflow-3-executing-daily-day-close--freezing-past-facts)
6. [Workflow 4: Simulating What-If Disruption Scenarios](#6-workflow-4-simulating-what-if-disruption-scenarios)
7. [Workflow 5: Decision Governance & Multi-Tier Approvals](#7-workflow-5-decision-governance--multi-tier-approvals)
8. [Workflow 6: Committing & Writing Back to SAP S/4HANA](#8-workflow-6-committing--writing-back-to-sap-s4hana)
9. [Workflow 7: Reviewing & Approving Lessons Learned](#9-workflow-7-reviewing--approving-lessons-learned)
10. [Workflow 8: Monitoring Work Centers, Raw Materials & Manpower](#10-workflow-8-monitoring-work-centers-raw-materials--manpower)
11. [Workflow 9: Executive Reports & Cost-Progress Variance Analysis](#11-workflow-9-executive-reports--cost-progress-variance-analysis)
12. [Workflow 10: Administration & Master Data Audit](#12-workflow-10-administration--master-data-audit)
13. [Troubleshooting & Frequently Asked Questions (FAQ)](#13-troubleshooting--frequently-asked-questions-faq)

---

### 1. System Introduction & Core Principles

The **MAPNA Generator Production Planning & Execution Control Tower** is the enterprise command platform for the MAPNA Generator Engineering & Manufacturing Co. (PARS) plant in Karaj, Iran. It provides real-time situational awareness, dynamic production scheduling, resource bottleneck resolution, what-if scenario simulation, and governed two-way synchronization with SAP S/4HANA.

#### Non-Negotiable Operational Principles
1. **Past is Fact; Future is Plan:** Historical execution actuals (labor hours, completed operations, material consumption) are permanently locked. They can never be overwritten retroactively.
2. **One-Day Planning Quantum:** Time is modeled in strict discrete single-day buckets.
3. **Feasibility as an Absolute Gate:** The platform will never allow a planner to submit or approve an infeasible plan that violates machine capacity or causes inventory stockouts.
4. **Governed Human Approval:** AI and optimization engines generate and evaluate alternatives; authoritative sign-off by human management is mandatory before changes are written back to SAP.

---

### 2. Getting Started & Workspace Orientation

```
+---------------------------------------------------------------------------------------------------------+
| [M] MAPNA PARS | Production Planning & Execution Control Tower    [Search ⌘K] [Alerts (5)] [Day-Close] [JD] |
+----------------+----------------------------------------------------------------------------------------+
| Navigation     | Main Active Workspace Area                                                             |
| - Home         | (Dynamic view loaded based on sidebar selection: Executive Dashboard, Portfolio,       |
| - Portfolio    |  Gantt Planning, Resource Board, Scenario Lab, Decision Workbench, Lessons, etc.)       |
| - Planning     |                                                                                        |
| - Resources    |                                                                                        |
| - Scenarios    |                                                                                        |
| - Decisions    |                                                                                        |
| - Lessons      |                                                                                        |
| - Reports      |                                                                                        |
+----------------+----------------------------------------------------------------------------------------+
```

#### Launching the Application
1. Open any modern web browser (Chrome, Edge, Firefox, or Safari).
2. Navigate to the application URL: `https://ais-dev-lq7v6mcebvdbgbmnfd5q5e-508614930939.europe-west3.run.app`.
3. The platform opens directly into the **Executive Dashboard (Home)**.
4. Verify the top right status displays:
   - **Operational Date:** `2026-09-18 (Shanbeh)`
   - **Executive Profile:** `JD` (Javad Dehghan, CEO)
   - **SAP Status:** Green dot (`SAP S/4HANA: Online (RFC)`) in the sidebar footer.

---

### 3. Workflow 1: Daily Executive Situational Awareness

**Purpose:** Rapid 2-minute morning briefing on overall manufacturing health, delivery commitments at risk, and immediate plant bottlenecks.

```
[Navigation Path]: Sidebar -> Click "Home / Dashboard" (Default view upon login)
```

#### Step-by-Step Instructions:
1. **Review the Top 5 Hero KPI Cards:**
   - **Total Active Products (20):** Confirms all 20 generator, wind, motor, and busduct units are tracked.
   - **Critical Products (2):** Red indicator signaling that 2 units require immediate executive decisions.
   - **Products Under Monitoring (5):** Amber indicator showing units with minor delays or impending resource constraints.
   - **Customer Commitments at Risk (7):** Total contracts requiring schedule adjustment or client notification.
   - **Key Bottlenecks (2):** Identifies that `CNC-04` machining and `Mica Tape` material are currently constraining the plant.
2. **Inspect the Product Health Donut Chart:**
   - Locate the circular donut chart on the left.
   - The central number `20` indicates total active shopfloor projects.
   - Note the breakdown: **12 Healthy** (60%), **5 Monitoring** (25%), **2 Critical** (10%), and **1 On Hold** (5%).
   - *Interactive Action:* Click on the `2 Critical` pill below the chart to jump directly to the filtered portfolio view.
3. **Analyze Progress vs Cost Consumption:**
   - Review the grouped horizontal bars:
     - *Generators & Turbines:* 57% physical progress vs 62% cost consumption.
     - *Wind Equipment:* 48% progress vs 51% cost.
     - *Industrial Motors:* 47% progress vs 51% cost.
     - *Busduct & Aux.:* 39% progress vs 44% cost.
   - *Expected Insight:* If cost consumption significantly exceeds physical progress, investigate potential rework or material scrap in that family.
4. **Examine Critical Alerts & Actions:**
   - Review the right-hand alert cards:
     - Click on **Generator of Karun Dam (+13 days delay)** to inspect the root cause.

---

### 4. Workflow 2: Product Portfolio Inspection & Bottleneck Tracing

**Purpose:** Detailed investigation of individual machine orders, contractual milestones, and critical path bottlenecks.

```
[Navigation Path]: Sidebar -> Click "Product Portfolio" (or click "View Portfolio Details" from Home)
```

#### Step-by-Step Instructions:
1. **Filter by Manufacturing Family:**
   - Click on the family filter pills at the top:
     - `All Families (20)`
     - `Generators & Turbines` (Filters to 8 large generator models)
     - `Wind Equipment` (Filters to 4 wind turbine generators)
     - `Industrial Motors` (Filters to 5 high-voltage industrial motors)
     - `Busduct & Aux.` (Filters to 3 isolated phase busduct sets)
2. **Filter by Health Status:**
   - Click the health dropdown and select `Critical Only (2)`.
   - The table immediately isolates:
     - **Generator of Karun Dam** (`GEN-H320-01` / Hydro 320 MW) — +13 days delay.
     - **Neka Busduct** (`BD-IPB-24KV-01` / 24 kV IPB) — +10 days delay.
3. **Use Global Search:**
   - In the search field, type `Karun`.
   - The table filters in real-time to show only the Karun Dam hydrogenerator contract.
4. **Inspect Product Details Dialog:**
   - Click the **"Inspect Details"** button on the Karun Dam row.
   - A modal dialog appears containing:
     - Customer Name: *Iran Water & Power Resources Dev. Co.*
     - Contract Code: `CON-KRN-2024-08`
     - Contractual Due Date: `2026-10-15`
     - Projected Delivery: `2026-10-28` (+13 days delay)
     - **Critical Path Bottleneck Alert:** *"Heavy Machining queue on CNC-04 rotor shaft slotting; supplier mica tape delay."*
     - Physical Progress Bar: 64% completed vs 77% planned target.
   - Click **"Close Inspection"** to dismiss the modal.

---

### 5. Workflow 3: Executing Daily Day-Close & Freezing Past Facts

**Purpose:** Formal end-of-day planning closure, advancing the simulation horizon by one day and converting all elapsed shopfloor work into immutable historical facts.

```
[Navigation Path]: Top Header Bar -> Locate button "Day-Close: 2026-09-18 (Shanbeh) Advance Day →"
```

#### Step-by-Step Instructions:
1. **Confirm Daily Actuals Confirmation:**
   - Verify that all shopfloor confirmations (`PCNF` / `CNF`) for the day have been uploaded from the MES terminal.
2. **Click the Day-Close Action Button:**
   - Click the button: **`Day-Close: 2026-09-18 (Shanbeh) Advance Day →`**.
3. **Verify System Response:**
   - The button label updates to reflect the new planning horizon (`2026-09-19`).
   - A green confirmation toast notification appears at the bottom-right corner:
     ```
     Day-Close executed successfully for 2026-09-18. Past facts locked.
     ```
4. **Audit Immutability in Production Planning:**
   - Click `Production Planning` in the left sidebar.
   - Examine the operation table:
     - All operations scheduled on or before `2026-09-18` are now stamped with a gray lock icon and labeled **`Locked (Past Fact)`**.
     - Operations currently active across the boundary are marked **`IN_PROGRESS (50%)`**.
     - Attempts to reschedule or edit locked operations are strictly prevented.

---

### 6. Workflow 4: Simulating What-If Disruption Scenarios

**Purpose:** Evaluate the impact of unexpected machine failures, priority escalations, or supplier delays before taking operational action.

```
[Navigation Path]: Sidebar -> Click "Risk & Scenario Analysis"
```

#### Step-by-Step Instructions:
1. **Open the What-If Disruption Sandbox:**
   - Locate the **"Scenario Simulation Builder"** card on the left.
2. **Configure a Breakdown Simulation:**
   - **Scenario Name:** Type `CNC-04 Emergency Spindle Repair`.
   - **Event Type:** Select `Machine Breakdown` (`MACHINE_BREAKDOWN`).
   - **Target Machine:** Select `CNC-04 (Heavy Boring Machine)`.
   - **Duration:** Enter `2` (Days).
3. **Run the Simulation Engine:**
   - Click the primary button: **`Run What-If Simulation`**.
4. **Evaluate Feasibility & Cascading Impacts:**
   - **Feasibility Status Gate:** Displays **`NOT_FEASIBLE`** in high-contrast red.
   - **Feasibility Reason:** *"Hard constraint breached: Machine CNC-04 unavailable for 2 days causes critical commitment slippage."*
   - **Schedule Impact:** `+4 Days Cascading Delay`.
   - **Financial Impact:** Opportunity cost calculated as **`$36,000 USD`** ($18,000/day).
   - **Direct Cost Delta:** `+$15,000 USD`.
5. **Promote to Decision Workbench:**
   - Click the button: **`Promote to Decision Workbench →`**.
   - The platform packages the simulated run, calculates opportunity costs, and routes the alternative directly to executive governance.

---

### 7. Workflow 5: Decision Governance & Multi-Tier Approvals

**Purpose:** Formal review and sign-off on scenario mitigation plans by authorized engineering and executive personnel.

```
[Navigation Path]: Sidebar -> Click "Decision Governance"
```

#### Step-by-Step Instructions:
1. **Locate the Candidate Decision Record:**
   - In the Decision Records table, locate `DEC-2026-xxx` generated from your scenario.
   - Review the record details:
     - **Scenario Name:** *CNC-04 Emergency Spindle Repair*
     - **Decision Owner:** *Planning Governance Board*
     - **Objective Version:** `OBJ-PARS-DELIVERY-COST-BALANCED`
     - **Status:** `PENDING` (Amber badge)
2. **Review the Multi-Tier Approval Chain:**
   - Inspect the audit trail timeline:
     - Step 1: `Production Planner: Endorsed Alternative` (Checked)
     - Step 2: `Lead Resource Controller: Feasibility Reviewed` (Checked)
     - Step 3: `Executive Committee / CEO: Pending Approval` (Awaiting sign-off)
3. **Authorize the Decision:**
   - As an authorized executive user (Javad Dehghan, CEO), click the green button: **`Endorse & Approve Decision`**.
4. **Verify Governance State:**
   - The record status transitions to **`APPROVED`**.
   - The approval chain appends: `Executive Committee: Approved`.
   - The **"Commit to SAP S/4HANA"** button becomes active.

---

### 8. Workflow 6: Committing & Writing Back to SAP S/4HANA

**Purpose:** Safely synchronize approved planning decisions to the central SAP S/4HANA ERP instance via transactional RFC contracts.

```
[Navigation Path]: Sidebar -> Decision Governance -> Locate Approved Decision Record
```

#### Step-by-Step Instructions:
1. **Initiate the ERP Write-Back:**
   - On the approved decision card, click **`Commit to SAP S/4HANA (RFC)`**.
2. **Review the Outbox Transactional Envelope:**
   - The platform generates a staged RFC payload:
     - `Interface Contract:` `RFC_PP_PRODUCTION_ORDER_RESCHEDULE_v2`
     - `Idempotency Key:` `IDEMP-DEC-2026-xxx-172687...`
     - `Correlation ID:` `CORR-S4HANA-PLAN-SCEN-xxx`
     - `Target System:` `SAP_S4HANA_PRD (Client 100)`
3. **Receive Transaction Acknowledgement:**
   - The system receives an immediate RFC confirmation code: e.g. `SAP-TX-71930284`.
   - The decision record badge transitions to **`WRITTEN_TO_SAP`** (Blue).
   - The global toast displays: *"Plan write-back committed to SAP S/4HANA (SAP-TX-71930284)."*
   - In the sidebar, the SAP outbox counter returns to `0 Pending`.

---

### 9. Workflow 7: Reviewing & Approving Lessons Learned

**Purpose:** Closed-loop continuous improvement, capturing shopfloor cycle enhancements and turning them into governed master data routing standards.

```
[Navigation Path]: Sidebar -> Click "Lesson Learned"
```

#### Step-by-Step Instructions:
1. **Review the Lessons KPI Banner:**
   - Overall Process Efficiency: `86%` (+4.2% quarterly gain).
   - Pending Executive Review: `2 items`.
2. **Filter by Pending Items:**
   - Click the filter button: **`Pending Review (2)`**.
3. **Inspect Lesson Card:**
   - Examine item: **"VPI Vacuum Dwell Cycle Optimization"**
     - Category: `VPI PROCESS`
     - Project: `GEN-H320 Series`
     - Description: Optimized pre-heating curve allows reducing autoclave dwell time from 14 to 12 hours while maintaining Class-H resin absorption standards.
     - Impact: `12% cycle time reduction (1.5 days saved per rotor)`.
4. **Approve and Promote to Standard:**
   - Click **`Approve & Implement`**.
   - The item status updates to **`Applied`** (Green badge).
   - A confirmation toast confirms: *"Lesson learned approved and promoted to best practice standard."*

---

### 10. Workflow 8: Monitoring Work Centers, Raw Materials & Manpower

**Purpose:** Proactive surveillance of shopfloor equipment saturation, inventory stockout dates, and certified personnel allocation.

```
[Navigation Path]: Sidebar -> Click "Resource Management" (or Dashboard -> Resource Utilization tab)
```

#### Step-by-Step Instructions:
1. **Audit Work Center Utilization:**
   - Review the 6 critical manufacturing work centers:
     - `CNC-04`: 104% load → **CRITICAL OVERLOAD** (Highlighted in red).
     - `VPI-01`: 92% load → **WARNING** (High saturation).
     - `CNC-07`: 88% load → **NORMAL**.
     - `WIND-01`: 78% load → **NORMAL**.
2. **Audit Raw Materials Inventory & Shortages:**
   - Check the stock balance vs safety stock:
     - `Mica Tape (0.14mm)`: 180 kg available vs 200 kg minimum buffer.
     - Note the projected stockout date: **`2026-09-22`**.
     - *Action:* Alert procurement to expedite customs clearance for pending shipments.
3. **Audit Certified Manpower Saturation:**
   - Review certified crew headcounts:
     - *Class-H Stator Winders:* 14 available / 14 allocated (100% saturation).
     - *Precision Machinists:* 8 available / 8 allocated (100% saturation).
     - *Action:* Note that adding weekend shifts will require overtime premium approval.

---

### 11. Workflow 9: Executive Reports & Cost-Progress Variance Analysis

**Purpose:** High-level executive reporting on contractual delivery performance and budget-to-progress alignment.

```
[Navigation Path]: Sidebar -> Click "Reports & Analytics"
```

#### Step-by-Step Instructions:
1. **Review High-Level Executive Metrics:**
   - **Contractual On-Time Delivery (OTD):** `88.4%` (+2.1% against target).
   - **Average Schedule Variance:** `+3.2 Days`.
   - **Cost-to-Progress Ratio:** `1.08`.
   - **SAP S/4HANA Sync:** `100%` (RFC Connection Online).
2. **Analyze Family Variance Breakdown:**
   - Review the detailed table comparing physical progress against cost consumption across all 4 product lines.
   - Evaluate the Cost-Progress Gap column:
     - Generators & Turbines: +5% cost lead.
     - Wind Equipment: +3% cost lead.
     - Industrial Motors: +4% cost lead.
     - Busduct & Aux.: +5% cost lead.
   - Identify whether cost leads are caused by early material purchases or shopfloor rework.

---

### 12. Workflow 10: Administration & Master Data Audit

**Purpose:** Verify system configuration parameters, synchronized SAP master catalogs, and authorized operator credentials.

```
[Navigation Path]: Sidebar -> Under ADMINISTRATION, click "Master Data", "Settings", or "Users & Roles"
```

#### Step-by-Step Instructions:
1. **Audit Master Data Catalog:**
   - Click `Master Data` in the sidebar.
   - Verify that 4 product families, 20 models, and 6 key work centers are marked **`VERIFIED`** and **`ACTIVE`**.
   - Click `Close`.
2. **Audit System Settings:**
   - Click `Settings` in the sidebar.
   - Verify that the Planning Engine is `RS-PARS-2026.3`.
   - Confirm Quantum Unit is locked to `1 Working Day (Fixed)`.
   - Confirm Past-Fact Immutability is marked `Enforced`.
   - Click `Close`.
3. **Audit User Credentials & Roles:**
   - Click `Users & Roles` in the sidebar.
   - Verify current user *Javad Dehghan (CEO)* possesses Executive Override & SAP Write Authority.
   - Verify *P. Taghipour* is designated as Lead Planning Engineer.
   - Click `Close`.

---

### 13. Troubleshooting & Frequently Asked Questions (FAQ)

#### Q1: Why can't I edit or move an operation scheduled last week?
**Answer:** The system enforces the **Past is Fact** architectural rule. Any operation with a scheduled date on or before the `lastClosedDay` is permanently immutable. If actual execution differed from plan, create a compensating event in the Scenario Lab rather than editing history.

#### Q2: What should I do if a What-If simulation returns `NOT_FEASIBLE`?
**Answer:** `NOT_FEASIBLE` indicates a hard constraint breach (e.g. machine capacity exceeded or material stockout). Review the *Feasibility Reason* banner. You must either extend the delivery window, introduce a second shift (overtime), or inject emergency material before the plan can be approved.

#### Q3: How do I know whether changes were received by SAP S/4HANA?
**Answer:** When you click **"Commit to SAP S/4HANA"**, the platform issues an RFC call and generates an official transaction code (e.g. `SAP-TX-XXXXXXXX`). The decision record badge turns blue (`WRITTEN_TO_SAP`) and the pending outbox counter resets to `0`.

#### Q4: What happens during the Day-Close routine?
**Answer:** The Day-Close routine advances the planning horizon by exactly 1 calendar day, marks all operations completed on that day as permanent facts, and rolls forward the 45-day planning horizon.

---

### End of Documentation
*For additional support or technical inquiries, contact the MAPNA PARS Planning IT Support Group at `support-pars@mapnagenerator.com`.*
