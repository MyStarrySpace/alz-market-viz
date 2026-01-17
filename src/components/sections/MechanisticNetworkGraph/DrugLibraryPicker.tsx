'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, Pill, FlaskConical, Beaker, Leaf, X } from 'lucide-react';
import { drugLibrary, type DrugLibraryEntry, type FDAStatus, type DrugType } from '@/data/mechanisticFramework/drugLibrary';

// ============================================================================
// TYPES
// ============================================================================

interface DrugLibraryPickerProps {
  /** Called when a drug is selected */
  onSelectDrug: (drug: DrugLibraryEntry) => void;
  /** Called to close the picker */
  onClose: () => void;
  /** Currently selected drug ID (for highlighting) */
  selectedDrugId?: string | null;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const FDA_STATUS_LABELS: Record<FDAStatus, { label: string; color: string }> = {
  approved: { label: 'FDA Approved', color: '#5a8a6e' },
  phase3: { label: 'Phase 3', color: '#007385' },
  phase2: { label: 'Phase 2', color: '#486393' },
  phase1: { label: 'Phase 1', color: '#a78bfa' },
  preclinical: { label: 'Preclinical', color: '#787473' },
  no_pathway: { label: 'No FDA Pathway', color: '#c75146' },
};

const DRUG_TYPE_ICONS: Record<DrugType, typeof Pill> = {
  small_molecule: Pill,
  antibody: FlaskConical,
  biologic: Beaker,
  supplement: Leaf,
};

// ============================================================================
// COMPONENT
// ============================================================================

export function DrugLibraryPicker({
  onSelectDrug,
  onClose,
  selectedDrugId,
}: DrugLibraryPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FDAStatus | 'all'>('all');

  // Filter drugs based on search and status
  const filteredDrugs = useMemo(() => {
    return drugLibrary.filter(drug => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        drug.name.toLowerCase().includes(searchLower) ||
        drug.mechanismSummary.toLowerCase().includes(searchLower) ||
        drug.primaryTargets.some(t => t.nodeId.toLowerCase().includes(searchLower));

      // Status filter
      const matchesStatus = filterStatus === 'all' || drug.fdaStatus === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  // Group by FDA status for display
  const groupedDrugs = useMemo(() => {
    const groups: Record<string, DrugLibraryEntry[]> = {};
    filteredDrugs.forEach(drug => {
      const key = drug.fdaStatus;
      if (!groups[key]) groups[key] = [];
      groups[key].push(drug);
    });
    return groups;
  }, [filteredDrugs]);

  const handleDrugClick = useCallback((drug: DrugLibraryEntry) => {
    onSelectDrug(drug);
  }, [onSelectDrug]);

  return (
    <div className="bg-white border border-[var(--border)] rounded shadow-lg w-[320px] max-h-[480px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
        <span className="text-sm font-medium text-[var(--text-primary)]">
          Drug Library
        </span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[var(--bg-secondary)] rounded transition-colors"
        >
          <X className="w-4 h-4 text-[var(--text-muted)]" />
        </button>
      </div>

      {/* Search */}
      <div className="p-2 border-b border-[var(--border)]">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search drugs or targets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-[var(--border)] rounded
                       focus:outline-none focus:border-[var(--accent-orange)]
                       placeholder:text-[var(--text-muted)]"
          />
        </div>
      </div>

      {/* Status filter */}
      <div className="px-2 py-1.5 border-b border-[var(--border)] flex flex-wrap gap-1">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
            filterStatus === 'all'
              ? 'bg-[var(--accent-orange)] text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-[var(--border)]'
          }`}
        >
          All ({drugLibrary.length})
        </button>
        {(['approved', 'phase3', 'phase2', 'phase1', 'no_pathway'] as FDAStatus[]).map(status => {
          const count = drugLibrary.filter(d => d.fdaStatus === status).length;
          if (count === 0) return null;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                filterStatus === status
                  ? 'bg-[var(--accent-orange)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-[var(--border)]'
              }`}
            >
              {FDA_STATUS_LABELS[status].label.replace('FDA ', '')} ({count})
            </button>
          );
        })}
      </div>

      {/* Drug list */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredDrugs.length === 0 ? (
          <div className="text-center py-8 text-[var(--text-muted)] text-sm">
            No drugs match your search
          </div>
        ) : (
          <div className="space-y-1">
            {filteredDrugs.map(drug => {
              const TypeIcon = DRUG_TYPE_ICONS[drug.type];
              const statusInfo = FDA_STATUS_LABELS[drug.fdaStatus];
              const isSelected = selectedDrugId === drug.id;

              return (
                <button
                  key={drug.id}
                  onClick={() => handleDrugClick(drug)}
                  className={`w-full text-left p-2 rounded transition-all ${
                    isSelected
                      ? 'bg-[var(--accent-orange-light)] border border-[var(--accent-orange)]'
                      : 'bg-[var(--bg-secondary)] hover:bg-[var(--border)] border border-transparent'
                  }`}
                >
                  {/* Drug name and icon */}
                  <div className="flex items-center gap-2">
                    <TypeIcon className="w-4 h-4 flex-shrink-0" style={{ color: statusInfo.color }} />
                    <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {drug.name}
                    </span>
                  </div>

                  {/* Targets */}
                  <div className="mt-1 flex flex-wrap gap-1">
                    {drug.primaryTargets.map(target => (
                      <span
                        key={target.nodeId}
                        className="text-[10px] px-1.5 py-0.5 bg-white rounded border border-[var(--border)]"
                        title={target.mechanism}
                      >
                        {target.effect === 'inhibits' ? '⊗' : target.effect === 'activates' ? '⊕' : '◐'}{' '}
                        {target.nodeId.split('_').slice(0, 2).join('_')}
                      </span>
                    ))}
                  </div>

                  {/* Status and evidence */}
                  <div className="mt-1 flex items-center justify-between">
                    <span
                      className="text-[9px] font-medium px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${statusInfo.color}20`,
                        color: statusInfo.color,
                      }}
                    >
                      {statusInfo.label}
                    </span>
                    <span className="text-[9px] text-[var(--text-muted)]">
                      Evidence: {drug.adEvidence.level}
                    </span>
                  </div>

                  {/* Mechanism summary (truncated) */}
                  <div className="mt-1 text-[10px] text-[var(--text-muted)] line-clamp-2">
                    {drug.mechanismSummary}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-[var(--border)] text-[10px] text-[var(--text-muted)] text-center">
        {filteredDrugs.length} of {drugLibrary.length} drugs
      </div>
    </div>
  );
}

export default DrugLibraryPicker;
