import {
  PlanVersion,
  ProductionOrder,
  WorkCenter,
  Material,
  PlanningEvent,
  Scenario,
  ScenarioImpact,
  FeasibilityStatus,
  DecisionRecord,
  Commitment,
} from '../types';

export function advancePlanningDay(
  currentPlan: PlanVersion,
  orders: ProductionOrder[],
  commitments: Commitment[]
): {
  updatedPlan: PlanVersion;
  updatedOrders: ProductionOrder[];
  updatedCommitments: Commitment[];
} {
  // Parse current lastClosedDay and advance by 1 calendar day
  const currentDate = new Date(currentPlan.lastClosedDay);
  currentDate.setDate(currentDate.getDate() + 1);
  const newClosedDay = currentDate.toISOString().split('T')[0];

  const nextDate = new Date(newClosedDay);
  nextDate.setDate(nextDate.getDate() + 1);
  const newEffectiveDay = nextDate.toISOString().split('T')[0];

  const updatedPlan: PlanVersion = {
    ...currentPlan,
    versionNumber: currentPlan.versionNumber + 1,
    lastClosedDay: newClosedDay,
    effectiveDay: newEffectiveDay,
    createdAt: new Date().toISOString(),
  };

  // Convert operations that fell on or before newClosedDay into immutable facts
  const updatedOrders = orders.map((order) => {
    let orderProgressTotal = 0;
    const updatedOps = order.operations.map((op) => {
      if (op.scheduledEnd <= newClosedDay) {
        orderProgressTotal += 100;
        return {
          ...op,
          status: 'COMPLETED' as const,
          progressPercent: 100,
          isPastFact: true,
        };
      } else if (op.scheduledStart <= newClosedDay && op.scheduledEnd > newClosedDay) {
        // Operation partially in progress across boundary
        orderProgressTotal += 50;
        return {
          ...op,
          status: 'IN_PROGRESS' as const,
          progressPercent: Math.max(op.progressPercent, 45),
          isPastFact: false,
        };
      }
      return op;
    });

    return {
      ...order,
      operations: updatedOps,
    };
  });

  const updatedCommitments = commitments.map((comm) => {
    // Recalculate delivery percentage slightly
    return {
      ...comm,
      deliveredPercent: Math.min(100, comm.deliveredPercent + 2),
    };
  });

  return { updatedPlan, updatedOrders, updatedCommitments };
}

export function simulateScenarioRecalculation(
  scenarioName: string,
  basePlan: PlanVersion,
  events: PlanningEvent[],
  orders: ProductionOrder[],
  workCenters: WorkCenter[],
  materials: Material[]
): Scenario {
  const impacts: ScenarioImpact[] = [];
  let feasibility: FeasibilityStatus = 'FEASIBLE_NOW';
  let feasibilityReason = 'All operations fit within available machine hours and inventory thresholds.';
  let opportunityCostUsd = 0;
  let estimatedDelayDays = 0;
  let costDeltaUsd = 0;

  for (const event of events) {
    if (event.eventType === 'MACHINE_BREAKDOWN') {
      const duration = Number(event.payload.durationDays || 2);
      const wc = workCenters.find((w) => w.id === event.targetId) || workCenters[0];
      
      impacts.push({
        type: 'RESOURCE_OVERLOAD',
        targetName: wc.name,
        beforeValue: `${wc.capacityHoursPerDay} hrs/day available`,
        afterValue: `0 hrs/day for ${duration} days`,
        impactSeverity: 'CRITICAL',
        description: `Stoppage on ${wc.name} halts all queued operations.`,
      });

      impacts.push({
        type: 'SCHEDULE_SHIFT',
        targetName: 'Critical Work Queue',
        beforeValue: 'On Schedule',
        afterValue: `+${duration + 2} Days Cascading Delay`,
        impactSeverity: 'CRITICAL',
        description: `Operations waiting on ${wc.code} are forced to slip past committed windows.`,
      });

      opportunityCostUsd += duration * 18000;
      estimatedDelayDays += duration + 2;
      costDeltaUsd += duration * 7500;
      feasibility = 'NOT_FEASIBLE';
      feasibilityReason = `Hard constraint breached: Machine ${wc.code} unavailable for ${duration} days causes critical commitment slippage.`;
    }

    if (event.eventType === 'PRODUCTION_ORDER_PRIORITY_CHANGED') {
      const newPriority = Number(event.payload.newPriority || 1);
      const targetOrder = orders.find((o) => o.id === event.targetId) || orders[0];

      impacts.push({
        type: 'SCHEDULE_SHIFT',
        targetName: targetOrder.orderNumber,
        beforeValue: `Priority ${targetOrder.priority}`,
        afterValue: `Priority ${newPriority} (High Urgency)`,
        impactSeverity: 'INFO',
        description: `Pre-empts secondary orders on heavy machining and winding lines.`,
      });

      if (newPriority === 1) {
        impacts.push({
          type: 'COST_VARIANCE',
          targetName: 'Accelerated Shift Premium',
          beforeValue: '$0 Overtime',
          afterValue: '+$14,500 Shift Differential',
          impactSeverity: 'WARNING',
          description: 'Requires authorizing weekend work for Stator Winding crew.',
        });

        opportunityCostUsd += 8500; // Delay induced on pre-empted orders
        estimatedDelayDays -= 3; // Accelerated target
        costDeltaUsd += 14500;
        if (feasibility === 'FEASIBLE_NOW') {
          feasibility = 'FEASIBLE_CONDITIONAL';
          feasibilityReason = 'Requires authorization of $14,500 overtime premium and client consent on secondary order schedule adjust.';
        }
      }
    }

    if (event.eventType === 'MATERIAL_RECEIPT_DELAYED') {
      const delayDays = Number(event.payload.delayDays || 5);
      const mat = materials.find((m) => m.id === event.targetId) || materials[1];

      impacts.push({
        type: 'MATERIAL_SHORTAGE',
        targetName: mat.name,
        beforeValue: `Supply Date: ${basePlan.effectiveDay}`,
        afterValue: `Delayed by +${delayDays} Days`,
        impactSeverity: 'CRITICAL',
        description: `Stock level drops below minimum safety threshold (${mat.safetyStock} ${mat.unit}).`,
      });

      opportunityCostUsd += delayDays * 9000;
      estimatedDelayDays += delayDays;
      feasibility = 'NOT_FEASIBLE';
      feasibilityReason = `Material supply delay creates stockout for ${mat.code} on line.`;
    }

    if (event.eventType === 'CASH_INJECTED') {
      const amount = Number(event.payload.amountUsd || 100000);
      impacts.push({
        type: 'COST_VARIANCE',
        targetName: 'Working Capital Allocation',
        beforeValue: 'Baseline Allocation',
        afterValue: `+$${amount.toLocaleString()} Injected`,
        impactSeverity: 'INFO',
        description: `Enables supplier prepayment for priority airfreight of copper bars and mica tape.`,
      });
      costDeltaUsd -= amount * 0.05;
      if (feasibility !== 'NOT_FEASIBLE') {
        feasibility = 'FEASIBLE_NOW';
        feasibilityReason = 'Capital injection dissolves procurement bottlenecks.';
      }
    }
  }

  // If no specific event rules triggered, produce baseline impact
  if (impacts.length === 0) {
    impacts.push({
      type: 'SCHEDULE_SHIFT',
      targetName: 'Baseline Verification',
      beforeValue: 'Current Plan',
      afterValue: 'Simulated Equivalent',
      impactSeverity: 'INFO',
      description: 'No active discrepancies found across planning quantum.',
    });
  }

  return {
    id: `SCEN-${Date.now().toString().slice(-4)}`,
    name: scenarioName,
    basePlanVersionId: basePlan.id,
    horizon: basePlan.horizon,
    events,
    feasibility,
    feasibilityReason,
    opportunityCostUsd,
    estimatedDelayDays,
    costDeltaUsd,
    impacts,
    createdAt: new Date().toISOString(),
    status: 'SIMULATED',
  };
}

export function buildSapOutboxRecord(
  decision: DecisionRecord,
  scenario: Scenario
): Record<string, any> {
  return {
    idempotencyKey: `IDEMP-${decision.id}-${Date.now()}`,
    correlationId: `CORR-S4HANA-PLAN-${scenario.id}`,
    sourceSystem: 'MAPNA_PARS_PLANNING_PLATFORM',
    targetSystem: 'SAP_S4HANA_PRD',
    interfaceContract: 'RFC_PP_PRODUCTION_ORDER_RESCHEDULE_v2',
    timestamp: new Date().toISOString(),
    payload: {
      decisionId: decision.id,
      scenarioName: scenario.name,
      approvedBy: decision.decisionOwner,
      promotedPlanVersion: `PLAN-2026-PROM-${scenario.id}`,
      actionType: 'BULK_DISPATCH_RESCHEDULE',
      eventsCount: scenario.events.length,
      impactedOrders: ['PO-88002914', 'PO-88003102'],
      governanceStatus: 'APPROVED_AND_LOCKED',
    },
  };
}
