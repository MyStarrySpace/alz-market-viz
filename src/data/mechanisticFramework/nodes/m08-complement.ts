/**
 * Module 8: Complement & Synaptic Pruning
 */

import type { MechanisticNode } from '../types';

export const module8Nodes: MechanisticNode[] = [
  {
    id: 'c1q_elevated',
    label: 'C1q Elevated',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M08',
    references: { protein: 'UniProt:P02745' },
    description: 'C1q increases 300-fold with aging',
    mechanism: 'Tags synapses for elimination; initiates classical complement',
    roles: ['THERAPEUTIC_TARGET', 'BIOMARKER'],
  },
  {
    id: 'c3_opsonization',
    label: 'C3 Opsonization',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M08',
    references: { protein: 'UniProt:P01024' },
    description: 'C3 cleavage → C3b deposits on tagged synapses',
    mechanism: 'C1q → C4 → C2 → C3 convertase → C3b',
  },
  {
    id: 'cr3_mediated_pruning',
    label: 'CR3-Mediated Synapse Pruning',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'Phagocytosis',
    moduleId: 'M08',
    references: { protein: 'UniProt:P11215' },
    description: 'Microglial CR3 engulfs C3-tagged synapses',
    mechanism: 'iC3b/C3b on synapse → CR3 binding → engulfment',
  },
  {
    id: 'synapse_elimination',
    label: 'Synapse Elimination',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M08',
    description: 'Complement-mediated synapse loss',
    mechanism: 'Reactivated developmental pruning pathway in AD',
  },
];

// ============================================================================
// MODULE 9: Iron Dysregulation & Ferroptosis
