'use client';

import { useCallback, useMemo, useState, useEffect, useRef, memo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  Node,
  Edge,
  MarkerType,
  Position,
  Handle,
  NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { allNodes } from '@/data/mechanisticFramework/nodes';
import { allEdges } from '@/data/mechanisticFramework/edges';
import type { MechanisticNode, BoundaryVariant, BoundaryDirection } from '@/data/mechanisticFramework/types';

// Tri-state for module filtering: 'on' (full), 'partial' (filtered), 'off' (hidden)
type ModuleFilterState = 'on' | 'partial' | 'off';

// Module colors for visual grouping
const moduleColors: Record<string, string> = {
  'BOUNDARY': '#787473',
  'M01': '#486393',  // Insulin/mTOR - blue
  'M02': '#007385',  // Lysosomal - teal
  'M03': '#C9461D',  // Mitochondrial - orange
  'M04': '#E5AF19',  // Inflammasome - yellow
  'M05': '#C3577F',  // Microglial - pink
  'M06': '#60a5fa',  // Amyloid - soft blue
  'M07': '#a78bfa',  // Tau - purple
  'M08': '#34d399',  // Complement - green
  'M09': '#f472b6',  // Iron - pink
  'M10': '#8ecae6',  // APOE - teal
  'M11': '#fbbf24',  // TREM2 - yellow
  'M12': '#94a3b8',  // BBB - slate
  'M13': '#fb923c',  // Cholinergic - orange
  'M14': '#a855f7',  // MAM - violet
  'M15': '#22c55e',  // Interventions - green
  'M16': '#ec4899',  // Sex/Ancestry - pink
  'M17': '#14b8a6',  // Immunomodulatory - teal
};

// Category shapes/styles (SBSF v2.0: Only STOCK, STATE, BOUNDARY)
const categoryStyles: Record<string, { borderStyle: string; borderWidth: number }> = {
  'BOUNDARY': { borderStyle: 'dashed', borderWidth: 2 },
  'STATE': { borderStyle: 'solid', borderWidth: 2 },
  'STOCK': { borderStyle: 'solid', borderWidth: 3 },
};

// Role-based styling for REGULATOR nodes (SBSF v2.0: REGULATOR is now a role, not category)
const roleStyles: Record<string, { borderColor?: string; borderStyle?: string }> = {
  'REGULATOR': { borderColor: '#e36216', borderStyle: 'double' },
  'THERAPEUTIC_TARGET': { borderColor: '#C9461D' },
  'BIOMARKER': { borderColor: '#34d399' },
  'DRUG': { borderColor: '#5a8a6e' },
};

// View mode for boundary variant nodes
type BoundaryViewMode = 'simple' | 'table' | 'graph';

// Effect direction indicator
function EffectIndicator({ direction }: { direction: 'protective' | 'neutral' | 'risk' }) {
  const colors = {
    protective: '#34d399',
    neutral: '#787473',
    risk: '#c75146',
  };
  return (
    <span
      className="inline-block w-2 h-2 rounded-full"
      style={{ backgroundColor: colors[direction] }}
    />
  );
}

// Custom node for boundary nodes with variants
interface BoundaryVariantNodeData extends Record<string, unknown> {
  label: string;
  variants: BoundaryVariant[];
  defaultVariant?: string;
  moduleId: string;
  isPartial?: boolean;
  onVariantSelect?: (variantId: string | null) => void;
  onVariantHover?: (variantId: string | null) => void;
  selectedVariant?: string | null;
  hoveredVariant?: string | null;
  forceGraphView?: boolean; // Force graph view when only boundaries are visible
}

// Helper to interpret risk magnitude
function getRiskLabel(magnitude: number, direction: 'protective' | 'neutral' | 'risk'): string {
  if (direction === 'neutral') return 'No effect';
  if (direction === 'protective') {
    if (magnitude >= 2) return 'Strong protection';
    if (magnitude >= 1.5) return 'Moderate protection';
    return 'Mild protection';
  }
  // risk
  if (magnitude >= 3) return 'High risk';
  if (magnitude >= 2) return 'Moderate risk';
  if (magnitude >= 1.5) return 'Elevated risk';
  return 'Slight risk';
}

const BoundaryVariantNode = memo(({ data }: NodeProps<Node<BoundaryVariantNodeData>>) => {
  const [localViewMode, setLocalViewMode] = useState<BoundaryViewMode>('simple');
  const variants = data.variants || [];
  const activeVariantId = data.selectedVariant || data.hoveredVariant;

  // Use forced graph view if set, otherwise use local state
  const viewMode = data.forceGraphView ? 'graph' : localViewMode;

  // Calculate max magnitude for graph scaling (use 1.0 as baseline)
  const maxMagnitude = Math.max(...variants.map(v => v.effectMagnitude || 1), 1);

  // Get node dimensions based on view mode
  const getWidth = () => {
    switch (viewMode) {
      case 'table': return 200; // Narrower table
      case 'graph': return 240; // Slightly wider for labels
      default: return 180;
    }
  };

  return (
    <div
      className="bg-white border-2 border-dashed transition-all"
      style={{
        borderColor: moduleColors[data.moduleId] || '#787473',
        width: getWidth(),
        opacity: data.isPartial ? 0.5 : 1,
        padding: viewMode === 'simple' ? '8px 12px' : '10px',
        borderRadius: viewMode === 'simple' ? '4px' : '8px', // BOUNDARY = box shape
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-[var(--border)]" />
      <Handle type="source" position={Position.Right} className="!bg-[var(--border)]" />

      {/* Header with label and view toggle */}
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="text-[11px] font-medium text-[var(--text-primary)] truncate">
          {data.label}
        </span>
        {variants.length > 0 && !data.forceGraphView && (
          <div className="flex gap-0.5">
            {(['simple', 'table', 'graph'] as const).map(mode => (
              <button
                key={mode}
                onClick={(e) => { e.stopPropagation(); setLocalViewMode(mode); }}
                className={`px-1 py-0.5 text-[8px] rounded transition-colors ${
                  viewMode === mode
                    ? 'bg-[var(--accent-orange)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-[var(--border)]'
                }`}
              >
                {mode === 'simple' ? '•' : mode === 'table' ? '≡' : '▮'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Simple view: just variant names */}
      {viewMode === 'simple' && variants.length > 0 && (
        <div className="text-[9px] text-[var(--text-muted)] leading-tight">
          {variants.map((v, i) => (
            <span
              key={v.id}
              className={`cursor-pointer hover:text-[var(--text-primary)] ${
                activeVariantId === v.id ? 'text-[var(--accent-orange)] font-medium' : ''
              }`}
              onMouseEnter={() => data.onVariantHover?.(v.id)}
              onMouseLeave={() => data.onVariantHover?.(null)}
              onClick={(e) => { e.stopPropagation(); data.onVariantSelect?.(activeVariantId === v.id ? null : v.id); }}
            >
              <EffectIndicator direction={v.effectDirection} />
              {' '}{v.label}{i < variants.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}

      {/* Table view - compact with risk interpretation */}
      {viewMode === 'table' && variants.length > 0 && (
        <div className="mt-1 space-y-1">
          {variants.map(v => (
            <div
              key={v.id}
              className={`cursor-pointer p-1 rounded text-[9px] ${
                activeVariantId === v.id ? 'bg-[var(--accent-orange-light)]' : 'hover:bg-[var(--bg-secondary)]'
              }`}
              onMouseEnter={() => data.onVariantHover?.(v.id)}
              onMouseLeave={() => data.onVariantHover?.(null)}
              onClick={(e) => { e.stopPropagation(); data.onVariantSelect?.(activeVariantId === v.id ? null : v.id); }}
            >
              <div className="flex items-center gap-1">
                <EffectIndicator direction={v.effectDirection} />
                <span className={activeVariantId === v.id ? 'font-medium' : ''}>{v.label}</span>
                {v.frequency && (
                  <span className="text-[var(--text-muted)] ml-auto">{(v.frequency * 100).toFixed(0)}%</span>
                )}
              </div>
              <div className="text-[8px] mt-0.5" style={{ color: v.color }}>
                {getRiskLabel(v.effectMagnitude || 1, v.effectDirection)} ({v.effectMagnitude?.toFixed(1)}x)
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Graph view (horizontal bars with risk labels) */}
      {viewMode === 'graph' && variants.length > 0 && (
        <div className="mt-1 space-y-1.5">
          {variants.map(v => {
            const barWidth = ((v.effectMagnitude || 1) / maxMagnitude) * 100;
            const riskLabel = getRiskLabel(v.effectMagnitude || 1, v.effectDirection);
            return (
              <div
                key={v.id}
                className={`cursor-pointer ${
                  activeVariantId === v.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                onMouseEnter={() => data.onVariantHover?.(v.id)}
                onMouseLeave={() => data.onVariantHover?.(null)}
                onClick={(e) => { e.stopPropagation(); data.onVariantSelect?.(activeVariantId === v.id ? null : v.id); }}
              >
                <div className="flex items-center justify-between text-[8px] mb-0.5">
                  <div className="flex items-center gap-1">
                    <EffectIndicator direction={v.effectDirection} />
                    <span className={activeVariantId === v.id ? 'font-medium text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>
                      {v.label}
                    </span>
                  </div>
                  <span className="text-[7px]" style={{ color: v.color }}>
                    {riskLabel}
                  </span>
                </div>
                <div className="h-3 bg-[var(--bg-secondary)] rounded overflow-hidden relative">
                  <div
                    className="h-full rounded transition-all"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: v.color,
                      opacity: activeVariantId === v.id ? 1 : 0.7,
                    }}
                  />
                  {/* Baseline marker at 1.0x */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-[var(--text-muted)]"
                    style={{ left: `${(1 / maxMagnitude) * 100}%`, opacity: 0.5 }}
                  />
                </div>
              </div>
            );
          })}
          {/* Legend */}
          <div className="text-[7px] text-[var(--text-muted)] flex items-center gap-2 pt-1 border-t border-[var(--border)]">
            <span className="flex items-center gap-0.5"><EffectIndicator direction="protective" /> Protective</span>
            <span className="flex items-center gap-0.5"><EffectIndicator direction="risk" /> Risk</span>
            <span className="ml-auto">| = baseline</span>
          </div>
        </div>
      )}
    </div>
  );
});

BoundaryVariantNode.displayName = 'BoundaryVariantNode';

// Custom node for boundary expand/collapse button
interface BoundaryExpandButtonData extends Record<string, unknown> {
  direction: 'input' | 'output';
  isExpanded: boolean;
  boundaryCount: number;
  onToggle: () => void;
}

const BoundaryExpandButton = memo(({ data }: NodeProps<Node<BoundaryExpandButtonData>>) => {
  const isInput = data.direction === 'input';

  return (
    <div
      className="bg-white border-2 border-dashed cursor-pointer transition-all hover:shadow-md hover:border-[var(--accent-orange)]"
      style={{
        borderColor: data.isExpanded ? 'var(--accent-orange)' : '#787473',
        width: 80,
        padding: '8px',
        borderRadius: '8px',
        textAlign: 'center',
      }}
      onClick={(e) => {
        e.stopPropagation();
        data.onToggle();
      }}
    >
      {/* Only show handle on the appropriate side */}
      {isInput ? (
        <Handle type="source" position={Position.Right} className="!bg-[var(--border)]" />
      ) : (
        <Handle type="target" position={Position.Left} className="!bg-[var(--border)]" />
      )}

      <div className="text-[10px] font-medium text-[var(--text-primary)]">
        {data.isExpanded ? '−' : '+'}
      </div>
      <div className="text-[9px] text-[var(--text-muted)]">
        {isInput ? 'Inputs' : 'Outputs'}
      </div>
      <div className="text-[8px] text-[var(--text-muted)]">
        ({data.boundaryCount})
      </div>
    </div>
  );
});

BoundaryExpandButton.displayName = 'BoundaryExpandButton';

// Node types for React Flow
const nodeTypes = {
  boundaryVariant: BoundaryVariantNode,
  boundaryExpandButton: BoundaryExpandButton,
};

// Compute topological layers for DAG layout (left-to-right)
function computeDAGLayers(
  nodes: MechanisticNode[],
  edges: typeof allEdges
): Map<string, number> {
  const nodeIds = new Set(nodes.map(n => n.id));
  const relevantEdges = edges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));

  // Build adjacency lists
  const inDegree: Record<string, number> = {};
  const outEdges: Record<string, string[]> = {};

  nodes.forEach(n => {
    inDegree[n.id] = 0;
    outEdges[n.id] = [];
  });

  relevantEdges.forEach(e => {
    inDegree[e.target] = (inDegree[e.target] || 0) + 1;
    outEdges[e.source] = outEdges[e.source] || [];
    outEdges[e.source].push(e.target);
  });

  // Kahn's algorithm for topological sort with layer assignment
  const layers = new Map<string, number>();
  let queue = nodes.filter(n => inDegree[n.id] === 0).map(n => n.id);
  let layer = 0;

  while (queue.length > 0) {
    const nextQueue: string[] = [];

    queue.forEach(nodeId => {
      layers.set(nodeId, layer);

      (outEdges[nodeId] || []).forEach(targetId => {
        inDegree[targetId]--;
        if (inDegree[targetId] === 0) {
          nextQueue.push(targetId);
        }
      });
    });

    queue = nextQueue;
    layer++;
  }

  // Handle any remaining nodes (cycles or disconnected) - place at end
  nodes.forEach(n => {
    if (!layers.has(n.id)) {
      layers.set(n.id, layer);
    }
  });

  return layers;
}

// Variant callback type for passing into convertNodes
interface VariantCallbacks {
  onVariantSelect: (variantId: string | null) => void;
  onVariantHover: (variantId: string | null) => void;
  selectedVariant: string | null;
  hoveredVariant: string | null;
}

// =============================================================================
// GREEDY DYNAMIC LAYOUT ALGORITHM
// =============================================================================

interface LayoutPosition {
  x: number;
  y: number;
}

interface PseudoNode {
  id: string;
  label: string;
  moduleId: string;
  isPseudo: true;
  connectsFrom: string[];  // node IDs in visible set that connect TO this hidden module
  connectsTo: string[];    // node IDs in visible set that this hidden module connects TO
}

/**
 * Find connected components in the filtered subgraph
 */
function findFilteredComponents(
  filteredNodes: { id: string; moduleId: string }[],
  filteredEdges: { source: string; target: string }[]
): string[][] {
  const nodeIds = new Set(filteredNodes.map(n => n.id));
  const visited = new Set<string>();
  const components: string[][] = [];

  // Build undirected adjacency
  const adj: Record<string, string[]> = {};
  filteredNodes.forEach(n => { adj[n.id] = []; });
  filteredEdges.forEach(e => {
    // Initialize adjacency for both endpoints if not already done
    if (!adj[e.source]) adj[e.source] = [];
    if (!adj[e.target]) adj[e.target] = [];

    if (nodeIds.has(e.source) && nodeIds.has(e.target)) {
      adj[e.source].push(e.target);
      adj[e.target].push(e.source);
    }
  });

  function dfs(nodeId: string, component: string[]) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    component.push(nodeId);
    (adj[nodeId] || []).forEach(neighbor => dfs(neighbor, component));
  }

  filteredNodes.forEach(n => {
    if (!visited.has(n.id)) {
      const component: string[] = [];
      dfs(n.id, component);
      if (component.length > 0) {
        components.push(component);
      }
    }
  });

  return components;
}

/**
 * Find pseudo-nodes that represent hidden modules connecting visible components.
 * Also returns edges that should be excluded (because they should go through the hidden module).
 */
function findPseudoNodes(
  filteredNodes: MechanisticNode[],
  allEdgesData: typeof allEdges,
  allNodesData: typeof allNodes
): { pseudoNodes: PseudoNode[]; excludedEdges: Set<string> } {
  const visibleNodeIds = new Set(filteredNodes.map(n => n.id));
  const visibleModuleIds = new Set(filteredNodes.map(n => n.moduleId));
  const pseudoNodes: PseudoNode[] = [];
  const addedPseudoModules = new Set<string>();
  const excludedEdges = new Set<string>();

  // Find edges that go from visible -> hidden -> visible
  // These represent paths through hidden modules
  const hiddenNodes = allNodesData.filter(n => !visibleNodeIds.has(n.id));
  const hiddenNodeIds = new Set(hiddenNodes.map(n => n.id));

  // Build full graph adjacency
  const outgoing: Record<string, string[]> = {};
  const incoming: Record<string, string[]> = {};
  allNodesData.forEach(n => {
    outgoing[n.id] = [];
    incoming[n.id] = [];
  });
  allEdgesData.forEach(e => {
    outgoing[e.source]?.push(e.target);
    incoming[e.target]?.push(e.source);
  });

  // For each hidden module, check if it connects two visible nodes
  const hiddenModuleNodes: Record<string, string[]> = {};
  hiddenNodes.forEach(n => {
    if (!hiddenModuleNodes[n.moduleId]) {
      hiddenModuleNodes[n.moduleId] = [];
    }
    hiddenModuleNodes[n.moduleId].push(n.id);
  });

  // Check each hidden module
  Object.entries(hiddenModuleNodes).forEach(([moduleId, nodeIds]) => {
    // Find visible nodes that connect TO this hidden module
    const visibleSourcesInto = new Set<string>();
    // Find visible nodes that this hidden module connects TO
    const visibleTargetsFrom = new Set<string>();

    nodeIds.forEach(hiddenId => {
      // Check incoming edges from visible nodes
      (incoming[hiddenId] || []).forEach(source => {
        if (visibleNodeIds.has(source)) {
          visibleSourcesInto.add(source);
        }
      });
      // Check outgoing edges to visible nodes
      (outgoing[hiddenId] || []).forEach(target => {
        if (visibleNodeIds.has(target)) {
          visibleTargetsFrom.add(target);
        }
      });
    });

    // If this hidden module bridges visible nodes, create a pseudo-node
    if (visibleSourcesInto.size > 0 && visibleTargetsFrom.size > 0) {
      // Check if the sources and targets are in different components or modules
      const sourceModules = new Set(
        Array.from(visibleSourcesInto).map(id =>
          filteredNodes.find(n => n.id === id)?.moduleId
        )
      );
      const targetModules = new Set(
        Array.from(visibleTargetsFrom).map(id =>
          filteredNodes.find(n => n.id === id)?.moduleId
        )
      );

      // Only add pseudo-node if it connects different modules
      const connectsDifferentModules =
        ![...sourceModules].every(m => targetModules.has(m)) ||
        ![...targetModules].every(m => sourceModules.has(m));

      if (connectsDifferentModules && !addedPseudoModules.has(moduleId)) {
        addedPseudoModules.add(moduleId);

        // Find the source and target modules
        const sourceModuleIds = new Set<string>();
        Array.from(visibleSourcesInto).forEach(id => {
          const node = filteredNodes.find(n => n.id === id);
          if (node) sourceModuleIds.add(node.moduleId);
        });

        const targetModuleIds = new Set<string>();
        Array.from(visibleTargetsFrom).forEach(id => {
          const node = filteredNodes.find(n => n.id === id);
          if (node) targetModuleIds.add(node.moduleId);
        });

        // First, identify all edges that will be excluded (cross-module edges)
        const edgesToExclude = new Set<string>();
        allEdgesData.forEach(edge => {
          const srcNode = filteredNodes.find(n => n.id === edge.source);
          const tgtNode = filteredNodes.find(n => n.id === edge.target);
          if (srcNode && tgtNode &&
              sourceModuleIds.has(srcNode.moduleId) &&
              targetModuleIds.has(tgtNode.moduleId) &&
              srcNode.moduleId !== tgtNode.moduleId) {
            edgesToExclude.add(edge.id);
          }
        });

        // Now find nodes in target modules that will have NO incoming edges
        // after we exclude the cross-module edges
        // These are the nodes we need to connect from the pseudo-node
        const targetModuleEntryPoints = new Set<string>();
        targetModuleIds.forEach(targetModId => {
          const targetModuleNodes = filteredNodes.filter(n => n.moduleId === targetModId);

          targetModuleNodes.forEach(node => {
            // Check if this node will have any incoming edges after exclusion
            const hasRemainingIncoming = (incoming[node.id] || []).some(srcId => {
              // Check if the edge from srcId -> node.id will remain
              const srcNode = filteredNodes.find(n => n.id === srcId);
              if (!srcNode) return false; // Source not visible

              // Find the edge
              const edge = allEdgesData.find(e => e.source === srcId && e.target === node.id);
              if (!edge) return false;

              // Edge remains if it's not excluded
              return !edgesToExclude.has(edge.id);
            });

            if (!hasRemainingIncoming) {
              targetModuleEntryPoints.add(node.id);
            }
          });
        });

        pseudoNodes.push({
          id: `__pseudo_${moduleId}`,
          label: moduleId,
          moduleId,
          isPseudo: true,
          connectsFrom: Array.from(visibleSourcesInto),
          connectsTo: Array.from(targetModuleEntryPoints), // Connect to all entry points
        });

        // Add the excluded edges
        edgesToExclude.forEach(id => excludedEdges.add(id));
      }
    }
  });

  return { pseudoNodes, excludedEdges };
}

/**
 * Greedy layout algorithm that positions nodes based on causal flow.
 * Handles disconnected components by laying them out separately.
 * Also identifies back edges (cycle-completing edges) during BFS.
 */
function computeGreedyLayout(
  filteredNodes: MechanisticNode[],
  edges: typeof allEdges,
  pseudoNodes: PseudoNode[] = [],
  excludedEdges: Set<string> = new Set()
): { positions: Map<string, LayoutPosition>; backEdges: Set<string> } {
  const positions = new Map<string, LayoutPosition>();
  const backEdges = new Set<string>();

  if (filteredNodes.length === 0) return { positions, backEdges };

  const nodeIds = new Set(filteredNodes.map(n => n.id));
  const nodeMap = new Map(filteredNodes.map(n => [n.id, n]));

  // Add pseudo-nodes to the node set
  pseudoNodes.forEach(pn => {
    nodeIds.add(pn.id);
  });

  // Build adjacency for filtered subgraph + pseudo-nodes
  const outgoing: Record<string, string[]> = {};
  const incoming: Record<string, string[]> = {};

  filteredNodes.forEach(n => {
    outgoing[n.id] = [];
    incoming[n.id] = [];
  });
  pseudoNodes.forEach(pn => {
    outgoing[pn.id] = [];
    incoming[pn.id] = [];
  });

  // Add real edges between visible nodes (excluding edges that should go through pseudo-nodes)
  const filteredEdges = edges.filter(e =>
    nodeIds.has(e.source) && nodeIds.has(e.target) && !excludedEdges.has(e.id)
  );

  // Build a map from source-target pair to edge ID for back-edge detection
  const edgeIdMap = new Map<string, string>();
  filteredEdges.forEach(e => {
    edgeIdMap.set(`${e.source}->${e.target}`, e.id);
  });

  filteredEdges.forEach(e => {
    outgoing[e.source].push(e.target);
    incoming[e.target].push(e.source);
  });

  // Add pseudo-edges for pseudo-nodes
  pseudoNodes.forEach(pn => {
    // Ensure adjacency arrays exist for pseudo-node connections
    pn.connectsFrom.forEach(fromId => {
      if (!outgoing[fromId]) outgoing[fromId] = [];
    });
    pn.connectsTo.forEach(toId => {
      if (!incoming[toId]) incoming[toId] = [];
    });

    // Add edges FROM source nodes TO pseudo-node
    pn.connectsFrom.forEach(fromId => {
      if (nodeIds.has(fromId)) {
        outgoing[fromId].push(pn.id);
        incoming[pn.id].push(fromId);
      }
    });

    // Add edges FROM pseudo-node TO target nodes
    pn.connectsTo.forEach(toId => {
      if (nodeIds.has(toId)) {
        outgoing[pn.id].push(toId);
        incoming[toId].push(pn.id);
      }
    });
  });

  // Build pseudo-edges
  const pseudoEdges = pseudoNodes.flatMap(pn => {
    const edges: { source: string; target: string }[] = [];
    // Edges from source nodes to pseudo-node
    pn.connectsFrom.forEach(fromId => {
      if (nodeIds.has(fromId)) {
        edges.push({ source: fromId, target: pn.id });
      }
    });
    // Edges from pseudo-node to target nodes
    pn.connectsTo.forEach(toId => {
      if (nodeIds.has(toId)) {
        edges.push({ source: pn.id, target: toId });
      }
    });
    return edges;
  });

  // Find connected components (include pseudo-nodes and pseudo-edges)
  const allNodesList = [...filteredNodes, ...pseudoNodes.map(pn => ({ id: pn.id, moduleId: pn.moduleId } as MechanisticNode))];
  const allEdgesForComponents = [...filteredEdges, ...pseudoEdges];
  const components = findFilteredComponents(allNodesList, allEdgesForComponents);

  // Sort components by size (largest first)
  components.sort((a, b) => b.length - a.length);

  // Layout each component separately
  let globalYOffset = 50;
  const layerWidth = 280;   // Slightly wider horizontal spacing
  const nodeHeight = 100;   // More vertical spacing between nodes
  const componentGap = 120;

  components.forEach((component) => {
    const componentNodeIds = new Set(component);

    // Identify input and output boundaries in this component
    const inputBoundaries = component.filter(id => {
      const node = nodeMap.get(id);
      return node?.category === 'BOUNDARY' && node.boundaryDirection === 'input';
    });
    const outputBoundaries = component.filter(id => {
      const node = nodeMap.get(id);
      return node?.category === 'BOUNDARY' && node.boundaryDirection === 'output';
    });

    // Find sources within this component (nodes with no incoming edges from within the component)
    // Input boundaries should always be treated as sources
    let sources = component.filter(id => {
      const incomingInComponent = (incoming[id] || []).filter(p => componentNodeIds.has(p));
      return incomingInComponent.length === 0;
    });

    // Ensure all input boundaries are included as sources
    inputBoundaries.forEach(id => {
      if (!sources.includes(id)) {
        sources.push(id);
      }
    });

    // If no sources (cycle detected), pick ONE node with fewest incoming as the starting point
    if (sources.length === 0) {
      const incomingCounts = component.map(id => ({
        id,
        count: (incoming[id] || []).filter(p => componentNodeIds.has(p)).length
      }));
      incomingCounts.sort((a, b) => a.count - b.count);
      // Only pick the FIRST node with minimum incoming, not all of them
      sources.push(incomingCounts[0].id);
    }

    // Assign layers via BFS with cycle detection
    // We use a modified Kahn's algorithm that tracks back edges
    const layers = new Map<string, number>();
    const queue = [...sources];
    sources.forEach(id => layers.set(id, 0));

    const processed = new Set<string>();
    const inQueue = new Set<string>(sources);
    let iterations = 0;
    const maxIterations = component.length * 10;

    // Track which edges are back edges (cycle-completing)
    // A back edge is one where the target has a lower or equal layer than the source
    // We detect these when a predecessor hasn't been processed but is in a cycle

    while (queue.length > 0 && iterations < maxIterations) {
      iterations++;
      const nodeId = queue.shift()!;
      inQueue.delete(nodeId);

      if (!componentNodeIds.has(nodeId)) continue;
      if (processed.has(nodeId)) continue;

      const preds = (incoming[nodeId] || []).filter(p => componentNodeIds.has(p));

      // Check which predecessors have been processed
      // If a predecessor is not processed and not in queue, it might be part of a cycle
      const processedPreds = preds.filter(p => layers.has(p));
      const unprocessedPreds = preds.filter(p => !layers.has(p));

      // If all predecessors are processed, or we've been iterating long enough (cycle detected), proceed
      const shouldProcess = unprocessedPreds.length === 0 ||
        (iterations > component.length && processedPreds.length > 0);

      if (!shouldProcess) {
        queue.push(nodeId);
        inQueue.add(nodeId);
        continue;
      }

      // Mark edges from unprocessed predecessors as back edges
      // (they are predecessors that haven't been processed yet, meaning they're downstream in the BFS)
      unprocessedPreds.forEach(predId => {
        const edgeId = edgeIdMap.get(`${predId}->${nodeId}`);
        if (edgeId) {
          backEdges.add(edgeId);
        }
      });

      const predLayers = processedPreds.map(p => layers.get(p) ?? -1);
      const layer = predLayers.length > 0 ? Math.max(...predLayers) + 1 : 0;
      layers.set(nodeId, layer);
      processed.add(nodeId);

      (outgoing[nodeId] || []).forEach(succ => {
        if (componentNodeIds.has(succ)) {
          if (processed.has(succ)) {
            // This is a back edge - going to an already processed node
            const edgeId = edgeIdMap.get(`${nodeId}->${succ}`);
            if (edgeId) {
              backEdges.add(edgeId);
            }
          } else if (!inQueue.has(succ)) {
            queue.push(succ);
            inQueue.add(succ);
          }
        }
      });
    }

    // Handle remaining nodes - place them based on their module's pseudo-node layer
    const maxLayer = Math.max(...Array.from(layers.values()), 0);

    // Find pseudo-node layers for reference
    const pseudoNodeLayers = new Map<string, number>();
    pseudoNodes.forEach(pn => {
      if (layers.has(pn.id)) {
        pseudoNodeLayers.set(pn.moduleId, layers.get(pn.id)!);
      }
    });

    // For unprocessed nodes, find the module they belong to and place them after relevant pseudo-node
    component.forEach(id => {
      if (!layers.has(id)) {
        const node = nodeMap.get(id);
        if (node) {
          // Check if there's a pseudo-node for a hidden module that connects to this node's module
          // Find the pseudo-node that connects TO this module
          let bestPseudoLayer = -1;
          pseudoNodes.forEach(pn => {
            if (pn.connectsTo.some(toId => {
              const toNode = nodeMap.get(toId);
              return toNode && toNode.moduleId === node.moduleId;
            })) {
              const pnLayer = layers.get(pn.id);
              if (pnLayer !== undefined && pnLayer > bestPseudoLayer) {
                bestPseudoLayer = pnLayer;
              }
            }
          });

          if (bestPseudoLayer >= 0) {
            // Place after the pseudo-node
            layers.set(id, bestPseudoLayer + 1);
          } else {
            layers.set(id, maxLayer + 1);
          }
        } else {
          layers.set(id, maxLayer + 1);
        }
      }
    });

    // Now do a second BFS pass for nodes that were placed after pseudo-nodes
    // to properly order them relative to each other
    const unprocessedInDownstream = component.filter(id =>
      !processed.has(id) && layers.has(id) && layers.get(id)! > 0
    );

    if (unprocessedInDownstream.length > 0) {
      // Re-run BFS just for these nodes to get proper relative ordering
      const downstreamQueue = [...unprocessedInDownstream];
      let downstreamIter = 0;
      const maxDownstreamIter = unprocessedInDownstream.length * 10;

      while (downstreamQueue.length > 0 && downstreamIter < maxDownstreamIter) {
        downstreamIter++;
        const nodeId = downstreamQueue.shift()!;
        if (processed.has(nodeId)) continue;

        const preds = (incoming[nodeId] || []).filter(p => componentNodeIds.has(p));
        const predsWithLayers = preds.filter(p => layers.has(p));

        if (predsWithLayers.length > 0) {
          const predLayers = predsWithLayers.map(p => layers.get(p)!);
          const newLayer = Math.max(...predLayers) + 1;
          if (newLayer > layers.get(nodeId)!) {
            layers.set(nodeId, newLayer);
          }
        }

        processed.add(nodeId);

        // Add successors to queue
        (outgoing[nodeId] || []).forEach(succ => {
          if (componentNodeIds.has(succ) && !processed.has(succ) && unprocessedInDownstream.includes(succ)) {
            downstreamQueue.push(succ);
          }
        });
      }
    }

    // Group by layer
    const layerGroups: Map<number, string[]> = new Map();
    layers.forEach((layer, nodeId) => {
      if (!layerGroups.has(layer)) {
        layerGroups.set(layer, []);
      }
      layerGroups.get(layer)!.push(nodeId);
    });

    // Layer balancing: try to move nodes to later layers if it helps balance
    // This reduces clustering in middle layers by pushing nodes toward their sinks
    const sortedLayerKeys = Array.from(layerGroups.keys()).sort((a, b) => a - b);
    const totalLayers = sortedLayerKeys.length;

    if (totalLayers > 2) {
      // Calculate ideal layer width (average)
      const idealWidth = Math.ceil(component.length / totalLayers);

      // For each layer from second-to-last backward, try to push nodes to later layers
      for (let i = sortedLayerKeys.length - 2; i >= 0; i--) {
        const currentLayerIdx = sortedLayerKeys[i];
        const currentLayerNodes = layerGroups.get(currentLayerIdx) || [];

        // If this layer is too crowded, try to push some nodes to later layers
        if (currentLayerNodes.length > idealWidth * 1.5) {
          const nodesToPush: string[] = [];

          currentLayerNodes.forEach(nodeId => {
            // Skip dummy and pseudo nodes
            if (nodeId.startsWith('__dummy_') || nodeId.startsWith('__pseudo_')) return;

            // Check if all successors are at layer + 2 or greater (i.e., there's room to push)
            const succs = (outgoing[nodeId] || []).filter(s => componentNodeIds.has(s));
            if (succs.length === 0) return; // Don't push sinks

            const minSuccLayer = Math.min(...succs.map(s => layers.get(s) ?? currentLayerIdx));
            if (minSuccLayer > currentLayerIdx + 1) {
              // Can push this node one layer later
              nodesToPush.push(nodeId);
            }
          });

          // Push nodes to balance (but don't push too many)
          const toPush = nodesToPush.slice(0, Math.floor(currentLayerNodes.length / 3));
          toPush.forEach(nodeId => {
            const currentLayer = layers.get(nodeId)!;
            layers.set(nodeId, currentLayer + 1);

            // Update layer groups
            const idx = layerGroups.get(currentLayer)!.indexOf(nodeId);
            if (idx >= 0) layerGroups.get(currentLayer)!.splice(idx, 1);
            if (!layerGroups.has(currentLayer + 1)) layerGroups.set(currentLayer + 1, []);
            layerGroups.get(currentLayer + 1)!.push(nodeId);
          });
        }
      }
    }

    // Move output boundaries to the rightmost layer
    // This ensures clinical outcomes appear on the right side of the graph
    if (outputBoundaries.length > 0) {
      const maxLayer = Math.max(...Array.from(layers.values()));
      const outputLayer = maxLayer + 1;

      outputBoundaries.forEach(id => {
        const currentLayer = layers.get(id);
        if (currentLayer !== undefined && currentLayer !== outputLayer) {
          // Remove from current layer group
          const currentGroup = layerGroups.get(currentLayer);
          if (currentGroup) {
            const idx = currentGroup.indexOf(id);
            if (idx >= 0) currentGroup.splice(idx, 1);
          }

          // Add to output layer
          layers.set(id, outputLayer);
          if (!layerGroups.has(outputLayer)) {
            layerGroups.set(outputLayer, []);
          }
          layerGroups.get(outputLayer)!.push(id);
        }
      });
    }

    // Insert dummy nodes for long edges (edges spanning multiple layers)
    // This is critical for proper crossing minimization
    const dummyNodes: { id: string; layer: number; sourceId: string; targetId: string }[] = [];
    const dummyOutgoing: Record<string, string[]> = { ...outgoing };
    const dummyIncoming: Record<string, string[]> = { ...incoming };

    // Find all edges and check if they span multiple layers
    component.forEach(sourceId => {
      const sourceLayer = layers.get(sourceId);
      if (sourceLayer === undefined) return;

      (outgoing[sourceId] || []).forEach(targetId => {
        if (!componentNodeIds.has(targetId)) return;
        const targetLayer = layers.get(targetId);
        if (targetLayer === undefined) return;

        // Skip back edges
        const edgeId = edgeIdMap.get(`${sourceId}->${targetId}`);
        if (edgeId && backEdges.has(edgeId)) return;

        const layerDiff = targetLayer - sourceLayer;
        if (layerDiff > 1) {
          // This edge spans multiple layers - insert dummy nodes
          let prevNodeId = sourceId;

          for (let l = sourceLayer + 1; l < targetLayer; l++) {
            const dummyId = `__dummy_${sourceId}_${targetId}_${l}`;
            dummyNodes.push({ id: dummyId, layer: l, sourceId, targetId });
            layers.set(dummyId, l);

            if (!layerGroups.has(l)) {
              layerGroups.set(l, []);
            }
            layerGroups.get(l)!.push(dummyId);

            // Update adjacency for dummy nodes
            dummyOutgoing[dummyId] = [];
            dummyIncoming[dummyId] = [];

            // Connect previous node to this dummy
            if (!dummyOutgoing[prevNodeId]) dummyOutgoing[prevNodeId] = [...(outgoing[prevNodeId] || [])];
            dummyOutgoing[prevNodeId] = dummyOutgoing[prevNodeId].filter(t => t !== targetId);
            dummyOutgoing[prevNodeId].push(dummyId);
            dummyIncoming[dummyId].push(prevNodeId);

            prevNodeId = dummyId;
          }

          // Connect last dummy to target
          dummyOutgoing[prevNodeId].push(targetId);
          if (!dummyIncoming[targetId]) dummyIncoming[targetId] = [...(incoming[targetId] || [])];
          dummyIncoming[targetId] = dummyIncoming[targetId].filter(s => s !== sourceId);
          dummyIncoming[targetId].push(prevNodeId);
        }
      });
    });

    // Use dummy-aware adjacency for crossing minimization
    const adjOutgoing = dummyNodes.length > 0 ? dummyOutgoing : outgoing;
    const adjIncoming = dummyNodes.length > 0 ? dummyIncoming : incoming;

    // Sort within layers by module initially
    layerGroups.forEach(ids => {
      ids.sort((a, b) => {
        if (a.startsWith('__dummy_')) return 1;
        if (b.startsWith('__dummy_')) return -1;
        const modA = nodeMap.get(a)?.moduleId || pseudoNodes.find(p => p.id === a)?.moduleId || '';
        const modB = nodeMap.get(b)?.moduleId || pseudoNodes.find(p => p.id === b)?.moduleId || '';
        return modA.localeCompare(modB);
      });
    });

    // Initialize positions
    const nodePositionInLayer = new Map<string, number>();
    layerGroups.forEach(ids => {
      ids.forEach((id, idx) => nodePositionInLayer.set(id, idx));
    });

    const sortedLayers = Array.from(layerGroups.keys()).sort((a, b) => a - b);

    // Helper: get predecessors in specific layer (using dummy-aware adjacency, excluding back edges)
    const getNonBackPreds = (id: string, targetLayer: number): string[] => {
      return (adjIncoming[id] || []).filter(p => {
        if (layers.get(p) !== targetLayer) return false;
        // For dummy nodes, no need to check back edges
        if (id.startsWith('__dummy_') || p.startsWith('__dummy_')) return true;
        const edgeId = edgeIdMap.get(`${p}->${id}`);
        return !edgeId || !backEdges.has(edgeId);
      });
    };

    // Helper: get successors in specific layer (using dummy-aware adjacency, excluding back edges)
    const getNonBackSuccs = (id: string, targetLayer: number): string[] => {
      return (adjOutgoing[id] || []).filter(s => {
        if (layers.get(s) !== targetLayer) return false;
        // For dummy nodes, no need to check back edges
        if (id.startsWith('__dummy_') || s.startsWith('__dummy_')) return true;
        const edgeId = edgeIdMap.get(`${id}->${s}`);
        return !edgeId || !backEdges.has(edgeId);
      });
    };

    // Helper: count edge crossings between two adjacent layers
    const countCrossings = (layer1: number, layer2: number): number => {
      const ids1 = layerGroups.get(layer1) || [];
      const ids2 = layerGroups.get(layer2) || [];
      let crossings = 0;

      for (let i = 0; i < ids1.length; i++) {
        for (let j = i + 1; j < ids1.length; j++) {
          const nodeA = ids1[i];
          const nodeB = ids1[j];
          const posA = nodePositionInLayer.get(nodeA) ?? i;
          const posB = nodePositionInLayer.get(nodeB) ?? j;

          // Get successors in layer2 (excluding back edges)
          const succsA = getNonBackSuccs(nodeA, layer2);
          const succsB = getNonBackSuccs(nodeB, layer2);

          // Count crossings: when nodeA is above nodeB but has a successor below nodeB's successor
          for (const sA of succsA) {
            const posSuccA = nodePositionInLayer.get(sA) ?? 0;
            for (const sB of succsB) {
              const posSuccB = nodePositionInLayer.get(sB) ?? 0;
              // Crossing occurs when relative order is reversed
              if ((posA < posB && posSuccA > posSuccB) || (posA > posB && posSuccA < posSuccB)) {
                crossings++;
              }
            }
          }
        }
      }
      return crossings;
    };

    // Helper: compute median position from a list of positions
    const getMedian = (positions: number[]): number => {
      if (positions.length === 0) return 0;
      const sorted = [...positions].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
      }
      return sorted[mid];
    };

    // Bidirectional median heuristic: each node is positioned based on BOTH predecessors AND successors
    // This creates more balanced layouts by pulling nodes toward their connections on both sides
    for (let iter = 0; iter < 8; iter++) {
      // Bidirectional pass: position each layer using weighted average of predecessor and successor medians
      for (let i = 0; i < sortedLayers.length; i++) {
        const layer = sortedLayers[i];
        const prevLayer = i > 0 ? sortedLayers[i - 1] : null;
        const nextLayer = i < sortedLayers.length - 1 ? sortedLayers[i + 1] : null;
        const ids = layerGroups.get(layer)!;
        const bidirectionalPos = new Map<string, number>();

        ids.forEach(id => {
          let totalWeight = 0;
          let weightedSum = 0;

          // Get median from predecessors (if not first layer)
          if (prevLayer !== null) {
            const preds = getNonBackPreds(id, prevLayer);
            if (preds.length > 0) {
              const predPositions = preds.map(p => nodePositionInLayer.get(p) ?? 0);
              const predMedian = getMedian(predPositions);
              // Weight by number of connections
              weightedSum += predMedian * preds.length;
              totalWeight += preds.length;
            }
          }

          // Get median from successors (if not last layer)
          if (nextLayer !== null) {
            const succs = getNonBackSuccs(id, nextLayer);
            if (succs.length > 0) {
              const succPositions = succs.map(t => nodePositionInLayer.get(t) ?? 0);
              const succMedian = getMedian(succPositions);
              // Weight by number of connections
              weightedSum += succMedian * succs.length;
              totalWeight += succs.length;
            }
          }

          if (totalWeight > 0) {
            bidirectionalPos.set(id, weightedSum / totalWeight);
          } else {
            bidirectionalPos.set(id, nodePositionInLayer.get(id) ?? 0);
          }
        });

        ids.sort((a, b) => (bidirectionalPos.get(a) ?? 0) - (bidirectionalPos.get(b) ?? 0));
        ids.forEach((id, idx) => nodePositionInLayer.set(id, idx));
      }

      // Local swap improvement: try swapping adjacent nodes if it reduces crossings
      for (let i = 0; i < sortedLayers.length; i++) {
        const layer = sortedLayers[i];
        const ids = layerGroups.get(layer)!;

        let improved = true;
        let swapIterations = 0;
        const maxSwapIterations = ids.length * 3; // Prevent infinite loops

        while (improved && swapIterations < maxSwapIterations) {
          improved = false;
          swapIterations++;

          for (let j = 0; j < ids.length - 1; j++) {
            // Calculate crossings before swap
            const prevCrossings = (i > 0 ? countCrossings(sortedLayers[i - 1], layer) : 0) +
                                  (i < sortedLayers.length - 1 ? countCrossings(layer, sortedLayers[i + 1]) : 0);

            // Try swap
            [ids[j], ids[j + 1]] = [ids[j + 1], ids[j]];
            ids.forEach((id, idx) => nodePositionInLayer.set(id, idx));

            // Calculate crossings after swap
            const newCrossings = (i > 0 ? countCrossings(sortedLayers[i - 1], layer) : 0) +
                                 (i < sortedLayers.length - 1 ? countCrossings(layer, sortedLayers[i + 1]) : 0);

            if (newCrossings < prevCrossings) {
              improved = true; // Keep the swap
            } else {
              // Revert swap
              [ids[j], ids[j + 1]] = [ids[j + 1], ids[j]];
              ids.forEach((id, idx) => nodePositionInLayer.set(id, idx));
            }
          }
        }
      }
    }

    // Calculate positions for this component (excluding dummy nodes from final output)
    let maxYInComponent = 0;
    layerGroups.forEach((ids, layer) => {
      ids.forEach((id, idx) => {
        const y = globalYOffset + idx * nodeHeight;
        // Only add real nodes to positions (not dummy nodes)
        if (!id.startsWith('__dummy_')) {
          positions.set(id, {
            x: layer * layerWidth + 50,
            y,
          });
        }
        maxYInComponent = Math.max(maxYInComponent, y + nodeHeight);
      });
    });

    globalYOffset = maxYInComponent + componentGap;
  });

  // Post-processing: Identify back edges based on final positions
  // A back edge goes from a node with higher X (later layer) to a node with lower X (earlier layer)
  // This is more reliable than BFS-based detection
  backEdges.clear(); // Reset and recompute

  filteredEdges.forEach(e => {
    const sourcePos = positions.get(e.source);
    const targetPos = positions.get(e.target);

    if (sourcePos && targetPos) {
      // If the edge goes backward (target is at same or earlier X position than source)
      // it's a feedback loop / back edge
      if (targetPos.x <= sourcePos.x) {
        const edgeId = edgeIdMap.get(`${e.source}->${e.target}`);
        if (edgeId) {
          backEdges.add(edgeId);
        }
      }
    }
  });

  return { positions, backEdges };
}

// Module labels for pseudo-nodes
const moduleLabels: Record<string, string> = {
  'BOUNDARY': 'Boundary',
  'M01': 'Insulin/mTOR',
  'M02': 'Lysosomal',
  'M03': 'Mitochondrial',
  'M04': 'Inflammasome',
  'M05': 'Microglial',
  'M06': 'Amyloid',
  'M07': 'Tau',
  'M08': 'Complement',
  'M09': 'Iron',
  'M10': 'APOE',
  'M11': 'TREM2',
  'M12': 'BBB/Glymphatic',
  'M13': 'Cholinergic',
  'M14': 'MAM/Calcium',
  'M15': 'Interventions',
  'M16': 'Sex/Ancestry',
  'M17': 'Immunomodulatory',
};

// Boundary expansion config
interface BoundaryExpansionConfig {
  inputExpanded: boolean;
  outputExpanded: boolean;
  onToggleInput: () => void;
  onToggleOutput: () => void;
}

// Convert mechanistic nodes to React Flow nodes with dynamic layout
function convertNodes(
  nodes: MechanisticNode[],
  moduleFilters: Record<string, ModuleFilterState>,
  variantCallbacks?: VariantCallbacks,
  pinnedNodes: Set<string> = new Set(),
  boundaryExpansion?: BoundaryExpansionConfig
): { flowNodes: Node[]; pseudoNodes: PseudoNode[]; excludedEdges: Set<string>; nodePositions: Map<string, LayoutPosition>; backEdges: Set<string> } {
  // Identify input and output boundaries from all nodes
  const inputBoundaryNodes = nodes.filter(n =>
    n.category === 'BOUNDARY' && n.boundaryDirection === 'input'
  );
  const outputBoundaryNodes = nodes.filter(n =>
    n.category === 'BOUNDARY' && n.boundaryDirection === 'output'
  );

  // Filter nodes based on module filter state OR pinned status
  // Also filter out collapsed boundaries
  const filteredNodes = nodes.filter(n => {
    // Always include pinned nodes
    if (pinnedNodes.has(n.id)) return true;

    // Check boundary expansion state
    if (n.category === 'BOUNDARY' && boundaryExpansion) {
      if (n.boundaryDirection === 'input' && !boundaryExpansion.inputExpanded) {
        return false; // Hide input boundaries when collapsed
      }
      if (n.boundaryDirection === 'output' && !boundaryExpansion.outputExpanded) {
        return false; // Hide output boundaries when collapsed
      }
    }

    // Otherwise filter by module state
    const state = moduleFilters[n.moduleId];
    return state === 'on' || state === 'partial';
  });

  // Check if only boundaries are visible (auto-expand to graph view)
  const activeModules = new Set(filteredNodes.map(n => n.moduleId));
  const onlyBoundariesVisible = activeModules.size === 1 && activeModules.has('BOUNDARY');

  const flowNodes: Node[] = [];

  // Find pseudo-nodes for hidden connecting modules
  const { pseudoNodes, excludedEdges } = findPseudoNodes(filteredNodes, allEdges, nodes);

  // Compute dynamic layout for filtered nodes + pseudo nodes (also identifies back edges)
  const { positions: dynamicPositions, backEdges } = computeGreedyLayout(filteredNodes, allEdges, pseudoNodes, excludedEdges);

  // Add pseudo-nodes to flow
  pseudoNodes.forEach(pn => {
    const pos = dynamicPositions.get(pn.id);
    const color = moduleColors[pn.moduleId] || '#787473';

    flowNodes.push({
      id: pn.id,
      position: { x: pos?.x ?? 50, y: pos?.y ?? 50 },
      data: {
        label: `via ${moduleLabels[pn.moduleId] || pn.moduleId}`,
        moduleId: pn.moduleId,
        isPseudo: true,
      },
      style: {
        background: '#f5f3f0',
        border: `2px dashed ${color}`,
        borderRadius: '16px',
        padding: '4px 10px',
        fontSize: '10px',
        fontWeight: 500,
        fontStyle: 'italic',
        color: '#7a7a7a',
        width: 120,
        textAlign: 'center' as const,
        opacity: 0.8,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });
  });

  filteredNodes.forEach((node) => {
    // Use dynamically computed position
    const pos = dynamicPositions.get(node.id);
    const x = pos?.x ?? 50;
    const y = pos?.y ?? 50;
    const color = moduleColors[node.moduleId] || '#787473';
    const catStyle = categoryStyles[node.category] || categoryStyles['STATE'];
    const isPartial = moduleFilters[node.moduleId] === 'partial';

    // SBSF v2.0: Apply role-based styling if node has roles
    let borderColor = color;
    let borderStyle = catStyle.borderStyle;
    if (node.roles) {
      // Check for role-specific styling (priority: REGULATOR > THERAPEUTIC_TARGET > BIOMARKER > DRUG)
      for (const role of ['REGULATOR', 'THERAPEUTIC_TARGET', 'BIOMARKER', 'DRUG'] as const) {
        if (node.roles.includes(role) && roleStyles[role]) {
          if (roleStyles[role].borderColor) borderColor = roleStyles[role].borderColor!;
          if (roleStyles[role].borderStyle) borderStyle = roleStyles[role].borderStyle!;
          break;
        }
      }
    }

    // Check if this is a boundary node with variants
    const hasVariants = node.category === 'BOUNDARY' && node.variants && node.variants.length > 0;

    // Use custom node type for boundary nodes with variants
    if (hasVariants) {
      flowNodes.push({
        id: node.id,
        type: 'boundaryVariant',
        position: { x, y },
        data: {
          label: node.label,
          variants: node.variants,
          defaultVariant: node.defaultVariant,
          moduleId: node.moduleId,
          isPartial,
          forceGraphView: onlyBoundariesVisible, // Auto-expand when only boundaries visible
          // Pass variant callbacks if provided
          onVariantSelect: variantCallbacks?.onVariantSelect,
          onVariantHover: variantCallbacks?.onVariantHover,
          selectedVariant: variantCallbacks?.selectedVariant,
          hoveredVariant: variantCallbacks?.hoveredVariant,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });
    } else {
      // Standard node
      flowNodes.push({
        id: node.id,
        position: { x, y },
        data: {
          label: node.label,
          description: node.description,
          mechanism: node.mechanism,
          moduleId: node.moduleId,
          category: node.category,
          subtype: node.subtype,
          roles: node.roles,
          // Boundary variant data (for non-variant boundaries)
          variants: node.variants,
          defaultVariant: node.defaultVariant,
          hasVariants,
        },
        style: {
          background: '#ffffff',
          border: `${catStyle.borderWidth}px ${borderStyle} ${borderColor}`,
          // SBSF v2.0 shapes: STOCK = circle, BOUNDARY = box, STATE = rounded box
          borderRadius: node.category === 'STOCK' ? '50%' : node.category === 'BOUNDARY' ? '4px' : '8px',
          padding: '8px 12px',
          fontSize: '11px',
          fontWeight: 500,
          color: '#2d2d2d',
          width: 180,
          textAlign: 'center' as const,
          opacity: isPartial ? 0.5 : 1,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });
    }
  });

  // Add boundary expand/collapse buttons when boundaries are collapsed
  if (boundaryExpansion) {
    // Calculate Y midpoint for button positioning
    const allYPositions = Array.from(dynamicPositions.values()).map(p => p.y);
    const minY = Math.min(...allYPositions, 0);
    const maxY = Math.max(...allYPositions, 0);
    const midY = (minY + maxY) / 2;

    // Get X boundaries
    const allXPositions = Array.from(dynamicPositions.values()).map(p => p.x);
    const minX = Math.min(...allXPositions, 50);
    const maxX = Math.max(...allXPositions, 50);

    // Count how many input/output boundaries would be visible if expanded
    const visibleInputCount = inputBoundaryNodes.filter(n => {
      const state = moduleFilters[n.moduleId];
      return state === 'on' || state === 'partial' || pinnedNodes.has(n.id);
    }).length;

    const visibleOutputCount = outputBoundaryNodes.filter(n => {
      const state = moduleFilters[n.moduleId];
      return state === 'on' || state === 'partial' || pinnedNodes.has(n.id);
    }).length;

    // Add input expand button (left side)
    if (visibleInputCount > 0) {
      flowNodes.push({
        id: '__boundary_expand_input__',
        type: 'boundaryExpandButton',
        position: {
          x: minX - 150,
          y: midY - 30,
        },
        data: {
          direction: 'input',
          isExpanded: boundaryExpansion.inputExpanded,
          boundaryCount: visibleInputCount,
          onToggle: boundaryExpansion.onToggleInput,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });
    }

    // Add output expand button (right side)
    if (visibleOutputCount > 0) {
      flowNodes.push({
        id: '__boundary_expand_output__',
        type: 'boundaryExpandButton',
        position: {
          x: maxX + 100,
          y: midY - 30,
        },
        data: {
          direction: 'output',
          isExpanded: boundaryExpansion.outputExpanded,
          boundaryCount: visibleOutputCount,
          onToggle: boundaryExpansion.onToggleOutput,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });
    }
  }

  return { flowNodes, pseudoNodes, excludedEdges, nodePositions: dynamicPositions, backEdges };
}

// Get variant data for a boundary node
function getVariantData(sourceNodeId: string, variantId: string | null): BoundaryVariant | undefined {
  if (!variantId) return undefined;
  const sourceNode = allNodes.find(n => n.id === sourceNodeId);
  if (!sourceNode?.variants) return undefined;
  return sourceNode.variants.find(v => v.id === variantId);
}

// Convert mechanistic edges to React Flow edges
// Returns both edges and waypoint nodes for back edge routing
function convertEdges(
  edges: typeof allEdges,
  moduleFilters: Record<string, ModuleFilterState>,
  activeVariantNodeId: string | null,
  activeVariant: BoundaryVariant | null,
  pseudoNodes: PseudoNode[] = [],
  excludedEdges: Set<string> = new Set(),
  backEdges: Set<string> = new Set(),
  pinnedNodes: Set<string> = new Set(),
  nodePositions: Map<string, LayoutPosition> = new Map(),
  showFeedbackLoops: boolean = true
): { edges: Edge[]; waypointNodes: Node[] } {
  // Filter edges based on module filter state OR if connecting pinned nodes
  const filteredEdges = edges.filter(e => {
    if (excludedEdges.has(e.id)) return false;
    // Filter out back edges (feedback loops) if toggle is off
    if (!showFeedbackLoops && backEdges.has(e.id)) return false;
    // Include edge if either endpoint is pinned
    if (pinnedNodes.has(e.source) || pinnedNodes.has(e.target)) return true;
    // Otherwise filter by module state
    const state = moduleFilters[e.moduleId];
    return state === 'on' || state === 'partial';
  });

  const flowEdges: Edge[] = [];
  const waypointNodes: Node[] = [];

  // Calculate the bottom of the graph for back edge routing
  const allYPositions = Array.from(nodePositions.values()).map(p => p.y);
  const maxY = allYPositions.length > 0 ? Math.max(...allYPositions) : 0;
  const backEdgeBaseY = maxY + 150; // Start back edges 150px below the lowest node

  // Track back edge index for staggering
  let backEdgeIndex = 0;

  // Add pseudo-edges for pseudo-nodes
  pseudoNodes.forEach(pn => {
    const color = moduleColors[pn.moduleId] || '#787473';

    // Edges from source nodes to pseudo-node
    pn.connectsFrom.forEach((fromId, idx) => {
      flowEdges.push({
        id: `${pn.id}_in_${idx}`,
        source: fromId,
        target: pn.id,
        animated: false,
        style: {
          stroke: color,
          strokeWidth: 1,
          strokeDasharray: '5,5',
          cursor: 'pointer',
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color,
        },
      });
    });

    // Edges from pseudo-node to target nodes
    pn.connectsTo.forEach((toId, idx) => {
      flowEdges.push({
        id: `${pn.id}_out_${idx}`,
        source: pn.id,
        target: toId,
        animated: false,
        style: {
          stroke: color,
          strokeWidth: 1,
          strokeDasharray: '5,5',
          cursor: 'pointer',
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color,
        },
      });
    });
  });

  filteredEdges.forEach(edge => {
    // Check if this edge originates from a boundary node with an active variant
    const isVariantEdge = !!(activeVariantNodeId && edge.source === activeVariantNodeId && activeVariant);

    // Check if this is a back edge (cycle-completing edge detected during BFS)
    const isBackEdge = backEdges.has(edge.id);

    // Determine edge color based on relation type (case-insensitive check)
    let strokeColor = edge.relation.toLowerCase().includes('decrease') ? '#c75146' : '#007385';
    let strokeWidth = edge.causalConfidence?.startsWith('L')
      ? Math.max(1, 8 - parseInt(edge.causalConfidence.slice(1)))
      : 1;

    // Back edges get special styling - red/orange and dashed
    if (isBackEdge) {
      strokeColor = '#e36216'; // Orange for back edges (feedback loops)
      strokeWidth = 1.5;
    }

    if (isVariantEdge && activeVariant) {
      // Color based on effect direction
      strokeColor = activeVariant.effectDirection === 'protective'
        ? '#34d399' // Green for protective
        : activeVariant.effectDirection === 'risk'
        ? '#c75146' // Red for risk
        : '#787473'; // Gray for neutral

      // Width based on effect magnitude
      strokeWidth = Math.max(2, Math.min(6, (activeVariant.effectMagnitude || 1) * 1.5));
    }

    // For back edges, create waypoint nodes to route around the bottom of the graph
    if (isBackEdge && nodePositions.size > 0) {
      const sourcePos = nodePositions.get(edge.source);
      const targetPos = nodePositions.get(edge.target);

      if (sourcePos && targetPos) {
        // Stagger each back edge lower to prevent overlap
        const staggerY = backEdgeBaseY + (backEdgeIndex * 60);
        backEdgeIndex++;

        // Create two waypoint nodes: one below source, one below target
        const waypoint1Id = `__waypoint_${edge.id}_1`;
        const waypoint2Id = `__waypoint_${edge.id}_2`;

        // Position waypoints: source side goes down first, then across, then up to target
        waypointNodes.push({
          id: waypoint1Id,
          position: { x: sourcePos.x + 90, y: staggerY }, // Below source
          data: { isWaypoint: true },
          style: {
            width: 1,
            height: 1,
            background: 'transparent',
            border: 'none',
            padding: 0,
          },
          sourcePosition: Position.Left,
          targetPosition: Position.Right,
        });

        waypointNodes.push({
          id: waypoint2Id,
          position: { x: targetPos.x + 90, y: staggerY }, // Below target
          data: { isWaypoint: true },
          style: {
            width: 1,
            height: 1,
            background: 'transparent',
            border: 'none',
            padding: 0,
          },
          sourcePosition: Position.Left,
          targetPosition: Position.Right,
        });

        // Edge from source to waypoint1 (going down)
        flowEdges.push({
          id: `${edge.id}_seg1`,
          source: edge.source,
          target: waypoint1Id,
          type: 'smoothstep',
          style: {
            stroke: strokeColor,
            strokeWidth,
            strokeDasharray: '6,4',
          },
        });

        // Edge from waypoint1 to waypoint2 (horizontal, below the graph)
        // This is where we put the label
        flowEdges.push({
          id: `${edge.id}_seg2`,
          source: waypoint1Id,
          target: waypoint2Id,
          type: 'straight',
          style: {
            stroke: strokeColor,
            strokeWidth,
            strokeDasharray: '6,4',
          },
          label: edge.mechanismLabel?.slice(0, 25) || 'feedback',
          labelStyle: {
            fontSize: 9,
            fill: strokeColor,
            fontWeight: 500,
          },
          labelBgStyle: {
            fill: 'rgba(255, 255, 255, 0.9)',
          },
          data: {
            mechanismLabel: edge.mechanismLabel,
            mechanismDescription: edge.mechanismDescription,
            relation: edge.relation,
            edgeType: edge.edgeType,
            causalConfidence: edge.causalConfidence,
            evidence: edge.evidence,
            keyInsight: edge.keyInsight,
            therapeuticImplication: edge.therapeuticImplication,
            translationalGap: edge.translationalGap,
            isBackEdge: true,
          },
        });

        // Edge from waypoint2 to target (going up)
        flowEdges.push({
          id: `${edge.id}_seg3`,
          source: waypoint2Id,
          target: edge.target,
          type: 'smoothstep',
          style: {
            stroke: strokeColor,
            strokeWidth,
            strokeDasharray: '6,4',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: strokeColor,
          },
        });

        return; // Skip normal edge creation for back edges
      }
    }

    // Normal edge creation (for non-back edges or when positions not available)
    flowEdges.push({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'default',
      animated: isVariantEdge || edge.relation === 'directlyIncreases' || edge.relation === 'directlyDecreases',
      style: {
        stroke: strokeColor,
        strokeWidth,
        cursor: 'pointer',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: strokeColor,
      },
      label: isVariantEdge && activeVariant
        ? `${activeVariant.label} (${activeVariant.effectMagnitude}x)`
        : edge.mechanismLabel?.slice(0, 20),
      labelStyle: {
        fontSize: isVariantEdge ? 10 : 9,
        fill: isVariantEdge ? strokeColor : '#7a7a7a',
        fontWeight: isVariantEdge ? 600 : 400,
        cursor: 'pointer',
      },
      // Store full edge data for tooltip
      data: {
        mechanismLabel: edge.mechanismLabel,
        mechanismDescription: edge.mechanismDescription,
        relation: edge.relation,
        edgeType: edge.edgeType,
        causalConfidence: edge.causalConfidence,
        evidence: edge.evidence,
        keyInsight: edge.keyInsight,
        therapeuticImplication: edge.therapeuticImplication,
        translationalGap: edge.translationalGap,
        // Add variant info if applicable
        activeVariant: isVariantEdge ? activeVariant : undefined,
      },
    });
  });

  return { edges: flowEdges, waypointNodes };
}

// Get unique modules for filter
function getModules(nodes: MechanisticNode[]): { id: string; label: string; count: number }[] {
  const moduleMap: Record<string, number> = {};
  nodes.forEach(node => {
    moduleMap[node.moduleId] = (moduleMap[node.moduleId] || 0) + 1;
  });

  const moduleLabels: Record<string, string> = {
    'BOUNDARY': 'Boundaries',
    'M01': 'Insulin/mTOR',
    'M02': 'Lysosomal',
    'M03': 'Mitochondrial',
    'M04': 'Inflammasome',
    'M05': 'Microglial',
    'M06': 'Amyloid',
    'M07': 'Tau',
    'M08': 'Complement',
    'M09': 'Iron',
    'M10': 'APOE',
    'M11': 'TREM2',
    'M12': 'BBB/Glymphatic',
    'M13': 'Cholinergic',
    'M14': 'MAM/Calcium',
    'M15': 'Interventions',
    'M16': 'Sex/Ancestry',
    'M17': 'Immunomodulatory',
  };

  return Object.entries(moduleMap)
    .map(([id, count]) => ({
      id,
      label: moduleLabels[id] || id,
      count,
    }))
    .sort((a, b) => {
      if (a.id === 'BOUNDARY') return -1;
      if (b.id === 'BOUNDARY') return 1;
      return a.id.localeCompare(b.id);
    });
}

interface MechanisticNetworkGraphProps {
  height?: string;
  showControls?: boolean;
  showMiniMap?: boolean;
  /** Specific node IDs to highlight/include (useful for narrative-driven exploration) */
  highlightNodes?: string[];
  /** Initial modules to show (overrides default M01) */
  initialModules?: string[];
}

// Initialize module filter state - start with M01 on, BOUNDARY off, others off
function getInitialModuleFilters(modules: { id: string }[]): Record<string, ModuleFilterState> {
  const filters: Record<string, ModuleFilterState> = {};
  modules.forEach(m => {
    // Start with M01 on, BOUNDARY always off by default (too many connections)
    filters[m.id] = m.id === 'M01' ? 'on' : 'off';
  });
  return filters;
}

// Module categories for organized filtering
type ModuleCategory = 'THEORY' | 'STRUCTURE' | 'GENE' | 'MINERAL' | 'OTHER';

const moduleCategories: Record<string, ModuleCategory> = {
  'BOUNDARY': 'OTHER',
  'M01': 'STRUCTURE',   // Insulin/mTOR - cellular structure/signaling
  'M02': 'STRUCTURE',   // Lysosomal - cellular structure
  'M03': 'STRUCTURE',   // Mitochondrial - cellular structure
  'M04': 'THEORY',      // Inflammasome - inflammation theory
  'M05': 'THEORY',      // Microglial - neuroinflammation theory
  'M06': 'THEORY',      // Amyloid - amyloid hypothesis
  'M07': 'THEORY',      // Tau - tau hypothesis
  'M08': 'THEORY',      // Complement - immune theory
  'M09': 'MINERAL',     // Iron
  'M10': 'GENE',        // APOE
  'M11': 'GENE',        // TREM2
  'M12': 'STRUCTURE',   // BBB/Glymphatic
  'M13': 'THEORY',      // Cholinergic - cholinergic hypothesis
  'M14': 'STRUCTURE',   // MAM/Calcium - cellular structure
  'M15': 'OTHER',       // Interventions
  'M16': 'OTHER',       // Sex/Ancestry
  'M17': 'THEORY',      // Immunomodulatory
};

const categoryLabels: Record<ModuleCategory, string> = {
  'THEORY': 'Theory',
  'STRUCTURE': 'Structure',
  'GENE': 'Gene',
  'MINERAL': 'Mineral',
  'OTHER': 'Other',
};

const categoryOrder: ModuleCategory[] = ['THEORY', 'STRUCTURE', 'GENE', 'MINERAL', 'OTHER'];

// Module checkbox component (compact for category view)
function ModuleCheckbox({
  state,
  onChange,
  color,
  label,
  count,
  compact = false,
}: {
  state: ModuleFilterState;
  onChange: () => void;
  color: string;
  label: string;
  count: number;
  compact?: boolean;
}) {
  const isOn = state === 'on';
  const isPartial = state === 'partial';

  return (
    <label
      className="flex items-center gap-1 cursor-pointer group"
      style={{ opacity: state === 'off' ? 0.5 : isPartial ? 0.7 : 1 }}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={isOn || isPartial}
          onChange={onChange}
          className="peer sr-only"
        />
        <div
          className={`w-3.5 h-3.5 border-2 rounded transition-all ${
            isOn || isPartial
              ? 'border-transparent'
              : 'border-[var(--border)] group-hover:border-[var(--accent-orange)]'
          }`}
          style={{
            backgroundColor: isOn || isPartial ? color : 'white',
            opacity: isPartial ? 0.6 : 1,
          }}
        >
          {isOn && (
            <svg className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {isPartial && (
            <div className="w-1.5 h-0.5 bg-white absolute top-1.5 left-1" />
          )}
        </div>
      </div>
      <span className={`${compact ? 'text-[10px]' : 'text-[11px]'} text-[var(--text-body)] group-hover:text-[var(--text-primary)] whitespace-nowrap`}>
        {label}
      </span>
      {!compact && <span className="text-[9px] text-[var(--text-muted)]">({count})</span>}
    </label>
  );
}

// Category filter bar component
function CategoryFilterBar({
  modules,
  moduleFilters,
  toggleModuleFilter,
  expandedCategories,
  toggleCategory,
}: {
  modules: { id: string; label: string; count: number }[];
  moduleFilters: Record<string, ModuleFilterState>;
  toggleModuleFilter: (moduleId: string) => void;
  expandedCategories: Set<ModuleCategory>;
  toggleCategory: (category: ModuleCategory) => void;
}) {
  // Group modules by category
  const modulesByCategory = useMemo(() => {
    const grouped: Record<ModuleCategory, typeof modules> = {
      'THEORY': [],
      'STRUCTURE': [],
      'GENE': [],
      'MINERAL': [],
      'OTHER': [],
    };
    modules.forEach(m => {
      const cat = moduleCategories[m.id] || 'OTHER';
      grouped[cat].push(m);
    });
    return grouped;
  }, [modules]);

  // Count active modules per category
  const activeCounts = useMemo(() => {
    const counts: Record<ModuleCategory, { active: number; total: number }> = {
      'THEORY': { active: 0, total: 0 },
      'STRUCTURE': { active: 0, total: 0 },
      'GENE': { active: 0, total: 0 },
      'MINERAL': { active: 0, total: 0 },
      'OTHER': { active: 0, total: 0 },
    };
    modules.forEach(m => {
      const cat = moduleCategories[m.id] || 'OTHER';
      counts[cat].total++;
      if (moduleFilters[m.id] === 'on' || moduleFilters[m.id] === 'partial') {
        counts[cat].active++;
      }
    });
    return counts;
  }, [modules, moduleFilters]);

  return (
    <div className="flex items-center gap-0.5 overflow-x-auto">
      {categoryOrder.map((category, idx) => {
        const categoryModules = modulesByCategory[category];
        if (categoryModules.length === 0) return null;

        const isExpanded = expandedCategories.has(category);
        const { active, total } = activeCounts[category];
        const hasActive = active > 0;

        return (
          <div key={category} className="flex items-center">
            {idx > 0 && <div className="w-px h-4 bg-[var(--border)] mx-1" />}
            <button
              onClick={() => toggleCategory(category)}
              className={`px-2 py-1 text-[10px] font-medium rounded transition-all whitespace-nowrap ${
                isExpanded
                  ? 'bg-[var(--accent-orange)] text-white'
                  : hasActive
                    ? 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)] hover:bg-[var(--accent-orange)] hover:text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              {categoryLabels[category]}
              {hasActive && !isExpanded && (
                <span className="ml-1 text-[8px]">({active}/{total})</span>
              )}
            </button>
            {/* Expanded module list */}
            {isExpanded && (
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[var(--border)]">
                {categoryModules.map(module => (
                  <ModuleCheckbox
                    key={module.id}
                    state={moduleFilters[module.id]}
                    onChange={() => toggleModuleFilter(module.id)}
                    color={moduleColors[module.id]}
                    label={module.label}
                    count={module.count}
                    compact
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Get all nodes connected to a given node (upstream and downstream)
function getConnectedNodes(nodeId: string, edges: typeof allEdges): Set<string> {
  const connected = new Set<string>([nodeId]);
  let changed = true;

  // Iteratively find all connected nodes (both directions)
  while (changed) {
    changed = false;
    edges.forEach(edge => {
      if (connected.has(edge.source) && !connected.has(edge.target)) {
        connected.add(edge.target);
        changed = true;
      }
      if (connected.has(edge.target) && !connected.has(edge.source)) {
        connected.add(edge.source);
        changed = true;
      }
    });
  }

  return connected;
}

// Inner component that uses useReactFlow (must be inside ReactFlowProvider)
function MechanisticNetworkGraphInner({
  height = '600px',
  showControls = true,
  showMiniMap = true,
  highlightNodes = [],
  initialModules,
}: MechanisticNetworkGraphProps) {
  const modules = useMemo(() => getModules(allNodes), []);
  const [moduleFilters, setModuleFilters] = useState<Record<string, ModuleFilterState>>(() => {
    if (initialModules && initialModules.length > 0) {
      const filters: Record<string, ModuleFilterState> = {};
      modules.forEach(m => {
        filters[m.id] = initialModules.includes(m.id) ? 'on' : 'off';
      });
      return filters;
    }
    return getInitialModuleFilters(modules);
  });

  // Pinned nodes - specific nodes to always show regardless of module filter
  const [pinnedNodes, setPinnedNodes] = useState<Set<string>>(new Set(highlightNodes));

  // Node search state (for pinning)
  const [nodeSearchQuery, setNodeSearchQuery] = useState('');
  const [showNodeSearch, setShowNodeSearch] = useState(false);

  // Find/focus search state (separate from pinning)
  const [findSearchQuery, setFindSearchQuery] = useState('');
  const [showFindSearch, setShowFindSearch] = useState(false);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [hoveredVariant, setHoveredVariant] = useState<string | null>(null);
  const [activeVariantNodeId, setActiveVariantNodeId] = useState<string | null>(null);

  // Tooltip state for node hover
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  // Fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Boundary layer expansion state (input boundaries on left, output on right)
  const [inputBoundariesExpanded, setInputBoundariesExpanded] = useState(false);
  const [outputBoundariesExpanded, setOutputBoundariesExpanded] = useState(false);

  // Expanded categories for collapsible filter UI (multiple can be open)
  const [expandedCategories, setExpandedCategories] = useState<Set<ModuleCategory>>(new Set());

  // Cross-module connections (pseudo-nodes) visibility
  const [showCrossModuleConnections, setShowCrossModuleConnections] = useState(true);

  // Show hidden module indicators on edge nodes (what hidden modules they connect to)
  const [showHiddenModuleIndicators, setShowHiddenModuleIndicators] = useState(false);

  // Show feedback loops (back edges that create cycles)
  const [showFeedbackLoops, setShowFeedbackLoops] = useState(true);

  // Toggle a category's expanded state
  const toggleCategory = useCallback((category: ModuleCategory) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  // Focus mode state: stores the pre-focus filter state to restore when exiting
  const [focusMode, setFocusMode] = useState<{
    focusedNodeId: string;
    previousFilters: Record<string, ModuleFilterState>;
  } | null>(null);

  const { fitView } = useReactFlow();

  // Fit view when fullscreen mode changes
  useEffect(() => {
    // Small delay to let the container resize first
    const timer = setTimeout(() => {
      fitView({ padding: 0.1 });
    }, 100);
    return () => clearTimeout(timer);
  }, [isFullscreen, fitView]);

  // Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Search results for node search (pinning) - includes visibility status
  const searchResults = useMemo(() => {
    if (!nodeSearchQuery || nodeSearchQuery.length < 2) return [];
    const query = nodeSearchQuery.toLowerCase();
    return allNodes
      .filter(n =>
        n.label.toLowerCase().includes(query) ||
        n.id.toLowerCase().includes(query) ||
        n.description?.toLowerCase().includes(query)
      )
      .map(n => ({
        ...n,
        isHidden: moduleFilters[n.moduleId] === 'off' && !pinnedNodes.has(n.id),
      }))
      .slice(0, 10); // Limit to 10 results
  }, [nodeSearchQuery, moduleFilters, pinnedNodes]);

  // Search results for find/focus search - includes visibility status
  const findSearchResults = useMemo(() => {
    if (!findSearchQuery || findSearchQuery.length < 2) return [];
    const query = findSearchQuery.toLowerCase();
    return allNodes
      .filter(n =>
        n.label.toLowerCase().includes(query) ||
        n.id.toLowerCase().includes(query) ||
        n.description?.toLowerCase().includes(query)
      )
      .map(n => ({
        ...n,
        isHidden: moduleFilters[n.moduleId] === 'off' && !pinnedNodes.has(n.id),
      }))
      .slice(0, 10); // Limit to 10 results
  }, [findSearchQuery, moduleFilters, pinnedNodes]);

  // Pin a node (add to view)
  const pinNode = useCallback((nodeId: string) => {
    setPinnedNodes(prev => new Set([...prev, nodeId]));
    setNodeSearchQuery('');
    setShowNodeSearch(false);
  }, []);

  // Unpin a node
  const unpinNode = useCallback((nodeId: string) => {
    setPinnedNodes(prev => {
      const next = new Set(prev);
      next.delete(nodeId);
      return next;
    });
  }, []);

  // Variant callbacks for custom nodes
  const handleVariantSelect = useCallback((variantId: string | null) => {
    setSelectedVariant(variantId);
  }, []);

  const handleVariantHover = useCallback((variantId: string | null) => {
    setHoveredVariant(variantId);
  }, []);

  // Get the currently active variant (selected takes precedence over hovered)
  const activeVariantId = selectedVariant || hoveredVariant;
  const activeVariant = useMemo(
    () => activeVariantNodeId && activeVariantId
      ? getVariantData(activeVariantNodeId, activeVariantId) || null
      : null,
    [activeVariantNodeId, activeVariantId]
  );

  // Stable variant callbacks - don't include state values, pass them via node data updates
  const variantCallbacks = useMemo(() => ({
    onVariantSelect: handleVariantSelect,
    onVariantHover: handleVariantHover,
    selectedVariant: null as string | null,
    hoveredVariant: null as string | null,
  }), [handleVariantSelect, handleVariantHover]);

  // Boundary expansion callbacks
  const toggleInputBoundaries = useCallback(() => {
    setInputBoundariesExpanded(prev => !prev);
  }, []);

  const toggleOutputBoundaries = useCallback(() => {
    setOutputBoundariesExpanded(prev => !prev);
  }, []);

  // Boundary expansion config for node conversion
  const boundaryExpansionConfig: BoundaryExpansionConfig = useMemo(() => ({
    inputExpanded: inputBoundariesExpanded,
    outputExpanded: outputBoundariesExpanded,
    onToggleInput: toggleInputBoundaries,
    onToggleOutput: toggleOutputBoundaries,
  }), [inputBoundariesExpanded, outputBoundariesExpanded, toggleInputBoundaries, toggleOutputBoundaries]);

  // Track pseudo-nodes, excluded edges, and back edges for layout
  const [currentPseudoNodes, setCurrentPseudoNodes] = useState<PseudoNode[]>([]);
  const [currentExcludedEdges, setCurrentExcludedEdges] = useState<Set<string>>(new Set());
  const [currentBackEdges, setCurrentBackEdges] = useState<Set<string>>(new Set());

  const { flowNodes: initialFlowNodes, pseudoNodes: initialPseudoNodes, excludedEdges: initialExcludedEdges, backEdges: initialBackEdges, nodePositions: initialNodePositions } = useMemo(
    () => convertNodes(allNodes, moduleFilters, variantCallbacks, pinnedNodes, boundaryExpansionConfig),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [moduleFilters, pinnedNodes, boundaryExpansionConfig] // Recreate nodes when module filters, pinned nodes, or boundary expansion change
  );

  // Filter pseudo-nodes based on toggle
  const effectivePseudoNodes = useMemo(
    () => showCrossModuleConnections ? initialPseudoNodes : [],
    [showCrossModuleConnections, initialPseudoNodes]
  );

  // Track node positions for back edge routing
  const [currentNodePositions, setCurrentNodePositions] = useState<Map<string, LayoutPosition>>(new Map());

  const { edges: initialEdgeList, waypointNodes: initialWaypointNodes } = useMemo(
    () => convertEdges(allEdges, moduleFilters, null, null, effectivePseudoNodes, showCrossModuleConnections ? initialExcludedEdges : new Set(), initialBackEdges, pinnedNodes, initialNodePositions, showFeedbackLoops),
    [moduleFilters, effectivePseudoNodes, showCrossModuleConnections, initialExcludedEdges, initialBackEdges, pinnedNodes, initialNodePositions, showFeedbackLoops]
  );

  // Combine flow nodes with waypoint nodes (filter out pseudo-nodes if toggle is off)
  const initialCombinedNodes = useMemo(
    () => {
      const filteredFlowNodes = showCrossModuleConnections
        ? initialFlowNodes
        : initialFlowNodes.filter(n => !n.id.startsWith('__pseudo_'));
      return [...filteredFlowNodes, ...initialWaypointNodes];
    },
    [initialFlowNodes, initialWaypointNodes, showCrossModuleConnections]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialCombinedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgeList);

  // Find and focus on a node - enable its module if hidden, then zoom to it
  const findAndFocusNode = useCallback((nodeId: string) => {
    const targetNode = allNodes.find(n => n.id === nodeId);
    if (!targetNode) return;

    // If the node's module is off, enable it
    if (moduleFilters[targetNode.moduleId] === 'off') {
      setModuleFilters(prev => ({ ...prev, [targetNode.moduleId]: 'on' }));
    }

    // Small delay to let the graph update, then zoom to the node
    setTimeout(() => {
      const flowNode = nodes.find(n => n.id === nodeId);
      if (flowNode) {
        fitView({ nodes: [{ id: nodeId }], padding: 0.5, duration: 500 });
        setSelectedNode(flowNode);
      }
    }, 100);

    setFindSearchQuery('');
    setShowFindSearch(false);
  }, [moduleFilters, nodes, fitView]);

  // Update pseudo-nodes, excluded edges, back edges, and node positions tracking when initial changes
  useEffect(() => {
    setCurrentPseudoNodes(initialPseudoNodes);
    setCurrentExcludedEdges(initialExcludedEdges);
    setCurrentBackEdges(initialBackEdges);
    setCurrentNodePositions(initialNodePositions);
  }, [initialPseudoNodes, initialExcludedEdges, initialBackEdges, initialNodePositions]);

  // Update only node DATA (not positions) when variant hover/select changes
  useEffect(() => {
    setNodes(currentNodes =>
      currentNodes.map(node => {
        if (node.type === 'boundaryVariant') {
          return {
            ...node,
            data: {
              ...node.data,
              selectedVariant,
              hoveredVariant,
            },
          };
        }
        return node;
      })
    );
  }, [selectedVariant, hoveredVariant, setNodes]);

  // Recreate all nodes when module filters, pinned nodes, boundary expansion, or cross-module toggle change
  useEffect(() => {
    const { flowNodes: newFlowNodes, pseudoNodes: newPseudoNodes, excludedEdges: newExcludedEdges, backEdges: newBackEdges, nodePositions: newNodePositions } = convertNodes(allNodes, moduleFilters, {
      ...variantCallbacks,
      selectedVariant,
      hoveredVariant,
    }, pinnedNodes, boundaryExpansionConfig);

    // Filter pseudo-nodes based on toggle
    const effectiveNewPseudoNodes = showCrossModuleConnections ? newPseudoNodes : [];
    const effectiveExcludedEdges = showCrossModuleConnections ? newExcludedEdges : new Set<string>();

    // Get edges with waypoint nodes for back edge routing
    const { edges: newEdgeList, waypointNodes: newWaypointNodes } = convertEdges(
      allEdges, moduleFilters, null, null, effectiveNewPseudoNodes, effectiveExcludedEdges, newBackEdges, pinnedNodes, newNodePositions, showFeedbackLoops
    );

    // Combine flow nodes with waypoint nodes (filter out pseudo-nodes if toggle is off)
    const filteredFlowNodes = showCrossModuleConnections
      ? newFlowNodes
      : newFlowNodes.filter(n => !n.id.startsWith('__pseudo_'));
    setNodes([...filteredFlowNodes, ...newWaypointNodes]);
    setEdges(newEdgeList);
    setCurrentPseudoNodes(newPseudoNodes); // Keep all pseudo-nodes in state for when toggle is enabled
    setCurrentExcludedEdges(newExcludedEdges);
    setCurrentBackEdges(newBackEdges);
    setCurrentNodePositions(newNodePositions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleFilters, pinnedNodes, boundaryExpansionConfig, showCrossModuleConnections, showFeedbackLoops]); // On module filter, pinned nodes, boundary expansion, cross-module toggle, or feedback loops changes

  // Update edges when variant or module filters change (but not for module filter changes which are handled above)
  useEffect(() => {
    // Filter pseudo-nodes based on toggle for edge updates
    const effectiveCurrentPseudoNodes = showCrossModuleConnections ? currentPseudoNodes : [];
    const effectiveCurrentExcludedEdges = showCrossModuleConnections ? currentExcludedEdges : new Set<string>();

    const { edges: newEdgeList, waypointNodes: newWaypointNodes } = convertEdges(
      allEdges, moduleFilters, activeVariantNodeId, activeVariant, effectiveCurrentPseudoNodes, effectiveCurrentExcludedEdges, currentBackEdges, pinnedNodes, currentNodePositions, showFeedbackLoops
    );
    setEdges(newEdgeList);
    // Also update waypoint nodes in case positions changed
    setNodes(currentNodes => {
      // Remove old waypoint nodes and add new ones
      const nonWaypointNodes = currentNodes.filter(n => !n.id.startsWith('__waypoint_'));
      return [...nonWaypointNodes, ...newWaypointNodes];
    });
  }, [activeVariantNodeId, activeVariant, currentPseudoNodes, currentExcludedEdges, currentBackEdges, pinnedNodes, currentNodePositions, showCrossModuleConnections, showFeedbackLoops, setEdges, setNodes]);

  // Simple on/off toggle for module filter (no tri-state cycling)
  const toggleModuleFilter = useCallback((moduleId: string) => {
    setModuleFilters(prev => {
      const current = prev[moduleId];
      // Simple toggle: off -> on, on/partial -> off
      const next: ModuleFilterState = current === 'off' ? 'on' : 'off';
      return { ...prev, [moduleId]: next };
    });
  }, []);

  // Select all modules
  const selectAllModules = useCallback(() => {
    setModuleFilters(prev => {
      const next: Record<string, ModuleFilterState> = {};
      Object.keys(prev).forEach(id => { next[id] = 'on'; });
      return next;
    });
  }, []);

  // Clear all modules
  const clearAllModules = useCallback(() => {
    setModuleFilters(prev => {
      const next: Record<string, ModuleFilterState> = {};
      Object.keys(prev).forEach(id => { next[id] = 'off'; });
      return next;
    });
  }, []);

  // Enter focus mode: show only the focused node and its connected pathway
  const enterFocusMode = useCallback((nodeId: string) => {
    // Get all nodes connected to this node
    const connectedNodeIds = getConnectedNodes(nodeId, allEdges);

    // Find modules of connected nodes
    const connectedModules = new Set<string>();
    const focusedNodeModule = allNodes.find(n => n.id === nodeId)?.moduleId;

    allNodes.forEach(node => {
      if (connectedNodeIds.has(node.id)) {
        connectedModules.add(node.moduleId);
      }
    });

    // Save current filters and create new focus filters
    setFocusMode({
      focusedNodeId: nodeId,
      previousFilters: { ...moduleFilters },
    });

    // Set filters: focused node's module = 'on', connected modules = 'partial', others = 'off'
    const focusFilters: Record<string, ModuleFilterState> = {};
    modules.forEach(m => {
      if (m.id === focusedNodeModule) {
        focusFilters[m.id] = 'on';
      } else if (connectedModules.has(m.id)) {
        focusFilters[m.id] = 'partial';
      } else {
        focusFilters[m.id] = 'off';
      }
    });

    setModuleFilters(focusFilters);
  }, [moduleFilters, modules]);

  // Exit focus mode: restore previous filter state
  const exitFocusMode = useCallback(() => {
    if (focusMode) {
      setModuleFilters(focusMode.previousFilters);
      setFocusMode(null);
    }
  }, [focusMode]);

  // Fit view only when module filters change (not on variant hover)
  useEffect(() => {
    // Small delay to ensure nodes are rendered before fitting
    const timer = setTimeout(() => {
      fitView({ padding: 0.2, duration: 300 });
    }, 50);
    return () => clearTimeout(timer);
  }, [moduleFilters, fitView]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Ctrl+click to enter focus mode
    if (event.ctrlKey || event.metaKey) {
      enterFocusMode(node.id);
      return;
    }

    setSelectedNode(node);
    setSelectedEdge(null);
    // Set activeVariantNodeId for boundary nodes with variants
    if (node.type === 'boundaryVariant' && node.data?.variants) {
      setActiveVariantNodeId(node.id);
    } else {
      setActiveVariantNodeId(null);
      setSelectedVariant(null);
      setHoveredVariant(null);
    }
  }, [enterFocusMode]);

  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  // Node hover handlers for tooltip
  const onNodeMouseEnter = useCallback((event: React.MouseEvent, node: Node) => {
    // Don't show tooltip for pseudo-nodes or waypoint nodes
    if (node.data?.isPseudo || node.data?.isWaypoint) return;
    setHoveredNode(node);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const onNodeMouseLeave = useCallback(() => {
    setHoveredNode(null);
    setTooltipPosition(null);
  }, []);

  // Get full node data for tooltip (including unabbreviated name)
  const getFullNodeData = useCallback((nodeId: string) => {
    return allNodes.find(n => n.id === nodeId);
  }, []);

  return (
    <div
      className={`border border-[var(--border)] bg-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* Module filter - collapsible category bar */}
      <div className="p-2 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-2">
          {/* Module label */}
          <span className="text-[10px] font-medium text-[var(--text-muted)]">Module:</span>

          {/* Category filter bar */}
          <CategoryFilterBar
            modules={modules}
            moduleFilters={moduleFilters}
            toggleModuleFilter={toggleModuleFilter}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
          />

          {/* Spacer */}
          <div className="flex-1" />

          {/* Quick actions */}
          {!focusMode ? (
            <div className="flex items-center gap-1">
              <button
                onClick={selectAllModules}
                className="text-[9px] px-1.5 py-0.5 text-[var(--accent-orange)] hover:bg-[var(--accent-orange-light)] rounded"
              >
                All
              </button>
              <button
                onClick={clearAllModules}
                className="text-[9px] px-1.5 py-0.5 text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] rounded"
              >
                Clear
              </button>
            </div>
          ) : (
            <button
              onClick={exitFocusMode}
              className="text-[9px] px-2 py-0.5 bg-[var(--accent-orange)] text-white rounded hover:bg-[var(--accent-orange)]/80"
            >
              Exit Focus
            </button>
          )}

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-[10px] px-1.5 py-0.5 bg-white border border-[var(--border)] rounded hover:border-[var(--accent-orange)] flex items-center gap-1"
            title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
        {/* Second row: find search on left, stats, pinned nodes in middle, add node on right */}
        <div className="mt-1.5 flex items-center gap-2 text-[9px]">
          {/* Left: Find search */}
          <div className="relative">
            <button
              onClick={() => setShowFindSearch(!showFindSearch)}
              className="px-1.5 py-0.5 bg-white border border-[var(--border)] rounded hover:border-[var(--accent-orange)] flex items-center gap-1"
              title="Find node (Ctrl+F)"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find
            </button>
            {showFindSearch && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-[var(--border)] rounded shadow-lg w-64">
                <input
                  type="text"
                  value={findSearchQuery}
                  onChange={(e) => setFindSearchQuery(e.target.value)}
                  placeholder="Search to find and focus..."
                  className="w-full px-2 py-1.5 text-xs border-b border-[var(--border)] outline-none focus:ring-1 focus:ring-[var(--accent-orange)]"
                  autoFocus
                />
                {findSearchResults.length > 0 && (
                  <div className="max-h-48 overflow-y-auto">
                    {findSearchResults.map(node => (
                      <button
                        key={node.id}
                        onClick={() => findAndFocusNode(node.id)}
                        className={`w-full px-2 py-1.5 text-left text-xs hover:bg-[var(--bg-secondary)] flex items-center gap-2 ${
                          node.isHidden ? 'bg-[var(--danger-light)]' : ''
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: moduleColors[node.moduleId] || '#787473' }}
                        />
                        <span className={`truncate ${node.isHidden ? 'text-[var(--text-muted)]' : ''}`}>
                          {node.label}
                        </span>
                        {node.isHidden && (
                          <span className="text-[var(--danger)] text-[8px] flex-shrink-0">
                            (will show)
                          </span>
                        )}
                        <span className="text-[var(--text-muted)] text-[9px] ml-auto flex-shrink-0">{node.moduleId}</span>
                      </button>
                    ))}
                  </div>
                )}
                {findSearchQuery.length >= 2 && findSearchResults.length === 0 && (
                  <div className="px-2 py-2 text-xs text-[var(--text-muted)]">No nodes found</div>
                )}
              </div>
            )}
          </div>

          {/* Stats and hint */}
          <span className="text-[var(--text-muted)]">
            {nodes.length} nodes, {edges.length} edges
            {focusMode
              ? ` • Focus: ${allNodes.find(n => n.id === focusMode.focusedNodeId)?.label}`
              : ' • Ctrl+click to focus'}
          </span>

          {/* Middle: Pinned nodes */}
          {pinnedNodes.size > 0 && (
            <>
              <span className="text-[var(--text-muted)]">|</span>
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[var(--text-muted)]">Pinned:</span>
                {Array.from(pinnedNodes).map(nodeId => {
                  const node = allNodes.find(n => n.id === nodeId);
                  if (!node) return null;
                  return (
                    <span
                      key={nodeId}
                      className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-white border border-[var(--border)] rounded"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: moduleColors[node.moduleId] || '#787473' }}
                      />
                      {node.label}
                      <button
                        onClick={() => unpinNode(nodeId)}
                        className="ml-0.5 text-[var(--text-muted)] hover:text-[var(--danger)]"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </>
          )}

          {/* Toggle checkboxes - before Add Node button */}
          {(() => {
            // Compute whether Cross should be shown: more than one module on but not all
            const moduleStates = Object.values(moduleFilters);
            const onCount = moduleStates.filter(s => s === 'on' || s === 'partial').length;
            const totalModules = moduleStates.length;
            const showCrossCheckbox = onCount > 1 && onCount < totalModules;

            return (
              <div className="flex items-center gap-2">
                {/* Cross-module connections toggle - only show if more than one but not all modules */}
                {showCrossCheckbox && (
                  <label
                    className="flex items-center gap-1 cursor-pointer group"
                    title="Show connections that pass through hidden modules as waypoints"
                  >
                    <input
                      type="checkbox"
                      checked={showCrossModuleConnections}
                      onChange={() => setShowCrossModuleConnections(!showCrossModuleConnections)}
                      className="sr-only peer"
                    />
                    <div className={`w-3 h-3 border-2 border-dashed rounded transition-all ${
                      showCrossModuleConnections
                        ? 'bg-[var(--accent-orange)] border-transparent'
                        : 'bg-white border-[var(--border)] group-hover:border-[var(--accent-orange)]'
                    }`}>
                      {showCrossModuleConnections && (
                        <svg className="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-[9px] text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
                      Cross
                    </span>
                  </label>
                )}

                {/* Hidden module indicators toggle */}
                <label
                  className="flex items-center gap-1 cursor-pointer group"
                  title="Show indicators on nodes that connect to hidden (disabled) modules"
                >
                  <input
                    type="checkbox"
                    checked={showHiddenModuleIndicators}
                    onChange={() => setShowHiddenModuleIndicators(!showHiddenModuleIndicators)}
                    className="sr-only peer"
                  />
                  <div className={`w-3 h-3 border-2 rounded transition-all ${
                    showHiddenModuleIndicators
                      ? 'bg-[var(--chart-secondary)] border-transparent'
                      : 'bg-white border-[var(--border)] group-hover:border-[var(--chart-secondary)]'
                  }`}>
                    {showHiddenModuleIndicators && (
                      <svg className="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[9px] text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
                    Hidden
                  </span>
                </label>

                {/* Feedback loops toggle */}
                <label
                  className="flex items-center gap-1 cursor-pointer group"
                  title="Show feedback loops (back edges that create cycles)"
                >
                  <input
                    type="checkbox"
                    checked={showFeedbackLoops}
                    onChange={() => setShowFeedbackLoops(!showFeedbackLoops)}
                    className="sr-only peer"
                  />
                  <div className={`w-3 h-3 border-2 rounded transition-all ${
                    showFeedbackLoops
                      ? 'bg-[#e36216] border-transparent'
                      : 'bg-white border-[var(--border)] group-hover:border-[#e36216]'
                  }`}>
                    {showFeedbackLoops && (
                      <svg className="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[9px] text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
                    Feedback
                  </span>
                </label>
              </div>
            );
          })()}

          {/* Right: Add node button */}
          <div className="relative ml-auto">
            <button
              onClick={() => setShowNodeSearch(!showNodeSearch)}
              className="px-1.5 py-0.5 bg-white border border-[var(--border)] rounded hover:border-[var(--accent-orange)]"
            >
              + Add Node
            </button>
            {showNodeSearch && (
              <div className="absolute top-full right-0 mt-1 z-50 bg-white border border-[var(--border)] rounded shadow-lg w-56">
                <input
                  type="text"
                  value={nodeSearchQuery}
                  onChange={(e) => setNodeSearchQuery(e.target.value)}
                  placeholder="Search nodes..."
                  className="w-full px-2 py-1.5 text-xs border-b border-[var(--border)] outline-none focus:ring-1 focus:ring-[var(--accent-orange)]"
                  autoFocus
                />
                {searchResults.length > 0 && (
                  <div className="max-h-48 overflow-y-auto">
                    {searchResults.map(node => (
                      <div
                        key={node.id}
                        className={`w-full px-2 py-1.5 text-left text-xs hover:bg-[var(--bg-secondary)] flex items-center gap-2 ${
                          node.isHidden ? 'bg-[var(--danger-light)]' : ''
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: moduleColors[node.moduleId] || '#787473' }}
                        />
                        <span className={`truncate ${node.isHidden ? 'text-[var(--text-muted)]' : ''}`}>
                          {node.label}
                        </span>
                        {node.isHidden && (
                          <span className="text-[var(--danger)] text-[8px] flex-shrink-0">
                            (hidden)
                          </span>
                        )}
                        <span className="text-[var(--text-muted)] text-[9px] ml-auto flex-shrink-0">{node.moduleId}</span>
                        {node.isHidden ? (
                          <button
                            onClick={() => {
                              setModuleFilters(prev => ({ ...prev, [node.moduleId]: 'on' }));
                            }}
                            className="text-[8px] px-1 py-0.5 bg-[var(--accent-orange)] text-white rounded hover:bg-[var(--accent-orange)]/80 flex-shrink-0"
                            title="Show module"
                          >
                            Show
                          </button>
                        ) : (
                          <button
                            onClick={() => pinNode(node.id)}
                            className="text-[8px] px-1 py-0.5 bg-[var(--success)] text-white rounded hover:bg-[var(--success)]/80 flex-shrink-0"
                            title="Pin node"
                          >
                            Pin
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {nodeSearchQuery.length >= 2 && searchResults.length === 0 && (
                  <div className="px-2 py-2 text-xs text-[var(--text-muted)]">No nodes found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--bg-secondary)] flex flex-wrap items-center gap-4 text-[10px]">
        <span className="text-[var(--text-muted)] font-medium">Legend:</span>

        {/* Edge types */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <svg width="24" height="8" className="inline-block">
              <line x1="0" y1="4" x2="20" y2="4" stroke="#007385" strokeWidth="2" markerEnd="url(#arrow-teal)" />
              <defs>
                <marker id="arrow-teal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#007385" />
                </marker>
              </defs>
            </svg>
            <span className="text-[var(--text-body)]">Increases</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="24" height="8" className="inline-block">
              <line x1="0" y1="4" x2="20" y2="4" stroke="#c75146" strokeWidth="2" markerEnd="url(#arrow-red)" />
              <defs>
                <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#c75146" />
                </marker>
              </defs>
            </svg>
            <span className="text-[var(--text-body)]">Decreases</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="24" height="8" className="inline-block" style={{ overflow: 'visible' }}>
              <line x1="20" y1="4" x2="4" y2="4" stroke="#e36216" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrow-back)" />
              <defs>
                <marker id="arrow-back" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#e36216" />
                </marker>
              </defs>
            </svg>
            <span className="text-[var(--text-body)]">Feedback loop</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="24" height="8" className="inline-block">
              <line x1="0" y1="4" x2="20" y2="4" stroke="#787473" strokeWidth="1" strokeDasharray="5,5" markerEnd="url(#arrow-pseudo)" />
              <defs>
                <marker id="arrow-pseudo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#787473" />
                </marker>
              </defs>
            </svg>
            <span className="text-[var(--text-body)]">Via hidden module</span>
          </div>
        </div>

        {/* Node types */}
        <div className="flex items-center gap-3 border-l border-[var(--border)] pl-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#007385]" />
            <span className="text-[var(--text-body)]">Stock</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 rounded bg-[#486393]" />
            <span className="text-[var(--text-body)]">State</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 border-2 border-dashed border-[#787473] rounded-full bg-transparent" />
            <span className="text-[var(--text-body)]">Hidden module</span>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div
        style={{
          height: isFullscreen
            ? `calc(100vh - ${selectedNode || selectedEdge ? '260px' : '140px'})`
            : `calc(${height} - ${selectedNode || selectedEdge ? '260px' : '140px'})`
        }}
      >
        <ReactFlow
          key={isFullscreen ? 'fullscreen' : 'normal'}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          fitView
          minZoom={0.05}
          maxZoom={2}
          attributionPosition="bottom-left"
        >
          <Background color="#e5e2dd" gap={20} />
          {showControls && <Controls />}
          {showMiniMap && (
            <MiniMap
              nodeColor={(node) => {
                // Pseudo-nodes get a lighter color
                if (node.data?.isPseudo) {
                  return '#d1d1d1';
                }
                return moduleColors[node.data?.moduleId as string] || '#787473';
              }}
              maskColor="rgba(250, 249, 247, 0.6)"
              pannable
              zoomable
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
              }}
              className="minimap-with-viewport"
            />
          )}
        </ReactFlow>

        {/* Node hover tooltip */}
        {hoveredNode && tooltipPosition && (() => {
          const fullNodeData = getFullNodeData(hoveredNode.id);
          const label = (hoveredNode.data?.label as string) || hoveredNode.id;
          const description = fullNodeData?.description || (hoveredNode.data?.description as string | undefined);
          const mechanism = fullNodeData?.mechanism || (hoveredNode.data?.mechanism as string | undefined);
          const category = fullNodeData?.category || (hoveredNode.data?.category as string | undefined);
          const moduleId = (fullNodeData?.moduleId || hoveredNode.data?.moduleId) as string | undefined;
          const roles = fullNodeData?.roles || (hoveredNode.data?.roles as string[] | undefined);

          return (
            <div
              className="fixed z-[100] pointer-events-none bg-white border border-[var(--border)] shadow-lg rounded p-3 max-w-xs"
              style={{
                left: Math.min(tooltipPosition.x + 12, window.innerWidth - 320),
                top: Math.min(tooltipPosition.y + 12, window.innerHeight - 200),
              }}
            >
              <div className="font-semibold text-sm text-[var(--text-primary)] mb-1">{label}</div>
              {category && (
                <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] mb-2">
                  <span className="px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: (moduleId ? moduleColors[moduleId] : '#787473') + '20', color: moduleId ? moduleColors[moduleId] : '#787473' }}
                  >
                    {category}
                  </span>
                  {moduleId && <span>{moduleId}</span>}
                </div>
              )}
              {description && (
                <p className="text-xs text-[var(--text-body)] mb-1">{description}</p>
              )}
              {mechanism && (
                <p className="text-[10px] text-[var(--text-muted)] italic">{mechanism}</p>
              )}
              {roles && roles.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {roles.map(role => (
                    <span key={role} className="px-1 py-0.5 text-[9px] bg-[var(--accent-orange-light)] text-[var(--accent-orange)] rounded">
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Selected node details - only show for non-boundaryVariant nodes */}
      {selectedNode && selectedNode.type !== 'boundaryVariant' && (
        <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-primary)]">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-[var(--text-primary)]">{selectedNode.data.label as string}</h4>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[var(--text-muted)]">Category: </span>
              <span className="text-[var(--text-body)]">{selectedNode.data.category as string}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Subtype: </span>
              <span className="text-[var(--text-body)]">{selectedNode.data.subtype as string}</span>
            </div>
          </div>
          {selectedNode.data.description ? (
            <p className="mt-2 text-xs text-[var(--text-body)]">{String(selectedNode.data.description)}</p>
          ) : null}
          {selectedNode.data.mechanism ? (
            <p className="mt-1 text-xs text-[var(--text-muted)] italic">{String(selectedNode.data.mechanism)}</p>
          ) : null}
          {selectedNode.data.roles && Array.isArray(selectedNode.data.roles) && (selectedNode.data.roles as string[]).length > 0 ? (
            <div className="mt-2 flex gap-1">
              {(selectedNode.data.roles as string[]).map(role => (
                <span key={role} className="px-1.5 py-0.5 text-[10px] bg-[var(--accent-orange-light)] text-[var(--accent-orange)] rounded">
                  {role}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {/* Selected edge details */}
      {selectedEdge && selectedEdge.data && (() => {
        const edgeData = selectedEdge.data as {
          mechanismLabel?: string;
          mechanismDescription?: string;
          relation?: string;
          edgeType?: string;
          causalConfidence?: string;
          evidence?: Array<{pmid?: string; firstAuthor: string; year: number; methodType: string; quote?: string}>;
          keyInsight?: string;
          therapeuticImplication?: string;
          translationalGap?: string;
        };
        return (
        <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-primary)] overflow-y-auto max-h-[200px]">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-[var(--text-primary)]">
                {selectedEdge.source} → {selectedEdge.target}
              </h4>
              {edgeData.mechanismLabel && (
                <span className="text-xs text-[var(--text-muted)]">{edgeData.mechanismLabel}</span>
              )}
            </div>
            <button
              onClick={() => setSelectedEdge(null)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Close
            </button>
          </div>

          {/* Relation and confidence */}
          <div className="grid grid-cols-3 gap-2 text-xs mb-2">
            <div>
              <span className="text-[var(--text-muted)]">Relation: </span>
              <span className={`font-medium ${
                edgeData.relation?.includes('Decrease') ? 'text-[#c75146]' : 'text-[#007385]'
              }`}>
                {edgeData.relation}
              </span>
            </div>
            {edgeData.edgeType && (
              <div>
                <span className="text-[var(--text-muted)]">Type: </span>
                <span className="text-[var(--text-body)]">{edgeData.edgeType}</span>
              </div>
            )}
            {edgeData.causalConfidence && (
              <div>
                <span className="text-[var(--text-muted)]">Confidence: </span>
                <span className="font-medium text-[var(--accent-orange)]">{edgeData.causalConfidence}</span>
              </div>
            )}
          </div>

          {/* Mechanism description */}
          {edgeData.mechanismDescription && (
            <p className="text-xs text-[var(--text-body)] mb-2">{edgeData.mechanismDescription}</p>
          )}

          {/* Key insight */}
          {edgeData.keyInsight && (
            <p className="text-xs text-[var(--success)] bg-[var(--success-light)] px-2 py-1 rounded mb-2">
              {edgeData.keyInsight}
            </p>
          )}

          {/* Translational gap */}
          {edgeData.translationalGap && (
            <p className="text-xs text-[var(--danger)] bg-[var(--danger-light)] px-2 py-1 rounded mb-2">
              {edgeData.translationalGap}
            </p>
          )}

          {/* Evidence citations */}
          {edgeData.evidence && edgeData.evidence.length > 0 && (
            <div className="mt-2 border-t border-[var(--border)] pt-2">
              <span className="text-xs font-medium text-[var(--text-muted)]">Evidence ({edgeData.evidence.length}):</span>
              <div className="mt-1 space-y-1">
                {edgeData.evidence.slice(0, 3).map((ev, i) => (
                  <div key={i} className="text-[10px] text-[var(--text-body)] bg-white p-1.5 rounded border border-[var(--border)]">
                    <div className="flex justify-between">
                      <span className="font-medium">{ev.firstAuthor} et al., {ev.year}</span>
                      <span className="text-[var(--text-muted)]">{ev.methodType}</span>
                    </div>
                    {ev.pmid && (
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${ev.pmid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-orange)] hover:underline"
                      >
                        PMID: {ev.pmid}
                      </a>
                    )}
                    {ev.quote && (
                      <p className="mt-1 italic text-[var(--text-muted)]">&ldquo;{ev.quote.slice(0, 150)}...&rdquo;</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        );
      })()}
    </div>
  );
}

// Wrapper component that provides ReactFlowProvider
export function MechanisticNetworkGraph(props: MechanisticNetworkGraphProps) {
  return (
    <ReactFlowProvider>
      <MechanisticNetworkGraphInner {...props} />
    </ReactFlowProvider>
  );
}
