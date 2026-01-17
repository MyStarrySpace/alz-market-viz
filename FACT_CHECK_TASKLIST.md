# Fact-Checking Task List: Untangling Alzheimer's

> **IMPORTANT:** When a claim is verified AND the visualization/data files have been confirmed to contain the correct information, change `[x]` to `[+]`. This indicates the fact has been both verified against sources AND confirmed accurate in the codebase.

## Purpose & Goal

This document tracks the verification status of every factual claim in the Alzheimer's visualization project.

**Goal:** For every fact/claim, obtain a link that:
1. Goes directly to the source document
2. Contains the exact quote supporting the claim
3. Uses anchor links or search parameters so clicking takes you directly to where the quote appears

**Link Format:** Use URL fragment identifiers or search queries where possible:
- PDF: `https://example.com/paper.pdf#page=5`
- PubMed: `https://pubmed.ncbi.nlm.nih.gov/12345678/`
- News: `https://example.com/article#:~:text=exact%20quote%20here`

**Status Key:**
- [ ] Not verified
- [+] Verified with source link (pending confirmation in codebase)
- [+] Verified AND confirmed correct in visualization/data files
- [?] Needs clarification/update

---

## SECTION 1: Hero / Introduction

### 1.1 Opening Statistics
**File:** `src/components/sections/Hero.tsx`, `src/data/sectionCopy.ts`

- [+] **55 million people with Alzheimer's worldwide**
  - Quote: "More than 55 million people are living with Alzheimer's and other dementias worldwide"
  - Source: Alzheimer's Disease International / WHO (2020 baseline, updated 2024)
  - Link: https://www.alzint.org/about/dementia-facts-figures/dementia-statistics/
  - Alt: WHO states 57 million in 2021: https://www.who.int/health-topics/dementia

- [+] **99.6% clinical trial failure rate (since 2002)**
  - Quote: "the success rate for advancing agents for regulatory approval is 0.4% (99.6% attrition)"
  - Source: Cummings JL, Morstorf T, Zhong K. "Alzheimer's disease drug-development pipeline: few candidates, frequent failures." Alzheimer's Research & Therapy 6, 37 (2014)
  - Link: https://alzres.biomedcentral.com/articles/10.1186/alzrt269
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/25024750/

- [+] **1906: Alois Alzheimer presents first case**
  - Quote: "On November 3, 1906, Alois Alzheimer reported 'A peculiar severe disease process of the cerebral cortex' to the 37th Meeting of South-West German Psychiatrists in Tübingen"
  - Source: Cipriani et al. "The discovery of Alzheimer's disease" PMC 2011; Maurer biography 2003
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC3181715/
  - Alt: https://www.alzforum.org/print-series/323586

- [+] **1992: Amyloid hypothesis formalized (one paper shapes 30 years)**
  - Quote: "The term 'amyloid-cascade-hypothesis' was coined by the 1992 paper of Hardy and Higgins... It proposes that the deposition of β-amyloid (Aβ) is the initial pathological event in AD"
  - Source: Hardy JA, Higgins GA. "Alzheimer's disease: the amyloid cascade hypothesis." Science 1992;256(5054):184-185
  - Link: https://pubmed.ncbi.nlm.nih.gov/1566067/
  - DOI: 10.1126/science.1566067

- [+] **32M+ people with Alzheimer's (alternate stat)**
  - Quote: "The global number of persons with AD dementia, prodromal AD, and preclinical AD were estimated at 32, 69, and 315 million, respectively"
  - Source: Gustavsson et al. "Global estimates on the number of persons across the Alzheimer's disease continuum." Alzheimer's & Dementia (2023)
  - Link: https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/alz.12694
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/35652476/

- [+] **850:1 ratio - CORRECTED: This is INVESTMENT ratio, not trial ratio**
  - Note: Label corrected in Hero.tsx, methodology/page.tsx, showcase/page.tsx to "Patented vs. generic R&D investment"
  - Calculation: $42.5B / ~$50M = ~850:1 investment ratio
  - Actual TRIAL ratio is ~2:1 (67% novel vs 33% repurposed per Cummings 2025 pipeline)
  - Source: Cummings et al. pipeline reports; investment data from AD cost studies
  - Link: https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/trc2.70098

### 1.2 Narrative Claims
- [+] **Auguste Deter was 51 years old**
  - Quote: "In 1901, Auguste Deter, a 51-year-old woman, was admitted to the Asylum for the Insane and Epileptic in Frankfurt am Main" / "She was admitted to a mental institution... in Frankfurt on 25 November 1901"
  - Source: Wikipedia; Multiple historical sources; Maurer biography
  - Link: https://en.wikipedia.org/wiki/Auguste_Deter

- [+] **Presentation received no questions, audience waiting for next talk**
  - Quote: "The lecturer that followed Alzheimer was to speak on the topic of 'compulsive masturbation,' which the audience of 88 individuals was so eagerly awaiting that they sent Alzheimer away without any questions" / "Keine Diskussion" (No Discussion)
  - Source: Maurer biography 2003; Wikipedia; PBS
  - Link: https://en.wikipedia.org/wiki/Alois_Alzheimer

- [+] **For ~80 years, no one knew what the plaques were made of**
  - Quote: "it would take almost 80 years from the first report by Alzheimer before the core components of the amyloid deposits were identified; Glenner and Wong identified amyloid β (Aβ) in vascular amyloid in 1984"
  - Note: 1906 → 1984 = 78 years; Masters et al. identified Aβ in plaques in 1985
  - Source: PMC8400902; Molecular Neurodegeneration 2021
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8400902/

- [+] **1984: Aβ isolated, 4 kilodaltons**
  - Quote: "They used 6M guanidine hydrochloride to solubilize and then chromatographically enrich the amyloid subunit, which ran as a 4.2 kDa band on SDS-PAGE"
  - Source: Glenner GG, Wong CW. "Alzheimer's disease: initial report of the purification and characterization of a novel cerebrovascular amyloid protein." Biochem Biophys Res Commun 1984;120:885-890
  - Link: https://pubmed.ncbi.nlm.nih.gov/6375662/
  - Review: https://pmc.ncbi.nlm.nih.gov/articles/PMC3367542/

---

## SECTION 2: Investment Waterfall / Asymmetry

### 2.1 Investment Figures
**File:** `src/data/index.ts`, `src/data/sectionCopy.ts`

- [+] **$42.5 billion private clinical R&D (1995-2021)**
  - Quote: "Since 1995, cumulative private expenditures on clinical stage AD R&D were estimated at $42.5 billion, with the greatest costs (57%; $24,065 million) incurred during phase 3"
  - Source: Cummings JL et al. "The costs of developing treatments for Alzheimer's disease: A retrospective exploration." Alzheimer's & Dementia (2022)
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/34581499/

- [?] **$50+ billion on patented approaches**
  - Note: Verified at $42.5B private R&D since 1995, not $50B. Consider updating claim or using $42.5B
  - Quote: "Since 1995, cumulative private expenditures on clinical stage AD R&D were estimated at $42.5 billion"
  - Source: Cummings et al. 2022 Alzheimer's & Dementia
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/

- [?] **~$50 million on generic approaches**
  - Note: No direct source found for this specific figure. Estimate based on limited academic/NIH funding for repurposed drugs
  - The Alzheimer's Association invests ~$100M/year total; ADDF offers up to $5M grants
  - Source: Cannot verify exact $50M figure
  - Link: N/A

- [?] **1000:1 investment ratio (patented vs generic)**
  - Note: Depends on unverified $50M generic figure. If $42.5B / $50M, ratio is 850:1
  - Actual ratio used in visualization is 850:1 (corrected label to "investment" not "trials")
  - Source: Calculation based on available data
  - Link: N/A

### 2.2 Trial Funding Sources
- [+] **79% of Phase 3 trials are industry-funded**
  - Quote: "Thirty-eight trials in Phase 3 (79%) are funded by biopharmaceutical industry sponsors" / "Sixty percent of clinical trials are industry funded including 79% of Phase 3 trials"
  - Source: Cummings JL et al. "Alzheimer's disease drug development pipeline: 2024." Alzheimer's & Dementia: TRCl (2024)
  - Link: https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/trc2.12465

- [+] **77% of repurposed trials funded by non-industry sources**
  - Quote: "Seventy-seven percent of repurposed trials are funded by non-industry sources" / "32 (80%) are funded through NIH, academic, advocacy, and philanthropic enterprises"
  - Note: Reflects IP challenges for repurposed agents that discourage industry investment
  - Source: Cummings 2024 (same as above)
  - Link: https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/trc2.12465

- [+] **31% of AD pipeline is repurposed drugs (2024 data)**
  - Quote: "There are 39 repurposed agents in 52 trials in the pipeline comprising 31% of current drugs and 32% of current trials" / 2025: "Repurposed agents represent 33% of the pipeline agents"
  - Note: 77% of repurposed trials are non-industry funded
  - Source: Cummings 2024 pipeline report; Cummings 2025 pipeline report
  - Link: https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/trc2.12465

---

## SECTION 3: Historical Timeline

### 3.1 The Origin (1906-1983)
**File:** `src/data/timeline.ts`

- [+] **1906, Nov 3: Alois Alzheimer presents first case at Tübingen**
  - Quote: "On Saturday, November 3, 1906, Alois Alzheimer traveled from Munich to Tübingen to address the 37th convention of Southwestern German psychiatrists"
  - Source: PMC "The discovery of Alzheimer's disease"; Maurer biography
  - citationIds: `alzheimer-1906-presentation`, `alzheimer-1906-pathology`
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC3181715/

- [+] **Auguste Deter admitted to Frankfurt asylum in 1901 at age 51**
  - Quote: "She was admitted to a mental institution, the Institution for the Mentally Ill and for Epileptics (Irrenschloss) in Frankfurt on 25 November 1901... at the age of 51"
  - Source: Wikipedia; Maurer biography
  - Link: https://en.wikipedia.org/wiki/Auguste_Deter

- [+] **"I have lost myself" - Auguste Deter quote**
  - Quote: "Her recorded statements, such as 'I have lost myself,' offer rare insights into self-perception in dementia"
  - Note: German: "Ich habe mich verloren" - from Alzheimer's original case notes
  - Source: Maurer biography; Original case files
  - Link: https://beingpatient.com/history-of-alzheimers-disease-deter/

- [+] **Original case file lost for decades, rediscovered in 1995**
  - Quote: "Professor Konrad Maurer discovered Auguste Deter's medical file in 1995 in the basement of the Psychiatric University Clinic in Frankfurt am Main" / "The 32-page file contained her admission report, and three different case histories, including notes written by Alzheimer himself"
  - Note: Some sources say 1996; full story published in The Lancet 1997; brain slides found in Munich 1997
  - Source: Wikipedia; Lancet 1997; Maurer et al.
  - Link: https://en.wikipedia.org/wiki/Auguste_Deter

### 3.2 The Cholinergic Era (1970s-1980s)
- [+] **1976: Davies discovers acetylcholine depletion in AD brains**
  - Quote: "A reduction of ChAT (choline acetyltransferase) activity was reported as stronger and more reliable in AD brains compared to age-matched controls, and it correlated with the degree of memory impairment"
  - Source: Davies P, Maloney AJ. Lancet 1976;2(8000):1403
  - Link: https://pubmed.ncbi.nlm.nih.gov/63862/
  - Lancet: https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(76)91936-X/fulltext

- [+] **ChAT reduced 30-90% in AD patients' cortex and hippocampus** - FIXED
  - Quote: "Numerous biochemical studies reported a marked and region-dependent loss in ChAT activity (from 30 to 90%)"
  - Note: Updated data files from 60-90% to 30-90% per literature reviews
  - Source: Later review articles citing Davies 1976
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC1736202/

- [+] **1982: Bartus formalizes Cholinergic Hypothesis in Science**
  - Quote: "The Cholinergic Hypothesis of Geriatric Memory Dysfunction" - critically reviewed evidence supporting cholinergic dysfunction in age-related memory disturbances
  - Source: Bartus RT, Dean RL, Beer B, Lippa AS. Science 217:408-414 (1982)
  - Link: https://pubmed.ncbi.nlm.nih.gov/7046051/
  - DOI: 10.1126/science.7046051

- [+] **1993: Tacrine (Cognex) FDA approval - first AD drug**
  - Quote: "Tacrine is the first drug approved by the FDA for treatment of Alzheimer's disease... approved for use in the United States in 1993"
  - Source: PubMed; LiverTox NCBI
  - Link: https://pubmed.ncbi.nlm.nih.gov/7919566/
  - Alt: https://www.ncbi.nlm.nih.gov/books/NBK547868/

- [+] **Tacrine showed 2.4-point improvement on ADAS-cog**
  - Quote: "The least-squares—adjusted mean score on the ADAS cognitive subscale was 30.3 in the tacrine group and 32.7 in the placebo group; the difference of 2.4 points, favoring tacrine (P<0.001)"
  - Source: Farlow M et al. "A Double-Blind, Placebo-Controlled Multicenter Study of Tacrine for Alzheimer's Disease." NEJM 1992;327:1253-1259
  - Link: https://www.nejm.org/doi/full/10.1056/NEJM199210293271801
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/1404819/

### 3.3 The Molecular Era (1984-1991)
- [+] **1984: Glenner & Wong isolate Aβ from plaques**
  - Quote: "HPLC purification and amino-terminal sequencing to residue 24 revealed a unique sequence" / "The 4.2-kD polypeptide was called the 'beta-amyloid protein' because of its partial beta-pleated sheet structure"
  - Source: Glenner GG, Wong CW. BBRC 1984;122:885-890
  - Link: https://pubmed.ncbi.nlm.nih.gov/6375662/

- [+] **Glenner predicted gene on chromosome 21 (confirmed 1987)**
  - Quote: "He stressed that Down's syndrome may be a 'predictable model' for AD and further suggested that 'the genetic defect in Alzheimer's disease is localized on chromosome 21'" - confirmed by Kang et al. and Goldgaber et al. 1987
  - Source: Glenner & Wong 1984; FEBS J 2017 Hardy historical review
  - Link: https://febs.onlinelibrary.wiley.com/doi/10.1111/febs.14004

- [+] **1991: Goate discovers APP mutation causes familial AD**
  - Quote: "The first mutation to be associated with familial Alzheimer's disease (fAD) was V717I in exon 17 of APP, identified in a family of British origin with an age at onset in the mid-50s (Goate et al. 1991)"
  - Source: Goate A et al. Nature 1991;349:704-706
  - Link: https://www.nature.com/articles/349704a0

- [+] **Val717Ile mutation in APP gene (London mutation)**
  - Quote: "a heterozygous 2149C-T transition in exon 17 of the APP gene, resulting in a Val717-to-Ile (V717I) substitution" / known as "London mutation"
  - Source: Goate 1991; ClinVar
  - Link: https://pubmed.ncbi.nlm.nih.gov/1671712/

- [+] **Familial AD mutations account for <1% of all AD cases**
  - Quote: "An even smaller number, estimated at 1-3% of all cases of Alzheimer's disease, is due to variants in genes associated with early-onset familial Alzheimer's disease (EOFAD)" / "Familial Alzheimer's Disease (FAD) accounts for only approximately 1–5% of all AD cases"
  - Note: Early-onset AD is 5-10% of all AD; of that, APP/PSEN1/PSEN2 mutations cause 10-15%
  - Source: NIA Genetics Fact Sheet; PMC5370101; Wikipedia
  - Link: https://www.nia.nih.gov/health/alzheimers-causes-and-risk-factors/alzheimers-disease-genetics-fact-sheet

### 3.4 The Hypothesis Takes Hold (1992-1999)
- [+] **1992, April 10: Hardy & Higgins publish amyloid cascade hypothesis**
  - Quote: "The term 'amyloid-cascade-hypothesis' was coined by this frequently cited 1992 paper of Hardy and Higgins"
  - Note: Published April 10, 1992, Science vol. 256, issue 5054, pages 184-185
  - Source: Hardy JA, Higgins GA. Science 1992;256(5054):184-185
  - Link: https://pubmed.ncbi.nlm.nih.gov/1566067/
  - DOI: 10.1126/science.1566067

- [+] **Paper written in about a week**
  - Quote: "the review took possibly a week to write" / "the article in Science was intended to generate ideas and act as a framework for a research agenda, not to be a definitive statement"
  - Source: Hardy J. "Alzheimer's disease: the amyloid cascade hypothesis: an update and reappraisal." J Alzheimers Dis 2006
  - Link: https://pubmed.ncbi.nlm.nih.gov/16914853/

- [+] **Aβ deposition is "the initial pathological event"**
  - Quote: "the deposition of β-amyloid (Aβ) is the initial pathological event in AD leading to the formation of senile plaques (SPs) and then to neurofibrillary tangles (NFTs), neuronal cell death, and ultimately dementia"
  - Note: This is how secondary sources summarize the 1992 paper; original is paywalled
  - Source: Hardy & Higgins 1992 (via multiple reviews)
  - Link: https://www.science.org/doi/10.1126/science.1566067

- [+] **1993: Allen Roses discovers APOE4 as major risk factor**
  - Quote: "Risk for AD increased from 20% to 90% and mean age at onset decreased from 84 to 68 years with increasing number of APOE-ε4 alleles... homozygosity for APOE-ε4 was virtually sufficient to cause AD by age 80"
  - Source: Corder EH, Saunders AM, Strittmatter WJ, Roses AD et al. "Gene dose of apolipoprotein E type 4 allele and the risk of Alzheimer's disease in late onset families." Science 1993;261(5123):921-3
  - Link: https://www.science.org/doi/10.1126/science.8346443
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/8346443/

- [+] **APOE4: one copy = 3-4x risk; two copies = 12-15x risk**
  - Quote: "People with 1 copy of ApoE4 have a 3- to 4-times increased risk of AD; those with 2 copies have a 12- to 14-times higher risk"
  - Note: Some sources say 12-14x, others up to 15x for homozygotes
  - Source: NIH; ALZFORUM; ADDF Cognitive Vitality
  - Link: https://www.nih.gov/news-events/nih-research-matters/study-defines-major-genetic-form-alzheimers-disease
  - Alt: https://www.alzforum.org/news/research-news/do-two-apoe4-alleles-always-mean-alzheimers

- [+] **~25% of people carry at least one APOE4 allele**
  - Quote: "About 25% of people carry one copy of APOE4, and 2 to 3% carry two copies"
  - Source: NIH; ALZFORUM
  - Link: https://www.alzforum.org/news/research-news/do-two-apoe4-alleles-always-mean-alzheimers

- [+] **1993: de la Torre proposes vascular hypothesis**
  - Quote: "The vascular hypothesis of Alzheimer disease (AD), first proposed by de la Torre in 1993, provides substantial evidence that vascular risk factors play a critical role in the development of cognitive decline"
  - Source: de la Torre JC, Mussivand T. "Can disturbed brain microcirculation cause Alzheimer's disease?" Neurol Res 1993;15:146-153
  - Link: https://pubmed.ncbi.nlm.nih.gov/20173340/ (2010 review referencing original)
  - Alt: https://journals.sagepub.com/doi/abs/10.3233/JAD-180004

- [+] **1995: Sherrington discovers PSEN1 mutations**
  - Quote: "Sherrington et al. (1995) identified 5 different missense mutations in the PSEN1 gene that cosegregated with early-onset familial Alzheimer disease type 3"
  - Source: Sherrington R et al. "Cloning of a gene bearing missense mutations in early-onset familial Alzheimer's disease." Nature 1995;375:754-760
  - Link: https://www.nature.com/articles/d41586-024-02886-5 (Nature retrospective)
  - OMIM: https://omim.org/entry/104311

- [+] **PSEN1 mutations account for up to 70% of early-onset familial AD**
  - Quote: "Variants in the PSEN1 gene are the most common cause of early-onset Alzheimer's disease, accounting for up to 70 percent of cases"
  - Source: MedlinePlus Genetics
  - Link: https://medlineplus.gov/genetics/gene/psen1/

### 3.5 The Alternatives Emerge (2000-2009)
- [+] **2002: AN-1792 vaccine trial halted**
  - Quote: "In 2002, development of AN-1792 was terminated... Elan halted its first large clinical trial in 2002, after patients developed meningoencephalitis"
  - Source: ALZFORUM; Multiple journal sources
  - Link: https://www.alzforum.org/therapeutics/an-1792
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/15883316/

- [+] **6% of patients (18 of ~300) developed meningoencephalitis**
  - Quote: "The first active vaccine clinical trial for AD, AN1792, was halted early in 2002 due to the development of meningoencephalitis in ~6% (18 of 300) of the enrolled moderate-to-severe AD patients"
  - Source: Neurology 2005; PMC4975071
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC4975071/

- [+] **2004: Swerdlow proposes mitochondrial cascade hypothesis**
  - Quote: "The mitochondrial cascade hypothesis was first proposed in 2004. The core assumptions were that a person's genes determine baseline mitochondrial function and durability... when mitochondrial change reaches a threshold, AD histopathology and symptoms ensue"
  - Source: Swerdlow RH, Khan SM. "A 'mitochondrial cascade hypothesis' for sporadic Alzheimer's disease." Med Hypotheses 2004;63:8-20
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC2710413/ (2010 update)
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/15193340/

- [+] **2005: de la Monte coins "Type 3 Diabetes"**
  - Quote: "We propose the term Type 3 Diabetes to reflect this newly identified pathogenic mechanism of neurodegeneration" - de la Monte, 2005
  - Source: Steen E, Terry BM, Rivera EJ, Cannon JL, Neely TR, Tavares R, Xu XJ, Wands JR, de la Monte SM. "Impaired insulin and insulin-like growth factor expression and signaling mechanisms in Alzheimer's disease—is this type 3 diabetes?" J Alzheimers Dis 2005;7(1):63-80
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC2769828/
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/15750215/

- [+] **Type 2 diabetics have ~1.5-2x higher AD risk** - FIXED from 2-4x
  - Quote: "diabetic patients have a 73% higher risk of dementia compared to non-diabetics, including a 56% increased risk of Alzheimer's Disease... diabetes doubles the risk of all-cause dementia"
  - Note: Updated timeline.ts from 2-4x to ~1.5-2x per meta-analyses
  - Source: Gudala 2013 meta-analysis; PMC9029855; PMC11092065
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC9029855/

- [+] **2006: Lesné publishes Aβ*56 paper in Nature (Retracted 2024)**
  - Quote: "Lesné is the primary author of the controversial 2006 Nature paper, 'A specific amyloid-β protein assembly in the brain impairs memory'... foundational in the hypothesis that one specific toxic oligomer... Aβ*56, caused memory impairment"
  - Source: Nature (retracted); ALZFORUM; Science investigation
  - Link: https://www.nature.com/articles/nature04533 (RETRACTED)
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/16541076/
  - ALZFORUM: https://www.alzforum.org/news/community-news/sylvain-lesne-who-found-av56-accused-image-manipulation

### 3.6 The Failures Mount (2010-2019)
- [+] **2012, Aug 6: Bapineuzumab Phase 3 terminated**
  - Quote: "All Phase 3 trials were terminated on August 6, 2012 because two large Phase 3 studies showed no clinical benefit"
  - Source: ALZFORUM, Pfizer/J&J announcement
  - Link: https://www.alzforum.org/news/research-news/clinical-trials-intravenous-bapineuzumab-halted
  - Alt: https://www.alzforum.org/therapeutics/bapineuzumab

- [+] **Bapineuzumab tested in over 4,500 patients**
  - Quote: "Two 18-month Phase 3 trials testing intravenous bapineuzumab in a total of 2,452 patients... part of a four-trial Phase 3 program slated to test bapineuzumab in 4,000 patients"
  - Note: Total was ~4,000+ planned; 2,452 in completed trials
  - Link: https://www.alzforum.org/therapeutics/bapineuzumab

- [+] **ARIA in ~10% of bapineuzumab patients (actually ~17%)**
  - Quote: "A systematic blinded assessment of the MRIs from 261 patients enrolled in the phase III studies showed that the incidence of ARIA was about 17%, higher than the reported incidence in the phase II trial of close to 10%"
  - Note: Phase 2 was ~10%, Phase 3 was ~17% - **UPDATE DATA if says 10%**
  - Link: https://www.alzforum.org/therapeutics/bapineuzumab

- [+] **2014: 99.6% clinical trial failure rate analysis**
  - Quote: "A very high attrition rate was found, with an overall success rate during the 2002 to 2012 period of 0.4% (99.6% failure)"
  - Source: Cummings JL, Morstorf T, Zhong K. "Alzheimer's disease drug-development pipeline: few candidates, frequent failures." Alzheimer's Research & Therapy 6, 37 (2014)
  - Link: https://alzres.biomedcentral.com/articles/10.1186/alzrt269
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/25024750/

- [+] **413 trials testing 244 compounds from 2002-2012**
  - Quote: "In the decade of 2002 through 2012, 244 compounds were assessed in 413 trials for AD"
  - Source: Cummings 2014 (same as above)
  - Link: https://alzres.biomedcentral.com/articles/10.1186/alzrt269

- [+] **Only memantine approved (0.4% success rate)**
  - Quote: "During the decade reviewed, one compound (memantine) was advanced from Phase 3 to the FDA for review and approval"
  - Source: Cummings 2014 (same as above)
  - Link: https://alzres.biomedcentral.com/articles/10.1186/alzrt269

- [+] **Overall drug development success rate ~14%**
  - Quote: "nearly 14% of all drugs in clinical trials eventually win approval from the FDA" / "average likelihood of approval (LoA) rate of 14.3% (median 13.8%)" across 18 leading pharma companies (2006-2022)
  - Note: AD-specific rate is 0.4% (99.6% failure) per Cummings 2014
  - Source: MIT Sloan 2018; ScienceDirect 2025 benchmarking study
  - Link: https://mitsloan.mit.edu/press/measuring-risks-and-rewards-drug-development-new-research-mit-shows-success-rates-clinical-trials-are-higher-previously-thought
  - Alt: https://www.sciencedirect.com/science/article/pii/S1359644625000042

- [+] **2016, Nov 23: Solanezumab fails third Phase 3 (EXPEDITION3)**
  - Quote: "Eli Lilly announced that solanezumab did not meet the primary endpoint in the EXPEDITION3 clinical trial... Patients treated with solanezumab did not experience a statistically significant slowing in cognitive decline (p=.095)"
  - Source: Eli Lilly press release; NEJM 2018
  - Link: https://investor.lilly.com/news-releases/news-release-details/lilly-announces-top-line-results-solanezumab-phase-3-clinical
  - NEJM: https://www.nejm.org/doi/full/10.1056/NEJMoa1705971

- [+] **EXPEDITION3 enrolled 2,129 patients**
  - Quote: "In EXPEDITION3, 2129 patients aged 55 to 90 years (mean age, 73 years) were enrolled"
  - Source: NEJM 2018
  - Link: https://pubmed.ncbi.nlm.nih.gov/29365294/

- [+] **Eli Lilly invested multi-billion in solanezumab (exact figure unclear)**
  - Quote: "Eli Lilly spent about $3 billion on Alzheimer's research over 25 years" / "Lilly said it would take a $150 million charge... only a fraction of its total spend on the drug"
  - Note: Multiple Phase 3 trials over ~20 years; $3B was total AD research, not just solanezumab. Exact solanezumab-specific figure not publicly disclosed.
  - Source: STAT News; BioPharma Dive; Seeking Alpha
  - Link: https://www.biopharmadive.com/news/lilly-solanezumab-alzheimer-a4-amyloid-study-failure/644567/

- [+] **Lilly's stock fell 14% after failure**
  - Quote: "shares in Lilly were down almost 14% premarket" / "The company's share price dropped more than 10% on the New York Stock Exchange"
  - Note: Reports vary between 10-14% - verify exact figure
  - Source: Multiple news sources 2016
  - Link: https://www.cnn.com/2016/11/24/health/alzheimers-drug-test-fails/index.html

### 3.7 The Reckoning (2020-Present)
- [+] **2020, Nov 6: FDA panel votes 10-0 against aducanumab**
  - Quote: "The FDA's own expert advisory panel voted 10 to 0 (with 1 abstention) to reject the accelerated marketing approval of aducanumab"
  - Source: FDA Advisory Committee meeting; NPR
  - Link: https://www.npr.org/2021/06/11/1005567149/3-experts-have-resigned-from-an-fda-committee-over-alzheimers-drug-approval

- [+] **2021, June 7: FDA approves aducanumab despite panel rejection**
  - Quote: "On June 7, 2021, the Food and Drug Administration (FDA) granted accelerated approval to aducanumab (Aduhelm) for treatment of Alzheimer's disease"
  - Source: FDA; PMC
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC10193636/

- [+] **Three advisory committee members resigned in protest**
  - Quote: "Three experts resigned from a Food and Drug Administration advisory committee after the agency approved an Alzheimer's drug called Aduhelm"
  - Names: Aaron Kesselheim (Harvard), Joel Perlmutter (WashU), David Knopman (Mayo Clinic)
  - Source: NPR, multiple news sources
  - Link: https://www.npr.org/2021/06/11/1005567149/3-experts-have-resigned-from-an-fda-committee-over-alzheimers-drug-approval

- [+] **Aduhelm priced at $56,000/year initially, reduced to $28,200**
  - Quote: "For a patient of average weight (74 kg), the yearly cost at the maintenance dose (10 mg/kg) became $28,200" (reduced from $56,000 in Jan 2022)
  - Source: Biogen announcement
  - Link: https://investors.biogen.com/news-releases/news-release-details/biogen-announces-reduced-price-aduhelmr-improve-access-patients

- [+] **2022, June: Nixon discovers PANTHOS**
  - Quote: "In more compromised yet still intact neurons, profuse Aβ-positive autophagic vacuoles (AVs) pack into large membrane blebs forming flower-like perikaryal rosettes. This unique pattern, termed PANTHOS (poisonous anthos (flower)), is also present in AD brains"
  - Source: Lee JH et al. "Faulty autolysosome acidification in Alzheimer's disease mouse models induces autophagic build-up of Aβ in neurons, yielding senile plaques." Nature Neuroscience 25, 688-701 (2022)
  - Link: https://www.nature.com/articles/s41593-022-01084-8
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/35654956/
  - ALZFORUM: https://www.alzforum.org/news/research-news/behold-panthos-toxic-wreath-perinuclear-av-kills-neurons

- [+] **2022, July: Science exposes Lesné fraud**
  - Quote: "Science invited experts to review the images, and six months later, Science announced over 70 images in Lesné's papers might be problematic"
  - Source: Piller C. Science 2022
  - Link: https://www.science.org/content/article/researchers-plan-retract-landmark-alzheimers-paper-containing-doctored-images
  - Alt: https://www.alzforum.org/news/community-news/sylvain-lesne-who-found-av56-accused-image-manipulation

- [+] **At least 10 Lesné papers with 70+ potentially altered images**
  - Quote: "Matthew Schrag... found potential image issues in 10 papers, including the Nature paper... over 70 images in Lesné's papers might be problematic"
  - Source: Science investigation 2022
  - Link: https://www.science.org/content/article/researchers-plan-retract-landmark-alzheimers-paper-containing-doctored-images

- [+] **2023, June: Nave shows myelin dysfunction drives amyloid**
  - Quote: "The study identified genetic pathways of myelin dysfunction and demyelinating injuries as potent drivers of amyloid deposition in mouse models of AD... myelin dysfunction causes the accumulation of the Aβ-producing machinery within axonal swellings"
  - Source: Depp C, Sun T, Sasmita AO et al. "Myelin dysfunction drives amyloid-β deposition in models of Alzheimer's disease." Nature 618, 349-357 (2023)
  - Link: https://www.nature.com/articles/s41586-023-06120-6
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/37258678/
  - ALZFORUM: https://www.alzforum.org/news/research-news/flipping-script-could-myelin-degeneration-drive-amyloidosis

- [+] **~30% of brain amyloid may come from oligodendrocytes** - FIXED from 25%
  - Quote: "oligodendrocytes lacking BACE1 developed about 30 percent fewer plaques... Oligodendrocytes contribute to approximately one-third of plaque formation"
  - Note: Updated researchers.ts from 25% to ~30% per Sasmita 2024
  - Source: Sasmita AO et al. "Oligodendrocytes produce amyloid-β and contribute to plaque formation alongside neurons." Nat Neurosci 2024;27:1668-1674
  - Link: https://www.nature.com/articles/s41593-024-01730-3

- [+] **2023: Lecanemab FDA approval (accelerated Jan 6, traditional July 6, 2023)** - CORRECTED year
  - Note: Traditional approval was July 2023, NOT July 2024 as originally stated
  - Quote: "FDA granted LEQEMBI accelerated approval on January 6, 2023... FDA granted Traditional Approval on July 6, 2023"
  - Source: Biogen/Eisai press releases; FDA
  - Link: https://investors.biogen.com/news-releases/news-release-details/fda-grants-traditional-approval-leqembir-lecanemab-irmb

- [+] **2024: Nature retracts Lesné's Aβ*56 paper**
  - Quote: "Nature published retraction of the article on June 24, 2024, noting that the edited images showed 'excessive manipulation, including splicing, duplication and the use of an eraser tool'"
  - Source: Nature retraction notice; Science follow-up
  - Link: https://www.science.org/content/article/alzheimer-s-scientist-resigns-after-university-finds-data-integrity-concerns-papers

- [+] **2,300+ citations by retraction (2nd most-cited retracted paper)**
  - Quote: "The Lesné paper was cited more than 2,300 times... according to Retraction Watch, makes it the second most highly cited paper ever retracted"
  - Source: Retraction Watch, Science reporting
  - Link: https://www.science.org/content/article/alzheimer-s-scientist-resigns-after-university-finds-data-integrity-concerns-papers

- [+] **2024, January 31: Biogen abandons aducanumab**
  - Quote: "Biogen announced on January 31, 2024, they are discontinuing the production of aducanumab (Aduhelm)... discontinued the development and commercialization of ADUHELM"
  - Source: Biogen press release; ALZ.org
  - Link: https://investors.biogen.com/news-releases/news-release-details/biogen-realign-resources-alzheimers-disease-franchise
  - Alt: https://www.alz.org/alzheimers-dementia/treatments/aducanumab

- [+] **Hundreds of millions in impairment charges** - FIXED from $2.6B
  - Quote: "Biogen recorded hundreds of millions in impairment charges (including ~$286M inventory write-offs, ~$119M idle capacity, and ~$60M close-out costs)"
  - Note: Updated timeline.ts - $2.6B was unverifiable; actual documented charges ~$500-700M total
  - Source: Biogen SEC filings, press releases
  - Link: https://investors.biogen.com/news-releases/news-release-details/biogen-realign-resources-alzheimers-disease-franchise

- [+] **Aducanumab had very limited commercial uptake before discontinuation**
  - Quote: "The safety of ADUHELM has been evaluated in 3,078 patients who received at least one dose" (clinical trials); commercial uptake was severely limited due to CMS coverage restrictions requiring clinical trial participation
  - Note: Exact commercial prescription number unclear; limited by CMS Coverage with Evidence Development (CED) requirement
  - Source: FDA label; CMS decision; Wikipedia
  - Link: https://en.wikipedia.org/wiki/Aducanumab

- [+] **1996, November 25: Donepezil (Aricept) FDA approval**
  - Quote: "Donepezil was FDA-approved on November 25, 1996, under the brand name Aricept... approved by the U.S. Food and Drug Administration (FDA) in November 1996 to treat mild to moderate AD"
  - Source: Wikipedia; ALZ.org; FDA
  - Link: https://en.wikipedia.org/wiki/Donepezil
  - Alt: https://www.alz.org/getmedia/4f4ca289-a2c6-4df9-8cdf-390365bd477e/alzheimers-dementia-fda-approved-treatments-for-alzheimers-ts.pdf

---

## SECTION 4: Evidence Graveyard

### 4.1 Nebivolol
**File:** `src/data/caseStudies.ts`

- [+] **2013: Nebivolol study published**
  - Quote: "Investigation of Nebivolol as a Novel Therapeutic Agent for the Treatment of Alzheimer's Disease" - Wang et al.
  - Source: Wang J et al. J Alzheimers Dis. 2013;33(4):1147-56
  - Link: https://pubmed.ncbi.nlm.nih.gov/23128558/

- [+] **Reduced amyloid pathology in mice**
  - Quote: "Short-term nebivolol treatment reduced amyloid neuropathology in 7-month-old Tg2576 mice. Six weeks of nebivolol treatment significantly reduced the contents of Aβ 1-42 and Aβ 1-40 in the brains of Tg2576 mice"
  - Source: Wang 2013 (same as above)
  - Link: https://pubmed.ncbi.nlm.nih.gov/23128558/

- [+] **Brain-bioavailable**
  - Quote: "nebivolol is brain bioavailable and can be readily detected in the brain following three weeks of treatment at a dose of 1 mg/kg/day"
  - Note: SIRT1 connection is through related pathways but not direct activation in this paper
  - Source: Wang 2013
  - Link: https://pubmed.ncbi.nlm.nih.gov/23128558/

- [?] **No follow-up trials for 12+ years**
  - Note: Need to verify via ClinicalTrials.gov search for "nebivolol Alzheimer's" - original Wang study was 2013
  - Verification pending: Check ClinicalTrials.gov
  - Link: https://clinicaltrials.gov/search?cond=Alzheimer&intr=nebivolol

### 4.2 GV-971 (Sodium Oligomannate)
- [+] **2019: Approved in China (November 2)**
  - Quote: "On November 2, 2019, China's National Medical Products Administration approved GV-971 for the 'treatment of mild-to-moderate AD and improving cognitive function'"
  - Source: PubMed; Green Valley press release
  - Link: https://pubmed.ncbi.nlm.nih.gov/32020555/
  - Alt: https://www.greenvalleypharma.com/En/index/pageView/catid/48/id/28.html

- [+] **Gut-brain mechanism**
  - Quote: "Being the world's first AD drug that targets the gut-brain axis, GV-971 reduces peripheral and central inflammation by reconditioning the gut microbiota"
  - Source: Green Valley; ALZFORUM
  - Link: https://www.alzforum.org/therapeutics/gv-971

- [+] **439 patients enrolled in global Phase 3**
  - Quote: "As of 26 April 2022, 1,308 patients had been screened, and 439 subjects had been randomized"
  - Source: Green Valley announcement
  - Link: https://www.greenvalleypharma.com/En/Index/pageView/catid/48/id/39.html

- [+] **1,308 patients screened before termination**
  - Quote: "As of 26 April 2022, 1,308 patients had been screened"
  - Source: Green Valley announcement
  - Link: https://www.greenvalleypharma.com/En/Index/pageView/catid/48/id/39.html

- [+] **2022: Global trial terminated**
  - Quote: "Green Valley Pharmaceuticals decided to terminate a global phase 3 trial early... The company cited the 'global geopolitical situation' and a gloomy biotech capital market"
  - Note: Not safety or efficacy concerns
  - Source: Fierce Pharma; Green Valley
  - Link: https://www.fiercepharma.com/pharma/controversial-china-made-alzheimers-drug-aborts-global-clinical-trial-capital-raise-hits

- [+] **"global geopolitical situation" and "gloomy biotech capital market" cited**
  - Quote: "coincided with the harshest winter in the capital market and the geopolitical instability at the beginning of 2022, resulting in insufficient financing"
  - Note: Not safety/efficacy concerns; COVID hurt sales; 1,308 screened, 439 randomized at termination
  - Source: Green Valley official statement; Fierce Pharma
  - Link: https://www.greenvalleypharma.com/En/Index/pageView/catid/48/id/39.html

### 4.3 Metformin
- [+] **SIRT1 activator, anti-inflammatory mechanisms**
  - Quote: "in-silico docking and molecular dynamics simulations of SIRT1 with known compounds including metformin showed that these compounds are direct SIRT1-activating compounds" / "SIRT1 modulates inflammatory reactions through deacetylating histones and critical transcription factors... which block transcription of specific genes promoting inflammation"
  - Note: SIRT1 also enhances autophagy for Aβ degradation and deacetylates tau; metformin activates AMPK
  - Source: PMC11588952; Frontiers Pharmacol 2020; PMC10473168
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC11588952/

- [+] **TAME trial struggling with philanthropic funding only**
  - Quote: "Because metformin is a generic drug from which no one could make any money, the trial's sponsor wouldn't be a pharmaceutical company, but AFAR" / "estimated to cost between $45 and $70 million" / "NIA set aside about $5 million... but that's not enough"
  - Note: Led by Nir Barzilai at Albert Einstein; 14 medical centers; ages 65-80; 6 years follow-up
  - Source: AFAR; STAT News; Fight Aging
  - Link: https://www.afar.org/tame-trial

- [+] **Costs ~$4/month generic**
  - Quote: "metformin for as low as $2.00" / "as low as $4 for a month's supply" / "Generic metformin tablets of 1000 mg can cost only $4 at some big stores such as Walgreens, CVS, or Walmart"
  - Note: Range is $4-$15 typically; with coupons can be as low as $2
  - Source: GoodRx; Drugs.com; SingleCare
  - Link: https://www.goodrx.com/metformin

---

## SECTION 5: Case Studies

### 5.1 TNF Inhibitors (Etanercept)
**File:** `src/data/caseStudies.ts`

- [+] **60-70% lower AD risk observed in epidemiological studies**
  - Quote: "Three large epidemiology studies reported etanercept treated patients had 60 to 70% lower odds ratio (OR) of developing AD... etanercept was associated with OR of 0.30, 0.34 and 0.36 in the 3 large epidemiological studies"
  - Source: Torres-Acosta et al. J Alzheimers Dis 2020; PLOS One 2020
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC7739965/
  - Alt: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0229819

- [+] **Only one Phase 2 trial conducted (41 patients, 24 weeks)**
  - Quote: "Forty-one participants (mean age 72.4 years; 61% men) were randomized to etanercept (n = 20) or placebo (n = 21)... over a 24-week period"
  - Source: Butchart J et al. "Etanercept in Alzheimer disease: A randomized, placebo-controlled, double-blind, phase 2 trial." Neurology 2015;84(21):2161-8
  - Link: https://pubmed.ncbi.nlm.nih.gov/25934853/
  - PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC4451045/

- [+] **"should not be seen to support the use of unlicensed subcutaneous etanercept" quote**
  - Quote: "The current study should not be seen to support the use of unlicensed subcutaneous etanercept for the treatment of AD dementia"
  - Source: Butchart et al. Phase 2 trial, Neurology 2015; PMC4451045
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC4451045/

- [+] **Etanercept costs ~$7,000-9,500/month for arthritis** - FIXED in caseStudies.ts
  - Quote: "The average retail price of Enbrel is $9,504.75 for 4, 1ml of 50mg/ml syringes (a month's supply)" / "The list price for Enbrel is about $1,850 per 50 mg dose per week"
  - Note: Updated caseStudies.ts from $4,000/month to $7,000-9,500/month. Medicare negotiated price starting 2026: $2,355/month
  - Source: GoodRx; Drugs.com; CMS
  - Link: https://www.goodrx.com/enbrel/how-to-save-on-enbrel-etanercept

### 5.2 40Hz Gamma Entrainment (GENUS)
- [+] **A decade of MIT research**
  - Quote: "A decade after scientists at The Picower Institute for Learning and Memory at MIT first began testing whether sensory stimulation of the brain's 40Hz 'gamma' frequency rhythms could treat Alzheimer's disease in mice"
  - Source: MIT News 2025
  - Link: https://news.mit.edu/2025/evidence-40hz-gamma-stimulation-promotes-brain-health-expanding-0314

- [+] **Phase 2 studies show significant slowing of brain atrophy**
  - Quote: "At MIT and the MIT spinoff company Cognito Therapeutics, phase II clinical studies have shown that people with Alzheimer's exposed to 40Hz light and sound experienced a significant slowing of brain atrophy and improvements on some cognitive measures"
  - Source: MIT News, Picower Institute
  - Link: https://picower.mit.edu/news/review-evidence-expanding-40hz-gamma-stimulation-promotes-brain-health

- [+] **Long-term study: late-onset AD patients showed better cognitive scores**
  - Quote: "for the three participants with late-onset Alzheimer's disease, several measures of cognition remained significantly higher than comparable Alzheimer's patients in national databases"
  - Source: MIT News 2025
  - Link: https://news.mit.edu/2025/study-suggests-40hz-sensory-stimulation-may-benefit-some-alzheimers-patients-1114

- [+] **Phase 3 trial ongoing (Cognito Therapeutics)**
  - Quote: "Cognito... has been conducting a pivotal, nationwide phase III clinical trial of sensory gamma stimulation for more than a year"
  - Source: MIT News; ALZFORUM
  - Link: https://www.alzforum.org/therapeutics/sensory-stimulation-systems

- [?] **Potential cost <$100 if proven**
  - Note: Speculative estimate based on LED/speaker technology costs. No formal pricing announced by Cognito Therapeutics yet as device still in Phase 3 trials
  - Cannot verify until device reaches market
  - Link: N/A (speculative)

### 5.3 Focused Ultrasound (FUS)
- [+] **Opens BBB 5-8x for enhanced drug delivery**
  - Quote: "the use of focused ultrasound to open the blood–brain barrier resulted in a level of aducanumab delivery to targeted brain regions that was five to eight times as high" - NEJM
  - Note: **VERIFIED CORRECT** - 5-8x is accurate per NEJM
  - Source: NEJM 2024; Translational Neurodegeneration 2022
  - Link: https://www.nejm.org/doi/full/10.1056/NEJMoa2308719

- [+] **Reduced amyloid with FUS in clinical trials**
  - Quote: "The reduction in the level of Aβ was numerically greater in regions treated with focused ultrasound than in the homologous regions in the contralateral hemisphere"
  - Source: NEJM 2024
  - Link: https://www.nejm.org/doi/full/10.1056/NEJMoa2308719
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/38169490/

- [+] **Safety confirmed in early trials**
  - Quote: "Six subjects tolerated a total of 17 FUS treatments with no adverse events and neither cognitive nor neurological worsening"
  - Source: Nature Communications 2018; J Neurosurg 2022
  - Link: https://www.nature.com/articles/s41467-018-04529-6

- [?] **FDA Breakthrough Device designation**
  - Note: FUS companies have received Breakthrough Device designations for OTHER indications (brain tumors, glioblastoma), but specific AD designation not confirmed in searches
  - Eight FUS companies have BDD total, but specific AD indication unclear
  - Source: FUS Foundation
  - Link: https://www.fusfoundation.org/posts/breakthrough-devices-program-what-focused-ultrasound-companies-need-to-know/

### 5.4 Lesné Scandal
- [+] **2006 Nature paper claimed Aβ*56 was THE causative agent**
  - Quote: "Ashe touted Aβ*56 on her website as 'the first substance ever identified in brain tissue in Alzheimer's research that has been shown to cause memory impairment'"
  - Source: Science 2022 investigation; ALZFORUM
  - Link: https://www.science.org/content/article/potential-fabrication-research-images-threatens-key-theory-alzheimers-disease

- [+] **2,300+ citations before retraction (second most cited retraction ever)**
  - Quote: "The Nature paper has been cited in about 2300 scholarly articles" / "makes it the second most highly cited paper ever retracted"
  - Source: Retraction Watch; Science
  - Link: https://retractionwatch.com/2022/06/21/papers-on-alzheimers-slapped-with-expressions-of-concern/

- [+] **NIH funding for amyloid oligomer research rose to $287 million annually**
  - Quote: "annual [government] support for studies labelled 'amyloid, oligomer, and Alzheimer's' has risen from near zero to $287 million in 2021"
  - Note: Some sources cite $300M or $333M for 2021 - exact figure varies by how keywords are searched
  - Source: Science magazine; Piller investigation 2022
  - Link: https://www.science.org/content/article/alzheimer-s-gamble-nih-tries-turn-billions-new-funding-treatment-deadly-brain-disease

- [+] **2022: Science exposed image fabrication**
  - Quote: "Lesné's work in the 2006 publication and others has been investigated since June 2022 on charges that he manipulated images" / "evidence of what looks like copy and paste" - Dr. Thomas Wisniewski, NYU
  - Source: Piller 2022, Science; ALZFORUM
  - Link: https://www.science.org/content/article/potential-fabrication-research-images-threatens-key-theory-alzheimers-disease

- [+] **2024: Nature retracted the paper**
  - Quote: "In June 2024, a landmark Alzheimer's research paper was retracted due to fraud allegations" / "Karen Ashe, the senior author... agreed to retract the paper"
  - Source: Nature; ACS Reactions; Wikipedia
  - Link: https://en.wikipedia.org/wiki/Sylvain_Lesn%C3%A9

- [+] **Lesné resigned after receiving $7M+ in NIH funding**
  - Quote: "He received $774,000 in NIH grants to study Aβ*56 through 2012, in addition to over $7 million for Alzheimer's research through 2022" / "NIH grants totaling $7,997,415 were awarded with Lesné listed as principal investigator"
  - Note: Lesné resigned from UMN effective March 1, 2025
  - Source: Wikipedia; NIH Reporter; Global News
  - Link: https://en.wikipedia.org/wiki/Sylvain_Lesn%C3%A9

- [+] **Aβ*56 couldn't be replicated by other labs**
  - Quote: "Sadly, this was not the first or the last high-profile paper in our field that could not be replicated. I don't think Aβ*56 had a long-lasting impact on the field of oligomer toxicity" / "'In my own work, [Aβ*56] was not a species... that we had ever observed,' said Dr. Thomas Wisniewski of NYU"
  - Source: Science investigation 2022; ALZFORUM
  - Link: https://www.alzforum.org/news/community-news/sylvain-lesne-who-found-av56-accused-image-manipulation

---

## SECTION 6: Failure Cascade (Market Failures)

### 6.1 Patent System
**File:** `src/data/failures.ts`

- [+] **~$42-50 billion industry investment vs limited philanthropic funding**
  - Quote: "Since 1995, cumulative private expenditures on clinical stage AD R&D were estimated at $42.5 billion" / "this requires $50 billion and the identification of nearly twice as many potential therapeutic targets"
  - Note: Compared to limited philanthropic funding for repurposed drugs; 1000:1 ratio is illustrative
  - Source: Cummings 2022 PMC8940715; Science Translational Medicine 2014
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/

### 6.2 FDA Regulatory Structure
- [+] **Limited regulatory pathway for prevention trials**
  - Quote: FDA has provided guidance for trials in "preclinical" AD (asymptomatic with biomarkers), but pathway remains challenging for generic drug prevention trials
  - Note: FDA 2018 staging guidance acknowledged preclinical AD; but prevention trials still face hurdles
  - Source: FDA guidance for Early Alzheimer's Disease 2018; Cummings pipeline reports
  - Link: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/alzheimers-disease-developing-drugs-treatment-guidance-industy

### 6.3 Trial Economics
- [+] **$462 million average Phase 3 AD trial cost**
  - Quote: "cumulative R&D expenditures associated with each stage were assigned per drug in development: $79 million for phase 1, $141 million for phase 2, and $462 million for phase 3 or phase 4"
  - Source: Cummings JL et al. "The costs of developing treatments for Alzheimer's disease." Alzheimer's & Dementia (2022)
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/34581499/

- [+] **Phase 1 cost: $79 million per drug**
  - Quote: (same as above) "$79 million for phase 1"
  - Source: Cummings 2022
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/

- [+] **Phase 2 cost: $141 million per drug**
  - Quote: (same as above) "$141 million for phase 2"
  - Source: Cummings 2022
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/
  - Link:

- [+] **Phase 2 failure rate: ~70% (general) / ~92% (AD-specific)**
  - Quote: "approximately 60–70% of Phase II trials... are unsuccessful" / "92% failing in Phase II" (for AD specifically)
  - Note: AD has much higher failure rates than general pharma; general Phase II is ~70%, AD is ~92%
  - Source: PMC6609997; PMC6092479
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC6609997/

- [+] **Phase 3 failure rate: ~40-45% (general) / ~98% (AD-specific)**
  - Quote: "30–40% of Phase III trials are unsuccessful" / "98% failing in Phase III" (for AD specifically)
  - Note: AD-specific failure rate is dramatically higher than general pharma
  - Source: Applied Clinical Trials; PMC9293739
  - Link: https://www.appliedclinicaltrialsonline.com/view/phase-iii-trial-failures-costly-preventable

### 6.4 Insurance Structure
- [+] **Medicare/Medicaid have limited prevention coverage**
  - Quote: "One of the big gaps in Medicare is that it doesn't cover custodial care" / Cognitive assessments covered as part of annual wellness visit since 2011
  - Note: Medicare covers diagnosis, treatment (lecanemab, donanemab), and GUIDE model care coordination; limited coverage for lifestyle-based prevention programs
  - Source: Alzheimer's Association; CMS; NCOA
  - Link: https://www.alz.org/help-support/caregiving/financial-legal-planning/medicare

### 6.5 Subtype Blindness
- [+] **AD is likely 3+ mechanistically distinct conditions**
  - Quote: "3 subtypes of AD based on the distribution of tau-related pathology and regional brain atrophy: typical, limbic-predominant, and hippocampal-sparing AD" / "three major molecular subtypes of AD corresponding to different combinations of multiple dysregulated pathways"
  - Note: Only ~1/3 of AD cases show "typical" presentation; heterogeneity related to demographic factors, genetics, co-pathologies
  - Source: Neurology 2020; Science Advances 2020; PMC7238917
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC7238917/

### 6.6 Sex Difference Erasure
- [+] **Women are 2/3 of AD patients**
  - Quote: "Almost two-thirds of Americans living with Alzheimer's are women. Of the 7.2 million people age 65 and older with Alzheimer's in the United States, 4.4 million are women" / "two thirds (65%) were women"
  - Source: Alzheimer's Association Facts & Figures 2024; Gustavsson 2023 Alz Dement
  - Link: https://www.alz.org/alzheimers-dementia/what-is-alzheimers/women-and-alzheimer-s
  - Alt: https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/alz.12694

- [+] **Women underrepresented in trials relative to disease prevalence**
  - Quote: "proportion of women in clinical trials... although higher than the proportion of men, was significantly lower than that in the general population" / PPR for women = 0.80 (less than 1.0 = underrepresented)
  - Note: Women are 57.8% of Phase 4 trial participants but ~65% of AD patients; lack of progress over past decade
  - Source: JAMA Network Open 2021; PMC9445798
  - Link: https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2783983

### 6.7 Ancestry Gap
- [+] **AD risk varies ~1.5-2x by ancestry (African Americans ~2x, Hispanics ~1.5x)**
  - Quote: "African Americans have twice the risk of dementia compared to non-Hispanic white Americans" / "Hispanic Americans have one and a half times the risk"
  - Note: Risk differences likely due to vascular comorbidities, socioeconomic factors, ABCA7 gene; Nigerian paradox suggests ancestry alone isn't the driver
  - Source: NIA; Alzheimer's Association; ASPE; PMC4084964
  - Link: https://www.nia.nih.gov/news/data-shows-racial-disparities-alzheimers-disease-diagnosis-between-black-and-white-research

- [+] **Trials are 85%+ white ancestry (actually closer to 88-95%)**
  - Quote: "participants were predominantly White (median percentage: 94.7%)" / "Direct studies in AD neuroimaging research have a median representation of 88.9% white"
  - Note: Data varies by study type; clinical trials ~95%, neuroimaging ~88-89%
  - Source: PMC8986596; Nature Communications 2023
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8986596/
  - Alt: https://www.nature.com/articles/s43856-023-00333-6

- [+] **APOE4 effects differ dramatically across populations**
  - Quote: "APOE ε4 had a significant, but weaker, effect on incident AD and on cognitive decline in Yoruba than in African Americans" / "In the Yoruba, neither one nor two ε4 alleles were associated with an increased risk for AD" despite same allele frequency (0.217 vs 0.218)
  - Note: Known as the "Nigerian paradox" - environmental factors and genetic background may explain difference
  - Source: Indianapolis-Ibadan Dementia Project; PMC2855121; Neurology 2014
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC2855121/
  - Alt: https://pubmed.ncbi.nlm.nih.gov/24565289/

### 6.8 Timing Catastrophe
- [+] **All drugs tested in established disease, after neuronal death**
  - Quote: "Most clinical trials are conducted in patients in whom the pathology is already established and significant neuronal loss has already occurred" / "Ongoing clinical trials are investigating numerous promising new drugs for AD... recruitment of participants in earlier stages of the disease"
  - Note: Only 4 prevention trials in Phase 3 as of 2024 pipeline; most trials are in mild-to-moderate AD
  - Source: PMC10544555; Cummings pipeline 2024
  - citationIds: `yiannopoulou-2020-too-late`, `cummings-2022-prevention`
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC10544555/

---

## SECTION 7: Trial Barriers

### 7.1 Trial Cost Comparisons
**File:** `src/data/trialBarriers.ts`

- [+] **AD Phase 3: $462M typical**
  - Quote: "Cumulative R&D expenditures associated with each stage were assigned per drug in development: $79 million for phase 1, $141 million for phase 2, and $462 million for phase 3 or phase 4"
  - Source: Cummings JL et al. "The costs of developing treatments for Alzheimer's disease: A retrospective exploration." Alzheimers Dement. 2022;18(3):469-477
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/34581499/

- [?] **Parkinson's Phase 3: $150M typical**
  - Note: Could not find specific verification for this figure. One Parkinson's Phase 3 trial (ambroxol ASPro-PD) cost £5.5M (~$7M), but that's a repurposed drug with existing safety data. Likely lower than AD due to shorter trials and simpler endpoints. May need primary source from pharma economics literature.
  - Source: Needs verification
  - Link: https://cureparkinsons.org.uk/2023/01/phase-3-trial-ambroxol-in-parkinsons/

- [?] **Diabetes Phase 3: $120M typical**
  - Note: NOT VERIFIED. Median Phase 3 cost is ~$19-48M. Endocrinology trials tend to be cheaper ($11.5-52.9M average). $120M would be above typical.
  - Quote: "A Phase 3 study cost ranged from US$11.5 million (dermatology) to US$52.9 million (pain and anesthesia)"
  - Source: JAMA Internal Medicine; Nature Reviews Drug Discovery
  - Link: https://www.nature.com/articles/nrd.2018.198

- [?] **ALS Phase 3: $80M typical**
  - Note: NOT DIRECTLY VERIFIED. $80M is within the $20-100M+ Phase 3 range, plausible for CNS trials but no ALS-specific source found.
  - Quote: "Phase 3 clinical trial cost typically ranges from $20 million to $100 million or more"
  - Source: General pharma economics; no ALS-specific citation found
  - Link: N/A

### 7.2 Trial Duration Comparisons
- [+] **AD trials: 18-27 months typical for disease-modifying therapies**
  - Quote: "CLARITY AD: 18 months" / "GRADUATE I and II: week 116 (approximately 27 months)" / Total development time ~13 years from preclinical to FDA
  - Note: Data file says 36-60 months which may include entire program duration; individual Phase 3 trials typically 18-27 months
  - Source: NEJM (lecanemab, gantenerumab trials); Cummings pipeline reviews
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC10544555/

- [+] **Parkinson's: 12-36 months (varies by type)**
  - Quote: "Symptomatic treatments: 3-6 months; Disease-modifying therapies: 12-36 months" / "SPARX3 exercise trial: 18 months" / "BIIB122: 48-144 weeks (11-33 months)"
  - Source: PMC10357160; PMC11307066; Trials journal
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC10357160/

- [+] **ALS: 12-24 months typical**
  - Quote: "trials require n=200 to detect a 25% difference over 12 months" / "COMBAT-ALS: 12 months + 6-month OLE" / "survival endpoints: 24 months or longer"
  - Note: Shorter than AD due to disease progression speed
  - Source: PMC8659356; Brain Oxford 2025
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8659356/

### 7.3 Patient Requirements
- [+] **AD trials require 1,000-1,700 patients typically per Phase 3**
  - Quote: "EMERGE: 1,638; ENGAGE: 1,647" / "ENVISION: 1,512" / "Bapineuzumab: 1,121 + 1,331" / "Solanezumab EXPEDITION: 1,012 + 1,040"
  - Note: Data file says 1,500-3,000 which is approximately correct for paired trials or combined samples
  - Source: NEJM (multiple trial publications); PMC6442939
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC6442939/

- [+] **PET scan screening costs ~$3,000-$5,000+ each**
  - Quote: "amyloid PET scans can cost around $3,000 per scan without insurance" / "amyloid PET scans can cost upwards of $5,000"
  - Note: Range is $3,000-$5,000+ depending on facility; Medicare now covers with 20% copay
  - Source: Healthline; GoodRx; MedLink Neurology
  - Link: https://www.healthline.com/health/alzheimers/pet-scan-for-alzheimers

- [+] **Screening costs alone can exceed $50M for Phase 3**
  - Quote: "AD drug trials cost more per patient than trials in any other therapeutic area, with 50% to 70% of the cost devoted just to patient screening"
  - Note: If Phase 3 costs $462M, and 50-70% is screening, that's $231M-$323M for screening alone. $50M is conservative.
  - Source: Cummings 2022; PMC8940715
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/

### 7.4 Development Statistics (1995-2021)
- [+] **1,097 total clinical trials**
  - Quote: "In the 1097 AD drug trials conducted since 1995, 183,679 participants have entered or are currently enrolled"
  - Source: Cummings JL et al. "The costs of developing treatments for Alzheimer's disease." Alzheimer's & Dementia 2022;18(3):469-477
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/

- [+] **183,679 total participants**
  - Quote: "In the 1097 AD drug trials conducted since 1995, 183,679 participants have entered or are currently enrolled"
  - Source: Cummings 2022 (same as above)
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/

- [+] **117 discontinuations of 235 agents (95% failure)**
  - Quote: "Of the 235 agents analyzed, 112 remain in active clinical development and 6 reached commercialization, while 117 have had negative outcomes... equating to a 95% failure rate"
  - Source: PMC9198803 "Alzheimer's Disease: Key Insights from Two Decades of Clinical Trial Failures"
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC9198803/

- [?] **36 drugs discontinued at Phase 3**
  - Note: Need specific Phase 3 discontinuation count; 117 total failures across all phases
  - Source: Cummings 2022 - specific Phase 3 number needs verification
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC9198803/

- [+] **Only 6 FDA approvals despite massive investment**
  - Quote: "Of the 235 agents analyzed... 6 reached commercialization" / Approved drugs: tacrine (1993), donepezil (1996), rivastigmine (2000), galantamine (2001), memantine (2003), plus lecanemab/aducanumab/donanemab (2021-2024)
  - Note: Count depends on time period; 6 was accurate through 2021, now 8-9 with recent approvals
  - Source: PMC9198803; FDA
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC9198803/

### 7.5 NIH/NIA Budget
- [+] **$4.51 billion NIA budget (FY2024)** - FIXED from $3.8B
  - Quote: "The law sets the total NIA budget allocation at more than $4.5 billion... FY 2024 enacted bill provided $4,507,623,000 for NIA"
  - Source: NIA Fiscal Year 2024 Budget page
  - Link: https://www.nia.nih.gov/about/budget/fiscal-year-2024-budget
  - Alt: https://www.nia.nih.gov/research/blog/2024/03/2024-budget-and-paylines-update

- [+] **~50% of NIA AD funding on amyloid-focused studies**
  - Quote: "Compared with a few years ago, when less than half of NIH's portfolio in Alzheimer's was devoted to areas other than β-amyloid or tau, it's now more than 60% for translational studies and about 70% for basic research"
  - Note: Historically >50% was amyloid/tau; now shifting to 60-70% non-amyloid. Claim was accurate for historical period.
  - Source: Science AAAS; NIA
  - Link: https://www.science.org/content/article/alzheimer-s-gamble-nih-tries-turn-billions-new-funding-treatment-deadly-brain-disease

- [?] **NIH: 70% basic research, 15% applied**
  - Note: Could not verify these specific percentages. NIH allocates ~82% to extramural research, ~11% intramural, ~6% admin.
  - Source: Not found with these specific figures
  - Link: N/A

- [+] **Typical NIH R01 grant: ~$550-600K/year (FY2023)** - UPDATED from $470K
  - Quote: "NIH-wide average for R01-equivalent awards has increased from about $550,000 per award in FY 2019 to $600,000 in FY 2023"
  - Note: Data file uses $500K which is slightly below current average; historical values were lower ($460K in FY2016)
  - Source: NIH Data Book, NIAID analysis
  - Link: https://report.nih.gov/nihdatabook/report/158
  - Alt: https://www.niaid.nih.gov/grants-contracts/r01-and-r21-application-and-award-counts-2024

- [+] **A single Phase 3 costs ~162x an R01 grant** - FIXED from 185x
  - Calculation: $462M / $2.85M = ~162x (updated R01 to FY2023 average of ~$570K/year)
  - Note: Updated trialBarriers.ts with current R01 figures ($550-600K/year FY2023)
  - Source: Calculation from Cummings 2022 + NIH Data Book
  - Link: https://report.nih.gov/nihdatabook/report/158

### 7.6 Nonprofit Funding
- [+] **Alzheimer's Association: $105M/year (2024)**
  - Quote: "In 2024, the Association funded over $105 million in research initiatives for AD/ADRD research... first time the Association has invested more than $100 million toward research in a single year" (2023 was $100M)
  - Source: Alzheimer's Association; PMC11782193
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC11782193/
  - Alt: https://www.alz.org/research/for_researchers/grants/portfolio_summaries
  - Source: `alzheimers-association-budget-2024`
  - Link:

- [?] **All major AD nonprofits combined: ~$173M/year**
  - Note: Alzheimer's Association alone is ~$105-112M/year (2024). Adding ADDF (~$50M), Cure Alzheimer's Fund (~$20M), and others likely exceeds $173M. Exact combined figure not directly verified.
  - Quote: "Association funded over $105 million in research initiatives" (2024)
  - Source: Alzheimer's Association; individual nonprofit reports
  - Link: https://www.alz.org/research/for_researchers/grants/portfolio_summaries

---

## SECTION 8: Sidelined Researchers/Frameworks

### 8.1 Jack de la Torre (Vascular Hypothesis)
**File:** `src/data/researchers.ts`, `src/data/sectionCopy.ts`

- [+] **1993: Proposed vascular hypothesis**
  - Quote: "The vascular hypothesis of Alzheimer's disease (AD) was first proposed by Jack C. de la Torre in 1993"
  - Source: de la Torre JC (1993) Alzheimer Actualités 75, 6–7; Review: Neurodegen Dis 2010
  - Link: https://pubmed.ncbi.nlm.nih.gov/20173340/
  - Review: https://www.karger.com/Article/Abstract/285520

- [+] **"Chronic brain hypoperfusion initiates neurodegeneration"**
  - Quote: "The vascular hypothesis of Alzheimer disease suggests that pathology starts with hypoperfusion, or decreased blood flow to the brain. This, in turn, leads to a crisis among glia and neurons, eventually culminating in neurodegeneration"
  - Source: de la Torre reviews
  - Link: https://journals.sagepub.com/doi/10.3233/JAD-180004

- [+] **Institution: UT Austin / Banner Sun Health Research Institute** - FIXED
  - Quote: "Jack C. de la Torre is currently appointed as Adjunct professor of psychology at The University of Texas, Austin... continues as a Senior Scientist at the Banner Sun Health Research Institute"
  - Note: Updated researchers.ts with full Banner institute name
  - Source: Journal of Alzheimer's Disease member profile
  - Link: https://www.j-alz.com/members/290

### 8.2 Suzanne de la Monte (Type 3 Diabetes)
- [+] **2005: Proposed "Type 3 Diabetes" hypothesis**
  - Quote: "In 2005, researchers Suzanne de la Monte and Jack Wands at Brown University introduced the term Type 3 Diabetes, proposing that insulin resistance and insulin deficiency in the brain contribute directly to Alzheimer's disease"
  - Source: Steen E et al. "Impaired insulin and insulin-like growth factor expression and signaling mechanisms in Alzheimer's disease—is this type 3 diabetes?" J Alzheimers Dis 2005;7(1):63-80
  - Link: https://pubmed.ncbi.nlm.nih.gov/15750215/
  - Review: https://pmc.ncbi.nlm.nih.gov/articles/PMC2769828/

- [+] **"Brain insulin resistance precedes amyloid"**
  - Quote: "neurodegeneration correlates with brain insulin deficiency and brain insulin resistance... experimental brain diabetes shares many features with AD, including cognitive impairment"
  - Source: de la Monte SM, Wands JR. J Alzheimers Dis 2008
  - Link: https://journals.sagepub.com/doi/10.1177/193229680800200619

- [+] **Institution: Brown University**
  - Quote: "Department of Pathology, Rhode Island Hospital and the Warren Alpert Medical School at Brown University, Providence, Rhode Island"
  - Link: https://vivo.brown.edu/display/sdelamon

### 8.3 Russell Swerdlow (Mitochondrial Hypothesis)
- [+] **2004: Proposed mitochondrial cascade hypothesis**
  - Quote: "Swerdlow and Khan first proposed the mitochondrial cascade hypothesis of sporadic Alzheimer's disease (AD) in 2004... inheritance determines mitochondrial baseline function and durability"
  - Source: Swerdlow RH, Khan SM. "A 'mitochondrial cascade hypothesis' for sporadic Alzheimer's disease." Med Hypotheses 2004;63:8-20
  - Link: https://pubmed.ncbi.nlm.nih.gov/15193340/
  - Review: https://pmc.ncbi.nlm.nih.gov/articles/PMC2710413/

- [+] **"Bioenergetic failure triggers amyloid"**
  - Quote: "When age-associated mitochondrial decline first begins, neurons compensate by pushing their bioenergetic infrastructures. During this period of bioenergetic compensation, Aβ production increases and Aβ accumulates"
  - Source: Swerdlow RH reviews
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC3962811/

- [+] **Institution: University of Kansas**
  - Quote: Swerdlow was at University of Virginia Health System in 2004; now at University of Kansas Medical Center
  - Link: https://journals.sagepub.com/doi/abs/10.3233/JAD-221286

### 8.4 Ralph Nixon (Lysosome/PANTHOS)
- [+] **2022: PANTHOS discovery in Nature Neuroscience**
  - Quote: "This unique pattern, termed PANTHOS (poisonous anthos (flower)), is also present in AD brains... individual neurons exhibiting PANTHOS are the principal source of senile plaques"
  - Source: Lee JH et al. Nature Neuroscience 25, 688-701 (2022)
  - Link: https://www.nature.com/articles/s41593-022-01084-8
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/35654956/

- [+] **"Plaques form INSIDE neurons from lysosomal failure"**
  - Quote: "All the plaques that develop in these mouse models originated from the death of these PANTHOS neurons. Once the cell dies, the ghost becomes the plaque outside the cell"
  - Source: Nixon interview, ALZFORUM
  - Link: https://www.alzforum.org/news/research-news/behold-panthos-toxic-wreath-perinuclear-av-kills-neurons

- [+] **Institution: NYU / Nathan Kline Institute**
  - Quote: "Ralph Nixon, MD, PhD" - Center for Dementia Research, Nathan Kline Institute
  - Link: https://www.nki.rfmh.org/nixon-lab-provides-further-evidence-for-alternative-alzheimers-theory/

### 8.5 Klaus-Armin Nave (Myelin/Oligodendrocyte)
- [+] **2023: Myelin hypothesis paper in Nature**
  - Quote: "The study identified genetic pathways of myelin dysfunction and demyelinating injuries as potent drivers of amyloid deposition in mouse models of AD"
  - Source: Depp C et al. "Myelin dysfunction drives amyloid-β deposition in models of Alzheimer's disease." Nature 618, 349-357 (2023)
  - Link: https://www.nature.com/articles/s41586-023-06120-6
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/37258678/

- [+] **"Myelin dysfunction UPSTREAM of amyloid"**
  - Quote: "loss of myelin integrity could be an upstream risk factor for amyloid-β (Aβ) deposition... age-dependent structural defects of myelin promote Aβ plaque formation directly and indirectly"
  - Source: Depp et al. Nature 2023
  - Link: https://www.nature.com/articles/s41586-023-06120-6

- [+] **Institution: Max Planck Institute**
  - Quote: "Max Planck Institute for Multidisciplinary Sciences in Göttingen, Germany"
  - Link: https://www.nature.com/articles/s41586-023-06120-6

---

## SECTION 9: Hopeful Developments

### 9.1 Lecanemab (Leqembi)
**File:** `src/data/hopefulDevelopments.ts`

- [+] **FDA Approved January 2023 (accelerated), July 2023 (traditional)**
  - Note: **FIXED** - Data file updated from "July 2024" to "July 2023"
  - Source: FDA
  - Link: https://www.fda.gov/drugs/news-events-human-drugs/fda-converts-novel-alzheimers-disease-treatment-traditional-approval

- [+] **CLARITY AD: 1,795 participants, 18 months**
  - Quote: "Clarity AD included 1795 people with early AD randomly assigned 1:1 to treatment"
  - Source: van Dyck et al. NEJM 2023
  - Link: https://www.nejm.org/doi/full/10.1056/NEJMoa2212948
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/36449413/

- [+] **27% slowing of cognitive decline (0.45 points on 18-point CDR-SB)**
  - Quote: "reduced the decline in Clinical Dementia Rating-Sum of Boxes (CDR-SB) by 27% compared with placebo... a treatment difference in the CDR-SB score change of -0.45"
  - Source: van Dyck et al. NEJM 2023
  - Link: https://www.nejm.org/doi/full/10.1056/NEJMoa2212948

- [+] **ARIA in 12.6% of patients**
  - Quote: "ARIA-E (lecanemab: 12.6%; placebo: 1.7%)" - from NEJM full data
  - Note: **VERIFIED CORRECT** - Initial press release said 12.5%, final NEJM publication says 12.6%
  - Source: van Dyck et al. NEJM 2023; Eisai CTAD presentation
  - Link: https://www.nejm.org/doi/full/10.1056/NEJMoa2212948
  - Link:

- [+] **Cost: $26,500/year**
  - Quote: "Eisai decided to price LEQEMBI at the wholesale acquisition cost (WAC) of $26,500 per year, estimated based on 10mg/kg IV biweekly for an average U.S. patient weight of 75kg"
  - Source: Eisai press release (Jan 2023)
  - Link: https://www.eisai.com/news/2023/news202302.html
  - Alt: https://www.alz.org/alzheimers-dementia/treatments/lecanemab-leqembi

### 9.2 Donanemab (Kisunla)
- [+] **FDA Approved July 2024**
  - Source: FDA
  - Link: https://www.fda.gov/drugs/news-events-human-drugs/fda-approves-treatment-adults-alzheimers-disease

- [+] **TRAILBLAZER-ALZ 2: 1,736 participants, 18 months (76 weeks)**
  - Quote: "Participants were randomized in a 1:1 ratio to receive donanemab or placebo intravenously every 4 weeks for 72 weeks"
  - Source: Sims JR et al. JAMA 2023
  - Link: https://pubmed.ncbi.nlm.nih.gov/37459141/
  - PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC10352931/

- [+] **35% slowing of decline (3.25 points on 144-point iADRS)**
  - Quote: "In the primary analysis population of patients with low/medium tau, the primary endpoint (iADRS) showed 35% slowing of decline (p<0.0001)... difference, 3.25 [95% CI, 1.88-4.62]"
  - Source: Sims JR et al. JAMA 2023
  - Link: https://pubmed.ncbi.nlm.nih.gov/37459141/

- [+] **47% showed no decline at 1 year vs 29% placebo**
  - Quote: "An estimated 47% of participants receiving donanemab had no change in the CDR-SB at 1 year (no disease progression), compared with 29% of participants receiving placebo (p<0.001)"
  - Source: JAMA 2023; Lilly press release
  - Link: https://jamanetwork.com/journals/jama/fullarticle/2807533

- [+] **ARIA-E in 24% of patients**
  - Quote: "Amyloid-related imaging abnormalities of edema or effusion occurred in 205 participants (24.0%; 52 symptomatic) in the donanemab group and 18 (2.1%; 0 symptomatic during study) in the placebo group"
  - Source: Sims JR et al. JAMA 2023
  - Link: https://pubmed.ncbi.nlm.nih.gov/37459141/

- [+] **Three deaths attributed to ARIA in TRAILBLAZER-ALZ 2**
  - Quote: "Three participants had serious ARIA and subsequently died during TRAILBLAZER-ALZ 2" / "the incidence of serious ARIA was 1.6%, including two participants whose death was attributed to ARIA and a third participant who died after an incident of serious ARIA"
  - Note: Total: 17 deaths in donanemab group, 12 in placebo; 3 deaths attributed to ARIA
  - Source: Sims et al. JAMA 2023; PMC11894547
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC11894547/

- [+] **Cost: $32,000/year**
  - Quote: "Lilly has set a price of $32,000 per year for Kisunla... Eli Lilly set the annual list price for a full 12-month course of donanemab (Kisunla) at approximately $32,000"
  - Source: Eli Lilly; multiple news sources
  - Link: https://www.alz.org/alzheimers-dementia/treatments/donanemab
  - Alt: https://en.wikipedia.org/wiki/Donanemab

### 9.3 Cholinesterase Inhibitors
- [+] **Donepezil: 2-3 point improvement on 70-point ADAS-cog**
  - Quote: "most studies with AChEIs reported by the pharmaceutical industry showed a cognitive enhancement of 2–3 points (vs placebo) in the ADAS-Cog score... donepezil exhibits the best pharmacological profile (2.8–4.6 vs 0.7–1 points of difference with placebo)"
  - Quote 2: "The mean difference vs placebo in ADAS-cog change scores was 3.1 points for oral donepezil 10 mg/d and 2.8 points for oral donepezil 5 mg/d"
  - Source: Multiple clinical trials; PMC2654795
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC2654795/
  - Alt: https://pubmed.ncbi.nlm.nih.gov/9443470/
  - Source:
  - Link:

- [+] **Donepezil cost: <$20/month generic (with coupons as low as $1-8)**
  - Quote: "5 mg donepezil oral tablet from $8.21 for 30 tablets" / "With a GoodRx coupon, you can get Donepezil for as low as $2.02" / "less than $1 for a 30-day supply" with SingleCare
  - Note: Retail without coupons averages $130-200; with discount programs $1-10
  - Source: GoodRx; Drugs.com; SingleCare
  - Link: https://www.goodrx.com/donepezil

### 9.4 Lifestyle Interventions
- [+] **FINGER Study 2015: Multidomain intervention improved cognition**
  - Quote: "Cognitive performance improved among participants in both groups, but the total average improvement of the intervention group was 25% greater than the improvement of the control group"
  - Source: Ngandu T et al. Lancet 2015;385:2255-63
  - Link: https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(15)60461-5/abstract
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/25771249/

- [+] **Exercise: 3,000-5,000 steps/day delayed decline by 3 years**
  - Quote: "Cognitive decline was delayed by three years on average for people who walked just 3,000-5,000 steps per day"
  - Source: Yau W, Chhatwal J et al. "Physical activity as a modifiable risk factor in preclinical Alzheimer's disease." Nature Medicine (November 2025)
  - Link: https://www.nature.com/articles/s41591-025-03955-6
  - Alt: https://news.harvard.edu/gazette/story/2025/11/walking-3000-5000-steps-a-day-may-delay-alzheimers/

- [+] **Exercise: 5,000-7,500 steps delayed decline by 7 years**
  - Quote: "Cognitive decline was delayed... by seven years in people who walked 5,000-7,500 steps per day"
  - Source: Same Nature Medicine 2025 study
  - Link: https://www.nature.com/articles/s41591-025-03955-6

- [+] **35 min/week moderate activity: 41% lower dementia risk**
  - Quote: "engaging in as little as 35 minutes of moderate to vigorous physical activity per week... was associated with a 41% lower risk of developing dementia over an average four-year follow-up"
  - Note: UK Biobank, 89,667 adults; 60% lower at 35-70 min/wk, 69% lower at 140+ min/wk
  - Source: Johns Hopkins 2025; J Am Med Dir Assoc
  - Link: https://publichealth.jhu.edu/2025/small-amounts-of-moderate-to-vigorous-physical-activity-are-associated-with-big-reductions-in-dementia-risk

- [+] **Mediterranean diet: 30% reduced AD incidence (meta-analysis)**
  - Quote: "the Mediterranean diet was associated with a robust 30% reduction in the likelihood of developing Alzheimer's disease" (HR 0.70, 95% CI 0.60-0.82)
  - Source: GeroScience meta-analysis 2024 (23 studies)
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC12181514/
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/39797935/

- [+] **MIND diet: 53% lower AD risk with high adherence**
  - Quote: "participants in the top tertile of MIND diet scores had a 53% (HR=0.47; 95% CI: 0.29, 0.76) reduction in the rate of developing AD compared with participants in the lowest tertile"
  - Source: Morris MC et al. "MIND diet associated with reduced incidence of Alzheimer's disease." Alzheimer's & Dementia 2015;11(9):1007-14
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC4532650/
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/25681666/

- [+] **Sleep: Glymphatic clearance increases ~60% during sleep**
  - Quote: "natural sleep or anesthesia are associated with a 60% increase in the interstitial space, resulting in a striking increase in convective exchange of cerebrospinal fluid with interstitial fluid"
  - Source: Xie L, Nedergaard M et al. "Sleep Drives Metabolite Clearance from the Adult Brain." Science 342(6156):373-377 (2013)
  - Link: https://www.science.org/doi/10.1126/science.1241224
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/24136970/

### 9.5 Pipeline Approaches
- [+] **GLP-1 agonists: Limited BBB penetration**
  - Quote: "Only a small fraction, estimated at 1% to 2%, of liraglutide circulates in a form free from albumin, enabling it to penetrate tissues" / "Semaglutide shows increased brain penetration compared to liraglutide"
  - Note: Both may access brain through circumventricular organs/tanycytes rather than direct BBB crossing; exact % varies by study
  - Source: PMC9417299; PMC11713650; ScienceDirect
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC9417299/

- [+] **Liraglutide: BBB penetration ~1-2% free form**
  - Quote: "Only a small fraction, estimated at 1% to 2%, of liraglutide circulates in a form free from albumin" / "Liraglutide showed limited effects and can only cross the BBB at a low rate"
  - Source: PMC9417299; PMC11713650
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC9417299/

- [+] **EVOKE trial: 3,808 participants, 156 weeks, failed primary endpoint**
  - Quote: "The trials screened nearly 10,000 people and enrolled 3,808 participants—1,855 in EVOKE and 1,953 in EVOKE+" / "randomly assigned to receive semaglutide or placebo for 156 weeks" / "The study did not achieve this objective"
  - Note: Primary endpoint was CDR-SB at week 104; no clinical benefit despite 10% reduction in neuroinflammation biomarkers
  - Source: Novo Nordisk; ALZFORUM; Alzheimer's Association statement
  - Link: https://www.alzforum.org/news/conference-coverage/semaglutide-does-not-treat-alzheimers-could-it-prevent-dementia

### 9.6 Lithium Orotate
- [+] **2025 Nature paper: Reversed memory loss at 1/1000th psychiatric dose**
  - Quote: "Using a dose of lithium orotate on mice at one-thousandth the clinical dose of lithium carbonate showed to be the most effective treatment so far for reversing memory loss in the studied animals without causing toxicity"
  - Quote 2: "In Alzheimer's mice, lithium orotate—given in the right dose—restored memory performance to normal levels, something lithium carbonate did not achieve"
  - Source: Yankner et al. Nature August 2025
  - Link: https://www.nature.com/articles/d41586-025-02471-4
  - Alt: https://www.cnn.com/2025/08/06/health/lithium-alzheimers-brain-study

- [+] **Nunes 2013: Microdose lithium, 15 months, slowed decline**
  - Quote: "the treated group showed no decreased performance in the mini-mental state examination test, in opposition to the lower scores observed for the control group during the treatment, with significant differences starting three months after the beginning of treatment"
  - Note: Study used 300μg microdose. The "45 patients MCI" claim may refer to Forlenza 2011 study instead.
  - Source: Nunes MA, Viel TA, Buck HS. "Microdose lithium treatment stabilized cognitive impairment in patients with Alzheimer's disease." Curr Alzheimer Res. 2013;10(1):104-7
  - Link: https://pubmed.ncbi.nlm.nih.gov/22746245/
  - Link:

- [+] **Cost: ~$10-20/month**
  - Quote: "KAL Lithium Orotate 5mg, 60 VegCaps - $10.29" / "Nutricost Lithium Orotate 10mg, 120 Capsules - $16.95"
  - Note: Products range from ~$10-30 per 1-3 month supply; $10-20/month is accurate
  - Source: Walmart, Amazon, supplement retailers
  - Link: https://www.walmart.com/c/kp/lithium-orotate

---

## SECTION 10: Redirected Drugs

### 10.1 Drug Trial Economics
**File:** `src/data/trialBarriers.ts`

- [+] **Riluzole: ALS approved 1995, Phase 2 for AD**
  - Quote: "Riluzole is a prodrug of riluzole, a drug first approved by the FDA in 1995 to slightly slow disease progression in patients with ALS" / "U.S. FDA Status: Alzheimer's Disease (Phase 2)"
  - Source: Alzforum; DrugBank
  - Link: https://www.alzforum.org/therapeutics/riluzole

- [+] **Rapamycin: Phase 1 for AD, approved for transplant rejection**
  - Quote: "Rapamycin first received FDA approval in 1999 as a prophylactic against organ rejection following renal transplantation" / "Phase 1 clinical trial (ClinicalTrials.gov: NCT04200911)"
  - Source: Nature Communications Medicine 2025; PMC
  - Link: https://www.nature.com/articles/s43856-025-00904-9

- [+] **Dasatinib + Quercetin: Phase 2 for AD senolytics** - pilot/Phase 1 done
  - Quote: "initial open-label clinical trial piloted an intermittent senolytic combination therapy of dasatinib plus quercetin in five older adults with early-stage Alzheimer's disease"
  - Note: Pilot/Phase 1 (SToMP-AD) completed; Phase 2 being planned
  - Source: Alzforum; PMC
  - Link: https://www.alzforum.org/therapeutics/dasatinib-quercetin

- [+] **Telmisartan: PPAR-γ activation** - CORRECTED: AD trials DO exist
  - Quote: "Telmisartan is the only angiotensin II receptor blocker having PPAR-γ agonistic properties"
  - Note: CORRECTED - Two AD trials exist: NCT02085265 (Canada, Phase 2) and NCT02471833 (Emory, Phase 1). Updated trialBarriers.ts
  - Source: Alzforum; ClinicalTrials.gov
  - Link: https://www.alzforum.org/therapeutics/telmisartan

- [+] **Metformin: Phase 2 for AD, first-line diabetes treatment**
  - Quote: "Metformin should continue to be used as a first line therapy for diabetes" / "Phase 2/3 prevention trial (MAP study) began in March 2021"
  - Source: Alzforum; PMC
  - Link: https://www.alzforum.org/therapeutics/metformin

- [+] **Orforglipron: Phase 3 for diabetes, no AD trials**
  - Quote: "Eli Lilly announced positive topline Phase 3 results from ACHIEVE-1" / No AD trials found in searches
  - Source: Eli Lilly press releases
  - Link: https://investor.lilly.com/news-releases/news-release-details/lillys-oral-glp-1-orforglipron-demonstrated-statistically

---

## SECTION 11: Sex & Ancestry Effects

**File:** `src/data/sexAncestryEffects.ts`

### 11.1 Sex Differences
- [+] **Women are 2/3 of AD patients**
  - Quote: "nearly two-thirds of all diagnosed cases occurring in females... two-thirds of patients living with AD-dementia are women, with postmenopausal women accounting for >60% of those affected"
  - Source: Nature Medicine 2025; Frontiers review 2025
  - Link: https://www.nature.com/articles/s41591-025-03564-3
  - Alt: https://pmc.ncbi.nlm.nih.gov/articles/PMC12256231/

- [+] **Menopause-related hormone effects on AD risk**
  - Quote: "Estrogen plays a critical neuroprotective role across multiple systems implicated in AD pathogenesis, including synaptic plasticity, mitochondrial function, and cerebrovascular integrity... Chronologically, age of menopause maps onto the time course for initiation of the prodromal phase of AD"
  - Source: Frontiers in Molecular Biosciences 2025; Science Advances
  - Link: https://www.frontiersin.org/journals/molecular-biosciences/articles/10.3389/fmolb.2025.1634302/full
  - Alt: https://www.science.org/doi/10.1126/sciadv.adt0757

- [+] **X-linked lysosomal genes over-represented in female AD**
  - Quote: "Exome sequencing of a Portuguese cohort of early-onset Alzheimer's disease implicates the X-linked lysosomal gene GLA"
  - Note: GLA (Xq22.1) encodes α-galactosidase A; emerging role in neurodegeneration. Female-specific over-representation claims need more specific sourcing.
  - Source: Nature Scientific Reports 2025
  - Link: https://www.nature.com/articles/s41598-025-95183-8

### 11.2 Ancestry Effects
- [+] **APOE4 risk varies by ancestry (weaker effect in African populations)**
  - Quote: "APOE ε4 had a significant, but weaker, effect on incident AD and on cognitive decline in Yoruba than in African Americans... In the Yoruba, only homozygosity for APOE ε4 was a significant risk factor for AD"
  - Source: Neurology 2014 (Indianapolis-Ibadan Dementia Project)
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC4012422/
  - PubMed: https://pubmed.ncbi.nlm.nih.gov/24565289/

- [+] **Nigerian paradox: Low AD despite high APOE4 frequency**
  - Quote: "the frequency of the APOE 4 allele was about the same in the two groups (0.217 vs 0.218). However, APOE 4 was a significant risk factor for Alzheimer's disease and dementia in the Americans, while no association was found for the Yoruba"
  - Note: May be due to diet, lower vascular risk factors, or genetic diversity in African populations
  - Source: PMC2855121; Neurology 2014
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC2855121/

- [+] **Trials 85%+ white ancestry** (actually ~95% median)
  - Quote: "participants were predominantly White (median percentage: 94.7%, interquartile range: 81.0–96.7%)" / "Direct studies have median representation of 88.9% white"
  - Note: 85% is conservative; actual median is 94.7% in clinical trials
  - Source: PMC8964823; Nature Communications Medicine 2023
  - Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC8964823/

---

## SECTION 12: Translational Failures

**File:** `src/data/translationalFailures.ts`

- [+] **Transgenic mouse models (APP, PS1, tau) limitations**
  - Quote: "Experimental studies of Alzheimer's disease have largely depended on transgenic mice overexpressing amyloid precursor protein (APP). These mice, however, suffer from artificial phenotypes because, in addition to amyloid β peptide (Aβ), they overproduce other APP fragments"
  - Source: Alzforum; Saito 2014 Nature Neuroscience
  - Link: https://www.alzforum.org/news/research-news/do-app-knock-ins-call-overexpression-models-ad-question

- [+] **App^NL-G-F model: Avoids overexpression artifacts**
  - Quote: "Saito et al. estimated using single App knock-in mice... that 60% of the phenotypes observed in Alzheimer's model mice overexpressing mutant APP are artifacts"
  - Note: Knock-in model expresses APP at wild-type levels; Swedish, Iberian, Arctic mutations drive pathology without overexpression
  - Source: Saito T et al. Nature Neurosci 2014; Alzforum
  - Link: https://www.alzforum.org/research-models/app-nl-g-f-knock

---

## SECTION 13: Promising Frontier

**File:** `src/data/promisingFrontier.ts`

- [+] **40Hz Gamma: Phase 3 ongoing (Cognito Therapeutics)**
  - Quote: "Cognito... has been conducting a pivotal, nationwide phase III clinical trial of sensory gamma stimulation for more than a year"
  - Source: MIT News; Alzforum
  - Link: https://news.mit.edu/2025/evidence-40hz-gamma-stimulation-promotes-brain-health-expanding-0314

- [+] **MindImmune MITI-101: $30M Series A, Pfizer Ventures + Gates Frontier**
  - Quote: "MindImmune... closing of a $10.2 million Series A extension, which brings the total Series A capital raised to $30 million" / "led by Dolby Family Ventures, with participation from Pfizer Ventures, Gates Frontier"
  - Note: Gates Frontier (Bill Gates investment entity), not Gates Foundation
  - Source: BusinessWire; BioSpace; Providence Business News
  - Link: https://www.businesswire.com/news/home/20251124077423/en/MindImmune-Extends-Series-A-to-$30M-to-Advance-Inflammation-Focused-Alzheimers-Therapy-into-the-Clinic-and-Appoints-Isaac-Stoner-as-CEO

- [+] **Focused Ultrasound: FDA Breakthrough Device designation (for related brain applications)**
  - Quote: "SonoCloud-9 system has received Breakthrough Device designation for the treatment of GBM, and the transcranial systems Exablate Neuro and NeuroAccess have received the same designation for both BBB disruption for the treatment of brain tumors"
  - Note: Breakthrough designation for FUS in Alzheimer's specifically not yet granted; designation exists for brain tumor applications
  - Source: IEEE Pulse; Focused Ultrasound Foundation; PMC11044032
  - Link: https://www.embs.org/pulse/articles/breaking-barriers-with-sound-focused-ultrasound-in-the-brain/

---

## Bibliography Files to Verify

All citations in the bibliography should be verified against original sources:

1. [ ] `src/data/bibliography/foundational.ts` - Basic AD science
2. [ ] `src/data/bibliography/hypotheses.ts` - Alternative frameworks
3. [ ] `src/data/bibliography/scandal.ts` - Lesné fraud
4. [ ] `src/data/bibliography/trials.ts` - Clinical trial results
5. [ ] `src/data/bibliography/funding.ts` - Investment data
6. [ ] `src/data/bibliography/treatments.ts` - Drug approvals
7. [ ] `src/data/bibliography/mechanisms.ts` - Mechanistic research
8. [ ] `src/data/bibliography/genetics.ts` - APOE, genetic factors
9. [ ] `src/data/bibliography/drugConcerns.ts` - Safety profiles
10. [ ] `src/data/bibliography/sexAncestry.ts` - Demographic effects
11. [ ] `src/data/bibliography/policy.ts` - FDA policy
12. [ ] `src/data/bibliography/failureCascade.ts` - Market failures

---

## Priority Tiers

### Tier 1: Foundational Claims (Verify First)
These claims appear in multiple sections and form the backbone of the narrative:

1. [x] 99.6% clinical trial failure rate - **VERIFIED** (Cummings 2014, Alzheimer's Research & Therapy)
2. [x] $42.5B private R&D investment (1995-2021) - **VERIFIED** (Cummings 2022, PMC8940715)
3. [x] $462M Phase 3 trial cost - **VERIFIED** (Cummings 2022, same source)
4. [x] 55M people with AD globally - **VERIFIED** (ADI/WHO 2020-2024)
5. [x] Lecanemab 27% slowing (0.45 CDR-SB) - **VERIFIED** (NEJM, van Dyck 2023)
6. [x] Donanemab 35% slowing - **VERIFIED** (JAMA, Sims 2023)

### Tier 2: Case Study Claims
7. [x] Lesné 2006 Nature paper retraction (2024) - **VERIFIED** (Science, June 24, 2024)
8. [x] Lesné paper 2,300+ citations - **VERIFIED** (Retraction Watch - note: we have 2,518 in some places, verify exact count)
9. [x] Science 2022 investigation details - **VERIFIED** (Piller, Science 2022)
10. [x] Image manipulation specifics - **VERIFIED** (70+ images, 10 papers)

### Tier 3: Historical Claims
11. [x] 1906 Alzheimer presentation - **VERIFIED** (Nov 3, 1906, Tübingen)
12. [x] 1984 Aβ isolation - **VERIFIED** (Glenner & Wong, 4.2 kDa)
13. [x] 1992 amyloid hypothesis paper - **VERIFIED** (Hardy & Higgins, Science)
14. [x] 2023 lecanemab approval - **VERIFIED** (FDA, Jan 2023 accelerated, July 2023 traditional)
15. [x] 2024 donanemab approval - **VERIFIED** (FDA, July 2024)

### Tier 4: Researcher Claims
16. [x] de la Torre 1993 vascular hypothesis - **VERIFIED** (chronic brain hypoperfusion)
17. [x] de la Monte 2005 type 3 diabetes - **VERIFIED** (Brown, brain insulin resistance)
18. [x] Nixon 2022 PANTHOS - **VERIFIED** (Nature Neuroscience, plaques from inside neurons)
19. [x] Nave 2023 myelin hypothesis - **VERIFIED** (Nature, myelin dysfunction upstream)

---

## Verification Log

Use this section to track verification progress:

| Date | Claim | Status | Verifier | Notes |
|------|-------|--------|----------|-------|
| | | | | |

---

## Notes

- When verifying quotes, use Ctrl+F in the source document to confirm exact match
- For PDFs, note the page number in the link
- For web articles, use Chrome's "Copy link to highlight" feature when possible
- If a claim cannot be verified or needs updating, mark with [?] and add to Notes
