export interface PromisingDrug {
  id: string;
  drug: string;
  mechanism: string;
  mechanismCategory: 'lysosomal' | 'tau' | 'inflammatory' | 'viral' | 'immune';
  evidenceStrength: 1 | 2 | 3 | 4 | 5;
  keyEvidence: string;
  quote: string;
  quoteSource: string;
  whyItMatters: string;
  keyCaveat: string;
  status: string;
  costPerMonth: string;
  decisiveTrial: string;
  citationIds: string[];
}

export const promisingFrontierData: PromisingDrug[] = [
  {
    id: 'rapamycin',
    drug: 'Rapamycin (Sirolimus)',
    mechanism: 'mTORC1 inhibitor',
    mechanismCategory: 'lysosomal',
    evidenceStrength: 3,
    keyEvidence:
      'Phase 1 study completed: 8 weeks of low-dose rapamycin (1mg/day) in MCI/AD showed safety and tolerability. 12-month feasibility trial ongoing.',
    quote:
      'This is the cleanest pharmacologic probe of mTORC1 → TFEB → lysosomal cascade. Unlike many "metabolic" candidates, rapamycin is a direct mTORC1 inhibitor with a long clinical history.',
    quoteSource: 'Mechanistic analysis',
    whyItMatters:
      "Targets a central control node (mTORC1 → TFEB → lysosome function), not a downstream proxy. If it moves the right intermediate markers, you don't need to guess the lever.",
    keyCaveat:
      "Pleiotropic effects; positive results won't uniquely validate mechanism without pre-specified mediation endpoints. CNS engagement difficult to measure.",
    status: 'Phase 1 complete; 12-month trial ongoing',
    costPerMonth: '~$30 generic',
    decisiveTrial:
      'Short biomarker trial with CSF/plasma lysosome/autophagy markers + pTau/NfL trend as primary endpoints, cognition exploratory.',
    citationIds: ['rapamycin-phase1-2025', 'rapamycin-feasibility-nct'],
  },
  {
    id: 'lithium-microdose',
    drug: 'Microdose Lithium',
    mechanism: 'GSK-3β inhibitor',
    mechanismCategory: 'tau',
    evidenceStrength: 3,
    keyEvidence:
      'The Nunes microdose lithium trial showed stabilized cognitive impairment in amnestic MCI patients. Nature 2025 paper discusses lithium and AD, noting lower concentrations may be where signal lives.',
    quote:
      'Microdose lithium treatment stabilized cognitive impairment in elderly individuals with amnestic mild cognitive impairment.',
    quoteSource: 'Nunes et al., 2013',
    whyItMatters:
      'Direct perturbation of a key node (GSK-3β / tau phosphorylation dynamics). Unlike many supplements, it has a literature spine and real human precedent.',
    keyCaveat:
      "Lithium is pleiotropic—if it helps, won't know if it's GSK-3β, neurotrophic effects, inflammation, or sleep/circadian. Small-trial results need modern replication.",
    status: 'Small RCT positive; needs larger biomarker-anchored replication',
    costPerMonth: '~$10 supplement',
    decisiveTrial:
      'Tau-forward enrichment trial (amyloid+/tau+) with plasma/CSF pTau species and NfL as primary endpoints.',
    citationIds: ['nunes-lithium-2013', 'nature-lithium-2025'],
  },
  {
    id: 'colchicine',
    drug: 'Colchicine',
    mechanism: 'NLRP3-adjacent anti-inflammatory',
    mechanismCategory: 'inflammatory',
    evidenceStrength: 2,
    keyEvidence:
      "Pilot AD study showed tolerability. Modern CV trials (COLCOT, LoDoCo2) built cardiovascular outcomes credibility. Low-dose likely doesn't worsen cognition based on other populations.",
    quote:
      'One of the few cheap anti-inflammatories that has real modern cardiovascular outcomes credibility.',
    quoteSource: 'AlzDiscovery analysis',
    whyItMatters:
      'Cheap, well-characterized, and plausibly hits NLRP3-adjacent inflammatory machinery. If inflammation is part of the causal chain, colchicine is a fundable test.',
    keyCaveat:
      "Not a selective CNS NLRP3 inhibitor. Cardiology momentum may not translate to AD. Endpoint mismatch risk high—vascular/inflammatory benefits may not show on 18-month cognitive scales.",
    status: 'Pilot AD safety data; no modern efficacy trial',
    costPerMonth: '~$4 generic',
    decisiveTrial:
      'Vascular + inflammation enrichment trial in AD/MCI with high WMH burden. Primary: WMH progression + inflammatory biomarkers, not ADAS-cog.',
    citationIds: ['colchicine-pilot-mssm', 'alzdiscovery-colchicine'],
  },
  {
    id: 'valacyclovir',
    drug: 'Valacyclovir',
    mechanism: 'HSV antiviral',
    mechanismCategory: 'viral',
    evidenceStrength: 1,
    keyEvidence:
      'Columbia 2024: Treatment trial in HSV+ early AD showed NO benefit vs placebo on cognition or biomarkers over ~78 weeks. The "clean test" appears negative for treatment.',
    quote:
      "Antiviral treatment fails to slow early-stage Alzheimer's and cannot be recommended for that use case.",
    quoteSource: 'Columbia Irving Medical Center, 2024',
    whyItMatters:
      'This is intellectual honesty in action. The infection hypothesis was testable, the test was run in the right subgroup (HSV+), and it came back negative. Prevention remains theoretically interesting but practically untestable.',
    keyCaveat:
      'Treatment hypothesis largely negative. Prevention trials would require huge N, long follow-up, and big cost—exactly the trial nobody funds. May now be a weak "graveyard" candidate.',
    status: 'Treatment trial FAILED (Columbia 2024)',
    costPerMonth: '~$20 generic',
    decisiveTrial:
      'Prevention trial (if fundable): long-term antiviral after herpes infection to prevent AD onset. Economically brutal.',
    citationIds: ['columbia-valacyclovir-2024', 'beingpatient-valacyclovir'],
  },
  {
    id: 'as01-vaccines',
    drug: 'AS01-Adjuvanted Vaccines (Shingrix, Arexvy)',
    mechanism: 'TLR4/immune modulation',
    mechanismCategory: 'immune',
    evidenceStrength: 3,
    keyEvidence:
      'Oxford 2025: In 436,788 propensity-matched individuals, AS01-adjuvanted vaccines (shingles + RSV) reduced 18-month dementia risk by 18-37%. Effect appears tied to the AS01 adjuvant itself, not the target pathogen.',
    quote:
      'No difference was observed between the two AS01-adjuvanted vaccines, suggesting that the AS01 adjuvant itself plays a direct role in lowering dementia risk.',
    quoteSource: 'Taquet et al., npj Vaccines 2025',
    whyItMatters:
      'These are FDA-approved vaccines already given to millions. If AS01 adjuvant directly reduces neuroinflammation via TLR4/IFN-γ, this is an immediately actionable finding.',
    keyCaveat:
      'Observational data only—not an RCT. Effect could be healthy vaccinee bias or confounding. Shingrix is not approved for dementia prevention. Mechanism (MPL + QS-21 → IFN-γ → amyloid clearance?) speculative.',
    status: 'Large observational study; FDA-approved for other indications',
    costPerMonth: '~$150-200 (2-dose series)',
    decisiveTrial:
      'RCT of AS01 adjuvant alone (or Shingrix in dementia-enriched population) with CSF inflammatory markers and cognitive endpoints.',
    citationIds: ['taquet-as01-2025'],
  },
];
