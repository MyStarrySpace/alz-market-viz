// Historical Timeline for Alzheimer's Research
// Tracks the evolution of hypotheses, key discoveries, and the sidelining of alternatives

export type TimelineEventType =
  | 'discovery' // Scientific breakthroughs
  | 'hypothesis' // New theoretical frameworks proposed
  | 'milestone' // Key confirmatory findings
  | 'failure' // Clinical trial failures, drug withdrawals
  | 'scandal' // Fraud, misconduct
  | 'approval' // Regulatory approvals
  | 'rejection'; // Regulatory rejections

export type FrameworkId =
  | 'amyloid'
  | 'vascular'
  | 'metabolic'
  | 'mitochondrial'
  | 'lysosomal'
  | 'myelin'
  | null; // For events not tied to a specific framework

export interface TimelineEvent {
  id: string;
  year: number;
  month?: number; // 1-12
  day?: number;
  title: string;
  shortTitle: string; // For compact timeline views
  description: string;
  dramaticDescription?: string; // More narrative version for storytelling
  type: TimelineEventType;
  framework: FrameworkId;
  significance: 'major' | 'supporting';
  sourceIds: string[]; // References to bibliography.ts
  citationIds?: string[]; // Specific citation IDs for quoted text
}

export const timelineEvents: TimelineEvent[] = [
  // ============================================
  // THE ORIGIN (1900s)
  // ============================================
  {
    id: 'alzheimer-discovers',
    year: 1906,
    month: 11,
    day: 3,
    title: 'Alois Alzheimer presents the first case—to complete indifference',
    shortTitle: 'First AD case',
    description:
      'At a psychiatry conference in Tübingen, Alois Alzheimer describes "a peculiar disease of the cortex" to 88 colleagues. The audience, eager for the next talk on "compulsive masturbation," sends him away without a single question. The chairman dismisses him: "Clearly there is no desire for discussion."',
    dramaticDescription:
      'A German psychiatrist stands before 88 colleagues and describes something no one has ever documented: strange clumps and tangled fibers in the brain of a deceased patient. The audience couldn\'t care less—they\'re waiting for the next presentation on compulsive masturbation. He has just described a disease that will one day affect 55 million people, and no one asks a single question.',
    type: 'discovery',
    framework: null,
    significance: 'major',
    sourceIds: ['alzheimer-1906', 'maurer-alzheimer-biography-2003'],
    citationIds: ['alzheimer-1906-presentation', 'alzheimer-1906-pathology', 'maurer-2003-reception', 'maurer-2003-chairman'],
  },

  // ============================================
  // THE MOLECULAR ERA (1980s)
  // ============================================
  {
    id: 'glenner-isolates-abeta',
    year: 1984,
    title: 'Glenner & Wong isolate amyloid-beta',
    shortTitle: 'Aβ isolated',
    description:
      'George Glenner and Caine Wong purify and sequence the amyloid-beta protein from AD brain plaques, revealing the molecular identity of the "clumps" Alzheimer saw 80 years earlier.',
    dramaticDescription:
      'For 80 years, no one knew what the plaques were made of. Now, two biochemists isolate a small protein—just 4 kilodaltons—that will consume billions of dollars and decades of research. They call it amyloid-beta. A target has emerged.',
    type: 'discovery',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['glenner-wong-1984'],
    citationIds: ['glenner-1984-isolation', 'glenner-1984-chromosome21'],
  },

  // ============================================
  // THE HYPOTHESIS TAKES HOLD (1990s)
  // ============================================
  {
    id: 'goate-app-mutation',
    year: 1991,
    title: 'First genetic mutation linked to familial AD',
    shortTitle: 'APP mutation',
    description:
      'Alison Goate discovers that mutations in the amyloid precursor protein (APP) gene on chromosome 21 cause early-onset familial Alzheimer\'s disease.',
    dramaticDescription:
      'A genetic smoking gun. Families with mutations in the APP gene—the gene that makes amyloid—inevitably develop Alzheimer\'s. For many, this is proof: amyloid must be the cause. What goes unnoticed: these families represent less than 1% of all AD cases.',
    type: 'milestone',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['goate-1991'],
    citationIds: ['goate-1991-mutation', 'goate-1991-familial'],
  },

  {
    id: 'hardy-amyloid-cascade',
    year: 1992,
    month: 4,
    day: 10,
    title: 'Hardy & Higgins publish the Amyloid Cascade Hypothesis',
    shortTitle: 'Amyloid hypothesis',
    description:
      'In a Science paper written in about a week, John Hardy and Gerald Higgins formally propose that amyloid-beta deposition is "the initial pathological event" in AD, triggering all downstream pathology.',
    dramaticDescription:
      'A one-page paper in Science, written in a week, becomes the foundation of a $50 billion research program. The amyloid cascade hypothesis: remove the plaques, cure the disease. It is elegant, testable, and fundable. The field locks in.',
    type: 'hypothesis',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['hardy-higgins-1992'],
    citationIds: ['hardy-1992-hypothesis', 'hardy-1992-framework'],
  },

  {
    id: 'roses-apoe4',
    year: 1993,
    title: 'APOE4 discovered as major genetic risk factor',
    shortTitle: 'APOE4 risk gene',
    description:
      'Allen Roses and colleagues at Duke discover that the APOE4 allele dramatically increases risk for late-onset Alzheimer\'s—the first major genetic risk factor for sporadic AD.',
    dramaticDescription:
      'A Duke team discovers what the amyloid hunters missed: a gene that increases AD risk by up to 15-fold. APOE4 carriers have 90% lifetime risk of AD. Two copies virtually guarantee the disease by age 80. This gene has nothing to do with amyloid production—it affects lipid metabolism and clearance.',
    type: 'discovery',
    framework: null,
    significance: 'major',
    sourceIds: ['roses-apoe4-1993'],
    citationIds: ['roses-1993-risk', 'roses-1993-dose', 'roses-1993-homozygosity'],
  },

  {
    id: 'delatorre-vascular',
    year: 1993,
    title: 'de la Torre proposes the vascular hypothesis',
    shortTitle: 'Vascular hypothesis',
    description:
      'Jack de la Torre publishes research showing chronic brain hypoperfusion can initiate neurodegeneration, proposing AD as primarily a vascular disorder.',
    dramaticDescription:
      'One year after the amyloid hypothesis is published, a dissenting voice emerges. Jack de la Torre proposes that reduced blood flow to the brain—not amyloid—initiates Alzheimer\'s. His experiments show hypoperfusion causes cognitive decline in rats. The field ignores him.',
    type: 'hypothesis',
    framework: 'vascular',
    significance: 'major',
    sourceIds: ['delatorre-1993'],
    citationIds: ['delatorre-1993-hypothesis', 'delatorre-1993-experiment'],
  },

  {
    id: 'presenilin-discovery',
    year: 1995,
    title: 'Presenilin genes discovered in familial AD',
    shortTitle: 'PSEN1/2 discovered',
    description:
      'Sherrington and colleagues discover mutations in presenilin 1 (PSEN1) on chromosome 14 cause familial AD. PSEN2 is discovered shortly after. Together with APP, these become the three known familial AD genes.',
    dramaticDescription:
      'Another genetic confirmation for amyloid: presenilin mutations cause familial AD. Presenilins are later found to be part of gamma-secretase, the enzyme that cuts APP to produce amyloid-beta. The genetic case for amyloid seems airtight. But these rare mutations still explain less than 5% of all AD cases.',
    type: 'discovery',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['sherrington-psen1-1995'],
    citationIds: ['sherrington-1995-psen1'],
  },

  // ============================================
  // THE ALTERNATIVES EMERGE (2000s)
  // ============================================
  {
    id: 'an1792-halted',
    year: 2002,
    month: 1,
    title: 'First Alzheimer\'s vaccine trial halted after brain inflammation',
    shortTitle: 'AN-1792 halted',
    description:
      'Elan\'s AN-1792 vaccine trial is suspended after 6% of patients develop meningoencephalitis (brain inflammation). The first attempt to translate the amyloid hypothesis into therapy ends in safety disaster.',
    dramaticDescription:
      'The amyloid hypothesis faces its first clinical test. The results are catastrophic. The vaccine successfully provokes an immune response against amyloid—but the immune system attacks the brain itself. 18 patients develop brain inflammation. Some suffer permanent neurological damage. The trial is terminated.',
    type: 'failure',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['an1792-alzforum'],
    citationIds: ['an1792-suspension', 'an1792-rate', 'an1792-termination'],
  },

  {
    id: 'swerdlow-mitochondrial',
    year: 2004,
    title: 'Swerdlow proposes the mitochondrial cascade hypothesis',
    shortTitle: 'Mitochondrial hypothesis',
    description:
      'Russell Swerdlow argues that mitochondrial dysfunction—not amyloid—is the primary driver of sporadic AD, noting the amyloid hypothesis only explains rare familial cases.',
    dramaticDescription:
      'A neurologist at Kansas points out an inconvenient truth: the amyloid hypothesis is based on rare genetic mutations affecting less than 5% of AD patients. What causes the other 95%? He proposes mitochondria—the cell\'s energy factories—fail first, and amyloid accumulates as a consequence. The field continues funding amyloid.',
    type: 'hypothesis',
    framework: 'mitochondrial',
    significance: 'major',
    sourceIds: ['swerdlow-khan-2004'],
    citationIds: ['swerdlow-2004-hypothesis', 'swerdlow-2004-contrast', 'swerdlow-2004-reversal'],
  },

  {
    id: 'delamonte-type3',
    year: 2005,
    title: 'de la Monte coins "Type 3 Diabetes"',
    shortTitle: 'Type 3 diabetes',
    description:
      'Suzanne de la Monte discovers that brain insulin resistance precedes amyloid and proposes AD as a metabolic disease—"Type 3 Diabetes."',
    dramaticDescription:
      'A researcher at Brown University knocks out insulin receptors in mouse brains. "Oh my gosh," she says, "this made Alzheimer\'s." She coins the term Type 3 Diabetes: AD as a disease of brain starvation, not protein aggregation. Diabetes drugs are cheap and generic. The field continues funding amyloid antibodies.',
    type: 'hypothesis',
    framework: 'metabolic',
    significance: 'major',
    sourceIds: ['delamonte-2005'],
    citationIds: ['delamonte-2005-type3', 'delamonte-2005-discovery', 'delamonte-2005-serendipity'],
  },

  {
    id: 'lesne-abeta56',
    year: 2006,
    title: 'Lesné publishes Aβ*56 paper in Nature',
    shortTitle: 'Aβ*56 paper',
    description:
      'Sylvain Lesné reports discovering Aβ*56, a specific amyloid oligomer that allegedly impairs memory. The paper becomes one of the most influential in AD research.',
    dramaticDescription:
      'A Nature paper reports a breakthrough: a specific form of amyloid called Aβ*56 causes memory loss. The paper will be cited over 2,300 times. It will also, 16 years later, be exposed as likely fraudulent.',
    type: 'milestone',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['lesne-2006'],
    citationIds: ['lesne-2006-claim', 'lesne-2006-influence'],
  },

  // ============================================
  // THE FAILURES MOUNT (2010s)
  // ============================================
  {
    id: 'bapineuzumab-fails',
    year: 2012,
    month: 8,
    day: 6,
    title: 'Bapineuzumab Phase 3 trials terminated after no clinical benefit',
    shortTitle: 'Bapineuzumab fails',
    description:
      'Pfizer and Johnson & Johnson terminate all Phase 3 trials of bapineuzumab—the first anti-amyloid antibody—after two large studies show no clinical benefit, despite biomarker evidence that the drug engaged its target.',
    dramaticDescription:
      'The first generation of anti-amyloid antibodies has arrived. And failed. Bapineuzumab successfully clears amyloid from the brain—the biomarkers prove it. But patients show no cognitive improvement. None. The field\'s response: we must be treating too late. The trials must have been flawed. Amyloid remains the target.',
    type: 'failure',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['bapineuzumab-alzforum'],
    citationIds: ['bapineuzumab-termination', 'bapineuzumab-biomarkers', 'bapineuzumab-explanation'],
  },

  {
    id: 'trial-failures-mounting',
    year: 2014,
    title: 'Clinical trial failure rate reaches 99.6%',
    shortTitle: '99.6% failure',
    description:
      'Analysis reveals that 99.6% of Alzheimer\'s drug trials since 2002 have failed, with billions spent on amyloid-targeting therapies showing no clinical benefit.',
    dramaticDescription:
      'The data is in: since 2002, 99.6% of Alzheimer\'s drug trials have failed. Billions spent. Hundreds of trials. Almost none work. The drugs successfully remove amyloid from the brain. The patients don\'t get better. Something is wrong with the theory.',
    type: 'failure',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['cummings-2014'],
    citationIds: ['cummings-2014-failure', 'cummings-2014-scope'],
  },

  {
    id: 'solanezumab-fails',
    year: 2016,
    month: 11,
    day: 23,
    title: 'Solanezumab fails third Phase 3 trial',
    shortTitle: 'Solanezumab fails',
    description:
      'Eli Lilly\'s solanezumab fails to beat placebo in its third Phase 3 trial (EXPEDITION3), testing in over 2,100 patients with mild AD. Lilly\'s stock falls 14%. The company abandons FDA submission plans.',
    dramaticDescription:
      'Lilly has tried three times. After two Phase 3 failures in 2012, they believed treating milder patients would work. It doesn\'t. Solanezumab fails again. Three Phase 3 trials. Thousands of patients. Billions of dollars. No benefit. Lilly\'s stock crashes 14% in a day.',
    type: 'failure',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['solanezumab-statnews-2016'],
    citationIds: ['solanezumab-failure', 'solanezumab-third', 'solanezumab-stock'],
  },

  // ============================================
  // THE RECKONING (2020s)
  // ============================================
  {
    id: 'fda-rejects-aducanumab',
    year: 2020,
    month: 11,
    day: 6,
    title: 'FDA advisory panel votes 10-0 against aducanumab',
    shortTitle: 'Panel rejects Aduhelm',
    description:
      'The FDA\'s expert advisory committee unanimously votes that aducanumab has not been shown to be effective. Three members will later resign when FDA approves it anyway.',
    dramaticDescription:
      'The FDA\'s own experts vote 10-0: aducanumab doesn\'t work. The agency\'s statisticians agree. The evidence is clear. What happens next will shock the scientific community.',
    type: 'rejection',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['aducanumab-advisory-2020'],
    citationIds: ['fda-vote'],
  },

  {
    id: 'fda-approves-aducanumab',
    year: 2021,
    month: 6,
    day: 7,
    title: 'FDA approves aducanumab despite advisory panel rejection',
    shortTitle: 'Aduhelm approved',
    description:
      'The FDA grants accelerated approval to aducanumab (Aduhelm), overruling its own advisory committee. Three committee members resign in protest.',
    dramaticDescription:
      'The FDA does the unthinkable: it approves a drug its own experts voted 10-0 to reject. Three advisory committee members resign. Congressional investigations begin. The amyloid bet must pay off.',
    type: 'approval',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['alexander-2021', 'aducanumab-advisory-2020'],
    citationIds: ['alexander-2021-approval', 'fda-override'],
  },

  {
    id: 'nixon-panthos',
    year: 2022,
    month: 6,
    title: 'Nixon discovers PANTHOS—plaques form inside neurons',
    shortTitle: 'PANTHOS discovery',
    description:
      'Ralph Nixon reveals that amyloid plaques form inside neurons from lysosomal failure (PANTHOS), then are released when the cells die—reversing the assumed causality.',
    dramaticDescription:
      'For decades, scientists assumed plaques attacked neurons from outside. Ralph Nixon shows the opposite: plaques form inside neurons whose lysosomes have failed. When the cell dies, the plaque is released. The "plaque" is a tombstone, not a weapon. Lysosomal dysfunction is the killer.',
    type: 'hypothesis',
    framework: 'lysosomal',
    significance: 'major',
    sourceIds: ['nixon-2022'],
    citationIds: ['nixon-2022-panthos', 'nixon-2022-origin', 'nixon-2022-lysosome'],
  },

  {
    id: 'lesne-fraud-exposed',
    year: 2022,
    month: 7,
    title: 'Science exposes Lesné fraud',
    shortTitle: 'Aβ*56 fraud exposed',
    description:
      'A Science investigation reveals extensive image manipulation in Lesné\'s work, including the landmark 2006 Aβ*56 paper that influenced 16 years of research.',
    dramaticDescription:
      'An investigation in Science reveals what some suspected for years: the images in Lesné\'s landmark Aβ*56 paper appear manipulated. Over 70 instances of possible tampering across more than 20 papers. A foundation of amyloid research begins to crumble.',
    type: 'scandal',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['piller-2022'],
    citationIds: ['piller-2022-investigation', 'piller-2022-scope'],
  },

  {
    id: 'nave-myelin',
    year: 2023,
    month: 6,
    title: 'Nave shows myelin dysfunction drives amyloid deposition',
    shortTitle: 'Myelin drives Aβ',
    description:
      'Klaus-Armin Nave publishes in Nature showing that myelin dysfunction is upstream of amyloid—damaged myelin drives plaque formation, not vice versa.',
    dramaticDescription:
      'A Nature paper delivers another blow to amyloid primacy. Myelin—the insulation around neurons—breaks down with age. This breakdown drives amyloid production. Another framework the field ignored was right: myelin dysfunction is upstream.',
    type: 'hypothesis',
    framework: 'myelin',
    significance: 'major',
    sourceIds: ['depp-nave-2023'],
    citationIds: ['nave-2023-title', 'nave-2023-mechanism', 'nave-2023-conclusion'],
  },

  {
    id: 'lesne-retraction',
    year: 2024,
    title: 'Nature retracts Lesné\'s Aβ*56 paper',
    shortTitle: 'Aβ*56 retracted',
    description:
      'Nature formally retracts the 2006 Aβ*56 paper—the second most-cited retracted paper in history—after all authors except Lesné agree to retraction.',
    dramaticDescription:
      'Eighteen years and 2,300 citations later, the Aβ*56 paper is retracted. It becomes the second most-cited retracted paper in history. Billions of research dollars flowed downstream from this work. What else was built on sand?',
    type: 'scandal',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['lesne-retraction-2024'],
    citationIds: ['lesne-retraction', 'lesne-retraction-delay'],
  },

  {
    id: 'biogen-abandons-aducanumab',
    year: 2024,
    month: 1,
    title: 'Biogen abandons aducanumab',
    shortTitle: 'Aduhelm abandoned',
    description:
      'Biogen discontinues aducanumab (Aduhelm), the drug it fought so hard to approve, citing "financial reasons."',
    dramaticDescription:
      'Three years after the FDA\'s controversial approval, Biogen quietly abandons aducanumab. The drug that was supposed to validate the amyloid hypothesis dies not from scientific failure, but from commercial rejection. No one wanted it.',
    type: 'failure',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['biogen-discontinue-2024'],
    citationIds: ['biogen-discontinue'],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get events by framework
export function getEventsByFramework(framework: FrameworkId): TimelineEvent[] {
  return timelineEvents.filter(e => e.framework === framework);
}

// Get events by type
export function getEventsByType(type: TimelineEventType): TimelineEvent[] {
  return timelineEvents.filter(e => e.type === type);
}

// Get events in year range
export function getEventsInRange(startYear: number, endYear: number): TimelineEvent[] {
  return timelineEvents.filter(e => e.year >= startYear && e.year <= endYear);
}

// Get major events only
export function getMajorEvents(): TimelineEvent[] {
  return timelineEvents.filter(e => e.significance === 'major');
}

// Sort events chronologically
export function getChronologicalEvents(): TimelineEvent[] {
  return [...timelineEvents].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month && b.month && a.month !== b.month) return a.month - b.month;
    if (a.day && b.day) return a.day - b.day;
    return 0;
  });
}

// Get "eras" for timeline sections
export interface TimelineEra {
  id: string;
  title: string;
  startYear: number;
  endYear: number;
  description: string;
  events: TimelineEvent[];
}

export function getTimelineEras(): TimelineEra[] {
  return [
    {
      id: 'origin',
      title: 'The Discovery',
      startYear: 1900,
      endYear: 1983,
      description: 'A disease is named, but its cause remains unknown for nearly 80 years.',
      events: timelineEvents.filter(e => e.year >= 1900 && e.year <= 1983),
    },
    {
      id: 'molecular',
      title: 'The Target Emerges',
      startYear: 1984,
      endYear: 1991,
      description: 'Amyloid-beta is identified and linked to genetics. A molecular target appears.',
      events: timelineEvents.filter(e => e.year >= 1984 && e.year <= 1991),
    },
    {
      id: 'hypothesis',
      title: 'The Hypothesis Takes Hold',
      startYear: 1992,
      endYear: 1999,
      description: 'The amyloid cascade hypothesis is formalized. Alternative voices begin to emerge.',
      events: timelineEvents.filter(e => e.year >= 1992 && e.year <= 1999),
    },
    {
      id: 'alternatives',
      title: 'The Alternatives',
      startYear: 2000,
      endYear: 2009,
      description:
        'Researchers propose vascular, mitochondrial, and metabolic causes. Their work is marginalized.',
      events: timelineEvents.filter(e => e.year >= 2000 && e.year <= 2009),
    },
    {
      id: 'failures',
      title: 'The Failures Mount',
      startYear: 2010,
      endYear: 2019,
      description: 'Trial after trial fails. The 99% failure rate becomes undeniable.',
      events: timelineEvents.filter(e => e.year >= 2010 && e.year <= 2019),
    },
    {
      id: 'reckoning',
      title: 'The Reckoning',
      startYear: 2020,
      endYear: 2025,
      description:
        'Fraud is exposed. Controversial approvals. New evidence suggests the sidelined frameworks were right.',
      events: timelineEvents.filter(e => e.year >= 2020 && e.year <= 2025),
    },
  ];
}
