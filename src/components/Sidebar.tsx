import React from 'react';
import {
  Home,
  Package,
  Layers,
  Zap,
  GitBranch,
  ShieldCheck,
  BookOpen,
  BarChart2,
  Database,
  Settings,
  Users,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

export type NavigationTab =
  | 'home'
  | 'portfolio'
  | 'planning'
  | 'resources'
  | 'scenarios'
  | 'decisions'
  | 'lessons'
  | 'reports'
  | 'master-data'
  | 'settings'
  | 'users';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
}) => {
  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home, hasArrow: false },
    { id: 'portfolio', label: 'Product Portfolio', icon: Package, hasArrow: true },
    { id: 'planning', label: 'Production Planning', icon: Layers, hasArrow: true },
    { id: 'resources', label: 'Resource Management', icon: Zap, hasArrow: true },
    { id: 'scenarios', label: 'Risk & Scenario Analysis', icon: GitBranch, hasArrow: true },
    { id: 'decisions', label: 'Decision Governance', icon: ShieldCheck, hasArrow: true },
    { id: 'lessons', label: 'Lesson Learned', icon: BookOpen, hasArrow: true },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart2, hasArrow: true },
  ];

  const adminNavItems = [
    { id: 'master-data', label: 'Master Data', icon: Database, hasArrow: true },
    { id: 'settings', label: 'System Settings', icon: Settings, hasArrow: true },
    { id: 'users', label: 'User Management', icon: Users, hasArrow: true },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0F172A] border-r border-slate-800 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2.5">
            {/* MAPNA Red/White Emblem */}
            <div className="w-8 h-8 rounded bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center p-1.5 shadow-md shadow-red-950/40 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
                <path
                  d="M4 18L12 4L14 7.5L8 18H4Z"
                  fill="currentColor"
                />
                <path
                  d="M10 18L16 7.5L18 11L14 18H10Z"
                  fill="currentColor"
                  fillOpacity="0.85"
                />
                <path
                  d="M16 18L20 11L22 14.5L20 18H16Z"
                  fill="currentColor"
                  fillOpacity="0.7"
                />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-black tracking-wider text-white uppercase leading-tight">
                MAPNA GENERATOR
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight truncate">
                Engineering & Manufacturing Co. (PARS)
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-nav-${item.id}`}
                  onClick={() => {
                    onSelectTab(item.id as NavigationTab);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/40 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.hasArrow && (
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Administration Section */}
          <div className="space-y-1 pt-2 border-t border-slate-800/80">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
              Administration
            </div>
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-nav-${item.id}`}
                  onClick={() => {
                    onSelectTab(item.id as NavigationTab);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#0B132B]/50 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300">System Online</span>
          </div>
          <span className="font-mono text-slate-500 text-[10px]">v1.0.0</span>
        </div>
      </aside>
    </>
  );
};
