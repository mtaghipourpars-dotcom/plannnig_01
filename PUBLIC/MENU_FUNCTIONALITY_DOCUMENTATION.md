# MAPNA Generator Engineering & Manufacturing Co. (PARS)
## Production Planning & Execution Control Tower
### Complete Menu & Functionality Documentation

**Document Reference:** `DOC-MAPNA-PARS-MENU-002`  
**Classification:** Technical & Operational Specification  
**Version:** 1.0.0  
**Target Audience:** System Architects, Operations Planners, Plant Managers, Software Engineers, and Auditors  
**Application URL:** `https://ais-dev-lq7v6mcebvdbgbmnfd5q5e-508614930939.europe-west3.run.app`  

---

### Table of Contents

1. [Navigation Structure & Layout Overview](#1-navigation-structure--layout-overview)
2. [Global Left Sidebar Navigation](#2-global-left-sidebar-navigation)
3. [Top Header Bar & Global Action Controls](#3-top-header-bar--global-action-controls)
4. [View 1: Executive Dashboard (Home)](#4-view-1-executive-dashboard-home)
5. [View 2: Product Portfolio Management](#5-view-2-product-portfolio-management)
6. [View 3: Production Planning & Sequence Operations](#6-view-3-production-planning--sequence-operations)
7. [View 4: Resource Management & Work Centers](#7-view-4-resource-management--work-centers)
8. [View 5: Risk & Scenario Simulation Lab](#8-view-5-risk--scenario-simulation-lab)
9. [View 6: Decision Governance & SAP S/4HANA Write-Back](#9-view-6-decision-governance--sap-s4hana-write-back)
10. [View 7: Continuous Improvement & Lessons Learned](#10-view-7-continuous-improvement--lessons-learned)
11. [View 8: Reports & Executive Analytics](#11-view-8-reports--executive-analytics)
12. [Administration Modals & Dialogs](#12-administration-modals--dialogs)
13. [Global UI Elements & Notifications](#13-global-ui-elements--notifications)

---

### 1. Navigation Structure & Layout Overview

The MAPNA PARS Control Tower uses a responsive, dual-tier command architecture:
- **Left Desktop Sidebar:** Fixed 64-character (16rem / 256px) navigation drawer finished in deep industrial dark slate (`#0F172A`). Houses the primary functional workspaces and system administration triggers.
- **Top Sticky Header:** High-visibility utility bar containing the dynamic operational title, global product search, active alert notifications drawer, the primary Day-Close execution button, and user credentials.
- **Central Dynamic Canvas:** Adaptive container rendering the active workspace with rich SVG graphics, tabular matrices, and real-time state manipulation widgets.

---

### 2. Global Left Sidebar Navigation

Located permanently on the left side on desktop screens (`lg:w-64`), with slide-over backdrop behavior on tablet and mobile viewports (`< 1024px`).

```
+---------------------------------------------+
| [M] MAPNA GENERATOR Engineering & Mfg (PARS)|
|     Control Tower v1.0                      |
+---------------------------------------------+
| MAIN MENU                                   |
| [*] Home / Dashboard             [Active]   |
| [ ] Product Portfolio            [20]       |
| [ ] Production Planning          [Day]      |
| [ ] Resource Management          [6 Centers]|
| [ ] Risk & Scenario Analysis     [What-if]  |
| [ ] Decision Governance          [1 Pending]|
| [ ] Lesson Learned               [2 New]    |
| [ ] Reports & Analytics                     |
+---------------------------------------------+
| ADMINISTRATION                              |
| [ ] Master Data                             |
| [ ] Settings                                |
| [ ] Users & Roles                           |
+---------------------------------------------+
| [JD] Javad Dehghan (CEO)                    |
|      SAP S/4HANA: Online (RFC)              |
+---------------------------------------------+
```

#### 2.1 Brand Header
- **Exact Name / Label:** `MAPNA GENERATOR` (Subtitle: `Engineering & Manufacturing Co. (PARS) - Control Tower v1.0`)
- **Location:** Topmost section of the left sidebar.
- **Function & Behavior:** Establishes corporate branding and system identity.
- **User Interaction:** Clicking returns the user to the Executive Dashboard (`'home'`).
- **Business Rules:** Displays official company designation for Karaj manufacturing plant operations.

#### 2.2 Navigation Menu Items

| Item Label | Icon | Interface Location | Detailed Function & Behavior | Interaction Result | Business Rules & Side Effects |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Home / Dashboard** | `Home` | Sidebar Menu #1 | Default operational landing view matching the executive control tower layout. | Switches `activeTab` to `'home'`, rendering executive KPIs, donut charts, progress bars, and alerts. | Clears any active modal popups. Highlights item in blue (`bg-blue-600`). |
| **Product Portfolio** | `Package` | Sidebar Menu #2 | Master portfolio repository tracking all 20 manufactured products across the 4 families. | Switches `activeTab` to `'portfolio'`, showing filterable product table. Badge displays `20`. | Allows filtering by family (`Generators & Turbines`, `Wind`, `Motors`, `Busduct`) and health. |
| **Production Planning** | `Calendar` | Sidebar Menu #3 | Daily sequence operations, Gantt timeline, and past-fact lock status. | Switches `activeTab` to `'planning'`. Badge displays `Day`. | Operations prior to `lastClosedDay` are strictly read-only and locked. |
| **Resource Management** | `Cpu` | Sidebar Menu #4 | Monitoring of critical machinery, raw materials inventory, and skilled crews. | Switches `activeTab` to `'resources'`. Badge displays `6 Centers`. | Highlights overloaded work centers (e.g. `CNC-04` at 104%). |
| **Risk & Scenario Analysis** | `AlertOctagon`| Sidebar Menu #5 | Dynamic What-If simulation engine for testing breakdowns, delays, and priority changes. | Switches `activeTab` to `'scenarios'`. Badge displays `What-if`. | Calculates schedule delays and opportunity costs in real-time. |
| **Decision Governance** | `CheckSquare` | Sidebar Menu #6 | Executive governance workbench for formal approval and SAP S/4HANA write-back. | Switches `activeTab` to `'decisions'`. Badge displays `1 Pending`. | Enforces multi-tier approval chains before triggering ERP transactions. |
| **Lesson Learned** | `BookOpen` | Sidebar Menu #7 | Continuous improvement repository capturing cycle optimizations. | Switches `activeTab` to `'lessons'`. Badge displays `2 New`. | Allows promoting shopfloor lessons to active planning parameters. |
| **Reports & Analytics** | `BarChart2` | Sidebar Menu #8 | Executive performance metrics, On-Time Delivery (OTD), and variance analysis. | Switches `activeTab` to `'reports'`. | Aggregates physical progress vs cost consumption across manufacturing families. |

#### 2.3 Administration Menu Items

| Item Label | Icon | Interface Location | Detailed Function & Behavior | Interaction Result | Business Rules & Side Effects |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Master Data** | `Database` | Sidebar Admin #1 | Synchronized catalogs of BOM Level 3 components, routings, and work centers. | Opens `AdminModal` with `activeAdminTab = 'master-data'`. | Shows verified data structures synced from SAP S/4HANA. |
| **Settings** | `Settings` | Sidebar Admin #2 | Engine runtime parameters, planning quantum unit, and RFC connector properties. | Opens `AdminModal` with `activeAdminTab = 'settings'`. | Displays engine version (`RS-PARS-2026.3`) and immutability rules. |
| **Users & Roles** | `Users` | Sidebar Admin #3 | Active user credentials and role-based authority boundaries. | Opens `AdminModal` with `activeAdminTab = 'users'`. | Confirms executive authority for user Javad Dehghan (CEO). |

#### 2.4 Profile & System Status Footer
- **Exact Label:** `JD - Javad Dehghan` / `Chief Executive Officer (CEO)` / `SAP S/4HANA: Online (RFC)`
- **Location:** Bottom of the left sidebar.
- **Function & Behavior:** Shows current authenticated user role and real-time ERP connector status.
- **Business Rules:** Displays green dot indicator for active SAP RFC connection (`S4H_PROD_100`).

---

### 3. Top Header Bar & Global Action Controls

Located permanently at the top of the main viewport (`sticky top-0 z-30`).

#### 3.1 Mobile Menu Hamburger Button
- **Label:** `Menu` icon
- **Location:** Top left on screens `< 1024px`.
- **Function:** Toggles mobile sidebar slide-over menu.

#### 3.2 Main Title & Subtitle
- **Label:** `Production Planning & Execution Control Tower`
- **Subtitle:** `From Commitment to Actual Result — MAPNA Generator (PARS)`
- **Location:** Left portion of top header.
- **Function:** Informs the operator of the authoritative platform state.

#### 3.3 Global Search Input
- **Label / Placeholder:** `Search orders, products, resources... ⌘K`
- **Location:** Center of top header.
- **Function:** Real-time search query box.
- **Interaction:** Typing filters product items and alerts throughout the platform. Pressing `Escape` clears the input.

#### 3.4 Active Alerts Notification Bell & Popover Drawer
- **Label:** Bell icon with red pill counter (`5`).
- **Location:** Right side of header.
- **Interaction:** Clicking opens an interactive dropdown menu listing all 5 active critical alerts:
  1. *Generator of Karun Dam* (+13 days delay)
  2. *Neka Busduct* (+10 days delay)
  3. *Heavy Machining Center CNC-04 Overload* (104% capacity)
  4. *Material Stockout Warning* (Mica Tape)
  5. *Continuous Improvement Items* (2 items pending review)
- **Side Effect:** Clicking an alert jumps directly to the affected entity (Product Detail Modal, Scenario Lab, or Lessons Learned).

#### 3.5 Day-Close Execution Action Button
- **Label:** `Day-Close: 2026-09-18 (Shanbeh) Advance Day →`
- **Location:** Right side of top header.
- **Function & Behavior:** Executes the daily day-close routine (`handleDayClose`):
  - Advances `lastClosedDay` from `2026-09-17` to `2026-09-18`.
  - Sets `effectiveDay` to `2026-09-19`.
  - Increments `PlanVersion.versionNumber` (e.g. from v1 to v2).
  - Evaluates all scheduled operations: operations ending on or before the new closed day are permanently stamped `isPastFact = true` and `status = 'COMPLETED'`.
  - Partially elapsed operations are set to `IN_PROGRESS` (50% progress).
  - Triggers global green confirmation toast notification: *"Day-Close executed successfully for 2026-09-18. Past facts locked."*
- **Business Rule:** **Strictly non-reversible.** Past facts become permanently immutable.

---

### 4. View 1: Executive Dashboard (Home)

Replicates the operational control tower layout shown in executive overviews.

```
+----------------------------------------------------------------------------------------------------+
| 5 KEY KPI METRICS                                                                                  |
| [20 Active Products]  [2 Critical]  [5 Monitoring]  [7 Commitments at Risk]  [2 Key Bottlenecks]   |
+----------------------------------------------------------------------------------------------------+
| HEALTH DONUT CHART               | PROGRESS VS COST BARS          | CRITICAL ALERTS & ACTIONS      |
| [12 Healthy | 5 Mon | 2 Crit | 1] | Gen: 57% vs 62% | Wind: 48/51% | [!] Karun Dam: +13 days delay  |
|                                  | Motor: 47/51%   | Busduct: 39% | [!] Neka Busduct: +10 days     |
+----------------------------------------------------------------------------------------------------+
| PRODUCT FAMILIES TABLE           | RESOURCE UTILIZATION (30 DAYS) | UPCOMING RISKS (30 DAYS)       |
| - Generators & Turbines (8)      | [Work Centers] [Mat] [Capacity]| - Sep 22: Mica Tape Delivery   |
| - Wind Equipment (4)             | CNC-04: 104% (Overload)        | - Sep 25: CNC-04 Spindle Maint |
| - Industrial Motors (5)          | CNC-07: 88%  | VPI-01: 92%     | - Sep 29: Stator Winding Shift |
| - Busduct & Aux. (3)             |                                |                                |
+----------------------------------------------------------------------------------------------------+
| PRODUCTION FLOW RIBBON: [1.Commitment] -> [2.Planning] -> [3.Execution] -> [4.Quality] -> [5.Delivery] |
+----------------------------------------------------------------------------------------------------+
```

#### 4.1 Five Hero KPI Metric Cards

1. **Total Active Products:** Displays `20` units under production across `4` manufacturing families. Clicking switches view to `ProductPortfolioView`.
2. **Critical Products:** Displays `2` units in red (`text-rose-600`). Subtitle: `Immediate decision required`. Clicking filters the portfolio to Critical products.
3. **Products Under Monitoring:** Displays `5` units in amber (`text-amber-600`). Subtitle: `Close oversight needed`.
4. **Customer Commitments at Risk:** Displays `7` of 20 active commitments facing potential delivery penalties.
5. **Key Bottlenecks (Next 30 Days):** Displays `2` critical constraints (`Heavy Machining & Critical Material`).

#### 4.2 Product Health Donut Chart
- **Graphic:** High-resolution SVG circular ring chart.
- **Segments:**
  - **Healthy:** Green (`#10B981`) — 12 products (60%)
  - **Monitoring:** Amber (`#F59E0B`) — 5 products (25%)
  - **Critical:** Red (`#EF4444`) — 2 products (10%)
  - **On Hold:** Slate (`#94A3B8`) — 1 product (5%)
- **Center Label:** Large `20` / `Active Units`.
- **Legend Pills:** Interactive pill badges beneath the chart. Clicking any pill navigates to the portfolio view with the matching filter.

#### 4.3 Production Progress Grouped Bars
- **Graphic:** Dual horizontal comparison bars for each manufacturing family:
  - **Generators & Turbines:** Physical Progress 57% (Blue) vs Cost Consumption 62% (Indigo).
  - **Wind Equipment:** Physical Progress 48% vs Cost Consumption 51%.
  - **Industrial Motors:** Physical Progress 47% vs Cost Consumption 51%.
  - **Busduct & Aux.:** Physical Progress 39% vs Cost Consumption 44%.
- **Business Rule:** Highlights cost-to-progress variance (cost lead indicates potential budget burn).

#### 4.4 Critical Alerts & Actions Container
- Lists top 4 prioritized production alerts with icon, title, delay days badge, and action link:
  1. *Generator of Karun Dam:* `+13 days delay` → Links to product modal.
  2. *Neka Busduct:* `+10 days delay` → Links to product modal.
  3. *Heavy Machining Center CNC-04:* `104% Overload` → Links to Scenario Lab.
  4. *Material Shortage:* `Mica Tape stockout risk` → Links to Resource Board.

#### 4.5 Product Families Summary Table
- Detailed table with columns: `Family`, `Progress vs Cost`, `Status Distribution`, `Action`.
- Action Button: `View Portfolio Details →` jumps directly to `ProductPortfolioView` pre-filtered for that family.

#### 4.6 Resource Utilization (Next 30 Days) Tabbed Widget
Contains 3 interactive sub-tabs:
1. **Work Centers Sub-tab:** Shows load percentage, capacity, and risk badges for `CNC-04` (104%, Overload), `CNC-07` (88%), `VPI-01` (92%, High), `WIND-01` (78%), `MOTOR-01` (72%), and `BD-01` (65%).
2. **Material Sub-tab:** Shows current on-hand inventory vs safety stock for `Mica Tape` (180/200 kg, shortage on Sep 22), `Copper Flat Wire` (3.4/2.5 t), `Silicon Steel Laminations` (18.2/10 t), and `Insulation Varnish` (820/600 L).
3. **Capacity Plan Sub-tab:** Displays weekly aggregate capacity load factors for Weeks 38, 39, 40, 41, and 42.

#### 4.7 Upcoming Risks (30 Days) Panel
- Renders calendar-tagged risk warnings:
  - *Sep 22:* Material Delivery Uncertainty (Mica Tape shipment clearance delay).
  - *Sep 25:* Scheduled CNC-04 Preventive Spindle Maintenance.
  - *Sep 29:* Stator Winding Capacity Deficit (Requires overtime authorization).

#### 4.8 Production Flow Ribbon
- Six-stage sequential process bar at the bottom of the dashboard tracking product life stages:
  1. *Commitments* (20 Active) → 2. *Planning* (20 Scheduled) → 3. *Execution* (18 Active In-Shop) → 4. *Quality* (4 Inspected) → 5. *Delivery* (2 Dispatched) → 6. *Learn & Improve* (3 Lessons).

---

### 5. View 2: Product Portfolio Management

Activated via Sidebar `Product Portfolio` or table link.

#### 5.1 Controls & Filters Bar
- **Return to Dashboard Button:** `← Return to Dashboard` restores `'home'`.
- **Family Filter Pills:**
  - `All Families (20)`
  - `Generators & Turbines (8)`
  - `Wind Equipment (4)`
  - `Industrial Motors (5)`
  - `Busduct & Aux. (3)`
- **Health Status Dropdown:** Filter by `All Health Status`, `Healthy Only (12)`, `Monitoring Only (5)`, `Critical Only (2)`, or `On Hold Only (1)`.
- **Search Bar:** Live search filtering across Product Name, Code, Customer Name, and Contract Number.

#### 5.2 20-Product Master Data Table
Columns:
1. **Code / Model:** Model name, catalog code (e.g. `GEN-H320-01`), and rating (`320 MW Hydro`).
2. **Product Family:** Manufacturing family badge.
3. **Customer / Contract:** Customer entity (e.g. `Iran Water & Power Resources Dev. Co.`) and commitment code (`CON-KRN-2024-08`).
4. **Due Date:** Contractual due date and variance flag (`+13 days delay` in red, or `On Schedule` in green).
5. **Progress:** Progress bar with physical percentage (e.g. 64%) and cost consumption (e.g. 69%).
6. **Health:** Color-coded status badge (`HEALTHY`, `MONITORING`, `CRITICAL`, `ON_HOLD`).
7. **Action:** `Inspect Details` button opening the Product Detail Modal.

#### 5.3 Product Detail Inspection Modal
- **Trigger:** Clicking `Inspect Details` on any product row.
- **Modal Content:**
  - Header with health badge, product name, code, and target rating.
  - Contract & Delivery Details: Customer name, contract code, contractual due date, projected delivery date, and total delay days.
  - **Critical Path Bottleneck Banner:** Highlighted box detailing the exact root cause constraint (e.g. *"Heavy Machining queue on CNC-04 rotor shaft slotting; supplier mica tape delay"*).
  - **Progress vs Plan Gauge:** Dual visual indicator comparing actual physical progress vs planned target.
  - **Close Button:** Dismisses modal.

---

### 6. View 3: Production Planning & Sequence Operations

Activated via Sidebar `Production Planning`.

#### 6.1 Planning Horizon & Plan Version Header
- Displays current active baseline: `PLAN-2026-BASE-v1`.
- Planning Horizon: `2026-09-18` to `2026-10-31` (Rolling 45-day window).
- Effective Rule-Set: `RULE-PARS-2026.3`.
- Last Closed Day indicator: `2026-09-17 (Locked)`.

#### 6.2 Operations Sequence & Dispatch Matrix
- Displays production orders and routing operations breakdown.
- Columns: `Op Seq`, `Operation Name`, `Work Center`, `Allocated Hrs/Day`, `Scheduled Window`, `Progress`, `Immutability Status`.
- **Past-Fact Badge:** Operations scheduled prior to or on `lastClosedDay` display a locked padlocked badge (`Locked Fact`). Editing is disabled.
- **Future Operation Controls:** Operations in the future horizon allow triggering what-if simulations directly.

---

### 7. View 4: Resource Management & Work Centers

Activated via Sidebar `Resource Management`.

#### 7.1 Critical Work Centers Board
- Six primary work center cards:
  1. `CNC-04` (Heavy Horizontal Boring Machine) — Capacity: 16 hrs/day, Load: 104%, Risk: **CRITICAL**.
  2. `CNC-07` (Vertical Lathe) — Capacity: 16 hrs/day, Load: 88%, Risk: **NORMAL**.
  3. `VPI-01` (Vacuum Pressure Impregnation Tank) — Capacity: 24 hrs/day, Load: 92%, Risk: **WARNING**.
  4. `WIND-01` (Stator Winding Bays) — Capacity: 24 hrs/day, Load: 78%, Risk: **NORMAL**.
  5. `MOTOR-01` (Industrial Motor Assembly Line) — Capacity: 16 hrs/day, Load: 72%, Risk: **NORMAL**.
  6. `BD-01` (Busduct Fabrication Line) — Capacity: 16 hrs/day, Load: 65%, Risk: **NORMAL**.

#### 7.2 Critical Raw Materials Inventory Matrix
- Real-time stock status vs minimum safety buffers:
  - `Mica Tape (0.14mm)`: 180 kg on hand (Safety: 200 kg) → Shortage on `2026-09-22`.
  - `Copper Flat Wire`: 3,400 kg on hand (Safety: 2,500 kg) → Healthy.
  - `Silicon Steel Laminations`: 18,200 kg on hand (Safety: 10,000 kg) → Healthy.
  - `Insulation Resin Varnish`: 820 L on hand (Safety: 600 L) → Warning threshold.

#### 7.3 Manpower Allocation by Qualification
- Headcount available vs allocated:
  - *Class-H Stator Winders (IEC/ISO Certified):* 14 Available / 14 Allocated (100% saturation).
  - *Precision CNC Machinists:* 8 Available / 8 Allocated (100% saturation).
  - *VPI Autoclave Operators:* 4 Available / 3 Allocated.
  - *Final Test Bed Engineers:* 6 Available / 4 Allocated.

---

### 8. View 5: Risk & Scenario Simulation Lab

Activated via Sidebar `Risk & Scenario Analysis`.

#### 8.1 What-If Disruption Scenario Builder
Allows planners to test dynamic shopfloor events:
- **Scenario Name Input:** Text field (e.g. *"CNC-04 Spindle Breakdown - 2 Days"*).
- **Event Type Selector:**
  - `Machine Breakdown` (`MACHINE_BREAKDOWN`)
  - `Order Priority Change` (`PRODUCTION_ORDER_PRIORITY_CHANGED`)
  - `Material Receipt Delay` (`MATERIAL_RECEIPT_DELAYED`)
  - `Emergency Cash Injection` (`CASH_INJECTED`)
- **Target Entity Dropdown:** Select specific work center, production order, or material.
- **Duration / Magnitude Input:** Number of days or dollar amount.
- **"Run What-If Simulation" Button:** Executes `simulateScenarioRecalculation` in `planningEngine.ts`.

#### 8.2 Simulation Output Cards
- **Feasibility Status Gate:**
  - `FEASIBLE_NOW` (Green)
  - `FEASIBLE_CONDITIONAL` (Amber)
  - `NOT_FEASIBLE` (Red)
  - `RESOURCE_CRISIS` (Dark Red)
- **Feasibility Reason Banner:** Explains hard constraint breach (e.g. *"Machine CNC-04 unavailable for 2 days causes critical commitment slippage"*).
- **Financial & Schedule Metrics:**
  - **Estimated Schedule Delay:** e.g. `+4 Days`.
  - **Opportunity Cost:** e.g. `$36,000 USD`.
  - **Direct Cost Delta:** e.g. `+$15,000 USD`.
- **Cascading Impacts List:** Itemized breakdown of resource overloads, schedule shifts, and material stockouts.
- **"Promote to Decision Workbench" Button:** Converts simulated scenario into a formal `DecisionRecord` and redirects to the Decision Workbench.

---

### 9. View 6: Decision Governance & SAP S/4HANA Write-Back

Activated via Sidebar `Decision Governance`.

#### 9.1 Decision Governance Ledger
- Displays pending and approved decision records.
- Columns: `Decision ID`, `Scenario Name`, `Decision Owner`, `Expected Impact`, `Governance Status`.
- Status Badges: `PENDING`, `APPROVED`, `WRITTEN_TO_SAP`.

#### 9.2 Formal Approval Chain
- Displays multi-tier governance audit trail:
  1. *Production Planner:* Endorsed Alternative (Timestamped).
  2. *Lead Resource Controller:* Feasibility Reviewed (Timestamped).
  3. *Executive Committee / CEO:* Pending or Approved.

#### 9.3 Action Buttons
- **"Endorse & Approve" Button:**
  - Updates status from `PENDING` to `APPROVED`.
  - Adds executive sign-off to `approvalChain`.
  - Enables the SAP write-back button.
- **"Commit to SAP S/4HANA" Button:**
  - Invokes `buildSapOutboxRecord`.
  - Stalls RFC transaction payload with idempotency key and correlation ID.
  - Returns simulated transaction confirmation (e.g. `SAP-TX-49201948`).
  - Updates record status to `WRITTEN_TO_SAP`.
  - Displays green toast notification.

---

### 10. View 7: Continuous Improvement & Lessons Learned

Activated via Sidebar `Lesson Learned`.

#### 10.1 Efficiency KPI Banner
- **Overall Process Efficiency:** `86%` (+4.2% vs previous quarter).
- **Pending Executive Review:** `2 items` requiring CEO sign-off.
- **Implemented Best Practices:** `1 Active` applied across all bays.

#### 10.2 Filter Tabs
- `All Items (3)`
- `Pending Review (2)`
- `Applied (1)`

#### 10.3 Lesson Learned Cards
- **Category Badge:** e.g. `VPI PROCESS`, `WINDING CYCLE`, `ROTOR BALANCING`.
- **Title & Description:** Detailed engineering insight.
- **Efficiency Gain:** e.g. `12% cycle time reduction (1.5 days saved per rotor)`.
- **"Approve & Implement" Button:** Transitions lesson from `PENDING_REVIEW` to `APPLIED`, establishing new baseline routing standards.

---

### 11. View 8: Reports & Executive Analytics

Activated via Sidebar `Reports & Analytics`.

#### 11.1 Analytics Summary Cards
- **Contractual On-Time Delivery (OTD):** `88.4%` (+2.1% against target).
- **Average Schedule Variance:** `+3.2 Days` (Driven by CNC-04 heavy machining).
- **Cost-to-Progress Ratio:** `1.08` (Mild budget consumption lead).
- **SAP S/4HANA Outbox Sync:** `100%` (RFC Connection Online).

#### 11.2 Manufacturing Family Variance Matrix
Tabular breakdown across the 4 families showing:
- Active Units Count
- Physical Progress Percentage
- Cost Consumption Percentage
- Cost-Progress Gap
- Risk Assessment (e.g. *2 Critical Units* vs *Controlled*)

---

### 12. Administration Modals & Dialogs

Triggered by the Sidebar Administration links.

#### 12.1 Master Data Catalog Modal (`master-data`)
- Summarizes BOM Level 3 verified structures for 4 families and 20 models.
- Confirms active work center routings (VPI, Balancing, CNC-04, CNC-07, Assembly, Testing).
- Status: `VERIFIED` / `ACTIVE`.

#### 12.2 System Settings Modal (`settings`)
- Planning Engine Version: `RS-PARS-2026.3`.
- Quantum Planning Unit: `1 Working Day (Fixed)`.
- SAP S/4HANA Connector: `RFC Online (PROD_100)`.
- Past-Fact Immutability: `Enforced`.

#### 12.3 User & Roles Modal (`users`)
- Lists authorized operators:
  - *Javad Dehghan:* CEO • Executive Override & SAP Write Authority (`ACTIVE`).
  - *P. Taghipour:* Lead Planning Engineer • Scenario Simulation Authority (`PLANNER`).

---

### 13. Global UI Elements & Notifications

#### 13.1 Toast Notification System
- **Location:** Fixed bottom right (`fixed bottom-6 right-6 z-50`).
- **Appearance:** Dark slate pill with emerald checkmark icon, clear confirmation message, and manual `X` close button.
- **Behavior:** Automatically dismisses after 4,500ms or upon clicking close.

#### 13.2 Footer Metadata Bar
- **Location:** Bottom of all application views.
- **Text:** `MAPNA GENERATOR Engineering & Manufacturing Co. (PARS) • Production Planning & Execution Control Tower | System Online • v1.0.0`
