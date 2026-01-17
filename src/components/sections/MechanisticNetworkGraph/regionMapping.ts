/**
 * Region Mapping and Inference Logic for Network Graph Layout
 *
 * This module provides functions to infer brain regions for nodes
 * that don't have explicit region annotations, enabling anatomical
 * organization in the network graph.
 */

import type { MechanisticNode, Timescale } from '@/data/mechanisticFramework/types';
import {
  BrainRegion,
  REGION_ORDER,
  MODULE_DEFAULT_REGIONS,
  MODULE_DEFAULT_TIMESCALES,
} from './constants';

/**
 * Cell type to region mapping
 * Maps cell types to their typical anatomical locations
 */
const CELL_TYPE_REGIONS: Record<string, BrainRegion> = {
  // Microglia - found throughout brain but primarily CNS
  'microglia': 'cortex',
  'microglial': 'cortex',
  'CL:0000129': 'cortex', // CL ontology for microglia

  // Astrocytes - throughout CNS
  'astrocyte': 'cortex',
  'astrocytic': 'cortex',
  'CL:0000127': 'cortex', // CL ontology for astrocyte

  // Neurons - cortical
  'neuron': 'cortex',
  'neuronal': 'cortex',
  'CL:0000540': 'cortex', // CL ontology for neuron

  // Oligodendrocytes - white matter
  'oligodendrocyte': 'white_matter',
  'CL:0000128': 'white_matter', // CL ontology for oligodendrocyte

  // Endothelial cells - BBB
  'endothelial': 'blood_brain_barrier',
  'CL:0000115': 'blood_brain_barrier', // CL ontology for endothelial cell

  // Pericytes - BBB
  'pericyte': 'blood_brain_barrier',
  'CL:0000669': 'blood_brain_barrier', // CL ontology for pericyte

  // Immune cells - systemic
  'macrophage': 'systemic',
  'monocyte': 'systemic',
  't_cell': 'systemic',
  'b_cell': 'systemic',
};

/**
 * Subtype-based region inference
 * Maps specific subtypes to likely brain regions
 */
const SUBTYPE_REGIONS: Record<string, BrainRegion> = {
  // Clinical outcomes - typically measured in hippocampus/cortex
  'CognitiveScore': 'hippocampus',
  'Diagnosis': 'cortex',
  'Biomarker': 'systemic', // CSF biomarkers

  // Genetic variants - systemic/whole body
  'Gene': 'systemic',
  'GeneticVariant': 'systemic',

  // Drugs and interventions - systemic entry
  'SmallMolecule': 'systemic',
  'Biologic': 'systemic',
  'Lifestyle': 'systemic',

  // Cellular states
  'DAM': 'cortex', // Disease-associated microglia
  'LDAM': 'cortex', // Lipid-droplet accumulating microglia
  'M1_Microglial': 'cortex',
  'M2_Microglial': 'cortex',
  'A1_Astrocyte': 'cortex',
  'Senescent': 'cortex',

  // Aggregates - location-specific
  'Aggregate': 'cortex', // Plaques typically cortical

  // Organelles - intracellular
  'OrganellePool': 'intracellular',
  'CompartmentState': 'intracellular',
};

/**
 * Normalize region string to BrainRegion type
 * Handles variations in region naming
 */
export function normalizeRegion(region: string): BrainRegion {
  const normalized = region.toLowerCase().replace(/[\s_-]+/g, '_');

  // Direct matches
  if (REGION_ORDER.includes(normalized as BrainRegion)) {
    return normalized as BrainRegion;
  }

  // Common aliases
  const aliases: Record<string, BrainRegion> = {
    'brain': 'cortex',
    'cerebral_cortex': 'cortex',
    'cerebral': 'cortex',
    'frontal': 'cortex',
    'temporal': 'cortex',
    'parietal': 'cortex',
    'occipital': 'cortex',
    'bbb': 'blood_brain_barrier',
    'glymphatic': 'blood_brain_barrier',
    'hippocampal': 'hippocampus',
    'entorhinal': 'entorhinal_cortex',
    'ec': 'entorhinal_cortex',
    'cholinergic': 'basal_forebrain',
    'nbm': 'basal_forebrain', // Nucleus basalis of Meynert
    'white': 'white_matter',
    'myelin': 'white_matter',
    'corpus_callosum': 'white_matter',
    'peripheral': 'systemic',
    'blood': 'systemic',
    'plasma': 'systemic',
    'csf': 'systemic', // CSF is collected systemically
    'serum': 'systemic',
    'intracell': 'intracellular',
    'cytoplasm': 'intracellular',
    'cytosol': 'intracellular',
    'nucleus': 'intracellular',
    'mitochondria': 'intracellular',
    'mitochondrial': 'intracellular',
    'lysosome': 'intracellular',
    'lysosomal': 'intracellular',
    'er': 'intracellular',
    'endoplasmic_reticulum': 'intracellular',
    'golgi': 'intracellular',
  };

  return aliases[normalized] || 'unknown';
}

/**
 * Infer brain region for a node
 *
 * Priority order:
 * 1. Explicit compartment.region (highest priority)
 * 2. Cell type mapping
 * 3. Subtype-based inference
 * 4. Module defaults
 * 5. Default to 'intracellular' for molecular entities, 'unknown' otherwise
 *
 * @param node The mechanistic node to infer region for
 * @returns The inferred brain region
 */
export function inferRegion(node: MechanisticNode): BrainRegion {
  // 1. Check explicit region in compartment
  if (node.compartment?.region) {
    return normalizeRegion(node.compartment.region);
  }

  // 2. Check cell type mapping
  if (node.compartment?.cellType) {
    const cellType = node.compartment.cellType.toLowerCase();
    for (const [key, region] of Object.entries(CELL_TYPE_REGIONS)) {
      if (cellType.includes(key.toLowerCase())) {
        return region;
      }
    }
  }

  // Also check references.cellType
  if (node.references?.cellType) {
    const cellTypeRef = node.references.cellType.toLowerCase();
    for (const [key, region] of Object.entries(CELL_TYPE_REGIONS)) {
      if (cellTypeRef.includes(key.toLowerCase())) {
        return region;
      }
    }
  }

  // 3. Check subtype-based inference
  if (node.subtype && SUBTYPE_REGIONS[node.subtype]) {
    return SUBTYPE_REGIONS[node.subtype];
  }

  // 4. Check module defaults
  if (MODULE_DEFAULT_REGIONS[node.moduleId]) {
    return MODULE_DEFAULT_REGIONS[node.moduleId];
  }

  // 5. Default based on category
  if (node.category === 'STOCK') {
    return 'intracellular'; // Most stocks are molecular/intracellular
  }
  if (node.category === 'BOUNDARY') {
    return 'unknown'; // Boundaries are system edges
  }

  return 'unknown';
}

/**
 * Get region sort index for a node
 * Lower index = higher in vertical layout (more peripheral)
 */
export function getRegionSortIndex(node: MechanisticNode): number {
  const region = inferRegion(node);
  const index = REGION_ORDER.indexOf(region);
  return index >= 0 ? index : REGION_ORDER.length; // Unknown goes last
}

/**
 * Timescale ordering for horizontal layout
 */
const TIMESCALE_ORDER: Timescale[] = [
  'seconds',
  'minutes',
  'hours',
  'days',
  'weeks',
  'months',
  'years',
  'decades',
];

/**
 * Infer timescale for a node
 *
 * @param node The mechanistic node
 * @returns The inferred timescale
 */
export function inferTimescale(node: MechanisticNode): Timescale {
  // Use explicit timescale if available
  if (node.timescale) {
    return node.timescale;
  }

  // Use module defaults
  const moduleDefault = MODULE_DEFAULT_TIMESCALES[node.moduleId];
  if (moduleDefault && TIMESCALE_ORDER.includes(moduleDefault as Timescale)) {
    return moduleDefault as Timescale;
  }

  // Default to 'days' for most biological processes
  return 'days';
}

/**
 * Get timescale sort index for a node
 * Lower index = faster dynamics (earlier in cascade)
 */
export function getTimescaleSortIndex(node: MechanisticNode): number {
  const timescale = inferTimescale(node);
  const index = TIMESCALE_ORDER.indexOf(timescale);
  return index >= 0 ? index : TIMESCALE_ORDER.length / 2; // Default to middle
}

/**
 * Get cell type for a node (for cell type sorting)
 */
export function getCellType(node: MechanisticNode): string {
  // Check compartment.cellType
  if (node.compartment?.cellType) {
    return node.compartment.cellType.toLowerCase();
  }

  // Check references.cellType
  if (node.references?.cellType) {
    // Extract from CL ontology format
    const ref = node.references.cellType;
    if (ref.startsWith('CL:')) {
      return CELL_TYPE_REGIONS[ref] ? ref : 'unknown';
    }
    return ref.toLowerCase();
  }

  // Infer from subtype
  if (node.subtype) {
    const subtype = node.subtype.toLowerCase();
    if (subtype.includes('microglia')) return 'microglia';
    if (subtype.includes('astrocyte')) return 'astrocyte';
    if (subtype.includes('neuron')) return 'neuron';
    if (subtype.includes('oligodendrocyte')) return 'oligodendrocyte';
  }

  return 'unknown';
}

/**
 * Get module sort index (for module-based sorting)
 * Extracts numeric part from module ID (e.g., 'M01' -> 1)
 */
export function getModuleSortIndex(moduleId: string): number {
  const match = moduleId.match(/M(\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  // Boundary and custom nodes go at end
  if (moduleId === 'BOUNDARY') return 99;
  if (moduleId === 'CUSTOM') return 100;
  return 50; // Default middle
}
