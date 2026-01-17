import type { Drug, ComparisonRow } from '@/types';

export const patentedDrugs: Drug[] = [
  {
    id: 'lecanemab',
    name: 'Lecanemab (Leqembi)',
    type: 'patented',
    investment: 50000, // $50+ billion total in amyloid research
    annualCost: 26500,
    fdaStatus: 'approved',
    evidenceStrength: 2,
    outcome: '27% slowing of cognitive decline',
    mechanism: 'Anti-amyloid antibody',
    keyStudyYear: 2023,
    keyEvidence: 'Phase 3 trial showed 27% slowing vs placebo',
  },
  {
    id: 'donanemab',
    name: 'Donanemab (Kisunla)',
    type: 'patented',
    investment: 3000,
    annualCost: 32000,
    fdaStatus: 'approved',
    evidenceStrength: 2,
    outcome: '35% slowing of cognitive decline',
    mechanism: 'Anti-amyloid antibody',
    keyStudyYear: 2024,
    keyEvidence: 'Phase 3 trial showed 35% slowing vs placebo',
  },
  {
    id: 'aduhelm',
    name: 'Aducanumab (Aduhelm)',
    type: 'patented',
    investment: 2000,
    annualCost: 28200,
    fdaStatus: 'approved',
    evidenceStrength: 1,
    outcome: 'Controversial approval, withdrawn from market',
    mechanism: 'Anti-amyloid antibody',
    keyStudyYear: 2021,
    keyEvidence: 'Accelerated approval despite mixed trial results',
  },
];

export const genericDrugs: Drug[] = [
  {
    id: 'lithium-orotate',
    name: 'Lithium Orotate',
    type: 'supplement',
    investment: 5, // Minimal research funding
    annualCost: 120, // ~$10/month
    fdaStatus: 'no-pathway',
    evidenceStrength: 4,
    outcome: 'Reversed memory loss in AD mice at 1/1000th bipolar dose',
    mechanism: 'GSK-3β inhibition, BDNF upregulation',
    keyStudyYear: 2025,
    keyEvidence: 'Nature 2025: Complete reversal of memory deficits without toxicity',
  },
  {
    id: 'nebivolol',
    name: 'Nebivolol',
    type: 'generic',
    investment: 2,
    annualCost: 48, // ~$4/month
    fdaStatus: 'no-pathway',
    evidenceStrength: 3,
    outcome: 'Reduced amyloid pathology, brain-bioavailable',
    mechanism: 'SIRT1 activation, NO release, superior to metoprolol',
    keyStudyYear: 2013,
    keyEvidence: 'J Alzheimers Dis 2013: Reduced amyloid in mice',
  },
  {
    id: 'metformin',
    name: 'Metformin',
    type: 'generic',
    investment: 15,
    annualCost: 48,
    fdaStatus: 'no-pathway',
    evidenceStrength: 3,
    outcome: 'Anti-aging mechanism, SIRT1 activation',
    mechanism: 'AMPK activation, anti-inflammatory',
    keyStudyYear: 2024,
    keyEvidence: 'TAME trial ongoing with philanthropic funding only',
  },
  {
    id: 'gv-971',
    name: 'GV-971 (Oligomannate)',
    type: 'generic',
    investment: 50,
    annualCost: 2400,
    fdaStatus: 'pending',
    evidenceStrength: 3,
    outcome: 'Approved in China, gut-brain mechanism',
    mechanism: 'Gut microbiome remodeling, reduces neuroinflammation',
    keyStudyYear: 2019,
    keyEvidence: 'Cell Research 2019, US Phase 3 terminated 2022 (funding)',
  },
];

export const allDrugs: Drug[] = [...patentedDrugs, ...genericDrugs];

export const comparisonData: ComparisonRow[] = [
  {
    category: 'Phase 3 Cost Per Drug',
    patented: '$462 million',
    generic: 'Cannot fund Phase 3',
    delta: 'No pathway',
    sourceId: 'cummings-ad-costs-2022',
    keyFinding: 'Phase 3 cost per drug: $462 million',
  },
  {
    category: 'Phase 3 Funding Source',
    patented: '79% industry-funded',
    generic: '77% non-industry',
    sourceId: 'cummings-pipeline-2024',
    keyFinding: '79% of Phase 3 trials are industry-funded; 77% of repurposed trials are non-industry funded',
  },
  {
    category: 'Annual Patient Cost',
    patented: '$26,500 (lecanemab)',
    generic: '$4-180/year',
    delta: '100-1000x cheaper',
    sourceId: 'lecanemab-fda-2023',
    keyFinding: 'Wholesale acquisition cost: $26,500 per year',
  },
];

/**
 * Investment data with verified sources
 *
 * Sources:
 * - $42.5B total: Cummings et al. 2022, Alzheimer's & Dementia
 *   "The costs of developing treatments for Alzheimer's disease: A retrospective exploration"
 *   PMC8940715 - covers 1995-2021 private clinical R&D
 *
 * - Amyloid focus: ~$1.6B of NIH's $3.4B in 2022 was amyloid-focused (STAT 2025)
 *   Historically, majority of large Phase 3 trials since 2002 targeted amyloid
 *
 * - Repurposed drugs: 80% funded by NIH/academic/philanthropic sources (Cummings 2024 pipeline)
 *   Only 18% of repurposed agents funded by industry
 *
 * - Phase 3 cost: $462M per drug (Cummings 2022, inflation-adjusted to 2021 USD)
 */
export const investmentData = {
  patented: {
    total: 42500000000, // $42.5 billion - Cummings 2022
    label: 'Patented Drug R&D',
    examples: ['Lecanemab', 'Donanemab', 'Aduhelm'],
    period: '1995-2021',
    sourceId: 'cummings-ad-costs-2022',
    industryFundedPercent: 79, // 79% of Phase 3 trials - Cummings 2024
  },
  repurposed: {
    label: 'Repurposed Drugs',
    examples: ['Lithium', 'GV-971', 'Metformin'],
    nonIndustryFundedPercent: 77, // 77% of repurposed trials - Cummings 2024
    sourceId: 'cummings-pipeline-2024',
  },
  phase3Cost: 462000000, // $462M per Phase 3 trial - Cummings 2022
  nihAdBudget: 3800000000, // $3.8B FY2024
  sourceIds: ['cummings-ad-costs-2022', 'cummings-pipeline-2024', 'nia-budget-2024'],
};

/**
 * Citation details for Investment Asymmetry section
 */
export const investmentSources = {
  'cummings-ad-costs-2022': {
    pmid: '35124968',
    doi: '10.1002/alz.12450',
    title: 'The costs of developing treatments for Alzheimer\'s disease: A retrospective exploration',
    authors: 'Cummings J, Zhou Y, Lee G, Zhong K, Fonseca J, Cheng F',
    journal: 'Alzheimers Dement',
    year: 2022,
    keyFindings: [
      'Total private clinical R&D: $42.5 billion (1995-2021)',
      'Phase 3 alone: $24.1 billion (57% of total)',
      'Phase 3 cost per drug: $462 million',
      '183,679 total trial participants',
      '95% overall failure rate',
    ],
  },
  'cummings-pipeline-2024': {
    pmid: '38659717',
    doi: '10.1002/trc2.12465',
    title: 'Alzheimer\'s disease drug development pipeline: 2024',
    authors: 'Cummings J, et al.',
    journal: 'Alzheimers Dement Transl Res Clin Interv',
    year: 2024,
    keyFindings: [
      '79% of Phase 3 trials are industry-funded',
      '77% of repurposed trials are funded by non-industry sources',
      '60% of all clinical trials are industry-funded',
      'Repurposed drugs: 31% of pipeline',
    ],
  },
  'nia-budget-2024': {
    url: 'https://www.nia.nih.gov/about/budget/fiscal-year-2024-budget',
    title: 'NIA Fiscal Year 2024 Budget',
    year: 2024,
    keyFindings: [
      'Total NIA budget: $4.51 billion',
      'AD/ADRD research funding: ~$3.8 billion',
      '$100 million increase over FY2023',
    ],
  },
  'lecanemab-fda-2023': {
    url: 'https://www.fda.gov/drugs/news-events-human-drugs/fda-converts-novel-alzheimers-disease-treatment-traditional-approval',
    title: 'FDA Converts Novel Alzheimer\'s Disease Treatment to Traditional Approval',
    year: 2023,
    keyFindings: [
      'Lecanemab (Leqembi) received traditional FDA approval July 2023',
      'Wholesale acquisition cost: $26,500 per year',
      'First amyloid-targeting therapy with traditional approval',
    ],
  },
};
