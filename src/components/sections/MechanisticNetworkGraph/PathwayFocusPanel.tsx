'use client';

import { useMemo } from 'react';
import {
  X,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  GitBranch,
  RotateCcw,
} from 'lucide-react';
import type { DrugLibraryEntry, DrugPathwayConfig } from '@/data/mechanisticFramework/drugLibrary';
import type { FeedbackLoop } from '@/data/mechanisticFramework/types';
import { getPathwayStats, type PathwayStats } from '@/lib/pathwayCalculation';

// ============================================================================
// TYPES
// ============================================================================

interface PathwayFocusPanelProps {
  /** The selected drug */
  drug: DrugLibraryEntry;
  /** Pre-computed or live-calculated pathway */
  pathway: DrugPathwayConfig;
  /** All feedback loops for lookup */
  feedbackLoops: FeedbackLoop[];
  /** Whether focus mode is active */
  isFocusMode: boolean;
  /** Toggle focus mode */
  onToggleFocusMode: () => void;
  /** Exit pathway view entirely */
  onClose: () => void;
  /** Pan to a specific node */
  onPanToNode?: (nodeId: string) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const INVOLVEMENT_STYLES: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  breaks: { label: 'Breaks', color: '#5a8a6e', icon: '⊗' },
  weakens: { label: 'Weakens', color: '#e36216', icon: '↓' },
  strengthens: { label: 'Strengthens', color: '#c75146', icon: '↑' },
  enters: { label: 'Enters', color: '#787473', icon: '→' },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function PathwayFocusPanel({
  drug,
  pathway,
  feedbackLoops,
  isFocusMode,
  onToggleFocusMode,
  onClose,
  onPanToNode,
}: PathwayFocusPanelProps) {
  // Calculate stats
  const stats: PathwayStats = useMemo(() => getPathwayStats(pathway), [pathway]);

  // Get loop details
  const loopDetails = useMemo(() => {
    return pathway.relevantLoops.map(involvement => {
      const loop = feedbackLoops.find(l => l.id === involvement.loopId);
      return {
        ...involvement,
        loop,
        style: INVOLVEMENT_STYLES[involvement.involvement] || INVOLVEMENT_STYLES.enters,
      };
    });
  }, [pathway.relevantLoops, feedbackLoops]);

  // Get target descriptions
  const targetDescriptions = useMemo(() => {
    return drug.primaryTargets.map(target => ({
      nodeId: target.nodeId,
      effect: target.effect,
      mechanism: target.mechanism,
    }));
  }, [drug.primaryTargets]);

  return (
    <div className="bg-white border border-[var(--border)] rounded shadow-lg w-[280px] max-h-[420px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[var(--accent-orange)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            Pathway: {drug.name.split(' ')[0]}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[var(--border)] rounded transition-colors"
          title="Close pathway view (Esc)"
        >
          <X className="w-4 h-4 text-[var(--text-muted)]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Targets */}
        <div>
          <div className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wide mb-1">
            Targets
          </div>
          <div className="space-y-1">
            {targetDescriptions.map(target => (
              <button
                key={target.nodeId}
                onClick={() => onPanToNode?.(target.nodeId)}
                className="w-full text-left p-2 rounded bg-[var(--bg-secondary)] hover:bg-[var(--border)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {target.effect === 'inhibits' ? '⊗' : target.effect === 'activates' ? '⊕' : '◐'}
                  </span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    {target.nodeId}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] capitalize">
                    ({target.effect})
                  </span>
                </div>
                {target.mechanism && (
                  <div className="mt-1 text-[10px] text-[var(--text-muted)] line-clamp-2">
                    {target.mechanism}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pathway Stats */}
        <div>
          <div className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wide mb-2">
            Pathway Coverage
          </div>
          <div className="flex items-center justify-between text-xs bg-[var(--bg-secondary)] p-2 rounded">
            <div className="flex items-center gap-1 text-[var(--text-muted)]">
              <ArrowUpRight className="w-3 h-3" />
              <span>{stats.upstreamCount}</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)]">→</span>
            <div className="flex items-center gap-1 text-[var(--accent-orange)] font-medium">
              <Target className="w-3 h-3" />
              <span>{stats.targetCount}</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)]">→</span>
            <div className="flex items-center gap-1 text-[var(--text-muted)]">
              <ArrowDownRight className="w-3 h-3" />
              <span>{stats.downstreamCount}</span>
            </div>
          </div>
          <div className="mt-1 text-[10px] text-center text-[var(--text-muted)]">
            {stats.upstreamCount} upstream → {stats.targetCount} target → {stats.downstreamCount} downstream
          </div>
        </div>

        {/* Affected Modules */}
        <div>
          <div className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wide mb-1">
            Affected Modules ({pathway.affectedModules.length})
          </div>
          <div className="flex flex-wrap gap-1">
            {pathway.affectedModules.map(moduleId => (
              <span
                key={moduleId}
                className="text-[10px] px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded"
              >
                {moduleId}
              </span>
            ))}
          </div>
        </div>

        {/* Feedback Loops */}
        {loopDetails.length > 0 && (
          <div>
            <div className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wide mb-1">
              <GitBranch className="w-3 h-3 inline mr-1" />
              Feedback Loops ({loopDetails.length})
            </div>
            <div className="space-y-1">
              {loopDetails.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onPanToNode?.(item.targetNodeInLoop)}
                  className="w-full text-left p-2 rounded border border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--text-primary)]">
                      {item.loop?.name || item.loopId}
                    </span>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${item.style.color}20`,
                        color: item.style.color,
                      }}
                    >
                      {item.style.icon} {item.style.label}
                    </span>
                  </div>
                  <div className="mt-1 text-[10px] text-[var(--text-muted)]">
                    via {item.targetNodeInLoop}
                  </div>
                  {item.loop && (
                    <div className="mt-1 text-[10px] text-[var(--text-muted)] line-clamp-1">
                      {item.loop.type === 'reinforcing' ? '🔄' : '⚖️'}{' '}
                      {item.loop.type.charAt(0).toUpperCase() + item.loop.type.slice(1)} loop
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Evidence */}
        <div>
          <div className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wide mb-1">
            AD Evidence
          </div>
          <div className="p-2 bg-[var(--bg-secondary)] rounded">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-[var(--text-primary)]">
                Level: {drug.adEvidence.level}
              </span>
              {drug.annualCost && (
                <span className="text-[10px] text-[var(--text-muted)]">
                  ${drug.annualCost.toLocaleString()}/yr
                </span>
              )}
            </div>
            <div className="text-[10px] text-[var(--text-muted)]">
              {drug.adEvidence.summary}
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="p-2 border-t border-[var(--border)] flex gap-2">
        <button
          onClick={onToggleFocusMode}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            isFocusMode
              ? 'bg-[var(--accent-orange)] text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--border)]'
          }`}
        >
          {isFocusMode ? (
            <>
              <EyeOff className="w-3 h-3" />
              Show All
            </>
          ) : (
            <>
              <Eye className="w-3 h-3" />
              Focus Mode
            </>
          )}
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded transition-colors"
          title="Reset view"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default PathwayFocusPanel;
