// Genetic Discoveries Sources
// Includes: GENETIC DISCOVERIES

import { Source } from './types';

export const geneticsSources: Source[] = [
  // ============================================
  // GENETIC DISCOVERIES
  // ============================================
  {
    id: 'roses-apoe4-1993',
    type: 'journal',
    authors: ['Warren J. Strittmatter', 'Ann M. Saunders', 'Donald Schmechel', 'Margaret Pericak-Vance', 'Jan Enghild', 'Guy S. Salvesen', 'Allen D. Roses'],
    title: 'Gene dose of apolipoprotein E type 4 allele and the risk of Alzheimer\'s disease in late onset families',
    publication: 'Science',
    year: 1993,
    volume: '261',
    pages: '921-923',
    doi: '10.1126/science.8346443',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8346443/',
    citations: [
      {
        id: 'roses-1993-risk',
        quote: 'The apolipoprotein E type 4 allele (APOE-epsilon 4) is genetically associated with the common late onset familial and sporadic forms of Alzheimer\'s disease.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The discovery that APOE4 is the major genetic risk factor for late-onset AD.',
      },
      {
        id: 'roses-1993-dose',
        quote: 'Risk for AD increased from 20% to 90% and mean age at onset decreased from 84 to 68 years with increasing number of APOE-epsilon 4 alleles in 42 families with late onset AD.',
        usedIn: ['timeline'],
        context: 'Dose-dependent effect of APOE4 on AD risk.',
      },
      {
        id: 'roses-1993-homozygosity',
        quote: 'Homozygosity for APOE-epsilon 4 was virtually sufficient to cause AD by age 80.',
        usedIn: ['timeline'],
        context: 'Near-complete penetrance in APOE4 homozygotes.',
      },
    ],
  },

  {
    id: 'sherrington-psen1-1995',
    type: 'journal',
    authors: ['R. Sherrington', 'E. I. Rogaev', 'Y. Liang', 'et al.'],
    title: 'Cloning of a gene bearing missense mutations in early-onset familial Alzheimer\'s disease',
    publication: 'Nature',
    year: 1995,
    volume: '375',
    pages: '754-760',
    doi: '10.1038/375754a0',
    url: 'https://www.nature.com/articles/375754a0',
    citations: [
      {
        id: 'sherrington-1995-psen1',
        quote: 'Genetic linkage studies placed a gene causing early onset familial Alzheimer\'s disease (FAD) on chromosome 14q24.3. Five mutations within the S182 (Presenilin 1: PS-1) gene, which maps to this region, were reported in several early onset FAD kindreds.',
        usedIn: ['timeline'],
        context: 'Discovery of PSEN1 as a cause of familial AD.',
      },
    ],
  },
];
