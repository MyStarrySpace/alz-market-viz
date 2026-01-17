// Pipeline Drug Sources
// Includes: SRI-011381 (C381) - Lysosomal/TGF-β dual mechanism compound

import { Source } from './types';

export const pipelineDrugsSources: Source[] = [
  // ============================================
  // SRI-011381 (C381) - DISCOVERY & CHARACTERIZATION
  // ============================================
  {
    id: 'vest-2022-pnas',
    type: 'journal',
    authors: ['Ryan T. Vest', 'Ching-Chieh Chou', 'Hui Zhang', 'et al.'],
    title: 'Small molecule C381 targets the lysosome to reduce inflammation and ameliorate disease in models of neurodegeneration',
    publication: 'PNAS',
    year: 2022,
    volume: '119',
    pages: 'e2121609119',
    doi: '10.1073/pnas.2121609119',
    url: 'https://doi.org/10.1073/pnas.2121609119',
    citations: [
      {
        id: 'c381-discovery',
        quote: 'We report the discovery and characterization of a small molecule, C381, that targets the lysosome to reduce inflammation and ameliorate disease in models of neurodegeneration. C381 promotes lysosomal acidification by activating the vacuolar ATPase (v-ATPase).',
        usedIn: ['hopefulDevelopments', 'promisingFrontier'],
        context: 'Discovery paper for SRI-011381, demonstrating lysosomal mechanism.',
      },
      {
        id: 'c381-vaTPase-screen',
        quote: 'CRISPRi screen identified all 14 v-ATPase subunits as hits (10% FDR), confirming v-ATPase as the molecular target.',
        usedIn: ['hopefulDevelopments'],
        context: 'Genetic validation of v-ATPase as the target.',
      },
      {
        id: 'c381-ind-tox',
        quote: 'IND-enabling toxicology studies were completed with no major concerns identified.',
        usedIn: ['hopefulDevelopments', 'promisingFrontier'],
        context: 'Critical milestone: compound is IND-ready since 2022.',
      },
      {
        id: 'c381-pk',
        quote: 'C381 is orally bioavailable (48%) and brain-penetrant with a brain:plasma ratio >0.5 after oral dosing.',
        usedIn: ['hopefulDevelopments'],
        context: 'Favorable pharmacokinetic properties for CNS drug.',
      },
      {
        id: 'c381-pd-mptp',
        quote: 'In the MPTP Parkinson\'s disease model, C381 protected dopaminergic neurons in the substantia nigra pars compacta, reduced phosphorylated alpha-synuclein, and improved motor and cognitive function.',
        usedIn: ['hopefulDevelopments'],
        context: 'Efficacy in PD model demonstrating neuroprotection.',
      },
    ],
  },

  // ============================================
  // SRI-011381 - ALZHEIMER'S DISEASE VALIDATION
  // ============================================
  {
    id: 'liu-2025-immunity',
    type: 'journal',
    authors: ['Jing Liu', 'Zhimeng Wang', 'Wenwen Liang', 'et al.'],
    title: 'Microglial TMEM119 binds to amyloid-β to promote its clearance in an Aβ-depositing mouse model of Alzheimer\'s disease',
    publication: 'Immunity',
    year: 2025,
    volume: '58',
    pages: '1830-1846.e7',
    doi: '10.1016/j.immuni.2025.04.018',
    url: 'https://doi.org/10.1016/j.immuni.2025.04.018',
    citations: [
      {
        id: 'c381-tmem119-mechanism',
        quote: 'SRI-011381 activates TGF-β1 signaling, which upregulates TMEM119 expression. Aβ binding to TMEM119 recruits LRP1, forming a ternary complex that normally degrades TMEM119. Loss of TMEM119 impairs microglial homeostasis and reduces Aβ phagocytosis.',
        usedIn: ['hopefulDevelopments', 'promisingFrontier'],
        context: 'Second mechanism of action: TGF-β1/TMEM119 pathway enhances microglial phagocytosis.',
      },
      {
        id: 'c381-5xfad-efficacy',
        quote: 'In 5xFAD mice treated starting at 2 months of age for 6 months (preventive), SRI-011381 increased TMEM119+ microglia, increased CD68+ phagocytic microglia, reduced plaque burden in cortex and hippocampus, and improved performance in Morris water maze and Y-maze tests.',
        usedIn: ['hopefulDevelopments'],
        context: 'Comprehensive efficacy in 5xFAD amyloid model.',
      },
      {
        id: 'c381-mid-stage',
        quote: 'Critically, in 5xFAD mice where treatment was started at 5 months of age (mid-stage pathology) for 3 months, treated mice had fewer plaques than controls and memory similar to wild-type mice.',
        usedIn: ['hopefulDevelopments', 'promisingFrontier'],
        context: 'Key finding: works even when pathology is already established.',
      },
      {
        id: 'c381-3xtg',
        quote: 'Efficacy was confirmed in 3xTG mice (amyloid + tau model), demonstrating benefit in a model with both AD hallmarks.',
        usedIn: ['hopefulDevelopments'],
        context: 'Validation in tau pathology model.',
      },
    ],
  },

  {
    id: 'chou-2025-nature-cell-bio',
    type: 'journal',
    authors: ['Chun-Chieh Chou', 'et al.'],
    title: 'Proteostasis and lysosomal repair deficits in transdifferentiated neurons of Alzheimer\'s disease',
    publication: 'Nature Cell Biology',
    year: 2025,
    doi: '10.1038/s41556-025-01623-y',
    url: 'https://doi.org/10.1038/s41556-025-01623-y',
    citations: [
      {
        id: 'c381-human-neurons',
        quote: 'In transdifferentiated neurons (tNeurons) from AD patient fibroblasts, SRI-011381 reduced intracellular Aβ42 by 20-46%, reduced inflammatory cytokines, and improved neuronal survival.',
        usedIn: ['hopefulDevelopments', 'promisingFrontier'],
        context: 'Critical validation in human AD neurons, not just mouse models.',
      },
    ],
  },

  // ============================================
  // SRI-011381 - MS AND TBI APPLICATIONS
  // ============================================
  {
    id: 'wu-2021-theranostics',
    type: 'journal',
    authors: ['Qing Wu', 'Xiaojia Miao', 'Jing Zhang', 'et al.'],
    title: 'Astrocytic YAP protects the optic nerve and retina in an experimental autoimmune encephalomyelitis model through TGF-β signaling',
    publication: 'Theranostics',
    year: 2021,
    volume: '11',
    pages: '8480-8499',
    doi: '10.7150/thno.60031',
    url: 'https://doi.org/10.7150/thno.60031',
    citations: [
      {
        id: 'c381-eae-ms',
        quote: 'In the experimental autoimmune encephalomyelitis (EAE) model of multiple sclerosis, C381 significantly rescued damage and inflammation in optic nerve and retina, reduced demyelination, gliosis, and inflammatory infiltration. Efficacy was observed even in control (non-knockout) EAE mice.',
        usedIn: ['hopefulDevelopments'],
        context: 'Efficacy in MS model demonstrates anti-inflammatory and demyelination protection.',
      },
    ],
  },

  {
    id: 'li-2024-neurotrauma',
    type: 'journal',
    authors: ['Lian Li', 'Andrew Nguyen', 'Brian Zhao', 'et al.'],
    title: 'Small Molecule Drug C381 Attenuates Brain Vascular Damage Following Repetitive Mild Traumatic Injury',
    publication: 'Neurotrauma Reports',
    year: 2024,
    volume: '5',
    pages: '1016-1026',
    doi: '10.1089/neur.2024.0060',
    url: 'https://doi.org/10.1089/neur.2024.0060',
    citations: [
      {
        id: 'c381-mtbi',
        quote: 'In a repetitive mild TBI mouse model, C381 treatment reversed mTBI-induced gene expression changes and attenuated vascular damage. Authors conclude the data "strongly support the potential clinical usefulness of C381 as a novel therapeutic intervention for mTBI."',
        usedIn: ['hopefulDevelopments'],
        context: 'TBI is a risk factor for both PD and AD; C381 protects against TBI-induced vascular damage.',
      },
    ],
  },

  // ============================================
  // SRI-011381 - REVIEWS
  // ============================================
  {
    id: 'luo-2023-neural-regen-res',
    type: 'journal',
    authors: ['Jian Luo'],
    title: 'Augmentation of transforming growth factor-β signaling for the treatment of neurological disorders',
    publication: 'Neural Regeneration Research',
    year: 2023,
    volume: '18',
    pages: '1711-1712',
    doi: '10.4103/1673-5374.363833',
    url: 'https://doi.org/10.4103/1673-5374.363833',
    citations: [
      {
        id: 'c381-review-validation',
        quote: 'To date, 11 studies (besides the original) have tested C381 (previously called SRI-011381) as a tool to activate TGF-β signaling.',
        usedIn: ['hopefulDevelopments'],
        context: 'Independent review summarizing the extensive validation of C381.',
      },
    ],
  },

  // ============================================
  // SRI-011381 - MECHANISM CONTEXT
  // ============================================
  {
    id: 'lee-2010-cell-lysosome',
    type: 'journal',
    authors: ['Ju-Hyun Lee', 'W. Haung Yu', 'Asok Kumar', 'et al.'],
    title: 'Lysosomal proteolysis and autophagy require presenilin 1 and are disrupted by Alzheimer-related PS1 mutations',
    publication: 'Cell',
    year: 2010,
    volume: '141',
    pages: '1146-1158',
    doi: '10.1016/j.cell.2010.05.008',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20541250/',
    citations: [
      {
        id: 'ps1-vaTPase',
        quote: 'Presenilin 1 is required for v-ATPase targeting to lysosomes and for lysosomal acidification. FAD-linked PS1 mutations impair this function, leading to defective lysosomal proteolysis.',
        usedIn: ['hopefulDevelopments', 'mechanisticCascade'],
        context: 'Establishes that v-ATPase dysfunction is directly linked to familial AD mutations.',
      },
    ],
  },

  {
    id: 'braak-2003-pd-staging',
    type: 'journal',
    authors: ['Heiko Braak', 'Kelly Del Tredici', 'Udo Rüb', 'et al.'],
    title: 'Staging of brain pathology related to sporadic Parkinson\'s disease',
    publication: 'Neurobiology of Aging',
    year: 2003,
    volume: '24',
    pages: '197-211',
    doi: '10.1016/S0197-4580(02)00065-9',
    url: 'https://pubmed.ncbi.nlm.nih.gov/12498954/',
    citations: [
      {
        id: 'braak-pd-spread',
        quote: 'The staging hypothesis proposes α-synuclein spreads from gut → vagus nerve → brainstem → cortex, explaining prodromal symptoms and eventual cognitive decline in late-stage PD.',
        usedIn: ['hopefulDevelopments'],
        context: 'The PD-AD connection: shared lysosomal dysfunction and spreading pathology.',
      },
    ],
  },

  // ============================================
  // QINOTRANS BBB DELIVERY PLATFORM
  // ============================================
  {
    id: 'qinotrans-lilly-2024',
    type: 'news',
    authors: ['Qinotto Press Release'],
    title: 'Qinotto and Lilly Enter Research Collaboration and License Agreement',
    publication: 'GlobeNewswire',
    year: 2024,
    url: 'https://www.globenewswire.com/news-release/2024/10/08/2959972/0/en/Qinotto-and-Lilly-Enter-Research-Collaboration-and-License-Agreement.html',
    citations: [
      {
        id: 'qinotrans-lilly-partnership',
        quote: 'Qinotto, Inc. announced today that its subsidiary Qinotto Therapeutics has entered into a multi-year research collaboration and worldwide license agreement with Eli Lilly and Company to develop novel antibody-based vehicles capable of transporting therapeutic payloads across the blood-brain barrier.',
        usedIn: ['hopefulDevelopments'],
        context: 'QinoTrans BBB platform validated by Lilly partnership; founded by same team that discovered C381.',
      },
    ],
  },
];
