/**
 * Treatment Library for AD Mechanistic Network
 *
 * Curated list of treatments (drugs, devices, lifestyle interventions) with
 * their targets in the mechanistic network, enabling pathway visualization
 * and mechanism analysis.
 *
 * Each treatment entry specifies:
 * - Target nodes in the network
 * - Effect type (activates/inhibits/modulates)
 * - Evidence level and regulatory status
 * - Optional variants (e.g., dosing regimens, intensity levels)
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * How a treatment affects its target
 */
export type TreatmentEffect = 'activates' | 'inhibits' | 'modulates';
/** @deprecated Use TreatmentEffect instead */
export type DrugEffect = TreatmentEffect;

/**
 * Strength of the treatment's effect on target
 */
export type EffectStrength = 'strong' | 'moderate' | 'weak';

/**
 * Treatment classification
 */
export type TreatmentType =
  | 'small_molecule'  // Drugs, supplements
  | 'antibody'        // Monoclonal antibodies
  | 'biologic'        // Peptides, proteins
  | 'supplement'      // OTC supplements
  | 'device'          // Medical devices (e.g., 40Hz stimulation)
  | 'lifestyle'       // Exercise, diet, sleep
  | 'behavioral';     // Behavioral modifications (e.g., nasal hygiene)

/** @deprecated Use TreatmentType instead */
export type DrugType = TreatmentType;

/**
 * Regulatory/evidence status
 */
export type RegulatoryStatus =
  | 'approved'        // FDA approved for any indication
  | 'phase3'          // In Phase 3 trials
  | 'phase2'          // In Phase 2 trials
  | 'phase1'          // In Phase 1 trials
  | 'preclinical'     // Preclinical stage
  | 'no_pathway'      // Generic/supplement without FDA pathway
  | 'lifestyle'       // Lifestyle intervention (no FDA pathway)
  | 'device_cleared'; // FDA cleared device (510k)

/** @deprecated Use RegulatoryStatus instead */
export type FDAStatus = RegulatoryStatus;

/**
 * How the treatment is available
 */
export type TreatmentAvailability =
  | 'prescription'     // Requires prescription
  | 'otc'              // Over-the-counter
  | 'supplement'       // Dietary supplement
  | 'experimental'     // Clinical trials only
  | 'consumer_device'  // Consumer device (no prescription)
  | 'free';            // Freely available (lifestyle changes)

/** @deprecated Use TreatmentAvailability instead */
export type DrugAvailability = TreatmentAvailability;

/**
 * A single target of a treatment in the network
 */
export interface TreatmentTarget {
  /** Node ID in the mechanistic network */
  nodeId: string;
  /** How the treatment affects this target */
  effect: TreatmentEffect;
  /** Strength of the effect */
  strength: EffectStrength;
  /** Brief mechanism description */
  mechanism?: string;
}
/** @deprecated Use TreatmentTarget instead */
export type DrugTarget = TreatmentTarget;

/**
 * Evidence for treatment's effects in AD
 */
export interface TreatmentADEvidence {
  /** Evidence level (matches our evidence hierarchy) */
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7';
  /** Summary of evidence */
  summary: string;
  /** PubMed IDs for key studies */
  pmids?: string[];
}
/** @deprecated Use TreatmentADEvidence instead */
export type DrugADEvidence = TreatmentADEvidence;

/**
 * Treatment variant (e.g., different dosing regimens or intensity levels)
 */
export interface TreatmentVariant {
  id: string;
  label: string;
  /** Multiplier for effect strength (1.0 = standard) */
  effectModifier: number;
  /** Additional notes */
  notes?: string;
}
/** @deprecated Use TreatmentVariant instead */
export type DrugVariant = TreatmentVariant;

/**
 * Complete treatment library entry
 */
export interface TreatmentLibraryEntry {
  /** Unique identifier (lowercase_snake_case) */
  id: string;
  /** Display name */
  name: string;
  /** Treatment classification */
  type: TreatmentType;
  /** Regulatory/evidence status */
  fdaStatus: RegulatoryStatus;
  /** Primary targets in the network */
  primaryTargets: TreatmentTarget[];
  /** Brief summary of mechanism */
  mechanismSummary: string;
  /** Optional variants (dosing, intensity levels) */
  variants?: TreatmentVariant[];
  /** AD-specific evidence */
  adEvidence: TreatmentADEvidence;
  /** Estimated annual cost (USD), undefined for free interventions */
  annualCost?: number;
  /** How the treatment is available */
  availability: TreatmentAvailability;
  /** Additional notes */
  notes?: string;
}
/** @deprecated Use TreatmentLibraryEntry instead */
export type DrugLibraryEntry = TreatmentLibraryEntry;

/**
 * Pre-computed pathway configuration for a treatment
 * Note: `drugId` kept for backward compatibility, maps to treatment ID
 */
export interface TreatmentPathwayConfig {
  /** Treatment ID this pathway is for (alias: drugId for backward compatibility) */
  drugId: string;
  /** Nodes upstream of targets (what leads TO the target) */
  upstreamNodes: string[];
  /** The treatment's direct target nodes */
  targetNodes: string[];
  /** Nodes downstream of targets (what the target affects) */
  downstreamNodes: string[];
  /** Edge IDs in the pathway */
  pathwayEdges: string[];
  /** Feedback loops affected by this treatment */
  relevantLoops: {
    loopId: string;
    /** How the treatment affects this loop */
    involvement: 'breaks' | 'weakens' | 'strengthens' | 'enters';
    /** Which target node participates in this loop */
    targetNodeInLoop: string;
  }[];
  /** Modules touched by the pathway */
  affectedModules: string[];
  /** When this pathway was computed */
  computedAt: string;
}
/** @deprecated Use TreatmentPathwayConfig instead */
export type DrugPathwayConfig = TreatmentPathwayConfig;

// ============================================================================
// TREATMENT LIBRARY
// ============================================================================

export const treatmentLibrary: TreatmentLibraryEntry[] = [
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
  // GALANTAMINE
  // ---------------------------------------------------------------------------
  {
    id: 'galantamine',
    name: 'Galantamine (Razadyne)',
    type: 'small_molecule',
    fdaStatus: 'approved',
    availability: 'prescription',
    mechanismSummary: 'AChE inhibitor and α7 nAChR positive allosteric modulator that protects BBB integrity via splenic anti-inflammatory pathway',
    primaryTargets: [
      {
        nodeId: 'ach_reduced',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Inhibits AChE, increasing acetylcholine at synapses',
      },
      {
        nodeId: 'bbb_integrity',
        effect: 'activates',
        strength: 'moderate',
        mechanism: 'α7 nAChR PAM activity → splenic α7 activation → ↓ systemic TNF-α/IL-1β → ↑ tight junction proteins (claudin-5, occludin)',
      },
      {
        nodeId: 'neuroinflammation',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Cholinergic anti-inflammatory pathway via vagus → spleen → ↓ cytokines',
      },
    ],
    adEvidence: {
      level: 'L1',
      summary: 'FDA-approved for AD. Dash lab (2016-2017) showed galantamine reduces TBI-triggered BBB permeability via α7 nAChR on splenic immune cells. Effects persist 10 days after drug termination.',
      pmids: ['29088998', '26937017'],
    },
    annualCost: 360,
    notes: 'BBB protection may be a major unrecognized mechanism. The splenic α7 nAChR → systemic inflammation → BBB axis explains why effects persist after discontinuation. May warrant measuring BBB permeability in AD trials.',
  },

  // ---------------------------------------------------------------------------
  // CAFFEIC ACID DERIVATIVE (COMPOUND 12d)
  // ---------------------------------------------------------------------------
  {
    id: 'caffeic_acid_12d',
    name: 'Caffeic Acid Derivative (Compound 12d)',
    type: 'small_molecule',
    fdaStatus: 'preclinical',
    availability: 'experimental',
    mechanismSummary: 'Multi-target directed ligand with AChE inhibition, antioxidant, metal chelation, and anti-amyloid aggregation properties',
    primaryTargets: [
      {
        nodeId: 'ach_reduced',
        effect: 'inhibits',
        strength: 'strong',
        mechanism: 'Selective AChE inhibition (IC₅₀ 3.72 μM) increases acetylcholine availability',
      },
      {
        nodeId: 'mito_ros',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Potent antioxidant activity (DPPH IC₅₀ 6.32 μM) reduces oxidative stress',
      },
      {
        nodeId: 'abeta_oligomers',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Inhibits Aβ self-aggregation (Thioflavin T assay and electron microscopy confirmed)',
      },
      {
        nodeId: 'labile_iron',
        effect: 'inhibits',
        strength: 'weak',
        mechanism: 'Metal-chelating properties reduce free metal-induced oxidative damage',
      },
    ],
    adEvidence: {
      level: 'L5',
      summary: 'Scopolamine-induced AD mouse model showed improved Y-maze spatial memory and restored cholinesterase levels. Neuroprotection in SH-SY5Y cells against H₂O₂ toxicity.',
      pmids: ['40578253'],
    },
    notes: 'Multi-target directed ligand (MTDL) approach from IIT BHU. Predicted BBB permeable (Pe = 4.12). Published June 2025 in Eur J Med Chem.',
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

  // ===========================================================================
  // NON-PHARMACOLOGICAL INTERVENTIONS
  // ===========================================================================

  // ---------------------------------------------------------------------------
  // 40Hz GAMMA STIMULATION
  // ---------------------------------------------------------------------------
  {
    id: 'gamma_40hz',
    name: '40Hz Gamma Stimulation',
    type: 'device',
    fdaStatus: 'phase3',
    availability: 'consumer_device',
    mechanismSummary: 'Audio-visual entrainment promotes glymphatic clearance via VIP interneurons and arterial pulsatility',
    primaryTargets: [
      {
        nodeId: 'arterial_pulsatility',
        effect: 'activates',
        strength: 'moderate',
        mechanism: 'VIP interneuron activation → increased vasomotion amplitude (~0.1Hz band)',
      },
      {
        nodeId: 'aqp4_polarization',
        effect: 'activates',
        strength: 'moderate',
        mechanism: 'VIP signaling → restored AQP4 localization at astrocyte endfeet',
      },
      {
        nodeId: 'glymphatic_clearance',
        effect: 'activates',
        strength: 'moderate',
        mechanism: 'Enhanced CSF influx and Aβ clearance; requires intact AQP4',
      },
    ],
    variants: [
      { id: 'visual_only', label: 'Visual only (40Hz flicker)', effectModifier: 0.6 },
      { id: 'audio_only', label: 'Audio only (40Hz click)', effectModifier: 0.5 },
      { id: 'multisensory', label: 'Multisensory (audio + visual)', effectModifier: 1.0 },
      { id: 'cognito_device', label: 'Cognito Therapeutics GENUS', effectModifier: 1.0, notes: 'Phase 3 EVOKE trial' },
    ],
    adEvidence: {
      level: 'L4',
      summary: 'Mouse studies show increased glymphatic clearance and reduced Aβ. Phase 3 human trials ongoing (EVOKE).',
      pmids: ['38418876', '27929004', '39747869'],
    },
    annualCost: 1500, // Consumer devices ~$1500
    notes: 'Murdock et al. 2024 (Nature) showed VIP interneurons and AQP4 are required for effect. EVOKE Phase 3 ongoing.',
  },

  // ---------------------------------------------------------------------------
  // EXERCISE
  // ---------------------------------------------------------------------------
  {
    id: 'exercise_aerobic',
    name: 'Aerobic Exercise',
    type: 'lifestyle',
    fdaStatus: 'lifestyle',
    availability: 'free',
    mechanismSummary: 'Restores AQP4 polarization, increases arterial pulsatility, promotes BDNF and autophagy',
    primaryTargets: [
      {
        nodeId: 'aqp4_polarization',
        effect: 'activates',
        strength: 'moderate',
        mechanism: 'Upregulates Lama1 and Dp71 → restores DAPC → AQP4 relocalization to endfeet',
      },
      {
        nodeId: 'arterial_pulsatility',
        effect: 'activates',
        strength: 'moderate',
        mechanism: 'Increased cardiac output → enhanced perivascular CSF flow',
      },
      {
        nodeId: 'glymphatic_clearance',
        effect: 'activates',
        strength: 'moderate',
        mechanism: 'Both AQP4 and pulsatility effects converge on glymphatic enhancement',
      },
      {
        nodeId: 'neuroinflammation',
        effect: 'inhibits',
        strength: 'moderate',
        mechanism: 'Reduces systemic and CNS inflammation markers',
      },
    ],
    variants: [
      { id: 'sedentary', label: 'Sedentary (<150 min/week)', effectModifier: 0, notes: 'Risk factor' },
      { id: 'light', label: 'Light (150-300 min/week)', effectModifier: 0.5 },
      { id: 'moderate', label: 'Moderate (300+ min/week)', effectModifier: 1.0 },
      { id: 'vigorous', label: 'Vigorous/HIIT', effectModifier: 1.2 },
      { id: 'swimming', label: 'Swimming', effectModifier: 1.0, notes: 'Most studied in AD models' },
    ],
    adEvidence: {
      level: 'L4',
      summary: 'Meta-analyses show 15-20% AD risk reduction. Mouse studies confirm AQP4 and glymphatic mechanisms.',
      pmids: ['39971255', '28579942', '35142700', '28054939'],
    },
    notes: 'Effect requires intact AQP4 (Liu 2022). Swimming specifically studied in Liang 2025.',
  },

  // ---------------------------------------------------------------------------
  // NASAL HYGIENE
  // ---------------------------------------------------------------------------
  {
    id: 'nasal_hygiene',
    name: 'Nasal Hygiene (Avoid Nose Picking)',
    type: 'behavioral',
    fdaStatus: 'lifestyle',
    availability: 'free',
    mechanismSummary: 'Reduces pathogen entry via olfactory nerve route to brain',
    primaryTargets: [
      {
        nodeId: 'neuroinflammation',
        effect: 'inhibits',
        strength: 'weak',
        mechanism: 'Pathogens (C. pneumoniae, HSV-1, P. gingivalis) can enter brain via olfactory nerve; nose picking introduces them',
      },
    ],
    variants: [
      { id: 'no_picking', label: 'Avoid nose picking', effectModifier: 1.0 },
      { id: 'nasal_rinse', label: 'Saline nasal rinse', effectModifier: 0.8, notes: 'May reduce pathogen load' },
      { id: 'hand_hygiene', label: 'Hand hygiene before face touching', effectModifier: 0.7 },
    ],
    adEvidence: {
      level: 'L6',
      summary: 'Olfactory nerve is a documented pathogen entry route. C. pneumoniae, HSV-1 found in AD brains. Epidemiological associations.',
      pmids: ['35675982', '37019931', '36280091'],
    },
    notes: 'St John & Bhattacharya 2022 (Nat Rev Neurosci) reviewed nose picking → C. pneumoniae → olfactory bulb → brain route.',
  },
];

/** @deprecated Use treatmentLibrary instead */
export const drugLibrary = treatmentLibrary;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get a treatment by ID
 */
export function getTreatmentById(id: string): TreatmentLibraryEntry | undefined {
  return treatmentLibrary.find(d => d.id === id);
}
/** @deprecated Use getTreatmentById instead */
export const getDrugById = getTreatmentById;

/**
 * Get all treatments targeting a specific node
 */
export function getTreatmentsTargetingNode(nodeId: string): TreatmentLibraryEntry[] {
  return treatmentLibrary.filter(d =>
    d.primaryTargets.some(t => t.nodeId === nodeId)
  );
}
/** @deprecated Use getTreatmentsTargetingNode instead */
export const getDrugsTargetingNode = getTreatmentsTargetingNode;

/**
 * Get treatments by regulatory status
 */
export function getTreatmentsByStatus(status: RegulatoryStatus): TreatmentLibraryEntry[] {
  return treatmentLibrary.filter(d => d.fdaStatus === status);
}
/** @deprecated Use getTreatmentsByStatus instead */
export const getDrugsByStatus = getTreatmentsByStatus;

/**
 * Get treatments by evidence level (L1 = highest)
 */
export function getTreatmentsByEvidenceLevel(level: TreatmentADEvidence['level']): TreatmentLibraryEntry[] {
  return treatmentLibrary.filter(d => d.adEvidence.level === level);
}
/** @deprecated Use getTreatmentsByEvidenceLevel instead */
export const getDrugsByEvidenceLevel = getTreatmentsByEvidenceLevel;

/**
 * Get treatments by type (drug, device, lifestyle, behavioral)
 */
export function getTreatmentsByType(type: TreatmentType): TreatmentLibraryEntry[] {
  return treatmentLibrary.filter(d => d.type === type);
}

/**
 * Get treatments that inhibit a target
 */
export function getInhibitors(): TreatmentLibraryEntry[] {
  return treatmentLibrary.filter(d =>
    d.primaryTargets.some(t => t.effect === 'inhibits')
  );
}

/**
 * Get treatments that activate a target
 */
export function getActivators(): TreatmentLibraryEntry[] {
  return treatmentLibrary.filter(d =>
    d.primaryTargets.some(t => t.effect === 'activates')
  );
}

/**
 * Get all unique target node IDs in the library
 */
export function getAllTargetNodeIds(): string[] {
  const ids = new Set<string>();
  treatmentLibrary.forEach(d => {
    d.primaryTargets.forEach(t => ids.add(t.nodeId));
  });
  return Array.from(ids);
}

export default drugLibrary;
