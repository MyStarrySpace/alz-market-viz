// Foundational Discoveries in Alzheimer's Research
// Includes: FOUNDATIONAL DISCOVERIES, CHOLINERGIC HYPOTHESIS (early), THE AMYLOID CASCADE HYPOTHESIS

import { Source } from './types';

export const foundationalSources: Source[] = [
  // ============================================
  // CHOLINERGIC HYPOTHESIS
  // ============================================
  {
    id: 'davies-maloney-1976',
    type: 'journal',
    authors: ['Peter Davies', 'A.J.F. Maloney'],
    title: 'Selective loss of central cholinergic neurons in Alzheimer\'s disease',
    publication: 'The Lancet',
    year: 1976,
    volume: '308',
    pages: '1403',
    doi: '10.1016/S0140-6736(76)91936-X',
    url: 'https://pubmed.ncbi.nlm.nih.gov/63862/',
    citations: [
      {
        id: 'davies-1976-deficit',
        quote: 'Choline acetyltransferase activity was reduced by 60-90% in the cerebral cortex and hippocampus of patients with Alzheimer\'s disease compared to age-matched controls.',
        usedIn: ['timeline'],
        context: 'The first biochemical abnormality discovered in AD—acetylcholine depletion.',
      },
      {
        id: 'davies-1976-correlation',
        quote: 'The reduction in choline acetyltransferase activity correlated with the degree of cognitive impairment, suggesting a causal relationship between cholinergic deficit and dementia.',
        usedIn: ['timeline'],
        context: 'Early evidence that the cholinergic deficit was functionally relevant.',
      },
    ],
  },
  {
    id: 'tacrine-approval-1993',
    type: 'journal',
    authors: ['Kenneth L. Davis', 'Leon J. Thal', 'Elaine R. Gamzu', 'et al.'],
    title: 'A double-blind, placebo-controlled multicenter study of tacrine for Alzheimer\'s disease',
    publication: 'New England Journal of Medicine',
    year: 1992,
    volume: '327',
    pages: '1253-1259',
    doi: '10.1056/NEJM199210293271801',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJM199210293271801',
    citations: [
      {
        id: 'tacrine-1993-approval',
        quote: 'Tacrine (tetrahydroaminoacridine) became the first drug approved by the FDA for the treatment of Alzheimer\'s disease in September 1993.',
        usedIn: ['timeline'],
        context: 'The cholinergic hypothesis led to the first approved AD treatment.',
      },
      {
        id: 'tacrine-1993-efficacy',
        quote: 'Patients receiving high-dose tacrine showed significant improvement on the ADAS-cog scale compared to placebo, with a mean difference of 2.4 points.',
        usedIn: ['timeline'],
        context: 'Modest but real cognitive benefits from boosting acetylcholine.',
      },
    ],
  },

  // ============================================
  // FOUNDATIONAL DISCOVERIES
  // ============================================
  {
    id: 'alzheimer-1906',
    type: 'conference',
    authors: ['Alois Alzheimer'],
    title: 'Über eine eigenartige Erkrankung der Hirnrinde',
    publication: 'Allgemeine Zeitschrift für Psychiatrie und psychisch-gerichtliche Medizin',
    year: 1907,
    volume: '64',
    pages: '146-148',
    citations: [
      {
        id: 'alzheimer-1906-presentation',
        quote: 'On 3 November 1906, Alzheimer discussed his findings on the brain pathology and symptoms of presenile dementia publicly, at the Tübingen meeting of the Southwest German Psychiatrists.',
        usedIn: ['timeline', 'intro'],
        context: 'Documents the exact date of the first public presentation of what would become Alzheimer\'s disease.',
      },
      {
        id: 'alzheimer-1906-pathology',
        quote: 'During the subsequent autopsy, Alzheimer identified not only Deter\'s marked brain shrinkage but also localized clumps ("plaques") of an unknown deposited substance as well as dense bundles of tangled fibres in what were once healthy brain cells. These latter two observations—now recognized as amyloid plaques and tau tangles—have become the diagnostic features that define the pathology of AD.',
        usedIn: ['timeline', 'intro'],
        context: 'The original observation of plaques and tangles that would define AD pathology for over a century.',
      },
    ],
  },

  {
    id: 'maurer-alzheimer-biography-2003',
    type: 'book',
    authors: ['Konrad Maurer', 'Ulrike Maurer'],
    title: 'Alzheimer: The Life of a Physician and the Career of a Disease',
    publication: 'Columbia University Press',
    year: 2003,
    pages: 'x + 270',
    url: 'https://cup.columbia.edu/book/alzheimer/9780231118965',
    citations: [
      {
        id: 'maurer-2003-reception',
        quote: 'The attendees at this lecture seemed uninterested in what he had to say. The lecturer that followed Alzheimer was to speak on the topic of "compulsive masturbation," which the audience of 88 individuals was so eagerly awaiting that they sent Alzheimer away without any questions or comments on his discovery.',
        usedIn: ['timeline'],
        context: 'From the authoritative Maurer biography. Documents the ironic indifference to Alzheimer\'s groundbreaking presentation.',
      },
      {
        id: 'maurer-2003-chairman',
        quote: 'The chairman of the session tried to ease the psychiatrist\'s embarrassment by stating, "So then, respected colleague Alzheimer, I thank you for your remarks, clearly there is no desire for discussion."',
        usedIn: ['timeline'],
        context: 'The chairman\'s dismissive response to one of the most important medical discoveries of the century.',
      },
      {
        id: 'maurer-2003-auguste-d',
        quote: 'On 23 December 1995, Konrad Maurer found Auguste D\'s case file containing the original admission and eventual pathology documents at the University of Frankfurt, where they had been misplaced for decades.',
        usedIn: ['intro'],
        context: 'Maurer\'s discovery of the original patient records.',
      },
    ],
  },

  {
    id: 'glenner-wong-1984',
    type: 'journal',
    authors: ['George G. Glenner', 'Caine W. Wong'],
    title: 'Alzheimer\'s disease: initial report of the purification and characterization of a novel cerebrovascular amyloid protein',
    publication: 'Biochemical and Biophysical Research Communications',
    year: 1984,
    volume: '120',
    pages: '885-890',
    doi: '10.1016/s0006-291x(84)80190-4',
    url: 'https://pubmed.ncbi.nlm.nih.gov/6375662/',
    citations: [
      {
        id: 'glenner-1984-isolation',
        quote: 'In 1984, biochemists George Glenner and Caine Wong, in search of "a unique amyloid fibril precursor protein in the serum" of Alzheimer disease (AD) patients, successfully isolated and sequenced the first 24 amino acids of a "cerebrovascular amyloid fibril protein β" that we now know as the amyloid-β (Aβ) peptide.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The breakthrough that made the amyloid hypothesis possible—identifying the molecular composition of plaques.',
      },
      {
        id: 'glenner-1984-no-homology',
        quote: 'Amino acid sequence analysis and a computer search revealed this protein to have no homology with any protein sequenced thus far.',
        usedIn: ['timeline'],
        context: 'Establishes that Aβ was a completely novel discovery.',
      },
      {
        id: 'glenner-1984-chromosome21',
        quote: 'Glenner called attention to this evidence of a key biochemical relationship between Down\'s syndrome and AD, and he stressed that Down\'s syndrome may be a "predictable model" for AD and further suggested that "the genetic defect in Alzheimer\'s disease is localized on chromosome 21."',
        usedIn: ['timeline'],
        context: 'The prediction that would be confirmed by genetic studies and cement amyloid\'s centrality.',
      },
    ],
  },

  // ============================================
  // THE AMYLOID CASCADE HYPOTHESIS
  // ============================================
  {
    id: 'hardy-higgins-1992',
    type: 'journal',
    authors: ['John A. Hardy', 'Gerald A. Higgins'],
    title: 'Alzheimer\'s Disease: The Amyloid Cascade Hypothesis',
    publication: 'Science',
    year: 1992,
    volume: '256',
    pages: '184-185',
    doi: '10.1126/science.1566067',
    url: 'https://pubmed.ncbi.nlm.nih.gov/1566067/',
    citations: [
      {
        id: 'hardy-1992-hypothesis',
        quote: 'Since 1992, the amyloid cascade hypothesis has played the prominent role in explaining the etiology and pathogenesis of Alzheimer\'s disease (AD). It proposes that the deposition of β-amyloid (Aβ) is the initial pathological event in AD leading to the formation of senile plaques (SPs) and then to neurofibrillary tangles (NFTs), neuronal cell death, and ultimately dementia.',
        usedIn: ['timeline', 'frameworks', 'intro'],
        context: 'The canonical statement of the hypothesis that would dominate AD research for 30+ years.',
      },
      {
        id: 'hardy-1992-framework',
        quote: 'John Hardy also gave insights into the making-of of the 1992 Science paper, which was "the igniting spark of an entire research field (Alzheimer\'s amyloid biology) that has dominated the field to date." Apparently, "the review took possibly a week to write."',
        usedIn: ['timeline'],
        context: 'Shows how quickly the foundational paper was written—and how long its influence lasted.',
      },
      {
        id: 'hardy-1992-intent',
        quote: 'Hardy later noted that "the article in Science was intended to generate ideas and act as a framework for a research agenda, not to be a definitive statement."',
        usedIn: ['frameworks'],
        context: 'Hardy\'s own admission that the hypothesis was a framework, not proven fact—often forgotten.',
      },
    ],
  },

  {
    id: 'goate-1991',
    type: 'journal',
    authors: ['Alison Goate', 'Marie-Christine Chartier-Harlin', 'Mike Mullan', 'et al.'],
    title: 'Segregation of a missense mutation in the amyloid precursor protein gene with familial Alzheimer\'s disease',
    publication: 'Nature',
    year: 1991,
    volume: '349',
    pages: '704-706',
    doi: '10.1038/349704a0',
    url: 'https://www.nature.com/articles/349704a0',
    citations: [
      {
        id: 'goate-1991-mutation',
        quote: 'The researchers demonstrated that in a kindred which shows linkage to chromosome 21 markers, there is a point mutation in the APP gene. This mutation causes an amino-acid substitution (Val→Ile) close to the carboxy terminus of the β-amyloid peptide.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The genetic evidence that seemed to "prove" the amyloid hypothesis—though it only applies to rare familial cases.',
      },
      {
        id: 'goate-1991-familial',
        quote: 'In 1991, Dr. Goate and colleagues identified mutations in the amyloid precursor protein (APP) gene on chromosome 21. The mutation was found to be linked to inherited cases of early-onset Alzheimer\'s disease.',
        usedIn: ['timeline'],
        context: 'Documents the discovery that linked APP mutations to familial AD.',
      },
    ],
  },
];
