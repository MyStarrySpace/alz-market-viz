// Policy and General Milestones Sources
// Includes: POLICY & GENERAL MILESTONES

import { Source } from './types';

export const policySources: Source[] = [
  // ============================================
  // POLICY & GENERAL MILESTONES
  // ============================================
  {
    id: 'napa-2011',
    type: 'website',
    authors: ['U.S. Congress'],
    title: 'National Alzheimer\'s Project Act (NAPA)',
    publication: 'Public Law 111-375',
    year: 2011,
    url: 'https://www.congress.gov/bill/111th-congress/senate-bill/3036',
    citations: [
      {
        id: 'napa-2011-goal',
        quote: 'The Secretary shall establish the Advisory Council on Alzheimer\'s Research, Care, and Services to advise the Secretary on matters relating to Alzheimer\'s disease.',
        usedIn: ['timeline'],
        context: 'NAPA created the national strategic plan for AD research.',
      },
    ],
  },

  {
    id: 'nia-aa-framework-2018',
    type: 'journal',
    authors: ['Clifford R. Jack Jr.', 'David A. Bennett', 'Kaj Blennow', 'et al.'],
    title: 'NIA-AA Research Framework: Toward a biological definition of Alzheimer\'s disease',
    publication: 'Alzheimer\'s & Dementia',
    year: 2018,
    volume: '14',
    pages: '535-562',
    doi: '10.1016/j.jalz.2018.02.018',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29653606/',
    citations: [
      {
        id: 'nia-aa-2018-definition',
        quote: 'Alzheimer\'s disease is defined by its underlying pathologic processes that can be documented by postmortem examination or in vivo by biomarkers.',
        usedIn: ['timeline'],
        context: 'The framework that redefined AD as amyloid pathology rather than clinical symptoms.',
      },
    ],
  },

  {
    id: 'lancet-dementia-2020',
    type: 'journal',
    authors: ['Gill Livingston', 'Jonathan Huntley', 'Andrew Sommerlad', 'et al.'],
    title: 'Dementia prevention, intervention, and care: 2020 report of the Lancet Commission',
    publication: 'The Lancet',
    year: 2020,
    volume: '396',
    pages: '413-446',
    doi: '10.1016/S0140-6736(20)30367-6',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32738937/',
    citations: [
      {
        id: 'lancet-2020-prevention',
        quote: 'Together, 12 modifiable risk factors account for around 40% of worldwide dementias, which consequently could theoretically be prevented or delayed.',
        usedIn: ['timeline'],
        context: 'Landmark report establishing that 40% of dementia is preventable through lifestyle.',
      },
    ],
  },

  {
    id: 'aduhelm-approval-2021',
    type: 'news',
    authors: ['Pam Belluck', 'Rebecca Robbins'],
    title: 'F.D.A. Approves Alzheimer\'s Drug Despite Doubts About Effectiveness',
    publication: 'The New York Times',
    year: 2021,
    url: 'https://www.nytimes.com/2021/06/07/health/aduhelm-fda-alzheimers-drug.html',
    citations: [
      {
        id: 'aduhelm-2021-controversy',
        quote: 'Three members of the F.D.A.\'s advisory committee resigned over the decision, with one calling the approval "probably the worst drug approval decision in recent U.S. history."',
        usedIn: ['timeline'],
        context: 'The controversial FDA approval that led to advisory committee resignations.',
      },
    ],
  },

  {
    id: 'aduhelm-withdrawal-2024',
    type: 'news',
    authors: ['Damian Garde'],
    title: 'Biogen to pull Aduhelm from market, ending its run as a lightning rod for Alzheimer\'s drug debates',
    publication: 'STAT News',
    year: 2024,
    url: 'https://www.statnews.com/2024/01/31/biogen-aduhelm-alzheimers-drug-discontinue/',
    citations: [
      {
        id: 'aduhelm-2024-withdrawal',
        quote: 'Biogen said it would discontinue Aduhelm to focus resources on Leqembi, its newer Alzheimer\'s treatment.',
        usedIn: ['timeline'],
        context: 'End of the most controversial drug approval in FDA history.',
      },
    ],
  },

  {
    id: 'who-dementia-guidelines-2019',
    type: 'website',
    authors: ['World Health Organization'],
    title: 'Risk reduction of cognitive decline and dementia: WHO guidelines',
    publication: 'WHO',
    year: 2019,
    url: 'https://www.who.int/publications/i/item/risk-reduction-of-cognitive-decline-and-dementia',
    citations: [
      {
        id: 'who-2019-guidelines',
        quote: 'Physical activity, tobacco cessation, and management of hypertension, diabetes and dyslipidemia are recommended for reducing the risk of cognitive decline.',
        usedIn: ['timeline'],
        context: 'WHO\'s first global guidelines for dementia prevention.',
      },
    ],
  },

  {
    id: 'amp-ad-2014',
    type: 'website',
    authors: ['National Institutes of Health'],
    title: 'Accelerating Medicines Partnership: Alzheimer\'s Disease',
    publication: 'NIH',
    year: 2014,
    url: 'https://www.nia.nih.gov/research/amp-ad',
    citations: [
      {
        id: 'amp-ad-2014-launch',
        quote: 'AMP-AD aims to shorten the time between the discovery of potential drug targets and the development of new drugs for Alzheimer\'s disease treatment and prevention.',
        usedIn: ['timeline'],
        context: 'Public-private partnership to diversify AD drug targets.',
      },
    ],
  },
];
