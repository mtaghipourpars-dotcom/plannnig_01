import React, { useState } from 'react';
import {
  Calendar,
  Lock,
  RotateCw,
  Globe,
  Database,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { PlanVersion, SapIntegrationState } from '../types';
import { translations, Language } from '../data/i18n';

interface HeaderProps {
  plan: PlanVersion;
  sapState: SapIntegrationState;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onDayClose: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  plan,
  sapState,
  language,
  onLanguageChange,
  onDayClose,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const t = translations[language];

  const handleConfirmClose = () => {
    onDayClose();
    setShowConfirmModal(false);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center font-bold text-white shadow-md shadow-cyan-900/40">
              MP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                  {t.appTitle}
                </h1>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  {plan.ruleSetVersion}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span>{t.tagline}</span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-400">{t.planningQuantum}</span>
              </p>
            </div>
          </div>

          {/* Temporal Status Indicators & Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            {/* Last Closed Fact Day */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300"
              title="Actual historical consumption and progress are immutable"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400 hidden sm:inline">{t.lastClosedDay}:</span>
              <span className="font-mono font-semibold text-slate-200">{plan.lastClosedDay}</span>
            </div>

            {/* Current Open Planning Day */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-cyan-950/60 border border-cyan-700/60 text-cyan-200"
              title="Next open rolling planning quantum"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-400/80 hidden sm:inline">{t.currentPlanningDay}:</span>
              <span className="font-mono font-bold text-cyan-100">{plan.effectiveDay}</span>
            </div>

            {/* SAP Integration Ping */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-emerald-950/40 border border-emerald-800/50 text-emerald-300"
              title={`System ID: ${sapState.systemId}`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono hidden md:inline">SAP RFC:</span>
              <span className="font-semibold">{sapState.rfcConnectionStatus}</span>
            </div>

            {/* Day Close Trigger */}
            <button
              id="btn-day-close"
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-medium transition-all shadow-sm hover:shadow-orange-900/30 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{t.closeDayButton}</span>
            </button>

            {/* Language Switcher */}
            <button
              id="btn-language-toggle"
              onClick={() => onLanguageChange(language === 'en' ? 'fa' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold">{language === 'en' ? 'فارسی' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Day Close Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold text-slate-100">
                {language === 'en' ? 'Confirm Daily Horizon Close' : 'تایید فرآیند بستن روز و انتقال افق'}
              </h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'en'
                ? `Closing day ${plan.effectiveDay} will advance the fact horizon. All recorded progress, confirmations, and actual material consumptions will be sealed into immutable facts. Planning begins from the subsequent day.`
                : `بستن روز ${plan.effectiveDay} افق فکت‌های قطعی را به پیش می‌برد. تمامی پیشرفت‌های ثبت‌شده و مصرف مواد اولیه به واقعیت‌های غیرقابل تغییر تبدیل می‌شوند.`}
            </p>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono space-y-1 text-slate-400">
              <div className="flex justify-between">
                <span>New Closed Fact Day:</span>
                <span className="text-amber-400 font-bold">{plan.effectiveDay}</span>
              </div>
              <div className="flex justify-between">
                <span>Next Planning Quantum:</span>
                <span className="text-cyan-400 font-bold">+1 Day</span>
              </div>
              <div className="flex justify-between">
                <span>Governing Rule:</span>
                <span className="text-slate-300">Invariant #1 (Past is Fact)</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                {t.cancel}
              </button>
              <button
                id="btn-confirm-day-close"
                onClick={handleConfirmClose}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'en' ? 'Seal & Advance' : 'بستن و ثبت قطعی'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
