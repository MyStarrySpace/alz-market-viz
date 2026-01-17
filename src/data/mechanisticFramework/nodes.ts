/**
 * Mechanistic Network Nodes
 *
 * 194 nodes representing molecular entities, cellular states, and clinical outcomes
 * in the AD pathophysiology network. Organized by module.
 */

import type { MechanisticNode } from './types';

// ============================================================================
// SYSTEM BOUNDARIES (Input/Output)
// ============================================================================

export const boundaryNodes: MechanisticNode[] = [
  // Input Boundaries (Unexplained Causes)
  {
    id: 'aging',
    label: 'Aging',
    category: 'BOUNDARY',
    subtype: 'Lifestyle',
    moduleId: 'BOUNDARY',
    boundaryDirection: 'input',
    description: 'Chronological age; drives multiple pathways',
    mechanism: 'Drives C1q↑, iron accumulation, DIM infiltration, meningeal lymphatic decline',
    defaultVariant: 'age_65_74',
    variants: [
      {
        id: 'age_under_65',
        label: '<65 years',
        effectDirection: 'protective',
        effectMagnitude: 0.3,
        effectDescription: 'Early-onset rare; usually genetic causes (APP, PSEN1/2)',
        color: '#34d399',
        evidence: [{ pmid: '23571587', oddsRatio: 0.02, population: 'Global' }],
      },
      {
        id: 'age_65_74',
        label: '65-74 years',
        effectDirection: 'neutral',
        effectMagnitude: 1.0,
        effectDescription: 'Reference age group; ~5% prevalence',
        color: '#787473',
        evidence: [{ pmid: '23571587', oddsRatio: 1.0, population: 'Global' }],
      },
      {
        id: 'age_75_84',
        label: '75-84 years',
        effectDirection: 'risk',
        effectMagnitude: 3.0,
        effectDescription: 'Prevalence ~15%; iron↑, C1q↑, glymphatic↓',
        color: '#E5AF19',
        evidence: [{ pmid: '23571587', oddsRatio: 3.0, population: 'Global' }],
      },
      {
        id: 'age_85_plus',
        label: '85+ years',
        effectDirection: 'risk',
        effectMagnitude: 8.0,
        effectDescription: 'Prevalence ~30-50%; widespread neuropathology common',
        color: '#c75146',
        evidence: [{ pmid: '23571587', oddsRatio: 8.0, population: 'Global' }],
      },
    ],
  },
  {
    id: 'apoe_genotype',
    label: 'APOE Genotype',
    category: 'BOUNDARY',
    subtype: 'GeneticVariant',
    moduleId: 'BOUNDARY',
    boundaryDirection: 'input',
    references: { gene: 'HGNC:613' },
    description: 'Apolipoprotein E genetic variants',
    mechanism: 'Major genetic risk factor for late-onset AD',
    defaultVariant: 'apoe3',
    variants: [
      {
        id: 'apoe2',
        label: 'APOE ε2',
        frequency: 0.08,
        effectDirection: 'protective',
        effectMagnitude: 0.6,
        effectDescription: 'Protective against AD; better Aβ clearance, reduced tau pathology',
        color: '#34d399',
        evidence: [
          {
            pmid: '23571587',
            oddsRatio: 0.6,
            confidenceInterval: [0.5, 0.7],
            population: 'European',
          },
        ],
      },
      {
        id: 'apoe3',
        label: 'APOE ε3',
        frequency: 0.78,
        effectDirection: 'neutral',
        effectMagnitude: 1.0,
        effectDescription: 'Reference allele; most common in population',
        color: '#787473',
        evidence: [
          {
            pmid: '23571587',
            oddsRatio: 1.0,
            population: 'European',
          },
        ],
      },
      {
        id: 'apoe4_het',
        label: 'APOE ε4 (1 copy)',
        frequency: 0.14,
        effectDirection: 'risk',
        effectMagnitude: 3.2,
        effectDescription: 'Single ε4 allele: ~3x AD risk; impaired lipidation, Aβ clearance',
        color: '#E5AF19',
        evidence: [
          {
            pmid: '23571587',
            oddsRatio: 3.2,
            confidenceInterval: [2.8, 3.8],
            population: 'European',
          },
        ],
      },
      {
        id: 'apoe4_hom',
        label: 'APOE ε4/ε4',
        frequency: 0.02,
        effectDirection: 'risk',
        effectMagnitude: 12.0,
        effectDescription: 'Homozygous ε4: ~12x AD risk; severe lipid dysfunction, early onset',
        color: '#c75146',
        evidence: [
          {
            pmid: '23571587',
            oddsRatio: 12.0,
            confidenceInterval: [8.0, 18.0],
            population: 'European',
          },
        ],
      },
    ],
  },
  {
    id: 'trem2_variants',
    label: 'TREM2 Variants',
    category: 'BOUNDARY',
    subtype: 'GeneticVariant',
    moduleId: 'BOUNDARY',
    boundaryDirection: 'input',
    references: { gene: 'HGNC:17760' },
    description: 'R47H, R62H, other risk variants',
    mechanism: '~3x AD risk; hypomorphic function',
    defaultVariant: 'trem2_common',
    variants: [
      {
        id: 'trem2_common',
        label: 'Common (WT)',
        frequency: 0.98,
        effectDirection: 'neutral',
        effectMagnitude: 1.0,
        effectDescription: 'Wild-type TREM2; normal microglial function',
        color: '#787473',
        evidence: [{ pmid: '23150908', oddsRatio: 1.0, population: 'European' }],
      },
      {
        id: 'trem2_r47h',
        label: 'R47H',
        frequency: 0.003,
        effectDirection: 'risk',
        effectMagnitude: 2.9,
        effectDescription: 'Impaired ligand binding; reduced phagocytosis, DAM transition blocked',
        color: '#c75146',
        evidence: [
          { pmid: '23150908', oddsRatio: 2.9, confidenceInterval: [2.2, 3.8], population: 'European' },
        ],
      },
      {
        id: 'trem2_r62h',
        label: 'R62H',
        frequency: 0.01,
        effectDirection: 'risk',
        effectMagnitude: 1.7,
        effectDescription: 'Partial loss of function; less severe than R47H',
        color: '#E5AF19',
        evidence: [
          { pmid: '25533203', oddsRatio: 1.7, confidenceInterval: [1.4, 2.0], population: 'European' },
        ],
      },
      {
        id: 'trem2_h157y',
        label: 'H157Y',
        frequency: 0.002,
        effectDirection: 'risk',
        effectMagnitude: 1.5,
        effectDescription: 'Increased TREM2 shedding; reduced surface expression',
        color: '#E5AF19',
        evidence: [
          { pmid: '27570872', oddsRatio: 1.5, confidenceInterval: [1.2, 1.9], population: 'European' },
        ],
      },
    ],
  },
  {
    id: 'familial_ad_mutations',
    label: 'Familial AD Mutations',
    category: 'BOUNDARY',
    subtype: 'GeneticVariant',
    moduleId: 'BOUNDARY',
    boundaryDirection: 'input',
    description: 'APP, PSEN1, PSEN2 mutations',
    mechanism: 'Autosomal dominant mutations; deterministic early-onset AD',
  },
  {
    id: 'sex',
    label: 'Biological Sex',
    category: 'BOUNDARY',
    subtype: 'GeneticVariant',
    moduleId: 'BOUNDARY',
    boundaryDirection: 'input',
    description: 'XX vs XY chromosomes',
    mechanism: 'Affects iron metabolism, immune responses, hormone levels',
  },
  {
    id: 'sleep_disruption',
    label: 'Sleep Disruption',
    category: 'BOUNDARY',
    subtype: 'Lifestyle',
    moduleId: 'BOUNDARY',
    boundaryDirection: 'input',
    description: 'Chronic sleep disturbance',
    mechanism: 'Reduces glymphatic clearance 50%+',
  },

  // Output Boundaries (Terminal Outcomes)
  {
    id: 'mortality',
    label: 'Mortality',
    category: 'BOUNDARY',
    subtype: 'Diagnosis',
    moduleId: 'BOUNDARY',
    boundaryDirection: 'output',
    description: 'Death; ultimate endpoint',
  },

  // Measured Stocks (Proximal to Output Boundaries - SHARED by many modules)
  {
    id: 'cognitive_score',
    label: 'Cognitive Score',
    category: 'STOCK',
    subtype: 'MetaboliteSignal',
    moduleId: 'BOUNDARY',
    sharedWith: ['M06', 'M07', 'M08', 'M13', 'M17'], // Amyloid, Tau, Complement, Cholinergic, AS01
    description: 'Psychometric assessment of cognition - primary clinical endpoint',
    units: 'MMSE (0-30), ADAS-Cog (0-70), CDR-SB (0-18), MoCA (0-30)',
    roles: ['BIOMARKER'],
  },
  {
    id: 'synapses',
    label: 'Synapse Density',
    category: 'STOCK',
    subtype: 'OrganellePool',
    moduleId: 'BOUNDARY',
    sharedWith: ['M06', 'M08'], // Amyloid (LTP), Complement (pruning)
    references: { process: 'GO:0045202' },
    description: 'Synapse density in cortex/hippocampus - strongest correlate of cognition',
    units: 'Stereology count, synaptophysin IHC',
    roles: ['BIOMARKER'],
  },
  {
    id: 'neuronal_count',
    label: 'Neuron Count',
    category: 'STOCK',
    subtype: 'CellPopulation',
    moduleId: 'BOUNDARY',
    references: { cellType: 'CL:0000540' },
    description: 'Neuron number in affected regions',
    units: 'Stereology, NeuN+ counts',
    roles: ['BIOMARKER'],
  },
  {
    id: 'brain_volume',
    label: 'Brain Volume',
    category: 'STOCK',
    subtype: 'CompartmentState',
    moduleId: 'BOUNDARY',
    references: { anatomy: 'UBERON:0000955' },
    description: 'Regional brain volumes',
    units: 'MRI volumetrics (hippocampus, entorhinal cortex)',
    roles: ['BIOMARKER'],
  },
  {
    id: 'csf_biomarkers',
    label: 'CSF Biomarkers',
    category: 'STOCK',
    subtype: 'MetaboliteSignal',
    moduleId: 'BOUNDARY',
    description: 'Fluid biomarkers',
    units: 'Aβ42 pg/mL, pTau181 pg/mL, NfL pg/mL, sTREM2 pg/mL',
    roles: ['BIOMARKER'],
  },
];

// ============================================================================
// MODULE 1: Insulin/mTOR/Autophagy Axis
// ============================================================================

export const module1Nodes: MechanisticNode[] = [
  {
    id: 'insulin_resistance',
    label: 'Brain Insulin Resistance',
    category: 'STATE',
    subtype: 'MetabolicState',
    moduleId: 'M01',
    references: {
      disease: 'DOID:9352',
      phenotype: 'HP:0000855',
    },
    description: 'Brain insulin resistance ± systemic T2DM',
    mechanism: '"Type 3 Diabetes" concept - impaired brain insulin signaling',
    roles: ['LEVERAGE_POINT'],
  },
  {
    id: 'mtorc1_hyperactive',
    label: 'mTORC1 Hyperactive',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Kinase',
    moduleId: 'M01',
    references: {
      process: 'GO:0031931',
      protein: 'UniProt:P42345',
    },
    compartment: { subcellular: 'Lysosomal membrane' },
    description: 'Constitutively active mTORC1 complex',
    mechanism: 'On lysosomal membrane due to chronic AKT signaling',
    roles: ['REGULATOR', 'THERAPEUTIC_TARGET', 'RATE_LIMITER'],
  },
  {
    id: 'tfeb_phosphorylated',
    label: 'TFEB Phosphorylated',
    category: 'STATE',
    subtype: 'Phosphorylated',
    moduleId: 'M01',
    references: { protein: 'UniProt:P19484' },
    compartment: { subcellular: 'Cytoplasm' },
    description: 'pSer211 + pSer142 creates 14-3-3 binding',
    mechanism: 'Cytoplasmic sequestration prevents nuclear translocation',
    modifications: [
      { type: 'phosphorylation', sites: ['Ser211', 'Ser142'], effect: '14-3-3 binding → cytoplasmic retention' },
    ],
  },
  {
    id: 'ampk_phosphorylated',
    label: 'AMPK Phosphorylated (Inhibited)',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Kinase',
    moduleId: 'M01',
    references: { protein: 'UniProt:P54646' },
    description: 'pSer345 by mTORC1 prevents lysosomal recruitment',
    mechanism: 'Cannot be recruited to lysosome for nutrient-sensing autophagy activation',
    modifications: [
      { type: 'phosphorylation', sites: ['Ser345'], effect: 'Prevents lysosomal recruitment' },
    ],
    roles: ['REGULATOR'],
  },
  {
    id: 'ulk1_phosphorylated',
    label: 'ULK1 Phosphorylated (Inhibited)',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Kinase',
    moduleId: 'M01',
    references: { protein: 'UniProt:O75385' },
    description: 'pSer757 blocks AMPK binding site',
    mechanism: 'Inhibits autophagy initiation',
    modifications: [
      { type: 'phosphorylation', sites: ['Ser757'], effect: 'Blocks AMPK binding → autophagy inhibited' },
    ],
    roles: ['REGULATOR'],
  },
  {
    id: 'lysosomal_genes_down',
    label: 'Lysosomal Genes Downregulated',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M01',
    references: {
      process: 'GO:0007040', // lysosome assembly
    },
    description: 'TFEB targets: ATP6V0A1, ATP6V1H, CTSD, CTSB, LAMP1, LAMP2, GBA',
    mechanism: 'TFEB nuclear exclusion → CLEAR network genes not transcribed',
  },
  {
    id: 'lysosomal_dysfunction',
    label: 'Lysosomal Dysfunction',
    category: 'STATE',
    subtype: 'CompartmentIntegrity',
    moduleId: 'M02',  // Moved from M01 - this node belongs in Lysosomal module
    references: {
      phenotype: 'HP:0003236',
      process: 'GO:0005764',
    },
    description: 'pH >5.5, ↓cathepsin activity, ↓degradation',
    mechanism: 'Central node linking mTOR axis to downstream pathology',
    roles: ['FEEDBACK_HUB', 'LEVERAGE_POINT'],
  },
  {
    id: 'mitophagy_rate_reduced',
    label: 'Mitophagy Rate Reduced',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'Mitophagy',
    moduleId: 'M01',
    references: { process: 'GO:0000422' },
    description: 'AMPK/ULK1 pathway impaired; PINK1/Parkin still functional',
    mechanism: 'Autophagosome formation reduced despite mitochondrial damage',
  },
  // S6K1-IRS1 feedback loop nodes
  {
    id: 's6k1_active',
    label: 'S6K1 Active',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Kinase',
    moduleId: 'M01',
    references: { protein: 'UniProt:P23443' },
    description: 'p70 S6 kinase; phosphorylated at Thr389 by mTORC1',
    mechanism: 'Canonical mTORC1 substrate; phosphorylates IRS-1',
    modifications: [
      { type: 'phosphorylation', sites: ['Thr389'], effect: 'Full activation' },
    ],
    roles: ['REGULATOR'],
  },
  {
    id: 'irs1_serine_phosphorylated',
    label: 'IRS-1 Serine Phosphorylated',
    category: 'STATE',
    subtype: 'Phosphorylated',
    moduleId: 'M01',
    references: { protein: 'UniProt:P35568' },
    description: 'pS307, pS312, pS527, pS616, pS636/639 = inhibitory',
    mechanism: 'Creates 14-3-3 binding sites, promotes degradation',
    modifications: [
      { type: 'phosphorylation', sites: ['Ser307', 'Ser312', 'Ser616', 'Ser636'], effect: 'Inhibits insulin signaling' },
    ],
  },
];

// ============================================================================
// MODULE 2: Lysosomal Pathology
// ============================================================================

export const module2Nodes: MechanisticNode[] = [
  {
    id: 'lysosome_pool',
    label: 'Lysosome Pool',
    category: 'STOCK',
    subtype: 'OrganellePool',
    moduleId: 'M02',
    references: {
      process: 'GO:0005764', // lysosome
    },
    description: 'Functional lysosome organelle pool; depleted by reduced biogenesis',
    mechanism: 'TFEB drives lysosomal biogenesis; reduced TFEB nuclear activity → fewer functional lysosomes',
    units: 'LAMP1+ puncta per cell',
    roles: ['RATE_LIMITER'],
  },
  {
    id: 'damaged_mito_pool',
    label: 'Damaged Mitochondria Pool',
    category: 'STOCK',
    subtype: 'OrganellePool',
    moduleId: 'M02',
    references: { process: 'GO:0005739' },
    description: 'Accumulating damaged mitochondria',
    mechanism: 'Source for Routes 1B (lysosomal) and 2 (pre-lysosomal)',
    units: 'TMRM low/total mito ratio',
  },
  {
    id: 'cargo_accumulation',
    label: 'Cargo Accumulation',
    category: 'STOCK',
    subtype: 'Aggregate',
    moduleId: 'M02',
    description: 'Aβ, tau, lipids, iron, undegraded organelles',
    mechanism: 'Builds up when degradation rate < delivery rate',
  },
  {
    id: 'lipofuscin',
    label: 'Lipofuscin',
    category: 'STOCK',
    subtype: 'Aggregate',
    moduleId: 'M02',
    references: { drug: 'CHEBI:34813' },
    description: 'Cross-linked proteins + oxidized lipids; undegradable',
    mechanism: 'Irreversible age pigment that damages lysosomal membrane',
    timescale: 'years',
  },
  {
    id: 'bmp_lysosomal',
    label: 'BMP (Bis(monoacylglycero)phosphate)',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M02',
    references: {
      drug: 'CHEBI:73497', // bis(monoacylglycero)phosphate
    },
    description: 'Lysosome-specific lipid; biomarker for lysosomal stress/storage disorders',
    mechanism: 'BMP is enriched in late endosomes/lysosomes; facilitates lipid degradation by activating acid sphingomyelinase. ↑BMP indicates lysosomal stress, ↓BMP impairs lipid catabolism. In AD: elevated BMP(22:6-22:6) suggests compensatory response to lysosomal dysfunction. Key evidence: Nguyen 2024 showed BMP(22:6-22:6) significantly elevated in AD brains; Raben 2013 (PMID:23670896) showed BMP correlates with lysosomal storage disease severity',
    units: 'nmol/mg protein',
    roles: ['BIOMARKER'],
  },
  {
    id: 'lmp',
    label: 'Lysosomal Membrane Permeabilization',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M02',
    references: { process: 'GO:0090559' },
    description: 'Lysosomal membrane breach',
    mechanism: 'Releases cathepsins and other DAMPs to cytosol',
  },
  {
    id: 'cathepsin_b_cytosolic',
    label: 'Cytosolic Cathepsin B',
    category: 'STOCK',
    subtype: 'ActiveProteinPool',
    moduleId: 'M02',
    references: {
      protein: 'UniProt:P07858',
      process: 'GO:0005829',
    },
    compartment: { subcellular: 'Cytosol' },
    description: 'Active cathepsin B escaped from lysosome',
    mechanism: 'Danger signal that activates NLRP3 inflammasome',
    units: 'U/mg protein',
  },
  {
    id: 'mitophagosome',
    label: 'Mitophagosome',
    category: 'STOCK',
    subtype: 'OrganellePool',
    moduleId: 'M02',
    references: { process: 'GO:0000421' },
    description: 'PINK1/Parkin-tagged mitochondrion in autophagosome',
    mechanism: 'Intermediate in mitophagy pathway',
  },
  {
    id: 'autolysosome',
    label: 'Autolysosome',
    category: 'STOCK',
    subtype: 'OrganellePool',
    moduleId: 'M02',
    references: { process: 'GO:0044754' },
    description: 'Mitophagosome fused with lysosome',
    mechanism: 'Where degradation should occur (but may fail)',
  },
  {
    id: 'mtdna_undegraded',
    label: 'Undegraded mtDNA (Lysosomal)',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M02',
    description: 'DNase II inactive at high pH; mtDNA persists',
    mechanism: 'Accumulates in autolysosome due to pH failure',
  },
  {
    id: 'mtdna_from_lysosome',
    label: 'mtDNA Escaped from Lysosome',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M02',
    description: 'mtDNA escaped through compromised membrane; DAMP',
    mechanism: 'Route 1B: lysosome → cytosol → cGAS-STING',
  },
];

// ============================================================================
// MODULE 3: Mitochondrial Dysfunction
// ============================================================================

export const module3Nodes: MechanisticNode[] = [
  {
    id: 'mito_ros',
    label: 'Mitochondrial ROS',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M03',
    references: { drug: 'CHEBI:26523' },
    compartment: { subcellular: 'Mitochondrial matrix' },
    description: 'Superoxide/H₂O₂ from dysfunctional ETC',
    mechanism: 'Generated at Complex I/III by electron leak',
    units: 'MitoSOX fluorescence',
  },
  {
    id: 'mtdna_oxidized',
    label: 'Oxidized mtDNA',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M03',
    references: { drug: 'CHEBI:78804' },
    compartment: { subcellular: 'Mitochondrial matrix' },
    description: '8-oxo-dG modified mtDNA within mitochondria',
    mechanism: 'ROS oxidizes guanine bases → 8-oxo-deoxyguanosine',
  },
  {
    id: 'ca_overload',
    label: 'Mitochondrial Ca²⁺ Overload',
    category: 'STATE',
    subtype: 'CompartmentIntegrity',
    moduleId: 'M03',
    references: { process: 'GO:0036437' },
    compartment: { subcellular: 'Mitochondrial matrix' },
    description: 'Matrix Ca²⁺ overload',
    mechanism: 'ROS damages Ca²⁺ handling → impaired efflux + sustained MCU uptake',
  },
  {
    id: 'mptp_open',
    label: 'mPTP Open',
    category: 'STATE',
    subtype: 'CompartmentIntegrity',
    moduleId: 'M03',
    references: { process: 'GO:0046929' },
    description: 'Mitochondrial permeability transition pore open state',
    mechanism: 'Ca²⁺ binds CypD → conformational change → pore opens',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'vdac_oligomer',
    label: 'VDAC Oligomers',
    category: 'STOCK',
    subtype: 'ComplexPool',
    moduleId: 'M03',
    references: { protein: 'UniProt:P21796' },
    compartment: { subcellular: 'Outer mitochondrial membrane' },
    description: 'VDAC oligomers forming pores in outer membrane',
    mechanism: 'Allow mtDNA fragment exit',
  },
  {
    id: 'ox_mtdna_cytosolic',
    label: 'Cytosolic Oxidized mtDNA',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M03',
    compartment: { subcellular: 'Cytosol' },
    description: '500-650 bp oxidized mtDNA fragments in cytosol (FEN1-cleaved)',
    mechanism: 'Route 2: exits via mPTP/VDAC → activates NLRP3',
  },
  {
    id: 'mtdna_cytosolic',
    label: 'Cytosolic mtDNA (Non-oxidized)',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M03',
    compartment: { subcellular: 'Cytosol' },
    description: 'Non-oxidized mtDNA in cytosol',
    mechanism: 'Route 2: exits via VDAC → activates cGAS-STING',
  },
  {
    id: 'pink1_parkin',
    label: 'PINK1/Parkin Mitophagy',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'MasterRegulator',
    moduleId: 'M03',
    references: {
      protein: 'UniProt:Q9BXM7', // PINK1
    },
    description: 'Mitophagy gatekeepers',
    mechanism: 'Clear damaged mitochondria BEFORE mtDNA can escape',
    roles: ['REGULATOR', 'THERAPEUTIC_TARGET'],
  },
];

// ============================================================================
// MODULE 4: Inflammasome & Cytokines
// ============================================================================

export const module4Nodes: MechanisticNode[] = [
  // Inflammasome components
  {
    id: 'nlrp3_active',
    label: 'NLRP3 Inflammasome Active',
    category: 'STOCK',
    subtype: 'ComplexPool',
    moduleId: 'M04',
    references: {
      protein: 'UniProt:Q96P20',
      process: 'GO:0072559',
    },
    compartment: { cellType: 'Microglia', subcellular: 'Cytosol' },
    description: 'Assembled inflammasome complex',
    mechanism: 'ox-mtDNA or cathepsin B → ASC speck → caspase-1 activation',
    units: 'ASC specks/cell; or cleaved caspase-1',
    timescale: 'hours',
    roles: ['THERAPEUTIC_TARGET', 'BIOMARKER', 'FEEDBACK_HUB'],
  },
  {
    id: 'caspase1_active',
    label: 'Active Caspase-1',
    category: 'STOCK',
    subtype: 'ActiveProteinPool',
    moduleId: 'M04',
    references: { protein: 'UniProt:P29466' },
    description: 'Cleaved active caspase-1',
    mechanism: 'Cleaves pro-IL-1β and pro-IL-18 to mature forms',
    units: 'U/mg protein',
    timescale: 'hours',
  },
  {
    id: 'il1b',
    label: 'IL-1β',
    category: 'STOCK',
    subtype: 'CytokineLevel',
    moduleId: 'M04',
    references: { protein: 'UniProt:P01584' },
    description: 'Mature IL-1β (17 kDa cleaved form)',
    mechanism: 'Major pro-inflammatory cytokine',
    units: 'pg/mL (CSF/serum)',
    timescale: 'hours',
    roles: ['BIOMARKER'],
  },
  {
    id: 'il18',
    label: 'IL-18',
    category: 'STOCK',
    subtype: 'CytokineLevel',
    moduleId: 'M04',
    references: { protein: 'UniProt:Q14116' },
    description: 'Mature IL-18 (also caspase-1 substrate)',
    units: 'pg/mL',
    roles: ['BIOMARKER'],
  },

  // cGAS-STING components
  {
    id: 'cgas_active',
    label: 'cGAS Active',
    category: 'STOCK',
    subtype: 'ActiveProteinPool',
    moduleId: 'M04',
    references: { protein: 'UniProt:Q8N884' },
    description: 'Activated cGAS bound to cytosolic DNA',
    mechanism: 'Catalyzes 2\'3\'-cGAMP synthesis',
    units: 'cGAMP production rate',
    timescale: 'minutes',
  },
  {
    id: 'sting_active',
    label: 'STING Active',
    category: 'STOCK',
    subtype: 'ActiveProteinPool',
    moduleId: 'M04',
    references: { protein: 'UniProt:Q86WV6' },
    compartment: { subcellular: 'Golgi' },
    description: 'Phosphorylated STING at Golgi',
    mechanism: 'cGAMP binding → STING translocation → TBK1/IRF3 activation',
    units: 'p-STING/total STING',
    timescale: 'hours',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'type_i_ifn',
    label: 'Type I Interferon',
    category: 'STOCK',
    subtype: 'CytokineLevel',
    moduleId: 'M04',
    description: 'IFN-α/β secreted',
    units: 'IU/mL; or ISG score',
    timescale: 'hours',
    roles: ['BIOMARKER'],
  },
  {
    id: 'isg_expression',
    label: 'ISG Expression',
    category: 'STOCK',
    subtype: 'RNAPool',
    moduleId: 'M04',
    description: 'Interferon-stimulated gene signature',
    units: 'fold change',
    timescale: 'days',
    roles: ['BIOMARKER'],
  },

  // Tau kinase/phosphatase effectors
  {
    id: 'gsk3b_active',
    label: 'GSK-3β Active',
    category: 'STOCK',
    subtype: 'ActiveProteinPool',
    moduleId: 'M04',
    references: { protein: 'UniProt:P49841' },
    description: 'Active GSK-3β (tau kinase)',
    mechanism: 'Activated by NLRP3; inhibited by H₂S sulfhydration',
    units: 'kinase activity; p-Tyr216/total',
    timescale: 'hours',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'pp2a_activity',
    label: 'PP2A Activity',
    category: 'STOCK',
    subtype: 'ActiveProteinPool',
    moduleId: 'M04',
    references: { protein: 'UniProt:P63151' },
    description: 'PP2A tau phosphatase (inhibited by NLRP3)',
    mechanism: 'Major tau phosphatase; activity reduced by NLRP3 signaling',
    units: 'phosphatase activity',
  },

  // State nodes (SHARED across modules)
  {
    id: 'neuroinflammation',
    label: 'Neuroinflammation',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M04', // Primary: Inflammasome & Cytokines
    sharedWith: ['M05', 'M12'], // Also Microglial Phenotypes, BBB
    references: { disease: 'MESH:D000071618' },
    description: 'Chronic CNS inflammatory state',
    mechanism: 'Driven by IL-1β, Type I IFN, BBB breakdown; activates microglia',
    roles: ['FEEDBACK_HUB'],
  },
  {
    id: 'tau_hyperphosphorylated',
    label: 'Tau Hyperphosphorylated',
    category: 'STATE',
    subtype: 'Phosphorylated',
    moduleId: 'M04', // Primary: Inflammasome (GSK3β/PP2A output)
    sharedWith: ['M07'], // Output to Tau Pathology
    description: 'Cross-module output to Module 7',
    mechanism: 'GSK3β↑ + PP2A↓ → pSer199, pSer202/Thr205 (AT8), pThr231, pSer396/Ser404 (PHF-1)',
    modifications: [
      { type: 'phosphorylation', sites: ['Ser199', 'Ser202', 'Thr205', 'Thr231', 'Ser396', 'Ser404'] },
    ],
  },

  // SHARED nodes (used by multiple modules)
  {
    id: 'abeta_oligomers',
    label: 'Aβ Oligomers',
    category: 'STOCK',
    subtype: 'Aggregate',
    moduleId: 'M06', // Primary: Amyloid Processing
    sharedWith: ['M04', 'M08', 'M12', 'M17'], // Also used by Inflammasome, Complement, Glymphatic, Immunomodulation
    description: 'Soluble Aβ oligomers - most synaptotoxic species',
    mechanism: 'Activates NLRP3, inhibits LTP, induces C1q deposition, cleared by glymphatic system',
    roles: ['BIOMARKER', 'THERAPEUTIC_TARGET'],
  },
  {
    id: 'tau_aggregated',
    label: 'Aggregated Tau',
    category: 'STOCK',
    subtype: 'Aggregate',
    moduleId: 'M07', // Primary: Tau Pathology
    sharedWith: ['M04', 'M13'], // Also used by Inflammasome, Cholinergic
    description: 'Aggregated tau (PHF/NFT) - prion-like spreading',
    mechanism: 'Activates NLRP3 inflammasome, impairs axonal transport, causes cholinergic degeneration',
    roles: ['BIOMARKER'],
  },
];

// ============================================================================
// MODULE 5: Microglial Phenotypes
// ============================================================================

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
// ============================================================================

export const module6Nodes: MechanisticNode[] = [
  {
    id: 'bace1_upregulated',
    label: 'BACE1 Upregulated',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Protease',
    moduleId: 'M06',
    references: { protein: 'UniProt:P56817', process: 'GO:0004190' },
    description: 'β-secretase; rate-limiting for Aβ production',
    mechanism: 'NF-κB-driven transcription; cleaves APP at β-site',
    roles: ['REGULATOR', 'THERAPEUTIC_TARGET', 'RATE_LIMITER'],
  },
  {
    id: 'app_betactf',
    label: 'APP β-CTF (C99)',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M06',
    references: { protein: 'UniProt:P05067' },
    description: 'β-secretase cleavage product; membrane-bound C-terminal fragment',
    mechanism: 'BACE1 cleaves APP → sAPPβ released + C99 remains membrane-bound → γ-secretase substrate',
  },
  {
    id: 'abeta_monomers',
    label: 'Aβ Monomers',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M06',
    references: { drug: 'CHEBI:64645' },
    description: 'Soluble monomeric Aβ peptides (Aβ40, Aβ42, Aβ43)',
    mechanism: 'γ-secretase cleavage of C99 releases Aβ monomers; Aβ42 > Aβ40 in aggregation propensity',
    units: 'pg/mL',
  },
  {
    id: 'app_processing_amyloidogenic',
    label: 'Amyloidogenic APP Processing',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M06',
    references: { process: 'GO:0042987' },
    description: 'BACE1 → C99 → γ-secretase → Aβ',
    mechanism: 'Sequential cleavage producing Aβ40/42',
  },
  {
    id: 'abeta_production',
    label: 'Aβ Production Rate',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M06',
    references: { drug: 'CHEBI:64645' },
    description: 'Aβ generation rate; Aβ42 > Aβ40 in aggregation',
    units: 'pg/mL/h',
  },
  {
    id: 'abeta_plaques',
    label: 'Aβ Plaques',
    category: 'STOCK',
    subtype: 'Aggregate',
    moduleId: 'M06',
    references: { phenotype: 'HP:0100256' },
    description: 'Insoluble fibrillar deposits',
    mechanism: 'Endpoint of aggregation cascade; may sequester toxic oligomers',
    roles: ['BIOMARKER'],
  },
  {
    id: 'abeta_clearance',
    label: 'Aβ Clearance',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'Phagocytosis',
    moduleId: 'M06',
    references: { process: 'GO:0006909' },
    description: 'Aβ clearance rate (microglial, glymphatic, BBB-mediated)',
    mechanism: 'Impaired in LDAM; late-onset AD likely involves clearance failure',
  },
  {
    id: 'plaque_compaction',
    label: 'Plaque Compaction',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M06',
    description: 'TREM2/microglia-dependent protective compaction',
    mechanism: 'Microglia barrier around plaques prevents toxic oligomer release',
  },
  {
    id: 'synaptic_abeta_binding',
    label: 'Synaptic Aβ Binding',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M06',
    description: 'Oligomer binding to PrPc, mGluR5, NMDAR',
    mechanism: 'Disrupts synaptic function; blocks LTP',
  },
  {
    id: 'ltp_inhibition',
    label: 'LTP Inhibition',
    category: 'STATE',
    subtype: 'CompartmentIntegrity',
    moduleId: 'M06',
    description: 'Long-term potentiation blocked by Aβ oligomers',
    mechanism: 'Oligomers specifically inhibit LTP; fibrils do not',
  },
];

// ============================================================================
// MODULE 7: Tau Pathology
// ============================================================================

export const module7Nodes: MechanisticNode[] = [
  {
    id: 'tau_misfolded',
    label: 'Tau Misfolded',
    category: 'STATE',
    subtype: 'Phosphorylated',
    moduleId: 'M07',
    references: { protein: 'UniProt:P10636' },
    description: 'Conformationally altered tau exposing aggregation-prone regions',
    mechanism: 'Hyperphosphorylation promotes detachment from microtubules → conformational change',
  },
  {
    id: 'neuronal_dysfunction',
    label: 'Neuronal Dysfunction',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M07',
    references: { cellType: 'CL:0000540' },
    description: 'Impaired neuronal function due to tau/Aβ pathology',
    mechanism: 'Axonal transport disruption, synaptic dysfunction, proteostasis failure',
  },
  {
    id: 'p38_mapk_active',
    label: 'p38 MAPK Active',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Kinase',
    moduleId: 'M07',
    references: { protein: 'UniProt:Q16539', process: 'GO:0004707' },
    description: 'IL-1β-activated tau kinase',
    mechanism: 'Phosphorylates tau at Ser199, Ser202, Thr205',
    roles: ['REGULATOR'],
  },
  {
    id: 'pp2a_inhibited',
    label: 'PP2A Inhibited',
    category: 'STATE',
    subtype: 'Phosphorylated',
    moduleId: 'M07',
    references: { protein: 'UniProt:P67775', process: 'GO:0006470' },
    description: 'Major tau phosphatase; >70% of tau dephosphorylation',
    mechanism: 'Activity ↓20-40% in AD brain; inhibited by I1PP2A↑, I2PP2A↑',
  },
  {
    id: 'tau_aggregated_phf',
    label: 'Tau PHF Aggregates',
    category: 'STOCK',
    subtype: 'Aggregate',
    moduleId: 'M07',
    references: { process: 'GO:0097418' },
    description: 'Paired helical filaments',
    mechanism: 'β-sheet-rich aggregates of hyperphosphorylated tau',
  },
  {
    id: 'nft_formation',
    label: 'Neurofibrillary Tangles',
    category: 'STOCK',
    subtype: 'Aggregate',
    moduleId: 'M07',
    references: { phenotype: 'HP:0002185' },
    description: 'Mature neurofibrillary tangles',
    mechanism: 'PHF accumulation → NFT; correlates with cognitive decline',
    roles: ['BIOMARKER'],
  },
  {
    id: 'tau_exosomal_release',
    label: 'Tau Exosomal Release',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M07',
    references: { process: 'GO:0070481' },
    description: 'Exosome-mediated tau secretion',
    mechanism: 'Neurons and microglia release tau in exosomes',
  },
  {
    id: 'tau_seeding',
    label: 'Tau Seeding',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M07',
    description: 'Prion-like templated misfolding',
    mechanism: 'Tau seeds template misfolding of native tau → Braak staging',
  },
  // Module 7B: Transsulfuration Pathway
  {
    id: 'homocysteine',
    label: 'Homocysteine',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M07',
    references: { drug: 'CHEBI:17230' },
    description: 'From methionine metabolism; elevated in AD risk',
    units: 'μmol/L',
    roles: ['BIOMARKER'],
  },
  {
    id: 'cbs_enzyme',
    label: 'CBS (Cystathionine β-synthase)',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Transferase',
    moduleId: 'M07',
    references: { protein: 'UniProt:P35520', process: 'GO:0004122' },
    compartment: { cellType: 'Astrocyte' },
    description: 'Astrocyte-predominant; produces cystathionine',
    mechanism: 'Also produces H₂S from homocysteine',
    roles: ['REGULATOR'],
  },
  {
    id: 'cystathionine',
    label: 'Cystathionine',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M07',
    references: { drug: 'CHEBI:17482' },
    description: 'Intermediate; CBS product, CSE substrate',
  },
  {
    id: 'cse_enzyme',
    label: 'CSE (Cystathionine γ-lyase)',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Transferase',
    moduleId: 'M07',
    references: { protein: 'UniProt:P32929', process: 'GO:0004123' },
    compartment: { cellType: 'Neuron' },
    description: 'Neuron-predominant; KEY NEUROPROTECTIVE ENZYME',
    mechanism: 'Produces cysteine + H₂S; depleted in AD',
    roles: ['REGULATOR', 'THERAPEUTIC_TARGET', 'LEVERAGE_POINT'],
  },
  {
    id: 'cysteine',
    label: 'Cysteine',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M07',
    references: { drug: 'CHEBI:15356' },
    description: 'Rate-limiting for GSH; CSE product',
    mechanism: 'Essential for glutathione synthesis',
  },
  {
    id: 'h2s_production',
    label: 'H₂S Production',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M07',
    references: { drug: 'CHEBI:16136' },
    description: 'Gasotransmitter; produced by CSE (and CBS)',
    mechanism: 'Sulfhydrates proteins including GSK3β',
  },
  {
    id: 'glutathione_gsh',
    label: 'Glutathione (GSH)',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M07',
    references: { drug: 'CHEBI:16856' },
    description: 'Major antioxidant; cysteine-dependent',
    mechanism: 'Neutralizes ROS, maintains redox homeostasis',
    roles: ['BIOMARKER'],
  },
  {
    id: 'sulfhydration',
    label: 'Protein Sulfhydration',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M07',
    references: { process: 'GO:0018318' },
    description: 'S-sulfhydration/persulfidation; PTM by H₂S',
    mechanism: 'Modifies cysteine thiols (-SH) to persulfides (-SSH)',
  },
  {
    id: 'gsk3beta_sulfhydrated',
    label: 'GSK3β Sulfhydrated (Inactive)',
    category: 'STATE',
    subtype: 'Phosphorylated',
    moduleId: 'M07',
    references: { protein: 'UniProt:P49841' },
    description: 'GSK3β with Cys sulfhydrated → INACTIVE',
    mechanism: 'H₂S-mediated inhibition of tau kinase',
  },
];

// ============================================================================
// MODULE 8: Complement & Synaptic Pruning
// ============================================================================

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
// ============================================================================

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
// ============================================================================

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
// ============================================================================

export const module11Nodes: MechanisticNode[] = [
  {
    id: 'trem2_surface',
    label: 'TREM2 Surface Expression',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M11',
    references: { protein: 'UniProt:Q9NZC2' },
    description: 'TREM2 on microglial surface',
    mechanism: 'R47H/R62H variants reduce surface expression/function',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'strem2',
    label: 'Soluble TREM2',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M11',
    description: 'Shed TREM2 ectodomain in CSF',
    mechanism: 'sTREM2↑ = slower progression (protective biomarker?)',
    units: 'pg/mL',
    roles: ['BIOMARKER'],
  },
  {
    id: 'dam_transition_blocked',
    label: 'DAM Transition Blocked',
    category: 'STATE',
    subtype: 'DAM',
    moduleId: 'M11',
    description: 'TREM2-/- or variant: Stage 1 → Stage 2 blocked',
    mechanism: 'Microglia cannot fully activate protective response',
  },
  {
    id: 'plaque_barrier_function',
    label: 'Microglial Plaque Barrier',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M11',
    description: 'TREM2-dependent plaque compaction',
    mechanism: 'Microglia form barrier → reduced neuritic dystrophy',
  },
  {
    id: 'senescent_trem2_microglia',
    label: 'Senescent TREM2+ Microglia',
    category: 'STATE',
    subtype: 'Senescent',
    moduleId: 'M11',
    description: 'TREM2 promotes senescent microglia (harmful)',
    mechanism: 'Paradox: TREM2 required for both DAM and senescence',
  },
];

// ============================================================================
// MODULE 12: BBB & Glymphatic
// ============================================================================

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
];

// ============================================================================
// MODULE 13: Cholinergic & White Matter
// ============================================================================

export const module13Nodes: MechanisticNode[] = [
  {
    id: 'cholinergic_degeneration',
    label: 'Cholinergic Degeneration',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'Neurodegeneration',
    moduleId: 'M13',
    description: 'Basal forebrain cholinergic neuron loss',
    mechanism: 'Basis for AChEI symptomatic treatment',
  },
  {
    id: 'ach_reduced',
    label: 'Acetylcholine Reduced',
    category: 'STOCK',
    subtype: 'MetaboliteSignal',
    moduleId: 'M13',
    description: 'Cholinergic deficit in AD',
    mechanism: 'ChAT↓, ACh↓ in cortex and hippocampus',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'white_matter_pathology',
    label: 'White Matter Pathology',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M13',
    description: 'Myelin/oligodendrocyte dysfunction',
    mechanism: 'A1 astrocytes kill oligodendrocytes',
  },
  {
    id: 'myelin_breakdown',
    label: 'Myelin Breakdown',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'Neurodegeneration',
    moduleId: 'M13',
    description: 'Demyelination in AD',
    mechanism: 'Oligodendrocyte death → myelin loss → axonal dysfunction',
  },

  // Oligodendrocyte Lineage (added 2026-01-15)
  {
    id: 'opcs',
    label: 'Oligodendrocyte Precursor Cells',
    category: 'STOCK',
    subtype: 'CellPopulation',
    moduleId: 'M13',
    references: {
      cellType: 'CL:0002453', // oligodendrocyte precursor cell
    },
    description: 'NG2+ progenitors; maintain remyelination capacity; support BBB',
    mechanism: 'OPCs differentiate to mature OLs; also release TGF-β1 for BBB support; Ca²⁺ signals precede pericyte dilation in NVC. Key evidence: Seo 2014 (PMID:25186741) showed OPCs support BBB integrity via TGF-β1; Rungta 2018 (PMID:29937277) showed OPC Ca²⁺ signals precede pericyte dilation',
    units: 'cells/mm³',
  },
  {
    id: 'mature_oligodendrocytes',
    label: 'Mature Oligodendrocytes',
    category: 'STOCK',
    subtype: 'CellPopulation',
    moduleId: 'M13',
    references: {
      cellType: 'CL:0000128', // oligodendrocyte
    },
    description: 'MBP+/MOG+ myelinating cells; vulnerable to APOE4, A1 astrocytes',
    mechanism: 'Produce and maintain myelin sheaths; require cholesterol for myelin synthesis; killed by A1 astrocyte-derived saturated lipids. Blanchard 2022 Nature (PMID:36385529) showed APOE4 impairs cholesterol transport to oligodendrocytes leading to myelin deficits',
    units: 'cells/mm³',
  },
  {
    id: 'opc_nos1_activity',
    label: 'OPC NOS1 Activity',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M13',
    references: {
      gene: 'HGNC:7872', // NOS1
      protein: 'UniProt:P29475',
    },
    description: 'Nitric oxide synthase 1 expression in OPCs - HUMAN-SPECIFIC',
    mechanism: 'Human OPCs express NOS1 (cell type enhanced, τ=0.85 per Human Protein Atlas); mouse OPCs do NOT express Nos1 (Tabula Muris/Allen Brain Atlas). CRITICAL TRANSLATIONAL GAP: Human-specific NOS1 expression in OPCs means mouse BBB models lack this signaling axis. Current BBB models (Transwell, organoids) typically lack oligodendrocyte lineage cells entirely',
  },
  {
    id: 'ol_cholesterol_synthesis',
    label: 'OL Cholesterol Synthesis',
    category: 'STATE',
    subtype: 'MetabolicState',
    moduleId: 'M13',
    references: {
      process: 'GO:0006695', // cholesterol biosynthetic process
    },
    description: 'Oligodendrocyte cholesterol production for myelin',
    mechanism: 'OLs synthesize cholesterol de novo OR receive from astrocytes via APOE. APOE4 impairs both pathways: ↓SREBP2 in OLs + poor lipidation of secreted APOE4. Blanchard 2022 (PMID:36385529): APOE4 oligodendrocytes have reduced cholesterol synthesis and increased reliance on external cholesterol that cannot be adequately supplied',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'opc_tgf_beta1',
    label: 'OPC-Derived TGF-β1',
    category: 'STOCK',
    subtype: 'CytokineSignal',
    moduleId: 'M13',
    references: {
      gene: 'HGNC:11766', // TGFB1
      protein: 'UniProt:P01137',
    },
    description: 'TGF-β1 secreted by OPCs to support BBB integrity',
    mechanism: 'OPCs release TGF-β1 → activates TGF-βR on pericytes/endothelium → maintains tight junctions. OPC loss → BBB breakdown. Seo 2014 (PMID:25186741): OPC-derived TGF-β1 is essential for maintaining blood-brain barrier integrity',
    sharedWith: ['M12'], // BBB/Glymphatic module
  },
  {
    id: 'opc_vascular_coupling',
    label: 'OPC-Vascular Coupling',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M13',
    references: {
      process: 'GO:0001974', // blood vessel remodeling
    },
    description: 'OPC Ca²⁺ signaling drives neurovascular coupling',
    mechanism: 'OPCs wrap capillaries; Ca²⁺ transients in OPCs PRECEDE pericyte relaxation during functional hyperemia. Human OPCs may use NOS1/NO pathway (absent in mice). Rungta 2018 (PMID:29937277) showed calcium increases in NG2 cells precede arteriole dilation. TRANSLATIONAL GAP: Human mechanism may differ due to NOS1 expression',
    sharedWith: ['M12'], // BBB/Glymphatic module
  },
  {
    id: 'remyelination_capacity',
    label: 'Remyelination Capacity',
    category: 'STATE',
    subtype: 'Homeostatic',
    moduleId: 'M13',
    description: 'Ability to regenerate myelin after damage',
    mechanism: 'Requires OPC pool + differentiation signals + cholesterol supply. Declines with age: OPC senescence, LINGO1↑, Nogo receptor activation. Neumann 2019 (PMID:31497960): Remyelination efficiency declines with age due to impaired OPC differentiation',
    roles: ['THERAPEUTIC_TARGET'],
  },
];

// ============================================================================
// MODULE 14: MAM & Calcium
// ============================================================================

export const module14Nodes: MechanisticNode[] = [
  {
    id: 'mam_hyperconnectivity',
    label: 'MAM Hyperconnectivity',
    category: 'STATE',
    subtype: 'CompartmentIntegrity',
    moduleId: 'M14',
    description: 'Increased ER-mitochondria contact sites',
    mechanism: 'FAD mutations → PS2-Mfn2 binding, APP C99 at MAM',
  },
  {
    id: 'er_mito_ca_flux',
    label: 'ER-Mito Ca²⁺ Flux Increased',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'BiologicalProcess',
    moduleId: 'M14',
    description: 'Enhanced Ca²⁺ transfer ER → mitochondria',
    mechanism: 'IP3R-VDAC-MCU axis at MAM',
  },
  {
    id: 'gamma_secretase_mam',
    label: 'γ-Secretase at MAM',
    category: 'STOCK', // SBSF v2.0: Was REGULATOR, now STOCK with REGULATOR role
    subtype: 'Protease',
    moduleId: 'M14',
    description: 'γ-secretase activity enriched at MAM',
    mechanism: 'MAM cholesterol → enhanced γ-secretase → more Aβ',
    roles: ['REGULATOR'],
  },
  {
    id: 'er_ca_stores',
    label: 'ER Ca²⁺ Stores',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M14',
    description: 'PS1 mutations → ER Ca²⁺ leak dysfunction',
    mechanism: 'Increased ER Ca²⁺ → enhanced release to mitochondria',
  },
  {
    id: 'mito_ca_overload_mam',
    label: 'Mitochondrial Ca²⁺ Overload (MAM)',
    category: 'STATE',
    subtype: 'CompartmentIntegrity',
    moduleId: 'M14',
    description: 'MAM-mediated Ca²⁺ overload',
    mechanism: 'Hyperconnected MAM → excessive Ca²⁺ transfer → mPTP',
  },
];

// ============================================================================
// MODULE 15: Interventions & Clinical Boundaries
// ============================================================================

export const module15Nodes: MechanisticNode[] = [
  {
    id: 'exercise',
    label: 'Exercise',
    category: 'BOUNDARY',
    subtype: 'Lifestyle',
    moduleId: 'M15',
    boundaryDirection: 'input',
    description: 'Physical activity intervention',
    mechanism: 'Increases BDNF, autophagy, glymphatic clearance; reduces inflammation',
    defaultVariant: 'exercise_moderate',
    variants: [
      {
        id: 'exercise_sedentary',
        label: 'Sedentary',
        effectDirection: 'risk',
        effectMagnitude: 1.4,
        effectDescription: '<150 min/week; no structured exercise',
        color: '#c75146',
        evidence: [{ pmid: '28054939', oddsRatio: 1.4, population: 'Meta-analysis' }],
      },
      {
        id: 'exercise_light',
        label: 'Light Activity',
        effectDirection: 'neutral',
        effectMagnitude: 1.0,
        effectDescription: '150-300 min/week walking; reference group',
        color: '#787473',
        evidence: [{ pmid: '28054939', oddsRatio: 1.0, population: 'Meta-analysis' }],
      },
      {
        id: 'exercise_moderate',
        label: 'Moderate Exercise',
        effectDirection: 'protective',
        effectMagnitude: 0.7,
        effectDescription: '150+ min/week moderate-vigorous; BDNF↑, inflammation↓',
        color: '#34d399',
        evidence: [{ pmid: '28054939', oddsRatio: 0.7, confidenceInterval: [0.6, 0.8], population: 'Meta-analysis' }],
      },
      {
        id: 'exercise_vigorous',
        label: 'Vigorous Exercise',
        effectDirection: 'protective',
        effectMagnitude: 0.5,
        effectDescription: '300+ min/week vigorous; maximal BDNF, autophagy activation',
        color: '#34d399',
        evidence: [{ pmid: '28054939', oddsRatio: 0.5, confidenceInterval: [0.4, 0.7], population: 'Meta-analysis' }],
      },
    ],
  },
  {
    id: 'bbb_penetration',
    label: 'BBB Penetration',
    category: 'STATE',
    subtype: 'CompartmentIntegrity',
    moduleId: 'M15',
    description: 'Drug crosses blood-brain barrier',
    mechanism: 'Failure point 1: insufficient CNS exposure',
  },
  {
    id: 'target_engagement',
    label: 'Target Engagement',
    category: 'STATE',
    subtype: 'Bound',
    moduleId: 'M15',
    description: 'Drug binds target with sufficient occupancy',
    mechanism: 'PET/CSF marker confirms engagement',
  },
  {
    id: 'biomarker_change',
    label: 'Biomarker Change',
    category: 'STOCK',
    subtype: 'MetaboliteSignal',
    moduleId: 'M15',
    description: 'Target engagement → biomarker movement',
    mechanism: 'CSF Aβ, tau, NfL changes',
    roles: ['BIOMARKER'],
  },
  {
    id: 'clinical_benefit',
    label: 'Clinical Benefit',
    category: 'BOUNDARY',
    subtype: 'CognitiveScore',
    moduleId: 'M15',
    boundaryDirection: 'output',
    description: 'Cognitive/functional improvement',
    mechanism: 'Ultimate outcome; requires right timing + mechanism',
  },
];

// ============================================================================
// MODULE 16: Sex & Ancestry Modifiers
// ============================================================================

export const module16Nodes: MechanisticNode[] = [
  {
    id: 'estrogen_level',
    label: 'Estrogen Level',
    category: 'STOCK',
    subtype: 'HormoneLevel',
    moduleId: 'M16',
    description: 'Estradiol; declines at menopause',
    mechanism: 'Promotes ferroportin expression, anti-inflammatory',
  },
  {
    id: 'testosterone_level',
    label: 'Testosterone Level',
    category: 'STOCK',
    subtype: 'HormoneLevel',
    moduleId: 'M16',
    description: 'Testosterone; higher in males',
    mechanism: 'Increases autophagy flux',
  },
  {
    id: 'fsh_elevated',
    label: 'FSH Elevated (Menopause)',
    category: 'STOCK',
    subtype: 'HormoneLevel',
    moduleId: 'M16',
    description: 'Rising FSH at menopause',
    mechanism: 'Acts on hippocampal neurons → C/EBPβ-δ-secretase → Aβ/tau',
  },
  {
    id: 'x_linked_lysosomal_genes',
    label: 'X-Linked Lysosomal Genes',
    category: 'BOUNDARY',
    subtype: 'Gene',
    moduleId: 'M16',
    boundaryDirection: 'input',
    description: 'ATP6AP2, SLC9A7, ATP6AP1, LAMP2 on X chromosome',
    mechanism: 'XX vs XY affects lysosomal gene dosage',
  },
  {
    id: 'visceral_adipose_tissue',
    label: 'Visceral Adipose Tissue',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M16',
    description: 'VAT produces IL-6, TNF-α, leptin',
    mechanism: 'Ancestry-dependent distribution; pro-inflammatory',
  },
  {
    id: 'apoe4_ancestry_effect',
    label: 'APOE4 Ancestry Effect',
    category: 'STATE',
    subtype: 'GeneticVariant',
    moduleId: 'M16',
    description: 'APOE4 effect varies by ancestry',
    mechanism: 'Attenuated in African; amplified in Amerindian',
  },
  {
    id: 'female_iron_storage_failure',
    label: 'Female Iron Storage Failure',
    category: 'STATE',
    subtype: 'MetabolicState',
    moduleId: 'M16',
    description: 'Women with AD show opposite iron-ferritin correlation',
    mechanism: 'Microglial ferritin storage fails in female AD',
  },
];

// ============================================================================
// MODULE 17: Immunomodulatory Interventions
// ============================================================================

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
// EXPORT ALL NODES
// ============================================================================

export const allNodes: MechanisticNode[] = [
  ...boundaryNodes,
  ...module1Nodes,
  ...module2Nodes,
  ...module3Nodes,
  ...module4Nodes,
  ...module5Nodes,
  ...module6Nodes,
  ...module7Nodes,
  ...module8Nodes,
  ...module9Nodes,
  ...module10Nodes,
  ...module11Nodes,
  ...module12Nodes,
  ...module13Nodes,
  ...module14Nodes,
  ...module15Nodes,
  ...module16Nodes,
  ...module17Nodes,
];

export default allNodes;
