export type PlanningDay = string; // YYYY-MM-DD

export type FeasibilityStatus = 'FEASIBLE_NOW' | 'FEASIBLE_CONDITIONAL' | 'NOT_FEASIBLE' | 'RESOURCE_CRISIS';

export type CommitmentStatus = 'ON_TRACK' | 'AT_RISK' | 'CRITICAL' | 'COMPLETED';

export type OperationStatus = 'COMPLETED' | 'IN_PROGRESS' | 'SCHEDULED' | 'BLOCKED' | 'DELAYED';

export type EventType =
  | 'PRODUCTION_ORDER_CREATED'
  | 'PRODUCTION_ORDER_PRIORITY_CHANGED'
  | 'MACHINE_BREAKDOWN'
  | 'MACHINE_REPAIRED'
  | 'MATERIAL_RECEIPT_CONFIRMED'
  | 'MATERIAL_RECEIPT_DELAYED'
  | 'MATERIAL_SHORTAGE_DETECTED'
  | 'CASH_INJECTED'
  | 'QUALITY_HOLD_CREATED'
  | 'QUALITY_HOLD_RELEASED'
  | 'COMMITMENT_PRIORITY_CHANGED'
  | 'COMMITMENT_DUE_DATE_CHANGED';

export interface PlanVersion {
  id: string;
  versionNumber: number;
  name: string;
  status: 'ACTIVE_BASELINE' | 'SCENARIO_BRANCH' | 'SUPERSEDED';
  horizon: { from: PlanningDay; to: PlanningDay };
  lastClosedDay: PlanningDay;
  effectiveDay: PlanningDay;
  author: string;
  createdAt: string;
  ruleSetVersion: string;
}

export interface Commitment {
  id: string;
  contractCode: string;
  customer: string;
  productLine: string; // 'TURBOGENERATOR' | 'HYDROGENERATOR' | 'WIND_GENERATOR' | 'MOTOR' | 'BUSDUCT'
  productModel: string;
  targetRating: string; // e.g. "320 MW", "2.5 MW PMSG"
  dueDate: PlanningDay;
  penaltyPerDayUsd: number;
  priority: number; // 1 (highest) to 10
  status: CommitmentStatus;
  deliveredPercent: number;
  projectedFinishDate: PlanningDay;
  criticalPathBottleneck?: string;
}

export interface Operation {
  id: string;
  orderId: string;
  sequence: number;
  name: string;
  nameFa: string;
  workCenterId: string;
  requiredHours: number;
  allocatedHoursPerDay: number;
  requiredMaterialIds: string[];
  status: OperationStatus;
  scheduledStart: PlanningDay;
  scheduledEnd: PlanningDay;
  progressPercent: number;
  isPastFact: boolean; // True if scheduled before/on lastClosedDay and completed
}

export interface ProductionOrder {
  id: string;
  orderNumber: string;
  commitmentId: string;
  productModel: string;
  productLine: string;
  priority: number;
  plannedStart: PlanningDay;
  plannedEnd: PlanningDay;
  status: 'RELEASED' | 'IN_PRODUCTION' | 'TECO' | 'HOLD';
  operations: Operation[];
  sapOrderId: string;
}

export interface Breakdown {
  id: string;
  workCenterId: string;
  effectiveDay: PlanningDay;
  durationDays: number;
  reasonCode: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  source: string;
}

export interface WorkCenter {
  id: string;
  code: string;
  name: string;
  nameFa: string;
  category: 'VPI' | 'BALANCING' | 'WINDING' | 'MACHINING' | 'TESTING' | 'ASSEMBLY';
  capacityHoursPerDay: number;
  activeBreakdowns: Breakdown[];
  utilizationRate: number; // 0-100%
  bottleneckRisk: 'NORMAL' | 'WARNING' | 'CRITICAL';
}

export interface MaterialProjection {
  day: PlanningDay;
  supply: number;
  demand: number;
  projectedBalance: number;
}

export interface Material {
  id: string;
  code: string;
  name: string;
  nameFa: string;
  unit: string;
  onHandStock: number;
  safetyStock: number;
  unitCostUsd: number;
  projections: MaterialProjection[];
  firstShortageDate?: PlanningDay;
  status: 'HEALTHY' | 'WARNING' | 'SHORTAGE';
}

export interface ManpowerGroup {
  id: string;
  skillName: string;
  skillNameFa: string;
  headcountAvailable: number;
  headcountAllocated: number;
  qualificationLevel: string; // e.g. "ISO 9001 / IEC Certified"
}

export interface PlanningEvent {
  eventId: string;
  eventType: EventType;
  occurredAt: string;
  effectivePlanningDay: PlanningDay;
  sourceSystem: 'SAP_S4HANA' | 'MES_SHOPFLOOR' | 'SCENARIO_ENGINE' | 'MANUAL_DISPATCH';
  correlationId: string;
  targetType: string;
  targetId: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  payload: Record<string, any>;
  description: string;
}

export interface ScenarioImpact {
  type: 'SCHEDULE_SHIFT' | 'RESOURCE_OVERLOAD' | 'MATERIAL_SHORTAGE' | 'COST_VARIANCE' | 'COMMITMENT_RISK';
  targetName: string;
  beforeValue: string | number;
  afterValue: string | number;
  impactSeverity: 'INFO' | 'WARNING' | 'CRITICAL';
  description: string;
}

export interface Scenario {
  id: string;
  name: string;
  basePlanVersionId: string;
  horizon: { from: PlanningDay; to: PlanningDay };
  events: PlanningEvent[];
  feasibility: FeasibilityStatus;
  feasibilityReason?: string;
  opportunityCostUsd: number;
  estimatedDelayDays: number;
  costDeltaUsd: number;
  impacts: ScenarioImpact[];
  createdAt: string;
  status: 'SIMULATED' | 'APPROVED' | 'REJECTED' | 'BASELINE_PROMOTED';
}

export interface DecisionRecord {
  id: string;
  scenarioId: string;
  scenarioName: string;
  decisionOwner: string;
  approvalChain: string[];
  objectiveVersion: string;
  rationale: string;
  expectedImpact: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'WRITTEN_TO_SAP';
  createdAt: string;
  reviewedAt?: string;
  sapSyncStatus?: 'STAGED' | 'OUTBOX_QUEUED' | 'ACKNOWLEDGED' | 'FAILED';
  sapTransactionId?: string;
}

export interface SapIntegrationState {
  systemId: string; // e.g. "S4H_PROD_100"
  rfcConnectionStatus: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  lastReplicationTimestamp: string;
  pendingOutboxCount: number;
  quarantinedMessagesCount: number;
  activeContractVersion: string;
}

export type ProductHealth = 'HEALTHY' | 'MONITORING' | 'CRITICAL' | 'ON_HOLD';

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  family: 'Generators & Turbines' | 'Wind Equipment' | 'Industrial Motors' | 'Busduct & Aux.';
  health: ProductHealth;
  progressPercent: number;
  plannedProgressPercent: number;
  costConsumptionPercent: number;
  customerCommitmentCode: string;
  customerName: string;
  dueDate: PlanningDay;
  projectedDeliveryDate: PlanningDay;
  delayDays: number;
  bottleneck?: string;
  targetRating: string;
}

export interface CriticalAlert {
  id: string;
  level: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  subtitle: string;
  detail: string;
  relatedEntityId?: string;
  delayDays?: number;
}

export interface UpcomingRisk {
  id: string;
  dateStr: string; // e.g. "Sep 22"
  title: string;
  description: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  impactArea: string;
}

export interface ProductFamilyStat {
  family: 'Generators & Turbines' | 'Wind Equipment' | 'Industrial Motors' | 'Busduct & Aux.';
  avgProgress: number;
  healthyCount: number;
  monitoringCount: number;
  criticalCount: number;
  onHoldCount: number;
  totalCount: number;
  physicalProgress: number;
  costConsumption: number;
}

export interface LessonLearnedItem {
  id: string;
  title: string;
  category: string;
  project: string;
  efficiencyGain: string;
  impactScore: number;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'APPLIED';
  author: string;
  createdAt: string;
  description: string;
}
