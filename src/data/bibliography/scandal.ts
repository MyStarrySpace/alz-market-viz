// The Lesne Scandal Sources
// Includes: THE LESNÉ SCANDAL

import { Source } from './types';

export const scandalSources: Source[] = [
  // ============================================
  // THE LESNÉ SCANDAL
  // ============================================
  {
    id: 'lesne-2006',
    type: 'journal',
    authors: ['Sylvain Lesné', 'Ming Teng Koh', 'Linda Kotilinek', 'et al.'],
    title: 'A specific amyloid-β protein assembly in the brain impairs memory',
    publication: 'Nature',
    year: 2006,
    volume: '440',
    pages: '352-357',
    doi: '10.1038/nature04533',
    url: 'https://www.nature.com/articles/nature04533',
    citations: [
      {
        id: 'lesne-2006-claim',
        quote: 'The 2006 paper suggested an amyloid beta (Aβ) protein called Aβ*56 could cause Alzheimer\'s. The authors reported that Aβ*56 was present in mice genetically engineered to develop an Alzheimer\'s-like condition, and that it built up in step with their cognitive decline.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The original claim of Aβ*56 as the toxic species—later shown to be based on manipulated data.',
      },
      {
        id: 'lesne-2006-influence',
        quote: 'As Science reported in 2022, "The Nature paper has been cited in about 2300 scholarly articles—more than all but four other Alzheimer\'s basic research reports published since 2006."',
        usedIn: ['timeline', 'caseStudies'],
        context: 'Documents the enormous influence of this now-retracted paper.',
      },
    ],
  },

  {
    id: 'piller-2022',
    type: 'news',
    authors: ['Charles Piller'],
    title: 'Blots on a field?',
    publication: 'Science',
    year: 2022,
    volume: '377',
    pages: '358-363',
    doi: '10.1126/science.add9993',
    url: 'https://www.science.org/content/article/potential-fabrication-research-images-threatens-key-theory-alzheimers-disease',
    citations: [
      {
        id: 'piller-2022-investigation',
        quote: 'In July 2022, a detailed article in Science described the suspicions of neuroscientist Matthew Schrag, who concluded that the data which showed Lesné\'s findings of the Aβ*56 oligomer were an "elaborate mirage." Two independent image analysts, Elizabeth Bik and Jana Christopher, agreed with Schrag\'s suspicions, calling the images on Western Blot "dubious."',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The 2022 Science investigation that exposed the manipulation.',
      },
      {
        id: 'piller-2022-scope',
        quote: 'Science found more than 20 "suspect" papers by Lesné and identified more than 70 instances of possible image tampering in his studies.',
        usedIn: ['caseStudies'],
        context: 'The scale of the suspected fraud.',
      },
    ],
  },

  {
    id: 'lesne-retraction-2024',
    type: 'journal',
    authors: ['Nature Editors'],
    title: 'Retraction Note: A specific amyloid-β protein assembly in the brain impairs memory',
    publication: 'Nature',
    year: 2024,
    volume: '631',
    pages: '240',
    doi: '10.1038/s41586-024-07691-8',
    url: 'https://www.nature.com/articles/s41586-024-07691-8',
    citations: [
      {
        id: 'lesne-retraction',
        quote: 'The authors wish to retract this Article. Concerns were raised regarding figures in the Article, including Fig. 2c and Supplementary Fig. 4. These figures showed excessive manipulation, including splicing, duplication and the use of an eraser tool. The data could not be verified from the records.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The exact retraction note wording from Nature—explicitly confirms image manipulation.',
      },
      {
        id: 'lesne-retraction-authors',
        quote: 'Ming Teng Koh, Linda Kotilinek, Rakez Kayed, Charles G. Glabe, Michela Gallagher and Karen H. Ashe agree with the retraction. Sylvain Lesné disagrees with the retraction.',
        usedIn: ['caseStudies'],
        context: 'All authors except Lesné agreed to retract. Lesné refused.',
      },
      {
        id: 'lesne-retraction-citations',
        quote: 'The paper had accumulated 2,518 citations by its retraction date of June 24, 2024, making it the second most highly cited retracted paper in history according to Retraction Watch.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'Quantifies the enormous downstream impact of the fraudulent paper.',
      },
      {
        id: 'lesne-retraction-delay',
        quote: '"It\'s unfortunate that it has taken 2 years to make the decision to retract," said Donna Wilcock, an Indiana University neuroscientist. "The evidence of manipulation was overwhelming."',
        usedIn: ['caseStudies'],
        context: 'The slow institutional response to clear evidence of fraud.',
      },
    ],
  },

  {
    id: 'lesne-resignation-2025',
    type: 'news',
    authors: ['Minnesota Reformer'],
    title: "Alzheimer's researcher alleged to have doctored images is leaving UMN",
    publication: 'Minnesota Reformer',
    year: 2025,
    url: 'https://minnesotareformer.com/briefs/alzheimers-researcher-alleged-to-have-doctored-images-is-leaving-umn/',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'lesne-resignation',
        quote: 'Sylvain Lesné resigned from his tenured position at the University of Minnesota effective March 1, 2025, after a UMN investigation flagged "data integrity" concerns in other articles he authored beyond the 2006 Nature paper.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The institutional consequences—Lesné lost his tenured position.',
      },
    ],
  },
];
