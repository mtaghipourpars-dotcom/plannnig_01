import React, { useState } from 'react';
import {
  Package,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronRight,
  Shield,
  ArrowUpDown,
  Building,
} from 'lucide-react';
import { ProductItem, ProductHealth } from '../types';

interface ProductPortfolioViewProps {
  products: ProductItem[];
  selectedProduct: ProductItem | null;
  onSelectProduct: (prod: ProductItem | null) => void;
  onBackToDashboard: () => void;
}

export const ProductPortfolioView: React.FC<ProductPortfolioViewProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
  onBackToDashboard,
}) => {
  const [filterFamily, setFilterFamily] = useState<string>('ALL');
  const [filterHealth, setFilterHealth] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const families = [
    'ALL',
    'Generators & Turbines',
    'Wind Equipment',
    'Industrial Motors',
    'Busduct & Aux.',
  ];

  const filteredProducts = products.filter((p) => {
    const matchesFamily = filterFamily === 'ALL' || p.family === filterFamily;
    const matchesHealth = filterHealth === 'ALL' || p.health === filterHealth;
    const matchesSearch =
      searchTerm === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customerCommitmentCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFamily && matchesHealth && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Product Portfolio Management
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              20 Active products across 4 manufacturing families
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

      {/* Filter & Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Family Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {families.map((fam) => (
            <button
              key={fam}
              onClick={() => setFilterFamily(fam)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterFamily === fam
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {fam === 'ALL' ? 'All Families (20)' : fam}
            </button>
          ))}
        </div>

        {/* Health status filter & Search input */}
        <div className="flex items-center gap-2">
          <select
            value={filterHealth}
            onChange={(e) => setFilterHealth(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">All Health Status</option>
            <option value="HEALTHY">🟢 Healthy Only (12)</option>
            <option value="MONITORING">🟠 Monitoring Only (5)</option>
            <option value="CRITICAL">🔴 Critical Only (2)</option>
            <option value="ON_HOLD">⚪ On Hold Only (1)</option>
          </select>

          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table of Products */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Code / Model</th>
                <th className="py-3 px-3">Product Family</th>
                <th className="py-3 px-3">Customer / Contract</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-3">Progress</th>
                <th className="py-3 px-3">Health</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="hover:bg-slate-50/90 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {p.code} • {p.targetRating}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
                    {p.family}
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800 truncate max-w-[180px]">
                      {p.customerName}
                    </div>
                    <div className="text-[10px] font-mono text-blue-600">
                      {p.customerCommitmentCode}
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap font-mono text-xs">
                    <div className="text-slate-800 font-semibold">{p.dueDate}</div>
                    {p.delayDays > 0 ? (
                      <div className="text-[10px] text-rose-600 font-bold">
                        +{p.delayDays} days delay
                      </div>
                    ) : (
                      <div className="text-[10px] text-emerald-600 font-medium">On Schedule</div>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${p.progressPercent}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-slate-700">
                        {p.progressPercent}%
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Cost: {p.costConsumptionPercent}%
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.health === 'HEALTHY'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : p.health === 'MONITORING'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : p.health === 'CRITICAL'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-300'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          p.health === 'HEALTHY'
                            ? 'bg-emerald-500'
                            : p.health === 'MONITORING'
                            ? 'bg-amber-500'
                            : p.health === 'CRITICAL'
                            ? 'bg-rose-500'
                            : 'bg-slate-400'
                        }`}
                      ></span>
                      {p.health}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(p);
                      }}
                      className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-semibold text-[11px] transition-colors"
                    >
                      Inspect Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          onClick={() => onSelectProduct(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                    selectedProduct.health === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-700'
                      : selectedProduct.health === 'MONITORING'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {selectedProduct.health}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {selectedProduct.code} • {selectedProduct.targetRating}
                </p>
              </div>

              <button
                onClick={() => onSelectProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500">Customer Contract:</span>
                <div className="font-bold text-slate-800">{selectedProduct.customerName}</div>
                <div className="text-blue-600 font-mono">{selectedProduct.customerCommitmentCode}</div>
              </div>
              <div>
                <span className="text-slate-500">Family:</span>
                <div className="font-bold text-slate-800">{selectedProduct.family}</div>
              </div>
              <div>
                <span className="text-slate-500">Contractual Due Date:</span>
                <div className="font-bold font-mono text-slate-800">{selectedProduct.dueDate}</div>
              </div>
              <div>
                <span className="text-slate-500">Projected Delivery:</span>
                <div className="font-bold font-mono text-rose-600">
                  {selectedProduct.projectedDeliveryDate} (+{selectedProduct.delayDays} days)
                </div>
              </div>
            </div>

            {selectedProduct.bottleneck && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-1">
                <div className="font-bold text-rose-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Critical Path Bottleneck</span>
                </div>
                <p className="text-rose-700">{selectedProduct.bottleneck}</p>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">Physical Progress vs Planned:</span>
                <span className="font-mono text-blue-600 font-bold">
                  {selectedProduct.progressPercent}% / {selectedProduct.plannedProgressPercent}%
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${selectedProduct.progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => onSelectProduct(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
