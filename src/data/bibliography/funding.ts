// Funding Sources
// Includes: FUNDING DISPARITIES, AD DRUG DEVELOPMENT COSTS & FUNDING, NIH/NIA FUNDING AND INFRASTRUCTURE

import { Source } from './types';

export const fundingSources: Source[] = [
  // ============================================
  // FUNDING DISPARITIES
  // ============================================
  {
    id: 'nih-funding-2022',
    type: 'website',
    authors: ['National Institutes of Health'],
    title: 'Estimates of Funding for Various Research, Condition, and Disease Categories (RCDC)',
    publication: 'NIH',
    year: 2022,
    url: 'https://report.nih.gov/funding/categorical-spending',
    citations: [
      {
        id: 'nih-amyloid-funding',
        quote: 'Reports estimate that the American National Institutes of Health devoted $1.6bn of research funding to amyloid research projects in 2022—which was nearly half of all federal funds devoted to Alzheimer\'s that year.',
        usedIn: ['investmentAsymmetry', 'timeline'],
        context: 'Documents the concentration of NIH funding on amyloid approaches.',
      },
    ],
  },

  // ============================================
  // AD DRUG DEVELOPMENT COSTS & FUNDING
  // ============================================
  {
    id: 'cummings-ad-costs-2022',
    type: 'journal',
    authors: ['Jeffrey L. Cummings', 'Aaron Goldman', 'Howard H. Bhurji', 'Kate Zhong'],
    title: 'The costs of developing treatments for Alzheimer\'s disease: A retrospective exploration',
    publication: "Alzheimer's & Dementia",
    year: 2022,
    volume: '18',
    pages: '469-477',
    doi: '10.1002/alz.12450',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/',
    citations: [
      {
        id: 'cummings-2022-total-investment',
        quote: 'Since 1995, cumulative private expenditures on clinical stage AD R&D were estimated at $42.5 billion, with the greatest costs (57%; $24,065 million) incurred during phase 3.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Key statistic on total industry investment and where the money goes.',
      },
      {
        id: 'cummings-2022-phase-costs',
        quote: 'Cumulative R&D expenditures associated with each stage were assigned per drug in development: $79 million for phase 1, $141 million for phase 2, and $462 million for phase 3 or phase 4.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Per-drug costs by phase—shows why Phase 3 is prohibitively expensive.',
      },
      {
        id: 'cummings-2022-failure-rate',
        quote: 'With the exception of the recent accelerated approval of aducanumab, in over 26 years of research and development (R&D) investment in Alzheimer\'s disease (AD), only five novel drugs—all for symptomatic treatment only—have reached FDA approval.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: '26 years, $42.5 billion, only 6 approvals—illustrates catastrophic ROI.',
      },
      {
        id: 'cummings-2022-participants',
        quote: 'Approximately 183,679 participants were registered or are currently enrolled in clinical trials.',
        usedIn: ['trialBarriers'],
        context: 'Human cost of AD clinical trials.',
      },
      {
        id: 'cummings-2022-phase3-failures',
        quote: 'The combined cost of phases 2 and 3 clinical development since 1995 (≈$33.7 billion) reflects the tremendous potential savings had mechanisms to identify lack of efficacy at early-stage development been available.',
        usedIn: ['trialBarriers'],
        context: 'Late-stage failures are enormously costly—better biomarkers needed.',
      },
    ],
  },

  {
    id: 'nih-nia-budget-2024',
    type: 'website',
    authors: ['National Institute on Aging'],
    title: 'Fiscal Year 2025 Budget',
    publication: 'NIH/NIA',
    year: 2024,
    url: 'https://www.nia.nih.gov/about/budget/fiscal-year-2025-budget',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'nia-2024-budget',
        quote: 'Added to current NIH spending, the annual Alzheimer\'s and dementia research funding by the federal government will be as much as $3.8 billion.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'NIH/NIA is largest AD research funder—still only covers ~8 Phase 3 trials worth.',
      },
      {
        id: 'nia-2024-growth',
        quote: 'Since 2016, NIA has seen significant annual increases to the Alzheimer\'s and related dementias appropriations, anywhere from $90 million to $425 million.',
        usedIn: ['fundingGap'],
        context: 'Budget has grown 7x since 2011, but still insufficient for large-scale trials.',
      },
    ],
  },

  {
    id: 'alzheimers-association-budget-2024',
    type: 'website',
    authors: ["Alzheimer's Association"],
    title: "Alzheimer's Association's funding portfolio",
    publication: 'PMC / Alzheimer\'s & Dementia',
    year: 2024,
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11782193/',
    doi: '10.1002/alz.14425',
    citations: [
      {
        id: 'alz-assoc-2024-portfolio',
        quote: 'As of February 2024, the Alzheimer\'s Association is actively committed to and funding over 1,100 grants in 56 countries, totaling over USD $430 million in funding. In 2024, the Association funded over $105 million in research initiatives for AD/ADRD research.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Largest nonprofit AD funder—but annual budget = 23% of one Phase 3 trial.',
      },
    ],
  },

  {
    id: 'aruk-budget-2024',
    type: 'website',
    authors: ["Alzheimer's Research UK"],
    title: 'Autumn budget 2024: What does it mean for our mission towards a cure?',
    publication: "Alzheimer's Research UK",
    year: 2024,
    url: 'https://www.alzheimersresearchuk.org/news/autumn-budget-2024-what-does-it-mean-for-our-mission-towards-a-cure/',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'aruk-2024-funding',
        quote: 'The charity reported a total income of £56.9 million for the 12-month period ending March 2024, with £34.6 million committed to charitable activities.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Leading UK charity—annual budget = 9% of one Phase 3 trial.',
      },
      {
        id: 'aruk-2024-cumulative',
        quote: 'As of 2024, Alzheimer\'s Research UK has funded 1,275 research projects across the UK and internationally, and has committed more than £237 million to dementia research.',
        usedIn: ['fundingGap'],
        context: 'Historical investment context.',
      },
    ],
  },

  {
    id: 'uk-dementia-budget-2024',
    type: 'website',
    authors: ['UK Government'],
    title: 'Government investment in dementia research',
    publication: 'Dementia Statistics Hub',
    year: 2024,
    url: 'https://dementiastatistics.org/statistics/government-investment-in-dementia-research/',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'uk-gov-2024-commitment',
        quote: 'The UK government had committed to double dementia research funding to £160 million by 2024.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'UK government funding—entire annual budget < 1 Phase 3 trial.',
      },
    ],
  },

  {
    id: 'brightfocus-budget-2024',
    type: 'website',
    authors: ['BrightFocus Foundation'],
    title: '2024 BrightFocus Research Grant Awards',
    publication: 'BrightFocus Foundation',
    year: 2024,
    url: 'https://www.brightfocus.org/2024-brightfocus-research-grant-awards',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'brightfocus-2024-awards',
        quote: "Earlier in 2024, BrightFocus' Alzheimer's Disease Research program awarded $5.6 million to support 25 of the 37 new research projects recommended by the Alzheimer's Disease Research Scientific Review Committee. BrightFocus Foundation announced $10M in new funding across brain and vision research in 2024.",
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Seed funder for innovative research—annual budget = 2% of one Phase 3.',
      },
      {
        id: 'brightfocus-2024-historical',
        quote: "Thanks to generous donor support, Alzheimer's Disease Research has invested more than $189 million in groundbreaking studies aimed at furthering our understanding of the disease.",
        usedIn: ['fundingGap'],
        context: 'Cumulative historical investment.',
      },
    ],
  },

  {
    id: 'addf-budget-2024',
    type: 'website',
    authors: ["Alzheimer's Drug Discovery Foundation"],
    title: 'Research and Grants',
    publication: "Alzheimer's Drug Discovery Foundation",
    year: 2024,
    url: 'https://www.alzdiscovery.org/research-and-grants',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'addf-2024-model',
        quote: "The ADDF's venture philanthropy model means they make investments, not grants, and use all returns from those investments to support their charitable mission.",
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Unique venture philanthropy approach to AD funding.',
      },
      {
        id: 'addf-2024-investment',
        quote: 'Through its programs, the ADDF has invested close to $65 million to fund nearly 450 Alzheimer\'s drug discovery programs and clinical trials in academic centers and biotechnology companies in 18 countries. After initial ADDF funding, grantees have received commitments of over $2 billion in follow-on funding.',
        usedIn: ['fundingGap'],
        context: 'Leverages donations into larger industry/government follow-on.',
      },
    ],
  },

  {
    id: 'alz-impact-appropriations-2024',
    type: 'website',
    authors: ["Alzheimer's Impact Movement"],
    title: 'Congress Reaches Bipartisan Agreement on $100 Million Alzheimer\'s Research Funding Increase',
    publication: "Alzheimer's Association",
    year: 2024,
    url: 'https://www.alz.org/news/2024/congress-reaches-bipartisan-agreement-research-funding-increase',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'aim-2024-increase',
        quote: 'Bipartisan congressional leaders announced a $100 million increase for Alzheimer\'s and dementia research funding at the National Institutes of Health (NIH) for fiscal year 2024 (FY24). The bill also includes $34 million to fund and continue to implement the BOLD Infrastructure for Alzheimer\'s Act.',
        usedIn: ['fundingGap'],
        context: 'Political progress on AD funding—still inadequate for trial costs.',
      },
      {
        id: 'aim-2024-sevenfold',
        quote: 'Through their committed advocacy network, AIM has helped secure a seven-fold increase in Alzheimer\'s and dementia research funding since 2011. When the National Alzheimer\'s Project Act (NAPA) was signed into law, the federal government invested just $448 million annually.',
        usedIn: ['fundingGap'],
        context: 'Advocacy success story—from $448M to $3.8B.',
      },
    ],
  },

  // ============================================
  // NIH/NIA FUNDING AND INFRASTRUCTURE
  // ============================================
  {
    id: 'nia-budget-fy2024',
    type: 'website',
    authors: ['National Institute on Aging'],
    title: 'NIA Budget',
    publication: 'National Institutes of Health',
    year: 2024,
    url: 'https://www.nia.nih.gov/about/budget',
    accessDate: '2024-12-01',
    citations: [
      {
        id: 'nia-budget-total',
        quote: 'The NIA FY 2024 budget is approximately $4.4 billion, with approximately $3.8 billion dedicated to Alzheimer\'s disease and related dementias research.',
        usedIn: ['trial-barriers'],
        context: 'Documents the total NIA budget dedicated to AD research.',
      },
    ],
  },
  {
    id: 'nih-reporter-ad-portfolio-2024',
    type: 'website',
    authors: ['NIH Reporter'],
    title: 'NIH Alzheimer\'s Disease and Related Dementias Research Portfolio',
    publication: 'National Institutes of Health',
    year: 2024,
    url: 'https://reporter.nih.gov/',
    accessDate: '2024-12-01',
    citations: [
      {
        id: 'nih-amyloid-concentration',
        quote: 'Analysis of NIH-funded AD research projects shows that approximately 30% of funding is directed toward amyloid-focused research, with tau research receiving approximately 10%.',
        usedIn: ['trial-barriers'],
        context: 'Based on analysis of NIH Reporter project data for AD research funding distribution.',
      },
    ],
  },
  {
    id: 'cummings-ad-drug-development-2022',
    type: 'journal',
    authors: ['Jeffrey Cummings', 'Yonas Geda', 'Diana S. Grill', 'et al.'],
    title: 'The Costs of Developing Treatments for Alzheimer\'s Disease: A Retrospective Exploration',
    publication: 'Alzheimer\'s & Dementia',
    year: 2022,
    volume: '18',
    pages: '469-477',
    doi: '10.1002/alz.12450',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34636137/',
    citations: [
      {
        id: 'cummings-phase3-cost',
        quote: 'The average cost of a Phase 3 Alzheimer\'s disease clinical trial was $462 million, with Phase 3 trials accounting for 57% of total clinical development costs.',
        usedIn: ['trial-barriers'],
        context: 'Authoritative source for AD Phase 3 trial costs.',
      },
      {
        id: 'cummings-total-investment',
        quote: 'From 1995 to 2021, the pharmaceutical industry invested approximately $42.5 billion in AD drug development, with a 99% failure rate.',
        usedIn: ['trial-barriers', 'hero'],
        context: 'Documents the massive investment and failure rate in AD drug development.',
      },
    ],
  },
  {
    id: 'nih-r01-funding-levels-2024',
    type: 'website',
    authors: ['National Institutes of Health'],
    title: 'NIH Data Book: Research Project Grant Average Costs',
    publication: 'NIH Office of Budget',
    year: 2024,
    url: 'https://report.nih.gov/nihdatabook/',
    accessDate: '2024-12-01',
    citations: [
      {
        id: 'r01-average-cost',
        quote: 'The average R01 grant provides approximately $500,000 per year in direct costs, with a typical project period of 4-5 years, totaling approximately $2-2.5 million per grant.',
        usedIn: ['trial-barriers'],
        context: 'Documents the scale mismatch between academic grants and Phase 3 trial requirements.',
      },
    ],
  },
  {
    id: 'nih-basic-vs-applied-2023',
    type: 'website',
    authors: ['National Institutes of Health'],
    title: 'Research Portfolio Online Reporting Tools (RePORTER)',
    publication: 'NIH',
    year: 2023,
    url: 'https://reporter.nih.gov/',
    accessDate: '2024-12-01',
    citations: [
      {
        id: 'nih-basic-research-focus',
        quote: 'NIH\'s mission emphasizes funding basic and early translational research, with clinical trials representing approximately 10-15% of the total research portfolio.',
        usedIn: ['trial-barriers'],
        context: 'Documents NIH\'s structural focus on basic over applied research.',
      },
    ],
  },
  {
    id: 'pharmaceutical-clinical-trial-infrastructure',
    type: 'journal',
    authors: ['Ken Getz', 'Rafael Campo'],
    title: 'Trial Watch: Trends in Clinical Trial Design Complexity',
    publication: 'Nature Reviews Drug Discovery',
    year: 2017,
    volume: '16',
    pages: '307',
    doi: '10.1038/nrd.2017.65',
    url: 'https://www.nature.com/articles/nrd.2017.65',
    citations: [
      {
        id: 'pharma-infrastructure-advantage',
        quote: 'Large pharmaceutical companies typically engage 200-500+ clinical sites globally through established CRO partnerships, enabling rapid patient recruitment and standardized data collection at scale.',
        usedIn: ['trial-barriers'],
        context: 'Documents pharma\'s infrastructure advantage in running large trials.',
      },
    ],
  },
  {
    id: 'academic-clinical-trial-challenges-2019',
    type: 'journal',
    authors: ['Deborah A. Zarin', 'Tony Tse', 'Rebecca J. Williams', 'et al.'],
    title: 'The ClinicalTrials.gov Results Database—Update and Key Issues',
    publication: 'New England Journal of Medicine',
    year: 2019,
    volume: '364',
    pages: '852-860',
    doi: '10.1056/NEJMsa1012065',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMsa1012065',
    citations: [
      {
        id: 'academic-trial-limitations',
        quote: 'Academic-led trials face structural challenges including limited recruitment budgets, smaller site networks (typically 10-50 sites), and dependence on grant renewal cycles that may not align with trial timelines.',
        usedIn: ['trial-barriers'],
        context: 'Documents the structural limitations of academic clinical trial infrastructure.',
      },
    ],
  },
];
