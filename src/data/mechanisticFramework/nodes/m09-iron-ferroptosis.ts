/**
 * Module 9: Iron Dysregulation & Ferroptosis
 */

import type { MechanisticNode } from '../types';

export const module9Nodes: MechanisticNode[] = [
  {
    id: 'iron_accumulation',
    label: 'Brain Iron Accumulation',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M09',
    description: 'Iron accumulates but is SEQUESTERED',
    mechanism: 'Trapped in ferritin/lysosomes → functional deficiency',
    roles: ['BIOMARKER'],
  },
  {
    id: 'hepcidin_elevated',
    label: 'Hepcidin Elevated',
    category: 'STOCK',
    subtype: 'HormoneLevel',
    moduleId: 'M09',
    references: { protein: 'UniProt:P81172' },
    description: 'IL-6 induces hepcidin → ferroportin degradation',
    mechanism: 'Inflammation → iron retention in cells',
  },
  {
    id: 'ferroportin_reduced',
    label: 'Ferroportin Reduced',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M09',
    references: { protein: 'UniProt:Q9NP59' },
    description: 'Iron export blocked → intracellular iron trap',
    mechanism: 'Hepcidin-induced degradation; estrogen-dependent expression',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'ferritin_trap',
    label: 'Ferritin Iron Trap',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M09',
    description: 'Fe³⁺ locked in ferritin cages',
    mechanism: 'Iron stored but unavailable for enzymatic use',
  },
  {
    id: 'lysosomal_iron_trap',
    label: 'Lysosomal Iron Trap',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M09',
    description: 'Iron in lysosomes (pH too high for release)',
    mechanism: 'Dysfunctional lysosomes cannot mobilize iron',
  },
  {
    id: 'labile_iron',
    label: 'Labile Iron Pool',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M09',
    description: 'Cytosolic free Fe²⁺ available for Fenton chemistry',
    mechanism: 'When ferroportin↓ → Fe²⁺ accumulates → lipid peroxidation',
    units: 'Fe²⁺ concentration',
  },
  {
    id: 'functional_iron_deficiency',
    label: 'Functional Iron Deficiency',
    category: 'STATE',
    subtype: 'MetabolicState',
    moduleId: 'M09',
    description: 'Cytosolic Fe²⁺ depleted despite total iron↑',
    mechanism: 'Fe-S clusters fail, mitochondrial function impaired',
  },
  {
    id: 'gpx4_activity',
    label: 'GPX4 Activity',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Transferase',
    moduleId: 'M09',
    references: { protein: 'UniProt:P36969' },
    description: 'Glutathione peroxidase 4; prevents ferroptosis',
    mechanism: 'Reduces lipid peroxides; requires GSH as cofactor',
    roles: ['REGULATOR', 'THERAPEUTIC_TARGET'],
  },
  {
    id: 'lipid_peroxidation',
    label: 'Lipid Peroxidation',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M09',
    description: 'Oxidized membrane lipids',
    mechanism: 'Fenton chemistry (Fe²⁺ + H₂O₂) → lipid radicals',
  },
  {
    id: 'ferroptosis',
    label: 'Ferroptosis',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'Ferroptosis',
    moduleId: 'M09',
    description: 'Iron-dependent non-apoptotic cell death',
    mechanism: 'Lipid peroxidation exceeds GPX4 capacity → membrane failure',
  },
  {
    id: 'senescent_cells',
    label: 'Senescent Cells',
    category: 'STOCK',
    subtype: 'PhenotypePool',
    moduleId: 'M09',
    description: 'SASP-positive cells with high iron/β-gal',
    mechanism: 'Iron drives senescence; targets for ferroptotic senolysis',
    roles: ['THERAPEUTIC_TARGET'],
  },
  // SASP removed - it's a phenotypic category, not a discrete node
  // Downstream effects (IL-6, IL-8, IL-1β, TNF-α) are captured by edge to IL1B
];

// ============================================================================
// MODULE 10: APOE4 Pathways & REST/Epigenetic
