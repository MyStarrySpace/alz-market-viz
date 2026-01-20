// Alternative Hypotheses and Frameworks in Alzheimer's Research
// Includes: ALTERNATIVE FRAMEWORKS (SIDELINED), THE CHOLINERGIC HYPOTHESIS (extended), THE TAU HYPOTHESIS,
// THE INFECTION HYPOTHESIS, THE NEUROINFLAMMATION HYPOTHESIS, VASCULAR HYPOTHESIS, METABOLIC HYPOTHESIS,
// MITOCHONDRIAL HYPOTHESIS (additional sources)

import { Source } from './types';

export const hypothesesSources: Source[] = [
  // ============================================
  // ALTERNATIVE FRAMEWORKS (SIDELINED)
  // ============================================
  {
    id: 'delatorre-1993',
    type: 'journal',
    authors: ['Jack C. de la Torre', 'T. Mussivand'],
    title: 'Can disturbed brain microcirculation cause Alzheimer\'s disease?',
    publication: 'Neurological Research',
    year: 1993,
    volume: '15',
    pages: '146-153',
    doi: '10.1080/01616412.1993.11740127',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8103579/',
    citations: [
      {
        id: 'delatorre-1993-hypothesis',
        quote: 'In 1993, de la Torre first advanced the concept of AD as a vascular disorder with neurodegenerative consequences in a series of basic and clinical papers that culminated in the CATCH (critically-attained threshold of cerebral hypoperfusion) vascular hypothesis of AD.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The first major alternative to amyloid—proposing blood flow as the primary problem.',
      },
      {
        id: 'delatorre-1993-experiment',
        quote: 'In 1993, de la Torre designed a series of experiments on young and old rats subjected to chronic brain hypoperfusion via carotid artery occlusion. At various time intervals ranging from 1 to 6 months, spatial memory, histopathology, cellular, molecular, and neurophysiological changes were measured in these animals. The experimental rat findings obtained, together with a careful review of the clinical literature, provided support to the premise that reduced blood flow to the brain seemed to ultimately induce cognitive dysfunction.',
        usedIn: ['frameworks'],
        context: 'Experimental evidence supporting the vascular hypothesis—largely ignored for decades.',
      },
    ],
  },

  {
    id: 'swerdlow-khan-2004',
    type: 'journal',
    authors: ['Russell H. Swerdlow', 'Shaharyar M. Khan'],
    title: 'A "mitochondrial cascade hypothesis" for sporadic Alzheimer\'s disease',
    publication: 'Medical Hypotheses',
    year: 2004,
    volume: '63',
    pages: '8-20',
    doi: '10.1016/j.mehy.2003.12.045',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15193340/',
    citations: [
      {
        id: 'swerdlow-2004-hypothesis',
        quote: 'The core assumptions were that a person\'s genes determine baseline mitochondrial function and durability, this durability determines how mitochondria change with advancing age, and critical changes in mitochondrial function initiate other pathologies characteristic of AD.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The mitochondrial hypothesis—proposing energy failure as upstream of amyloid.',
      },
      {
        id: 'swerdlow-2004-contrast',
        quote: 'The leading AD molecular paradigm, the "amyloid cascade hypothesis," is based on studies of rare autosomal dominant variants and does not specify what initiates the common late-onset, sporadic form.',
        usedIn: ['frameworks'],
        context: 'A direct critique: amyloid hypothesis explains only rare familial cases, not the 95%+ sporadic cases.',
      },
      {
        id: 'swerdlow-2004-reversal',
        quote: 'The mitochondrial cascade hypothesis unequivocally states that in sporadic, late-onset AD, mitochondrial function affects amyloid precursor protein (APP) expression, APP processing, or beta amyloid (Aβ) accumulation, and argues that if an amyloid cascade truly exists, mitochondrial function triggers it.',
        usedIn: ['frameworks'],
        context: 'Flips the causal arrow: mitochondria drive amyloid, not vice versa.',
      },
    ],
  },

  {
    id: 'delamonte-2005',
    type: 'journal',
    authors: ['Suzanne M. de la Monte', 'Jack R. Wands'],
    title: 'Review of insulin and insulin-like growth factor expression, signaling, and malfunction in the central nervous system: relevance to Alzheimer\'s disease',
    publication: 'Journal of Alzheimer\'s Disease',
    year: 2005,
    volume: '7',
    pages: '45-61',
    doi: '10.3233/JAD-2005-7106',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15750214/',
    citations: [
      {
        id: 'delamonte-2005-type3',
        quote: 'In 2005, researchers Suzanne de la Monte and Jack Wands at Brown University introduced the term "Type 3 Diabetes," proposing that insulin resistance and insulin deficiency in the brain contribute directly to Alzheimer\'s disease.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The "Type 3 Diabetes" framing—AD as fundamentally a metabolic disease.',
      },
      {
        id: 'delamonte-2005-discovery',
        quote: 'Dr. de la Monte\'s group discovered that in Alzheimer\'s disease, neurodegeneration correlates with brain insulin deficiency and brain insulin resistance. Since these intrinsic abnormalities closely resemble Type 1 and/or Type 2 diabetes mellitus, but occur in the absence of pancreatic disease, Type 2 diabetes, or metabolic syndrome, they coined the term "Type 3 diabetes" to refer to the brain-specific form of diabetes associated with Alzheimer\'s.',
        usedIn: ['frameworks'],
        context: 'Explains the rationale for the Type 3 Diabetes concept.',
      },
      {
        id: 'delamonte-2005-serendipity',
        quote: 'In the early 2000s, Suzanne de la Monte knocked out the insulin receptor function in the brain with a "serendipitous" result: "I was like, \'Oh my gosh, this made Alzheimer\'s,\'" she said.',
        usedIn: ['frameworks'],
        context: 'The accidental discovery that brain insulin resistance produces AD-like pathology.',
      },
    ],
  },

  {
    id: 'nixon-2022',
    type: 'journal',
    authors: ['Ju-Hyun Lee', 'Dun-Sheng Yang', 'Chris N. Goulbourne', 'et al.'],
    title: 'Faulty autolysosome acidification in Alzheimer\'s disease mouse models induces autophagic build-up of Aβ in neurons, yielding senile plaques',
    publication: 'Nature Neuroscience',
    year: 2022,
    volume: '25',
    pages: '688-701',
    doi: '10.1038/s41593-022-01084-8',
    url: 'https://www.nature.com/articles/s41593-022-01084-8',
    citations: [
      {
        id: 'nixon-2022-panthos',
        quote: 'In more compromised yet still intact neurons, profuse Aβ-positive autophagic vacuoles (AVs) pack into large membrane blebs forming flower-like perikaryal rosettes. This unique pattern, termed PANTHOS (poisonous anthos (flower)), is also present in AD brains.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The PANTHOS discovery—plaques form INSIDE neurons, contradicting the extracellular amyloid model.',
      },
      {
        id: 'nixon-2022-origin',
        quote: 'All the plaques that develop in these mouse models originated from the death of PANTHOS neurons. Once the cell dies, the ghost becomes the plaque outside the cell.',
        usedIn: ['frameworks'],
        context: 'Reverses the causality: plaques are tombstones of neurons killed by lysosomal failure, not external attackers.',
      },
      {
        id: 'nixon-2022-lysosome',
        quote: 'The bottom line is the importance of lysosome dysfunction at the earliest possible stage of Alzheimer\'s. This connects with the genetics. The APP fragment C99, inhibits the acidification process. When it accumulates, it actually sets a vicious cycle to further de-acidify the lysosome.',
        usedIn: ['frameworks'],
        context: 'Places lysosomal dysfunction as the critical upstream event.',
      },
    ],
  },

  {
    id: 'depp-nave-2023',
    type: 'journal',
    authors: ['Constanze Depp', 'Ting Sun', 'Andrew Octavian Sasmita', 'et al.'],
    title: 'Myelin dysfunction drives amyloid-β deposition in models of Alzheimer\'s disease',
    publication: 'Nature',
    year: 2023,
    volume: '618',
    pages: '349-357',
    doi: '10.1038/s41586-023-06120-6',
    url: 'https://www.nature.com/articles/s41586-023-06120-6',
    citations: [
      {
        id: 'nave-2023-title',
        quote: 'The study identified genetic pathways of myelin dysfunction and demyelinating injuries as potent drivers of amyloid deposition in mouse models of AD. Mechanistically, myelin dysfunction causes the accumulation of the Aβ-producing machinery within axonal swellings and increases the cleavage of cortical amyloid precursor protein.',
        usedIn: ['timeline', 'frameworks'],
        context: 'Major 2023 finding: myelin dysfunction is UPSTREAM of amyloid—it drives deposition.',
      },
      {
        id: 'nave-2023-mechanism',
        quote: 'The authors identified two mechanisms linking myelin to plaques in mouse brain. One, damaged myelin drove production of Aβ, directly leading to deposits; two, microglia appeared to preferentially mop up degenerating myelin, ignoring plaques and allowing them to grow.',
        usedIn: ['frameworks'],
        context: 'The double hit: myelin damage increases amyloid production AND distracts clearance mechanisms.',
      },
      {
        id: 'nave-2023-conclusion',
        quote: 'The data suggest a working model whereby age-dependent structural defects of myelin promote Aβ plaque formation directly and indirectly and are therefore an upstream AD risk factor. Improving oligodendrocyte health and myelin integrity could be a promising target to delay development and slow progression of AD.',
        usedIn: ['frameworks'],
        context: 'Proposes myelin as a therapeutic target—addressing upstream causes.',
      },
    ],
  },

  // ============================================
  // THE CHOLINERGIC HYPOTHESIS
  // ============================================
  {
    id: 'bartus-1982',
    type: 'journal',
    authors: ['Raymond T. Bartus', 'Reginald L. Dean III', 'Bernard Beer', 'Arnold S. Lippa'],
    title: 'The cholinergic hypothesis of geriatric memory dysfunction',
    publication: 'Science',
    year: 1982,
    volume: '217',
    pages: '408-414',
    doi: '10.1126/science.7046051',
    url: 'https://pubmed.ncbi.nlm.nih.gov/7046051/',
    citations: [
      {
        id: 'bartus-1982-hypothesis',
        quote: 'Significant cholinergic dysfunctions occur in the aged and demented central nervous system, relationships between these changes and loss of memory exist.',
        usedIn: ['timeline'],
        context: 'The formal statement of the cholinergic hypothesis—the first mechanistic theory of AD.',
      },
      {
        id: 'bartus-1982-evidence',
        quote: 'Similar memory deficits can be artificially induced by blocking cholinergic mechanisms in young subjects, and under certain tightly controlled conditions reliable memory improvements in aged subjects can be achieved after cholinergic stimulation.',
        usedIn: ['timeline'],
        context: 'Key evidence: you can induce and reverse memory deficits by manipulating acetylcholine.',
      },
    ],
  },

  {
    id: 'tacrine-fda-1993',
    type: 'website',
    authors: ['FDA'],
    title: 'Cognex (tacrine) Drug Label',
    publication: 'FDA Drugs@FDA Database',
    year: 1993,
    url: 'https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=020690',
    citations: [
      {
        id: 'tacrine-approval',
        quote: 'Cognex (tacrine hydrochloride) is indicated for the treatment of mild to moderate dementia of the Alzheimer\'s type.',
        usedIn: ['timeline'],
        context: 'The cholinergic hypothesis delivers the first approved AD drug.',
      },
    ],
  },

  // ============================================
  // THE TAU HYPOTHESIS
  // ============================================
  {
    id: 'braak-braak-1991',
    type: 'journal',
    authors: ['Heiko Braak', 'Eva Braak'],
    title: 'Neuropathological stageing of Alzheimer-related changes',
    publication: 'Acta Neuropathologica',
    year: 1991,
    volume: '82',
    pages: '239-259',
    doi: '10.1007/BF00308809',
    url: 'https://pubmed.ncbi.nlm.nih.gov/1759558/',
    citations: [
      {
        id: 'braak-1991-staging',
        quote: 'Neurofibrillary tangles in AD patients appear first in the transentorhinal cortex or the entorhinal cortex in the medial temporal lobe (Braak stages I and II), then gradually progress to the hippocampal region (Braak stages III and IV), and finally involve the association neocortex or the primary areas of the neocortex (Braak stages V and VI).',
        usedIn: ['timeline'],
        context: 'The 6-stage system showing predictable tau spread through the brain.',
      },
      {
        id: 'braak-1991-correlation',
        quote: 'Braak neurofibrillary tangle stage is strongly associated with cognitive impairment. This pattern of NFT progression closely resembles the clinical course of AD, indicating that the spread of the tau pathology is deeply associated with neurological dysfunction.',
        usedIn: ['timeline'],
        context: 'Critical finding: tau correlates with clinical symptoms better than amyloid.',
      },
    ],
  },

  {
    id: 'tauvid-fda-2020',
    type: 'website',
    authors: ['FDA'],
    title: 'FDA Approves First Drug to Image Tau Pathology in Patients Being Evaluated for Alzheimer\'s Disease',
    publication: 'FDA',
    year: 2020,
    url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-first-drug-image-tau-pathology-patients-being-evaluated-alzheimers-disease',
    citations: [
      {
        id: 'tauvid-approval',
        quote: 'The U.S. Food and Drug Administration approved Tauvid (flortaucipir F 18 injection) for use with positron emission tomography (PET) imaging of the brain to estimate the density and distribution of aggregated tau neurofibrillary tangles.',
        usedIn: ['timeline'],
        context: 'First tau PET imaging agent approved—enables visualization of tau in living patients.',
      },
    ],
  },

  {
    id: 'frost-diamond-2009',
    type: 'journal',
    authors: ['Bess Frost', 'Rachel L. Jacks', 'Marc I. Diamond'],
    title: 'Propagation of tau misfolding from the outside to the inside of a cell',
    publication: 'Journal of Biological Chemistry',
    year: 2009,
    volume: '284',
    pages: '12845-12852',
    doi: '10.1074/jbc.M808759200',
    url: 'https://www.jbc.org/article/S0021-9258(19)38139-4/fulltext',
    citations: [
      {
        id: 'frost-2009-spreading',
        quote: 'We now report that tau fibrils, when applied to the outside of cultured cells, are internalized and induce fibrillization of intracellular full-length tau.',
        usedIn: ['timeline'],
        context: 'Discovery that tau spreads like a prion—misfolded tau templates normal tau.',
      },
    ],
  },

  {
    id: 'semorinemab-failure-2021',
    type: 'news',
    authors: ['Alzforum'],
    title: 'Semorinemab Misses Primary Endpoint in Phase 2 Trial',
    publication: 'Alzforum',
    year: 2021,
    url: 'https://www.alzforum.org/news/research-news/semorinemab-misses-primary-endpoint-phase-2-trial',
    citations: [],
  },

  // ============================================
  // THE INFECTION HYPOTHESIS
  // ============================================
  {
    id: 'itzhaki-1997',
    type: 'journal',
    authors: ['Ruth F. Itzhaki', 'Wen-Rong Lin', 'Denise Shang', 'Gordon K. Wilcock', 'Brian Faragher', 'Gordon A. Jamieson'],
    title: 'Herpes simplex virus type 1 in brain and risk of Alzheimer\'s disease',
    publication: 'The Lancet',
    year: 1997,
    volume: '349',
    pages: '241-244',
    doi: '10.1016/S0140-6736(96)10149-5',
    url: 'https://pubmed.ncbi.nlm.nih.gov/9014911/',
    citations: [
      {
        id: 'itzhaki-1997-risk',
        quote: 'HSV-1 infection in postmortem elderly brains in combination with the presence of the APOE-ε4 allele of the APOE gene increases the risk of AD by a factor of 12, with the coexistence of both factors accounting for over half the AD subjects in the study.',
        usedIn: ['timeline'],
        context: 'The 12-fold risk increase when herpes and APOE4 combine.',
      },
      {
        id: 'itzhaki-1997-synergy',
        quote: 'The first studies identified latent virus in both normal and AD brains but postulated that differences in viral expression and susceptibility might underlie HSV-1 contribution to AD. Itzhaki and colleagues then demonstrated that the presence of APOE4 and HSV-1 together was a stronger risk factor for the development of AD than either factor on its own.',
        usedIn: ['timeline'],
        context: 'The synergy between infection and genetic susceptibility.',
      },
    ],
  },

  {
    id: 'dominy-gingivalis-2019',
    type: 'journal',
    authors: ['Stephen S. Dominy', 'Casey Lynch', 'Florian Ermini', 'et al.'],
    title: 'Porphyromonas gingivalis in Alzheimer\'s disease brains: Evidence for disease causation and treatment with small-molecule inhibitors',
    publication: 'Science Advances',
    year: 2019,
    volume: '5',
    pages: 'eaau3333',
    doi: '10.1126/sciadv.aau3333',
    url: 'https://www.science.org/doi/10.1126/sciadv.aau3333',
    citations: [
      {
        id: 'dominy-2019-presence',
        quote: 'Porphyromonas gingivalis, the keystone pathogen in chronic periodontitis, was identified in the brain of Alzheimer\'s disease patients. Toxic proteases from the bacterium called gingipains were also identified in the brain of Alzheimer\'s patients.',
        usedIn: ['timeline'],
        context: 'The gum disease bacterium found directly in AD brains.',
      },
      {
        id: 'dominy-2019-correlation',
        quote: 'Gingipain levels correlated with tau and ubiquitin pathology.',
        usedIn: ['timeline'],
        context: 'Bacterial toxins correlate with the hallmarks of AD.',
      },
      {
        id: 'dominy-2019-mice',
        quote: 'Oral P. gingivalis infection in mice resulted in brain colonization and increased production of Aβ1–42, a component of amyloid plaques. Further, gingipains were neurotoxic in vivo and in vitro, exerting detrimental effects on tau.',
        usedIn: ['timeline'],
        context: 'Experimental proof: infecting mice produces AD-like pathology.',
      },
    ],
  },

  {
    id: 'moir-2010',
    type: 'journal',
    authors: ['Stephanie J. Soscia', 'James E. Kirby', 'Kevin J. Washicosky', 'et al.'],
    title: 'The Alzheimer\'s disease-associated amyloid β-protein is an antimicrobial peptide',
    publication: 'PLoS One',
    year: 2010,
    volume: '5',
    pages: 'e9505',
    doi: '10.1371/journal.pone.0009505',
    url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0009505',
    citations: [
      {
        id: 'moir-2010-antimicrobial',
        quote: 'Our findings suggest Aβ is a normal component of the innate immune system. Aβ exhibited antimicrobial activity against eight common and clinically relevant microorganisms with a potency equivalent to, and in some cases greater than, LL-37.',
        usedIn: ['timeline'],
        context: 'Paradigm-shifting discovery: Aβ is an antimicrobial defense peptide.',
      },
    ],
  },

  {
    id: 'tzeng-antivirals-2018',
    type: 'journal',
    authors: ['Tzeng NS', 'Chung CH', 'Lin FH', 'et al.'],
    title: 'Anti-herpetic Medications and Reduced Risk of Dementia in Patients with Herpes Simplex Virus Infections—a Nationwide, Population-Based Cohort Study in Taiwan',
    publication: 'Neurotherapeutics',
    year: 2018,
    volume: '15',
    pages: '417-429',
    doi: '10.1007/s13311-018-0611-x',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29488144/',
    citations: [
      {
        id: 'tzeng-2018-result',
        quote: 'Among 33,448 subjects with HSV infections, those who were treated with anti-herpetic medications showed a 90% lower risk of dementia compared to those who were not treated.',
        usedIn: ['timeline'],
        context: 'Massive population study showing antivirals may prevent Alzheimer\'s.',
      },
    ],
  },

  // ============================================
  // THE NEUROINFLAMMATION HYPOTHESIS
  // ============================================
  {
    id: 'tobinick-2006',
    type: 'journal',
    authors: ['Edward L. Tobinick', 'Hyman Gross', 'Allan Weinberger', 'Howard Cohen'],
    title: 'TNF-alpha Modulation for Treatment of Alzheimer\'s Disease: A 6-Month Pilot Study',
    publication: 'Medscape General Medicine',
    year: 2006,
    volume: '8',
    pages: '25',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1785182/',
    citations: [
      {
        id: 'tobinick-2006-tnf',
        quote: 'Tumor necrosis factor (TNF)-alpha, a proinflammatory cytokine, has been implicated in the pathogenesis of AD. 25-fold elevated levels of TNF-alpha in the cerebrospinal fluid of patients with AD.',
        usedIn: ['timeline'],
        context: 'TNF-alpha is dramatically elevated in AD brains—inflammation as cause.',
      },
      {
        id: 'tobinick-2006-improvement',
        quote: '15 patients with mild-to-severe AD were treated for 6 months with etanercept, 25-50 mg, once weekly by perispinal administration. MMSE increased by 2.13 ± 2.23, ADAS-Cog improved by 5.48 ± 5.08. There was significant improvement with treatment through 6 months.',
        usedIn: ['timeline'],
        context: 'The pilot study results—improvement instead of decline.',
      },
      {
        id: 'tobinick-2006-rapid',
        quote: 'Rapid clinical improvement, within minutes of dosing, has been observed on a repeated basis in multiple patients.',
        usedIn: ['timeline'],
        context: 'The startling finding: some patients improved within minutes.',
      },
    ],
  },

  {
    id: 'mcgeer-nsaids-1996',
    type: 'journal',
    authors: ['Patrick L. McGeer', 'Edith G. McGeer'],
    title: 'Anti-inflammatory drugs in the fight against Alzheimer\'s disease',
    publication: 'Annals of the New York Academy of Sciences',
    year: 1996,
    volume: '777',
    pages: '213-220',
    doi: '10.1111/j.1749-6632.1996.tb34421.x',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8624087/',
    citations: [
      {
        id: 'mcgeer-1996-risk',
        quote: 'Epidemiological studies indicate that long-term treatment with anti-inflammatory drugs reduces the risk of AD by 50-80%.',
        usedIn: ['timeline'],
        context: 'Early evidence that inflammation is causal—NSAIDs dramatically reduce AD risk.',
      },
    ],
  },

  {
    id: 'trem2-jonsson-2013',
    type: 'journal',
    authors: ['Thorlakur Jonsson', 'Hreinn Stefansson', 'Stacy Steinberg', 'et al.'],
    title: 'Variant of TREM2 associated with the risk of Alzheimer\'s disease',
    publication: 'New England Journal of Medicine',
    year: 2013,
    volume: '368',
    pages: '107-116',
    doi: '10.1056/NEJMoa1211103',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1211103',
    citations: [
      {
        id: 'trem2-2013-risk',
        quote: 'A rare variant (rs75932628-T) of TREM2, encoding a substitution of arginine for histidine at residue 47 (R47H), was found to confer a significant risk of Alzheimer\'s disease with an odds ratio of 2.92.',
        usedIn: ['timeline'],
        context: 'TREM2 variant as strong as APOE4—microglia are central to AD.',
      },
    ],
  },

  // ============================================
  // VASCULAR HYPOTHESIS - ADDITIONAL SOURCES
  // ============================================
  {
    id: 'snowdon-nun-1997',
    type: 'journal',
    authors: ['David A. Snowdon', 'Lydia H. Greiner', 'James A. Mortimer', 'et al.'],
    title: 'Brain infarction and the clinical expression of Alzheimer disease: The Nun Study',
    publication: 'JAMA',
    year: 1997,
    volume: '277',
    pages: '813-817',
    doi: '10.1001/jama.1997.03540340047031',
    url: 'https://pubmed.ncbi.nlm.nih.gov/9052711/',
    citations: [
      {
        id: 'snowdon-1997-infarcts',
        quote: 'Among participants meeting neuropathological criteria for AD, those with brain infarcts had poorer cognitive function and a higher prevalence of dementia than those without infarcts. Only 57% of those with abundant neurofibrillary tangles but no infarcts had clinical dementia.',
        usedIn: ['timeline'],
        context: 'Landmark finding: many with AD pathology had no dementia—strokes made the difference.',
      },
    ],
  },

  {
    id: 'zlokovic-bbb-2011',
    type: 'journal',
    authors: ['Berislav V. Zlokovic'],
    title: 'Neurovascular pathways to neurodegeneration in Alzheimer\'s disease and other disorders',
    publication: 'Nature Reviews Neuroscience',
    year: 2011,
    volume: '12',
    pages: '723-738',
    doi: '10.1038/nrn3114',
    url: 'https://www.nature.com/articles/nrn3114',
    citations: [
      {
        id: 'zlokovic-2011-bbb',
        quote: 'Vascular dysfunction and blood-brain barrier (BBB) breakdown initiate a faulty clearance of amyloid-β from brain to blood and trigger multiple pathways of neurodegeneration before cognitive decline.',
        usedIn: ['timeline'],
        context: 'BBB dysfunction is upstream of amyloid—vascular damage comes first.',
      },
    ],
  },

  // ============================================
  // METABOLIC HYPOTHESIS - ADDITIONAL SOURCES
  // ============================================
  {
    id: 'craft-insulin-2012',
    type: 'journal',
    authors: ['Suzanne Craft', 'Laura D. Baker', 'Thomas J. Montine', 'et al.'],
    title: 'Intranasal insulin therapy for Alzheimer disease and amnestic mild cognitive impairment',
    publication: 'Archives of Neurology',
    year: 2012,
    volume: '69',
    pages: '29-38',
    doi: '10.1001/archneurol.2011.233',
    url: 'https://pubmed.ncbi.nlm.nih.gov/21911655/',
    citations: [
      {
        id: 'craft-2012-memory',
        quote: 'The 20 IU of insulin improved delayed memory and preserved caregiver-rated functional ability. Treatment was associated with preserved or improved PET scans for treated patients compared with placebo.',
        usedIn: ['timeline'],
        context: 'Nasal insulin improves memory and metabolism in AD patients.',
      },
    ],
  },

  {
    id: 'reger-ketones-2004',
    type: 'journal',
    authors: ['Mark A. Reger', 'Samuel T. Henderson', 'Cathy Hale', 'et al.'],
    title: 'Effects of β-hydroxybutyrate on cognition in memory-impaired adults',
    publication: 'Neurobiology of Aging',
    year: 2004,
    volume: '25',
    pages: '311-314',
    doi: '10.1016/S0197-4580(03)00087-3',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15123336/',
    citations: [
      {
        id: 'reger-2004-memory',
        quote: 'Higher ketone values were associated with greater improvement in paragraph recall relative to placebo. Elevated ketone body levels may have cognitive enhancing properties.',
        usedIn: ['timeline'],
        context: 'Ketones improve cognition when glucose metabolism fails in AD.',
      },
    ],
  },

  // ============================================
  // MITOCHONDRIAL HYPOTHESIS - ADDITIONAL SOURCES
  // ============================================
  {
    id: 'swerdlow-cybrid-1997',
    type: 'journal',
    authors: ['Russell H. Swerdlow', 'James K. Parks', 'David S. Cassarino', 'et al.'],
    title: 'Cybrids in Alzheimer\'s disease: a cellular model of the disease?',
    publication: 'Neurology',
    year: 1997,
    volume: '49',
    pages: '918-925',
    doi: '10.1212/WNL.49.4.918',
    url: 'https://pubmed.ncbi.nlm.nih.gov/9339668/',
    citations: [
      {
        id: 'swerdlow-1997-cybrid',
        quote: 'Cybrids containing AD platelet mitochondria showed reduced complex IV activity, increased reactive oxygen species, and altered calcium homeostasis compared to control cybrids.',
        usedIn: ['timeline'],
        context: 'AD mitochondria alone induce disease features—mitochondria are upstream.',
      },
    ],
  },

  {
    id: 'fdg-pet-early-2020',
    type: 'journal',
    authors: ['Lisa Mosconi', 'Mony J. de Leon', 'Randolph D. Andrews', 'et al.'],
    title: 'Brain glucose hypometabolism and oxidative stress in preclinical Alzheimer\'s disease',
    publication: 'Annals of the New York Academy of Sciences',
    year: 2008,
    volume: '1147',
    pages: '180-195',
    doi: '10.1196/annals.1427.007',
    url: 'https://pubmed.ncbi.nlm.nih.gov/19076441/',
    citations: [
      {
        id: 'fdg-2020-earliest',
        quote: 'FDG-PET reductions are among the earliest signs of AD, appearing decades before clinical symptoms, and precede amyloid deposition in some brain regions.',
        usedIn: ['timeline'],
        context: 'Glucose metabolism decline (mitochondrial dysfunction) is the earliest change.',
      },
    ],
  },

  // ============================================
  // INTEGRATIVE / CLEARANCE FRAMEWORKS
  // ============================================
  {
    id: 'izrael-frenkel-2026',
    type: 'journal',
    authors: ['Michal Izrael', 'Orli Miriam Frenkel'],
    title: 'The Cerebral Clearance Cascade as a Driver of Alzheimer\'s Disease Progression',
    publication: 'Journal of Dementia and Alzheimer\'s Disease',
    year: 2026,
    volume: '3(1)',
    pages: '1',
    doi: '10.3390/jdad3010001',
    url: 'https://www.mdpi.com/3042-4518/3/1/1',
    citations: [
      {
        id: 'izrael-2026-cascade',
        quote: 'This narrative review presents an integrated model linking dysfunction across these systems to establish a "cerebral clearance cascade" that could drive AD progression.',
        usedIn: ['timeline', 'frameworks'],
        context: 'Proposes unified framework integrating CP, CSF, ISF, glymphatic, and BBB systems.',
      },
      {
        id: 'izrael-2026-intervention',
        quote: 'The cerebral clearance cascade positions early intervention targeting CP function, CSF dynamics, ISF flow, glymphatic activity, and BBB integrity as potentially disease-modifying approaches.',
        usedIn: ['frameworks'],
        context: 'Places clearance mechanisms as actionable therapeutic targets.',
      },
      {
        id: 'izrael-2026-cp',
        quote: 'The choroid plexus serves as both the primary source of CSF production and a key regulator of CSF composition, producing approximately 500 mL of CSF daily in humans.',
        usedIn: ['frameworks'],
        context: 'Highlights choroid plexus as critical but understudied component.',
      },
      {
        id: 'izrael-2026-synthesis',
        quote: 'The five interconnected systems that constitute the brain\'s waste clearance network: choroid plexus and CSF production, CSF circulation and drainage pathways, ISF dynamics, glymphatic system, and BBB transport mechanisms.',
        usedIn: ['frameworks'],
        context: 'Synthesizes five clearance systems into unified model.',
      },
    ],
  },
];
