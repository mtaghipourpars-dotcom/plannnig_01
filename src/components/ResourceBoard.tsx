import React, { useState } from 'react';
import {
  Zap,
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingDown,
  Layers,
} from 'lucide-react';
import { WorkCenter, Material, ManpowerGroup } from '../types';
import { translations, Language } from '../data/i18n';

interface ResourceBoardProps {
  workCenters: WorkCenter[];
  materials: Material[];
  manpower: ManpowerGroup[];
  language: Language;
}

export const ResourceBoard: React.FC<ResourceBoardProps> = ({
  workCenters,
  materials,
  manpower,
  language,
}) => {
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState<
    'MACHINES' | 'MATERIALS' | 'MANPOWER' | 'CASH'
  >('MACHINES');

  return (
    <div className="space-y-6">
      {/* Header and Category Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>{t.navResourceBoard}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'en'
              ? 'Multi-dimensional scarce resources: Machines, Strategic Materials, Certified Manpower & Milestone Cash.'
              : 'منابع کمیاب چندبعدی: ماشین‌آلات سنگین، مواد اولیه راهبردی، نیروی انسانی و جریان نقدینگی.'}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveCategory('MACHINES')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeCategory === 'MACHINES'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{t.workCenters}</span>
          </button>

          <button
            onClick={() => setActiveCategory('MATERIALS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeCategory === 'MATERIALS'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{t.materials}</span>
          </button>

          <button
            onClick={() => setActiveCategory('MANPOWER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeCategory === 'MANPOWER'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.manpower}</span>
          </button>

          <button
            onClick={() => setActiveCategory('CASH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeCategory === 'CASH'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{t.cashFlow}</span>
          </button>
        </div>
      </div>

      {/* View 1: Heavy Work Centers & Machines */}
      {activeCategory === 'MACHINES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workCenters.map((wc) => (
            <div
              key={wc.id}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {wc.code}
                </span>
                <span
                  className={`text-2xs font-mono font-bold px-2 py-0.5 rounded ${
                    wc.bottleneckRisk === 'CRITICAL'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : wc.bottleneckRisk === 'WARNING'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {wc.utilizationRate}% Load
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  {language === 'fa' ? wc.nameFa : wc.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Daily Available Capacity: <strong className="text-slate-200">{wc.capacityHoursPerDay} hrs/day</strong>
                </p>
              </div>

              {/* Load Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-2xs font-mono text-slate-400">
                  <span>Capacity Utilization</span>
                  <span>{wc.utilizationRate}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      wc.utilizationRate >= 90
                        ? 'bg-rose-500'
                        : wc.utilizationRate >= 75
                        ? 'bg-amber-500'
                        : 'bg-cyan-500'
                    }`}
                    style={{ width: `${wc.utilizationRate}%` }}
                  ></div>
                </div>
              </div>

              {wc.activeBreakdowns.length > 0 && (
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Active Incident / Outage</span>
                  </div>
                  <div className="font-mono text-2xs text-rose-300/80">
                    Reason: {wc.activeBreakdowns[0].reasonCode} (Eff: {wc.activeBreakdowns[0].effectiveDay})
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* View 2: Strategic Materials & Stampings */}
      {activeCategory === 'MATERIALS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.map((mat) => (
            <div
              key={mat.id}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-slate-800 text-cyan-400">
                    <Package className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">
                      {language === 'fa' ? mat.nameFa : mat.name}
                    </h3>
                    <span className="text-2xs font-mono text-slate-400">{mat.code}</span>
                  </div>
                </div>

                <span
                  className={`text-2xs font-mono font-bold px-2 py-0.5 rounded ${
                    mat.status === 'SHORTAGE'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : mat.status === 'WARNING'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {mat.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-950 text-xs font-mono text-center">
                <div>
                  <div className="text-slate-500 text-2xs">{t.onHand}</div>
                  <div className="text-slate-100 font-bold mt-0.5">
                    {mat.onHandStock} {mat.unit}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-2xs">{t.safetyStock}</div>
                  <div className="text-amber-400 font-bold mt-0.5">
                    {mat.safetyStock} {mat.unit}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-2xs">Unit Value</div>
                  <div className="text-cyan-300 font-bold mt-0.5">
                    ${mat.unitCostUsd.toLocaleString()}
                  </div>
                </div>
              </div>

              {mat.firstShortageDate && (
                <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/30 p-2.5 rounded-lg border border-amber-900/50">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    {t.firstShortage}: <strong>{mat.firstShortageDate}</strong>
                  </span>
                </div>
              )}

              {/* Time-Phased Projected Balance */}
              <div className="space-y-1 text-xs">
                <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                  Rolling Balance Projection
                </span>
                <div className="space-y-1.5 pt-1">
                  {mat.projections.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-2xs font-mono p-1.5 rounded bg-slate-950/60 border border-slate-800/60"
                    >
                      <span className="text-slate-400">{p.day}</span>
                      <span className="text-slate-500">
                        Supply: +{p.supply} / Demand: -{p.demand}
                      </span>
                      <span
                        className={`font-bold ${
                          p.projectedBalance < mat.safetyStock
                            ? 'text-amber-400'
                            : 'text-slate-200'
                        }`}
                      >
                        Bal: {p.projectedBalance} {mat.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 3: Certified Specialized Manpower */}
      {activeCategory === 'MANPOWER' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {manpower.map((mp) => {
            const allocationRate = Math.round(
              (mp.headcountAllocated / mp.headcountAvailable) * 100
            );

            return (
              <div
                key={mp.id}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-slate-800 text-cyan-400">
                      <Users className="w-4 h-4" />
                    </span>
                    <h3 className="text-sm font-bold text-slate-100">
                      {language === 'fa' ? mp.skillNameFa : mp.skillName}
                    </h3>
                  </div>
                  <span className="text-2xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {mp.qualificationLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-2">
                  <span className="text-slate-400">Headcount Utilization:</span>
                  <span className="text-slate-200 font-bold">
                    {mp.headcountAllocated} / {mp.headcountAvailable} Active
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      allocationRate >= 90 ? 'bg-amber-500' : 'bg-cyan-500'
                    }`}
                    style={{ width: `${allocationRate}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 4: Milestone Cash Flow */}
      {activeCategory === 'CASH' && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Projected Milestone Cash Flow vs Procurement Outlays</span>
            </h3>
            <span className="text-2xs font-mono text-slate-400">Base Currency: USD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-2xs text-slate-500 font-mono">Q4 Projected Inflow (Milestones)</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">$4,850,000</div>
              <span className="text-2xs text-slate-400 font-mono mt-1 block">Damavand & Karun milestones</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-2xs text-slate-500 font-mono">Committed Procurement Outflow</span>
              <div className="text-xl font-bold text-rose-400 mt-1">-$3,120,000</div>
              <span className="text-2xs text-slate-400 font-mono mt-1 block">Copper, steel & rotor shafts</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-2xs text-slate-500 font-mono">Net Operating Free Cash</span>
              <div className="text-xl font-bold text-cyan-400 mt-1">+$1,730,000</div>
              <span className="text-2xs text-slate-400 font-mono mt-1 block">Adequate working buffer</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
