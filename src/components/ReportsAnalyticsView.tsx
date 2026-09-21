import React from 'react';
import {
  BarChart2,
  TrendingUp,
  PieChart,
  Calendar,
  Download,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { ProductFamilyStat } from '../types';

interface ReportsAnalyticsViewProps {
  familyStats: ProductFamilyStat[];
  onBackToDashboard: () => void;
}

export const ReportsAnalyticsView: React.FC<ReportsAnalyticsViewProps> = ({
  familyStats,
  onBackToDashboard,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Reports & Executive Analytics
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Performance metrics, variance analyses, and delivery milestones
            </p>
          </div>
        </div>

        <button
          onClick={onBackToDashboard}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
        >
          ← Return to Dashboard
        </button>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Contractual On-Time Delivery (OTD)</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">88.4%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">+2.1% against FY2025</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Average Schedule Variance</span>
          <div className="text-2xl font-black text-rose-600 mt-1 font-mono">+3.2 Days</div>
          <span className="text-[11px] text-slate-500 font-medium">Driven by Heavy Machining CNC-04</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Cost-to-Progress Ratio</span>
          <div className="text-2xl font-black text-indigo-600 mt-1 font-mono">1.08</div>
          <span className="text-[11px] text-amber-600 font-semibold">Mild budget consumption lead</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">SAP S/4HANA Outbox Sync</span>
          <div className="text-2xl font-black text-emerald-600 mt-1 font-mono">100%</div>
          <span className="text-[11px] text-slate-500 font-medium">RFC Connection Online</span>
        </div>
      </div>

      {/* Detailed Variance Table */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Manufacturing Family Variance Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Product Family</th>
                <th className="py-2.5 px-3">Active Units</th>
                <th className="py-2.5 px-3">Physical Progress</th>
                <th className="py-2.5 px-3">Cost Consumption</th>
                <th className="py-2.5 px-3">Cost-Progress Gap</th>
                <th className="py-2.5 px-3">Risk Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {familyStats.map((fam, idx) => {
                const gap = fam.costConsumption - fam.physicalProgress;
                return (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{fam.family}</td>
                    <td className="py-3 px-3 font-mono text-slate-700">{fam.totalCount} Units</td>
                    <td className="py-3 px-3 font-mono font-semibold text-blue-600">
                      {fam.physicalProgress}%
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-indigo-600">
                      {fam.costConsumption}%
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-600">
                      +{gap}%
                    </td>
                    <td className="py-3 px-3">
                      {fam.criticalCount > 0 ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          {fam.criticalCount} Critical Units
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Controlled
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
