import React from 'react';
import { Database, Settings, Users, X, CheckCircle2, Shield, Key } from 'lucide-react';
import { NavigationTab } from './Sidebar';

interface AdminModalProps {
  activeAdminTab: NavigationTab | null;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ activeAdminTab, onClose }) => {
  if (!activeAdminTab) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            {activeAdminTab === 'master-data' && (
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
            )}
            {activeAdminTab === 'settings' && (
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </div>
            )}
            {activeAdminTab === 'users' && (
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            )}
            <div>
              <h3 className="text-sm font-bold text-slate-900 capitalize">
                {activeAdminTab === 'master-data'
                  ? 'Master Data Catalog'
                  : activeAdminTab === 'settings'
                  ? 'System Settings & Engine Parameters'
                  : 'User & Role Management'}
              </h3>
              <p className="text-[11px] text-slate-500">
                MAPNA Generator (PARS) Administration Console
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        {activeAdminTab === 'master-data' && (
          <div className="space-y-3 text-xs">
            <p className="text-slate-600">
              Active configuration schemas and master records synchronized from SAP S/4HANA:
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-800">4 Product Families & 20 Models</div>
                  <div className="text-[10px] text-slate-500">Bill of Materials (BOM) Level 3 verified</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                  VERIFIED
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-800">6 Key Work Centers & Routings</div>
                  <div className="text-[10px] text-slate-500">VPI, Balancing, CNC-04, CNC-07, Assembly, Testing</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'settings' && (
          <div className="space-y-3 text-xs">
            <p className="text-slate-600">
              Operational parameters and constraint resolution weights:
            </p>
            <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Planning Engine Version:</span>
                <span className="font-mono font-bold text-slate-800">RS-PARS-2026.3</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Quantum Planning Unit:</span>
                <span className="font-mono font-bold text-slate-800">1 Working Day (Fixed)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">SAP S/4HANA Connection:</span>
                <span className="font-mono font-bold text-emerald-600">RFC Online (PROD_100)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Past-Fact Immutability:</span>
                <span className="font-mono font-bold text-emerald-600">Enforced</span>
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'users' && (
          <div className="space-y-3 text-xs">
            <p className="text-slate-600">
              User credentials and authorization boundaries:
            </p>
            <div className="space-y-2">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Javad Dehghan (Current User)</div>
                  <div className="text-[11px] text-slate-500">CEO • Executive Override & SAP Write Authority</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                  ACTIVE
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">P. Taghipour</div>
                  <div className="text-[11px] text-slate-500">Lead Planning Engineer • Scenario Simulation Authority</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[10px]">
                  PLANNER
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
