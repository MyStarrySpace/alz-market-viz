/**
 * Drug Library for AD Mechanistic Network
 *
 * Curated list of drugs with their targets in the mechanistic network,
 * enabling pathway visualization and mechanism analysis.
 *
 * Each drug entry specifies:
 * - Target nodes in the network
 * - Effect type (activates/inhibits/modulates)
 * - Evidence level and FDA status
 * - Optional variants (e.g., dosing regimens)
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * How a drug affects its target
 */
export type DrugEffect = 'activates' | 'inhibits' | 'modulates';

/**
 * Strength of the drug's effect on target
 */
export type EffectStrength = 'strong' | 'moderate' | 'weak';

/**
 * Drug classification
 */
export type DrugType = 'small_molecule' | 'antibody' | 'biologic' | 'supplement';

/**
 * Regulatory status
 */
export type FDAStatus =
  | 'approved'      // FDA approved for any indication
  | 'phase3'        // In Phase 3 trials
  | 'phase2'        // In Phase 2 trials
  | 'phase1'        // In Phase 1 trials
  | 'preclinical'   // Preclinical stage
  | 'no_pathway';   // Generic/supplement without FDA pathway

/**
 * How the drug is available
 */
export type DrugAvailability = 'prescription' | 'otc' | 'supplement' | 'experimental';

/**
 * A single target of a drug in the network
 */
export interface DrugTarget {
  /** Node ID in the mechanistic network */
  nodeId: string;
  /** How the drug affects this target */
  effect: DrugEffect;
  /** Strength of the effect */
  strength: EffectStrength;
  /** Brief mechanism description */
  mechanism?: string;
}

/**
 * Evidence for drug's effects in AD
 */
export interface DrugADEvidence {
  /** Evidence level (matches our evidence hierarchy) */
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7';
  /** Summary of evidence */
  summary: string;
  /** PubMed IDs for key studies */
  pmids?: string[];
}

/**
 * Drug variant (e.g., different dosing regimens)
 */
export interface DrugVariant {
  id: string;
  label: string;
  /** Multiplier for effect strength (1.0 = standard) */
  effectModifier: number;
  /** Additional notes */
  notes?: string;
}

/**
 * Complete drug library entry
 */
export interface DrugLibraryEntry {
  /** Unique identifier (lowercase_snake_case) */
  id: string;
  /** Display name */
  name: string;
  /** Drug classification */
  type: DrugType;
  /** FDA approval status */
  fdaStatus: FDAStatus;
  /** Primary targets in the network */
  primaryTargets: DrugTarget[];
  /** Brief summary of mechanism */
  mechanismSummary: string;
  /** Optional dosing variants */
  variants?: DrugVariant[];
  /** AD-specific evidence */
  adEvidence: DrugADEvidence;
  /** Estimated annual cost (USD) */
  annualCost?: number;
  /** How the drug is available */
  availability: DrugAvailability;
  /** Additional notes */
  notes?: string;
}

/**
 * Pre-computed pathway configuration for a drug
 */
export interface DrugPathwayConfig {
  /** Drug ID this pathway is for */
  drugId: string;
  /** Nodes upstream of targets (what leads TO the target) */
  upstreamNodes: string[];
  /** The drug's direct target nodes */
  targetNodes: string[];
  /** Nodes downstream of targets (what the target affects) */
  downstreamNodes: string[];
  /** Edge IDs in the pathway */
  pathwayEdges: string[];
  /** Feedback loops affected by this drug */
  relevantLoops: {
    loopId: string;
    /** How the drug affects this loop */
    involvement: 'breaks' | 'weakens' | 'strengthens' | 'enters';
    /** Which target node participates in this loop */
    targetNodeInLoop: string;
  }[];
  /** Modules touched by the pathway */
  affectedModules: string[];
  /** When this pathway was computed */
  computedAt: string;
}

// ============================================================================
// DRUG LIBRARY
// ============================================================================

export const drugLibrary: DrugLibraryEntry[] = [
  // ---------------------------------------------------------------------------
  // RAPAMYCIN (SIROLIMUS)
  // ---------------------------------------------------------------------------
  {
    id: 'rapamycin',
    name: 'Rapamycin (Sirolimus)',
    type: 'small_molecule',
    fdaStatus: 'approved',
    availability: 'prescription',
    mechanismSummary: 'mTORC1 inhibitor that restores autophagy and reduces protein aggregation',
    primaryTargets: [
      {
        nodeId: 'mtorc1_hyperactive',
        effect: 'inhibits',
        strength: 'strong',
        mechanism: 'Binds FKBP12, which then inhibits mTORC1 kinase activity',
      },
    ],
    variants: [
      { id: 'standard', label: 'Standard (1-2mg/day)', effectModifier: 1.0 },
      { id: 'intermittent', label: 'Intermittent (weekly)', effectModifier: 0.7, notes: 'May avoid immunosuppression' },
      { id: 'low_dose', label: 'Low-dose (0.5mg/day)', effectModifier: 0.5 },
    ],
    adEvidence: {
      level: 'L4',
      summary: 'Animal studies show improved cognition and reduced Aβ/tau pathology. Human AD trials pending.',
      pmids: ['22956686', '25381458', '26187568'],
    },
    annualCost: 500, // Generic available
    notes: 'Most promising mTOR inhibitor for AD. Concerns about immunosuppression at high doses.',
  },

  // ---------------------------------------------------------------------------
  // LITHIUM (MICRODOSE)
  // ---------------------------------------------------------------------------
  {
    id: 'lithium_microdose',
    name: 'Lithium (Microdose)',
    type: 'small_molecule',
    fdaStatus: 'approved',
    availability: 'prescription',
    mechanismSummary: 'GSK3β inhibitor that reduces tau phosphorylation and promotes autophagy',
    primaryTargets: [
      {
        nodeId: 'gsk3b_active',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Competes with Mg2+ for binding, inhibiting GSK3β kinase activity',
      },
    ],
    variants: [
      { id: 'microdose', label: 'Microdose (300μg/day)', effectModifier: 0.3 },
      { id: 'low_dose', label: 'Low-dose (150mg/day)', effectModifier: 0.6 },
      { id: 'standard', label: 'Standard psychiatric', effectModifier: 1.0, notes: 'Requires monitoring' },
    ],
    adEvidence: {
      level: 'L4',
      summary: 'Epidemiological studies show reduced dementia in lithium users. Small RCTs show stabilization.',
      pmids: ['17592124', '21525519', '25733993'],
    },
    annualCost: 50, // Very cheap
    notes: 'Microdose lithium in drinking water associated with lower dementia rates in Texas study.',
  },

  // ---------------------------------------------------------------------------
  // SRI-011381 (C381)
  // ---------------------------------------------------------------------------
  {
    id: 'sri_011381',
    name: 'SRI-011381 (C381)',
    type: 'small_molecule',
    fdaStatus: 'phase1',
    availability: 'experimental',
    mechanismSummary: 'Restores lysosomal function via v-ATPase enhancement',
    primaryTargets: [
      {
        nodeId: 'lysosomal_dysfunction',
        effect: 'inhibits',
        strength: 'strong',
        mechanism: 'Enhances v-ATPase proton pump activity, restoring lysosomal acidification',
      },
    ],
    adEvidence: {
      level: 'L4',
      summary: 'Restores lysosomal function in PS1 mutant cells. Reduces Aβ and tau in mouse models.',
      pmids: ['33020469', '35314818'],
    },
    notes: 'Developed by Nixon lab. Addresses fundamental lysosomal dysfunction in AD.',
  },

  // ---------------------------------------------------------------------------
  // COLCHICINE
  // ---------------------------------------------------------------------------
  {
    id: 'colchicine',
    name: 'Colchicine',
    type: 'small_molecule',
    fdaStatus: 'approved',
    availability: 'prescription',
    mechanismSummary: 'NLRP3 inflammasome inhibitor that reduces neuroinflammation',
    primaryTargets: [
      {
        nodeId: 'nlrp3_active',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Disrupts microtubule assembly, preventing inflammasome formation',
      },
    ],
    adEvidence: {
      level: 'L6',
      summary: 'Epidemiological studies suggest reduced dementia in gout patients on colchicine.',
      pmids: ['32571790', '31883865'],
    },
    annualCost: 2500, // Brand name expensive, generic cheaper
    notes: 'COLCOT trial showed CV benefits; AD trial (COLADE) underway.',
  },

  // ---------------------------------------------------------------------------
  // ADUCANUMAB (ADUHELM)
  // ---------------------------------------------------------------------------
  {
    id: 'aducanumab',
    name: 'Aducanumab (Aduhelm)',
    type: 'antibody',
    fdaStatus: 'approved',
    availability: 'prescription',
    mechanismSummary: 'Anti-amyloid antibody that clears Aβ plaques via microglial phagocytosis',
    primaryTargets: [
      {
        nodeId: 'abeta_plaques',
        effect: 'inhibits',
        strength: 'strong',
        mechanism: 'Binds aggregated Aβ, promoting microglial clearance',
      },
    ],
    adEvidence: {
      level: 'L1',
      summary: 'Phase 3 trials showed plaque clearance but inconsistent clinical benefit. Controversial approval.',
      pmids: ['33497548', '34048569'],
    },
    annualCost: 28000, // Before withdrawal from market
    notes: 'Withdrawn from market 2024. ARIA (brain swelling/bleeding) in ~40% of patients.',
  },

  // ---------------------------------------------------------------------------
  // LECANEMAB (LEQEMBI)
  // ---------------------------------------------------------------------------
  {
    id: 'lecanemab',
    name: 'Lecanemab (Leqembi)',
    type: 'antibody',
    fdaStatus: 'approved',
    availability: 'prescription',
    mechanismSummary: 'Anti-amyloid antibody targeting protofibrils for Aβ clearance',
    primaryTargets: [
      {
        nodeId: 'abeta_oligomers',
        effect: 'inhibits',
        strength: 'strong',
        mechanism: 'Binds Aβ protofibrils (more toxic species), promoting clearance',
      },
      {
        nodeId: 'abeta_plaques',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Secondary effect on plaque burden',
      },
    ],
    adEvidence: {
      level: 'L1',
      summary: 'CLARITY-AD showed 27% slowing of decline at 18 months. First anti-amyloid with consistent efficacy.',
      pmids: ['36449413', '37458272'],
    },
    annualCost: 26500,
    notes: 'ARIA risk ~20%. Benefits modest but statistically significant. APOE4 homozygotes at higher risk.',
  },

  // ---------------------------------------------------------------------------
  // DONANEMAB
  // ---------------------------------------------------------------------------
  {
    id: 'donanemab',
    name: 'Donanemab (Kisunla)',
    type: 'antibody',
    fdaStatus: 'approved',
    availability: 'prescription',
    mechanismSummary: 'Anti-amyloid antibody targeting pyroglutamate Aβ in plaques',
    primaryTargets: [
      {
        nodeId: 'abeta_plaques',
        effect: 'inhibits',
        strength: 'strong',
        mechanism: 'Targets N-terminal pyroglutamate modification specific to deposited Aβ',
      },
    ],
    adEvidence: {
      level: 'L1',
      summary: 'TRAILBLAZER-ALZ2 showed 35% slowing in early AD. Can be discontinued after plaque clearance.',
      pmids: ['37459141', '38587244'],
    },
    annualCost: 32000,
    notes: 'Unique dosing strategy: treatment stops when plaques clear. ARIA risk ~25%.',
  },

  // ---------------------------------------------------------------------------
  // UROLITHIN A
  // ---------------------------------------------------------------------------
  {
    id: 'urolithin_a',
    name: 'Urolithin A',
    type: 'supplement',
    fdaStatus: 'no_pathway',
    availability: 'supplement',
    mechanismSummary: 'Mitophagy enhancer that clears damaged mitochondria via PINK1/Parkin',
    primaryTargets: [
      {
        nodeId: 'pink1_parkin',
        effect: 'activates',
        strength: 'moderate',
        mechanism: 'Upregulates PINK1/Parkin expression, enhancing mitophagy flux',
      },
    ],
    adEvidence: {
      level: 'L4',
      summary: 'Improves mitochondrial function in aging humans. Mouse AD studies show reduced pathology.',
      pmids: ['27274687', '30863582', '34182535'],
    },
    annualCost: 400, // Supplement pricing
    notes: 'GRAS status. Timeline Nutrition sells as supplement. Pomegranate-derived.',
  },

  // ---------------------------------------------------------------------------
  // NAD+ PRECURSORS (NMN/NR)
  // ---------------------------------------------------------------------------
  {
    id: 'nad_precursors',
    name: 'NAD+ Precursors (NMN/NR)',
    type: 'supplement',
    fdaStatus: 'no_pathway',
    availability: 'supplement',
    mechanismSummary: 'Restore NAD+ levels to support mitochondrial function and sirtuins',
    primaryTargets: [
      {
        nodeId: 'mito_ros',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'NAD+ supports mitochondrial function and reduces oxidative stress',
      },
    ],
    adEvidence: {
      level: 'L5',
      summary: 'Mouse studies show neuroprotection. Human trials for aging; AD-specific data limited.',
      pmids: ['27872959', '29432159', '33037328'],
    },
    annualCost: 600,
    notes: 'NMN vs NR debate ongoing. FDA declared NMN not a dietary supplement in 2022.',
  },

  // ---------------------------------------------------------------------------
  // GV-971 (SODIUM OLIGOMANNATE)
  // ---------------------------------------------------------------------------
  {
    id: 'gv971',
    name: 'GV-971 (Oligomannate)',
    type: 'small_molecule',
    fdaStatus: 'phase3', // In US/EU; approved in China
    availability: 'experimental',
    mechanismSummary: 'Gut-brain axis modulator that reduces neuroinflammation via microbiome',
    primaryTargets: [
      {
        nodeId: 'neuroinflammation',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Reduces neuroinflammation via gut-brain axis modulation',
      },
      {
        nodeId: 'microglia_activated',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Reduces Th1 cell infiltration and microglial activation',
      },
    ],
    adEvidence: {
      level: 'L1',
      summary: 'China Phase 3 showed cognitive improvement. GREEN MEMORY global trial ongoing.',
      pmids: ['31488882', '34497182'],
    },
    annualCost: 3000, // Estimated
    notes: 'Novel gut-brain mechanism. Seaweed-derived oligosaccharide. Skepticism in Western scientific community.',
  },

  // ---------------------------------------------------------------------------
  // SEMAGLUTIDE (GLP-1 AGONIST)
  // ---------------------------------------------------------------------------
  {
    id: 'semaglutide',
    name: 'Semaglutide (Ozempic/Wegovy)',
    type: 'biologic',
    fdaStatus: 'approved',
    availability: 'prescription',
    mechanismSummary: 'GLP-1 agonist that improves insulin signaling and may reduce neuroinflammation',
    primaryTargets: [
      {
        nodeId: 'insulin_resistance',
        effect: 'inhibits',
        strength: 'strong',
        mechanism: 'Enhances insulin secretion and sensitivity via GLP-1R',
      },
      {
        nodeId: 'neuroinflammation',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Anti-inflammatory effects independent of glucose control',
      },
    ],
    adEvidence: {
      level: 'L4',
      summary: 'Observational studies suggest 50%+ reduced dementia risk in T2D patients. EVOKE trial underway.',
      pmids: ['35216679', '37316654', '37923315'],
    },
    annualCost: 12000,
    notes: 'EVOKE/EVOKE+ Phase 3 AD trials expected 2025. Major pharma interest.',
  },

  // ---------------------------------------------------------------------------
  // DASATINIB + QUERCETIN (SENOLYTICS)
  // ---------------------------------------------------------------------------
  {
    id: 'dasatinib_quercetin',
    name: 'Dasatinib + Quercetin (D+Q)',
    type: 'small_molecule',
    fdaStatus: 'approved', // Dasatinib approved for leukemia
    availability: 'prescription',
    mechanismSummary: 'Senolytic combination that clears senescent cells reducing SASP',
    primaryTargets: [
      {
        nodeId: 'senescent_cells',
        effect: 'inhibits',
        strength: 'strong',
        mechanism: 'Induces apoptosis in senescent cells via multiple pathways',
      },
    ],
    adEvidence: {
      level: 'L4',
      summary: 'Mouse studies show improved cognition after senescent cell clearance. Human trials early stage.',
      pmids: ['31097543', '33765445', '36087609'],
    },
    annualCost: 5000, // Intermittent dosing
    notes: 'Intermittent "hit and run" dosing (2 days per month). Unity Biotechnology trials ongoing.',
  },

  // ---------------------------------------------------------------------------
  // CURCUMIN (TURMERIC)
  // ---------------------------------------------------------------------------
  {
    id: 'curcumin',
    name: 'Curcumin',
    type: 'supplement',
    fdaStatus: 'no_pathway',
    availability: 'supplement',
    mechanismSummary: 'Pleiotropic anti-inflammatory compound with poor bioavailability',
    primaryTargets: [
      {
        nodeId: 'nf_kb_active',
        effect: 'inhibits',
        strength: 'weak',
        mechanism: 'Inhibits NF-κB nuclear translocation',
      },
      {
        nodeId: 'abeta_oligomers',
        effect: 'inhibits',
        strength: 'weak',
        mechanism: 'May bind Aβ and prevent fibrillization (in vitro)',
      },
    ],
    adEvidence: {
      level: 'L5',
      summary: 'Extensive in vitro evidence but human trials disappointing due to bioavailability.',
      pmids: ['15590663', '25776839', '29320457'],
    },
    annualCost: 100,
    notes: 'Poor brain penetration despite promising preclinical data. Nano-formulations being tested.',
  },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get a drug by ID
 */
export function getDrugById(id: string): DrugLibraryEntry | undefined {
  return drugLibrary.find(d => d.id === id);
}

/**
 * Get all drugs targeting a specific node
 */
export function getDrugsTargetingNode(nodeId: string): DrugLibraryEntry[] {
  return drugLibrary.filter(d =>
    d.primaryTargets.some(t => t.nodeId === nodeId)
  );
}

/**
 * Get drugs by FDA status
 */
export function getDrugsByStatus(status: FDAStatus): DrugLibraryEntry[] {
  return drugLibrary.filter(d => d.fdaStatus === status);
}

/**
 * Get drugs by evidence level (L1 = highest)
 */
export function getDrugsByEvidenceLevel(level: DrugADEvidence['level']): DrugLibraryEntry[] {
  return drugLibrary.filter(d => d.adEvidence.level === level);
}

/**
 * Get drugs that inhibit a target
 */
export function getInhibitors(): DrugLibraryEntry[] {
  return drugLibrary.filter(d =>
    d.primaryTargets.some(t => t.effect === 'inhibits')
  );
}

/**
 * Get drugs that activate a target
 */
export function getActivators(): DrugLibraryEntry[] {
  return drugLibrary.filter(d =>
    d.primaryTargets.some(t => t.effect === 'activates')
  );
}

/**
 * Get all unique target node IDs in the library
 */
export function getAllTargetNodeIds(): string[] {
  const ids = new Set<string>();
  drugLibrary.forEach(d => {
    d.primaryTargets.forEach(t => ids.add(t.nodeId));
  });
  return Array.from(ids);
}

export default drugLibrary;
