import type {
  AnimalModel,
  TranslationalInsight,
  PathologyFeature,
  PathologyPresence,
} from '@/types';

// ============================================================================
// PATHOLOGY FEATURE LABELS
// ============================================================================

export const pathologyFeatureLabels: Record<
  PathologyFeature,
  { label: string; shortLabel: string; description: string }
> = {
  amyloid_plaques: {
    label: 'Amyloid Plaques',
    shortLabel: 'Aβ Plaques',
    description: 'Extracellular deposits of amyloid-beta protein aggregates',
  },
  tau_tangles: {
    label: 'Tau Tangles',
    shortLabel: 'Tau NFTs',
    description:
      'Intracellular neurofibrillary tangles of hyperphosphorylated tau protein',
  },
  neuronal_loss: {
    label: 'Neuronal Loss',
    shortLabel: 'Neuron Loss',
    description:
      'Significant loss of neurons, especially in hippocampus and cortex',
  },
  synaptic_dysfunction: {
    label: 'Synaptic Dysfunction',
    shortLabel: 'Synapse Def.',
    description: 'Loss of synapses and impaired synaptic plasticity (LTP/LTD)',
  },
  neuroinflammation: {
    label: 'Neuroinflammation',
    shortLabel: 'Inflammation',
    description: 'Microglial and astrocyte activation, cytokine release',
  },
  cognitive_decline: {
    label: 'Cognitive Decline',
    shortLabel: 'Cognition',
    description: 'Memory impairment and learning deficits',
  },
  natural_aging: {
    label: 'Natural Aging',
    shortLabel: 'Aging',
    description: 'Pathology develops through normal aging, not transgene',
  },
  bbb_dysfunction: {
    label: 'BBB Dysfunction',
    shortLabel: 'BBB',
    description: 'Blood-brain barrier breakdown and vascular pathology',
  },
  cholinergic_deficit: {
    label: 'Cholinergic Deficit',
    shortLabel: 'ACh Deficit',
    description: 'Loss of cholinergic neurons and reduced acetylcholine',
  },
};

// ============================================================================
// ORGANISM TYPE LABELS
// ============================================================================

export const organismTypeLabels: Record<
  string,
  { label: string; icon: string }
> = {
  transgenic_mouse: { label: 'Transgenic Mouse', icon: '🐁' },
  knockin_mouse: { label: 'Knock-in Mouse', icon: '🐁' },
  rat: { label: 'Rat', icon: '🐀' },
  dog: { label: 'Dog', icon: '🐕' },
  degu: { label: 'Degu', icon: '🐿️' },
  non_human_primate: { label: 'Non-Human Primate', icon: '🐒' },
  simple_organism: { label: 'Simple Organism', icon: '🪱' },
};

// ============================================================================
// ANIMAL MODELS DATA
// ============================================================================

export const animalModels: AnimalModel[] = [
  // -------------------------------------------------------------------------
  // TRANSGENIC MICE
  // -------------------------------------------------------------------------
  {
    id: '5xfad',
    name: '5xFAD',
    commonName: '5xFAD mice',
    organismType: 'transgenic_mouse',
    species: 'Mus musculus',
    yearDeveloped: 2006,
    geneticBasis:
      'Five FAD mutations: Swedish (K670N/M671L), Florida (I716V), London (V717I) in APP; M146L and L286V in PSEN1',
    primaryUseCase: 'Rapid amyloid pathology development (plaques by 2 months)',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: true,
        notes: 'Develops by 2 months, robust by 4 months',
        humanRelevance: 'high',
      },
      {
        feature: 'tau_tangles',
        present: false,
        notes: 'No endogenous tau pathology; requires tau transgene cross',
        humanRelevance: 'low',
      },
      {
        feature: 'neuronal_loss',
        present: true,
        notes: 'Significant by 9 months in layer 5 cortex',
        humanRelevance: 'moderate',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        notes: 'LTP deficits and spine loss',
        humanRelevance: 'high',
      },
      {
        feature: 'neuroinflammation',
        present: true,
        notes: 'Microglial activation around plaques',
        humanRelevance: 'moderate',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes: 'Memory deficits by 4-5 months',
        humanRelevance: 'moderate',
      },
      {
        feature: 'natural_aging',
        present: false,
        notes: 'Transgene-driven pathology',
        humanRelevance: 'low',
      },
    ],
    strengths: [
      'Rapid plaque formation enables faster drug screening',
      'Well-characterized with extensive literature',
      'Shows neuronal loss (unlike many other models)',
      'Available commercially from Jackson Labs',
    ],
    limitations: [
      'Overexpresses APP at supraphysiological levels (3-5x normal)',
      'No tau pathology without crossing to tau line',
      'Disease driven by transgene, not aging',
      'Five mutations never found together in any human',
      'Aβ42/40 ratio artificially elevated',
    ],
    failedTranslations: [
      {
        drugName: 'Semagacestat',
        modelResult: 'Reduced Aβ production and plaque burden',
        humanResult: 'Worsened cognition, increased skin cancer risk (Notch inhibition)',
        trialName: 'IDENTITY',
        year: 2010,
      },
      {
        drugName: 'Bapineuzumab',
        modelResult: 'Cleared plaques and improved behavior',
        humanResult: 'No cognitive benefit in Phase 3',
        year: 2012,
      },
      {
        drugName: 'Gantenerumab',
        modelResult: 'Reduced plaques in transgenic mice',
        humanResult: 'Only 28% reached amyloid-negative (vs 68-80% for approved drugs); no clinical benefit',
        trialName: 'GRADUATE I/II',
        year: 2023,
      },
      {
        drugName: 'Latrepirdine (Dimebon)',
        modelResult: 'Claimed mitochondrial, NMDA, 5-HT6 effects in vitro',
        humanResult: 'Zero efficacy in Phase 3 - no target ever validated in humans',
        trialName: 'CONNECTION',
        year: 2010,
      },
    ],
  },
  {
    id: 'app_ps1',
    name: 'APP/PS1',
    commonName: 'APP/PS1 mice',
    organismType: 'transgenic_mouse',
    species: 'Mus musculus',
    yearDeveloped: 1997,
    geneticBasis:
      'Swedish APP mutation (K670N/M671L) + PSEN1 deletion exon 9 (ΔE9)',
    primaryUseCase:
      'Most widely used model for amyloid studies and drug screening',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: true,
        notes: 'Develops by 6 months',
        humanRelevance: 'high',
      },
      {
        feature: 'tau_tangles',
        present: false,
        notes: 'No tau pathology',
        humanRelevance: 'low',
      },
      {
        feature: 'neuronal_loss',
        present: 'partial',
        notes: 'Minimal to none in most studies',
        humanRelevance: 'low',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        notes: 'LTP deficits observed',
        humanRelevance: 'moderate',
      },
      {
        feature: 'neuroinflammation',
        present: true,
        notes: 'Reactive gliosis around plaques',
        humanRelevance: 'moderate',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes: 'Memory deficits by 6-7 months',
        humanRelevance: 'moderate',
      },
      {
        feature: 'natural_aging',
        present: false,
        notes: 'Transgene-driven',
        humanRelevance: 'low',
      },
    ],
    strengths: [
      'Extremely well-characterized (1000+ publications)',
      'Widely available and reproducible',
      'Good for plaque-focused studies',
    ],
    limitations: [
      'No significant neuronal loss',
      'No tau pathology',
      'APP overexpression artifacts',
      'Plaques but no neurodegeneration disconnect',
    ],
    failedTranslations: [
      {
        drugName: 'Solanezumab',
        modelResult: 'Reduced soluble Aβ and improved memory',
        humanResult: 'Failed three Phase 3 trials (EXPEDITION 1, 2, 3)',
        year: 2016,
      },
    ],
  },
  {
    id: 'tg2576',
    name: 'Tg2576',
    commonName: 'Tg2576 mice',
    organismType: 'transgenic_mouse',
    species: 'Mus musculus',
    yearDeveloped: 1996,
    geneticBasis: 'Swedish APP mutation (K670N/M671L) under hamster prion promoter',
    primaryUseCase: 'One of the first and most-cited AD mouse models',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: true,
        notes: 'Develops by 9-12 months (slower than 5xFAD)',
        humanRelevance: 'moderate',
      },
      {
        feature: 'tau_tangles',
        present: false,
        notes: 'No tau pathology',
        humanRelevance: 'low',
      },
      {
        feature: 'neuronal_loss',
        present: false,
        notes: 'No significant neuronal loss',
        humanRelevance: 'low',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        notes: 'Synaptic deficits precede plaques',
        humanRelevance: 'moderate',
      },
      {
        feature: 'neuroinflammation',
        present: true,
        humanRelevance: 'moderate',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes: 'Behavioral deficits by 6 months',
        humanRelevance: 'moderate',
      },
      {
        feature: 'natural_aging',
        present: false,
        humanRelevance: 'low',
      },
    ],
    strengths: [
      'Extensive publication history (foundational model)',
      'Slower pathology timeline more amenable to prevention studies',
      'Shows that Aβ oligomers precede plaques',
    ],
    limitations: [
      'No neuronal loss despite abundant plaques',
      'No tau pathology',
      'Single mutation less severe than human FAD',
    ],
    failedTranslations: [
      {
        drugName: 'Tramiprosate (Alzhemed)',
        modelResult: 'Reduced Aβ aggregation and plaques',
        humanResult: 'Failed Phase 3 trial',
        year: 2007,
      },
      {
        drugName: 'PF-04447943 (PDE9 inhibitor)',
        modelResult: 'Prevented dendritic spine loss in Tg2576; enhanced LTP',
        humanResult: 'Target engagement confirmed (CSF cGMP ↑) but no cognitive benefit in Phase 2',
        year: 2014,
      },
    ],
    keyInsight: {
      title: 'Prevention ≠ Treatment',
      description:
        'PDE9 inhibitors prevented spine loss in young Tg2576 mice but failed in patients with established AD. The preclinical rationale was prevention - but trials enrolled patients with existing neurodegeneration.',
      implication:
        'Drugs that prevent pathology in models may not reverse existing damage in patients. Stage-matching between preclinical and clinical is critical.',
    },
  },
  {
    id: '3xtg',
    name: '3xTg-AD',
    commonName: '3xTg-AD mice',
    organismType: 'transgenic_mouse',
    species: 'Mus musculus',
    yearDeveloped: 2003,
    geneticBasis:
      'Swedish APP, M146V PSEN1, and P301L tau mutations (triple transgenic)',
    primaryUseCase:
      'Only widely-used model with both amyloid AND tau pathology',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: true,
        notes: 'Develops by 6 months',
        humanRelevance: 'high',
      },
      {
        feature: 'tau_tangles',
        present: true,
        notes: 'Develops by 12 months (after plaques)',
        humanRelevance: 'moderate',
      },
      {
        feature: 'neuronal_loss',
        present: 'partial',
        notes: 'Modest loss reported',
        humanRelevance: 'moderate',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        notes: 'LTP deficits and synaptic loss',
        humanRelevance: 'high',
      },
      {
        feature: 'neuroinflammation',
        present: true,
        humanRelevance: 'moderate',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes: 'Progressive memory deficits',
        humanRelevance: 'moderate',
      },
      {
        feature: 'natural_aging',
        present: false,
        humanRelevance: 'low',
      },
    ],
    strengths: [
      'Only common model with both Aβ AND tau pathology',
      'Tau pathology follows amyloid (as in human AD)',
      'Enables testing drugs targeting either pathway',
    ],
    limitations: [
      'Three mutations never found together in humans',
      'Tau mutation is FTLD mutation, not AD-specific',
      'Genetic drift in colonies has caused variability',
      'Some colonies have lost transgene expression',
    ],
    failedTranslations: [
      {
        drugName: 'LY2886721 (BACE inhibitor)',
        modelResult: 'Reduced Aβ and tau phosphorylation',
        humanResult: 'Terminated for liver toxicity',
        year: 2013,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // KNOCK-IN MICE (Physiological Expression)
  // -------------------------------------------------------------------------
  {
    id: 'appnlgf',
    name: 'App^NL-G-F',
    commonName: 'App knock-in mice',
    organismType: 'knockin_mouse',
    species: 'Mus musculus',
    yearDeveloped: 2014,
    geneticBasis:
      'Swedish (NL), Arctic (G), Beyreuther/Iberian (F) mutations knocked into endogenous App locus',
    primaryUseCase:
      'Physiological APP expression without overexpression artifacts',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: true,
        notes: 'Develops by 4-6 months',
        humanRelevance: 'high',
      },
      {
        feature: 'tau_tangles',
        present: false,
        notes: 'No tau pathology',
        humanRelevance: 'low',
      },
      {
        feature: 'neuronal_loss',
        present: false,
        notes: 'Not observed',
        humanRelevance: 'low',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        notes: 'Synaptic deficits and spine loss',
        humanRelevance: 'moderate',
      },
      {
        feature: 'neuroinflammation',
        present: true,
        notes: 'Microglial activation',
        humanRelevance: 'moderate',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes: 'Memory impairment by 6 months',
        humanRelevance: 'moderate',
      },
      {
        feature: 'natural_aging',
        present: false,
        notes: 'Mutation-driven but at physiological levels',
        humanRelevance: 'moderate',
      },
    ],
    strengths: [
      'No APP overexpression (physiological levels)',
      'Avoids transgene insertion artifacts',
      'Better recapitulates human APP processing',
      'Gaining adoption as next-generation model',
    ],
    limitations: [
      'No neuronal loss',
      'No tau pathology',
      'Arctic mutation causes unique Aβ aggregation',
      'Still uses mutations not in sporadic AD',
    ],
    failedTranslations: [],
    keyInsight: {
      title: 'The Overexpression Problem',
      description:
        'App knock-in mice were developed specifically because transgenic overexpression causes artifacts. Yet even without overexpression, they still lack neurodegeneration.',
      implication:
        'This suggests amyloid accumulation alone—even at realistic levels—may be insufficient to cause neuronal death.',
    },
  },
  // -------------------------------------------------------------------------
  // RATS
  // -------------------------------------------------------------------------
  {
    id: 'tgf344',
    name: 'TgF344-AD',
    commonName: 'TgF344-AD rats',
    organismType: 'rat',
    species: 'Rattus norvegicus',
    yearDeveloped: 2013,
    geneticBasis: 'Swedish APP and PS1 ΔE9 mutations',
    primaryUseCase:
      'Larger brain enables better imaging and CSF sampling; develops tau pathology',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: true,
        notes: 'Develops by 6 months',
        humanRelevance: 'high',
      },
      {
        feature: 'tau_tangles',
        present: true,
        notes:
          'Endogenous tau becomes hyperphosphorylated (unlike most mouse models)',
        humanRelevance: 'high',
      },
      {
        feature: 'neuronal_loss',
        present: true,
        notes: 'Significant hippocampal neuronal loss',
        humanRelevance: 'high',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        humanRelevance: 'high',
      },
      {
        feature: 'neuroinflammation',
        present: true,
        humanRelevance: 'high',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes: 'Progressive decline in spatial memory',
        humanRelevance: 'high',
      },
      {
        feature: 'natural_aging',
        present: false,
        humanRelevance: 'low',
      },
    ],
    strengths: [
      'Develops BOTH Aβ and tau pathology with same APP/PS1 transgenes',
      'Shows significant neuronal loss',
      'Larger brain allows better imaging and CSF collection',
      'More complex behavioral repertoire than mice',
    ],
    limitations: [
      'Less genetic tools available compared to mice',
      'More expensive to maintain',
      'Fewer publications (less characterized)',
    ],
    failedTranslations: [],
    keyInsight: {
      title: 'Why Do Rats Get Tau Pathology?',
      description:
        'The same APP/PS1 mutations that produce only amyloid in mice cause both amyloid AND tau pathology in rats—with the same transgenes.',
      implication:
        'Species-specific factors (rat tau sequence, immune system, or other biology) may be critical. This raises questions about using mice to model human AD.',
    },
  },
  // -------------------------------------------------------------------------
  // DOGS (Natural Model)
  // -------------------------------------------------------------------------
  {
    id: 'canine',
    name: 'Aged Canine',
    commonName: 'Aged dogs (CCD)',
    organismType: 'dog',
    species: 'Canis familiaris',
    yearDeveloped: undefined,
    geneticBasis:
      'Wild-type; human-identical Aβ sequence. Develops pathology naturally with age.',
    primaryUseCase:
      'Natural aging model; canine cognitive dysfunction (CCD) mirrors early AD',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: true,
        notes: 'Diffuse plaques by age 8-10; denser with age',
        humanRelevance: 'high',
      },
      {
        feature: 'tau_tangles',
        present: false,
        notes: 'No NFTs despite Aβ accumulation',
        humanRelevance: 'low',
      },
      {
        feature: 'neuronal_loss',
        present: 'partial',
        notes: 'Some cortical and hippocampal loss',
        humanRelevance: 'moderate',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        humanRelevance: 'high',
      },
      {
        feature: 'neuroinflammation',
        present: true,
        humanRelevance: 'moderate',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes:
          'Canine cognitive dysfunction: disorientation, sleep changes, house soiling',
        humanRelevance: 'high',
      },
      {
        feature: 'natural_aging',
        present: true,
        notes: 'Develops entirely through aging',
        humanRelevance: 'high',
      },
    ],
    strengths: [
      'Human-identical Aβ sequence (3 amino acids differ from mouse)',
      'Pathology develops naturally through aging',
      'Large brain enables good imaging',
      'Lives with humans; environmental factors shared',
      'FDA accepts canine CCD data for drug development',
    ],
    limitations: [
      'No tau tangles despite decades of Aβ',
      'Long lifespan makes studies slow (8-15 years)',
      'Ethical concerns about using companion animals',
      'Genetic heterogeneity',
    ],
    failedTranslations: [
      {
        drugName: 'Propentofylline (Karsivan)',
        modelResult: 'APPROVED for canine CCD - improved cognition, blood flow, behavior',
        humanResult: '12-month success, but FAILED at 18 months in Phase 3; development discontinued',
        year: 2000,
      },
    ],
    keyInsight: {
      title: 'The Propentofylline Paradox',
      description:
        'Propentofylline is APPROVED for canine cognitive dysfunction but FAILED in human AD trials. Dogs lack tau tangles (A+T−N±), while human AD has full pathology (A+T+N+). The drug addressed vascular and inflammatory components present in both species, but couldn\'t halt tau-driven progression unique to humans.',
      implication:
        'CCD models "early AD" frozen in time - drugs that work in dogs may fail in humans once tau pathology becomes autonomous. Stage-matching between model and indication is critical.',
    },
  },
  // -------------------------------------------------------------------------
  // DEGUS (Natural Model - The Paradox)
  // -------------------------------------------------------------------------
  {
    id: 'degu',
    name: 'Octodon degus',
    commonName: 'Degu',
    organismType: 'degu',
    species: 'Octodon degus',
    yearDeveloped: undefined,
    geneticBasis:
      'Wild-type; only rodent with human-identical Aβ sequence. Develops pathology naturally.',
    primaryUseCase:
      'Natural aging model with spontaneous AD-like pathology (debated)',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: true,
        notes: 'Reported in aged animals; debated across colonies',
        humanRelevance: 'debated',
      },
      {
        feature: 'tau_tangles',
        present: 'partial',
        notes: 'Hyperphosphorylated tau reported in some studies',
        humanRelevance: 'debated',
      },
      {
        feature: 'neuronal_loss',
        present: 'partial',
        notes: 'Some evidence of hippocampal loss',
        humanRelevance: 'debated',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        notes: 'Synaptic deficits in aged animals',
        humanRelevance: 'moderate',
      },
      {
        feature: 'neuroinflammation',
        present: true,
        humanRelevance: 'moderate',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes: 'Age-related memory deficits',
        humanRelevance: 'moderate',
      },
      {
        feature: 'natural_aging',
        present: true,
        notes: 'No genetic modification needed',
        humanRelevance: 'high',
      },
    ],
    strengths: [
      'Only rodent with human-identical Aβ sequence',
      'Natural model without genetic manipulation',
      'Develops pathology through aging like humans',
      'Diurnal (day-active) like humans',
      'Social animals with complex behavior',
    ],
    limitations: [
      'Pathology findings highly debated in literature',
      'Small research colonies; limited availability',
      'Long lifespan (5-8 years) makes studies slow',
      'Variable pathology between colonies and individuals',
      'Some groups cannot reproduce original findings',
    ],
    failedTranslations: [],
    keyInsight: {
      title: 'The Degu Paradox',
      description:
        'Degus are the only rodent with human-identical Aβ sequence and reportedly develop both plaques and tau pathology naturally. Yet replication has been controversial, with some labs finding robust pathology and others finding none.',
      implication:
        'The degu debate mirrors broader questions: Do plaques truly cause dementia, or might environmental/dietary factors explain the variability? The inconsistent findings suggest AD pathology may require more than just the right Aβ sequence.',
    },
  },
  // -------------------------------------------------------------------------
  // NON-HUMAN PRIMATES
  // -------------------------------------------------------------------------
  {
    id: 'rhesus',
    name: 'Aged Rhesus Macaque',
    commonName: 'Aged rhesus monkeys',
    organismType: 'non_human_primate',
    species: 'Macaca mulatta',
    yearDeveloped: undefined,
    geneticBasis:
      'Wild-type; human-identical Aβ sequence. Natural aging over 20-30 years.',
    primaryUseCase:
      'Most human-like brain; natural aging with some AD pathology',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: true,
        notes: 'Develops in very old animals (>25 years)',
        humanRelevance: 'high',
      },
      {
        feature: 'tau_tangles',
        present: 'partial',
        notes: 'Rarely seen; much less than humans',
        humanRelevance: 'low',
      },
      {
        feature: 'neuronal_loss',
        present: 'partial',
        notes: 'Age-related loss in prefrontal cortex',
        humanRelevance: 'moderate',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        notes: 'Age-related synaptic loss',
        humanRelevance: 'high',
      },
      {
        feature: 'neuroinflammation',
        present: true,
        humanRelevance: 'high',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes: 'Age-related cognitive decline similar to human aging',
        humanRelevance: 'high',
      },
      {
        feature: 'natural_aging',
        present: true,
        humanRelevance: 'high',
      },
    ],
    strengths: [
      'Most similar brain structure and function to humans',
      'Human-identical Aβ sequence',
      'Natural aging model',
      'Complex cognition and behavior',
      'Extensive baseline data from aging studies',
    ],
    limitations: [
      'Very long lifespan (studies take decades)',
      'Extremely expensive ($10K+/year per animal)',
      'Ethical concerns; limited availability',
      'Rarely develop full AD pathology even at advanced age',
      'Tau tangles very rare',
    ],
    failedTranslations: [],
    keyInsight: {
      title: 'Why Don\'t Old Monkeys Get AD?',
      description:
        'Despite living 25-30 years with human-identical Aβ sequence, aged rhesus macaques develop only modest amyloid pathology and virtually never develop tau tangles or frank dementia.',
      implication:
        'If Aβ accumulation over decades doesn\'t cause AD in our closest relatives, what makes humans uniquely vulnerable? Is it lifespan, diet, or something else?',
    },
  },
  {
    id: 'marmoset',
    name: 'Common Marmoset',
    commonName: 'Marmosets',
    organismType: 'non_human_primate',
    species: 'Callithrix jacchus',
    yearDeveloped: 2019,
    geneticBasis:
      'Transgenic models being developed; some natural Aβ in aged animals',
    primaryUseCase:
      'Smaller primate model; faster reproduction; transgenic-amenable',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: 'partial',
        notes: 'Some Aβ in aged animals; transgenic models in development',
        humanRelevance: 'moderate',
      },
      {
        feature: 'tau_tangles',
        present: false,
        notes: 'Not observed in aged animals',
        humanRelevance: 'low',
      },
      {
        feature: 'neuronal_loss',
        present: 'partial',
        notes: 'Some age-related loss',
        humanRelevance: 'moderate',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        humanRelevance: 'moderate',
      },
      {
        feature: 'neuroinflammation',
        present: true,
        humanRelevance: 'moderate',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes: 'Age-related decline observed',
        humanRelevance: 'moderate',
      },
      {
        feature: 'natural_aging',
        present: true,
        notes: 'Lifespan ~15 years',
        humanRelevance: 'moderate',
      },
    ],
    strengths: [
      'Smaller and less expensive than macaques',
      'Shorter lifespan (studies in 10-15 years)',
      'Transgenic technology now available',
      'Good for imaging (small brain fits scanners)',
    ],
    limitations: [
      'Less characterized than macaques',
      'Still expensive and ethically complex',
      'Transgenic models still being validated',
      'Natural pathology limited',
    ],
    failedTranslations: [],
  },
  // -------------------------------------------------------------------------
  // SIMPLE ORGANISMS
  // -------------------------------------------------------------------------
  {
    id: 'celegans',
    name: 'C. elegans',
    commonName: 'Worms',
    organismType: 'simple_organism',
    species: 'Caenorhabditis elegans',
    yearDeveloped: 1995,
    geneticBasis:
      'Transgenic expression of human Aβ or tau in muscle or neurons',
    primaryUseCase:
      'High-throughput genetic screens; basic Aβ toxicity mechanisms',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: false,
        notes: 'No plaques; Aβ toxicity studied without aggregation',
        humanRelevance: 'low',
      },
      {
        feature: 'tau_tangles',
        present: false,
        notes: 'Tau toxicity modeled but no NFTs',
        humanRelevance: 'low',
      },
      {
        feature: 'neuronal_loss',
        present: 'partial',
        notes: 'Neuronal dysfunction from Aβ expression',
        humanRelevance: 'low',
      },
      {
        feature: 'synaptic_dysfunction',
        present: 'partial',
        notes: 'Can be modeled',
        humanRelevance: 'low',
      },
      {
        feature: 'neuroinflammation',
        present: false,
        notes: 'No immune system comparable to vertebrates',
        humanRelevance: 'low',
      },
      {
        feature: 'cognitive_decline',
        present: 'partial',
        notes: 'Behavioral changes (paralysis, motility)',
        humanRelevance: 'low',
      },
      {
        feature: 'natural_aging',
        present: false,
        humanRelevance: 'low',
      },
    ],
    strengths: [
      'Very short lifespan (2-3 weeks) enables rapid screens',
      'Transparent body allows live imaging',
      'Complete neural connectome mapped (302 neurons)',
      'Powerful genetic tools',
      'Very cheap and easy to maintain',
    ],
    limitations: [
      'No CNS, no blood-brain barrier',
      'No plaques or tangles form',
      'Immune system completely different',
      '302 neurons vs 86 billion in humans',
    ],
    failedTranslations: [
      {
        drugName: 'Resveratrol',
        modelResult: 'Extended lifespan and reduced Aβ toxicity',
        humanResult: 'No cognitive benefit in Phase 2 trial',
        year: 2015,
      },
    ],
  },
  {
    id: 'drosophila',
    name: 'Drosophila melanogaster',
    commonName: 'Fruit flies',
    organismType: 'simple_organism',
    species: 'Drosophila melanogaster',
    yearDeveloped: 2000,
    geneticBasis: 'Transgenic expression of human APP, Aβ, or tau',
    primaryUseCase: 'Genetic modifier screens; basic toxicity mechanisms',
    pathologyFeatures: [
      {
        feature: 'amyloid_plaques',
        present: false,
        notes: 'No plaques form',
        humanRelevance: 'low',
      },
      {
        feature: 'tau_tangles',
        present: 'partial',
        notes: 'Some tau aggregation with human tau expression',
        humanRelevance: 'low',
      },
      {
        feature: 'neuronal_loss',
        present: true,
        notes: 'Neurodegeneration from Aβ/tau expression',
        humanRelevance: 'low',
      },
      {
        feature: 'synaptic_dysfunction',
        present: true,
        notes: 'Defects at neuromuscular junction',
        humanRelevance: 'low',
      },
      {
        feature: 'neuroinflammation',
        present: 'partial',
        notes: 'Glial responses differ from mammals',
        humanRelevance: 'low',
      },
      {
        feature: 'cognitive_decline',
        present: true,
        notes: 'Learning and memory deficits',
        humanRelevance: 'low',
      },
      {
        feature: 'natural_aging',
        present: false,
        humanRelevance: 'low',
      },
    ],
    strengths: [
      'Rapid generation time (10 days)',
      'Powerful genetic tools (GAL4/UAS, CRISPR)',
      'Cheap and easy to maintain',
      '~75% of human disease genes have fly orthologs',
      'Identified genetic modifiers of Aβ/tau toxicity',
    ],
    limitations: [
      'No CNS comparable to vertebrates',
      'No plaques form',
      'Immune system very different',
      'Only ~100,000 neurons',
    ],
    failedTranslations: [],
  },
];

// ============================================================================
// TRANSLATIONAL INSIGHTS (for callout boxes)
// ============================================================================

export const translationalInsights: TranslationalInsight[] = [
  {
    id: 'forced-vs-natural',
    title: 'Forced vs Natural Pathology',
    description:
      'Most mouse models force Aβ production through transgene overexpression at 3-5x normal levels, creating plaques in months rather than decades.',
    implication:
      'Drugs that clear artificially rapid, overexpression-driven plaques may fail against slowly accumulated human pathology formed over 20+ years.',
  },
  {
    id: 'tau-gap',
    title: 'The Tau Gap',
    description:
      'Standard APP transgenic mice develop amyloid plaques but NOT tau tangles. Yet in humans, tau pathology correlates better with cognitive decline than amyloid.',
    implication:
      'Decades of drug development focused on amyloid in models that completely lack the tau pathology most closely linked to symptoms.',
  },
  {
    id: 'species-immune',
    title: 'Species-Specific Immunity',
    description:
      'Mouse and human immune systems differ substantially. Mice lack certain human microglial genes (CD33 variants, TREM2 isoforms) that modify AD risk.',
    implication:
      'Anti-inflammatory approaches validated in mice may work entirely differently in humans—or not at all.',
  },
  {
    id: 'no-neurodegeneration',
    title: 'Plaques Without Death',
    description:
      'Most mouse models develop abundant amyloid plaques but minimal neuronal loss. This is the opposite of human AD, where neurons die extensively.',
    implication:
      'We may have been clearing plaques from brains where neurons weren\'t dying, then wondering why humans with actual neurodegeneration didn\'t respond.',
  },
  {
    id: 'degu-paradox',
    title: 'The Degu Paradox',
    description:
      'Degus are the only rodent with human-identical Aβ, and reportedly develop natural plaques and tau. Yet findings vary dramatically between labs.',
    implication:
      'The debate over degu pathology mirrors broader questions: If the same genetics produce different outcomes in different environments, what does that tell us about sporadic AD?',
  },
  {
    id: 'dogs-no-tau',
    title: 'Dogs: Aβ Without Tau',
    description:
      'Aged dogs naturally accumulate human-sequence Aβ over 10-15 years and develop cognitive decline, yet NEVER form tau tangles.',
    implication:
      'If Aβ accumulation over a natural lifespan doesn\'t trigger tau pathology in dogs, the simple "Aβ causes tau" cascade may be wrong.',
  },
  {
    id: 'target-engagement-threshold',
    title: 'Target Engagement ≠ Clinical Benefit',
    description:
      'Gantenerumab reduced amyloid by 66 Centiloids but only 28% reached amyloid-negative status. Lecanemab/donanemab achieved 68-80%. The threshold matters more than the direction.',
    implication:
      'Demonstrating target engagement is necessary but not sufficient. Drugs must achieve a therapeutic threshold, not just move the biomarker.',
  },
  {
    id: 'polypharmacology-trap',
    title: 'The Polypharmacology Trap',
    description:
      'Latrepirdine claimed mitochondrial, NMDA, 5-HT6, and H1 mechanisms - but none were validated in humans. $725M later, Phase 3 showed zero efficacy.',
    implication:
      'Multiple weak mechanisms don\'t add up to one strong effect. Polypharmacology without validated primary target = high failure risk.',
  },
  {
    id: 'prevention-vs-treatment',
    title: 'Prevention vs Treatment Mismatch',
    description:
      'PDE9 inhibitors prevented dendritic spine loss in young mice but failed in patients with established AD. The preclinical model tested prevention; the trial enrolled treatment-stage patients.',
    implication:
      'The pathological stage of preclinical models must match the clinical indication. Prevention studies in mice don\'t predict reversal in symptomatic patients.',
  },
  {
    id: 'structural-liabilities',
    title: 'Structural Class Liabilities',
    description:
      'Tacrine derivatives (velnacrine) caused 29% hepatotoxicity due to quinonemethide metabolites - a structural feature, not the AChE mechanism. Same target, different scaffold (donepezil) has no liver toxicity.',
    implication:
      'Drug safety depends on chemical structure, not just mechanism. Known scaffold liabilities should disqualify candidates regardless of target validity.',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getModelsByOrganism(
  organismType: string
): AnimalModel[] {
  if (organismType === 'all') return animalModels;
  return animalModels.filter((m) => m.organismType === organismType);
}

export function getPathologyStatus(
  model: AnimalModel,
  feature: PathologyFeature
): PathologyPresence | undefined {
  return model.pathologyFeatures.find((p) => p.feature === feature);
}
