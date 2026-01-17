import type { BoundaryVariant } from '@/data/mechanisticFramework/types';

// Tri-state for module filtering: 'on' (full), 'partial' (filtered), 'off' (hidden)
export type ModuleFilterState = 'on' | 'partial' | 'off';

// View mode for boundary variant nodes
export type BoundaryViewMode = 'simple' | 'table' | 'graph';

// Module category for grouping
export type ModuleCategory = 'upstream' | 'core' | 'downstream' | 'boundary' | 'therapeutic';

// Layout position for nodes
export interface LayoutPosition {
  x: number;
  y: number;
}

// Pseudo-node representing a hidden module
export interface PseudoNode {
  id: string;
  label: string;
  moduleId: string;
  isPseudo: true;
  connectsFrom: string[];  // node IDs in visible set that connect TO this hidden module
  connectsTo: string[];    // node IDs in visible set that this hidden module connects TO
}

// Variant callback type for passing into convertNodes
export interface VariantCallbacks {
  onVariantSelect: (variantId: string | null) => void;
  onVariantHover: (variantId: string | null) => void;
  selectedVariant: string | null;
  hoveredVariant: string | null;
}

// Boundary expansion config
export interface BoundaryExpansionConfig {
  inputExpanded: boolean;
  outputExpanded: boolean;
  onToggleInput: () => void;
  onToggleOutput: () => void;
}

// Custom node data interfaces
export interface BoundaryVariantNodeData extends Record<string, unknown> {
  label: string;
  variants: BoundaryVariant[];
  defaultVariant?: string;
  moduleId: string;
  isPartial?: boolean;
  onVariantSelect?: (variantId: string | null) => void;
  onVariantHover?: (variantId: string | null) => void;
  selectedVariant?: string | null;
  hoveredVariant?: string | null;
  forceGraphView?: boolean;
}

export interface BoundaryExpandButtonData extends Record<string, unknown> {
  direction: 'input' | 'output';
  isExpanded: boolean;
  boundaryCount: number;
  onToggle: () => void;
}

// Custom node state for user-created nodes
export interface CustomNode {
  id: string;
  label: string;
  attachedTo: string;
  direction: 'input' | 'output';
  description?: string;
}

// Result types for algorithm functions
export interface ConvertNodesResult {
  flowNodes: import('@xyflow/react').Node[];
  pseudoNodes: PseudoNode[];
  excludedEdges: Set<string>;
  nodePositions: Map<string, LayoutPosition>;
  backEdges: Set<string>;
}

export interface ConvertEdgesResult {
  edges: import('@xyflow/react').Edge[];
  waypointNodes: import('@xyflow/react').Node[];
}

export interface LayoutResult {
  positions: Map<string, LayoutPosition>;
  backEdges: Set<string>;
}

// ============================================================================
// SORT CONFIGURATION TYPES
// ============================================================================

/**
 * Horizontal sort mode - determines X-axis positioning (layer assignment)
 * - 'topological': Default DAG-based causal flow ordering
 * - 'timescale': Group by temporal dynamics (seconds → decades)
 * - 'module': Group by module ID (M01 → M16)
 */
export type HorizontalSortMode = 'topological' | 'timescale' | 'module';

/**
 * Vertical sort mode - determines Y-axis positioning within layers
 * - 'crossing': Default median heuristic to minimize edge crossings
 * - 'region': Sort by brain region (systemic → intracellular)
 * - 'cellType': Sort alphabetically by cell type
 * - 'module': Sort by module ID within layer
 */
export type VerticalSortMode = 'crossing' | 'region' | 'cellType' | 'module';

/**
 * Sort configuration for graph layout
 */
export interface SortConfig {
  horizontal: HorizontalSortMode;
  vertical: VerticalSortMode;
}
