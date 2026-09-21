import React, { useState } from 'react';
import {
  Search,
  Filter,
  Lock,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ProductionOrder, PlanVersion, Operation } from '../types';
import { translations, Language } from '../data/i18n';

interface PlanningWorkspaceProps {
  plan: PlanVersion;
  orders: ProductionOrder[];
  language: Language;
  onOpenScenarioWithOrder?: (order: ProductionOrder) => void;
}

export const PlanningWorkspace: React.FC<PlanningWorkspaceProps> = ({
  plan,
  orders,
  language,
  onOpenScenarioWithOrder,
}) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductLine, setSelectedProductLine] = useState<string>('ALL');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(orders[0]?.id || null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sapOrderId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLine =
      selectedProductLine === 'ALL' || order.productLine === selectedProductLine;

    return matchesSearch && matchesLine;
  });

  const productLines = ['ALL', 'TURBOGENERATOR', 'WIND_GENERATOR', 'MOTOR', 'HYDROGENERATOR', 'BUSDUCT'];

  return (
    <div className="space-y-6">
      {/* Header & Principle Explanation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>{t.navPlanningWorkspace}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {t.pastFactsNote}
          </p>
        </div>

        {/* Temporal Legend */}
        <div className="flex items-center gap-3 text-2xs font-mono shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Closed Past (Fact)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
            <Calendar className="w-3 h-3 text-cyan-400" />
            <span>Scheduled Future (Plan)</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchOrders}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Product Line Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {productLines.map((line) => (
            <button
              key={line}
              onClick={() => setSelectedProductLine(line)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedProductLine === line
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {line === 'ALL' ? t.allLines : line}
            </button>
          ))}
        </div>
      </div>

      {/* Production Orders & Operations Timeline */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const isExpanded = expandedOrderId === order.id;
          const completedOps = order.operations.filter((op) => op.isPastFact || op.status === 'COMPLETED').length;
          const totalOps = order.operations.length;
          const orderProgress = Math.round((completedOps / totalOps) * 100);

          return (
            <div
              key={order.id}
              className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
            >
              {/* Order Header Row */}
              <div
                onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-850/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-slate-100">
                        {order.orderNumber}
                      </span>
                      <span className="text-2xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        SAP: {order.sapOrderId}
                      </span>
                      <span className="text-2xs px-2 py-0.5 rounded font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                        Priority {order.priority}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 font-medium">
                      {order.productModel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-right hidden md:block">
                    <span className="text-slate-500">Plan Window:</span>
                    <span className="text-slate-300 ml-1.5">
                      {order.plannedStart} <ArrowRight className="w-3 h-3 inline text-slate-500" /> {order.plannedEnd}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-20 sm:w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${orderProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-300 font-bold w-9 text-right">{orderProgress}%</span>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expandable Operations & Dependencies List */}
              {isExpanded && (
                <div className="border-t border-slate-800 bg-slate-950/80 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/80">
                    <span className="font-semibold text-slate-300">
                      Sequential Operations & Work Center Allocation
                    </span>
                    {onOpenScenarioWithOrder && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenScenarioWithOrder(order);
                        }}
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold transition-colors"
                      >
                        <span>Simulate Rescheduling in Scenario Lab</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    {order.operations.map((op) => (
                      <div
                        key={op.id}
                        className={`p-3 rounded-lg border text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors ${
                          op.isPastFact
                            ? 'bg-slate-900/90 border-slate-800 text-slate-400'
                            : op.status === 'BLOCKED'
                            ? 'bg-rose-950/30 border-rose-900/60 text-slate-200'
                            : op.status === 'IN_PROGRESS'
                            ? 'bg-cyan-950/30 border-cyan-800/60 text-slate-200'
                            : 'bg-slate-900/40 border-slate-800/80 text-slate-300'
                        }`}
                      >
                        {/* Operation Details */}
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-2xs ${
                              op.isPastFact
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            }`}
                          >
                            {op.sequence}
                          </span>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-200">
                                {language === 'fa' ? op.nameFa : op.name}
                              </span>
                              {op.isPastFact ? (
                                <span className="flex items-center gap-1 text-2xs px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 font-mono font-medium">
                                  <Lock className="w-2.5 h-2.5" />
                                  <span>Fact</span>
                                </span>
                              ) : (
                                <span
                                  className={`text-2xs px-1.5 py-0.5 rounded font-mono font-medium ${
                                    op.status === 'IN_PROGRESS'
                                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                                      : op.status === 'BLOCKED'
                                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                      : 'bg-slate-800 text-slate-400'
                                  }`}
                                >
                                  {op.status}
                                </span>
                              )}
                            </div>
                            <div className="text-slate-500 text-2xs font-mono mt-0.5">
                              Work Center: <strong className="text-slate-400">{op.workCenterId}</strong> • Hours: {op.requiredHours}h ({op.allocatedHoursPerDay}h/day)
                            </div>
                          </div>
                        </div>

                        {/* Scheduling & Progress */}
                        <div className="flex items-center gap-4 text-2xs font-mono shrink-0">
                          <div className="text-right">
                            <span className="text-slate-500">Timeline:</span>
                            <span className="text-slate-300 ml-1.5 font-bold">
                              {op.scheduledStart} → {op.scheduledEnd}
                            </span>
                          </div>

                          <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                op.isPastFact ? 'bg-slate-500' : 'bg-cyan-400'
                              }`}
                              style={{ width: `${op.progressPercent}%` }}
                            ></div>
                          </div>
                          <span className="w-8 text-right font-bold text-slate-300">{op.progressPercent}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
