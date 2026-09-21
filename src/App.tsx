import React, { useState } from 'react';
import {
  CheckCircle2,
  X,
  AlertTriangle,
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
  initialProducts,
  initialFamilyStats,
  initialCriticalAlerts,
  initialWorkCenterUtilization,
  initialMaterialUtilization,
  initialCapacityPlan,
  initialUpcomingRisks,
  initialLessonsLearned,
} from './data/controlTowerData';
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
  ProductItem,
  CriticalAlert,
  LessonLearnedItem,
} from './types';
import { advancePlanningDay } from './engine/planningEngine';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { ProductPortfolioView } from './components/ProductPortfolioView';
import { PlanningWorkspace } from './components/PlanningWorkspace';
import { ScenarioLab } from './components/ScenarioLab';
import { ResourceBoard } from './components/ResourceBoard';
import { DecisionWorkbench } from './components/DecisionWorkbench';
import { LessonLearnedView } from './components/LessonLearnedView';
import { ReportsAnalyticsView } from './components/ReportsAnalyticsView';
import { AdminModal } from './components/AdminModal';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminModalTab, setAdminModalTab] = useState<NavigationTab | null>(null);

  // Operational State
  const [plan, setPlan] = useState<PlanVersion>(initialPlanVersion);
  const [commitments, setCommitments] = useState<Commitment[]>(initialCommitments);
  const [orders, setOrders] = useState<ProductionOrder[]>(initialProductionOrders);
  const [workCenters, setWorkCenters] = useState<WorkCenter[]>(initialWorkCenters);
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [manpower, setManpower] = useState<ManpowerGroup[]>(initialManpower);
  const [sapState, setSapState] = useState<SapIntegrationState>(initialSapState);
  const [scenarios, setScenarios] = useState<Scenario[]>(sampleScenarios);
  const [decisions, setDecisions] = useState<DecisionRecord[]>(sampleDecisions);

  // Control Tower Specific State
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [alerts, setAlerts] = useState<CriticalAlert[]>(initialCriticalAlerts);
  const [lessons, setLessons] = useState<LessonLearnedItem[]>(initialLessonsLearned);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Execute Day-Close: Advances planning day
  const handleDayClose = () => {
    const { updatedPlan, updatedOrders, updatedCommitments } = advancePlanningDay(
      plan,
      orders,
      commitments
    );
    setPlan(updatedPlan);
    setOrders(updatedOrders);
    setCommitments(updatedCommitments);
    showToast(`Day-Close executed successfully for ${plan.effectiveDay}. Past facts locked.`);
  };

  const handleSelectTab = (tab: NavigationTab) => {
    if (tab === 'master-data' || tab === 'settings' || tab === 'users') {
      setAdminModalTab(tab);
    } else {
      setActiveTab(tab);
    }
  };

  const handleSelectProduct = (product: ProductItem | null) => {
    setSelectedProduct(product);
    if (product) {
      setActiveTab('portfolio');
    }
  };

  const handleSelectAlert = (alert: CriticalAlert) => {
    if (alert.relatedEntityId?.startsWith('PRD-')) {
      const p = products.find((x) => x.id === alert.relatedEntityId);
      if (p) {
        setSelectedProduct(p);
        setActiveTab('portfolio');
        return;
      }
    }
    if (alert.relatedEntityId === 'LL-001') {
      setActiveTab('lessons');
      return;
    }
    setActiveTab('scenarios');
  };

  const handleAddScenario = (newScenario: Scenario) => {
    setScenarios([newScenario, ...scenarios]);
    showToast(`Scenario "${newScenario.name}" simulated successfully.`);
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
    showToast('Scenario promoted to Decision Workbench for executive review.');
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
    showToast('Decision endorsed & approved. Ready for SAP S/4HANA release.');
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
    showToast(`Plan write-back committed to SAP S/4HANA (${txId}).`);
  };

  const handleApproveLesson = (id: string) => {
    setLessons(
      lessons.map((l) =>
        l.id === id ? { ...l, status: 'APPLIED' } : l
      )
    );
    showToast('Lesson learned approved and promoted to best practice standard.');
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 flex flex-col antialiased">
      {/* Sidebar Component (Fixed on desktop, drawer on mobile) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Layout with Desktop Left Padding */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <TopHeader
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          alerts={alerts}
          currentDate="2026-09-18"
          onAdvanceDay={handleDayClose}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectAlert={handleSelectAlert}
        />

        {/* Dynamic Main Workspace Body */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {/* 1. Home / Executive Dashboard (matches image.png exactly) */}
          {activeTab === 'home' && (
            <ExecutiveDashboard
              products={products}
              familyStats={initialFamilyStats}
              alerts={alerts}
              risks={initialUpcomingRisks}
              workCenterUtilization={initialWorkCenterUtilization}
              materialUtilization={initialMaterialUtilization}
              capacityPlan={initialCapacityPlan}
              onNavigateToTab={(tab) => handleSelectTab(tab as NavigationTab)}
              onSelectProduct={handleSelectProduct}
              onSelectAlert={handleSelectAlert}
            />
          )}

          {/* 2. Product Portfolio (All 20 products with family breakdown) */}
          {activeTab === 'portfolio' && (
            <ProductPortfolioView
              products={products}
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
              onBackToDashboard={() => setActiveTab('home')}
            />
          )}

          {/* 3. Production Planning (Gantt & operations sequence) */}
          {activeTab === 'planning' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Production Planning & Sequence Operations
                  </h2>
                  <p className="text-xs text-slate-500">
                    Routing schedule, past-fact locking, and daily quantum dispatch
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  ← Return to Dashboard
                </button>
              </div>

              <PlanningWorkspace
                plan={plan}
                orders={orders}
                language="en"
                onOpenScenarioWithOrder={(order) => {
                  setActiveTab('scenarios');
                }}
              />
            </div>
          )}

          {/* 4. Resource Management */}
          {activeTab === 'resources' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Resource Management & Work Centers
                  </h2>
                  <p className="text-xs text-slate-500">
                    Capacity utilization, autoclave dwell cycles, and raw materials
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  ← Return to Dashboard
                </button>
              </div>

              <ResourceBoard
                workCenters={workCenters}
                materials={materials}
                manpower={manpower}
                language="en"
              />
            </div>
          )}

          {/* 5. Risk & Scenario Analysis */}
          {activeTab === 'scenarios' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Risk & Scenario Simulation Lab
                  </h2>
                  <p className="text-xs text-slate-500">
                    What-if disruption sandbox, breakdown propagation, and opportunity cost
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  ← Return to Dashboard
                </button>
              </div>

              <ScenarioLab
                plan={plan}
                scenarios={scenarios}
                workCenters={workCenters}
                orders={orders}
                materials={materials}
                language="en"
                onAddScenario={handleAddScenario}
                onPromoteToDecision={handlePromoteToDecision}
              />
            </div>
          )}

          {/* 6. Decision Governance */}
          {activeTab === 'decisions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Decision Governance & SAP S/4HANA Write-Back
                  </h2>
                  <p className="text-xs text-slate-500">
                    Formal approval audit trails, RFC transactional guarantees, and outbox state
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  ← Return to Dashboard
                </button>
              </div>

              <DecisionWorkbench
                decisions={decisions}
                scenarios={scenarios}
                sapState={sapState}
                language="en"
                onApproveDecision={handleApproveDecision}
                onWriteBackToSap={handleWriteBackToSap}
              />
            </div>
          )}

          {/* 7. Lesson Learned */}
          {activeTab === 'lessons' && (
            <LessonLearnedView
              lessons={lessons}
              onApproveLesson={handleApproveLesson}
              onBackToDashboard={() => setActiveTab('home')}
            />
          )}

          {/* 8. Reports & Analytics */}
          {activeTab === 'reports' && (
            <ReportsAnalyticsView
              familyStats={initialFamilyStats}
              onBackToDashboard={() => setActiveTab('home')}
            />
          )}
        </main>

        {/* Global Toast Notification */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 shadow-2xl text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast}</span>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-200 ml-2 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Administration Modal */}
        <AdminModal
          activeAdminTab={adminModalTab}
          onClose={() => setAdminModalTab(null)}
        />

        {/* Application Footer */}
        <footer className="border-t border-slate-200/80 bg-white py-3.5 px-6 text-slate-500 text-[11px] font-medium text-center">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              MAPNA GENERATOR Engineering & Manufacturing Co. (PARS) • Production Planning & Execution Control Tower
            </span>
            <span className="font-mono text-slate-400">
              System Online • v1.0.0
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default App;
