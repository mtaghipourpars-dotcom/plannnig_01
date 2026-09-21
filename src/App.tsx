import React, { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  GitBranch,
  Zap,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import {
  initialPlanVersion,
  initialCommitments,
  initialProductionOrders,
  initialWorkCenters,
  initialMaterials,
  initialManpower,
  initialSapState,
  sampleScenarios,
  sampleDecisions,
} from './data/mockData';
import {
  PlanVersion,
  Commitment,
  ProductionOrder,
  WorkCenter,
  Material,
  ManpowerGroup,
  SapIntegrationState,
  Scenario,
  DecisionRecord,
} from './types';
import { advancePlanningDay } from './engine/planningEngine';
import { translations, Language } from './data/i18n';
import { Header } from './components/Header';
import { ExecutiveControlTower } from './components/ExecutiveControlTower';
import { PlanningWorkspace } from './components/PlanningWorkspace';
import { ScenarioLab } from './components/ScenarioLab';
import { ResourceBoard } from './components/ResourceBoard';
import { DecisionWorkbench } from './components/DecisionWorkbench';

export function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<
    'tower' | 'planning' | 'scenarios' | 'resources' | 'decisions'
  >('tower');

  const [plan, setPlan] = useState<PlanVersion>(initialPlanVersion);
  const [commitments, setCommitments] = useState<Commitment[]>(initialCommitments);
  const [orders, setOrders] = useState<ProductionOrder[]>(initialProductionOrders);
  const [workCenters, setWorkCenters] = useState<WorkCenter[]>(initialWorkCenters);
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [manpower, setManpower] = useState<ManpowerGroup[]>(initialManpower);
  const [sapState, setSapState] = useState<SapIntegrationState>(initialSapState);
  const [scenarios, setScenarios] = useState<Scenario[]>(sampleScenarios);
  const [decisions, setDecisions] = useState<DecisionRecord[]>(sampleDecisions);
  const [toast, setToast] = useState<string | null>(null);

  const t = translations[language];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Day Close handler: Advances planning quantum by 1 day and converts historical operations to immutable facts
  const handleDayClose = () => {
    const { updatedPlan, updatedOrders, updatedCommitments } = advancePlanningDay(
      plan,
      orders,
      commitments
    );
    setPlan(updatedPlan);
    setOrders(updatedOrders);
    setCommitments(updatedCommitments);
    showToast(t.dayCloseSuccess);
  };

  const handleAddScenario = (newScenario: Scenario) => {
    setScenarios([newScenario, ...scenarios]);
    showToast(
      language === 'en'
        ? `Scenario "${newScenario.name}" simulated successfully.`
        : `سناریوی "${newScenario.name}" با موفقیت شبیه‌سازی شد.`
    );
  };

  const handlePromoteToDecision = (scenario: Scenario) => {
    const newDecision: DecisionRecord = {
      id: `DEC-2026-${Date.now().toString().slice(-3)}`,
      scenarioId: scenario.id,
      scenarioName: scenario.name,
      decisionOwner: 'Planning Governance Board',
      approvalChain: [
        'Production Planner: Endorsed Alternative',
        'Lead Resource Controller: Feasibility Reviewed',
      ],
      objectiveVersion: 'OBJ-PARS-DELIVERY-COST-BALANCED',
      rationale:
        scenario.feasibilityReason ||
        'Recalculated alternative to mitigate production risk.',
      expectedImpact: `Schedule delta: ${scenario.estimatedDelayDays} days; Opportunity cost: $${scenario.opportunityCostUsd.toLocaleString()} USD`,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    setDecisions([newDecision, ...decisions]);
    setActiveTab('decisions');
    showToast(
      language === 'en'
        ? `Scenario promoted to Decision Workbench for executive review.`
        : `سناریو به میز تصمیم‌گیری مدیریتی ارسال شد.`
    );
  };

  const handleApproveDecision = (decisionId: string) => {
    setDecisions(
      decisions.map((d) =>
        d.id === decisionId
          ? {
              ...d,
              status: 'APPROVED',
              reviewedAt: new Date().toISOString(),
              approvalChain: [...d.approvalChain, 'Executive Committee: Approved'],
            }
          : d
      )
    );
    showToast(
      language === 'en'
        ? 'Decision endorsed & approved. Ready for SAP S/4HANA release.'
        : 'مصوبه تایید شد. آماده ارسال به SAP S/4HANA.'
    );
  };

  const handleWriteBackToSap = (decisionId: string, outboxPayload: any) => {
    const txId = `SAP-TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setDecisions(
      decisions.map((d) =>
        d.id === decisionId
          ? {
              ...d,
              status: 'WRITTEN_TO_SAP',
              sapSyncStatus: 'ACKNOWLEDGED',
              sapTransactionId: txId,
            }
          : d
      )
    );
    setSapState({
      ...sapState,
      lastReplicationTimestamp: new Date().toISOString(),
      pendingOutboxCount: 0,
    });
    showToast(
      language === 'en'
        ? `Plan write-back committed to SAP S/4HANA (${txId}).`
        : `برنامه با موفقیت در سیستم SAP S/4HANA ثبت گردید (${txId}).`
    );
  };

  const handleSelectCommitment = (comm: Commitment) => {
    setActiveTab('planning');
  };

  const navItems = [
    { id: 'tower', label: t.navControlTower, icon: LayoutDashboard },
    { id: 'planning', label: t.navPlanningWorkspace, icon: Layers },
    { id: 'scenarios', label: t.navScenarioLab, icon: GitBranch },
    { id: 'resources', label: t.navResourceBoard, icon: Zap },
    { id: 'decisions', label: t.navDecisionWorkbench, icon: ShieldCheck },
  ];

  return (
    <div
      dir={language === 'fa' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-200"
    >
      {/* Platform Header */}
      <Header
        plan={plan}
        sapState={sapState}
        language={language}
        onLanguageChange={setLanguage}
        onDayClose={handleDayClose}
      />

      {/* Primary Navigation Tabs */}
      <nav className="border-b border-slate-800 bg-slate-900/60 sticky top-[61px] z-30 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-900/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'tower' && (
          <ExecutiveControlTower
            plan={plan}
            commitments={commitments}
            workCenters={workCenters}
            decisions={decisions}
            materials={materials}
            language={language}
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onSelectCommitment={handleSelectCommitment}
          />
        )}

        {activeTab === 'planning' && (
          <PlanningWorkspace
            plan={plan}
            orders={orders}
            language={language}
            onOpenScenarioWithOrder={(order) => {
              setActiveTab('scenarios');
            }}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenarioLab
            plan={plan}
            scenarios={scenarios}
            workCenters={workCenters}
            orders={orders}
            materials={materials}
            language={language}
            onAddScenario={handleAddScenario}
            onPromoteToDecision={handlePromoteToDecision}
          />
        )}

        {activeTab === 'resources' && (
          <ResourceBoard
            workCenters={workCenters}
            materials={materials}
            manpower={manpower}
            language={language}
          />
        )}

        {activeTab === 'decisions' && (
          <DecisionWorkbench
            decisions={decisions}
            scenarios={scenarios}
            sapState={sapState}
            language={language}
            onApproveDecision={handleApproveDecision}
            onWriteBackToSap={handleWriteBackToSap}
          />
        )}
      </main>

      {/* Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-800 text-slate-100 shadow-2xl animate-fade-in text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-200 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-slate-500 text-2xs font-mono text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MAPNA Generator Engineering & Manufacturing (PARS) • Dynamic Planning Platform</span>
          <span>SAP S/4HANA Integration Contract v2.1 • RFC Idempotent</span>
        </div>
      </footer>
    </div>
  );
}
