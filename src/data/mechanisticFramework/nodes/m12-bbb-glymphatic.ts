/**
 * Module 12: BBB & Glymphatic
 */

import type { MechanisticNode } from '../types';

export const module12Nodes: MechanisticNode[] = [
  {
    id: 'bbb_breakdown',
    label: 'BBB Breakdown',
    category: 'STATE',
    subtype: 'CompartmentIntegrity',
    moduleId: 'M12',
    description: 'Blood-brain barrier dysfunction',
    mechanism: 'APOE4 → CypA↑ → MMP9↑ → tight junction degradation',
    roles: ['BIOMARKER'],
  },
  {
    id: 'cypa_elevated',
    label: 'Cyclophilin A Elevated',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M12',
    references: { protein: 'UniProt:P62937' },
    description: 'APOE4-induced in pericytes',
    mechanism: 'CypA → NF-κB → MMP9 transcription',
  },
  {
    id: 'mmp9_elevated',
    label: 'MMP-9 Elevated',
    category: 'STOCK',
    subtype: 'ActiveProteinPool',
    moduleId: 'M12',
    references: { protein: 'UniProt:P14780' },
    description: 'Matrix metalloproteinase degrades tight junctions',
    mechanism: 'Cleaves claudin-5, occludin, ZO-1',
  },
  {
    id: 'pericyte_injury',
    label: 'Pericyte Injury',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M12',
    description: 'sPDGFRβ in CSF = pericyte injury biomarker',
    mechanism: 'Predicts cognitive decline independent of Aβ/tau',
    roles: ['BIOMARKER'],
  },
  {
    id: 'glymphatic_clearance',
    label: 'Glymphatic Clearance',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M12',
    description: 'Sleep-dependent Aβ clearance',
    mechanism: 'Sleep → 60% ISF expansion → 2x Aβ clearance rate',
  },
  {
    id: 'meningeal_lymphatics',
    label: 'Meningeal Lymphatics',
    category: 'STOCK',
    subtype: 'OrganellePool',
    moduleId: 'M12',
    description: 'CNS lymphatic drainage; declines with aging',
    mechanism: 'VEGF-C can restore function',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'isf_abeta_clearance',
    label: 'ISF Aβ Clearance',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M12',
    description: 'Interstitial fluid Aβ drainage',
    mechanism: 'Para-arterial influx → para-venous efflux',
  },
  {
    id: 'bbb_integrity',
    label: 'BBB Integrity',
    category: 'STATE',
    subtype: 'Homeostatic',
    moduleId: 'M12',
    description: 'Blood-brain barrier structural and functional integrity',
    mechanism: 'Maintained by tight junctions (claudin-5, occludin, ZO-1), pericyte coverage, OPC-derived TGF-β1. Intact BBB prevents peripheral factors from entering CNS',
    sharedWith: ['M13'], // OPC-BBB axis
    roles: ['BIOMARKER'],
  },
  {
    id: 'pericyte_function',
    label: 'Pericyte Function',
    category: 'STATE',
    subtype: 'Homeostatic',
    moduleId: 'M12',
    references: {
      cellType: 'CL:0000669', // pericyte
    },
    description: 'Pericyte-mediated BBB support and capillary dilation',
    mechanism: 'Pericytes regulate BBB permeability, capillary blood flow, and respond to OPC Ca²⁺ signals. Receive TGF-β1 from OPCs for tight junction maintenance',
    sharedWith: ['M13'], // OPC-vascular coupling
  },
  // AQP4 and glymphatic machinery (added 2026-01-17)
  {
    id: 'aqp4_polarization',
    label: 'AQP4 Polarization',
    category: 'STATE',
    subtype: 'Homeostatic',
    moduleId: 'M12',
    references: {
      protein: 'UniProt:P55087', // AQP4
      process: 'GO:0015250', // water channel activity
    },
    description: 'AQP4 concentrated at astrocyte endfeet (healthy state)',
    mechanism:
      'AQP4 anchored to endfeet by dystrophin-associated protein complex (DAPC): Laminin → α/β-Dystroglycan → Dystrophin → α1-Syntrophin → AQP4. Enables efficient CSF-ISF exchange for waste clearance',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'aqp4_depolarization',
    label: 'AQP4 Depolarization',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M12',
    references: {
      protein: 'UniProt:P55087', // AQP4
    },
    description: 'AQP4 redistributed away from endfeet (pathological)',
    mechanism:
      'DAPC disruption → AQP4 mislocalized to parenchymal membrane. DTNB (AD risk gene) encodes β-dystrobrevin component of DAPC. AQP4 SNPs (rs151244, rs3763040) associated with faster cognitive decline. Reduces glymphatic efficiency 80-90%',
    roles: ['BIOMARKER', 'THERAPEUTIC_TARGET'],
  },
  {
    id: 'arterial_pulsatility',
    label: 'Arterial Pulsatility',
    category: 'STATE',
    subtype: 'Homeostatic',
    moduleId: 'M12',
    description: 'Vasomotion amplitude that drives perivascular CSF flow',
    mechanism:
      'Arterial pulsatility drives CSF influx along periarterial spaces. Increased by exercise (cardiac output) and 40Hz gamma stimulation (VIP-mediated). Stiffening with age reduces flow',
  },
  {
    id: 'csf_isf_exchange',
    label: 'CSF-ISF Exchange',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M12',
    description: 'Bidirectional fluid exchange in brain parenchyma',
    mechanism:
      'CSF enters via periarterial spaces → AQP4-mediated exchange with ISF → waste-laden ISF exits via perivenous spaces → meningeal lymphatics. Rate enhanced by sleep, exercise, 40Hz stimulation',
  },
  // Astrocyte Endfeet (added 2026-01-17)
  {
    id: 'astrocyte_endfeet',
    label: 'Astrocyte Endfeet Integrity',
    category: 'STOCK',
    subtype: 'CompartmentState',
    moduleId: 'M12',
    references: {
      cellType: 'CL:0000127', // astrocyte
      anatomy: 'GO:0097450', // astrocyte end-foot
    },
    description: 'Structural integrity of astrocyte endfeet ensheathing blood vessels',
    mechanism:
      'Astrocyte endfeet form a critical interface wrapping ~99% of cerebral blood vessels. They: (1) Anchor AQP4 water channels via DAPC complex for glymphatic function; (2) Support BBB integrity via laminin/dystroglycan; (3) Enable neurovascular coupling; (4) Contain lysosomes that process perivascular debris; (5) Express α7 nAChRs responsive to cholinergic signaling. A1 astrocyte conversion damages endfoot structure.',
    sharedWith: ['M05', 'M02', 'M13'], // Connects astrocytes, lysosomes, cholinergic
    roles: ['LEVERAGE_POINT', 'THERAPEUTIC_TARGET'],
  },
];

// ============================================================================
// MODULE 13: Cholinergic & White Matter
