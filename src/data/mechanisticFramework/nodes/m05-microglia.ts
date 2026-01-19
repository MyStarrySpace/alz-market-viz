/**
 * Module 5: Microglial Phenotypes
 */

import type { MechanisticNode } from '../types';

export const module5Nodes: MechanisticNode[] = [
  {
    id: 'microglia_activated',
    label: 'Activated Microglia',
    category: 'STOCK',
    subtype: 'PhenotypePool',
    moduleId: 'M05',
    references: { cellType: 'CL:0000129' },
    description: 'Microglia leaving homeostatic state',
    mechanism: 'Triggered by neuroinflammation; transitions to multiple phenotypes',
  },
  {
    id: 'nf_kb_active',
    label: 'NF-κB Active',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Activator',
    moduleId: 'M05',
    references: { protein: 'UniProt:Q04206' },
    description: 'Nuclear NF-κB transcription factor',
    mechanism: 'Drives inflammatory gene transcription, HIF-1α stabilization',
    roles: ['REGULATOR', 'THERAPEUTIC_TARGET'],
  },
  {
    id: 'hif1a_stabilized',
    label: 'HIF-1α Stabilized',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Activator',
    moduleId: 'M05',
    references: { protein: 'UniProt:Q16665' },
    description: 'Hypoxia-inducible factor stabilized under normoxia',
    mechanism: 'Stabilized by NF-κB signaling; drives glycolytic switch',
    roles: ['REGULATOR'],
  },
  {
    id: 'glycolytic_switch',
    label: 'Glycolytic Switch',
    category: 'STATE',
    subtype: 'MetabolicState',
    moduleId: 'M05',
    description: 'Warburg-like metabolism in microglia',
    mechanism: 'HIF-1α → PKM2 dimer → aerobic glycolysis',
  },
  {
    id: 'srebp1_active',
    label: 'SREBP1 Active',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Activator',
    moduleId: 'M05',
    references: { protein: 'UniProt:P36956' },
    description: 'Lipogenic transcription factor',
    mechanism: 'Drives lipid droplet formation',
    roles: ['REGULATOR'],
  },
  {
    id: 'lipid_droplets',
    label: 'Lipid Droplets',
    category: 'STOCK',
    subtype: 'Aggregate',
    moduleId: 'M05',
    description: 'Intracellular lipid storage organelles',
    mechanism: 'SREBP1 → lipogenesis → LD formation',
  },
  {
    id: 'ldam',
    label: 'LDAM Microglia',
    category: 'STATE',
    subtype: 'LDAM',
    moduleId: 'M05',
    description: 'Lipid-droplet-accumulating microglia',
    mechanism: 'Defective phagocytosis, high ROS, pro-inflammatory cytokines',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'dam_stage1',
    label: 'DAM Stage 1',
    category: 'STATE',
    subtype: 'DAM',
    moduleId: 'M05',
    description: 'Disease-associated microglia Stage 1 (TREM2-independent)',
    mechanism: 'P2ry12↓, Cx3cr1↓, Tyrobp↑ (checkpoint release)',
  },
  {
    id: 'dam_stage2',
    label: 'DAM Stage 2',
    category: 'STATE',
    subtype: 'DAM',
    moduleId: 'M05',
    description: 'Disease-associated microglia Stage 2 (TREM2-dependent)',
    mechanism: 'Lpl↑, Cst7↑, Cd9↑, Itgax↑ (full activation)',
  },
  {
    id: 'phagocytosis_impaired',
    label: 'Phagocytosis Impaired',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'Phagocytosis',
    moduleId: 'M05',
    references: { process: 'GO:0006909' },
    description: 'LDAM-associated phagocytic failure',
    mechanism: 'Lipid-laden lysosomes impair phagosome maturation',
  },
  {
    id: 'il1a',
    label: 'IL-1α',
    category: 'STOCK',
    subtype: 'CytokineLevel',
    moduleId: 'M05',
    references: { protein: 'UniProt:P01583' },
    description: 'Required for A1 astrocyte induction',
  },
  {
    id: 'tnf',
    label: 'TNF-α',
    category: 'STOCK',
    subtype: 'CytokineLevel',
    moduleId: 'M05',
    references: { protein: 'UniProt:P01375' },
    description: 'Required for A1 astrocyte induction',
  },
  {
    id: 'c1q',
    label: 'C1q',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M05',
    references: { protein: 'UniProt:P02745' },
    description: 'Complement component; required for A1 induction and synapse tagging',
    mechanism: 'IL-1α + TNF + C1q are necessary and sufficient for A1',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'a1_astrocytes',
    label: 'A1 Astrocytes',
    category: 'STATE',
    subtype: 'A1_Astrocyte',
    moduleId: 'M05',
    description: 'Neurotoxic reactive astrocytes',
    mechanism: 'Lose ability to promote neuronal survival; induce death of neurons and oligodendrocytes',
  },
];

// ============================================================================
// MODULE 6: Amyloid Pathology
