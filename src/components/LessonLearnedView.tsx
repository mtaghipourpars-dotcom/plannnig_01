import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Award,
  Plus,
  Filter,
} from 'lucide-react';
import { LessonLearnedItem } from '../types';

interface LessonLearnedViewProps {
  lessons: LessonLearnedItem[];
  onApproveLesson: (id: string) => void;
  onBackToDashboard: () => void;
}

export const LessonLearnedView: React.FC<LessonLearnedViewProps> = ({
  lessons,
  onApproveLesson,
  onBackToDashboard,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING_REVIEW' | 'APPLIED'>('ALL');

  const filtered = lessons.filter((l) => {
    if (activeFilter === 'ALL') return true;
    return l.status === activeFilter;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Continuous Improvement & Lessons Learned
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Capturing manufacturing engineering insights and cycle optimizations
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

      {/* KPI banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Overall Process Efficiency</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">86%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">+4.2% vs previous quarter</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Pending Executive Review</span>
          <div className="text-2xl font-black text-amber-600 mt-1 font-mono">2 items</div>
          <span className="text-[11px] text-slate-500 font-medium">Require CEO / Tech sign-off</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Implemented Best Practices</span>
          <div className="text-2xl font-black text-indigo-600 mt-1 font-mono">1 Active</div>
          <span className="text-[11px] text-slate-500 font-medium">Applied across all wind bays</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            activeFilter === 'ALL'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Items ({lessons.length})
        </button>
        <button
          onClick={() => setActiveFilter('PENDING_REVIEW')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            activeFilter === 'PENDING_REVIEW'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Pending Review (2)
        </button>
        <button
          onClick={() => setActiveFilter('APPLIED')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
            activeFilter === 'APPLIED'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Applied (1)
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                  {item.category}
                </span>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'PENDING_REVIEW'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {item.status === 'PENDING_REVIEW' ? 'Pending Review' : 'Applied'}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-2">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Impact: </span>
                <span className="font-bold text-emerald-600">{item.efficiencyGain}</span>
              </div>

              {item.status === 'PENDING_REVIEW' && (
                <button
                  onClick={() => onApproveLesson(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Approve & Implement
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
