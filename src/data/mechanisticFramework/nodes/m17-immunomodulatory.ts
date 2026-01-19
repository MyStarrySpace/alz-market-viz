/**
 * Module 17: Immunomodulatory Interventions
 */

import type { MechanisticNode } from '../types';

export const module17Nodes: MechanisticNode[] = [
  {
    id: 'as01_adjuvant',
    label: 'AS01 Adjuvant (Shingrix/Arexvy)',
    category: 'BOUNDARY',
    subtype: 'SmallMolecule',
    moduleId: 'M17',
    boundaryDirection: 'input',
    description: 'MPL + QS-21 vaccine adjuvant',
    mechanism: 'TLR4 agonist (MPL) + saponin (QS-21) → DC/macrophage activation → IFN-γ',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'tlr4_activation',
    label: 'TLR4 Activation',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M17',
    references: { protein: 'UniProt:O00206' },
    description: 'Toll-like receptor 4 activation by MPL',
    mechanism: 'Monophosphoryl lipid A (MPL) activates TLR4 → MyD88/TRIF signaling',
  },
  {
    id: 'ifn_gamma',
    label: 'IFN-γ',
    category: 'STOCK',
    subtype: 'CytokineLevel',
    moduleId: 'M17',
    references: { protein: 'UniProt:P01579' },
    description: 'Interferon gamma; downstream of AS01',
    mechanism: 'May attenuate amyloid plaque deposition; negatively correlated with cognitive decline in unimpaired elderly',
    roles: ['BIOMARKER'],
  },
  // amyloid_clearance_enhanced removed - IFN-γ now directly modulates Abeta_clearance (M06)
];

// ============================================================================
// MODULE 18: Astrocyte Endfoot Integrity / Clasmatodendrosis
