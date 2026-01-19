/**
 * Module 10: APOE4 Pathways & REST/Epigenetic Dysregulation
 */

import type { MechanisticNode } from '../types';

export const module10Nodes: MechanisticNode[] = [
  {
    id: 'apoe4_domain_interaction',
    label: 'APOE4 Domain Interaction',
    category: 'STATE',
    subtype: 'Bound',
    moduleId: 'M10',
    description: 'Arg112 → domain interaction (Arg61-Glu255)',
    mechanism: '↓ Protein stability → aggregation; ↓ lipid-binding capacity',
  },
  {
    id: 'apoe_lipidation_reduced',
    label: 'APOE Lipidation Reduced',
    category: 'STATE',
    subtype: 'CompartmentIntegrity',
    moduleId: 'M10',
    description: 'APOE4 poorly lipidated',
    mechanism: 'ABCA1 aggregation → reduced APOE lipidation → impaired Aβ clearance',
  },
  {
    id: 'lysosomal_cholesterol_sequestration',
    label: 'Lysosomal Cholesterol Sequestration',
    category: 'STATE',
    subtype: 'CompartmentIntegrity',
    moduleId: 'M10',
    description: 'Cholesterol trapped in lysosomes',
    mechanism: 'ER "blind" to cholesterol → inappropriate SREBP2 activation',
  },
  {
    id: 'astrocyte_lipid_droplets',
    label: 'Astrocyte Lipid Droplets',
    category: 'STOCK',
    subtype: 'Aggregate',
    moduleId: 'M10',
    description: 'APOE4 astrocytes form larger LDs',
    mechanism: 'Enriched in unsaturated TAG → ferroptosis vulnerability',
  },
  {
    id: 'rest_nuclear',
    label: 'REST Nuclear (Protective)',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Repressor',
    moduleId: 'M10',
    references: { protein: 'UniProt:Q13127' },
    description: 'REST increases in healthy aging but DECREASES in AD',
    mechanism: 'Upregulates Nrf2 → antioxidant/anti-ferroptotic genes',
    roles: ['REGULATOR', 'LEVERAGE_POINT'],
  },
  {
    id: 'rest_depleted',
    label: 'REST Depleted (AD)',
    category: 'STATE',
    subtype: 'NuclearLocalized',
    moduleId: 'M10',
    description: 'Nuclear REST lost in AD neurons',
    mechanism: 'Loss of stress resistance and Nrf2-mediated protection',
  },
  {
    id: 'nrf2_pathway',
    label: 'Nrf2 Antioxidant Pathway',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Activator',
    moduleId: 'M10',
    references: { protein: 'UniProt:Q16236' },
    description: 'Master regulator of antioxidant genes',
    mechanism: 'REST → Nrf2 → HO-1, NQO1, xCT, GPX4',
    roles: ['REGULATOR', 'THERAPEUTIC_TARGET'],
  },
];

// ============================================================================
// MODULE 11: TREM2 & DAM
