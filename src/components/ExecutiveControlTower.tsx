import React, { useState } from 'react';
import {
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Zap,
  TrendingUp,
  Activity,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import {
  Commitment,
  WorkCenter,
  DecisionRecord,
  Material,
  PlanVersion,
} from '../types';
import { translations, Language } from '../data/i18n';

interface ExecutiveControlTowerProps {
  plan: PlanVersion;
  commitments: Commitment[];
  workCenters: WorkCenter[];
  decisions: DecisionRecord[];
  materials: Material[];
  language: Language;
  onNavigateTab: (tab: string) => void;
  onSelectCommitment: (comm: Commitment) => void;
}

export const ExecutiveControlTower: React.FC<ExecutiveControlTowerProps> = ({
  plan,
  commitments,
  workCenters,
  decisions,
  materials,
  language,
  onNavigateTab,
  onSelectCommitment,
}) => {
  const t = translations[language];
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const atRiskCount = commitments.filter(
    (c) => c.status === 'AT_RISK' || c.status === 'CRITICAL'
  ).length;

  const bottleneckCount = workCenters.filter(
    (w) => w.bottleneckRisk === 'CRITICAL' || w.bottleneckRisk === 'WARNING'
  ).length;

  const pendingDecisionsCount = decisions.filter((d) => d.status === 'PENDING').length;

  const onTimePercentage = Math.round(
    ((commitments.length - atRiskCount) / commitments.length) * 100
  );

  const totalPotentialPenalties = commitments.reduce((sum, c) => {
    if (c.status === 'CRITICAL' || c.status === 'AT_RISK') {
      return sum + c.penaltyPerDayUsd * 3; // Est 3 days exposure
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner with Provenance */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <h2 className="text-base font-bold text-slate-100">{t.navControlTower}</h2>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
              v{plan.versionNumber} • {plan.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t.syntheticWarning}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.dataFreshness}:</span>
            <span className="text-cyan-300 font-semibold">{t.justNow}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit:</span>
            <span className="text-emerald-300 font-semibold">SOX & ISO Compliant</span>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* At-Risk Commitments */}
        <div
          id="card-at-risk-commitments"
          onClick={() => onNavigateTab('planning')}
          className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 hover:border-amber-700/60 transition-all cursor-pointer group shadow-sm hover:shadow-amber-950/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">{t.commitmentsAtRisk}</span>
            <span className="p-2 rounded-lg bg-amber-950/60 border border-amber-800/40 text-amber-400 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-400">{atRiskCount}</span>
            <span className="text-xs text-slate-400">/ {commitments.length} contracts</span>
          </div>
          <div className="mt-2 text-xs text-amber-300/80 font-mono">
            Exposure: ~${totalPotentialPenalties.toLocaleString()} USD
          </div>
        </div>

        {/* Resource Crises / Bottlenecks */}
        <div
          id="card-resource-bottlenecks"
          onClick={() => onNavigateTab('resources')}
          className="p-5 rounded-xl bg-slate-900/90 border border-rose-900/40 hover:border-rose-700/60 transition-all cursor-pointer group shadow-sm hover:shadow-rose-950/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">{t.resourceCrises}</span>
            <span className="p-2 rounded-lg bg-rose-950/60 border border-rose-800/40 text-rose-400 group-hover:scale-110 transition-transform">
              <Flame className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-rose-400">{bottleneckCount}</span>
            <span className="text-xs text-slate-400">machines overloaded</span>
          </div>
          <div className="mt-2 text-xs text-rose-300/80 font-mono">
            Top: VPI Autoclave (94% Load)
          </div>
        </div>

        {/* Pending Executive Decisions */}
        <div
          id="card-pending-decisions"
          onClick={() => onNavigateTab('decisions')}
          className="p-5 rounded-xl bg-slate-900/90 border border-cyan-900/40 hover:border-cyan-700/60 transition-all cursor-pointer group shadow-sm hover:shadow-cyan-950/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">{t.pendingDecisions}</span>
            <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-cyan-400">{pendingDecisionsCount || 1}</span>
            <span className="text-xs text-slate-400">in governance workflow</span>
          </div>
          <div className="mt-2 text-xs text-cyan-300/80 font-mono">
            Damavand Fast-Track + Overtime
          </div>
        </div>

        {/* Delivery Reliability Index */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">{t.deliveryReliability}</span>
            <span className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-400">{onTimePercentage}%</span>
            <span className="text-xs text-emerald-400/80 font-semibold">Target: 95%</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 font-mono">
            Rolling 90-Day Production Horizon
          </div>
        </div>
      </div>

      {/* Main Grid: At-Risk Deliveries & Bottlenecks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* At-Risk Power Generation Commitments (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>
                  {language === 'en'
                    ? 'Active Power Plant Generation Commitments'
                    : 'تعهدات فعال ساخت تجهیزات نیروگاهی و صنعتی'}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'en'
                  ? 'Click any project to inspect critical path operations and schedule buffers.'
                  : 'برای بررسی مسیر بحرانی و ذخایر زمانی بر روی هر پروژه کلیک کنید.'}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('planning')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors"
            >
              <span>{t.viewDetails}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {commitments.map((comm) => {
              const isDanger = comm.status === 'CRITICAL' || comm.status === 'AT_RISK';
              return (
                <div
                  key={comm.id}
                  onClick={() => onSelectCommitment(comm)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isDanger
                      ? 'bg-amber-950/20 border-amber-900/50 hover:bg-amber-950/30'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-200">
                          {comm.productModel}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-mono font-medium ${
                            comm.status === 'CRITICAL'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : comm.status === 'AT_RISK'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {comm.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{comm.customer}</span>
                        <span className="text-slate-600">•</span>
                        <span>Rating: <strong className="text-slate-300">{comm.targetRating}</strong></span>
                        <span className="text-slate-600">•</span>
                        <span className="font-mono text-cyan-300">Due: {comm.dueDate}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono text-slate-300">
                        Progress: <span className="font-bold text-cyan-400">{comm.deliveredPercent}%</span>
                      </div>
                      <div className="w-28 sm:w-36 h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            comm.status === 'CRITICAL'
                              ? 'bg-rose-500'
                              : comm.status === 'AT_RISK'
                              ? 'bg-amber-500'
                              : 'bg-cyan-500'
                          }`}
                          style={{ width: `${comm.deliveredPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {comm.criticalPathBottleneck && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-amber-400">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Critical constraint: <strong>{comm.criticalPathBottleneck}</strong></span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Key Work Centers & Bottleneck Risk */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{t.workCenters}</span>
            </h3>
            <button
              onClick={() => onNavigateTab('resources')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors"
            >
              <span>{t.viewDetails}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {workCenters.map((wc) => (
              <div
                key={wc.id}
                className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">
                    {language === 'fa' ? wc.nameFa : wc.name}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded font-mono text-2xs ${
                      wc.bottleneckRisk === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : wc.bottleneckRisk === 'WARNING'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {wc.utilizationRate}% Load
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-400 font-mono text-2xs">
                  <span>{wc.code}</span>
                  <span>{wc.capacityHoursPerDay} hrs/day capacity</span>
                </div>

                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      wc.utilizationRate >= 90
                        ? 'bg-rose-500'
                        : wc.utilizationRate >= 75
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${wc.utilizationRate}%` }}
                  ></div>
                </div>

                {wc.activeBreakdowns.length > 0 && (
                  <div className="text-2xs text-rose-400 flex items-center gap-1 pt-1">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span>Active event: {wc.activeBreakdowns[0].reasonCode}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
