// Data for Failure Cascade Charts

// Investment Disparity Data (Patent System)
export const investmentDisparity = {
  title: 'Investment by Drug Type',
  patentedInvestment: 42500, // $42.5 billion
  genericInvestment: 50, // ~$50 million (estimated)
  ratio: '850:1',
  source: 'Cummings et al., 2021',
  breakdown: [
    { phase: 'Phase 1', cost: 79, description: '$79M per drug' },
    { phase: 'Phase 2', cost: 141, description: '$141M per drug' },
    { phase: 'Phase 3', cost: 462, description: '$462M per drug' },
  ],
};

// Trial Economics Data
export const trialEconomicsData = {
  title: 'AD Drug Development Costs',
  totalInvestment: 42500, // $42.5 billion since 1995
  totalTrials: 1097,
  totalParticipants: 183679,
  failureRate: 95, // 95% failure rate
  successCount: 6, // Only 6 drugs commercialized
  failureCount: 117,
  phaseCosts: [
    { phase: 'Phase 1', cost: 79, percent: 10 },
    { phase: 'Phase 2', cost: 141, percent: 17 },
    { phase: 'Phase 3', cost: 462, percent: 57 },
    { phase: 'Preclinical', cost: 99, percent: 16 },
  ],
  fundingGap: {
    academicGrant: 2.5, // $2.5 million average R01
    phase3Cost: 462, // $462 million
    ratio: 185, // 185x gap
  },
};

// Insurance Structure Data
export const insuranceData = {
  title: 'Who Pays for Alzheimer\'s Care',
  annualCostPerPatient: 28501, // Total per patient per year (2015 USD)
  familyCaregivingValue: 27789,
  medicarePays: 2752,
  medicaidNursingHomePercent: 60, // 60% of nursing home residents have dementia
  additionalMedicareCost: 11, // 11% more than non-AD patients
  payers: [
    { name: 'Family Caregiving', amount: 27789, color: '#486393', description: 'Unpaid family care value' },
    { name: 'Medicaid', amount: 15000, color: '#007385', description: 'Long-term care, nursing homes' },
    { name: 'Out-of-Pocket', amount: 7000, color: '#C9461D', description: 'Patient/family expenses' },
    { name: 'Medicare', amount: 2752, color: '#E5AF19', description: 'Medical care only' },
    { name: 'Other Insurance', amount: 3749, color: '#787473', description: 'Private insurance' },
  ],
};

// AD Subtypes Data
export const adSubtypesData = {
  title: 'AD is Not One Disease',
  subtypes: [
    {
      name: 'Typical AD',
      percent: 75,
      description: 'Classic memory-predominant presentation',
      color: '#486393',
    },
    {
      name: 'Limbic-Predominant',
      percent: 14,
      description: 'Medial temporal focus, often older patients',
      color: '#007385',
    },
    {
      name: 'Hippocampal-Sparing',
      percent: 11,
      description: 'Neocortical predominant, often younger, higher education',
      color: '#C9461D',
    },
  ],
  earlyOnsetAtypical: 66, // 66% of early-onset AD is atypical
  trialImplication: 'Trials that lump all subtypes together dilute responders with non-responders',
  heterogeneityFactors: [
    { factor: 'Age at onset', impact: 'Early-onset more likely atypical' },
    { factor: 'Education', impact: 'Higher education → hippocampal-sparing' },
    { factor: 'Sex', impact: 'Different pathway usage and progression' },
    { factor: 'Genetics', impact: 'APOE status affects pathology distribution' },
    { factor: 'Comorbidities', impact: 'Vascular disease, diabetes alter presentation' },
  ],
};

// Timing Catastrophe Data
export const timingData = {
  title: 'The Timing Problem',
  decadesBeforeSymptoms: 10, // Pathology starts 10+ years before symptoms
  failedCompounds: 98, // 98 failed compounds in Phase II/III
  successRate: 2.0, // 2.0% success rate since 2003
  timeline: [
    { year: -20, label: 'Amyloid begins accumulating', stage: 'silent' },
    { year: -15, label: 'Tau pathology starts', stage: 'silent' },
    { year: -10, label: 'Synaptic dysfunction begins', stage: 'silent' },
    { year: -5, label: 'Neuronal death accelerates', stage: 'preclinical' },
    { year: 0, label: 'Cognitive symptoms appear', stage: 'clinical' },
    { year: 2, label: 'Diagnosis typically made', stage: 'clinical' },
    { year: 5, label: 'Most trials enroll patients', stage: 'clinical' },
  ],
  keyInsight: 'By the time symptoms appear, neuronal damage is extensive and often irreversible',
  trialLessons: [
    { lesson: 'Late intervention', quote: '"Therapeutic interventions administered too late" was identified as a pivotal trial design issue.' },
    { lesson: 'Irreversible damage', quote: 'Once neurodegenerative processes are active, prevention of further Aβ formation may not be effective.' },
    { lesson: 'Shift to prevention', quote: 'Strict inclusion criteria were applied, such as biomarker evidence of AD pathology and enrollment of individuals with preclinical stages.' },
  ],
};
