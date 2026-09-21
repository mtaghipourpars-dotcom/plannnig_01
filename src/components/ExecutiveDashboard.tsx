import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  FileText,
  Shield,
  Settings,
  TrendingUp,
  AlertCircle,
  Calendar,
  ChevronRight,
  ArrowRight,
  Layers,
  Zap,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown,
  Cpu,
  Truck,
  BookOpen,
} from 'lucide-react';
import {
  ProductItem,
  ProductFamilyStat,
  CriticalAlert,
  UpcomingRisk,
} from '../types';

interface ExecutiveDashboardProps {
  products: ProductItem[];
  familyStats: ProductFamilyStat[];
  alerts: CriticalAlert[];
  risks: UpcomingRisk[];
  workCenterUtilization: any[];
  materialUtilization: any[];
  capacityPlan: any[];
  onNavigateToTab: (tab: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onSelectAlert: (alert: CriticalAlert) => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  products,
  familyStats,
  alerts,
  risks,
  workCenterUtilization,
  materialUtilization,
  capacityPlan,
  onNavigateToTab,
  onSelectProduct,
  onSelectAlert,
}) => {
  const [resourceTab, setResourceTab] = useState<'workCenters' | 'material' | 'capacityPlan'>(
    'workCenters'
  );
  const [dashboardView, setDashboardView] = useState('Executive Summary');

  // Metric counts
  const totalActiveProducts = products.length; // 20
  const criticalProductsCount = products.filter((p) => p.health === 'CRITICAL').length; // 2
  const monitoringProductsCount = products.filter((p) => p.health === 'MONITORING').length; // 5
  const commitmentsAtRiskCount = 7; // From screenshot
  const keyBottlenecksCount = 2; // From screenshot

  // Health distribution for donut
  const healthyCount = products.filter((p) => p.health === 'HEALTHY').length; // 12
  const onHoldCount = products.filter((p) => p.health === 'ON_HOLD').length; // 1

  return (
    <div className="space-y-5">
      {/* 1. Page Sub-Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-100/80 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
              Executive Dashboard
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Real-time view of production commitments, progress and risks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Dropdown */}
          <div className="relative">
            <button
              onClick={() => {}}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300/80 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
            >
              <span>View: {dashboardView}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* Last Update */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium pl-2 border-l border-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Last Update</span>
            <span className="font-mono text-slate-700 font-bold">2026-09-18 14:32</span>
          </div>
        </div>
      </div>

      {/* 2. Top 5 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total Active Products */}
        <div
          onClick={() => onNavigateToTab('portfolio')}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Total Active Products</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {totalActiveProducts}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium truncate">
            Family: 4 | Under Production
          </div>
        </div>

        {/* Card 2: Critical Products */}
        <div
          onClick={() => onNavigateToTab('portfolio')}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-rose-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Critical Products</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {criticalProductsCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium truncate">
            Require Immediate Decision
          </div>
        </div>

        {/* Card 3: Products Under Monitoring */}
        <div
          onClick={() => onNavigateToTab('portfolio')}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-amber-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Products Under Monitoring</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {monitoringProductsCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium truncate">
            Need Close Monitoring
          </div>
        </div>

        {/* Card 4: Customer Commitments at Risk */}
        <div
          onClick={() => onNavigateToTab('scenarios')}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Customer Commitments at Risk</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {commitmentsAtRiskCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium truncate">
            of 20 Active Commitments
          </div>
        </div>

        {/* Card 5: Key Bottlenecks (Next 30 Days) */}
        <div
          onClick={() => onNavigateToTab('resources')}
          className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Key Bottlenecks (Next 30 Days)</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {keyBottlenecksCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium truncate">
            Machining & Critical Material
          </div>
        </div>
      </div>

      {/* 3. Middle Row: 3 Visual Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 1: Product Health Overview (Donut Chart) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Product Health Overview
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Status of {totalActiveProducts} active products
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4 py-3">
            {/* SVG Donut Chart */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="#F1F5F9"
                  strokeWidth="16"
                  fill="transparent"
                />
                {/* 1. Healthy: 60% (12/20) => Circumference = 282.74, 60% = 169.64 */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="#22C55E"
                  strokeWidth="16"
                  strokeDasharray="169.64 282.74"
                  strokeDashoffset="0"
                  fill="transparent"
                  strokeLinecap="butt"
                />
                {/* 2. Monitoring: 25% (5/20) => 70.68, offset = -169.64 */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="#F59E0B"
                  strokeWidth="16"
                  strokeDasharray="70.68 282.74"
                  strokeDashoffset="-169.64"
                  fill="transparent"
                  strokeLinecap="butt"
                />
                {/* 3. Critical: 10% (2/20) => 28.27, offset = -240.32 */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="#EF4444"
                  strokeWidth="16"
                  strokeDasharray="28.27 282.74"
                  strokeDashoffset="-240.32"
                  fill="transparent"
                  strokeLinecap="butt"
                />
                {/* 4. On Hold: 5% (1/20) => 14.13, offset = -268.59 */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="#CBD5E1"
                  strokeWidth="16"
                  strokeDasharray="14.13 282.74"
                  strokeDashoffset="-268.59"
                  fill="transparent"
                  strokeLinecap="butt"
                />
              </svg>

              {/* Center Counter */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-slate-900 leading-none">
                  {totalActiveProducts}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
                  Products
                </span>
              </div>
            </div>

            {/* Legend with exact labels, counts, and percentages */}
            <div className="w-full space-y-1.5 text-xs">
              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-700 font-medium">Healthy</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-slate-800">{healthyCount}</span>
                  <span className="text-slate-400 text-[11px]">60%</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-slate-700 font-medium">Monitoring</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-slate-800">{monitoringProductsCount}</span>
                  <span className="text-slate-400 text-[11px]">25%</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="text-slate-700 font-medium">Critical</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-slate-800">{criticalProductsCount}</span>
                  <span className="text-slate-400 text-[11px]">10%</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  <span className="text-slate-700 font-medium">On Hold</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-slate-800">{onHoldCount}</span>
                  <span className="text-slate-400 text-[11px]">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Production Progress (Dual Bar Chart) */}
        <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  Production Progress
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Physical progress vs. planned (average)
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] font-medium shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-slate-600">Physical Progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <span className="text-slate-600">Cost Consumption</span>
              </div>
            </div>
          </div>

          {/* Grouped Bar Visualizer */}
          <div className="relative pt-6 pb-2">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-mono">
              <div className="w-full flex items-center gap-2">
                <span className="w-7 text-right">100%</span>
                <div className="flex-1 border-b border-slate-100"></div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="w-7 text-right">80%</span>
                <div className="flex-1 border-b border-slate-100"></div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="w-7 text-right">60%</span>
                <div className="flex-1 border-b border-slate-100"></div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="w-7 text-right">40%</span>
                <div className="flex-1 border-b border-slate-100"></div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="w-7 text-right">20%</span>
                <div className="flex-1 border-b border-slate-100"></div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="w-7 text-right">0%</span>
                <div className="flex-1 border-b border-slate-200"></div>
              </div>
            </div>

            {/* Bars */}
            <div className="relative pl-10 pr-2 h-44 flex items-end justify-around gap-2">
              {familyStats.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                  <div className="w-full max-w-[56px] flex items-end justify-center gap-1.5 h-full">
                    {/* Blue Bar: Physical */}
                    <div className="w-5 flex flex-col items-center justify-end h-full group">
                      <span className="text-[10px] font-mono font-bold text-blue-700 mb-1">
                        {item.physicalProgress}%
                      </span>
                      <div
                        className="w-full bg-blue-600 rounded-t-sm transition-all duration-500 shadow-xs"
                        style={{ height: `${item.physicalProgress}%` }}
                      ></div>
                    </div>

                    {/* Purple/Indigo Bar: Cost */}
                    <div className="w-5 flex flex-col items-center justify-end h-full group">
                      <span className="text-[10px] font-mono font-bold text-indigo-700 mb-1">
                        {item.costConsumption}%
                      </span>
                      <div
                        className="w-full bg-indigo-500 rounded-t-sm transition-all duration-500 shadow-xs"
                        style={{ height: `${item.costConsumption}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Family Category Label */}
                  <span className="text-[10px] text-slate-600 font-semibold text-center mt-2.5 h-7 leading-tight max-w-[80px]">
                    {item.family}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Critical Alerts & Actions */}
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Critical Alerts & Actions</span>
            </h3>
            <button
              onClick={() => onNavigateToTab('scenarios')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-2 py-2">
            {alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                onClick={() => onSelectAlert(alert)}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/80 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  {/* Badge */}
                  <span
                    className={`mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider uppercase font-mono shrink-0 ${
                      alert.level === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : alert.level === 'WARNING'
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {alert.level}
                  </span>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {alert.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {alert.subtitle}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Lower Row: 3 Data Table Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 4: Product Families Table */}
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Product Families</h3>
                <p className="text-[11px] text-slate-500 font-medium">Progress & Health by family</p>
              </div>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                    <th className="py-2 px-1 font-semibold">Family</th>
                    <th className="py-2 px-2 font-semibold">Avg. Progress</th>
                    <th className="py-2 px-1 font-semibold text-right">Health Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {familyStats.map((fam, idx) => (
                    <tr
                      key={idx}
                      onClick={() => onNavigateToTab('portfolio')}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 px-1 font-semibold text-slate-800 flex items-center gap-2">
                        {/* Thumbnail indicator */}
                        <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                          {idx === 0 && <Zap className="w-3.5 h-3.5 text-blue-600" />}
                          {idx === 1 && <Cpu className="w-3.5 h-3.5 text-teal-600" />}
                          {idx === 2 && <Settings className="w-3.5 h-3.5 text-indigo-600" />}
                          {idx === 3 && <Layers className="w-3.5 h-3.5 text-amber-600" />}
                        </div>
                        <span className="truncate max-w-[110px] sm:max-w-[140px]">
                          {fam.family}
                        </span>
                      </td>

                      <td className="py-2.5 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-14 sm:w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${fam.avgProgress}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-[11px] font-bold text-slate-700">
                            {fam.avgProgress}%
                          </span>
                        </div>
                      </td>

                      <td className="py-2.5 px-1 text-right">
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold">
                          <span className="inline-flex items-center gap-0.5 text-emerald-600">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>{fam.healthyCount}</span>
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-amber-600">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span>{fam.monitoringCount}</span>
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-rose-600">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            <span>{fam.criticalCount}</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-right">
            <button
              onClick={() => onNavigateToTab('portfolio')}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 5: Resource Utilization (Next 30 Days) */}
        <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Resource Utilization <span className="font-normal text-slate-500 text-xs">(Next 30 Days)</span>
              </h3>

              {/* Sub-Tabs: Work Centers | Material | Capacity Plan */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setResourceTab('workCenters')}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    resourceTab === 'workCenters'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Work Centers
                </button>
                <button
                  onClick={() => setResourceTab('material')}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    resourceTab === 'material'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Material
                </button>
                <button
                  onClick={() => setResourceTab('capacityPlan')}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    resourceTab === 'capacityPlan'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Capacity Plan
                </button>
              </div>
            </div>

            {/* Content for Work Centers Tab */}
            {resourceTab === 'workCenters' && (
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                      <th className="py-2 px-1 font-semibold">Work Center</th>
                      <th className="py-2 px-2 font-semibold">Status</th>
                      <th className="py-2 px-2 font-semibold">Daily Capacity</th>
                      <th className="py-2 px-1 font-semibold">Utilization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {workCenterUtilization.map((wc) => (
                      <tr
                        key={wc.id}
                        onClick={() => onNavigateToTab('resources')}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="py-2 px-1 font-semibold text-slate-800 truncate max-w-[140px]">
                          {wc.name}
                        </td>
                        <td className="py-2 px-2">
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              wc.status === 'Limited'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                wc.status === 'Limited' ? 'bg-rose-500' : 'bg-emerald-500'
                              }`}
                            ></span>
                            {wc.status}
                          </span>
                        </td>
                        <td className="py-2 px-2 font-mono text-[11px] text-slate-600">
                          {wc.dailyCapacity}
                        </td>
                        <td className="py-2 px-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-slate-700 w-8">
                              {wc.utilization}%
                            </span>
                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  wc.utilization >= 90
                                    ? 'bg-rose-500'
                                    : wc.utilization >= 60
                                    ? 'bg-blue-500'
                                    : 'bg-emerald-500'
                                }`}
                                style={{ width: `${wc.utilization}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Content for Material Tab */}
            {resourceTab === 'material' && (
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                      <th className="py-2 px-1 font-semibold">Strategic Material</th>
                      <th className="py-2 px-2 font-semibold">Stock Level</th>
                      <th className="py-2 px-2 font-semibold">Safety Stock</th>
                      <th className="py-2 px-1 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {materialUtilization.map((mat) => (
                      <tr
                        key={mat.id}
                        onClick={() => onNavigateToTab('resources')}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="py-2 px-1 font-semibold text-slate-800">
                          <div>{mat.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{mat.code}</div>
                        </td>
                        <td className="py-2 px-2 font-mono text-[11px] font-bold text-slate-700">
                          {mat.stock}
                        </td>
                        <td className="py-2 px-2 font-mono text-[11px] text-slate-500">
                          {mat.safetyStock}
                        </td>
                        <td className="py-2 px-1">
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              mat.statusType === 'LIMITED'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {mat.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Content for Capacity Plan Tab */}
            {resourceTab === 'capacityPlan' && (
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                      <th className="py-2 px-1 font-semibold">Horizon Week</th>
                      <th className="py-2 px-2 font-semibold">Available</th>
                      <th className="py-2 px-2 font-semibold">Allocated</th>
                      <th className="py-2 px-1 font-semibold">Load Factor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {capacityPlan.map((cp, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-1 font-semibold text-slate-800">{cp.week}</td>
                        <td className="py-2 px-2 font-mono text-[11px] text-slate-600">
                          {cp.availableHours} h
                        </td>
                        <td className="py-2 px-2 font-mono text-[11px] font-bold text-slate-800">
                          {cp.allocatedHours} h
                        </td>
                        <td className="py-2 px-1">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                              cp.utilization >= 85
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            {cp.utilization}% ({cp.status})
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Card 6: Upcoming Risks (30 Days) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Upcoming Risks (30 Days)</span>
            </h3>
          </div>

          <div className="space-y-2 py-2">
            {risks.map((risk) => (
              <div
                key={risk.id}
                onClick={() => onNavigateToTab('scenarios')}
                className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Calendar Chip */}
                  <div className="w-10 h-10 rounded-lg bg-red-50/80 border border-red-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-red-600 uppercase tracking-tighter leading-none">
                      {risk.dateStr.split(' ')[0]}
                    </span>
                    <span className="text-xs font-black text-slate-800 leading-tight">
                      {risk.dateStr.split(' ')[1]}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {risk.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {risk.description}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Ribbon: Production Flow — From Commitment to Actual Result */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
          Production Flow — From Commitment to Actual Result
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Step 1: Commitments */}
          <div
            onClick={() => onNavigateToTab('portfolio')}
            className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">1. Commitments</div>
              <div className="text-[10px] text-slate-500 truncate">Customer Orders & Contracts</div>
              <div className="text-[10px] font-bold text-blue-600 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>20 active</span>
              </div>
            </div>
          </div>

          {/* Step 2: Planning */}
          <div
            onClick={() => onNavigateToTab('planning')}
            className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">2. Planning</div>
              <div className="text-[10px] text-slate-500 truncate">MRP & Resource Planning</div>
              <div className="text-[10px] font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>In Progress</span>
              </div>
            </div>
          </div>

          {/* Step 3: Execution */}
          <div
            onClick={() => onNavigateToTab('planning')}
            className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 hover:border-indigo-300 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-xs">
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">3. Execution</div>
              <div className="text-[10px] text-slate-500 truncate">Production & Assembly</div>
              <div className="text-[10px] font-bold text-indigo-600 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                <span>On Track</span>
              </div>
            </div>
          </div>

          {/* Step 4: Quality */}
          <div
            onClick={() => onNavigateToTab('planning')}
            className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 hover:border-amber-300 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">4. Quality</div>
              <div className="text-[10px] text-slate-500 truncate">Inspection & Testing</div>
              <div className="text-[10px] font-bold text-amber-600 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                <span>2 Pending</span>
              </div>
            </div>
          </div>

          {/* Step 5: Delivery */}
          <div
            onClick={() => onNavigateToTab('portfolio')}
            className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 hover:border-teal-300 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 shadow-xs">
              <Truck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">5. Delivery</div>
              <div className="text-[10px] text-slate-500 truncate">Shipment to Customer</div>
              <div className="text-[10px] font-bold text-teal-600 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                <span>On Schedule</span>
              </div>
            </div>
          </div>

          {/* Step 6: Learn & Improve */}
          <div
            onClick={() => onNavigateToTab('lessons')}
            className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 hover:border-slate-400 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">6. Learn & Improve</div>
              <div className="text-[10px] text-slate-500 truncate">Lessons Learned</div>
              <div className="text-[10px] font-bold text-slate-700 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                <span>2 Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
