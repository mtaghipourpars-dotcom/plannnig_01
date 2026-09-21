-- Core schema baseline for MAPNA Dynamic Production Planning.
-- Full application catalog: references/14-database-design.md and assets/schemas/database-catalog.json
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS planning;
CREATE SCHEMA IF NOT EXISTS execution;
CREATE SCHEMA IF NOT EXISTS decision;
CREATE SCHEMA IF NOT EXISTS integration;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS learning;
CREATE SCHEMA IF NOT EXISTS config;

CREATE TABLE IF NOT EXISTS core.organization (
  organization_id uuid PRIMARY KEY, parent_id uuid NULL REFERENCES core.organization(organization_id),
  code varchar(40) NOT NULL UNIQUE, name varchar(200) NOT NULL, type varchar(40) NOT NULL, status varchar(20) NOT NULL,
  source_system varchar(30), source_id varchar(80), valid_from date NOT NULL, valid_to date NULL, version int NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS core.plant (
  plant_id uuid PRIMARY KEY, organization_id uuid NOT NULL REFERENCES core.organization(organization_id),
  code varchar(20) NOT NULL UNIQUE, name varchar(120) NOT NULL, timezone varchar(50) NOT NULL, calendar_id uuid NULL, status varchar(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS core.material (
  material_id uuid PRIMARY KEY, material_no varchar(40) NOT NULL UNIQUE, description varchar(250) NOT NULL,
  material_type varchar(40) NOT NULL, base_uom varchar(10) NOT NULL, criticality varchar(10) NOT NULL, planning_policy varchar(30) NOT NULL,
  source_system varchar(30), source_id varchar(80), version int NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS core.product (
  product_id uuid PRIMARY KEY, product_code varchar(60) NOT NULL UNIQUE, product_family varchar(60) NOT NULL,
  material_id uuid REFERENCES core.material(material_id), engineering_rev_id uuid NULL, serial_control boolean NOT NULL DEFAULT false, status varchar(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS core.work_center (
  work_center_id uuid PRIMARY KEY, plant_id uuid NOT NULL REFERENCES core.plant(plant_id), code varchar(40) NOT NULL UNIQUE,
  name varchar(160) NOT NULL, resource_class varchar(40) NOT NULL, bottleneck_flag boolean NOT NULL DEFAULT false,
  default_capacity_hours numeric(10,2) NOT NULL, status varchar(20) NOT NULL, source_id varchar(80)
);
CREATE TABLE IF NOT EXISTS core.bom_header (
  bom_id uuid PRIMARY KEY, product_id uuid NOT NULL REFERENCES core.product(product_id), revision varchar(40) NOT NULL,
  status varchar(20) NOT NULL, valid_from date NOT NULL, valid_to date NULL, source_id varchar(80),
  UNIQUE(product_id, revision)
);
CREATE TABLE IF NOT EXISTS core.bom_item (
  bom_item_id uuid PRIMARY KEY, bom_id uuid NOT NULL REFERENCES core.bom_header(bom_id), component_material_id uuid NOT NULL REFERENCES core.material(material_id),
  qty numeric(18,6) NOT NULL CHECK (qty >= 0), uom varchar(10) NOT NULL, scrap_pct numeric(8,4) NOT NULL DEFAULT 0 CHECK (scrap_pct >= 0),
  sequence_no int NOT NULL, required_before_op int NULL
);
CREATE TABLE IF NOT EXISTS planning.planning_day (
  planning_day_id uuid PRIMARY KEY, business_date date NOT NULL UNIQUE, plant_calendar_id uuid NOT NULL, status varchar(20) NOT NULL,
  actual_cutoff_ts timestamptz NULL, plan_version_id uuid NULL, closed_by varchar(80) NULL, closed_at timestamptz NULL, state_hash varchar(128)
);
CREATE TABLE IF NOT EXISTS planning.plan_version (
  plan_version_id uuid PRIMARY KEY, planning_day_id uuid NOT NULL REFERENCES planning.planning_day(planning_day_id), parent_plan_version_id uuid NULL,
  version_no int NOT NULL, status varchar(20) NOT NULL, model_version varchar(60) NOT NULL, rules_version varchar(60) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(), created_by varchar(80) NOT NULL, UNIQUE(planning_day_id, version_no)
);
CREATE TABLE IF NOT EXISTS planning.production_order (
  production_order_id uuid PRIMARY KEY, external_sap_order_no varchar(40), product_id uuid NOT NULL REFERENCES core.product(product_id),
  priority int NOT NULL, status varchar(30) NOT NULL, planned_start date NOT NULL, planned_finish date NOT NULL,
  actual_finish date NULL, source_system varchar(30) NOT NULL, source_id varchar(80), version int NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS planning.operation (
  operation_id uuid PRIMARY KEY, production_order_id uuid NOT NULL REFERENCES planning.production_order(production_order_id),
  operation_no varchar(20) NOT NULL, work_center_id uuid NOT NULL REFERENCES core.work_center(work_center_id), sequence_no int NOT NULL,
  standard_hours numeric(16,3) NOT NULL, planned_start date NOT NULL, planned_finish date NOT NULL, status varchar(30) NOT NULL,
  UNIQUE(production_order_id, operation_no)
);
CREATE TABLE IF NOT EXISTS planning.resource_allocation (
  allocation_id uuid PRIMARY KEY, plan_version_id uuid NOT NULL REFERENCES planning.plan_version(plan_version_id),
  planning_day_id uuid NOT NULL REFERENCES planning.planning_day(planning_day_id), resource_type varchar(30) NOT NULL, resource_id uuid NOT NULL,
  demand_hours numeric(16,3) NULL, demand_qty numeric(20,6) NULL, allocated_value numeric(24,2) NULL, status varchar(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS execution.actual_event (
  actual_event_id uuid PRIMARY KEY, event_type varchar(50) NOT NULL, planning_day_id uuid NOT NULL REFERENCES planning.planning_day(planning_day_id),
  entity_type varchar(40) NOT NULL, entity_id uuid NOT NULL, event_time timestamptz NOT NULL, quantity numeric(20,6) NULL, hours numeric(16,3) NULL,
  amount numeric(24,2) NULL, payload jsonb NOT NULL DEFAULT '{}'::jsonb, source_system varchar(30) NOT NULL, source_id varchar(80), immutable_hash varchar(128) NOT NULL,
  UNIQUE(source_system, source_id, event_type)
);
CREATE TABLE IF NOT EXISTS integration.inbox_message (
  message_id uuid PRIMARY KEY, external_message_id varchar(120) NOT NULL, source_system varchar(40) NOT NULL, message_type varchar(80) NOT NULL,
  received_at timestamptz NOT NULL, payload jsonb NOT NULL, status varchar(20) NOT NULL, retry_count int NOT NULL DEFAULT 0, last_error text NULL, processed_at timestamptz NULL,
  UNIQUE(source_system, external_message_id, message_type)
);
CREATE TABLE IF NOT EXISTS integration.outbox_event (
  outbox_id uuid PRIMARY KEY, aggregate_type varchar(50) NOT NULL, aggregate_id uuid NOT NULL, event_type varchar(80) NOT NULL,
  payload jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), published_at timestamptz NULL, status varchar(20) NOT NULL, retry_count int NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS audit.audit_event (
  audit_event_id uuid PRIMARY KEY, event_time timestamptz NOT NULL, actor_id varchar(100) NOT NULL, action varchar(80) NOT NULL,
  object_type varchar(60) NOT NULL, object_id varchar(100) NOT NULL, before_hash varchar(128) NULL, after_hash varchar(128) NULL,
  correlation_id varchar(100) NOT NULL, ip_addr inet NULL, details jsonb NOT NULL DEFAULT '{}'::jsonb
);
