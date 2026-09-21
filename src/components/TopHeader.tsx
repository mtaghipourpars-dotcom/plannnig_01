import React, { useState } from 'react';
import {
  Search,
  Bell,
  Calendar,
  ChevronDown,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  LogOut,
  RotateCcw,
} from 'lucide-react';
import { CriticalAlert } from '../types';

interface TopHeaderProps {
  onOpenMobileMenu: () => void;
  alerts: CriticalAlert[];
  currentDate: string;
  onAdvanceDay?: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSelectAlert: (alert: CriticalAlert) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenMobileMenu,
  alerts,
  currentDate,
  onAdvanceDay,
  searchQuery,
  onSearchChange,
  onSelectAlert,
}) => {
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  return (
    <header className="h-16 bg-[#0F172A] border-b border-slate-800 text-slate-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & Control Tower Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
            Production Planning & Execution Control Tower
          </h1>
          <p className="text-[11px] text-slate-400 font-medium">
            From Commitment to Actual Result
          </p>
        </div>
      </div>

      {/* Right: Search, Alerts, Date, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Search Bar with ⌘ shortcut */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search.."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1 py-0.5 rounded text-[10px] text-slate-400 bg-slate-800 border border-slate-700 font-mono">
            ⌘
          </div>
        </div>

        {/* Notifications Bell with count '1' */}
        <div className="relative">
          <button
            onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
            className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-xs">
              1
            </span>
          </button>

          {showAlertsDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-3 z-50 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Critical Alerts & Notifications</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {alerts.length} Total Alerts
                </span>
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto">
                {alerts.map((al) => (
                  <div
                    key={al.id}
                    onClick={() => {
                      onSelectAlert(al);
                      setShowAlertsDropdown(false);
                    }}
                    className="p-2.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          al.level === 'CRITICAL'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : al.level === 'WARNING'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-blue-950 text-blue-300 border border-blue-800'
                        }`}
                      >
                        {al.level}
                      </span>
                      {al.delayDays && (
                        <span className="text-[10px] text-rose-400 font-mono">
                          +{al.delayDays} days delay
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-200">
                      {al.title}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {al.subtitle}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Date Selector Badge: 2026-09-18 (Shanbeh) */}
        <div className="relative">
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-xs text-slate-200 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono">{currentDate} (Shanbeh)</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showDateDropdown && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-3 z-50 space-y-3">
              <div className="text-xs font-bold text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-800">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Planning Quantum Horizon</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Active Planning Day is <strong className="text-white">{currentDate}</strong>. Past days are immutable facts.
              </p>
              {onAdvanceDay && (
                <button
                  onClick={() => {
                    onAdvanceDay();
                    setShowDateDropdown(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Execute Day-Close (+1 Day)</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Avatar: JD - Javad Dehghan - CEO */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-white shadow-xs">
              JD
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-200 leading-tight">
                Javad Dehghan
              </span>
              <span className="text-[10px] text-slate-400 font-medium">CEO</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 space-y-1">
              <div className="px-3 py-2 border-b border-slate-800">
                <div className="text-xs font-bold text-white">Javad Dehghan</div>
                <div className="text-[10px] text-slate-400">Executive Authority • CEO</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>SAP S/4HANA Write Authorized</span>
                </div>
              </div>

              <div className="p-1">
                <button
                  onClick={() => setShowUserDropdown(false)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile & Security</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
