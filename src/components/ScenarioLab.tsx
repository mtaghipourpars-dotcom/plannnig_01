import React, { useState } from 'react';
import {
  GitBranch,
  Plus,
  Play,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Clock,
  Send,
  Zap,
  Layers,
  Wrench,
  Package,
} from 'lucide-react';
import {
  Scenario,
  PlanVersion,
  PlanningEvent,
  WorkCenter,
  ProductionOrder,
  Material,
  EventType,
} from '../types';
import { simulateScenarioRecalculation } from '../engine/planningEngine';
import { translations, Language } from '../data/i18n';

interface ScenarioLabProps {
  plan: PlanVersion;
  scenarios: Scenario[];
  workCenters: WorkCenter[];
  orders: ProductionOrder[];
  materials: Material[];
  language: Language;
  onAddScenario: (newScenario: Scenario) => void;
  onPromoteToDecision: (scenario: Scenario) => void;
}

export const ScenarioLab: React.FC<ScenarioLabProps> = ({
  plan,
  scenarios,
  workCenters,
  orders,
  materials,
  language,
  onAddScenario,
  onPromoteToDecision,
}) => {
  const t = translations[language];
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    scenarios[0]?.id || ''
  );
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state for creating a new scenario
  const [scenarioName, setScenarioName] = useState('');
  const [eventType, setEventType] = useState<EventType>('MACHINE_BREAKDOWN');
  const [targetId, setTargetId] = useState(workCenters[0]?.id || '');
  const [effectiveDate, setEffectiveDate] = useState(plan.effectiveDay);
  const [durationDays, setDurationDays] = useState(2);
  const [newPriority, setNewPriority] = useState(1);
  const [injectedAmount, setInjectedAmount] = useState(75000);

  const activeScenario =
    scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const handleSimulateNewScenario = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent: PlanningEvent = {
      eventId: `EVT-${Date.now().toString().slice(-4)}`,
      eventType,
      occurredAt: new Date().toISOString(),
      effectivePlanningDay: effectiveDate,
      sourceSystem: 'SCENARIO_ENGINE',
      correlationId: `CORR-${Date.now()}`,
      targetType:
        eventType === 'MACHINE_BREAKDOWN'
          ? 'WORK_CENTER'
          : eventType === 'PRODUCTION_ORDER_PRIORITY_CHANGED'
          ? 'PRODUCTION_ORDER'
          : 'MATERIAL',
      targetId,
      confidence: 'HIGH',
      payload: {
        durationDays: Number(durationDays),
        newPriority: Number(newPriority),
        amountUsd: Number(injectedAmount),
        reasonCode: 'USER_SIMULATION_INJECTION',
      },
      description: `Injected ${eventType} event effective ${effectiveDate}`,
    };

    const simulated = simulateScenarioRecalculation(
      scenarioName || `What-If: ${eventType}`,
      plan,
      [newEvent],
      orders,
      workCenters,
      materials
    );

    onAddScenario(simulated);
    setSelectedScenarioId(simulated.id);
    setShowCreateModal(false);
    setScenarioName('');
  };

  return (
    <div className="space-y-6">
      {/* Header and Branch Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <span>{t.scenarioTitle}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {t.scenarioSubtitle}
          </p>
        </div>

        <button
          id="btn-create-scenario"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-900/30 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t.createScenario}</span>
        </button>
      </div>

      {/* Scenario Branch Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {scenarios.map((scen) => (
          <button
            key={scen.id}
            onClick={() => setSelectedScenarioId(scen.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              selectedScenarioId === scen.id
                ? 'bg-slate-800 text-cyan-300 border border-cyan-800/80 shadow-xs'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>{scen.name}</span>
            <span
              className={`w-2 h-2 rounded-full ${
                scen.feasibility === 'FEASIBLE_NOW'
                  ? 'bg-emerald-400'
                  : scen.feasibility === 'FEASIBLE_CONDITIONAL'
                  ? 'bg-amber-400'
                  : 'bg-rose-400'
              }`}
            ></span>
          </button>
        ))}
      </div>

      {/* Active Scenario Overview & Gating */}
      {activeScenario && (
        <div className="space-y-6">
          {/* Executive Metrics for Scenario */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Feasibility Gate */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                {t.feasibilityCheck}
              </span>
              <div className="mt-2 flex items-center gap-2">
                {activeScenario.feasibility === 'FEASIBLE_NOW' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : activeScenario.feasibility === 'FEASIBLE_CONDITIONAL' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                ) : (
                  <AlertOctagon className="w-5 h-5 text-rose-400" />
                )}
                <span
                  className={`text-sm font-bold ${
                    activeScenario.feasibility === 'FEASIBLE_NOW'
                      ? 'text-emerald-300'
                      : activeScenario.feasibility === 'FEASIBLE_CONDITIONAL'
                      ? 'text-amber-300'
                      : 'text-rose-300'
                  }`}
                >
                  {t[activeScenario.feasibility]}
                </span>
              </div>
              <p className="text-2xs text-slate-400 mt-2 font-mono leading-relaxed">
                {activeScenario.feasibilityReason || 'No violations detected.'}
              </p>
            </div>

            {/* Opportunity Cost */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                {t.opportunityCost}
              </span>
              <div className="mt-2 flex items-baseline gap-1 text-xl font-bold text-amber-400">
                <span>${activeScenario.opportunityCostUsd.toLocaleString()}</span>
                <span className="text-xs text-slate-400 font-normal">USD</span>
              </div>
              <p className="text-2xs text-slate-400 mt-2 font-mono">
                Impact on competing commitments
              </p>
            </div>

            {/* Estimated Schedule Delta */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                Schedule Delta
              </span>
              <div className="mt-2 flex items-baseline gap-1 text-xl font-bold">
                <span
                  className={
                    activeScenario.estimatedDelayDays <= 0
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }
                >
                  {activeScenario.estimatedDelayDays > 0 ? '+' : ''}
                  {activeScenario.estimatedDelayDays}
                </span>
                <span className="text-xs text-slate-400 font-normal">Days</span>
              </div>
              <p className="text-2xs text-slate-400 mt-2 font-mono">
                Critical path delivery shift
              </p>
            </div>

            {/* Direct Cost Impact */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                Budget Variance
              </span>
              <div className="mt-2 flex items-baseline gap-1 text-xl font-bold text-cyan-400">
                <span>
                  {activeScenario.costDeltaUsd >= 0 ? '+' : ''}$
                  {activeScenario.costDeltaUsd.toLocaleString()}
                </span>
              </div>
              <p className="text-2xs text-slate-400 mt-2 font-mono">
                Overtime / logistics delta
              </p>
            </div>
          </div>

          {/* Before vs After Impact Propagation (Mandate from 24-ui-ux.md) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>{t.beforeVsAfter}</span>
              </h3>
              <span className="text-2xs font-mono text-slate-400">
                Base Plan: {activeScenario.basePlanVersionId}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950/80 text-slate-400 font-mono text-2xs border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Impact Dimension</th>
                    <th className="py-2.5 px-3">Target Object</th>
                    <th className="py-2.5 px-3">Baseline State (Before)</th>
                    <th className="py-2.5 px-3">Simulated State (After)</th>
                    <th className="py-2.5 px-3">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {activeScenario.impacts.map((imp, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-semibold text-cyan-300">
                        {imp.type}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-200">
                        {imp.targetName}
                        <div className="text-2xs text-slate-400 font-normal mt-0.5">
                          {imp.description}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400">
                        {imp.beforeValue}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-100">
                        {imp.afterValue}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-2xs font-mono font-semibold ${
                            imp.impactSeverity === 'CRITICAL'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : imp.impactSeverity === 'WARNING'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {imp.impactSeverity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Promote to Governance Button */}
            <div className="pt-3 border-t border-slate-800/80 flex justify-end">
              <button
                id="btn-promote-decision"
                onClick={() => onPromoteToDecision(activeScenario)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/30 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.promoteToDecision}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal to Inject New Event / Create Scenario */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <form
            onSubmit={handleSimulateNewScenario}
            className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>{t.createScenario}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-200 text-xs"
              >
                {t.close}
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Scenario Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Overhaul VPI Tank & Fast-Track Damavand"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Typed Business Event</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="MACHINE_BREAKDOWN">
                    MACHINE_BREAKDOWN (Capacity Outage)
                  </option>
                  <option value="PRODUCTION_ORDER_PRIORITY_CHANGED">
                    PRODUCTION_ORDER_PRIORITY_CHANGED (Urgency Elevation)
                  </option>
                  <option value="MATERIAL_RECEIPT_DELAYED">
                    MATERIAL_RECEIPT_DELAYED (Supply Shortage)
                  </option>
                  <option value="CASH_INJECTED">
                    CASH_INJECTED (Procurement Acceleration Capital)
                  </option>
                </select>
              </div>

              {/* Conditional Target Input */}
              {eventType === 'MACHINE_BREAKDOWN' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Impacted Work Center</label>
                    <select
                      value={targetId}
                      onChange={(e) => setTargetId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      {workCenters.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.code} - {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Duration (Days)</label>
                    <input
                      type="number"
                      min="1"
                      max="14"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {eventType === 'PRODUCTION_ORDER_PRIORITY_CHANGED' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Target Production Order</label>
                    <select
                      value={targetId}
                      onChange={(e) => setTargetId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      {orders.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.orderNumber} - {o.productModel}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">New Priority (1 = Top)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={newPriority}
                      onChange={(e) => setNewPriority(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {eventType === 'MATERIAL_RECEIPT_DELAYED' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Material Stamping</label>
                    <select
                      value={targetId}
                      onChange={(e) => setTargetId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      {materials.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.code} ({m.name})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Delay (Days)</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-400 mb-1">Effective Planning Day</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                {t.cancel}
              </button>
              <button
                id="btn-run-simulation"
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-cyan-900/40"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t.runSimulation}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
