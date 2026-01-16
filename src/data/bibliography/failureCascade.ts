// Failure Cascade Sources
// Includes: PATENT SYSTEM, FDA STRUCTURE, TRIAL ECONOMICS, INSURANCE, SUBTYPES, TIMING

import { Source } from './types';

export const failureCascadeSources: Source[] = [
  // ============================================
  // PATENT SYSTEM & DRUG REPURPOSING
  // ============================================
  {
    id: 'pushpakom-repurposing-barriers-2022',
    type: 'journal',
    authors: ['Sudeep Pushpakom', 'Francesco Iorio', 'Patrick A. Eyers', 'et al.'],
    title: 'Drug repurposing: a systematic review on root causes, barriers and facilitators',
    publication: 'BMC Medicine',
    year: 2022,
    volume: '20',
    pages: '277',
    doi: '10.1186/s12916-022-02469-2',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9336118/',
    citations: [
      {
        id: 'pushpakom-2022-ip-challenges',
        quote: 'Pharmaceutical companies were described as patenting many compounds, even if they are later abandoned, and thus prevent others from developing these compounds without a license',
        usedIn: ['failureCascade'],
        context: 'Documents how patent portfolios block repurposing even of abandoned drugs.',
      },
      {
        id: 'pushpakom-2022-resources',
        quote: 'Inadequate resources and challenges negotiating IP and data access are key barriers needing reform',
        usedIn: ['failureCascade'],
        context: 'Key barriers to drug repurposing identified in systematic review.',
      },
      {
        id: 'pushpakom-2022-cost',
        quote: 'bringing a repurposed compound to market was described as still costing hundreds of millions to billions of dollars',
        usedIn: ['failureCascade'],
        context: 'Even repurposed drugs face prohibitive costs without patent protection.',
      },
    ],
  },
  {
    id: 'breckenridge-repurposing-government-2019',
    type: 'journal',
    authors: ['Alasdair Breckenridge', 'Robin Jacob'],
    title: 'Drug Repurposing of Generic Drugs: Challenges and the Potential Role for Government',
    publication: 'Applied Health Economics and Health Policy',
    year: 2019,
    volume: '17',
    pages: '751-757',
    doi: '10.1007/s40258-019-00511-0',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10627937/',
    citations: [
      {
        id: 'breckenridge-2019-market-competition',
        quote: 'Generic drugs lack marketing protection, which leads to higher market competition. Thus, commercial parties are often hesitant to invest in repurposing of generic drugs',
        usedIn: ['failureCascade'],
        context: 'Core economic barrier: no patent = no investment incentive.',
      },
      {
        id: 'breckenridge-2019-second-use',
        quote: "obtaining 'second medical use' patents for generic drugs can be difficult, as the repurposed indication may not be novel due to already published literature",
        usedIn: ['failureCascade'],
        context: 'Published research paradoxically prevents patent protection.',
      },
      {
        id: 'breckenridge-2019-funding-gap',
        quote: 'lack of research funding agency and/or governmental research funding for larger drug repurposing trials and especially the subsequent marketing authorisation process',
        usedIn: ['failureCascade'],
        context: 'Government funding stops before the expensive Phase 3 trials.',
      },
      {
        id: 'breckenridge-2019-early-stage',
        quote: 'most funding initiatives are aimed at earlier stage development and/or have insufficient funds for larger-scale clinical trials',
        usedIn: ['failureCascade'],
        context: 'The valley of death between discovery and approval.',
      },
    ],
  },

  // ============================================
  // TRIAL ECONOMICS
  // ============================================
  {
    id: 'cummings-ad-costs-2021',
    type: 'journal',
    authors: ['Jeffrey L. Cummings', 'Aaron Goldman', 'Howard H. Bhurji', 'Kate Zhong'],
    title: 'The costs of developing treatments for Alzheimer\'s disease: A retrospective exploration',
    publication: 'Alzheimer\'s & Dementia',
    year: 2021,
    volume: '18',
    pages: '469-477',
    doi: '10.1002/alz.12450',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/',
    citations: [
      {
        id: 'cummings-2021-total',
        quote: 'Since 1995, cumulative private expenditures on clinical stage AD R&D were estimated at $42.5 billion',
        usedIn: ['failureCascade', 'trialBarriers'],
        context: 'Total private investment in AD drug development since 1995.',
      },
      {
        id: 'cummings-2021-phase3',
        quote: '$462 million for phase 3 or phase 4',
        usedIn: ['failureCascade', 'trialBarriers'],
        context: 'Average cost per drug for Phase 3 AD clinical trials.',
      },
      {
        id: 'cummings-2021-failure-rate',
        quote: 'Of 235 agents analyzed, 112 remain in active clinical development, six have reached commercialization, and 117 have had negative outcomes in various stages of clinical development (36 as late‐stage failures; Table 1), equating to a 95% failure rate.',
        usedIn: ['failureCascade', 'trialBarriers'],
        context: 'Comprehensive failure rate analysis for AD drug development.',
      },
      {
        id: 'cummings-2021-participants',
        quote: 'In the 1097 AD drug trials conducted since 1995, 183,679 participants have entered or are currently enrolled.',
        usedIn: ['failureCascade', 'trialBarriers'],
        context: 'Human cost of AD clinical trials—nearly 200,000 participants.',
      },
    ],
  },

  // ============================================
  // FDA REGULATORY STRUCTURE
  // ============================================
  {
    id: 'fda-early-ad-guidance-2018',
    type: 'website',
    authors: ['U.S. Food and Drug Administration'],
    title: 'Early Alzheimer\'s Disease: Developing Drugs for Treatment',
    publication: 'FDA Guidance for Industry',
    year: 2018,
    url: 'https://www.fda.gov/media/110903/download',
    citations: [
      {
        id: 'fda-2018-staging',
        quote: 'In stage 1, biomarkers are abnormal, but people have no cognitive complaints or detectable clinical decline, even on sensitive tests (preclinical). In stage 2, subtle cognitive effects, but no functional deficits, appear (preclinical). In stage 3, people begin to have problems with some daily tasks measurable with instruments sensitive to AD stage 3 (prodromal)',
        usedIn: ['failureCascade'],
        context: 'FDA staging system for early AD—only covers stages with pathology, not true prevention.',
      },
    ],
  },

  // ============================================
  // INSURANCE & MEDICARE
  // ============================================
  {
    id: 'aldridge-medicare-costs-2023',
    type: 'journal',
    authors: ['Melissa D. Aldridge', 'Amy S. Kelley', 'et al.'],
    title: 'The Real-World Medicare Costs of Alzheimer Disease: Considerations for Policy and Care',
    publication: 'Journal of the American Geriatrics Society',
    year: 2023,
    volume: '71',
    pages: '2766-2774',
    doi: '10.1111/jgs.18402',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10398271/',
    citations: [
      {
        id: 'aldridge-2023-medicare-cost',
        quote: "Alzheimer disease added about 11% to the average $17,000 per year Medicare cost for same-risk beneficiaries without dementia.",
        usedIn: ['failureCascade'],
        context: 'Medicare costs for AD patients vs. matched controls.',
      },
      {
        id: 'aldridge-2023-medicaid-burden',
        quote: 'Medicaid, rather than Medicare, bear most of the substantial cost burden',
        usedIn: ['failureCascade'],
        context: 'Medicaid pays for long-term care while Medicare covers only medical expenses.',
      },
      {
        id: 'aldridge-2023-nursing-home',
        quote: 'Medicaid pays for most of U.S. nursing home care costs, and more than 60% of nursing home residents have moderate to severe dementia',
        usedIn: ['failureCascade'],
        context: 'The majority of nursing home residents have dementia, funded by Medicaid.',
      },
      {
        id: 'aldridge-2023-pet-coverage',
        quote: 'Medicare declined to cover amyloid positron emission tomography (PET) imaging, which can provide early Alzheimer diagnosis, outside of a clinical trial, citing insufficient evidence',
        usedIn: ['failureCascade'],
        context: 'Medicare restricted coverage of early diagnostic tools.',
      },
    ],
  },

  // ============================================
  // DISEASE HETEROGENEITY / SUBTYPES
  // ============================================
  {
    id: 'ferreira-heterogeneity-2020',
    type: 'journal',
    authors: ['Daniel Ferreira', 'Agneta Nordberg', 'Eric Westman'],
    title: 'Biological subtypes of Alzheimer disease',
    publication: 'Neurology',
    year: 2020,
    volume: '94',
    pages: '436-446',
    doi: '10.1212/WNL.0000000000009058',
    url: 'https://www.neurology.org/doi/10.1212/WNL.0000000000009058',
    citations: [
      {
        id: 'ferreira-2020-subtypes',
        quote: 'three main subtypes...11% hippocampal-sparing, 14% limbic-predominant, and 75% typical subtype',
        usedIn: ['failureCascade'],
        context: 'AD consists of at least 3 distinct biological subtypes.',
      },
    ],
  },
  {
    id: 'duara-heterogeneity-trials-2022',
    type: 'journal',
    authors: ['Ranjan Duara', 'Warren Barker'],
    title: 'Heterogeneity in Alzheimer\'s Disease Diagnosis and Progression Rates: Implications for Therapeutic Trials',
    publication: 'Neurotherapeutics',
    year: 2022,
    volume: '19',
    pages: '8-25',
    doi: '10.1007/s13311-022-01185-z',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9130395/',
    citations: [
      {
        id: 'duara-2022-heterogeneity',
        quote: 'clinical presentation and the pathological processes underlying Alzheimer\'s disease can be very heterogeneous in severity, location, and composition',
        usedIn: ['failureCascade'],
        context: 'AD is heterogeneous at every level from pathology to presentation.',
      },
      {
        id: 'duara-2022-mixed-pathology',
        quote: 'inclusion of subjects with mixed pathology...may reduce treatment efficacy, especially among older participants',
        usedIn: ['failureCascade'],
        context: 'Mixed pathology dilutes treatment effects in trials.',
      },
      {
        id: 'duara-2022-progressors',
        quote: 'placebo versus treatment group differences...may depend on variation in the sampling of slow versus fast progressors',
        usedIn: ['failureCascade'],
        context: 'Different progression rates can mask or create false treatment effects.',
      },
      {
        id: 'duara-2022-trial-design',
        quote: 'Greater effort in accounting for this heterogeneity should yield better outcomes in AD clinical trials',
        usedIn: ['failureCascade'],
        context: 'Stratifying for heterogeneity could improve trial outcomes.',
      },
    ],
  },
  {
    id: 'graff-radford-atypical-2021',
    type: 'journal',
    authors: ['Jonathan Graff-Radford', 'et al.'],
    title: 'New insights into atypical Alzheimer\'s disease in the era of biomarkers',
    publication: 'The Lancet Neurology',
    year: 2021,
    volume: '20',
    pages: '222-234',
    doi: '10.1016/S1474-4422(20)30440-3',
    url: 'https://pubmed.ncbi.nlm.nih.gov/33609479/',
    citations: [
      {
        id: 'graff-radford-2021-atypical',
        quote: 'nearly two-thirds of patients with early-onset AD have atypical (non-memory) presentations',
        usedIn: ['failureCascade'],
        context: 'Most early-onset AD patients do not have typical memory symptoms.',
      },
    ],
  },

  // ============================================
  // TIMING CATASTROPHE
  // ============================================
  {
    id: 'yiannopoulou-trial-failures-2020',
    type: 'journal',
    authors: ['Konstantina G. Yiannopoulou', 'Sokratis G. Papageorgiou'],
    title: 'Reasons for Failed Trials of Disease-Modifying Treatments for Alzheimer Disease and Their Contribution in Recent Research',
    publication: 'Biomedicines',
    year: 2020,
    volume: '8',
    pages: '97',
    doi: '10.3390/biomedicines8050097',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6966425/',
    citations: [
      {
        id: 'yiannopoulou-2020-too-late',
        quote: 'treating AD patients once they become symptomatic may be too late to reverse the progress of neurodegeneration',
        usedIn: ['failureCascade'],
        context: 'Symptomatic treatment timing may explain trial failures.',
      },
      {
        id: 'yiannopoulou-2020-decade-before',
        quote: 'Abnormal deposits of amyloid β and tau tangles and the damage to the brain is believed to start a decade or more before cognitive decline',
        usedIn: ['failureCascade'],
        context: 'Pathology precedes symptoms by 10+ years.',
      },
      {
        id: 'yiannopoulou-2020-reasons',
        quote: 'The most probable explanations for failures of disease-modifying treatments (DMTs) for AD may include late initiation of treatments during the course of AD development, inappropriate drug dosages, erroneous selection of treatment targets',
        usedIn: ['failureCascade'],
        context: 'Multiple reasons for trial failures including timing.',
      },
    ],
  },
  {
    id: 'cummings-trial-failures-review-2022',
    type: 'journal',
    authors: ['Jeffrey L. Cummings', 'Garam Lee', 'Kate Zhong', 'et al.'],
    title: 'Alzheimer\'s Disease: Key Insights from Two Decades of Clinical Trial Failures',
    publication: 'Journal of Alzheimer\'s Disease',
    year: 2022,
    volume: '88',
    pages: '9-25',
    doi: '10.3233/JAD-220110',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9198803/',
    citations: [
      {
        id: 'cummings-2022-98-failures',
        quote: '98 unique phase II and III compounds with various mechanisms of action met our criteria of a failed compound.',
        usedIn: ['failureCascade'],
        context: 'Systematic count of failed AD compounds.',
      },
      {
        id: 'cummings-2022-2percent',
        quote: '2.0% AD drug development success rate for phase II and III, since the last novel approval in 2003.',
        usedIn: ['failureCascade'],
        context: 'The 2% success rate in AD drug development.',
      },
      {
        id: 'cummings-2022-too-late',
        quote: '"Therapeutic interventions administered too late" was identified as a pivotal trial design issue.',
        usedIn: ['failureCascade'],
        context: 'Timing identified as pivotal issue in trial failures.',
      },
      {
        id: 'cummings-2022-neurodegen',
        quote: 'Neurodegenerative changes begin in the brain many years, perhaps even decades prior to clinical manifestations of AD.',
        usedIn: ['failureCascade'],
        context: 'Neurodegeneration precedes symptoms by decades.',
      },
      {
        id: 'cummings-2022-prevention',
        quote: 'Once the various neurodegenerative disease processes are active and progressing, prevention of further Aβ formation or removal of existing plaques...may not be as effective.',
        usedIn: ['failureCascade'],
        context: 'Why anti-amyloid drugs may fail in established disease.',
      },
    ],
  },
];
