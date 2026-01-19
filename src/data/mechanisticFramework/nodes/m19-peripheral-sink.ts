/**
 * Module 19: Peripheral Sink & Systemic Clearance
 *
 * This module describes how Aβ is cleared outside the CNS and why
 * anti-Aβ antibodies work via peripheral mechanisms, not brain penetration.
 */

import type { MechanisticNode } from '../types';

export const module19Nodes: MechanisticNode[] = [
  // ============================================================================
  // FcRn TRANSPORT MECHANISMS
  // ============================================================================
  {
    id: 'fcrn_bbb_efflux',
    label: 'FcRn BBB Efflux',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M19',
    references: {
      protein: 'UniProt:P55899', // FCGRT (FcRn heavy chain)
      process: 'GO:0006898', // receptor-mediated endocytosis
    },
    description: 'FcRn actively pumps IgG antibodies OUT of brain',
    mechanism:
      'FcRn binds IgG at pH 6.0 (endosome) and releases at pH 7.4 (extracellular). Brain endothelial FcRn primarily effluxes IgG in brain→blood direction. Anti-Aβ antibodies achieve only ~0.1% brain uptake because FcRn actively pumps them back out. This is the primary reason why massive plasma antibody concentrations are needed for minimal brain effect.',
    roles: ['RATE_LIMITER'],
  },
  {
    id: 'fcrn_recycling',
    label: 'FcRn Peripheral Recycling',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M19',
    references: {
      protein: 'UniProt:P55899',
    },
    description: 'FcRn salvage pathway extends IgG half-life in blood',
    mechanism:
      'FcRn in endothelial cells and monocytes rescues IgG from lysosomal degradation, extending half-life to ~21 days. This recycling maintains high peripheral antibody concentrations but does not improve brain penetration. Antibody Fc engineering can modulate FcRn binding for different PK profiles.',
  },

  // ============================================================================
  // PERIPHERAL CLEARANCE ORGANS
  // ============================================================================
  {
    id: 'plasma_abeta',
    label: 'Plasma Aβ Pool',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M19',
    description: 'Circulating Aβ in blood; in equilibrium with brain Aβ',
    mechanism:
      'Plasma Aβ derives from: (1) Brain efflux via LRP1 at BBB; (2) Peripheral production (platelets, muscle); (3) CSF drainage via lymphatics. The brain→blood equilibrium is SLOW (half-life ~weeks) and transport-limited, not diffusion-limited. This limits the efficacy of the peripheral sink approach.',
    units: 'pg/mL',
    roles: ['BIOMARKER'],
  },
  {
    id: 'antibody_abeta_complex',
    label: 'Antibody-Aβ Immune Complex',
    category: 'STOCK',
    subtype: 'ComplexPool',
    moduleId: 'M19',
    description: 'IgG-Aβ complexes formed in blood',
    mechanism:
      'Anti-Aβ antibodies bind plasma Aβ forming immune complexes. These complexes are recognized by Fc receptors on macrophages in spleen and liver. Complex formation in blood is the PRIMARY mechanism of action for anti-Aβ antibodies - they work peripherally, not in the brain.',
  },
  {
    id: 'splenic_macrophages',
    label: 'Splenic Macrophages',
    category: 'STOCK',
    subtype: 'CellPopulation',
    moduleId: 'M19',
    references: {
      cellType: 'CL:0000235', // macrophage
      anatomy: 'UBERON:0002106', // spleen
    },
    description: 'Red pulp macrophages that filter blood-borne particles',
    mechanism:
      'Splenic macrophages express Fcγ receptors (FcγRI, FcγRIIA, FcγRIII) that bind antibody-opsonized particles including Aβ-antibody complexes. The spleen is the primary site for clearing opsonized particles from circulation. Splenectomy may reduce efficacy of peripheral Aβ immunotherapy.',
    roles: ['LEVERAGE_POINT'],
  },
  {
    id: 'splenic_clearance',
    label: 'Splenic Aβ Clearance',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M19',
    description: 'Spleen filters Aβ-antibody immune complexes from blood',
    mechanism:
      'Splenic macrophages phagocytose antibody-Aβ complexes via Fc receptors. This is the ACTUAL clearance mechanism for anti-Aβ antibodies - they opsonize Aβ in blood for splenic removal, not brain Aβ directly. Rate depends on: (1) Plasma Aβ concentration; (2) Antibody dose; (3) Splenic blood flow; (4) Macrophage Fc receptor expression.',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'hepatic_kupffer_cells',
    label: 'Kupffer Cells (Liver)',
    category: 'STOCK',
    subtype: 'CellPopulation',
    moduleId: 'M19',
    references: {
      cellType: 'CL:0000091', // Kupffer cell
      anatomy: 'UBERON:0002107', // liver
    },
    description: 'Liver-resident macrophages that clear blood-borne particles',
    mechanism:
      'Kupffer cells line hepatic sinusoids and clear particles, pathogens, and immune complexes from portal and systemic circulation. Express Fc receptors and scavenger receptors (SR-A, MARCO) that can bind Aβ directly.',
  },
  {
    id: 'hepatic_lrp1',
    label: 'Hepatic LRP1',
    category: 'STOCK',
    subtype: 'ReceptorPool',
    moduleId: 'M19',
    references: {
      protein: 'UniProt:Q07954', // LRP1
    },
    description: 'LRP1 on hepatocytes mediates Aβ uptake from blood',
    mechanism:
      'Low-density lipoprotein receptor-related protein 1 (LRP1) on hepatocytes binds Aβ (especially when complexed with APOE or α2-macroglobulin) for endocytosis and lysosomal degradation. Liver LRP1 may account for 40-60% of peripheral Aβ clearance.',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'hepatic_clearance',
    label: 'Hepatic Aβ Clearance',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M19',
    description: 'Liver clears Aβ via Kupffer cells, hepatocyte LRP1, and sinusoidal endothelium',
    mechanism:
      'The liver is a major site for peripheral Aβ clearance via multiple mechanisms: (1) Kupffer cell phagocytosis of immune complexes; (2) Hepatocyte LRP1-mediated endocytosis; (3) Liver sinusoidal endothelial cell (LSEC) scavenger receptors. Works in parallel with splenic clearance.',
    roles: ['THERAPEUTIC_TARGET'],
  },

  // ============================================================================
  // LYMPHATIC DRAINAGE
  // ============================================================================
  {
    id: 'cervical_lymph_nodes',
    label: 'Cervical Lymph Nodes',
    category: 'STOCK',
    subtype: 'CompartmentState',
    moduleId: 'M19',
    references: {
      anatomy: 'UBERON:0002429', // cervical lymph node
    },
    description: 'Deep cervical lymph nodes receive CNS lymphatic drainage',
    mechanism:
      'Meningeal lymphatics drain CSF and ISF contents to deep cervical lymph nodes. This is where brain-derived Aβ first contacts the peripheral immune system. Antigen presentation here can stimulate adaptive immune responses. Antibody-Aβ complexes formed in CNS (from the small amount of antibody that enters) also drain here.',
  },
  {
    id: 'systemic_circulation_abeta',
    label: 'Systemic Aβ Distribution',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M19',
    description: 'Aβ distribution between CNS and peripheral compartments',
    mechanism:
      'Aβ exists in equilibrium between brain ISF, CSF, and blood. Brain→blood transport via: (1) LRP1-mediated transcytosis at BBB; (2) Glymphatic/lymphatic drainage; (3) IPAD pathway. Blood→brain transport minimal due to RAGE downregulation in AD. The equilibrium constant and transport rates determine whether "peripheral sink" approaches can meaningfully reduce brain Aβ.',
  },

  // ============================================================================
  // RENAL CLEARANCE
  // ============================================================================
  {
    id: 'renal_clearance',
    label: 'Renal Aβ Clearance',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M19',
    references: {
      anatomy: 'UBERON:0002113', // kidney
    },
    description: 'Kidney filters and degrades small Aβ fragments',
    mechanism:
      'Kidneys can filter Aβ monomers and small oligomers (<60 kDa). Megalin/cubilin receptors on proximal tubule cells reabsorb filtered Aβ for lysosomal degradation. Renal dysfunction (common in elderly) impairs this clearance pathway. Dialysis can remove plasma Aβ (basis for some therapeutic approaches).',
  },
];
