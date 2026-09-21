import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Database,
  ArrowRight,
  Send,
  FileText,
  UserCheck,
  Lock,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { DecisionRecord, Scenario, SapIntegrationState } from '../types';
import { buildSapOutboxRecord } from '../engine/planningEngine';
import { translations, Language } from '../data/i18n';

interface DecisionWorkbenchProps {
  decisions: DecisionRecord[];
  scenarios: Scenario[];
  sapState: SapIntegrationState;
  language: Language;
  onApproveDecision: (decisionId: string) => void;
  onWriteBackToSap: (decisionId: string, outboxPayload: any) => void;
}

export const DecisionWorkbench: React.FC<DecisionWorkbenchProps> = ({
  decisions,
  scenarios,
  sapState,
  language,
  onApproveDecision,
  onWriteBackToSap,
}) => {
  const t = translations[language];
  const [selectedDecisionId, setSelectedDecisionId] = useState<string>(
    decisions[0]?.id || ''
  );
  const [outboxPayloadViewer, setOutboxPayloadViewer] = useState<any>(null);

  const activeDecision =
    decisions.find((d) => d.id === selectedDecisionId) || decisions[0];

  const matchedScenario = scenarios.find(
    (s) => s.id === activeDecision?.scenarioId
  );

  const handleWriteToSap = (decision: DecisionRecord) => {
    if (!matchedScenario) return;
    const outboxRecord = buildSapOutboxRecord(decision, matchedScenario);
    onWriteBackToSap(decision.id, outboxRecord);
    setOutboxPayloadViewer(outboxRecord);
  };

  return (
    <div className="space-y-6">
      {/* Header and Principles */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>{t.decisionTitle}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {t.decisionSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 text-2xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>RFC Interface Contract:</span>
          <span className="text-slate-200 font-semibold">{sapState.activeContractVersion}</span>
        </div>
      </div>

      {/* Decision List / Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: List of decisions */}
        <div className="space-y-3">
          <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider block">
            Governed Decision Records
          </span>

          <div className="space-y-2">
            {decisions.map((dec) => (
              <div
                key={dec.id}
                onClick={() => {
                  setSelectedDecisionId(dec.id);
                  setOutboxPayloadViewer(null);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedDecisionId === dec.id
                    ? 'bg-slate-800 border-cyan-500/80 shadow-sm'
                    : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    {dec.id}
                  </span>
                  <span
                    className={`text-2xs font-mono font-bold px-2 py-0.5 rounded ${
                      dec.status === 'WRITTEN_TO_SAP'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : dec.status === 'APPROVED'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {dec.status}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-200 mt-2">
                  {dec.scenarioName}
                </div>

                <div className="text-2xs text-slate-400 mt-1 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-slate-400" />
                  <span>Authority: {dec.decisionOwner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column (2 cols): Active Decision Inspector */}
        {activeDecision ? (
          <div className="lg:col-span-2 p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-2xs font-mono text-cyan-400 font-semibold">
                  Record ID: {activeDecision.id}
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">
                  {activeDecision.scenarioName}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {activeDecision.status === 'PENDING' && (
                  <button
                    id="btn-approve-decision"
                    onClick={() => onApproveDecision(activeDecision.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t.approvePlan}</span>
                  </button>
                )}

                {(activeDecision.status === 'APPROVED' ||
                  activeDecision.status === 'WRITTEN_TO_SAP') && (
                  <button
                    id="btn-write-to-sap"
                    disabled={activeDecision.status === 'WRITTEN_TO_SAP'}
                    onClick={() => handleWriteToSap(activeDecision)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                      activeDecision.status === 'WRITTEN_TO_SAP'
                        ? 'bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>
                      {activeDecision.status === 'WRITTEN_TO_SAP'
                        ? 'Acknowledged by SAP S/4HANA'
                        : t.writeToSap}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Rationale & Expected Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-2xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  {t.rationale}
                </span>
                <p className="text-slate-300 leading-relaxed pt-1">
                  {activeDecision.rationale}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-2xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Expected Impact & Objective Value
                </span>
                <p className="text-cyan-300 font-mono leading-relaxed pt-1">
                  {activeDecision.expectedImpact}
                </p>
              </div>
            </div>

            {/* Multi-tier Approval Chain */}
            <div className="space-y-2">
              <span className="text-2xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Governed Endorsement & Sign-Off Chain
              </span>
              <div className="space-y-1.5">
                {activeDecision.approvalChain.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transactional Outbox Payload Viewer (Invariant #9: No Silent Writes) */}
            {(outboxPayloadViewer || activeDecision.sapTransactionId) && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    <span>{t.sapOutbox}</span>
                  </span>
                  {activeDecision.sapTransactionId && (
                    <span className="text-2xs font-mono text-slate-400">
                      Tx ID: {activeDecision.sapTransactionId}
                    </span>
                  )}
                </div>

                <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-2xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  {JSON.stringify(
                    outboxPayloadViewer || {
                      idempotencyKey: `IDEMP-${activeDecision.id}-FINAL`,
                      sourceSystem: 'MAPNA_PARS_PLANNING_PLATFORM',
                      targetSystem: 'SAP_S4HANA_PRD',
                      transactionId: activeDecision.sapTransactionId,
                      status: 'ACKNOWLEDGED',
                      committedPlanVersion: 'PLAN-2026-BASE-v15',
                      writebackAt: activeDecision.reviewedAt || new Date().toISOString(),
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-2 p-12 text-center text-slate-500 rounded-xl bg-slate-900 border border-slate-800">
            Select a decision record from the left column to inspect governance details.
          </div>
        )}
      </div>
    </div>
  );
};
