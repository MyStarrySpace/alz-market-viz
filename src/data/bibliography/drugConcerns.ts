// Drug Concern Sources
// Includes: DRUG CONCERN SOURCES - RILUZOLE, DRUG CONCERN SOURCES - GLP-1 AGONISTS

import { Source } from './types';

export const drugConcernsSources: Source[] = [
  // ============================================
  // DRUG CONCERN SOURCES - RILUZOLE
  // ============================================
  {
    id: 'riluzole-hepatotoxicity-livertox',
    type: 'website',
    authors: ['LiverTox'],
    title: 'Riluzole',
    publication: 'NCBI Bookshelf',
    year: 2024,
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK548919/',
    accessDate: '2025-01-14',
    citations: [
      {
        id: 'riluzole-liver-incidence',
        quote: 'Serum aminotransferase elevations occur in approximately up to 12% of patients on long term riluzole therapy, but elevations above 3 times the upper limit of normal (ULN) occur in less than 3% of patients.',
        usedIn: ['trialBarriers'],
        context: 'Documents riluzole hepatotoxicity risk requiring liver monitoring.',
      },
      {
        id: 'riluzole-liver-mechanism',
        quote: 'The hepatotoxicity of riluzole may be related to production of a toxic or immunogenic intermediate. The severity of liver injury from riluzole ranges from minor, transient elevations in serum aminotransferase levels to acute hepatic injury with jaundice and possible to acute liver failure.',
        usedIn: ['trialBarriers'],
        context: 'Mechanism and severity range of riluzole-induced liver injury.',
      },
    ],
  },

  // ============================================
  // DRUG CONCERN SOURCES - GLP-1 AGONISTS
  // ============================================
  {
    id: 'glp1-mtorc1-activation-2023',
    type: 'journal',
    authors: ['Wenjing Li', 'Juan Liang', 'et al.'],
    title: 'Glucagon-like peptide-1 receptor activation stimulates PKA-mediated phosphorylation of Raptor and this contributes to the weight loss effect of liraglutide',
    publication: 'eLife',
    year: 2023,
    doi: '10.7554/eLife.80944',
    url: 'https://elifesciences.org/articles/80944',
    citations: [
      {
        id: 'glp1-mtorc1-pka',
        quote: 'GLP-1R activation induces mTORC1 signaling and Raptor phosphorylation in a PKA-dependent manner, and this contributes to weight loss by the therapeutic GLP-1R agonist liraglutide.',
        usedIn: ['trialBarriers'],
        context: 'GLP-1R agonists activate mTORC1, which inhibits autophagy—potentially counterproductive for clearing protein aggregates in AD.',
      },
    ],
  },
  {
    id: 'glp1-liraglutide-mtorc1-neurons-2018',
    type: 'journal',
    authors: ['Emiliano Canabarro Fernandes', 'Antonio Humberto Hamad Minervino', 'et al.'],
    title: 'Liraglutide Activates mTORC1 Signaling and AMPA Receptors in Rat Hippocampal Neurons Under Toxic Conditions',
    publication: 'Frontiers in Neuroscience',
    year: 2018,
    volume: '12',
    pages: '756',
    doi: '10.3389/fnins.2018.00756',
    url: 'https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2018.00756/full',
    citations: [
      {
        id: 'liraglutide-neuron-mtorc1',
        quote: 'Liraglutide Activates mTORC1 Signaling and AMPA Receptors in Rat Hippocampal Neurons Under Toxic Conditions.',
        usedIn: ['trialBarriers'],
        context: 'Evidence that GLP-1R agonists activate mTORC1 specifically in neurons.',
      },
    ],
  },
  {
    id: 'glp1-heart-rate-2016',
    type: 'journal',
    authors: ['Ryo Kumarathurai', 'Olav W. Nielsen', 'et al.'],
    title: 'Effects of GLP-1 Receptor Agonists on Heart Rate and the Autonomic Nervous System Using Holter Electrocardiography and Power Spectrum Analysis of Heart Rate Variability',
    publication: 'Diabetes Care',
    year: 2016,
    volume: '39',
    pages: 'e22-e23',
    doi: '10.2337/dc15-1506',
    url: 'https://diabetesjournals.org/care/article/39/2/e22/37134/Effects-of-GLP-1-Receptor-Agonists-on-Heart-Rate',
    citations: [
      {
        id: 'glp1-heart-rate-increase',
        quote: 'Long- and short-acting glucagon-like peptide 1 receptor agonists (GLP-1RAs) liraglutide and lixisenatide, which are available for diabetes therapy, may act on the autonomic nervous system to increase heart rate.',
        usedIn: ['trialBarriers'],
        context: 'GLP-1R agonists increase heart rate, which may affect glymphatic clearance.',
      },
    ],
  },
  {
    id: 'glymphatic-heart-rate-2019',
    type: 'journal',
    authors: ['Lulu Xie', 'Hongyi Kang', 'et al.'],
    title: 'Increased glymphatic influx is correlated with high EEG delta power and low heart rate in mice under anesthesia',
    publication: 'Science Advances',
    year: 2019,
    doi: '10.1126/sciadv.aav5447',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30820460/',
    citations: [
      {
        id: 'glymphatic-low-heart-rate',
        quote: 'Glymphatic influx correlates positively with cortical delta power in EEG recordings and negatively with beta power and heart rate.',
        usedIn: ['trialBarriers'],
        context: 'Lower heart rate is associated with better glymphatic clearance—GLP-1 agonist-induced tachycardia may impair waste clearance.',
      },
    ],
  },
  {
    id: 'glymphatic-norepinephrine-2025',
    type: 'journal',
    authors: ['Natalie Hauglund', 'Caitlin Kight', 'et al.'],
    title: 'Norepinephrine-mediated slow vasomotion drives glymphatic clearance during sleep',
    publication: 'Cell',
    year: 2025,
    doi: '10.1016/j.cell.2024.11.002',
    url: 'https://pubmed.ncbi.nlm.nih.gov/39788123/',
    citations: [
      {
        id: 'norepinephrine-glymphatic',
        quote: 'During wakefulness, higher levels of norepinephrine increase brain parenchymal resistance, thereby suppressing glymphatic activity.',
        usedIn: ['trialBarriers'],
        context: 'Increased sympathetic tone suppresses glymphatic clearance—relevant to GLP-1 agonist effects.',
      },
    ],
  },
];
