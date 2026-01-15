// Clinical Trial Sources
// Includes: CLINICAL TRIAL FAILURES, ADUCANUMAB CONTROVERSY, MAJOR TRIAL FAILURES

import { Source } from './types';

export const trialsSources: Source[] = [
  // ============================================
  // CLINICAL TRIAL FAILURES
  // ============================================
  {
    id: 'cummings-2014',
    type: 'journal',
    authors: ['Jeffrey Cummings', 'Travis Morstorf', 'Kate Zhong'],
    title: 'Alzheimer\'s disease drug-development pipeline: few candidates, frequent failures',
    publication: 'Alzheimer\'s Research & Therapy',
    year: 2014,
    volume: '6',
    pages: '37',
    doi: '10.1186/alzrt269',
    url: 'https://alzres.biomedcentral.com/articles/10.1186/alzrt269',
    citations: [
      {
        id: 'cummings-2014-failure',
        quote: 'The failure rate since 2002 (excluding agents currently in Phase 3) is 99.6%.',
        usedIn: ['timeline', 'hero', 'investmentAsymmetry'],
        context: 'The canonical failure rate statistic.',
      },
      {
        id: 'cummings-2014-scope',
        quote: 'There are dozens of drugs in development for AD with billions of dollars invested. Despite the massive investment in AD drugs and a burgeoning pipeline, there have been more setbacks and failures than treatment successes.',
        usedIn: ['investmentAsymmetry'],
        context: 'Documents the scale of investment and failure.',
      },
    ],
  },

  {
    id: 'yiannopoulou-2020',
    type: 'journal',
    authors: ['Kalliopi G. Yiannopoulou', 'Aikaterini I. Anastasiou', 'Konstantinos V. Karydas', 'Sokratis G. Papageorgiou'],
    title: 'Reasons for Failed Trials of Disease-Modifying Treatments for Alzheimer Disease and Their Contribution in Recent Research',
    publication: 'Biomedicines',
    year: 2019,
    volume: '7',
    pages: '97',
    doi: '10.3390/biomedicines7040097',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6966425/',
    citations: [
      {
        id: 'yiannopoulou-98percent',
        quote: 'Since 2003, 98% of Alzheimer\'s disease (AD) treatment clinical trials have failed, showing a disappointing 2% success rate (aducanumab included).',
        usedIn: ['timeline', 'hero'],
        context: 'Updated failure rate through 2019.',
      },
    ],
  },

  // ============================================
  // ADUCANUMAB CONTROVERSY
  // ============================================
  {
    id: 'alexander-2021',
    type: 'journal',
    authors: ['G. Caleb Alexander', 'Sharon Emerson', 'Aaron S. Kesselheim'],
    title: 'Controversy and Progress in Alzheimer\'s Disease—FDA Approval of Aducanumab',
    publication: 'New England Journal of Medicine',
    year: 2021,
    volume: '385',
    pages: '769-771',
    doi: '10.1056/NEJMp2111320',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMp2111320',
    citations: [
      {
        id: 'alexander-2021-approval',
        quote: 'On June 7, 2021, the U.S. Food and Drug Administration (FDA) announced the accelerated approval of aducanumab (Aduhelm), a biologic manufactured by Biogen for the treatment of Alzheimer\'s disease.',
        usedIn: ['timeline'],
        context: 'Documents the controversial FDA approval.',
      },
    ],
  },

  {
    id: 'aducanumab-advisory-2020',
    type: 'website',
    authors: ['FDA Peripheral and Central Nervous System Drugs Advisory Committee'],
    title: 'Meeting transcript: Aducanumab review',
    publication: 'FDA',
    year: 2020,
    url: 'https://www.fda.gov/advisory-committees/advisory-committee-calendar/november-6-2020-meeting-peripheral-and-central-nervous-system-drugs-advisory-committee-meeting',
    citations: [
      {
        id: 'fda-vote',
        quote: 'The FDA\'s expert advisory panel voted 10–0 with one abstention that aducanumab was not effective.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The unanimous advisory panel rejection that FDA overruled.',
      },
      {
        id: 'fda-override',
        quote: 'Despite the FDA\'s advisory committee voting 10-0 to reject approval and its own statistician reviewers rejecting approval, accelerated approval was granted. Three members of the advisory committee ultimately resigned over this decision.',
        usedIn: ['timeline'],
        context: 'FDA ignored its own experts and statisticians.',
      },
    ],
  },

  {
    id: 'biogen-discontinue-2024',
    type: 'news',
    authors: ['Alzheimer\'s Association'],
    title: 'Aducanumab to Be Discontinued as Alzheimer\'s Treatment',
    publication: 'Alzheimer\'s Association',
    year: 2024,
    url: 'https://www.alz.org/alzheimers-dementia/treatments/aducanumab',
    citations: [
      {
        id: 'biogen-discontinue',
        quote: 'Aducanumab (Aduhelm), which received accelerated approval as a treatment for Alzheimer\'s disease from the FDA in 2021, has been discontinued by its manufacturer (Biogen). Biogen abandoned the drug in January 2024, for financial reasons.',
        usedIn: ['timeline'],
        context: 'The ignominious end of aducanumab—abandoned after all the controversy.',
      },
    ],
  },

  // ============================================
  // MAJOR TRIAL FAILURES
  // ============================================
  {
    id: 'an1792-alzforum',
    type: 'website',
    authors: ['Alzforum'],
    title: 'AN-1792',
    publication: 'Alzforum Therapeutics Database',
    year: 2002,
    url: 'https://www.alzforum.org/therapeutics/an-1792',
    citations: [
      {
        id: 'an1792-suspension',
        quote: 'Dosing in a 372-patient, multinational Phase 2a trial in people with mild to moderate AD was suspended when four treated patients developed brain inflammation that later proved to be aseptic meningoencephalitis.',
        usedIn: ['timeline'],
        context: 'The first amyloid vaccine trial halted due to brain inflammation.',
      },
      {
        id: 'an1792-rate',
        quote: 'Altogether, six percent of patients came down with this side effect.',
        usedIn: ['timeline'],
        context: 'The meningoencephalitis rate.',
      },
      {
        id: 'an1792-termination',
        quote: 'In 2002, development of AN-1792 was terminated, but follow-up assessment of treated patients continued.',
        usedIn: ['timeline'],
        context: 'Official termination of the program.',
      },
    ],
  },

  {
    id: 'bapineuzumab-alzforum',
    type: 'website',
    authors: ['Alzforum'],
    title: 'Bapineuzumab',
    publication: 'Alzforum Therapeutics Database',
    year: 2012,
    url: 'https://www.alzforum.org/therapeutics/bapineuzumab',
    citations: [
      {
        id: 'bapineuzumab-termination',
        quote: 'All phrase 3 trials were terminated on August 6, 2012 because two large Phase 3 studies showed no clinical benefit.',
        usedIn: ['timeline'],
        context: 'The first major anti-amyloid antibody Phase 3 failure.',
      },
      {
        id: 'bapineuzumab-biomarkers',
        quote: 'Biomarker analyses indicated that bapineuzumab engaged its target but had no benefit.',
        usedIn: ['timeline'],
        context: 'Key finding: drug hit target but had no clinical effect.',
      },
      {
        id: 'bapineuzumab-explanation',
        quote: 'Cited explanations for failure include the low dose necessitated by bapineuzumab\'s side effect profile and late-stage treatment initiated years after brain amyloid deposition has begun.',
        usedIn: ['timeline'],
        context: 'Rationalizations for the failure.',
      },
    ],
  },

  {
    id: 'solanezumab-statnews-2016',
    type: 'news',
    authors: ['Adam Feuerstein', 'Damian Garde'],
    title: 'Eli Lilly\'s Alzheimer\'s drug fails in late-stage trial, dashing hopes',
    publication: 'STAT News',
    year: 2016,
    url: 'https://www.statnews.com/2016/11/23/alzheimers-eli-lilly-drug-trial/',
    citations: [
      {
        id: 'solanezumab-failure',
        quote: 'The injected therapy, called solanezumab, didn\'t meaningfully beat a placebo in a study on more than 2,100 patients with mild to moderate forms of Alzheimer\'s.',
        usedIn: ['timeline'],
        context: 'Third Phase 3 failure for solanezumab.',
      },
      {
        id: 'solanezumab-third',
        quote: 'This marks the third time Lilly\'s treatment has missed the mark in a late-stage trial, and the company has abandoned any plans to submit it for Food and Drug Administration approval.',
        usedIn: ['timeline'],
        context: 'Lilly\'s persistence through three Phase 3 failures.',
      },
      {
        id: 'solanezumab-stock',
        quote: 'Lilly\'s share price fell more than 14 percent on the news.',
        usedIn: ['timeline'],
        context: 'Market reaction to the failure.',
      },
    ],
  },
];
