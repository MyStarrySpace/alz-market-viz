// Why Companies Test AD Drugs in Other Conditions First
// AD trials are exceptionally expensive, long, and risky—so companies often
// pursue faster, cheaper indications first (Parkinson's, ALS, diabetes, etc.)

export interface TrialRequirement {
  factor: string;
  adTrials: string;
  otherIndications: string;
  impact: string;
}

export interface RedirectedDrug {
  id: string;
  name: string;
  mechanism: string;
  originalTarget?: string;
  adRationale: string;
  currentIndications: string[];
  adTrialStatus: 'none' | 'phase_1' | 'phase_2' | 'phase_3' | 'abandoned';
  whyNotAD: string;
  sourceIds: string[];
}

// Why AD trials are uniquely difficult
export const trialRequirements: TrialRequirement[] = [
  {
    factor: 'Trial Duration',
    adTrials: '18-36 months minimum; often 4-5 years for prevention trials',
    otherIndications: '6-12 months typical for many conditions',
    impact: 'Dramatically higher costs and longer time to revenue',
  },
  {
    factor: 'Endpoint Measurement',
    adTrials: 'Subtle cognitive changes require large samples to detect statistically',
    otherIndications: 'Often clear biomarkers or clinical endpoints (tumor size, HbA1c, motor function)',
    impact: 'Need 1,500-3,000+ patients vs. hundreds for other diseases',
  },
  {
    factor: 'Patient Recruitment',
    adTrials: 'Must confirm amyloid status via PET scan (~$5,000 each); high screen-failure rate',
    otherIndications: 'Often clinical diagnosis or simple blood tests',
    impact: 'Screening costs alone can exceed $50M for a Phase 3',
  },
  {
    factor: 'Safety Monitoring',
    adTrials: 'Serial MRIs required for amyloid drugs (ARIA monitoring); cognitive testing at every visit',
    otherIndications: 'Standard safety labs and clinical assessments',
    impact: 'Per-patient costs 3-5x higher than typical trials',
  },
  {
    factor: 'Regulatory Pathway',
    adTrials: 'FDA requires cognitive AND functional benefit; surrogate endpoints controversial',
    otherIndications: 'Many diseases accept biomarker endpoints for accelerated approval',
    impact: 'Higher bar for approval; fewer shortcuts available',
  },
  {
    factor: 'Patient Heterogeneity',
    adTrials: 'Mixed pathologies (vascular, Lewy body, TDP-43); genetic variants (APOE); stage variability',
    otherIndications: 'Often more homogeneous patient populations',
    impact: 'Noise in data; need larger trials to see signal',
  },
  {
    factor: 'Placebo Response',
    adTrials: 'Caregiver effects, practice effects on cognitive tests can mask drug benefit',
    otherIndications: 'Varies, but often more objective endpoints',
    impact: 'Makes detecting true drug effect harder',
  },
];

// ============================================
// AD CLINICAL TRIAL COSTS BY PHASE
// Source: Cummings et al. 2022 (Alzheimer's & Dementia)
// ============================================

export interface TrialPhaseCost {
  phase: string;
  perDrugCost: number; // in millions USD (2021 dollars)
  totalIndustrySpend1995to2021: number; // in millions USD
  percentOfTotal: number;
  typicalDuration: string;
  typicalPatients: string;
  failureRate: number; // percentage
}

export const adTrialPhaseCosts: TrialPhaseCost[] = [
  {
    phase: 'Phase 1',
    perDrugCost: 79_000_000,
    totalIndustrySpend1995to2021: 4_200_000_000, // estimated ~10% of $42.5B
    percentOfTotal: 10,
    typicalDuration: '6-12 months',
    typicalPatients: '20-100',
    failureRate: 40,
  },
  {
    phase: 'Phase 2',
    perDrugCost: 141_000_000,
    totalIndustrySpend1995to2021: 9_600_000_000, // Phase 2+3 = $33.7B, subtract Phase 3
    percentOfTotal: 23,
    typicalDuration: '1-2 years',
    typicalPatients: '100-500',
    failureRate: 72,
  },
  {
    phase: 'Phase 3',
    perDrugCost: 462_000_000,
    totalIndustrySpend1995to2021: 24_065_000_000,
    percentOfTotal: 57,
    typicalDuration: '3-5 years',
    typicalPatients: '1,500-3,000',
    failureRate: 40, // of those that reach Phase 3
  },
];

// Total AD drug development industry statistics (1995-2021)
export const adDevelopmentStatistics = {
  totalPrivateInvestment: 42_500_000_000, // $42.5 billion
  totalClinicalTrials: 1097,
  totalParticipants: 183_679,
  overallFailureRate: 95, // 117 discontinuations of 235 agents
  phase3Failures: 36, // drugs discontinued at Phase 3
  fdaApprovals: 6, // only 6 approvals despite massive investment
  sourceId: 'cummings-ad-costs-2022',
};

// Estimated costs comparison by disease (Phase 3 only)
export const trialCostComparison = {
  alzheimerPhase3: {
    lowEstimate: 300_000_000,
    highEstimate: 600_000_000,
    typical: 462_000_000, // Updated from Cummings 2022
    duration: '3-5 years',
    patients: '1,500-3,000',
  },
  parkinsonsPhase3: {
    lowEstimate: 100_000_000,
    highEstimate: 250_000_000,
    typical: 150_000_000,
    duration: '2-3 years',
    patients: '400-800',
  },
  diabetesPhase3: {
    lowEstimate: 80_000_000,
    highEstimate: 200_000_000,
    typical: 120_000_000,
    duration: '1-2 years',
    patients: '500-1,500',
  },
  alsPhase3: {
    lowEstimate: 50_000_000,
    highEstimate: 150_000_000,
    typical: 80_000_000,
    duration: '18 months',
    patients: '300-600',
  },
};

// ============================================
// FUNDING SOURCES FOR AD RESEARCH
// ============================================

export type FundingSourceType =
  | 'government' // NIH, NIA, national health services
  | 'nonprofit' // Foundations, charities
  | 'industry'; // Pharmaceutical companies

export interface FundingSource {
  id: string;
  name: string;
  type: FundingSourceType;
  country: string;
  annualBudget: number; // in millions USD
  budgetYear: number;
  description: string;
  fundingFocus: string[];
  canFundPhase3: boolean; // Can their budget cover a single Phase 3 AD trial?
  sourceIds: string[];
}

export const fundingSources: FundingSource[] = [
  // ============================================
  // GOVERNMENT FUNDING
  // ============================================
  {
    id: 'nih-nia',
    name: 'NIH/NIA (National Institute on Aging)',
    type: 'government',
    country: 'USA',
    annualBudget: 3_800, // $3.8 billion
    budgetYear: 2024,
    description:
      'Primary US federal funder of AD research. Budget has grown 7x since 2011 through advocacy.',
    fundingFocus: [
      'Basic research',
      'Translational research',
      'Clinical trials',
      'Biomarkers',
      'Care research',
    ],
    canFundPhase3: true, // Could fund ~8 Phase 3 trials per year
    sourceIds: ['nih-nia-budget-2024'],
  },
  {
    id: 'uk-dementia-research',
    name: 'UK Government Dementia Research',
    type: 'government',
    country: 'UK',
    annualBudget: 200, // ~£160M = ~$200M
    budgetYear: 2024,
    description:
      'UK government commitment doubled dementia research funding to £160M by 2024.',
    fundingFocus: ['Basic research', 'Care research', 'Prevention'],
    canFundPhase3: false, // Entire annual budget < 1 Phase 3 trial
    sourceIds: ['uk-dementia-budget-2024'],
  },

  // ============================================
  // NONPROFIT / FOUNDATION FUNDING
  // ============================================
  {
    id: 'alzheimers-association',
    name: "Alzheimer's Association",
    type: 'nonprofit',
    country: 'USA',
    annualBudget: 105, // $105 million in 2024
    budgetYear: 2024,
    description:
      'Largest nonprofit AD funder. Active portfolio of 1,100+ grants in 56 countries totaling $430M committed.',
    fundingFocus: [
      'Early-career researchers',
      'Novel hypotheses',
      'Care research',
      'Diversity in research',
    ],
    canFundPhase3: false, // Annual budget = ~23% of one Phase 3
    sourceIds: ['alzheimers-association-budget-2024'],
  },
  {
    id: 'alzheimers-research-uk',
    name: "Alzheimer's Research UK",
    type: 'nonprofit',
    country: 'UK',
    annualBudget: 43, // £34.6M = ~$43M
    budgetYear: 2024,
    description:
      'Leading UK dementia research charity. Has funded 1,275 projects and committed £237M+ to research.',
    fundingFocus: ['Basic research', 'Drug discovery', 'Early detection', 'Prevention'],
    canFundPhase3: false, // Annual budget = ~9% of one Phase 3
    sourceIds: ['aruk-budget-2024'],
  },
  {
    id: 'brightfocus',
    name: 'BrightFocus Foundation',
    type: 'nonprofit',
    country: 'USA',
    annualBudget: 10, // ~$10M across all programs (AD, macular, glaucoma)
    budgetYear: 2024,
    description:
      'Funds innovative seed research. Has invested $189M+ in AD research historically. No government funding.',
    fundingFocus: [
      'Early-stage/seed research',
      'Novel mechanisms',
      'Early-career scientists',
    ],
    canFundPhase3: false, // Annual budget = ~2% of one Phase 3
    sourceIds: ['brightfocus-budget-2024'],
  },
  {
    id: 'addf',
    name: "Alzheimer's Drug Discovery Foundation (ADDF)",
    type: 'nonprofit',
    country: 'USA',
    annualBudget: 15, // Estimated based on portfolio; venture philanthropy model
    budgetYear: 2024,
    description:
      'Venture philanthropy model—invests in drug development, returns go back to mission. Has invested $65M+ in 450 programs.',
    fundingFocus: [
      'Drug development',
      'Clinical trials',
      'Biomarkers',
      'Aging biology',
    ],
    canFundPhase3: false, // Annual budget = ~3% of one Phase 3
    sourceIds: ['addf-budget-2024'],
  },

  // ============================================
  // INDUSTRY (FOR COMPARISON)
  // ============================================
  {
    id: 'pharma-industry',
    name: 'Pharmaceutical Industry (Combined)',
    type: 'industry',
    country: 'Global',
    annualBudget: 2_000, // Rough estimate based on $42.5B over 26 years
    budgetYear: 2024,
    description:
      'Private pharma investment. Historically $42.5B spent 1995-2021. Concentrated on amyloid-targeting drugs.',
    fundingFocus: [
      'Late-stage clinical trials',
      'FDA approval pathways',
      'Patentable compounds',
    ],
    canFundPhase3: true, // Primary funder of Phase 3 trials
    sourceIds: ['cummings-ad-costs-2022'],
  },
];

// ============================================
// FUNDING GAP ANALYSIS
// ============================================

export function getFundingGapAnalysis() {
  const phase3Cost = adTrialPhaseCosts.find(p => p.phase === 'Phase 3')!.perDrugCost;
  const totalNonprofitAnnual = fundingSources
    .filter(s => s.type === 'nonprofit')
    .reduce((sum, s) => sum + s.annualBudget * 1_000_000, 0);
  const nihBudget =
    fundingSources.find(s => s.id === 'nih-nia')!.annualBudget * 1_000_000;

  return {
    phase3CostUSD: phase3Cost,
    totalNonprofitAnnualUSD: totalNonprofitAnnual,
    nihAnnualUSD: nihBudget,
    nonprofitCoversPhase3Percent: Math.round(
      (totalNonprofitAnnual / phase3Cost) * 100
    ),
    nihCouldFundTrials: Math.floor(nihBudget / phase3Cost),
    keyInsight:
      'All major AD nonprofits combined (~$173M/year) cannot fund a single Phase 3 trial ($462M). NIH could theoretically fund ~8 trials/year, but most funding goes to basic research. This leaves Phase 3 trials almost entirely dependent on industry—which prioritizes patentable compounds.',
  };
}

// Examples of drugs tested elsewhere first (or instead of AD)
export const redirectedDrugs: RedirectedDrug[] = [
  {
    id: 'semaglutide-ozempic',
    name: 'Semaglutide (Ozempic/Wegovy)',
    mechanism: 'GLP-1 receptor agonist; improves insulin signaling, reduces inflammation',
    originalTarget: 'Type 2 diabetes',
    adRationale: 'Brain insulin resistance is implicated in AD ("Type 3 diabetes" hypothesis); GLP-1 may reduce neuroinflammation and improve neuronal metabolism',
    currentIndications: ['Type 2 diabetes (Ozempic)', 'Obesity (Wegovy)', 'Cardiovascular risk reduction'],
    adTrialStatus: 'phase_3',
    whyNotAD: 'Diabetes trials are shorter (1-2 years), use clear biomarkers (HbA1c), and have faster FDA pathways. The EVOKE trial for AD failed, possibly due to limited blood-brain barrier penetration of oral formulation.',
    sourceIds: ['semaglutide-evoke-2024'],
  },
  {
    id: 'riluzole',
    name: 'Riluzole',
    mechanism: 'Glutamate modulator; reduces excitotoxicity',
    originalTarget: 'Amyotrophic lateral sclerosis (ALS)',
    adRationale: 'Glutamate excitotoxicity contributes to neuronal death in AD; riluzole could be neuroprotective',
    currentIndications: ['ALS (FDA approved 1995)'],
    adTrialStatus: 'phase_2',
    whyNotAD: 'ALS trials are shorter (18 months), smaller (300-600 patients), and have clear functional endpoints. AD trials would need 3-5x more patients and 2x longer duration.',
    sourceIds: ['riluzole-als-1994'],
  },
  {
    id: 'pioglitazone',
    name: 'Pioglitazone (Actos)',
    mechanism: 'PPAR-γ agonist; improves insulin sensitivity, anti-inflammatory',
    originalTarget: 'Type 2 diabetes',
    adRationale: 'Metabolic dysfunction and insulin resistance are upstream drivers; PPAR-γ activation reduces neuroinflammation',
    currentIndications: ['Type 2 diabetes'],
    adTrialStatus: 'abandoned',
    whyNotAD: 'TOMMORROW prevention trial ($260M) was terminated after 5 years when interim analysis showed no benefit. The massive cost and duration of AD prevention trials make them prohibitively risky—diabetes trials generated revenue in 1-2 years.',
    sourceIds: ['pioglitazone-tommorrow-2019'],
  },
  {
    id: 'etanercept',
    name: 'Etanercept (Enbrel)',
    mechanism: 'TNF-α inhibitor; reduces systemic and neuroinflammation',
    originalTarget: 'Rheumatoid arthritis',
    adRationale: 'TNF-α is elevated in AD brains; large insurance database studies showed 50-70% reduced AD risk in RA patients on TNF inhibitors',
    currentIndications: ['Rheumatoid arthritis', 'Psoriasis', 'Ankylosing spondylitis', 'IBD'],
    adTrialStatus: 'none',
    whyNotAD: 'Autoimmune trials are 6-12 months with clear inflammatory biomarkers. An AD trial would need 3-4 years and thousands of patients. No pharma company has invested in an AD trial despite compelling observational data—the economics don\'t work for a generic drug.',
    sourceIds: ['tnf-inhibitors-ad-2016'],
  },
  {
    id: 'dasatinib',
    name: 'Dasatinib + Quercetin',
    mechanism: 'Senolytic combination; clears senescent cells',
    originalTarget: 'Chronic myeloid leukemia (dasatinib)',
    adRationale: 'Senescent cells accumulate in aging brains and secrete inflammatory factors (SASP); clearing them may reduce neuroinflammation',
    currentIndications: ['CML (dasatinib)', 'Quercetin is a supplement'],
    adTrialStatus: 'phase_2',
    whyNotAD: 'Cancer trials have short durations (months) and clear response criteria (tumor shrinkage). AD senolytic trials are exploratory, require years of follow-up, and the mechanism is speculative. Small pilot studies ongoing but no pharma investment.',
    sourceIds: ['senolytics-ad-2019'],
  },
  {
    id: 'rapamycin',
    name: 'Rapamycin (Sirolimus)',
    mechanism: 'mTOR inhibitor; enhances autophagy, reduces inflammation',
    originalTarget: 'Organ transplant rejection',
    adRationale: 'mTOR inhibition restores autophagy—critical for clearing protein aggregates. Extends lifespan in multiple species.',
    currentIndications: ['Transplant rejection', 'Certain cancers', 'LAM'],
    adTrialStatus: 'phase_1',
    whyNotAD: 'Transplant trials are well-defined with clear endpoints. AD trials for an autophagy mechanism would need to prove cognitive benefit over years. No major pharma investment; only academic studies.',
    sourceIds: ['rapamycin-autophagy-2016'],
  },
  {
    id: 'telmisartan',
    name: 'Telmisartan',
    mechanism: 'ARB with PPAR-γ activation; antihypertensive with metabolic benefits',
    originalTarget: 'Hypertension',
    adRationale: 'Hypertension is a major AD risk factor; telmisartan uniquely activates PPAR-γ (like pioglitazone) while controlling blood pressure',
    currentIndications: ['Hypertension', 'Cardiovascular risk reduction'],
    adTrialStatus: 'none',
    whyNotAD: 'Blood pressure trials use clear endpoints (mmHg reduction) over months. An AD trial would need cognitive endpoints over years. Generic status means no commercial incentive despite plausible mechanism.',
    sourceIds: ['telmisartan-pparg-2004'],
  },
  {
    id: 'exenatide',
    name: 'Exenatide (Byetta/Bydureon)',
    mechanism: 'GLP-1 receptor agonist; first-in-class for diabetes',
    originalTarget: 'Type 2 diabetes',
    adRationale: 'Similar rationale to semaglutide; showed neuroprotective effects in Parkinson\'s trials',
    currentIndications: ['Type 2 diabetes'],
    adTrialStatus: 'phase_2',
    whyNotAD: 'The company tested it in Parkinson\'s first—trials are shorter (1-2 years), smaller (60-100 patients in Phase 2), and motor endpoints are more objective than cognitive tests. The Parkinson\'s trial showed promising results; AD trial only recently started.',
    sourceIds: ['exenatide-parkinsons-2017'],
  },
];

// Summary statistics
export function getTrialBarriersSummary() {
  return {
    adTrialCostMultiple: '3-5x',
    adTrialDurationMultiple: '2-3x',
    adTrialPatientMultiple: '3-5x',
    drugsTestedElsewhere: redirectedDrugs.length,
    keyInsight: 'The economics of drug development push companies to test promising drugs in faster, cheaper indications first. By the time a drug might reach AD trials—if ever—patent life may be nearly exhausted.',
  };
}

// Get drugs by their AD trial status
export function getDrugsByADStatus(status: RedirectedDrug['adTrialStatus']): RedirectedDrug[] {
  return redirectedDrugs.filter(d => d.adTrialStatus === status);
}

// Get drugs that have never been tried in AD
export function getDrugsNeverTriedInAD(): RedirectedDrug[] {
  return redirectedDrugs.filter(d => d.adTrialStatus === 'none' || d.adTrialStatus === 'abandoned');
}
