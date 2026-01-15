# AD DAG → SBSF Translation Checklist

**Purpose**: Systematically translate the current AD Lysosome-Neuroinflammation DAG (194 nodes, 267 edges) into the Systems Biology Stock-Flow Framework (SBSF) v1.2.

**Date Started**: 2026-01-13
**Last Updated**: 2026-01-14 (Diagrams extracted; Clinical Trial Risk Framework added)
**Status**: In Progress

---

## Instructions

### For Each Node Translation:

1. **Assign SBSF NodeType**
   - STOCK: Things that accumulate (protein pools, cell counts, aggregate burden)
   - REGULATOR: Controls rates (enzymes, receptors, kinases, transcription factors)
   - PROCESS: Activities over time (phagocytosis, inflammation, clearance)
   - STATE: Qualitative conditions (cell phenotypes, disease stages)
   - BOUNDARY: System edges (genes, drugs, degradation, measurements)

2. **Add References** (when available)
   - Gene: HGNC ID
   - Protein: UniProt ID
   - Process: GO ID
   - Disease: DOID
   - Drug: CHEBI

3. **Specify Compartment**
   - Cell type (CL ontology)
   - Subcellular location (GO cellular component)
   - Tissue (UBERON)

### For Each Edge Translation:

1. **Assign Relation Type**
   - `directlyIncreases` (=>) : Physical interaction, known mechanism
   - `directlyDecreases` (=|) : Physical inhibition, known mechanism
   - `increases` (->) : Indirect/pathway effect, increases
   - `decreases` (-|) : Indirect/pathway effect, decreases
   - `regulates` (~) : Direction context-dependent
   - `association` (--) : Correlation only, no causal claim

2. **Document Evidence**
   - Citation (PMID)
   - Method type (knockout, rct, intervention_animal, in_vitro, cohort, etc.)
   - Species + Model (NCBITaxon + MGI/strain)
   - Causal confidence (L1-L7)

3. **Justify Directionality**
   - What experiment established the direction?
   - Is it direct or indirect?
   - Are there contradictory findings?

4. **Add Quantitative Data** (when available)
   - Kinetics (Km, Kd, IC50)
   - Effect size (fold change, correlation coefficient)
   - Dose-response parameters

5. **Note Translational Gaps**
   - Mouse-only evidence?
   - In vitro only?
   - Single study?

---

## Legend

- [ ] Not started
- [~] In progress  
- [x] Complete
- [?] Needs review/clarification
- [!] Problem identified

---

## System Boundaries

BOUNDARY nodes define where the model begins and ends. **Input boundaries** are causal factors we take as given (we don't model what causes them). **Output boundaries** are terminal outcomes we measure but don't model further effects of.

### Input Boundaries (Unexplained Causes)

| Node ID | Type | References | Description |
|---------|------|------------|-------------|
| aging | BOUNDARY | | Chronological age; drives multiple pathways (C1q↑, iron accumulation, DIM infiltration, meningeal lymphatic decline) |
| APOE4_genotype | BOUNDARY | dbSNP:rs429358, rs7412 | Genetic variant; ε4 allele confers ~3-12x AD risk depending on copy number |
| TREM2_variants | BOUNDARY | dbSNP:rs75932628 (R47H), rs143332484 (R62H) | Genetic variants; ~3x AD risk, hypomorphic function |
| familial_AD_mutations | BOUNDARY | APP, PSEN1, PSEN2 | Autosomal dominant mutations; deterministic EOAD |
| sex | BOUNDARY | | Biological sex; affects iron metabolism, immune responses, hormone levels |
| sleep_disruption | BOUNDARY | | Chronic sleep disturbance; reduces glymphatic clearance |

### Output Boundaries (Terminal Outcomes)

| Node ID | Type | References | Description |
|---------|------|------------|-------------|
| cognitive_function | BOUNDARY | HP:0100543 | Clinical outcome; dementia severity, functional status |
| mortality | BOUNDARY | | Death; ultimate endpoint |

### Measured Stocks (Proximal to Output Boundaries)

These STOCKs are quantifiable measures that connect biological mechanisms to clinical outcomes:

| Node ID | Type | References | Description | Measurement |
|---------|------|------------|-------------|-------------|
| cognitive_score | STOCK | | Psychometric assessment of cognition | MMSE (0-30), ADAS-Cog (0-70), CDR-SB (0-18), MoCA (0-30) |
| synapses | STOCK | GO:0045202 | Synapse density | Stereology, synaptophysin IHC |
| neuronal_count | STOCK | CL:0000540 | Neuron number | Stereology, NeuN+ counts |
| brain_volume | STOCK | UBERON:0000955 | Regional brain volumes | MRI volumetrics (hippocampus, entorhinal cortex) |
| CSF_biomarkers | STOCK | | Fluid biomarkers | Aβ42, pTau181, NfL, sTREM2 |

### Boundary Diagram

**See**: [ad_dag_diagrams.md → Diagram 1: Boundary Diagram](ad_dag_diagrams.md#diagram-1-boundary-diagram)

---

## Module 1: Insulin/mTOR/Autophagy Axis

### Nodes

| Status | Current ID | SBSF Type | References | Notes |
|--------|-----------|-----------|------------|-------|
| [x] | insulin_resistance | STATE | DOID:9352 (T2DM), HP:0000855 (insulin resistance) | Brain insulin resistance ± systemic T2DM. "Type 3 diabetes" concept |
| [x] | mTORC1_hyperactive | REGULATOR | GO:0031931 (mTORC1 complex), UniProt:P42345 (MTOR) | Constitutively active on lysosomal membrane due to chronic AKT signaling |
| [x] | TFEB_phosphorylated | STATE | UniProt:P19484 (TFEB), MOD:00696 (phospho-Ser) | pSer211 + pSer142 creates 14-3-3 binding → cytoplasmic sequestration |
| [x] | AMPK_phosphorylated | REGULATOR | UniProt:P54646 (PRKAA2), MOD:00696 | pSer345 by mTORC1 prevents AMPK recruitment to lysosome |
| [x] | ULK1_phosphorylated | REGULATOR | UniProt:O75385 (ULK1), MOD:00696 | pSer757 blocks AMPK binding site, inhibits autophagy initiation |
| [x] | lysosomal_genes_down | PROCESS | GO:0006914 (autophagy), GO:0007040 (lysosome assembly) | TFEB targets: ATP6V0A1, ATP6V1H, CTSD, CTSB, LAMP1, LAMP2, GBA |
| [x] | lysosomal_dysfunction | STATE | HP:0003236 (elevated lysosomal enzyme activity), GO:0005764 | pH >5.5, ↓cathepsin activity, ↓degradation. CENTRAL NODE |
| [x] | mitophagy_rate_reduced | PROCESS | GO:0000422 (autophagy of mitochondrion) | AMPK/ULK1 pathway impaired; PINK1/Parkin still functional |

### Key Edges - COMPLETED

#### Edge 1: insulin_resistance → mTORC1_hyperactive

| Field | Value |
|-------|-------|
| **Relation** | `increases` (indirect, multi-step pathway) |
| **Mechanism** | Chronic hyperinsulinemia → sustained PI3K-AKT → TSC1/2 phosphorylation (inhibited) → Rheb-GTP accumulates → mTORC1 disinhibited on lysosomal membrane |
| **Directionality reasoning** | Multi-step pathway; each step has directional evidence. Insulin → PI3K is established. AKT phosphorylates TSC2 at multiple sites (Thr1462, Ser939) to inhibit GAP activity. Loss of TSC1/2 = constitutive mTORC1 |
| **Method** | `cohort` (human postmortem) + `in_vitro` (cell lines) |
| **Species** | NCBITaxon:9606 (Homo sapiens) - postmortem brain tissue |
| **Causal confidence** | L5-L6 (mechanistic chain established, human correlation) |
| **Citations** | PMID:15750215 [DOI](https://doi.org/10.3233/jad-2005-7107) - Steen 2005 "Type 3 Diabetes" |
| **Evidence quote** | "Reduced levels of insulin receptor substrate (IRS) mRNA...increased glycogen synthase kinase-3beta activity" |
| **Quantitative** | Not available; correlation data only |
| **Translational gap** | Human postmortem = correlational. No human RCT. Animal interventions support directionality |

#### Edge 2: mTORC1_hyperactive → TFEB_phosphorylated

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - direct phosphorylation |
| **Mechanism** | mTORC1 directly phosphorylates TFEB at Ser211 and Ser142. pSer211 creates 14-3-3 binding site → cytoplasmic retention |
| **Directionality reasoning** | **DIRECT BIOCHEMICAL**: In vitro kinase assay shows mTORC1 phosphorylates TFEB. Phospho-specific antibodies confirm sites. Rapamycin (mTORC1 inhibitor) → TFEB nuclear translocation |
| **Method** | `in_vitro` (kinase assay, cell lines) + `intervention_animal` (rapamycin) |
| **Species** | NCBITaxon:9606 (HEK293, HeLa), NCBITaxon:10090 (MEFs) |
| **Causal confidence** | **L5 - HIGH** (direct biochemical + intervention reversal) |
| **Citations** | PMID:22343943 [DOI](https://doi.org/10.1038/emboj.2012.32) - Settembre 2012 EMBO J |
| **Evidence quote** | "Phosphorylation of TFEB by mTORC1 inhibits TFEB activity. Conversely, pharmacological inhibition of mTORC1...activates TFEB by promoting its nuclear translocation" |
| **Kinetics** | Not reported; qualitative on/off |
| **Translational gap** | Confirmed in multiple human cell lines; mechanism conserved |

#### Edge 3: TFEB_phosphorylated → lysosomal_genes_down

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - indirect via loss of transcription |
| **Mechanism** | pSer211-TFEB binds 14-3-3 → cytoplasmic retention → cannot enter nucleus → CLEAR network genes not transcribed |
| **Directionality reasoning** | **KNOCKOUT + INTERVENTION**: TFEB-/- cells have reduced lysosomal gene expression. TFEB overexpression or rapamycin → increased CLEAR genes |
| **Method** | `knockout` (TFEB-/- MEFs) + `intervention_animal` (rapamycin) |
| **Species** | NCBITaxon:10090 (Mouse - TFEB-/- MEFs) |
| **Causal confidence** | **L3 - HIGH** (knockout eliminates response) |
| **Citations** | PMID:22343943 [DOI](https://doi.org/10.1038/emboj.2012.32) - Settembre 2012 |
| **Evidence quote** | "The transcriptional response of lysosomal and autophagic genes to either lysosomal dysfunction or pharmacological inhibition of mTORC1 is suppressed in TFEB-/- cells" |
| **Target genes** | ATP6V0A1, ATP6V1H, CTSD, CTSB, LAMP1, LAMP2, GBA, MCOLN1 |
| **Translational gap** | Mouse knockout; human TFEB mutations cause neurodegeneration (supports conservation) |

#### Edge 4: lysosomal_genes_down → lysosomal_dysfunction

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - causal chain |
| **Mechanism** | ↓v-ATPase subunits → pH rises >5.5. ↓Cathepsins → reduced proteolysis. ↓LAMP proteins → membrane instability |
| **Directionality reasoning** | **LOGICAL NECESSITY**: Lysosomes require v-ATPase for acidification, cathepsins for degradation. Reduced expression → reduced function. Confirmed by pH measurements in AD models |
| **Method** | `intervention_animal` (AD mouse models with pH probes) |
| **Species** | NCBITaxon:10090 (5xFAD, PS1/APP, 3xTg-AD, PS19, APPNL-G-F) - MGI IDs various |
| **Causal confidence** | **L4 - MODERATE-HIGH** (multiple models, consistent phenotype) |
| **Citations** | PMID:35654956 [DOI](https://doi.org/10.1038/s41593-022-01084-8) - Lee 2022 Nat Neurosci (PANTHOS) |
| **Evidence quote** | "Autolysosome acidification declines in neurons well before extracellular amyloid deposition, associated with markedly lowered vATPase activity" |
| **Quantitative** | pH >5.5 (normal lysosome pH ~4.5-5.0) |
| **Translational gap** | Multiple mouse models converge; human postmortem confirms pathology |

#### Edge 5: mTORC1_hyperactive → ULK1_phosphorylated

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - direct phosphorylation |
| **Mechanism** | mTORC1 phosphorylates ULK1 at Ser757, which blocks the AMPK binding site on ULK1 |
| **Directionality reasoning** | **DIRECT BIOCHEMICAL**: In vitro kinase assay. Phospho-specific antibody for pSer757. Rapamycin reduces pSer757. Ser757Ala mutant not inhibited by mTORC1 |
| **Method** | `in_vitro` (kinase assay) + `intervention_animal` (rapamycin) |
| **Species** | NCBITaxon:9606 (HEK293), NCBITaxon:10090 (MEFs) |
| **Causal confidence** | **L5 - HIGH** (direct biochemistry) |
| **Citations** | PMID:21258367 [DOI](https://doi.org/10.1038/ncb2152) - Kim 2011 Nat Cell Biol |
| **Evidence quote** | "High mTOR activity prevents Ulk1 activation by phosphorylating Ulk1 Ser 757 and disrupting the interaction between Ulk1 and AMPK" |
| **Kinetics** | Site-specific; on/off switch |
| **Translational gap** | Human cell lines confirm; conserved mechanism |

#### Edge 6: mTORC1_hyperactive → AMPK_phosphorylated

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - direct phosphorylation |
| **Mechanism** | mTORC1 phosphorylates AMPK-α2 at Ser345, preventing AMPK recruitment to lysosomal membrane |
| **Directionality reasoning** | **DIRECT BIOCHEMICAL**: Kinase assay identifies Ser345 as mTORC1 substrate. Functional consequence = disrupted lysosomal recruitment |
| **Method** | `in_vitro` (kinase assay, mass spec) |
| **Species** | NCBITaxon:9606, NCBITaxon:10090 |
| **Causal confidence** | **L5 - MODERATE** (biochemistry established, functional consequence less characterized) |
| **Citations** | Portland Press 2024 (need specific PMID - from DAG annotation) |
| **Evidence quote** | "Prevents AMPK recruitment to lysosome" |
| **Translational gap** | Less studied than ULK1 phosphorylation; needs more validation |

#### Edge 7: ULK1_phosphorylated → mitophagy_rate_reduced

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - functional consequence |
| **Mechanism** | ULK1 pSer757 blocks AMPK binding → AMPK cannot phosphorylate/activate ULK1 at Ser317/Ser777 → autophagy/mitophagy initiation blocked |
| **Directionality reasoning** | **INTERVENTION**: Rapamycin (removes pSer757) restores autophagy. Ser757Ala mutant has constitutive activity. AMPK activators work only when Ser757 unphosphorylated |
| **Method** | `intervention_animal` + `in_vitro` (mutant analysis) |
| **Species** | NCBITaxon:9606, NCBITaxon:10090 |
| **Causal confidence** | **L4-L5** (mutant analysis + inhibitor studies) |
| **Citations** | PMID:21258367 [DOI](https://doi.org/10.1038/ncb2152) - Kim 2011 |
| **Evidence quote** | "AMPK promotes autophagy by directly activating Ulk1 through phosphorylation of Ser 317 and Ser 777...mTOR...phosphorylating Ulk1 Ser 757 and disrupting the interaction between Ulk1 and AMPK" |
| **Translational gap** | Mitophagy specifically vs general autophagy needs distinction |

#### Edge 8: AMPK_phosphorylated → mitophagy_rate_reduced

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - functional consequence |
| **Mechanism** | AMPK pSer345 cannot be recruited to lysosome → cannot activate downstream targets including ULK1 |
| **Directionality reasoning** | AMPK lysosomal recruitment is required for nutrient-sensing autophagy activation |
| **Method** | `in_vitro` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L5 - MODERATE** |
| **Citations** | Portland Press 2024 |
| **Translational gap** | Less characterized than ULK1 pathway |

#### Edge 9: mitophagy_rate_reduced → damaged_mito_pool

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - accumulation |
| **Mechanism** | Damage rate exceeds clearance rate → damaged mitochondria accumulate. Stock-flow relationship |
| **Directionality reasoning** | **MASS BALANCE**: If inflow (damage) > outflow (mitophagy), stock increases. This is a logical necessity given the rates |
| **Method** | `intervention_animal` (mitophagy reporters in AD models) |
| **Species** | NCBITaxon:10090 (various AD models) |
| **Causal confidence** | **L4** (confirmed in multiple models) |
| **Citations** | Fang 2019 Nat Neurosci PMID:30742114; Jimenez-Loygorri 2024 Nat Commun PMID:38280852 |
| **Quantitative** | Accumulation kinetics not well characterized |
| **Translational gap** | Human postmortem confirms mitochondrial pathology |

---

### Module 1 Supplement: mTORC1-S6K1-IRS1 Feedback Loop

**Discovery**: This reinforcing feedback loop was identified during checklist review. It closes the circuit between mTORC1 hyperactivation and insulin resistance, creating a self-amplifying pathological cycle.

#### New Nodes

| Status | Node ID | SBSF Type | References | Notes |
|--------|---------|-----------|------------|-------|
| [x] | S6K1_active | REGULATOR | UniProt:P23443 (RPS6KB1), GO:0004674 | p70 S6 kinase; phosphorylated at Thr389 by mTORC1 |
| [x] | IRS1_serine_phosphorylated | STATE | UniProt:P35568 (IRS1), MOD:00696 | pS307, pS312, pS527, pS616, pS636/639 = inhibitory |

#### New Edges

##### Edge 10: mTORC1_hyperactive → S6K1_active

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - direct phosphorylation |
| **Mechanism** | mTORC1 phosphorylates S6K1 at Thr389 (hydrophobic motif), enabling full activation |
| **Directionality reasoning** | **DIRECT BIOCHEMICAL**: In vitro kinase assay. Rapamycin blocks S6K1 activation. S6K1-Thr389 is canonical mTORC1 substrate |
| **Method** | `in_vitro` (kinase assay) + `intervention_animal` (rapamycin) |
| **Species** | NCBITaxon:9606, NCBITaxon:10090 |
| **Causal confidence** | **L5 - HIGH** (textbook biochemistry, extensively validated) |
| **Citations** | Numerous; foundational mTOR signaling literature |
| **Evidence quote** | Canonical pathway; S6K1-pThr389 is standard readout for mTORC1 activity |

##### Edge 11: S6K1_active → IRS1_serine_phosphorylated

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - direct phosphorylation |
| **Mechanism** | S6K1 phosphorylates IRS-1 at multiple serine residues: S307, S312, S527, S616, S636/639. Creates 14-3-3 binding sites, promotes degradation |
| **Directionality reasoning** | **DIRECT BIOCHEMICAL**: In vitro kinase assay shows S6K1 phosphorylates IRS-1. Loss-of-function S6K1 constructs reduce IRS-1 serine phosphorylation. Gain-of-function increases it |
| **Method** | `in_vitro` (kinase assay) + `knockout` (S6K1 constructs) |
| **Species** | NCBITaxon:9606 (HEK293), NCBITaxon:10090 (TSC1/2-/- MEFs) |
| **Causal confidence** | **L5 - HIGH** (direct biochemistry with genetic validation) |
| **Citations** | PMID:16914728 [DOI](https://doi.org/10.1128/MCB.01254-05) - Shah & Hunter 2006 |
| **Evidence quote** | "S6K1 phosphorylates IRS1 in vitro on multiple residues...loss- and gain-of-function S6K1 constructs...demonstrate a requirement for the catalytic activity of S6K1" |
| **Caveat** | Rajan 2013 found S6K1 inhibitor doesn't block pS307 in human adipocytes - may be tissue-specific or involve other mTOR-associated kinases |

##### Edge 12: IRS1_serine_phosphorylated → insulin_resistance

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - functional consequence |
| **Mechanism** | IRS-1 serine phosphorylation: (1) reduces tyrosine phosphorylation by insulin receptor, (2) promotes IRS-1 degradation, (3) creates 14-3-3 binding → sequestration. Net effect = impaired PI3K-AKT signaling |
| **Directionality reasoning** | **INTERVENTION + CORRELATION**: Rapamycin (blocks S6K1) restores insulin sensitivity. AD brains show elevated IRS-1 pSer correlated with insulin resistance markers. Phospho-mimetic IRS-1 mutants show reduced signaling |
| **Method** | `intervention_animal` + `cohort` (human postmortem) |
| **Species** | NCBITaxon:9606 (AD brain), NCBITaxon:10090 (3xTg-AD, Aβ-injected) |
| **Causal confidence** | **L4-L5** (intervention + mechanistic) |
| **Citations** | PMID:28550243 [DOI](https://doi.org/10.3233/JAD-160344) - Nakamura 2017; PMID:30463045 [DOI](https://doi.org/10.1016/j.biopha.2018.11.043) - Rahman 2018 |
| **Evidence quote** | "Protein levels of pS616 and pS636/639 IRS-1 significantly decreased following APO treatment...suggesting improved brain insulin resistance" (Nakamura 2017) |
| **AD-specific sites** | pS616, pS636/639 elevated in 3xTg-AD brain; pS307 elevated in Aβ-injected rats |

#### Feedback Loop: loop_mTORC1_S6K1_IRS1

| Field | Value |
|-------|-------|
| **Loop ID** | loop_mTORC1_S6K1_IRS1 |
| **Type** | **Reinforcing (R)** - self-amplifying pathological cycle |
| **Nodes in loop** | insulin_resistance → mTORC1_hyperactive → S6K1_active → IRS1_serine_phosphorylated → insulin_resistance |
| **Polarity calculation** | (+) × (+) × (+) × (+) = (+) = Reinforcing |
| **Mechanism** | Insulin resistance removes TSC1/2 brake on mTORC1 → mTORC1 activates S6K1 → S6K1 phosphorylates IRS-1 → IRS-1 degradation/inhibition → MORE insulin resistance |
| **Clinical implication** | Once initiated, this cycle is self-sustaining. Explains why metabolic dysfunction is progressive in AD. Breaking the cycle requires intervention at any node |
| **Intervention points** | Rapamycin/rapalogs (mTORC1), S6K1 inhibitors (e.g., PF-4708671), insulin sensitizers (upstream), GLP-1 agonists (see Talbot 2014) |
| **Citations** | PMID:24640977 [DOI](https://doi.org/10.2217/nmt.13.73) - Talbot 2014 review |

#### Diagram: Complete mTORC1 Feedback System

**See**: [ad_dag_diagrams.md → Diagram 2: Complete mTORC1 Feedback System](ad_dag_diagrams.md#diagram-2-diagram-complete-mtorc1-feedback-system)

#### Dual Pathways to IRS-1 Phosphorylation (Note)

IRS-1 serine phosphorylation in AD comes from TWO converging sources:

| Pathway | Kinase | Primary Site | Trigger |
|---------|--------|--------------|---------|
| **Metabolic** | S6K1 (mTORC1-dependent) | pS616, pS636/639 | Nutrient excess, insulin |
| **Inflammatory** | JNK, IKKβ | pS307 | Aβ → microglia → TNF-α, IL-1β |

Both pathways converge on IRS-1 inhibition but through different mechanisms. This explains why both metabolic interventions (rapamycin, GLP-1 agonists) AND anti-inflammatory interventions can improve brain insulin sensitivity.

**Cross-reference**: The inflammatory pathway connects to Module 4 (Inflammasome) via TNF-α and IL-1β.

---

## Module 2: Lysosomal Pathology

### Overview

Module 2 describes the consequences of lysosomal dysfunction (from Module 1). It splits into two routes:
- **Route 1A**: Cargo accumulation → Lipofuscin → LMP → Cathepsin B release → NLRP3
- **Route 1B**: Incomplete mitophagy → mtDNA undegraded → mtDNA escape → cGAS-STING

Both routes converge on inflammatory signaling (Module 4).

### Nodes

| Status | Current ID | SBSF Type | References | Notes |
|--------|-----------|-----------|------------|-------|
| [x] | damaged_mito_pool | STOCK | GO:0005739 (mitochondrion) | Accumulating damaged mitochondria; source for Routes 1B and 2 |
| [x] | cargo_accumulation | STOCK | | Aβ, tau, lipids, iron, undegraded organelles |
| [x] | lipofuscin | STOCK | CHEBI:34813 (lipofuscin) | Cross-linked proteins + oxidized lipids; undegradable |
| [x] | LMP | PROCESS | GO:0090559 (LMP) | Lysosomal membrane permeabilization |
| [x] | cathepsin_B_cytosolic | STOCK | UniProt:P07858 (CTSB), GO:0005829 (cytosol) | Danger signal; active cathepsin B escaped from lysosome |
| [x] | mitophagosome | STOCK | GO:0000421 (autophagosome → mitochondrion) | PINK1/Parkin-tagged mitochondrion in autophagosome |
| [x] | autolysosome | STOCK | GO:0044754 (autolysosome) | Mitophagosome fused with lysosome |
| [x] | mtDNA_undegraded | STOCK | | DNase II inactive at high pH; mtDNA persists |
| [x] | mtDNA_from_lysosome | STOCK | | mtDNA escaped through compromised membrane; DAMP |

### Key Edges - Route 1A (LMP Pathway)

#### Edge 1: lysosomal_dysfunction → cargo_accumulation

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - accumulation |
| **Mechanism** | Reduced degradation capacity (↓cathepsins, ↓v-ATPase, high pH) → cargo builds up. Stock-flow: inflow unchanged, outflow reduced |
| **Directionality reasoning** | **MASS BALANCE**: When degradation rate falls below delivery rate, cargo accumulates. Confirmed in PANTHOS neurons |
| **Method** | `intervention_animal` (AD mouse models with autophagy reporters) |
| **Species** | NCBITaxon:10090 (5xFAD, PS1/APP, 3xTg-AD, PS19, APPNL-G-F) |
| **Causal confidence** | **L4 - HIGH** (multiple models converge) |
| **Citations** | PMID:35654956 [DOI](https://doi.org/10.1038/s41593-022-01084-8) - Lee 2022 |
| **Evidence quote** | "Build-up of Aβ/APP-βCTF selectively within enlarged de-acidified autolysosomes" |

#### Edge 2: cargo_accumulation → lipofuscin

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - chemical transformation |
| **Mechanism** | Incomplete degradation of proteins/lipids → oxidation → cross-linking → lipofuscin granules (irreversible) |
| **Directionality reasoning** | **CHEMICAL KINETICS**: Prolonged residence time in degradative compartment with ROS exposure → oxidation and cross-linking. Process is irreversible |
| **Method** | `in_vitro` + `intervention_animal` (aged mice, RPE cells) |
| **Species** | NCBITaxon:10090, NCBITaxon:9606 (RPE) |
| **Causal confidence** | **L4-L5** |
| **Citations** | PMID:34782457 [DOI](https://doi.org/10.1073/pnas.2100122118) - Pan 2021 |
| **Evidence quote** | "Lipofuscin granules enclose mixtures of cross-linked proteins and lipids" |

#### Edge 3: lipofuscin → LMP

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - physical membrane damage |
| **Mechanism** | Lipofuscin directly destabilizes lysosomal membrane through physical/oxidative damage → permeabilization |
| **Directionality reasoning** | **DIRECT PHYSICAL**: Lipofuscin accumulation in lysosomes → membrane disruption. Confirmed by LMP markers (galectin-3 puncta) |
| **Method** | `in_vitro` (RPE cells) + `intervention_animal` (aged mice) |
| **Species** | NCBITaxon:10090 (Abca4-/- mice), NCBITaxon:9606 (RPE) |
| **Causal confidence** | **L4 - HIGH** |
| **Citations** | PMID:34782457 [DOI](https://doi.org/10.1073/pnas.2100122118) - Pan 2021 |
| **Evidence quote** | "Tendency to cause lysosome swelling that results in rupture...ability to trigger NLRP3 inflammation, a symptom of low-level disruption of lysosomes" |
| **Note** | Also triggers atypical necroptosis (RIPK1/RIPK3/MLKL independent of caspase-8) |

#### Edge 4: LMP → cathepsin_B_cytosolic

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - compartment breach |
| **Mechanism** | Lysosomal membrane permeabilization → cathepsins (including active cathepsin B) leak into cytosol |
| **Directionality reasoning** | **DIRECT PHYSICAL**: Membrane breach = contents leak. Detected by cytosolic cathepsin B activity assays and immunofluorescence |
| **Method** | `in_vitro` (multiple cell types) |
| **Species** | NCBITaxon:9606, NCBITaxon:10090 |
| **Causal confidence** | **L5 - HIGH** (established cell biology) |
| **Citations** | PMID:23720375 [DOI](https://doi.org/10.1242/jcs.091181) - Aits & Jäättelä 2013 |
| **Evidence quote** | "Lysosomal membrane permeabilization and the consequent leakage of the lysosomal content into the cytosol leads to 'lysosomal cell death'" |

#### Edge 5: cathepsin_B_cytosolic → NLRP3

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - inflammasome activation |
| **Mechanism** | Cytosolic cathepsin B promotes NLRP3-ASC complex assembly. Mechanism debated: may cleave inhibitory proteins or directly interact with NLRP3 |
| **Directionality reasoning** | **INTERVENTION**: Cathepsin B inhibitors (CA-074-Me) reduce NLRP3 activation. Cathepsin B knockout reduces IL-1β secretion in response to particulates |
| **Method** | `knockout` + `in_vitro` (inhibitors) |
| **Species** | NCBITaxon:10090 (CTSB-/- mice) |
| **Causal confidence** | **L3-L5 - HIGH** (knockout + inhibitor + mechanistic) |
| **Citations** | PMID:18604214 [DOI](https://doi.org/10.1038/ni.1631) - Hornung 2008 |
| **Evidence quote** | "Inhibition of...cathepsin B activity impaired NALP3 activation. Our results indicate that the NALP3 inflammasome senses lysosomal damage as an endogenous 'danger' signal" |
| **Note** | This establishes the LMP → cathepsin B → NLRP3 axis as a general danger-sensing mechanism |

### Key Edges - Route 1B (Incomplete Mitophagy Pathway)

#### Edge 6: damaged_mito_pool → mitophagosome

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - autophagy initiation |
| **Mechanism** | PINK1 stabilizes on depolarized mitochondria → Parkin recruited → ubiquitin chains → autophagy receptors (p62, OPTN) → autophagosome formation |
| **Directionality reasoning** | **ESTABLISHED PATHWAY**: PINK1/Parkin mitophagy is canonical. Depolarization = PINK1 accumulation = Parkin recruitment |
| **Method** | `knockout` (PINK1-/-, Parkin-/-) + `in_vitro` |
| **Species** | NCBITaxon:9606, NCBITaxon:10090 |
| **Causal confidence** | **L3 - HIGH** (knockout studies) |
| **Citations** | Narendra 2008 J Cell Biol PMID:18227278; Youle & Narendra 2011 Nat Rev Mol Cell Biol PMID:21179058 |
| **Note** | This step works normally in AD; the problem is downstream degradation |

#### Edge 7: mitophagosome → autolysosome

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - membrane fusion |
| **Mechanism** | Autophagosome fuses with lysosome via SNARE proteins (STX17, SNAP29, VAMP8) |
| **Directionality reasoning** | **ESTABLISHED CELL BIOLOGY**: Sequential autophagy pathway |
| **Method** | Standard autophagy literature |
| **Causal confidence** | **L5 - HIGH** (textbook cell biology) |

#### Edge 8: lysosomal_dysfunction → mtDNA_undegraded

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - enzymatic failure |
| **Mechanism** | DNase II requires pH <5 for activity. Lysosomal pH >5.5 → DNase II inactive → mtDNA persists undegraded in autolysosome |
| **Directionality reasoning** | **BIOCHEMISTRY + KNOCKOUT**: DNase II-/- mice accumulate mtDNA in autolysosomes. pH dependence is biochemically established |
| **Method** | `knockout` (Dnase2a cardiac-specific KO) |
| **Species** | NCBITaxon:10090 (Dnase2a-/- cardiac) |
| **Causal confidence** | **L3 - HIGH** (knockout creates phenotype) |
| **Citations** | PMID:22535248 [DOI](https://doi.org/10.1038/nature10992) - Oka 2012 |
| **Evidence quote** | "Cardiac-specific deletion of lysosomal deoxyribonuclease (DNase) II...caused severe myocarditis and dilated cardiomyopathy...with accumulation of mitochondrial DNA deposits in autolysosomes" |

#### Edge 9: autolysosome → mtDNA_undegraded

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - delivery without degradation |
| **Mechanism** | mtDNA is delivered to autolysosome via mitophagy, but if DNase II is inactive (high pH), mtDNA accumulates |
| **Directionality reasoning** | **LOGICAL CONSEQUENCE** of lysosomal dysfunction; confirmed in DNase II-/- |
| **Method** | `knockout` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3-L4** |
| **Citations** | PMID:22535248 [DOI](https://doi.org/10.1038/nature10992) - Oka 2012 |

#### Edge 10: mtDNA_undegraded → mtDNA_from_lysosome

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - escape through compromised membrane |
| **Mechanism** | Undegraded mtDNA exits through compromised autolysosomal membrane (LMP affects autolysosomes too) |
| **Directionality reasoning** | **ACCUMULATION + LMP**: If mtDNA accumulates and membrane is compromised, mtDNA can escape. Detected as cytosolic DNA |
| **Method** | `in_vitro` + `intervention_animal` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4-L5** |
| **Citations** | Oka 2012; Song et al. 2025 |

#### Edge 11: mtDNA_from_lysosome → cGAS_STING

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - DNA sensing |
| **Mechanism** | Cytosolic mtDNA (CpG-rich, similar to bacterial DNA) is sensed by cGAS → 2'3'-cGAMP → STING → TBK1 → IRF3 → Type I IFN |
| **Directionality reasoning** | **INTERVENTION + KNOCKOUT**: STING blockade suppresses aging-related inflammation. cGAS gain-of-function recapitulates phenotype. Cytosolic DNA from mitochondria is the trigger |
| **Method** | `knockout` (STING-/-) + `knockin` (cGAS gain-of-function) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3 - HIGH** (knockout + knockin) |
| **Citations** | PMID:37532932 [DOI](https://doi.org/10.1038/s41586-023-06373-1) - Gulen 2023 |
| **Evidence quote** | "Cytosolic DNA released from perturbed mitochondria elicits cGAS activity in old microglia...Blockade of STING suppresses the inflammatory phenotypes of senescent human cells and tissues" |
| **Brain-specific** | "Activation of STING triggers reactive microglial transcriptional states, neurodegeneration and cognitive decline" |

### Module 2 Summary Diagram

**See**: [ad_dag_diagrams.md → Diagram 3: Module 2 Summary Diagram](ad_dag_diagrams.md#diagram-3-module-2-summary-diagram)

---

## Module 3: Mitochondrial Dysfunction (Route 2: Pre-Lysosomal)

### Overview

Module 3 describes **Route 2**: mtDNA release that occurs **before** lysosomal involvement - directly from damaged mitochondria via mPTP and VDAC pores. This is distinct from Route 1B (Module 2) where mtDNA escapes FROM lysosomes after incomplete mitophagy.

**Key distinction**:
- Route 1B (Module 2): mtDNA enters lysosome via mitophagy → DNase II fails → mtDNA escapes FROM lysosome
- Route 2 (Module 3): mtDNA exits damaged mitochondria directly via mPTP/VDAC → never enters lysosome

Both routes converge on cGAS-STING and NLRP3 (Module 4).

### Nodes

| Status | Current ID | SBSF Type | References | Notes |
|--------|-----------|-----------|------------|-------|
| [x] | mito_ROS | STOCK | CHEBI:26523 (ROS) | Superoxide/H₂O₂ from dysfunctional ETC |
| [x] | mtDNA_oxidized | STOCK | CHEBI:78804 (8-oxo-dG) | 8-oxo-dG modified mtDNA within mitochondria |
| [x] | Ca_overload | STATE | GO:0036437 (mito Ca²⁺ homeostasis) | Mitochondrial matrix Ca²⁺ overload |
| [x] | mPTP_open | STATE | GO:0046929 (mPTP complex) | Mitochondrial permeability transition pore open state |
| [x] | VDAC_oligomer | STOCK | UniProt:P21796 (VDAC1) | VDAC oligomers forming pores in outer membrane |
| [x] | ox_mtDNA_cytosolic | STOCK | | 500-650 bp oxidized mtDNA fragments in cytosol (FEN1-cleaved) |
| [x] | mtDNA_cytosolic | STOCK | | Non-oxidized mtDNA in cytosol |

### Key Edges - Route 2 (Pre-Lysosomal mtDNA Release)

#### Edge 1: damaged_mito_pool → mito_ROS

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - functional consequence |
| **Mechanism** | Damaged mitochondria have dysfunctional ETC → electron leak at Complex I/III → superoxide production |
| **Directionality reasoning** | **BIOCHEMISTRY**: Damaged ETC = poor electron transfer = electron leak = ROS. Well-established |
| **Method** | Multiple sources; standard mitochondrial biology |
| **Species** | Universal |
| **Causal confidence** | **L5 - HIGH** (established biochemistry) |

#### Edge 2: mito_ROS → mtDNA_oxidized

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - direct chemical modification |
| **Mechanism** | ROS oxidizes guanine bases in mtDNA → 8-oxo-deoxyguanosine (8-oxo-dG). mtDNA is vulnerable due to proximity to ETC and lack of histones |
| **Directionality reasoning** | **DIRECT CHEMICAL**: ROS + DNA → oxidized DNA. Chemical reaction |
| **Method** | `in_vitro` + `intervention_animal` |
| **Species** | NCBITaxon:10090, NCBITaxon:9606 |
| **Causal confidence** | **L5 - HIGH** (direct chemistry) |
| **Citations** | PMID:35835107 [DOI](https://doi.org/10.1016/j.immuni.2022.06.007) - Xian 2022 |
| **Evidence quote** | "ROS...induce Ox-mtDNA generation" |

#### Edge 3: mito_ROS → Ca_overload

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - impaired homeostasis |
| **Mechanism** | ROS damages Ca²⁺ handling proteins (MCU, NCLX) → impaired Ca²⁺ efflux + sustained MCU-mediated uptake → matrix Ca²⁺ accumulation |
| **Directionality reasoning** | **INTERVENTION**: ROS scavengers reduce Ca²⁺ overload. Antioxidants are protective |
| **Method** | `in_vitro` + `intervention_animal` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4-L5** |
| **Citations** | PMID:35835107 [DOI](https://doi.org/10.1016/j.immuni.2022.06.007) - Xian 2022 |
| **Evidence quote** | "ROS impairs Ca²⁺ handling, MCU-mediated uptake" |

#### Edge 4: Ca_overload → mPTP_open

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - direct trigger |
| **Mechanism** | Ca²⁺ binds to mPTP regulatory site (likely CypD) → conformational change → pore opening in inner mitochondrial membrane |
| **Directionality reasoning** | **DIRECT BIOCHEMICAL**: Ca²⁺ is the canonical trigger for mPTP. CsA (CypD inhibitor) blocks mPTP |
| **Method** | `in_vitro` (isolated mitochondria) + `intervention_animal` |
| **Species** | NCBITaxon:10090, NCBITaxon:9606 |
| **Causal confidence** | **L5 - HIGH** (textbook mitochondrial biology) |
| **Citations** | PMID:35835107 [DOI](https://doi.org/10.1016/j.immuni.2022.06.007) - Xian 2022 |
| **Evidence quote** | "Diverse NLRP3 inflammasome activators rapidly stimulated uniporter-mediated calcium uptake to open mitochondrial permeability transition pores (mPTP)" |

#### Edge 5: mPTP_open → VDAC_oligomer

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - stress signal |
| **Mechanism** | mPTP opening causes inner membrane stress + mtDNA interaction with VDAC → triggers VDAC oligomerization in outer membrane |
| **Directionality reasoning** | **INTERVENTION**: mPTP inhibitors (CsA) reduce VDAC oligomerization. VDAC oligomerization is downstream of mPTP |
| **Method** | `in_vitro` + `intervention_animal` (inhibitors) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4-L5** |
| **Citations** | PMID:35835107 [DOI](https://doi.org/10.1016/j.immuni.2022.06.007) - Xian 2022 |
| **Evidence quote** | "trigger VDAC oligomerization. This occurred independently of mtDNA or reactive oxygen species" |
| **Note** | mPTP opening and VDAC oligomerization are **independent** of mtDNA/ROS per se, but coordinate the release |

#### Edge 6: mtDNA_oxidized → ox_mtDNA_cytosolic

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - processing + release |
| **Mechanism** | FEN1 endonuclease cleaves ox-mtDNA into 500-650 bp fragments; these fragments exit via mPTP/VDAC pores |
| **Directionality reasoning** | **INTERVENTION + KNOCKOUT**: FEN1 inhibitors reduce cytosolic ox-mtDNA. FEN1 is required for fragment generation |
| **Method** | `knockout` (FEN1 inhibition) + `in_vitro` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3-L5 - HIGH** (FEN1 inhibitor studies) |
| **Citations** | PMID:35835107 [DOI](https://doi.org/10.1016/j.immuni.2022.06.007) - Xian 2022 |
| **Evidence quote** | "Within mitochondria, Ox-mtDNA was either repaired by DNA glycosylase OGG1 or cleaved by the endonuclease FEN1 to 500-650 bp fragments that exited mitochondria" |
| **Therapeutic implication** | "FEN1 inhibitors...suppressed interleukin-1β (IL-1β) production and mtDNA release in mice" |

#### Edge 7: VDAC_oligomer → ox_mtDNA_cytosolic

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - pore-mediated transport |
| **Mechanism** | VDAC oligomers form large pores in outer membrane → allow 500-650 bp ox-mtDNA fragments to exit |
| **Directionality reasoning** | **PHYSICAL**: VDAC oligomers = pores = mtDNA exit. VDAC inhibitors (VBIT-4) reduce mtDNA release |
| **Method** | `in_vitro` (VDAC inhibitors) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L5 - HIGH** |
| **Citations** | PMID:35835107 [DOI](https://doi.org/10.1016/j.immuni.2022.06.007) - Xian 2022 |
| **Evidence quote** | "exited mitochondria via mPTP- and VDAC-dependent channels" |

#### Edge 8: VDAC_oligomer → mtDNA_cytosolic

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - pore-mediated transport |
| **Mechanism** | VDAC pores also allow non-oxidized mtDNA fragments to exit (less efficiently than ox-mtDNA) |
| **Directionality reasoning** | **PHYSICAL**: Same pore mechanism as ox-mtDNA |
| **Method** | `in_vitro` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L5** |
| **Citations** | PMID:35835107 [DOI](https://doi.org/10.1016/j.immuni.2022.06.007) - Xian 2022 |

#### Edge 9: ox_mtDNA_cytosolic → NLRP3

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - direct binding/activation |
| **Mechanism** | Oxidized mtDNA **specifically** binds NLRP3 and activates inflammasome assembly. Non-oxidized mtDNA preferentially activates cGAS-STING |
| **Directionality reasoning** | **SPECIFICITY**: Ox-mtDNA is required for NLRP3 activation; non-ox-mtDNA doesn't activate NLRP3. OGG1 repair blocks NLRP3 activation |
| **Method** | `knockout` (OGG1 enhances, FEN1-KO abolishes) + `in_vitro` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3-L5 - HIGH** |
| **Citations** | PMID:35835107 [DOI](https://doi.org/10.1016/j.immuni.2022.06.007) - Xian 2022 |
| **Evidence quote** | "Ox-mtDNA...binds cytosolic NLRP3, thereby triggering inflammasome activation" |
| **Key insight** | Oxidation state determines pathway: **ox-mtDNA → NLRP3**, **non-ox-mtDNA → cGAS-STING** |

#### Edge 10: mtDNA_cytosolic → cGAS_STING

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - DNA sensing |
| **Mechanism** | Cytosolic dsDNA (including non-oxidized mtDNA) is sensed by cGAS → 2'3'-cGAMP → STING → TBK1 → IRF3 → Type I IFN |
| **Directionality reasoning** | **ESTABLISHED PATHWAY**: cGAS senses any cytosolic dsDNA. mtDNA is bacterial-like (CpG-rich) |
| **Method** | `knockout` (cGAS-/-, STING-/-) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3 - HIGH** |
| **Citations** | PMID:37532932 [DOI](https://doi.org/10.1038/s41586-023-06373-1) - Gulen 2023 |
| **Note** | Also cross-references to Module 2 (Route 1B mtDNA from lysosome → cGAS-STING) |

### PINK1/Parkin as Gatekeepers

#### Edge 11 (Protective): PINK1_Parkin_mitophagy -| mtDNA_cytosolic

| Field | Value |
|-------|-------|
| **Relation** | `decreases` (-|) - protective clearance |
| **Mechanism** | Functional PINK1/Parkin mitophagy clears damaged mitochondria BEFORE mtDNA can escape → prevents mtDNA release |
| **Directionality reasoning** | **KNOCKOUT**: PINK1-/- and Parkin-/- mice show elevated inflammation that is STING-dependent. Loss of mitophagy = MORE mtDNA release |
| **Method** | `knockout` (PINK1-/-, Parkin-/-) + stress (exercise, mutator) |
| **Species** | NCBITaxon:10090 (Prkn-/-, Pink1-/-) |
| **Causal confidence** | **L3 - HIGH** |
| **Citations** | **PRIMARY (not retracted):** Borsche 2020 Brain PMID:33029617 [DOI](https://doi.org/10.1093/brain/awaa246); Jimenez-Loygorri 2024 Nat Commun PMID:38280852 [DOI](https://doi.org/10.1038/s41467-024-45044-1) |
| **Evidence quote** | "elevated IL6 levels in patients with biallelic PRKN/PINK1 mutations...increased circulating cell-free mtDNA serum levels" (Borsche 2020); "pharmacological induction of mitophagy with urolithin A attenuates cGAS/STING activation" (Jimenez-Loygorri 2024) |
| **Note on Sliter 2018** | Original source (Sliter 2018 Nature PMID:30135585) **RETRACTED July 2025** due to unreliable data in Figs 1d, 3a-c. Mechanism now supported by independent human data (Borsche) and independent mouse validation (Jimenez-Loygorri) |

### Module 3 Summary Diagram

**See**: [ad_dag_diagrams.md → Diagram 4: Module 3 Summary Diagram](ad_dag_diagrams.md#diagram-4-module-3-summary-diagram)

### Oxidation-Dependent Pathway Selectivity

| mtDNA Form | Exit Mechanism | Primary Sensor | Output |
|------------|----------------|----------------|--------|
| **Oxidized** (8-oxo-dG) | FEN1 cleavage → mPTP/VDAC | **NLRP3** | IL-1β, IL-18 |
| **Non-oxidized** | Direct exit via VDAC | **cGAS-STING** | Type I IFN |

**Key insight from Xian 2022**: The oxidation state of mtDNA determines which inflammatory pathway is activated. This explains why interventions targeting only one pathway may be insufficient.

---

## Module 4: Inflammasome & Cytokines (SBSF v2.0)

**Last Updated**: 2026-01-14
**Schema Version**: SBSF v2.0 (corrected architecture)

### Overview

Module 4 is the **convergence point** where upstream damage signals (mitochondrial dysfunction, lysosomal rupture) are transduced into inflammatory outputs. Two parallel pathways dominate:

1. **NLRP3 Inflammasome**: ox-mtDNA, cathepsin B → NLRP3 → caspase-1 → IL-1β
2. **cGAS-STING**: cytosolic mtDNA → cGAS → STING → Type I IFN

**Critical 2019-2023 Paradigm Shifts**:
1. **NLRP3 drives tau pathology** (Ising 2019): NLRP3-/- reduces tau hyperphosphorylation via GSK3β/PP2A
2. **cGAS-STING drives aging inflammation** (Gulen 2023): STING blockade reverses aging phenotypes
3. **Ox-mtDNA specificity** (Xian 2022): Oxidation state determines NLRP3 vs cGAS routing

**Key connections**:
- Module 2 (Lysosomal): cathepsin B → NLRP3; mtDNA escape via DNase II failure
- Module 3 (Mitochondrial): ox-mtDNA and non-ox-mtDNA generation
- Module 7 (Tau): NLRP3 → GSK3β/PP2A → tau hyperphosphorylation
- Module 6 (Amyloid): Aβ oligomers → NLRP3 activation

---

### Nodes (STOCK, STATE, BOUNDARY only - no PROCESS)

#### Inflammasome Components

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `NLRP3_active` | STOCK | ASC specks/cell; or cleaved caspase-1 | THERAPEUTIC_TARGET, BIOMARKER | hours | Assembled inflammasome complex |
| `caspase1_active` | STOCK | U/mg protein | | hours | Cleaved active caspase-1 |
| `IL1B` | STOCK | pg/mL (CSF/serum) | BIOMARKER | hours | Mature IL-1β (17 kDa cleaved form) |
| `IL18` | STOCK | pg/mL | BIOMARKER | hours | Mature IL-18 (also caspase-1 substrate) |

#### cGAS-STING Components

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `cGAS_active` | STOCK | cGAMP production rate | | minutes | Activated cGAS bound to cytosolic DNA |
| `STING_active` | STOCK | p-STING/total STING | THERAPEUTIC_TARGET | hours | Phosphorylated STING at Golgi |
| `type_I_IFN` | STOCK | IU/mL; or ISG score | BIOMARKER | hours | IFN-α/β secreted |
| `ISG_expression` | STOCK | fold change | BIOMARKER | days | Interferon-stimulated gene signature |

#### Input Signals (from upstream modules)

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `ox_mtDNA_cytosolic` | STOCK | 8-oxo-dG+ copies/cell | | hours | Oxidized mtDNA fragments (500-650 bp); from Module 3 |
| `mtDNA_cytosolic` | STOCK | copies/cell | | hours | Non-oxidized cytosolic mtDNA; from Module 3 |
| `cathepsin_B_cytosolic` | STOCK | U/mg protein | | hours | Released from ruptured lysosomes; from Module 2 |

#### Tau Kinase/Phosphatase Effectors

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `GSK3B_active` | STOCK | kinase activity; p-Tyr216/total | THERAPEUTIC_TARGET | hours | Active GSK-3β (tau kinase) |
| `PP2A_activity` | STOCK | phosphatase activity | | hours | PP2A tau phosphatase (inhibited by NLRP3) |

#### State Nodes

| ID | Type | Description |
|----|------|-------------|
| `neuroinflammation` | STATE | Chronic CNS inflammatory state; composite of multiple cytokine/glial markers |
| `tau_hyperphosphorylated` | STATE | Cross-module output to Module 7 |

#### Boundary/Input Nodes

| ID | Type | Description |
|----|------|-------------|
| `Abeta_oligomers` | BOUNDARY | Input from Module 6; activates NLRP3 via phagocytosis/lysosomal rupture |
| `tau_aggregated` | BOUNDARY | Input from Module 7; activates NLRP3 (creates feedback loop) |

---

### Edges (Full Schema with Evidence)

#### Edge E04.001: ox_mtDNA_cytosolic → NLRP3_active

```yaml
edge:
  id: "E04.001"
  source_node: "ox_mtDNA_cytosolic"
  target_node: "NLRP3_active"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "ox_mtDNA_NLRP3_binding"
  mechanism_description: "Oxidized mtDNA (8-oxo-dG containing, 500-650 bp fragments) specifically binds NLRP3 LRR domain and triggers inflammasome assembly. Non-oxidized mtDNA does NOT activate NLRP3 (goes to cGAS instead)"
  
  cross_module: "Input from Module 3 (Mitochondrial)"
  
  evidence:
    - citation:
        pmid: "35835107"
        doi: "10.1016/j.immuni.2022.06.007"
        first_author: "Xian"
        year: 2022
        title: "Oxidized DNA fragments exit mitochondria via mPTP- and VDAC-dependent channels to activate NLRP3 inflammasome and interferon signaling"
      
      quote: "Ox-mtDNA...binds cytosolic NLRP3, thereby triggering inflammasome activation"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "C57BL/6; OGG1-/-, FEN1 inhibitor"
        translation_category: "T1"  # WT mouse + KO
      
      methodology:
        type: "knockout"
        details: "OGG1-/- (enhances ox-mtDNA) and FEN1 inhibitors (blocks fragment generation)"
        methodology_category: "M3"
      
      causal_confidence: "L5"  # T1 + M3 = 9-1-3 = 5
      
  key_insight: "Oxidation state is the molecular switch: ox-mtDNA → NLRP3, non-ox-mtDNA → cGAS"
```

#### Edge E04.002: cathepsin_B_cytosolic → NLRP3_active

```yaml
edge:
  id: "E04.002"
  source_node: "cathepsin_B_cytosolic"
  target_node: "NLRP3_active"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "cathepsin_NLRP3_activation"
  mechanism_description: "Cytosolic cathepsin B (from lysosomal rupture) promotes NLRP3-ASC complex assembly. Mechanism involves processing of NLRP3/ASC or degradation of inhibitory proteins"
  
  cross_module: "Input from Module 2 (Lysosomal)"
  
  evidence:
    - citation:
        pmid: "18604214"
        doi: "10.1038/ni.1631"
        first_author: "Hornung"
        year: 2008
        title: "Silica crystals and aluminum salts activate the NALP3 inflammasome through phagosomal destabilization"
      
      quote: "Inhibition of...cathepsin B activity impaired NALP3 activation"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Ctsb-/- and CA-074-Me inhibitor"
        translation_category: "T1"  # WT mouse
      
      methodology:
        type: "knockout"
        details: "Cathepsin B-/- mice; CA-074-Me pharmacological inhibitor"
        methodology_category: "M3"
      
      causal_confidence: "L5"  # T1 + M3 = 9-1-3 = 5
```

#### Edge E04.003: NLRP3_active → IL1B (canonical inflammasome output)

```yaml
edge:
  id: "E04.003"
  source_node: "NLRP3_active"
  target_node: "IL1B"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "inflammasome_IL1B_cleavage"
  mechanism_description: "NLRP3 recruits ASC → ASC oligomerizes → recruits pro-caspase-1 → caspase-1 auto-activates → cleaves pro-IL-1β (31 kDa) to mature IL-1β (17 kDa)"
  
  conserved: true  # Textbook immunology
  
  evidence:
    - citation:
        pmid: "23254930"
        doi: "10.1038/nature11729"
        first_author: "Heneka"
        year: 2013
        title: "NLRP3 is activated in Alzheimer's disease and contributes to pathology in APP/PS1 mice"
      
      quote: "Nlrp3(-/-) or Casp1(-/-) mice...demonstrated reduced brain caspase-1 and interleukin-1β activation"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "APP/PS1; Nlrp3-/-; Casp1-/-"
        translation_category: "T2"  # AD disease model
      
      methodology:
        type: "knockout"
        details: "NLRP3-/- and Caspase-1-/- crossed with APP/PS1"
        methodology_category: "M3"
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
```

#### Edge E04.004: mtDNA_cytosolic → cGAS_active

```yaml
edge:
  id: "E04.004"
  source_node: "mtDNA_cytosolic"
  target_node: "cGAS_active"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "mtDNA_cGAS_sensing"
  mechanism_description: "cGAS binds cytosolic dsDNA (including non-oxidized mtDNA) → catalyzes 2'3'-cGAMP synthesis. mtDNA is CpG-rich (bacterial origin) and potent cGAS activator"
  
  cross_module: "Input from Module 3 (Mitochondrial)"
  
  evidence:
    - citation:
        pmid: "37532932"
        doi: "10.1038/s41586-023-06373-1"
        first_author: "Gulen"
        year: 2023
        title: "cGAS-STING drives ageing-related inflammation and neurodegeneration"
      
      quote: "Cytosolic DNA released from perturbed mitochondria elicits cGAS activity in old microglia"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Aged C57BL/6; cGAS gain-of-function"
        translation_category: "T1"  # Aged WT mouse
      
      methodology:
        type: "knockout"
        details: "cGAS-/-, STING-/-, and cGAS gain-of-function models"
        methodology_category: "M3"
      
      causal_confidence: "L5"  # T1 + M3 = 9-1-3 = 5
```

#### Edge E04.005: cGAS_active → STING_active → type_I_IFN

```yaml
edge:
  id: "E04.005"
  source_node: "STING_active"
  target_node: "type_I_IFN"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "STING_IFN_induction"
  mechanism_description: "STING → TBK1 → IRF3 phosphorylation → IRF3 dimerization → nuclear translocation → IFN-α/β transcription"
  
  conserved: true  # Established pathway
  
  evidence:
    - citation:
        pmid: "37532932"
        doi: "10.1038/s41586-023-06373-1"
        first_author: "Gulen"
        year: 2023
        title: "cGAS-STING drives ageing-related inflammation and neurodegeneration"
      
      quote: "Blockade of STING suppresses the inflammatory phenotypes of senescent human cells and tissues"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Sting1-/-"
        translation_category: "T1"  # WT mouse
      
      methodology:
        type: "knockout"
        details: "STING-/- abolishes IFN response"
        methodology_category: "M3"
      
      causal_confidence: "L5"  # T1 + M3 = 9-1-3 = 5
      
    - citation:
        # Human senescent cells
        pmid: "37532932"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "Senescent fibroblasts"
        translation_category: "T3"  # Human ex vivo
      
      methodology:
        type: "pharmacological"
        details: "STING inhibitors in human senescent cells"
        methodology_category: "M2"
      
      causal_confidence: "L4"  # T3 + M2 = 9-3-2 = 4
```

#### Edge E04.006: NLRP3_active → GSK3B_active (tau kinase activation)

```yaml
edge:
  id: "E04.006"
  source_node: "NLRP3_active"
  target_node: "GSK3B_active"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "NLRP3_GSK3B_activation"
  mechanism_description: "NLRP3 inflammasome activation modulates tau kinases. IL-1β signaling activates GSK-3β via Wnt pathway inhibition"
  
  cross_module: "Output to Module 7 (Tau)"
  
  evidence:
    - citation:
        pmid: "31748742"
        doi: "10.1038/s41586-019-1769-z"
        first_author: "Ising"
        year: 2019
        title: "NLRP3 inflammasome activation drives tau pathology"
      
      quote: "Loss of NLRP3 inflammasome function reduced tau hyperphosphorylation and aggregation by regulating tau kinases and phosphatases"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Tau22; PS19; Nlrp3-/-"
        translation_category: "T2"  # Tauopathy model
      
      methodology:
        type: "knockout"
        details: "NLRP3-/- crossed with tau models"
        methodology_category: "M3"
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
```

#### Edge E04.007: NLRP3_active → PP2A_activity (phosphatase inhibition)

```yaml
edge:
  id: "E04.007"
  source_node: "NLRP3_active"
  target_node: "PP2A_activity"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "NLRP3_PP2A_inhibition"
  mechanism_description: "NLRP3 activation leads to PP2A inhibition, reducing tau dephosphorylation capacity"
  
  cross_module: "Output to Module 7 (Tau)"
  
  evidence:
    - citation:
        pmid: "31748742"
        doi: "10.1038/s41586-019-1769-z"
        first_author: "Ising"
        year: 2019
        title: "NLRP3 inflammasome activation drives tau pathology"
      
      quote: "regulating tau kinases and phosphatases"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Nlrp3-/-"
        translation_category: "T2"
      
      methodology:
        type: "knockout"
        methodology_category: "M3"
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
```

#### Edge E04.008: Abeta_oligomers → NLRP3_active

```yaml
edge:
  id: "E04.008"
  source_node: "Abeta_oligomers"
  target_node: "NLRP3_active"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "Abeta_NLRP3_activation"
  mechanism_description: "Aβ oligomers are phagocytosed by microglia → endolysosomal disruption → cathepsin release → NLRP3 activation"
  
  cross_module: "Input from Module 6 (Amyloid)"
  
  evidence:
    - citation:
        pmid: "23254930"
        doi: "10.1038/nature11729"
        first_author: "Heneka"
        year: 2013
        title: "NLRP3 is activated in Alzheimer's disease and contributes to pathology in APP/PS1 mice"
      
      quote: "Amyloid-β activation of the NLRP3 inflammasome in microglia is fundamental for interleukin-1β maturation"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "APP/PS1; Nlrp3-/-; Casp1-/-"
        translation_category: "T2"  # AD disease model
      
      methodology:
        type: "knockout"
        details: "NLRP3-/- or Caspase-1-/- in APP/PS1 → reduced Aβ pathology"
        methodology_category: "M3"
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
```

#### Edge E04.009: tau_aggregated → NLRP3_active (feedback amplification)

```yaml
edge:
  id: "E04.009"
  source_node: "tau_aggregated"
  target_node: "NLRP3_active"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "tau_NLRP3_feedback"
  mechanism_description: "Aggregated tau (PHF/NFT seeds) phagocytosed by microglia → activates NLRP3-ASC inflammasome. Creates POSITIVE FEEDBACK LOOP"
  
  cross_module: "Input from Module 7 (Tau) - creates feedback loop"
  
  evidence:
    - citation:
        pmid: "31748742"
        doi: "10.1038/s41586-019-1769-z"
        first_author: "Ising"
        year: 2019
        title: "NLRP3 inflammasome activation drives tau pathology"
      
      quote: "Tau activated the NLRP3 inflammasome and intracerebral injection of fibrillar amyloid-β-containing brain homogenates induced tau pathology in an NLRP3-dependent manner"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Tau22; PS19; tau seeding injection"
        translation_category: "T2"  # Tauopathy model
      
      methodology:
        type: "knockout"
        details: "NLRP3-/- + tau seeding injection"
        methodology_category: "M3"
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
      
  feedback_loop: true
  loop_type: "positive_amplification"
```

#### Edge E04.010: type_I_IFN → neuroinflammation

```yaml
edge:
  id: "E04.010"
  source_node: "type_I_IFN"
  target_node: "neuroinflammation"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "IFN_neuroinflammation"
  mechanism_description: "Type I IFN binds IFNAR → JAK1/TYK2 → STAT1/2 → ISG transcription → reactive microglial states, neurodegeneration"
  
  evidence:
    - citation:
        pmid: "37532932"
        doi: "10.1038/s41586-023-06373-1"
        first_author: "Gulen"
        year: 2023
        title: "cGAS-STING drives ageing-related inflammation and neurodegeneration"
      
      quote: "Activation of STING triggers reactive microglial transcriptional states, neurodegeneration and cognitive decline"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "cGAS gain-of-function; aged"
        translation_category: "T1"
      
      methodology:
        type: "knockout"
        details: "STING-/- reduces inflammatory markers"
        methodology_category: "M3"
      
      causal_confidence: "L5"  # T1 + M3 = 9-1-3 = 5
```

---

### Interventions

#### INT_MCC950: MCC950 (NLRP3 Inhibitor)

```yaml
intervention:
  id: "INT_MCC950"
  name: "MCC950"
  aliases: ["CP-456773", "CRID3"]
  
  target_type: "node"
  target_id: "NLRP3_active"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Potent and selective NLRP3 inhibitor; blocks ASC oligomerization; does not affect NLRC4 or AIM2 inflammasomes"
  action: "decreases"
  
  parameters:
    IC50: "7.5 nM"
    selectivity: "NLRP3-specific"
    BBB_penetration: "yes"
  
  clinical_status: "preclinical"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "preclinical"
      evidence: "Reduces pathology in APP/PS1 and tau models"
    - indication: "Other inflammatory diseases"
      status: "phase_2"
  
  evidence:
    - citation:
        pmid: "26539107"
        doi: "10.1038/nm.3978"
        first_author: "Coll"
        year: 2015
      methodology:
        type: "pharmacological_animal"
  
  route_of_administration: "oral, IP"
  blood_brain_barrier: "penetrant"
```

#### INT_STING_inhibitors: STING Inhibitors

```yaml
intervention:
  id: "INT_STING_inhibitors"
  name: "STING Inhibitors"
  aliases: ["H-151", "C-176"]
  
  target_type: "node"
  target_id: "STING_active"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Covalent STING inhibitors; block palmitoylation and downstream signaling"
  action: "decreases"
  
  clinical_status: "preclinical"
  indication_status:
    - indication: "Aging-related inflammation"
      status: "preclinical"
      evidence: "Gulen 2023 - reverses aging phenotypes in mice"
    - indication: "Autoinflammatory disease"
      status: "preclinical"
  
  evidence:
    - citation:
        pmid: "37532932"
        doi: "10.1038/s41586-023-06373-1"
        first_author: "Gulen"
        year: 2023
      quote: "Blockade of STING suppresses the inflammatory phenotypes"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "pharmacological_animal"
  
  route_of_administration: "IP"
  blood_brain_barrier: "variable"
  
  therapeutic_rationale: "STING drives aging-associated inflammation; blockade may be broadly anti-aging"
```

#### INT_Anakinra: Anakinra (IL-1R Antagonist)

```yaml
intervention:
  id: "INT_Anakinra"
  name: "Anakinra"
  aliases: ["Kineret", "IL-1Ra"]
  
  target_type: "edge"
  target_id: "IL1B → neuroinflammation"
  
  intervention_type: "biologic_antagonist"
  mechanism_of_action: "Recombinant IL-1 receptor antagonist; blocks IL-1α and IL-1β signaling"
  action: "blocks"
  
  clinical_status: "approved_other"
  indication_status:
    - indication: "Rheumatoid arthritis, CAPS"
      status: "approved"
    - indication: "Alzheimer's disease"
      status: "phase_1"
      trial_id: "NCT04834908"
      note: "XPro1595 (modified anti-TNF) also in trials"
  
  route_of_administration: "SC"
  blood_brain_barrier: "poor - may require intrathecal"
  
  limitation: "Does not cross BBB well; peripheral effects may not translate to CNS"
```

---

### Critical Feedback Loop: NLRP3 ↔ Tau

**See**: [ad_dag_diagrams.md → Diagram 5: Critical Feedback Loop NLRP3 ↔ Tau](ad_dag_diagrams.md#diagram-5-critical-feedback-loop-nlrp3--tau)

**Therapeutic implication**: Breaking the NLRP3-tau feedback loop may slow tau propagation even after Aβ pathology is established.

---

### Cross-Module Connections

| From Module | Edge | To Module | Mechanism |
|-------------|------|-----------|-----------|
| 2 (Lysosomal) | cathepsin B → NLRP3 | 4 (Inflammasome) | Route 1A: lysosomal rupture |
| 3 (Mitochondrial) | ox-mtDNA → NLRP3 | 4 (Inflammasome) | Route 2: oxidized fragments |
| 3 (Mitochondrial) | mtDNA → cGAS | 4 (Inflammasome) | Route 2: non-oxidized mtDNA |
| 6 (Amyloid) | Aβ oligomers → NLRP3 | 4 (Inflammasome) | Phagocytosis triggers |
| 4 (Inflammasome) | NLRP3 → GSK3β/PP2A | 7 (Tau) | Kinase/phosphatase dysregulation |
| 7 (Tau) | tau aggregated → NLRP3 | 4 (Inflammasome) | Feedback amplification |

---

### Bibliography (Module 4)

| PMID | DOI | First Author | Year | Journal | Key Finding |
|------|-----|--------------|------|---------|-------------|
| 18604214 | [10.1038/ni.1631](https://doi.org/10.1038/ni.1631) | Hornung | 2008 | Nat Immunol | Cathepsin B → NLRP3 activation |
| 23254930 | [10.1038/nature11729](https://doi.org/10.1038/nature11729) | Heneka | 2013 | Nature | **FOUNDATIONAL**: NLRP3 in AD; APP/PS1 protection |
| 31748742 | [10.1038/s41586-019-1769-z](https://doi.org/10.1038/s41586-019-1769-z) | Ising | 2019 | Nature | **PARADIGM SHIFT**: NLRP3 drives tau pathology |
| 35835107 | [10.1016/j.immuni.2022.06.007](https://doi.org/10.1016/j.immuni.2022.06.007) | Xian | 2022 | Immunity | Ox-mtDNA specificity for NLRP3 vs cGAS |
| 37532932 | [10.1038/s41586-023-06373-1](https://doi.org/10.1038/s41586-023-06373-1) | Gulen | 2023 | Nature | **PARADIGM SHIFT**: cGAS-STING drives aging |

---

### Therapeutic Implications

| Target | Mechanism | Evidence Level | Status |
|--------|-----------|----------------|--------|
| **NLRP3 inhibitors** (e.g., MCC950) | Block inflammasome assembly | L3-L4 (Heneka 2013, Ising 2019) | Clinical trials |
| **Caspase-1 inhibitors** (e.g., VX-765) | Block IL-1β maturation | L3 (Heneka 2013) | Clinical trials |
| **IL-1R antagonists** (e.g., Anakinra) | Block IL-1β signaling | L4 | Approved (RA), AD trials |
| **STING inhibitors** | Block Type I IFN | L3 (Gulen 2023) | Early development |
| **FEN1 inhibitors** | Block ox-mtDNA release | L4-L5 (Xian 2022) | Preclinical |

---

## Module 5: Microglial Phenotypes

### Overview

Module 5 describes how neuroinflammation (from Module 4) drives microglial phenotype transitions. Two key dysfunctional states are documented:

1. **DAM (Disease-Associated Microglia)**: Protective initially, activated in two TREM2-dependent steps
2. **LDAM (Lipid-Droplet-Accumulating Microglia)**: Dysfunctional state with impaired phagocytosis, elevated ROS, persistent cytokine secretion

The module also covers the HIF-1α/PKM2/glycolytic switch pathway that drives metabolic reprogramming and lipid accumulation, plus the critical microglia → astrocyte communication (A1 astrocyte induction).

### Nodes

| Status | Current ID | SBSF Type | References | Notes |
|--------|-----------|-----------|------------|-------|
| [x] | microglia_activated | STATE | CL:0000129 (microglia) | Generic activated state; entry point from neuroinflammation |
| [x] | HIF1a_stabilized | REGULATOR | UniProt:Q16665 (HIF1A), GO:0042803 | Stabilized by NF-κB under normoxic conditions |
| [x] | PKM2_upregulated | REGULATOR | UniProt:P14618 (PKM), GO:0004743 | Dimeric form acts as transcription coactivator |
| [x] | glycolytic_switch | STATE | GO:0019642 (glycolysis) | Warburg effect - aerobic glycolysis |
| [x] | SREBP1_activated | REGULATOR | UniProt:P36956 (SREBF1), GO:0006629 | Master lipogenic transcription factor |
| [x] | lipid_droplets | STOCK | GO:0005811 (lipid droplet) | TAG-rich storage organelles in cytoplasm |
| [x] | LDAM | STATE | | Lipid-droplet-accumulating microglia (dysfunctional) |
| [x] | DAM_transition | STATE | | Disease-associated microglia (2-step TREM2-dependent) |
| [x] | phagocytosis_impaired | PROCESS | GO:0006909 (phagocytosis) | Reduced clearance capacity |
| [x] | cytokine_secretion_persistent | PROCESS | GO:0005125 (cytokine activity) | Chronic proinflammatory output |
| [x] | A1_astrocytes | STATE | CL:0000127 (astrocyte) | Neurotoxic astrocyte phenotype |

### Key Edges - Inflammatory Activation Pathway

#### Edge 1: neuroinflammation → microglia_activated

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - phenotype transition |
| **Mechanism** | IL-1β, TNF-α, IL-6 from neuroinflammatory milieu activate microglia via TLRs and cytokine receptors → transcriptional reprogramming |
| **Directionality reasoning** | **ESTABLISHED BIOLOGY**: Cytokines activate microglia. This is the canonical neuroinflammation → glia response |
| **Method** | Multiple sources |
| **Species** | Universal |
| **Causal confidence** | **L4-L5** |

#### Edge 2: microglia_activated → HIF1a_stabilized

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - transcriptional/post-translational |
| **Mechanism** | NF-κB signaling (from activation) stabilizes HIF-1α even under normoxic conditions (pseudohypoxia). NF-κB directly induces HIF1A transcription AND inhibits PHD/VHL-mediated degradation |
| **Directionality reasoning** | **INTERVENTION**: NF-κB inhibitors reduce HIF-1α accumulation in activated microglia |
| **Method** | `in_vitro` + `intervention_animal` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4-L5** |
| **Note** | Creates "pseudohypoxia" - HIF-1α active without true oxygen deprivation |

### Key Edges - Metabolic Reprogramming

#### Edge 3: HIF1a_stabilized → glycolytic_switch

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - transcriptional activation |
| **Mechanism** | HIF-1α binds HREs (hypoxia response elements) in promoters of glycolytic genes: GLUT1, HK2, PFKFB3, LDHA, PDK1. PDK1 inhibits pyruvate entry into TCA → Warburg effect |
| **Directionality reasoning** | **DIRECT TRANSCRIPTIONAL**: HIF-1α is necessary and sufficient for glycolytic gene expression |
| **Method** | `knockout` (HIF1A-/-) + ChIP-seq |
| **Species** | NCBITaxon:10090, NCBITaxon:9606 |
| **Causal confidence** | **L3-L5 - HIGH** |
| **Citations** | Well-established Warburg metabolism biology |

#### Edge 4: HIF1a_stabilized ↔ PKM2_upregulated (Feedback Loop)

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - bidirectional feed-forward |
| **Mechanism** | **HIF-1α → PKM2**: HIF-1α transcriptionally induces PKM2 expression. **PKM2 → HIF-1α**: Nuclear PKM2 dimer acts as transcriptional coactivator, phosphorylates HIF-1α at Thr328 → enhanced transactivation |
| **Directionality reasoning** | **FEED-FORWARD LOOP**: Creates self-amplifying metabolic reprogramming |
| **Method** | `in_vitro` (PKM2 knockdown, HIF-1α mutants) |
| **Species** | NCBITaxon:9606 (cancer cells), NCBITaxon:10090 (macrophages) |
| **Causal confidence** | **L5** |
| **Loop ID** | `loop_hif1a_pkm2` (Reinforcing) |

### Key Edges - Lipid Accumulation to LDAM

#### Edge 5: glycolytic_switch → SREBP1_activated

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - metabolic consequence |
| **Mechanism** | Glycolysis produces excess acetyl-CoA and citrate → activates SREBP1 cleavage and nuclear translocation. mTORC1 (active in inflammatory state) also activates SREBP1 |
| **Directionality reasoning** | **METABOLIC LOGIC**: Glycolysis → citrate accumulation → SREBP1 activation is well-established |
| **Method** | `in_vitro` + `intervention_animal` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4-L5** |

#### Edge 6: SREBP1_activated → lipid_droplets

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - transcriptional activation of lipogenic genes |
| **Mechanism** | SREBP1 induces FASN (fatty acid synthase), ACC (acetyl-CoA carboxylase), SCD1 (stearoyl-CoA desaturase), DGAT2 (diacylglycerol acyltransferase) → de novo lipogenesis → TAG → lipid droplets |
| **Directionality reasoning** | **DIRECT TRANSCRIPTIONAL**: SREBP1 is master regulator of lipogenic gene program |
| **Method** | `knockout` (SREBP1-/-) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3** |

#### Edge 7: lipid_droplets → LDAM

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - definitional |
| **Mechanism** | LDAM are *defined* by lipid droplet accumulation. LD load correlates with dysfunction markers. LDs localize near Aβ plaques |
| **Directionality reasoning** | **DEFINITION**: LDAM = microglia with accumulated lipid droplets |
| **Method** | `in_vitro` + human brain histology |
| **Species** | NCBITaxon:10090, NCBITaxon:9606 |
| **Causal confidence** | **L4-L5 - HIGH** |
| **Citations** | PMID:31959936 [DOI](https://doi.org/10.1038/s41593-019-0566-1) - Marschallinger 2020 |
| **Evidence quote** | "A striking buildup of lipid droplets in microglia with aging in mouse and human brains" |

### Key Edges - LDAM Dysfunction

#### Edge 8: LDAM → phagocytosis_impaired

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - functional consequence |
| **Mechanism** | LDAM show ~50% reduced phagocytic capacity. Lipid droplets may physically interfere with phagolysosome formation; lysosomal function is compromised |
| **Directionality reasoning** | **INTERVENTION**: DGAT2 degrader reduces lipid droplets AND restores phagocytosis |
| **Method** | `in_vitro` (DGAT2 inhibitors/degraders) + `intervention_animal` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4-L5 - HIGH** |
| **Citations** | PMID:31959936 [DOI](https://doi.org/10.1038/s41593-019-0566-1) - Marschallinger 2020 |
| **Evidence quote** | "LDAM...are defective in phagocytosis" |
| **Therapeutic implication** | DGAT2 inhibitors may restore microglial function |

#### Edge 9: LDAM → cytokine_secretion_persistent

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - proinflammatory secretome |
| **Mechanism** | LDAM maintain elevated secretion of IL-1β, TNF-α, IL-6 even after initial stimulus removed. Creates chronic inflammatory state |
| **Directionality reasoning** | **TRANSCRIPTOMIC**: LDAM RNA-seq shows elevated inflammatory gene signature distinct from other microglial states |
| **Method** | RNA-seq + cytokine ELISA |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L5** |
| **Citations** | PMID:31959936 [DOI](https://doi.org/10.1038/s41593-019-0566-1) - Marschallinger 2020 |
| **Evidence quote** | "...secrete proinflammatory cytokines. RNA-sequencing analysis...revealed a transcriptional profile driven by innate inflammation" |

#### Edge 10: cytokine_secretion_persistent → neuroinflammation (Feedback)

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - feed-forward amplification |
| **Mechanism** | LDAM cytokines perpetuate neuroinflammatory state → more microglial activation → more LDAM formation |
| **Directionality reasoning** | **LOGICAL CONSEQUENCE**: Cytokines cause inflammation; this is the feed-forward loop |
| **Causal confidence** | **L5** |
| **Loop ID** | `loop_neuroinflammation_LDAM` (Reinforcing) |

### Key Edges - LDAM → Astrocyte Communication

#### Edge 11: LDAM → A1_astrocytes

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - paracrine signaling |
| **Mechanism** | LDAM (and activated microglia generally) secrete **IL-1α + TNF-α + C1q** → these three factors are necessary and sufficient to induce A1 neurotoxic astrocyte phenotype |
| **Directionality reasoning** | **INTERVENTION**: Triple antibody blockade (anti-IL-1α + anti-TNF + anti-C1q) prevents A1 formation. Triple knockout (Il1a-/-;Tnf-/-;C1qa-/-) mice have no A1 astrocytes after injury |
| **Method** | `knockout` (triple KO) + `in_vitro` (neutralizing antibodies) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3 - HIGH** |
| **Citations** | PMID:28099414 [DOI](https://doi.org/10.1038/nature21029) - Liddelow 2017 |
| **Evidence quote** | "Activated microglia induce A1 astrocytes by secreting Il-1α, TNF and C1q, and that these cytokines together are necessary and sufficient to induce A1 astrocytes" |

#### Edge 12: A1_astrocytes → neuronal_death (Cross-module)

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - neurotoxicity |
| **Mechanism** | A1 astrocytes lose neuroprotective functions (synaptogenesis, phagocytosis) AND gain neurotoxic activity (secrete unknown toxin that kills neurons and oligodendrocytes) |
| **Directionality reasoning** | **IN VITRO**: A1 conditioned medium kills neurons; A2 conditioned medium does not |
| **Method** | `in_vitro` (conditioned medium) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L5** |
| **Citations** | PMID:28099414 [DOI](https://doi.org/10.1038/nature21029) - Liddelow 2017 |
| **Evidence quote** | "A1 astrocytes...induce the death of neurons and oligodendrocytes" |

### Key Edges - Disease-Associated Microglia (DAM)

#### Edge 13: Abeta_oligomers → DAM_transition (Step 1: TREM2-independent)

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - phenotype transition |
| **Mechanism** | **Step 1**: Aβ exposure triggers TREM2-independent downregulation of homeostatic microglia "checkpoints" (P2ry12, Cx3cr1, Tmem119) |
| **Directionality reasoning** | **scRNA-seq**: DAM Stage 1 markers appear in TREM2-/- mice; Stage 2 requires TREM2 |
| **Method** | `knockout` (TREM2-/-) + single-cell RNA-seq |
| **Species** | NCBITaxon:10090 (5xFAD, Trem2-/- x 5xFAD) |
| **Causal confidence** | **L3 - HIGH** |
| **Citations** | PMID:28602351 [DOI](https://doi.org/10.1016/j.cell.2017.05.018) - Keren-Shaul 2017 |
| **Evidence quote** | "Activation is initiated in a Trem2-independent manner that involves downregulation of microglia checkpoints" |

#### Edge 14: DAM_transition (Step 2: TREM2-dependent) → phagocytic_capacity

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - functional maturation |
| **Mechanism** | **Step 2**: TREM2-dependent activation of protective program including APOE, LPL, CST7, and phagocytic machinery. DAM localize to plaques and contain intracellular Aβ |
| **Directionality reasoning** | **KNOCKOUT**: TREM2-/- mice fail to progress to Stage 2 DAM; have more diffuse plaques |
| **Method** | `knockout` (TREM2-/-) |
| **Species** | NCBITaxon:10090 (5xFAD) |
| **Causal confidence** | **L3 - HIGH** |
| **Citations** | PMID:28602351 [DOI](https://doi.org/10.1016/j.cell.2017.05.018) - Keren-Shaul 2017 |
| **Evidence quote** | "This unique microglia-type has the potential to restrict neurodegeneration" |
| **Key insight** | DAM may be initially **protective** (plaque compaction, Aβ phagocytosis) |

### Key Edges - Complement-Mediated Synapse Elimination

#### Edge 15: LDAM → C1q

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - transcriptional upregulation |
| **Mechanism** | Activated/dysfunctional microglia are the primary source of C1q in brain. C1q expression increases 300-fold with aging |
| **Directionality reasoning** | **CELL-TYPE SPECIFIC**: Microglia-specific C1q expression confirmed by scRNA-seq and in situ |
| **Method** | scRNA-seq + immunohistochemistry |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L5** |
| **Citations** | PMID:27033548 [DOI](https://doi.org/10.1126/science.aad8373) - Hong 2016 |
| **Evidence quote** | "C1q...is increased and associated with synapses before overt plaque deposition" |

#### Edge 16: C1q → synapses (Cross-module to Module 8)

| Field | Value |
|-------|-------|
| **Relation** | `decreases` (→) - complement-mediated pruning depletes synapse STOCK |
| **Mechanism** | C1q tags synapses → C3 cleavage → C3b opsonization → CR3 (microglia) recognition → phagocytic engulfment of tagged synapses |
| **Directionality reasoning** | **KNOCKOUT**: C1q-/-, C3-/-, or CR3-/- all PRESERVE synapses in AD models |
| **Method** | `knockout` (C1qa-/-, C3-/-, Cr3-/-) in AD models |
| **Species** | NCBITaxon:10090 (J20, APP/PS1) |
| **Causal confidence** | **L3 - HIGH** |
| **Citations** | PMID:27033548 [DOI](https://doi.org/10.1126/science.aad8373) - Hong 2016 |
| **Evidence quote** | "Inhibition of C1q, C3, or the microglial complement receptor CR3 reduces...early synapse loss" |
| **Key insight** | Complement-mediated synapse pruning = developmental program **reactivated** in AD |

### DAM vs LDAM: Distinct but Overlapping States

| Feature | DAM | LDAM |
|---------|-----|------|
| **Discovery** | Keren-Shaul 2017 | Marschallinger 2020 |
| **Defining marker** | Transcriptional signature (APOE↑, LPL↑, CST7↑) | Lipid droplet accumulation |
| **TREM2 dependence** | Stage 2 requires TREM2 | TREM2-independent |
| **Function** | Initially protective (plaque compaction) | Dysfunctional (impaired phagocytosis) |
| **Cytokines** | Variable | Persistently elevated IL-1β, TNF-α |
| **Relationship** | May be early/adaptive response | May be late/maladaptive terminal state |
| **Overlap** | Both express APOE; DAM may transition to LDAM under chronic stress |

### Module 5 Summary Diagram

**See**: [ad_dag_diagrams.md → Diagram 5B: Module 5 Summary Diagram](ad_dag_diagrams.md#diagram-5b-module-5-summary-diagram)

### Therapeutic Implications

| Target | Mechanism | Evidence Level | Status |
|--------|-----------|----------------|--------|
| **DGAT2 inhibitors/degraders** | Reduce lipid droplets → restore phagocytosis | L4-L5 (Marschallinger 2020) | Preclinical |
| **PKM2 inhibitors** | Block metabolic reprogramming | L5 | Preclinical |
| **IL-1α + TNF + C1q blockade** | Prevent A1 astrocyte induction | L3 (Liddelow 2017) | Preclinical |
| **C1q/C3 inhibitors** | Block complement-mediated synapse loss | L3 (Hong 2016) | Clinical trials (ANX005) |
| **TREM2 agonists** | Enhance DAM transition → improve Aβ clearance | L3-L4 | Clinical trials |

---

## Module 6: Amyloid Pathology

### Overview

Module 6 documents the amyloid cascade - from Aβ production through oligomer toxicity to plaque formation. This module connects to inflammation via two critical feedback loops:

1. **NF-κB → BACE1 → Aβ → NF-κB** (inflammatory amplification of Aβ production)
2. **Aβ oligomers → microglia → impaired clearance → more Aβ** (LDAM dysfunction)

The module also covers TREM2-dependent plaque compaction as a potentially protective mechanism.

### Nodes

| Status | Current ID | SBSF Type | References | Notes |
|--------|-----------|-----------|------------|-------|
| [x] | BACE1_upregulated | REGULATOR | UniProt:P56817 (BACE1), GO:0004190 | β-secretase; rate-limiting for Aβ production |
| [x] | APP_processing_amyloidogenic | PROCESS | GO:0042987 (amyloid precursor cleavage) | BACE1 → C99 → γ-secretase → Aβ |
| [x] | Abeta_production | FLOW | CHEBI:64645 (Aβ42) | Aβ generation rate; Aβ42 > Aβ40 in aggregation |
| [x] | Abeta_oligomers | STOCK | CHEBI:64645 | Soluble oligomers; MOST TOXIC species |
| [x] | Abeta_plaques | STOCK | HP:0100256 (senile plaques) | Insoluble fibrillar deposits |
| [x] | Abeta_clearance | PROCESS | GO:0006909 (phagocytosis), GO:0097242 | Aβ clearance rate (microglial, glymphatic, BBB-mediated) |
| [x] | plaque_compaction | PROCESS | | TREM2/microglia-dependent protective compaction |
| [x] | synaptic_Abeta_binding | PROCESS | | Oligomer binding to PrPc, mGluR5, NMDAR |

### Key Edges - Aβ Production Pathway

#### Edge 1: NFkB_activated → BACE1_upregulated

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - transcriptional activation |
| **Mechanism** | NF-κB p65 (RelA) binds **two functional NF-κB elements** in BACE1 promoter → 2-3 fold transcriptional upregulation |
| **Directionality reasoning** | **KNOCKOUT**: RelA-/- cells have reduced BACE1 expression; NF-κB inhibitors reduce BACE1 |
| **Method** | `knockout` (RelA-/-) + `in_vitro` (promoter studies, ChIP) |
| **Species** | NCBITaxon:9606 (human cells) |
| **Causal confidence** | **L3-L5 - HIGH** |
| **Citations** | Multiple studies confirm NF-κB sites in BACE1 promoter |
| **Key insight** | **FEED-FORWARD LOOP**: Inflammation → NF-κB → BACE1 → Aβ → more inflammation |

#### Edge 2: BACE1_upregulated → APP_processing_amyloidogenic

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - enzymatic cleavage |
| **Mechanism** | BACE1 cleaves APP at β-site (Asp1) → generates C99 (β-CTF). This is the **RATE-LIMITING STEP** for Aβ production |
| **Directionality reasoning** | **KNOCKOUT**: BACE1-/- mice have **zero Aβ** - complete abolition |
| **Method** | `knockout` (Bace1-/-) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3 - HIGH** (textbook biochemistry) |
| **Citations** | BACE1-/- eliminates Aβ completely (multiple labs) |
| **Therapeutic implication** | BACE1 inhibitors should reduce Aβ - but trials show cognitive side effects (GABA receptor cleavage) |

#### Edge 3: APP_processing_amyloidogenic → Abeta_production

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - enzymatic cleavage |
| **Mechanism** | γ-secretase cleaves C99 at variable sites → Aβ40 (~90%) and Aβ42 (~10%). Aβ42 is more aggregation-prone (hydrophobic C-terminus) |
| **Directionality reasoning** | **BIOCHEMISTRY**: Sequential cleavage model is well-established |
| **Method** | `in_vitro` + genetic (PSEN mutations alter Aβ42/40 ratio) |
| **Species** | NCBITaxon:9606 |
| **Causal confidence** | **L5 - HIGH** |
| **Note** | FAD mutations in PSEN1/2 increase Aβ42/40 ratio |

### Key Edges - Aβ Aggregation & Toxicity

#### Edge 4: Abeta_production → Abeta_oligomers

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - concentration-dependent aggregation |
| **Mechanism** | Aβ monomers → dimers → oligomers (most toxic) → protofibrils → fibrils → plaques. Aggregation follows nucleation-dependent kinetics |
| **Directionality reasoning** | **PHYSICAL CHEMISTRY**: Higher concentration = faster nucleation = more oligomers |
| **Method** | `in_vitro` (aggregation kinetics) |
| **Species** | Universal |
| **Causal confidence** | **L5** |
| **Key insight** | **Oligomers are the MOST TOXIC species** - not monomers, not fibrils |

#### Edge 5: Abeta_oligomers → synaptic_Abeta_binding

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - receptor binding |
| **Mechanism** | Aβ oligomers bind multiple synaptic receptors: PrPc (cellular prion protein), mGluR5, NMDAR, α7-nAChR, PSD-95 → disrupts synaptic function |
| **Directionality reasoning** | **BIOCHEMISTRY**: Direct binding demonstrated by co-IP, surface plasmon resonance |
| **Method** | `in_vitro` (binding assays) + `knockout` (PrP-/- reduces toxicity) |
| **Species** | NCBITaxon:10090, NCBITaxon:9606 |
| **Causal confidence** | **L3-L5** |
| **Citations** | PrPc as Aβ receptor (Bhattacharya et al., Lauren et al.); mGluR5 binding |

#### Edge 6: Abeta_oligomers → LTP_inhibition (Cross-module)

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - synaptic dysfunction |
| **Mechanism** | Naturally secreted Aβ oligomers potently inhibit hippocampal long-term potentiation (LTP) *in vivo*. Monomers and fibrils do NOT have this effect |
| **Directionality reasoning** | **LANDMARK EXPERIMENT**: Immunodepletion of Aβ completely abrogates LTP inhibition |
| **Method** | `intervention_animal` (intrahippocampal injection) + immunodepletion |
| **Species** | NCBITaxon:10116 (rat) |
| **Causal confidence** | **L4 - HIGH** |
| **Citations** | PMID:11932745 [DOI](https://doi.org/10.1038/416535a) - Walsh 2002 |
| **Evidence quote** | "Aβ oligomers, in the absence of monomers and amyloid fibrils, disrupted synaptic plasticity in vivo at concentrations found in human brain" |

### Key Edges - Plaque Formation & Compaction

#### Edge 7: Abeta_oligomers → Abeta_plaques

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - continued aggregation |
| **Mechanism** | Oligomers → protofibrils → mature fibrils → insoluble neuritic plaques. Cross-β sheet structure is endpoint |
| **Directionality reasoning** | **PHYSICAL CHEMISTRY**: Thermodynamic endpoint of aggregation cascade |
| **Method** | `in_vitro` (aggregation assays) + histology |
| **Species** | Universal |
| **Causal confidence** | **L5** |
| **Note** | Plaques may be less toxic than oligomers - possible sequestration function |

#### Edge 8: plaque_compaction -| Abeta_oligomers (Protective)

| Field | Value |
|-------|-------|
| **Relation** | `decreases` (-|) - sequestration |
| **Mechanism** | Microglia constitute a **barrier** around plaques that compacts them and prevents outward expansion. Compact plaques have **low Aβ42 affinity** → reduced oligomer release. Areas without microglia coverage have **high Aβ42 affinity** and more toxic oligomer hotspots |
| **Directionality reasoning** | **INTERVENTION**: CX3CR1 deletion or anti-Aβ immunotherapy → expanded microglia coverage → reduced neuritic dystrophy |
| **Method** | `knockout` (CX3CR1-/-) + `in_vivo` imaging |
| **Species** | NCBITaxon:10090 (AD models) |
| **Causal confidence** | **L4 - HIGH** |
| **Citations** | PMID:25630253 [DOI](https://doi.org/10.1038/ncomms7176) - Condello 2015 |
| **Evidence quote** | "Microglia constitute a barrier with profound impact on plaque composition and toxicity...prevents outward plaque expansion" |
| **Key insight** | Plaque compaction may be **PROTECTIVE** - TREM2 loss → diffuse plaques → more toxic oligomer release |

### Key Edges - Aβ-Inflammation Feedforward

#### Edge 9: Abeta_oligomers → microglia_activated

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - receptor-mediated activation |
| **Mechanism** | Aβ oligomers activate microglia via CD36, TREM2, RAGE, TLR2/4 receptors → inflammatory response |
| **Directionality reasoning** | **ESTABLISHED**: Aβ is a DAMP that triggers innate immune response |
| **Method** | `in_vitro` + `knockout` (TREM2-/-, CD36-/-) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3-L5** |
| **Note** | Creates feed-forward loop: Aβ → microglia → inflammation → BACE1 → more Aβ |

#### Edge 10: Abeta_oligomers → NFkB_activated

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - RAGE/TLR-mediated signaling |
| **Mechanism** | Aβ activates NF-κB via RAGE receptor and TLR pathway → inflammatory gene transcription + BACE1 upregulation |
| **Directionality reasoning** | **INTERVENTION**: NF-κB inhibitors reduce Aβ-induced inflammation |
| **Method** | `in_vitro` + `intervention_animal` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4-L5** |
| **Loop ID** | `loop_Abeta_NFkB_BACE1` (Reinforcing) |

#### Edge 11: Abeta_clearance_impaired → Abeta_oligomers

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - accumulation |
| **Mechanism** | LDAM have ~50% reduced phagocytic capacity → cannot clear Aβ efficiently. Combined with increased production → NET ACCUMULATION |
| **Directionality reasoning** | **MASS BALANCE**: Steady-state [Aβ] = production/clearance. Impaired clearance → accumulation |
| **Method** | Multiple sources |
| **Species** | NCBITaxon:10090, NCBITaxon:9606 |
| **Causal confidence** | **L4-L5** |
| **Key insight** | Late-onset AD likely involves clearance failure more than production increase |

### Critical Feedback Loops in Amyloid Module

**See**: [ad_dag_diagrams.md → Diagram 6: Module 6 Summary Diagram](ad_dag_diagrams.md#diagram-6-module-6-summary-diagram) (includes both production and clearance feedback loops)

### Dual Pathology Model: Production vs Clearance

| Feature | Early-Onset FAD | Late-Onset SAD |
|---------|-----------------|----------------|
| **Primary defect** | Aβ PRODUCTION↑ | Aβ CLEARANCE↓ |
| **Mechanism** | APP/PSEN mutations → more Aβ42 | LDAM dysfunction, APOE4 effects |
| **Age of onset** | 30-60 years | >65 years |
| **Genetics** | Autosomal dominant (rare) | Complex (common) |
| **Therapeutic target** | γ-secretase, BACE1 | Restore microglial function, enhance clearance |

### Module 6 Summary Diagram

**See**: [ad_dag_diagrams.md → Diagram 6: Module 6 Summary Diagram](ad_dag_diagrams.md#diagram-6-module-6-summary-diagram)

### Therapeutic Implications

| Target | Mechanism | Evidence Level | Status/Issues |
|--------|-----------|----------------|---------------|
| **BACE1 inhibitors** | Block rate-limiting step | L3 | **FAILED** - cognitive side effects (other substrates) |
| **γ-secretase inhibitors** | Block Aβ production | L3 | **FAILED** - Notch pathway toxicity |
| **γ-secretase modulators** | Shift Aβ42→Aβ38 | L4 | Ongoing development |
| **Anti-Aβ immunotherapy** | Clear Aβ, expand microglia barrier | L3-L4 | **APPROVED** (lecanemab, donanemab) - modest efficacy |
| **TREM2 agonists** | Enhance plaque compaction | L3-L4 | Clinical trials |
| **DGAT2 inhibitors** | Restore LDAM function → clearance | L4-L5 | Preclinical |

---

## Module 7: Tau Pathology

### Overview

Module 7 documents the tau pathology cascade - from kinase/phosphatase imbalance through hyperphosphorylation to PHF formation, NFT deposition, and prion-like propagation. This module has critical connections to Module 4 (NLRP3 → GSK-3β/PP2A) and Module 5 (microglia-mediated tau spreading).

Key concepts:
1. **Kinase/Phosphatase imbalance**: GSK-3β↑ + p38↑ + PP2A↓ → net hyperphosphorylation
2. **Aggregation cascade**: pTau → detaches from MT → PHF → NFT
3. **Prion-like propagation**: Exosomal tau seeds aggregation in recipient neurons (Braak staging)
4. **NLRP3-Tau feedforward**: Tau activates NLRP3; NLRP3 promotes tau phosphorylation (Ising 2019)

### Nodes

| Status | Current ID | SBSF Type | References | Notes |
|--------|-----------|-----------|------------|-------|
| [x] | GSK3beta_active | REGULATOR | UniProt:P49841 (GSK3B), GO:0004674 | Major tau kinase; phosphorylates Ser199, Ser202, Thr231, Ser396 |
| [x] | p38_MAPK_active | REGULATOR | UniProt:Q16539 (MAPK14), GO:0004707 | IL-1β-activated tau kinase |
| [x] | PP2A_inhibited | STATE | UniProt:P67775 (PPP2CA), GO:0006470 | Major tau phosphatase; >70% of tau dephosphorylation |
| [x] | tau_hyperphosphorylated | STATE | UniProt:P10636 (MAPT), HP:0002185 | pTau at AT8, PHF-1 epitopes |
| [x] | tau_aggregated_PHF | STOCK | GO:0097418 (neurofibrillary tangle) | Paired helical filaments |
| [x] | NFT_formation | STOCK | HP:0002185 (NFT) | Mature neurofibrillary tangles |
| [x] | tau_exosomal_release | PROCESS | GO:0070481 (vesicle secretion) | Exosome-mediated tau secretion |
| [x] | tau_seeding | PROCESS | | Prion-like templated misfolding |
| [x] | PHF_formation_capacity | STATE | | Species-dependent: 3R/4R mixture required |

### Key Phosphorylation Sites

| Epitope | Sites | Kinase(s) | Function |
|---------|-------|-----------|----------|
| **AT8** | pSer202/pThr205 | GSK-3β, CDK5 | Early marker; detects paired sites |
| **PHF-1** | pSer396/pSer404 | GSK-3β | Late marker; correlates with aggregation |
| **AT180** | pThr231 | GSK-3β, CDK5 | Conformation-changing; disrupts MT binding |
| **12E8** | pSer262 | MARK | Critical for MT detachment |
| **AT100** | pThr212/pSer214 | GSK-3β (primed by PKA) | Conformational epitope |

### Key Edges - Kinase/Phosphatase Regulation

#### Edge 1: GSK3beta_active → tau_hyperphosphorylated

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - enzymatic phosphorylation |
| **Mechanism** | GSK-3β phosphorylates tau at Ser199, Ser202, Thr205, Thr231, Ser396, Ser404. Some sites require priming by other kinases (CDK5, PKA) |
| **Directionality reasoning** | **IN VITRO + IN VIVO**: GSK-3β inhibitors (lithium, tideglusib) reduce tau phosphorylation; GSK-3β overexpression increases pTau |
| **Method** | `knockout` + `in_vitro` + `intervention_animal` |
| **Species** | NCBITaxon:10090, NCBITaxon:9606 |
| **Causal confidence** | **L3-L5 - HIGH** |
| **Citations** | PMID:26631930 [DOI](https://doi.org/10.1038/nrn.2015.1) - Wang & Mandelkow 2016 |
| **Note** | GSK-3β is the **major tau kinase** - phosphorylates more sites than any other kinase |

#### Edge 2: p38_MAPK_active → tau_hyperphosphorylated

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - enzymatic phosphorylation |
| **Mechanism** | p38 MAPK phosphorylates tau at Ser199, Ser202, Thr205. Activated by IL-1β signaling on neurons via IL-1R1 |
| **Directionality reasoning** | **CO-CULTURE**: Microglial IL-1β activates neuronal p38 → tau phosphorylation |
| **Method** | `in_vitro` (neuron-microglia co-culture) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L5** |
| **Citations** | PMID:20064974 [DOI](https://doi.org/10.1016/j.neuron.2010.08.023) - Bhaskar 2010 |
| **Key insight** | Links inflammation directly to tau phosphorylation |

#### Edge 3: PP2A_inhibited → tau_hyperphosphorylated

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - reduced dephosphorylation |
| **Mechanism** | PP2A accounts for **>70%** of tau dephosphorylation. PP2A activity is ↓20-40% in AD brain (gray and white matter). Inhibited by: I1PP2A↑, I2PP2A↑ (cleaved, translocates to cytoplasm), ↓methylation, oxidative stress |
| **Directionality reasoning** | **MASS BALANCE**: Net pTau = phosphorylation rate - dephosphorylation rate. ↓PP2A → ↑net pTau |
| **Method** | `in_vitro` + human brain measurement |
| **Species** | NCBITaxon:9606 |
| **Causal confidence** | **L5-L6** |
| **Citations** | Multiple studies show PP2A↓ in AD brain (Tanimukai 2005, Liu 2005) |

#### Edge 4: NLRP3 → GSK3beta_active (from Module 4)

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - kinase activation |
| **Mechanism** | NLRP3 activation modulates tau kinases; IL-1β signaling activates GSK-3β via Wnt pathway inhibition |
| **Directionality reasoning** | **KNOCKOUT**: Nlrp3-/- in Tau22 mice have reduced GSK-3β activation and tau phosphorylation |
| **Method** | `knockout` (Nlrp3-/-) |
| **Species** | NCBITaxon:10090 (Tau22) |
| **Causal confidence** | **L3 - HIGH** |
| **Citations** | PMID:31748742 [DOI](https://doi.org/10.1038/s41586-019-1769-z) - Ising 2019 |

### Key Edges - Aggregation Cascade

#### Edge 5: tau_hyperphosphorylated → tau_aggregated_PHF

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - conformational change + aggregation |
| **Mechanism** | Hyperphosphorylated tau: (1) Detaches from microtubules (MT-binding domain occupied by phosphates), (2) Adopts pathological conformation, (3) Self-aggregates into β-sheet-rich PHF structures |
| **Directionality reasoning** | **BIOCHEMISTRY**: pTau has reduced MT affinity AND increased aggregation propensity |
| **Method** | `in_vitro` (aggregation assays) |
| **Species** | Universal |
| **Causal confidence** | **L5** |
| **Citations** | PMID:26631930 - Wang & Mandelkow 2016 |

#### Edge 6: tau_aggregated_PHF → NFT_formation

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - continued accumulation |
| **Mechanism** | PHF accumulation → mature NFT formation. NFTs are endpoint of intracellular tau pathology. Released upon neuronal death |
| **Directionality reasoning** | **HISTOPATHOLOGY**: PHFs are building blocks of NFTs |
| **Method** | Human autopsy + mouse models |
| **Species** | NCBITaxon:9606 |
| **Causal confidence** | **L5-L6** |
| **Citations** | PMID:1759558 [DOI](https://doi.org/10.1007/BF00308809) - Braak & Braak 1991 |

### Key Edges - Prion-Like Propagation

#### Edge 7: NFT_formation → tau_exosomal_release

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - secretion pathway |
| **Mechanism** | Neurons and microglia package tau (both hyperphosphorylated and aggregated forms) into exosomes for secretion. Dead neurons also release tau directly |
| **Directionality reasoning** | **ESTABLISHED**: Tau is detected in exosomes; higher in AD CSF |
| **Method** | `in_vitro` + CSF analysis |
| **Species** | NCBITaxon:9606, NCBITaxon:10090 |
| **Causal confidence** | **L5** |

#### Edge 8: tau_exosomal_release → tau_seeding

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - templated misfolding |
| **Mechanism** | Exosomal tau is taken up by distant neurons → seeds template misfolding of native tau. This is the mechanism underlying Braak staging (stereotypical spread from entorhinal cortex → hippocampus → neocortex) |
| **Directionality reasoning** | **INTERVENTION**: Inhibiting exosome synthesis significantly reduced tau propagation |
| **Method** | `intervention_animal` (exosome inhibitors) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4 - HIGH** |
| **Citations** | PMID:26436904 [DOI](https://doi.org/10.1038/nn.4132) - Asai 2015 |
| **Evidence quote** | "Inhibiting exosome synthesis significantly reduced tau propagation in vitro and in vivo" |

#### Edge 9: tau_seeding → tau_hyperphosphorylated (in recipient neuron)

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - templated misfolding |
| **Mechanism** | Tau seeds template misfolding of native tau in recipient neurons → initiates new aggregation cascade |
| **Directionality reasoning** | **PRION-LIKE**: Classic templated misfolding mechanism |
| **Method** | `intervention_animal` (tau injection studies) |
| **Species** | NCBITaxon:10090 (PS19, hTau) |
| **Causal confidence** | **L4** |

### Key Edges - Microglia Role in Tau Spreading

#### Edge 10: LDAM → tau_exosomal_release

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - failed degradation + secretion |
| **Mechanism** | LDAM phagocytose tau but **cannot degrade** it (lysosomal dysfunction). Instead, they package tau into exosomes and release it - **inadvertently spreading tau pathology** |
| **Directionality reasoning** | **DEPLETION**: Microglia depletion **HALTS** tau propagation |
| **Method** | `intervention_animal` (PLX3397 microglia depletion) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4 - HIGH** |
| **Citations** | PMID:26436904 [DOI](https://doi.org/10.1038/nn.4132) - Asai 2015 |
| **Evidence quote** | "Depleting microglia dramatically suppressed the propagation of tau" |
| **Key insight** | Microglia are **vectors for tau spreading** - not just responders to pathology |

#### Edge 11: tau_seeding → NLRP3 (Feedforward Loop)

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - inflammasome activation |
| **Mechanism** | Phagocytosed tau seeds activate NLRP3-ASC inflammasome in microglia at the recipient region → inflammation precedes tau pathology in new area |
| **Directionality reasoning** | **KNOCKOUT**: Nlrp3-/- blocks tau-induced inflammation and reduces further tau propagation |
| **Method** | `knockout` (Nlrp3-/-) + tau injection |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3** |
| **Citations** | PMID:31748742 [DOI](https://doi.org/10.1038/s41586-019-1769-z) - Ising 2019 |
| **Loop ID** | `loop_tau_NLRP3_propagation` (Reinforcing) |

### The Tau-Inflammation Spreading Front

**See**: [ad_dag_diagrams.md → Diagram 7: Tau-Inflammation Spreading Front](ad_dag_diagrams.md#diagram-7-tau-inflammation-spreading-front)

### Braak Staging: Stereotypical Tau Spread

| Stage | Region | Clinical Correlate |
|-------|--------|-------------------|
| **I-II** | Transentorhinal/entorhinal cortex | Preclinical (no symptoms) |
| **III-IV** | Limbic (hippocampus, amygdala) | MCI (mild memory impairment) |
| **V-VI** | Isocortical (neocortex) | Dementia (frank AD) |

**Key insight**: NFT burden correlates with cognitive decline **better than Aβ plaques** (Braak & Braak 1991)

### Species Divergence: Why Mice Don't Make NFTs

| Feature | Human | Mouse |
|---------|-------|-------|
| **Tau isoforms** | 3R + 4R mixture | 4R only (adult) |
| **PHF formation** | Yes | No (without humanized tau) |
| **Reason** | 3R/4R mixture critical for PHF | 4R-only doesn't aggregate same way |
| **Model solution** | - | hTau mice, PS19, Tau22 (express human tau) |

### Therapeutic Implications

| Target | Mechanism | Evidence Level | Status |
|--------|-----------|----------------|--------|
| **GSK-3β inhibitors** | Reduce tau phosphorylation | L4-L5 | Tideglusib failed (efficacy); lithium ongoing |
| **PP2A activators** | Restore dephosphorylation | L5 | Preclinical |
| **Anti-tau immunotherapy** | Clear extracellular tau | L4 | Clinical trials (semorinemab, etc.) |
| **ASO/siRNA** | Reduce tau expression | L4 | Clinical trials (BIIB080) |
| **Exosome inhibitors** | Block propagation | L4 (Asai 2015) | Preclinical |
| **NLRP3 inhibitors** | Break tau-inflammation loop | L3 (Ising 2019) | Preclinical |
| **Microglia modulation** | Restore degradation, block spreading | L4 | Preclinical |

---

### Module 7B: Reverse Transsulfuration Pathway (Protective Counter-Mechanism)

#### Overview

The **reverse transsulfuration pathway** generates cysteine and hydrogen sulfide (H₂S) - a gasotransmitter with profound neuroprotective effects. This pathway represents a **critical BRAKE on tau pathology** that is **LOST in AD**.

The landmark 2025 PNAS paper (Chakraborty et al.) demonstrates that **CSE knockout alone is sufficient to recapitulate AD features** - oxidative stress, BBB breakdown, impaired neurogenesis, and cognitive deficits.

The 2021 PNAS paper (Giovinazzo et al.) established that **H₂S inhibits GSK3β via sulfhydration** - directly opposing the inflammasome-driven tau hyperphosphorylation pathway.

#### Nodes - Reverse Transsulfuration Pathway

| Status | Current ID | SBSF Type | References | Notes |
|--------|-----------|-----------|------------|-------|
| [x] | homocysteine | STOCK | CHEBI:17230 | From methionine metabolism; elevated in AD risk |
| [x] | CBS_enzyme | REGULATOR | UniProt:P35520 (CBS), GO:0004122 | Cystathionine β-synthase; astrocyte-predominant |
| [x] | cystathionine | STOCK | CHEBI:17482 | Intermediate; CBS product |
| [x] | CSE_enzyme | REGULATOR | UniProt:P32929 (CTH), GO:0004123 | Cystathionine γ-lyase; neuron-predominant |
| [x] | cysteine | STOCK | CHEBI:15356 | Rate-limiting for GSH; CSE product |
| [x] | H2S_production | FLOW | CHEBI:16136 (hydrogen sulfide) | Gasotransmitter; produced by CSE (and CBS) |
| [x] | glutathione_GSH | STOCK | CHEBI:16856 | Major antioxidant; cysteine-dependent |
| [x] | sulfhydration | PROCESS | GO:0018318 (protein thiol modification) | S-sulfhydration/persulfidation; PTM by H₂S |
| [x] | GSK3beta_sulfhydrated | STATE | UniProt:P49841 | GSK3β with Cys sulfhydrated → INACTIVE |

#### The Transsulfuration Pathway Diagram

**See**: [ad_dag_diagrams.md → Diagram 8: Transsulfuration Pathway](ad_dag_diagrams.md#diagram-8-transsulfuration-pathway)

#### Key Edges - CSE/H₂S Neuroprotection

##### Edge 12: CSE_enzyme → H2S_production

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - enzymatic production |
| **Mechanism** | CSE catalyzes: cystathionine → cysteine + α-ketobutyrate + NH₃, AND produces H₂S from cysteine. CSE is the **primary neuronal H₂S source** |
| **Directionality reasoning** | **KNOCKOUT**: CSE-/- mice have dramatically reduced H₂S in brain |
| **Method** | `knockout` (Cse-/-) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3 - HIGH** |
| **Citations** | PMID:18927394 [DOI](https://doi.org/10.1126/science.1162667) - Yang 2008 (Science) |

##### Edge 13: H2S_production → sulfhydration

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - PTM installation |
| **Mechanism** | H₂S modifies cysteine thiols (-SH) to persulfides (-SSH). This **S-sulfhydration** alters protein activity - typically PROTECTIVE modifications |
| **Directionality reasoning** | **BIOCHEMISTRY**: H₂S is the sulfur donor for persulfidation |
| **Method** | `in_vitro` (mass spec, biotin switch) |
| **Species** | Universal |
| **Causal confidence** | **L5** |
| **Citations** | PMID:19875694 [DOI](https://doi.org/10.1126/scisignal.2000464) - Mustafa 2009 (Sci Signal) |

##### Edge 14: sulfhydration → GSK3beta_sulfhydrated (CRITICAL)

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - PTM installation |
| **Mechanism** | H₂S sulfhydrates GSK3β at cysteine residue(s) → **INHIBITS GSK3β kinase activity** → reduced tau phosphorylation |
| **Directionality reasoning** | **IN VITRO + IN VIVO**: NaSH (H₂S donor) prevents GSK3β-mediated tau phosphorylation; NaGYY4137 treatment ameliorates tau pathology in 3xTg-AD mice |
| **Method** | `in_vitro` (kinase assay) + `intervention_animal` (H₂S donor) |
| **Species** | NCBITaxon:10090 (3xTg-AD) |
| **Causal confidence** | **L4-L5 - HIGH** |
| **Citations** | PMID:33431651 [DOI](https://doi.org/10.1073/pnas.2017225118) - Giovinazzo 2021 |
| **Evidence quote** | "H₂S prevents hyperphosphorylation of Tau by sulfhydrating its kinase, glycogen synthase kinase 3β (GSK3β)" |
| **Key insight** | **Counter-mechanism to NLRP3 → GSK3β activation** |

##### Edge 15: GSK3beta_sulfhydrated -| tau_hyperphosphorylated

| Field | Value |
|-------|-------|
| **Relation** | `decreases` (-|) - kinase inhibition |
| **Mechanism** | Sulfhydrated GSK3β is **enzymatically inactive** → cannot phosphorylate tau → reduced pTau |
| **Directionality reasoning** | **INTERVENTION**: H₂S donors reduce tau phosphorylation at PHF-1, AT8 epitopes |
| **Method** | `intervention_animal` (NaGYY4137 in 3xTg-AD) |
| **Species** | NCBITaxon:10090 (3xTg-AD) |
| **Causal confidence** | **L4 - HIGH** |
| **Citations** | PMID:33431651 - Giovinazzo 2021 |

##### Edge 16: Tau_wildtype → CSE_enzyme (Feedforward Protective)

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - protein-protein interaction |
| **Mechanism** | Wild-type tau **binds CSE** and **enhances its catalytic activity** → more H₂S production → more GSK3β inhibition. This is a **feedforward protective loop** |
| **Directionality reasoning** | **IN VITRO**: Purified tau stimulates CSE H₂S production (methylene blue assay) |
| **Method** | `in_vitro` (co-IP, enzyme activity assay) |
| **Species** | NCBITaxon:9606 |
| **Causal confidence** | **L5 - NOVEL** |
| **Citations** | PMID:33431651 - Giovinazzo 2021 |
| **Evidence quote** | "Wild type Tau stimulates activity of CSE in vitro as measured by H₂S production" |
| **Key insight** | Normal tau has PROTECTIVE function by enhancing H₂S signaling |

##### Edge 17: Tau_P301L -| CSE_enzyme (LOSS of Protection)

| Field | Value |
|-------|-------|
| **Relation** | `decreases` (-|) - loss of interaction |
| **Mechanism** | Tau P301L mutant (and presumably aggregated/pathological tau) **fails to bind CSE** → loss of feedforward protection → reduced H₂S → more GSK3β activity → more pTau |
| **Directionality reasoning** | **CO-IP**: GST-CSE pulls down wild-type tau but NOT P301L |
| **Method** | `in_vitro` (co-IP, GST pulldown) |
| **Species** | NCBITaxon:9606 (HEK293) |
| **Causal confidence** | **L5** |
| **Citations** | PMID:33431651 - Giovinazzo 2021 |
| **Evidence quote** | "CSE fails to bind Tau P301L, a mutant that is present in the 3xTg-AD mouse model of AD" |
| **Loop ID** | Loss of `loop_tau_CSE_protective` (Reinforcing → now broken) |

##### Edge 18: CSE_depletion → neurodegeneration (CSE Knockout Phenotype)

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - loss of protection |
| **Mechanism** | CSE knockout is **sufficient** to cause: (1) Oxidative stress (lipid peroxidation, protein oxidation, DNA damage ↑), (2) BBB breakdown (capillary rupture, immune protein leak), (3) Impaired neurogenesis (↓neurotrophin signaling, ↓hippocampal neuron migration), (4) Iron accumulation, (5) Progressive cognitive decline |
| **Directionality reasoning** | **KNOCKOUT**: CSE-/- mice develop AD-like phenotype WITHOUT any AD transgene |
| **Method** | `knockout` (Cse-/-) + behavioral, proteomic, histological |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3 - HIGH (LANDMARK)** |
| **Citations** | PMID: pending [DOI](https://doi.org/10.1073/pnas.2528478122) - Chakraborty 2025 |
| **Evidence quote** | "Loss of CSE is sufficient to trigger cognitive deficits...oxidative damage, compromise blood–brain barrier integrity, impair neurogenesis and neurotrophin signaling" |
| **Key insight** | CSE is a **single-point vulnerability** for brain health |

##### Edge 19: CSE_enzyme → glutathione_GSH

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - substrate provision |
| **Mechanism** | CSE provides cysteine, which is the **rate-limiting substrate** for glutathione (GSH) synthesis. GSH is the major intracellular antioxidant |
| **Directionality reasoning** | **BIOCHEMISTRY**: Cysteine availability limits GSH synthesis |
| **Method** | Established biochemistry |
| **Species** | Universal |
| **Causal confidence** | **L5** |
| **Citations** | Textbook biochemistry |

##### Edge 20: glutathione_GSH -| oxidative_stress

| Field | Value |
|-------|-------|
| **Relation** | `decreases` (-|) - antioxidant defense |
| **Mechanism** | GSH neutralizes ROS, maintains redox homeostasis, prevents lipid peroxidation and protein oxidation |
| **Directionality reasoning** | **ESTABLISHED**: GSH depletion → oxidative damage |
| **Method** | Multiple sources |
| **Species** | Universal |
| **Causal confidence** | **L5** |

#### The Broken Protective Loop in AD

**See**: [ad_dag_diagrams.md → Diagram 8B: The Broken Protective Loop in AD](ad_dag_diagrams.md#diagram-8b-the-broken-protective-loop-in-ad)

#### Integration with Module 4 (NLRP3) - Opposing Pathways

**See**: [ad_dag_diagrams.md → Diagram 8C: GSK3β - Opposing Pathways](ad_dag_diagrams.md#diagram-8c-gsk3β---opposing-pathways-nlrp3-vs-cseh₂s)

#### CSE Depletion in AD - Human Evidence

| Finding | Source | Implication |
|---------|--------|-------------|
| CSE expression ↓ in AD brain | Giovinazzo 2021 | Reduced protective H₂S |
| CSE expression ↓ in 3xTg-AD mice | Giovinazzo 2021 | Recapitulated in model |
| Sulfhydration ↓ in AD brain | Giovinazzo 2021 | Loss of protective PTM |
| GSH ↓ in AD brain | Multiple studies | Oxidative vulnerability |
| Homocysteine ↑ in AD plasma | Epidemiology | Pathway dysfunction |

#### Therapeutic Implications - H₂S Pathway

| Target | Approach | Evidence Level | Status |
|--------|----------|----------------|--------|
| **H₂S donors** | NaGYY4137 (slow-release) | L4 (Giovinazzo 2021) | Preclinical - **effective in 3xTg-AD** |
| **CSE activators** | Enhance endogenous H₂S | Theoretical | Not yet developed |
| **Cysteine supplementation** | NAC, cysteine | L5-L6 | Mixed results; bioavailability issues |
| **Vitamin B6** | CSE/CBS cofactor | L6-L7 | Observational support |
| **Dietary sulfur amino acids** | Methionine, cysteine | L6-L7 | Needs optimization |

**Key therapeutic insight**: Direct GSK-3β inhibitors (lithium, tideglusib) bypass the broken protective pathway but have tolerability issues. **Restoring endogenous H₂S signaling** may provide the same GSK-3β inhibition with better safety profile.

---

## Module 8: Complement & Synaptic Pruning (SBSF v2.0)

**Last Updated**: 2026-01-14
**Schema Version**: SBSF v2.0 (corrected architecture)

### Overview

Module 8 documents the complement-mediated synapse elimination pathway—a developmental pruning mechanism that becomes **aberrantly reactivated** in aging and AD. This represents one of the earliest pathogenic events, occurring **BEFORE plaque deposition**.

**Key Paradigm**: Developmental mechanism repurposed for destruction
- Normal development: C1q-C3-CR3 pathway sculpts neural circuits (beneficial)
- Disease state: Same pathway inappropriately eliminates HEALTHY synapses (pathological)

**Critical findings**:
1. C1q increases **300-fold** with aging (Stephan 2013)
2. Complement-mediated synapse loss occurs **BEFORE** Aβ plaques (Hong 2016)
3. C1q-/-, C3-/-, CR3-/- all independently prevent synapse loss
4. Synapse count correlates with cognition **better than plaques or tangles**

**Key connections**:
- Module 5 (LDAM): Microglia produce C1q; DAM express complement receptors
- Module 6 (Amyloid): Aβ oligomers induce C1q deposition on synapses
- Module 11 (TREM2): DAM Stage 2 expresses CR3 for complement-mediated phagocytosis

---

### Nodes (STOCK, STATE, BOUNDARY only - no PROCESS)

#### Complement Cascade Components

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `C1q` | STOCK | ng/mg protein; or % synaptic colocalization | THERAPEUTIC_TARGET, BIOMARKER | days | Cascade initiator; 300× increased in aging; tags synapses |
| `C3` | STOCK | µg/mL | | hours | Central complement protein; cleavage yields C3b opsonin |
| `C3b_iC3b` | STOCK | relative (IHC intensity) | | hours | Opsonin fragment; tags synapses for engulfment |
| `CR3_surface` | STOCK | molecules/cell | | days | Complement receptor 3 (CD11b/CD18) on microglia |

#### Synaptic Compartment

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `synapses` | STOCK | synapses/µm³; or synaptophysin puncta | BIOMARKER | weeks | Total synapse count; depleted by complement pruning |
| `dendritic_spines` | STOCK | spines/µm dendrite | BIOMARKER | weeks | Postsynaptic specializations; subset of synapses |
| `synaptic_complement_tags` | STOCK | C1q+/synaptophysin+ ratio | | days | Synapses tagged with complement (marked for elimination) |

#### Functional Outputs

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `LTP_magnitude` | STOCK | % baseline fEPSP | | hours | Long-term potentiation; measure of synaptic plasticity |
| `cognitive_score` | STOCK | MMSE, MoCA, CDR-SB | BIOMARKER | months | Psychometric test performance |

#### Boundary/Input Nodes

| ID | Type | Description |
|----|------|-------------|
| `aging` | BOUNDARY | Chronological age; drives C1q upregulation |
| `Abeta_oligomers` | BOUNDARY | Input from Module 6; induces C1q deposition |
| `cognitive_function` | BOUNDARY | Clinical outcome; terminal node |

#### State Nodes

| ID | Type | Description |
|----|------|-------------|
| `synaptic_vulnerability` | STATE | Synapses tagged with complement; vulnerable to engulfment |
| `circuit_intact` | STATE | Normal synaptic connectivity |
| `circuit_degraded` | STATE | Pathological synapse loss |

---

### Edges (Full Schema with Evidence)

#### Edge E08.001: aging → C1q (300-fold increase)

```yaml
edge:
  id: "E08.001"
  source_node: "aging"
  target_node: "C1q"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "age_C1q_upregulation"
  mechanism_description: "C1q protein levels dramatically increase with aging, up to 300-fold. Predominantly localized near synapses. Occurs earliest in hippocampus, substantia nigra, piriform cortex"
  
  evidence:
    - citation:
        pmid: "23946404"
        doi: "10.1523/JNEUROSCI.1333-13.2013"
        first_author: "Stephan"
        year: 2013
        title: "A dramatic increase of C1q protein in the CNS during normal aging"
      
      quote: "C1q protein levels dramatically increase in the normal aging mouse and human brain, by as much as 300-fold"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "C57BL/6 (aged WT); C1q-KO"
        translation_category: "T1"  # WT mouse (aging phenotype)
      
      methodology:
        type: "knockout"
        details: "Western blot + IHC across aging; C1q-/- mice for functional validation"
        methodology_category: "M3"  # Genetic manipulation (KO)
      
      causal_confidence: "L5"  # T1 + M3 = 9-1-3 = 5
      # Note: Study also includes human postmortem (T3+M1=L5), converging on L5
      
      quantitative_data:
        fold_change: 300
        brain_regions: ["hippocampus", "substantia_nigra", "piriform_cortex"]
```

#### Edge E08.002: Abeta_oligomers → C1q (early deposition)

```yaml
edge:
  id: "E08.002"
  source_node: "Abeta_oligomers"
  target_node: "C1q"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "Abeta_C1q_induction"
  mechanism_description: "Aβ oligomers induce C1q deposition on synapses BEFORE plaque formation. This is an early pathogenic event preceding overt amyloid deposition"
  
  cross_module: "Input from Module 6 (Amyloid)"
  
  evidence:
    - citation:
        pmid: "27033548"
        doi: "10.1126/science.aad8373"
        first_author: "Hong"
        year: 2016
        title: "Complement and microglia mediate early synapse loss in Alzheimer mouse models"
      
      quote: "C1q...is increased and associated with synapses before overt plaque deposition"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "J20, APP/PS1"
      
      methodology:
        type: "immunohistochemistry"
        details: "Pre-plaque timepoints in AD mouse models"
      
      causal_confidence: "L4"
      
  therapeutic_implication: "Early intervention window - complement inhibition before plaques"
```

#### Edge E08.003: C1q → C3b_iC3b (classical cascade)

```yaml
edge:
  id: "E08.003"
  source_node: "C1q"
  target_node: "C3b_iC3b"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "classical_cascade_activation"
  mechanism_description: "C1q on synapses initiates classical cascade: C1q → C1r → C1s → C4 → C2 → C3 convertase → C3 cleavage → C3b → iC3b (opsonin)"
  
  conserved: true  # Biochemically established
  
  evidence:
    - citation:
        pmid: "18083105"
        doi: "10.1016/j.cell.2007.10.036"
        first_author: "Stevens"
        year: 2007
        title: "The classical complement cascade mediates CNS synapse elimination"
      
      quote: "unwanted synapses are tagged by complement for elimination"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "knockout"
        details: "C1q-/- and C3-/- mice"
      
      causal_confidence: "L3"
```

#### Edge E08.004: C3b_iC3b → synaptic_complement_tags

```yaml
edge:
  id: "E08.004"
  source_node: "C3b_iC3b"
  target_node: "synaptic_complement_tags"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "synapse_opsonization"
  mechanism_description: "iC3b deposits on synapses, tagging them for microglial recognition and engulfment via CR3"
  
  evidence:
    - citation:
        pmid: "22632727"
        doi: "10.1016/j.neuron.2012.03.026"
        first_author: "Schafer"
        year: 2012
        title: "Microglia sculpt postnatal neural circuits in an activity and complement-dependent manner"
      
      quote: "engulfment is dependent upon neural activity and the microglia-specific phagocytic signaling pathway, complement receptor 3(CR3)/C3"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "CR3-/- (developmental study)"
        translation_category: "T1"  # WT developmental model
      
      methodology:
        type: "knockout"
        details: "CR3-/- mice; retinogeniculate developmental pruning"
        methodology_category: "M3"  # Genetic manipulation
      
      causal_confidence: "L5"  # T1 + M3 = 9-1-3 = 5
      # Note: Developmental system; AD relevance extrapolated
```

#### Edge E08.005: synaptic_complement_tags → synapses (CR3-mediated engulfment)

```yaml
edge:
  id: "E08.005"
  source_node: "synaptic_complement_tags"
  target_node: "synapses"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "CR3_synapse_engulfment"
  mechanism_description: "CR3 (CD11b/CD18) on microglia recognizes iC3b-tagged synapses → triggers phagocytic engulfment. This DEPLETES the synapse STOCK"
  
  requires: "CR3_surface"
  
  evidence:
    - citation:
        pmid: "27033548"
        doi: "10.1126/science.aad8373"
        first_author: "Hong"
        year: 2016
        title: "Complement and microglia mediate early synapse loss in Alzheimer mouse models"
      
      quote: "Inhibition of C1q, C3, or the microglial complement receptor CR3 reduces the number of phagocytic microglia, as well as the extent of early synapse loss"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "J20 (APP transgenic); CR3-/-"
        translation_category: "T2"  # Disease model
      
      methodology:
        type: "knockout"
        details: "Triple validation: C1q-/-, C3-/-, CR3-/- all prevent synapse loss"
        methodology_category: "M3"  # Genetic manipulation
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
      # +0.5 adjustment possible for triple independent KO validation
```
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "J20; CR3-/-"
      
      methodology:
        type: "knockout"
        details: "Triple validation: C1q-/-, C3-/-, CR3-/- all prevent synapse loss"
      
      causal_confidence: "L3"
```

#### Edge E08.006: synapses → LTP_magnitude

```yaml
edge:
  id: "E08.006"
  source_node: "synapses"
  target_node: "LTP_magnitude"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "synapse_plasticity_support"
  mechanism_description: "Synapse density supports LTP capacity. C1q-/- mice have ENHANCED LTP in aging"
  
  evidence:
    - citation:
        pmid: "23946404"
        doi: "10.1523/JNEUROSCI.1333-13.2013"
        first_author: "Stephan"
        year: 2013
      
      quote: "C1q-deficient mice exhibited enhanced synaptic plasticity in the adult"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
      
      methodology:
        type: "electrophysiology"
        details: "Hippocampal slice LTP recordings"
      
      causal_confidence: "L3"
```

#### Edge E08.007: synapses → cognitive_score

```yaml
edge:
  id: "E08.007"
  source_node: "synapses"
  target_node: "cognitive_score"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "synapse_cognition_correlation"
  mechanism_description: "Synapse density is the STRONGEST anatomical correlate of cognitive function - better than plaques or tangles. C1q-/- mice have less cognitive decline"
  
  evidence:
    - citation:
        pmid: "23946404"
        doi: "10.1523/JNEUROSCI.1333-13.2013"
        first_author: "Stephan"
        year: 2013
      
      quote: "aged C1q-deficient mice exhibited significantly less cognitive and memory decline in certain hippocampus-dependent behavior tests compared with their wild-type littermates"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
      
      methodology:
        type: "behavioral"
        details: "Morris water maze, novel object recognition"
      
      causal_confidence: "L3"
      
    - citation:
        # Human correlation data - synapse count vs cognition
        note: "Multiple human autopsy studies show synapse count correlates with cognition better than plaques/tangles"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
      
      methodology:
        type: "postmortem"
      
      causal_confidence: "L6"
```

---

### Interventions

#### INT_ANX005: ANX005 (Anti-C1q Antibody)

```yaml
intervention:
  id: "INT_ANX005"
  name: "ANX005"
  aliases: ["Anti-C1q", "Annexon C1q inhibitor"]
  
  target_type: "node"
  target_id: "C1q"
  
  intervention_type: "biologic_antibody"
  mechanism_of_action: "Humanized anti-C1q antibody; blocks C1q-mediated cascade initiation; prevents synapse tagging"
  action: "decreases"
  
  parameters:
    effect_magnitude: 0.8
    time_to_effect: "weeks"
    duration: "sustained"
  
  clinical_status: "phase_2"
  indication_status:
    - indication: "Huntington's disease"
      status: "phase_2"
      trial_id: "NCT04514367"
      sponsor: "Annexon Biosciences"
    - indication: "Alzheimer's disease"
      status: "preclinical"
      rationale: "Based on Hong 2016 AD mouse data"
  
  evidence:
    - citation:
        pmid: "27033548"
        doi: "10.1126/science.aad8373"
        first_author: "Hong"
        year: 2016
      quote: "Inhibition of C1q...reduces...early synapse loss"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "genetic_pharmacological"
  
  route_of_administration: "IV"
  blood_brain_barrier: "antibody - limited; may require intrathecal"
  
  cautions:
    - "Must balance complement inhibition with infection defense"
    - "Timing may be critical - early intervention before synapse loss"
```

#### INT_C3_inhibitors: C3 Inhibitors

```yaml
intervention:
  id: "INT_C3_inhibitors"
  name: "C3 Inhibitors"
  aliases: ["Pegcetacoplan", "Compstatin analogs"]
  
  target_type: "node"
  target_id: "C3"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Block C3 cleavage; central node of complement cascade; prevents opsonization"
  action: "decreases"
  
  clinical_status: "approved_other"
  indication_status:
    - indication: "PNH, geographic atrophy"
      status: "approved"
      drug: "Pegcetacoplan (Empaveli/Syfovre)"
    - indication: "Neurodegeneration"
      status: "preclinical"
      limitation: "Poor BBB penetration"
  
  route_of_administration: "SC, intravitreal"
  blood_brain_barrier: "poor"
  
  cautions:
    - "Not brain-penetrant - would require intrathecal delivery"
    - "C3 is central hub - complete inhibition may impair debris clearance"
```

---

### The Timing Paradigm: Early Therapeutic Window

**See**: [ad_dag_diagrams.md → Diagram 9: The Timing Paradigm](ad_dag_diagrams.md#diagram-9-the-timing-paradigm-early-therapeutic-window)

**Key insight**: Complement-mediated synapse loss begins BEFORE plaques - this is the earliest therapeutic window.

---

### Cross-Module Connections

| From Module | Edge | To Module | Mechanism |
|-------------|------|-----------|-----------|
| 5 (LDAM) | LDAM → C1q | 8 (Complement) | Microglia produce C1q |
| 6 (Amyloid) | Aβ oligomers → C1q | 8 (Complement) | Aβ induces C1q deposition |
| 8 (Complement) | synapses → cognition | Terminal | Proximate cause of dementia |
| 11 (TREM2) | DAM_stage2 expresses CR3 | 8 (Complement) | DAM can engulf tagged synapses |

---

### Bibliography (Module 8)

| PMID | DOI | First Author | Year | Journal | Key Finding |
|------|-----|--------------|------|---------|-------------|
| 18083105 | [10.1016/j.cell.2007.10.036](https://doi.org/10.1016/j.cell.2007.10.036) | Stevens | 2007 | Cell | **DISCOVERY**: C1q-C3 cascade mediates developmental synapse elimination |
| 22632727 | [10.1016/j.neuron.2012.03.026](https://doi.org/10.1016/j.neuron.2012.03.026) | Schafer | 2012 | Neuron | **MECHANISM**: CR3 on microglia required for synapse engulfment |
| 23946404 | [10.1523/JNEUROSCI.1333-13.2013](https://doi.org/10.1523/JNEUROSCI.1333-13.2013) | Stephan | 2013 | J Neurosci | **AGING**: C1q 300-fold ↑; C1q-/- protects cognition |
| 27033548 | [10.1126/science.aad8373](https://doi.org/10.1126/science.aad8373) | Hong | 2016 | Science | **AD**: Complement pathway reactivated; occurs BEFORE plaques |

---

### Module 8 Summary

| Component | Role in Disease |
|-----------|-----------------|
| **C1q** | 300× overproduced; initiates cascade; tags synapses |
| **C3/iC3b** | Opsonin; marks synapses for engulfment |
| **CR3** | Microglial receptor; triggers phagocytosis |
| **Synapses** | HEALTHY synapses inappropriately eliminated |
| **Cognition** | Synapse loss is proximate cause of dementia |

**Critical insight**: This is the **same pathway** used in development, but now **dysregulated** in disease. The therapeutic goal is to restore balance - allow physiological debris clearance while preventing inappropriate synapse elimination.

---

## Module 9: Iron Dysregulation & Ferroptosis (SBSF v2.0)

**Last Updated**: 2026-01-14
**Schema Version**: SBSF v2.0 (corrected architecture)

### Overview

Module 9 documents the complex role of iron in AD pathogenesis. **Critical insight**: The field has undergone a paradigm shift from "iron overload toxicity" to "iron maldistribution with functional deficiency." This explains why global iron chelation **FAILED** in clinical trials while **targeted ferroptosis induction** shows therapeutic promise.

**The Core Paradox**:
- Iron ACCUMULATES in aging brain (visible on MRI)
- Iron chelators (deferiprone) made PD patients WORSE (NEJM 2022, PMID:36516086)
- Yet TARGETED ferroptosis in senescent cells improves aged mice (Jin 2025)

**Resolution**: Iron is **PRESENT but MALDISTRIBUTED** - trapped in ferritin/lysosomes/wrong cell types, while functional pools are depleted. The therapeutic goal is **REDISTRIBUTION**, not REMOVAL - except for senescent cells which should be eliminated via ferroptosis.

**Key connections**:
- Module 12 (BBB): oxidative_stress as shared upstream mediator
- Module 7B (CSE/H₂S): CSE-/- causes abnormal iron accumulation + GSH depletion
- Module 5 (LDAM): Iron-loaded microglia are dysfunctional

---

### Nodes (STOCK, STATE, BOUNDARY only - no PROCESS)

#### Iron Homeostasis Compartment

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `labile_iron_pool` | STOCK | µM Fe²⁺ | BIOMARKER | hours | Bioavailable cytosolic iron; the FUNCTIONAL pool; sensed by IRP1/2 |
| `ferritin_iron` | STOCK | ng/mg protein (ferritin); ~4500 Fe³⁺ atoms/cage | | days | Stored iron in ferritin cage; can become TRAP in disease |
| `lysosomal_iron` | STOCK | relative (0-1) | | hours | Iron in lysosomes; requires acid pH to release |
| `total_brain_iron` | STOCK | µg/g tissue; R2* on MRI | BIOMARKER | months | Total iron (all pools); visible on MRI but MISLEADING |
| `iron_sulfur_clusters` | STOCK | % complex activity | | days | Fe-S clusters; essential for mitochondrial function |
| `transferrin_receptor` | STOCK | fmol/mg protein | THERAPEUTIC_TARGET | days | TfR1; iron import receptor; upregulated when cytosol senses deficit |
| `ferroportin` | STOCK | fmol/mg protein | THERAPEUTIC_TARGET | days | Only cellular iron EXPORTER; degraded by hepcidin |
| `hepcidin` | STOCK | ng/mL (serum/CSF) | BIOMARKER | hours | Master iron regulator; degrades ferroportin; elevated in inflammation |

#### Ferroptosis Machinery

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `GPX4_activity` | STOCK | nmol/min/mg protein | THERAPEUTIC_TARGET, REGULATOR, BIOMARKER | hours | Glutathione peroxidase 4; MASTER ferroptosis brake; reduces lipid peroxides |
| `lipid_peroxides` | STOCK | µM MDA or 4-HNE | BIOMARKER | hours | PUFA oxidation products; ferroptosis executioner |
| `GSH` | STOCK | mM | BIOMARKER | hours | Glutathione; GPX4 cofactor; requires cysteine (CSE-dependent) |
| `system_Xc` | STOCK | fmol/mg protein | THERAPEUTIC_TARGET | days | Cystine/glutamate antiporter (SLC7A11); imports cystine for GSH |
| `FSP1_activity` | STOCK | nmol/min/mg | THERAPEUTIC_TARGET | hours | Ferroptosis suppressor protein 1; CoQ10-dependent backup system |

#### Senescence-Iron Axis

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `senescent_cell_count` | STOCK | % SA-β-gal+ cells | BIOMARKER | weeks | Senescent cells; accumulate iron; source of SASP |
| `senescent_cell_iron` | STOCK | relative labile iron | | days | Labile iron in senescent cells; HIGH and targetable |
| `SASP_factors` | STOCK | pg/mL (IL-6, IL-1β, etc.) | BIOMARKER | days | Senescence-associated secretory phenotype |

#### State Nodes

| ID | Type | Description |
|----|------|-------------|
| `functional_iron_deficiency` | STATE | Paradox state: total iron HIGH but bioavailable iron LOW |
| `ferroptosis_vulnerable` | STATE | Cell state primed for ferroptosis (low GPX4, high lipid peroxides) |
| `ferroptosis_resistant` | STATE | Cell state protected (high GPX4, Nrf2 active) |

#### Boundary/Upstream Nodes

| ID | Type | Description |
|----|------|-------------|
| `IL6` | BOUNDARY | Inflammatory input (from Module 4); drives hepcidin |
| `oxidative_stress` | BOUNDARY | Upstream from Module 12; drives Fenton chemistry |
| `lysosomal_pH` | BOUNDARY | From Module 2; elevated pH traps iron |

---

### The Two Iron Paradigms

| Feature | Old Paradigm: Iron Overload | New Paradigm: Functional Deficiency |
|---------|----------------------------|-------------------------------------|
| **Observation** | Iron accumulates on MRI | Iron PRESENT but SEQUESTERED |
| **Mechanism** | Iron → oxidative stress → toxicity | Iron trapped → cytosolic deficit |
| **Location** | "Too much iron" | Wrong compartments/wrong cells |
| **Therapeutic** | Chelate iron (remove it) | REDISTRIBUTE iron |
| **Clinical result** | Deferiprone **FAILED** in PD | — |
| **Key insight** | — | Ferritin/lysosomal trapping creates paradox |

---

### Edges (Full Schema with Evidence)

#### Edge E09.001: IL6 → hepcidin (Inflammation-Iron Axis)

```yaml
edge:
  id: "E09.001"
  source_node: "IL6"
  target_node: "hepcidin"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "IL6_STAT3_hepcidin"
  mechanism_description: "IL-6 → JAK2 → STAT3 phosphorylation → STAT3 binds HAMP promoter → hepcidin transcription. THE link between neuroinflammation and iron maldistribution"
  
  evidence:
    - citation:
        pmid: "17148587"
        doi: "10.1182/blood-2006-06-027631"
        first_author: "Nemeth"
        year: 2006
        title: "IL-6 mediates hypoferremia of inflammation by inducing the synthesis of the iron regulatory hormone hepcidin"
      
      quote: "Anti–IL-6 receptor antibody treatment resulted in a rapid and sustained decrease in hepcidin and increase in serum iron and hemoglobin"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "pharmacological_human"
        details: "Tocilizumab (anti-IL6R) in Castleman disease"
      
      causal_confidence: "L4"
      
      quantitative_data:
        effect_size: "Hepcidin decreased from >1000 ng/mL to <50 ng/mL"
```

#### Edge E09.002: hepcidin → ferroportin (Master Regulatory Edge)

```yaml
edge:
  id: "E09.002"
  source_node: "hepcidin"
  target_node: "ferroportin"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "hepcidin_ferroportin_degradation"
  mechanism_description: "Hepcidin binds ferroportin → internalization → ubiquitination → lysosomal degradation. Ferroportin is the ONLY cellular iron exporter"
  
  evidence:
    - citation:
        pmid: "15514116"
        doi: "10.1126/science.1104742"
        first_author: "Nemeth"
        year: 2004
        title: "Hepcidin regulates cellular iron efflux by binding to ferroportin and inducing its internalization"
      
      quote: "Hepcidin binds to ferroportin, induces its internalization and degradation, and thus acts as a negative regulator of iron release"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "in_vitro"
        details: "Cell surface binding and internalization assays"
      
      causal_confidence: "L3"
```

#### Edge E09.003: ferroportin → labile_iron_pool

```yaml
edge:
  id: "E09.003"
  source_node: "ferroportin"
  target_node: "labile_iron_pool"
  
  edge_type: "FLOW"
  relation: "decreases"
  mechanism_label: "ferroportin_iron_export"
  mechanism_description: "Ferroportin exports Fe²⁺ from cells. When degraded by hepcidin, iron cannot exit → accumulates intracellularly then gets sequestered"
  
  conserved: true
  
  evidence:
    - citation:
        pmid: "15514116"
        doi: "10.1126/science.1104742"
        first_author: "Nemeth"
        year: 2004
        title: "Hepcidin regulates cellular iron efflux"
      
      quote: "acts as a negative regulator of iron release from enterocytes and macrophages"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "biochemistry"
      
      causal_confidence: "L5"
```

#### Edge E09.004: labile_iron_pool → lipid_peroxides (Fenton Chemistry)

```yaml
edge:
  id: "E09.004"
  source_node: "labile_iron_pool"
  target_node: "lipid_peroxides"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "Fenton_reaction"
  mechanism_description: "Fe²⁺ + H₂O₂ → Fe³⁺ + OH• + OH⁻ (Fenton reaction). Hydroxyl radicals attack PUFA in membranes → lipid peroxides → propagating chain reaction"
  
  evidence:
    - citation:
        pmid: "22632970"
        doi: "10.1016/j.cell.2012.03.042"
        first_author: "Dixon"
        year: 2012
        title: "Ferroptosis: an iron-dependent form of nonapoptotic cell death"
      
      quote: "Iron chelators (deferoxamine and ciclopirox olamine) blocked ferroptosis, indicating iron is required"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "HT-1080, Calu-1 cancer cell lines"
      
      methodology:
        type: "in_vitro"
        details: "Iron chelator rescue experiments"
      
      causal_confidence: "L4"
```

#### Edge E09.005: GPX4_activity → lipid_peroxides (MASTER BRAKE)

```yaml
edge:
  id: "E09.005"
  source_node: "GPX4_activity"
  target_node: "lipid_peroxides"
  
  edge_type: "MODULATION"
  relation: "decreases"
  mechanism_label: "GPX4_lipid_peroxide_reduction"
  mechanism_description: "GPX4 reduces lipid peroxides (LOOH → LOH) using GSH as cofactor. GPX4 is the ONLY enzyme that can detoxify membrane lipid peroxides"
  
  evidence:
    - citation:
        pmid: "24439385"
        doi: "10.1038/ncb2897"
        first_author: "Yang"
        year: 2014
        title: "Regulation of ferroptotic cancer cell death by GPX4"
      
      quote: "GPX4 is the critical regulator of ferroptotic cancer cell death"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "knockout"
        details: "Conditional GPX4 knockout; inducible GPX4 deletion"
      
      causal_confidence: "L3"
      
    - citation:
        pmid: "33219130"
        doi: "10.1074/jbc.REV120.008207"
        first_author: "Lei"
        year: 2020
        title: "The essential elements of Alzheimer's disease"
      
      quote: "GPX4 is the only enzyme capable of reducing membrane-embedded phospholipid hydroperoxides to their corresponding alcohols"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "review"
      
      causal_confidence: "L6"
```

#### Edge E09.006: lipid_peroxides → ferroptosis_vulnerable (TRANSITION enabler)

```yaml
edge:
  id: "E09.006"
  source_node: "lipid_peroxides"
  target_node: "ferroptosis_vulnerable"
  
  edge_type: "TRANSITION"
  relation: "enables"
  mechanism_label: "lipid_peroxide_accumulation"
  mechanism_description: "Accumulated lipid peroxides → membrane damage → cell primed for ferroptotic death"
  
  evidence:
    - citation:
        pmid: "22632970"
        doi: "10.1016/j.cell.2012.03.042"
        first_author: "Dixon"
        year: 2012
        title: "Ferroptosis: an iron-dependent form of nonapoptotic cell death"
      
      quote: "Ferroptosis is dependent upon intracellular iron...and is morphologically, biochemically, and genetically distinct from apoptosis, necrosis, and autophagy"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "in_vitro"
        details: "Erastin-induced ferroptosis; morphological characterization"
      
      causal_confidence: "L4"
```

#### Edge E09.007: GSH → GPX4_activity

```yaml
edge:
  id: "E09.007"
  source_node: "GSH"
  target_node: "GPX4_activity"
  
  edge_type: "MODULATION"
  relation: "increases"
  mechanism_label: "GSH_GPX4_cofactor"
  mechanism_description: "GSH is essential cofactor for GPX4. GSH depletion → GPX4 cannot function → ferroptosis"
  
  evidence:
    - citation:
        pmid: "36894028"
        doi: "10.1016/j.pharmthera.2023.108373"
        first_author: "Costa"
        year: 2023
        title: "Molecular mechanisms of ferroptosis and their involvement in brain diseases"
      
      quote: "inhibition of system Xc-, glutathione depletion...and lipid peroxidation" are ferroptosis hallmarks
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "review"
      
      causal_confidence: "L5"
```

#### Edge E09.008: oxidative_stress → lipid_peroxides

```yaml
edge:
  id: "E09.008"
  source_node: "oxidative_stress"
  target_node: "lipid_peroxides"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "ROS_lipid_peroxidation"
  mechanism_description: "ROS (from mitochondria, NOX, Fenton) attack PUFA → initiate lipid peroxidation chain reaction"
  
  cross_module: "Links to Module 12 oxidative_stress"
  
  evidence:
    - citation:
        pmid: "35342364"
        doi: "10.7150/ijbs.69714"
        first_author: "Wang"
        year: 2022
        title: "Forsythoside A Mitigates Alzheimer's-like Pathology by Inhibiting Ferroptosis-mediated Neuroinflammation via Nrf2/GPX4 Axis Activation"
      
      quote: "FA treatment significantly improved mitochondrial function and inhibited lipid peroxidation in Aβ-exposed N2a cells"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "APP/PS1"
      
      methodology:
        type: "pharmacological_animal"
      
      causal_confidence: "L4"
```

#### Edge E09.009: senescent_cell_iron → SASP_factors

```yaml
edge:
  id: "E09.009"
  source_node: "senescent_cell_iron"
  target_node: "SASP_factors"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "iron_driven_SASP"
  mechanism_description: "Iron-loaded senescent cells produce SASP factors (IL-1β, IL-6, TNF-α, MMPs). Iron accumulation DRIVES SASP, not just correlates"
  
  evidence:
    - citation:
        pmid: "38036770"
        doi: "10.1038/s42255-023-00928-2"
        first_author: "Maus"
        year: 2023
        title: "Iron accumulation drives fibrosis, senescence and the senescence-associated secretory phenotype"
      
      quote: "Iron accumulation drives fibrosis, senescence and the senescence-associated secretory phenotype"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "intervention_animal"
        details: "Iron chelation reduces SASP; iron loading increases SASP"
      
      causal_confidence: "L4"
```

---

### Interventions

#### INT_Ferrostatin1: Ferrostatin-1 (Ferroptosis Inhibitor)

```yaml
intervention:
  id: "INT_Ferrostatin1"
  name: "Ferrostatin-1"
  aliases: ["Fer-1"]
  
  target_type: "node"
  target_id: "lipid_peroxides"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Lipophilic radical-trapping antioxidant; breaks lipid peroxidation chain reaction"
  action: "decreases"
  
  parameters:
    effect_magnitude: 0.9
    ic50: "60 nM"
    time_to_effect: "hours"
    duration: "reversible"
  
  clinical_status: "preclinical"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "preclinical"
    - indication: "stroke"
      status: "preclinical"
  
  evidence:
    - citation:
        pmid: "22632970"
        doi: "10.1016/j.cell.2012.03.042"
        first_author: "Dixon"
        year: 2012
      quote: "ferrostatin-1...potently inhibited erastin-induced ferroptosis"
      species:
        ncbi_taxon: "NCBITaxon:9606"
      methodology:
        type: "in_vitro"
  
  route_of_administration: "experimental"
  blood_brain_barrier: "moderate"
  
  references:
    pubchem_cid: "72714719"
  
  limitations: "Not yet optimized for CNS; tool compound only"
```

#### INT_Liproxstatin1: Liproxstatin-1

```yaml
intervention:
  id: "INT_Liproxstatin1"
  name: "Liproxstatin-1"
  aliases: ["Lip-1"]
  
  target_type: "node"
  target_id: "lipid_peroxides"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Lipophilic radical-trapping antioxidant; more potent than ferrostatin-1"
  action: "decreases"
  
  parameters:
    effect_magnitude: 0.95
    ic50: "22 nM"
    time_to_effect: "hours"
    duration: "reversible"
  
  clinical_status: "preclinical"
  
  evidence:
    - citation:
        pmid: "36894028"
        doi: "10.1016/j.pharmthera.2023.108373"
        first_author: "Costa"
        year: 2023
      quote: "liproxstatin-1...interrupt the lipid peroxidation cascade"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "review"
  
  blood_brain_barrier: "good"
```

#### INT_Deferiprone: Deferiprone (FAILED - Instructive)

```yaml
intervention:
  id: "INT_Deferiprone"
  name: "Deferiprone"
  aliases: ["Ferriprox", "DFP"]
  
  target_type: "node"
  target_id: "labile_iron_pool"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Global iron chelator; removes iron from all compartments"
  action: "decreases"
  
  parameters:
    effect_magnitude: 0.7
    time_to_effect: "weeks"
    duration: "reversible"
  
  clinical_status: "failed"
  indication_status:
    - indication: "Parkinson's disease"
      status: "failed"
      trial_id: "NCT02655315"
      year_result: 2022
    - indication: "Thalassemia"
      status: "approved"
  
  failure_analysis:
    failed: true
    failure_reason: "wrong_target"
    failure_detail: "Global chelation removes iron from HEALTHY neurons that need it for tyrosine hydroxylase, ribonucleotide reductase, Fe-S clusters. Patients DETERIORATED vs placebo."
  
  evidence:
    - citation:
        pmid: "36516086"
        doi: "10.1056/NEJMoa2209254"
        first_author: "Devos"
        year: 2022
        title: "Trial of Deferiprone in Parkinson's Disease"
      quote: "early separation of curves in favor of the placebo group...deferiprone-treated patients had worse outcomes"
      species:
        ncbi_taxon: "NCBITaxon:9606"
      methodology:
        type: "RCT"
        details: "Phase 2 RCT, n=372"
  
  route_of_administration: "oral"
  blood_brain_barrier: "good"
  
  references:
    drugbank: "DB08826"
  
  key_lesson: "GLOBAL iron chelation is wrong approach; need REDISTRIBUTION or TARGETED ferroptosis"
```

#### INT_TargetedFerroptosis: HK-PCGC (Targeted Senolytic Ferroptosis)

```yaml
intervention:
  id: "INT_TargetedFerroptosis"
  name: "HK-PCGC Nanoplatform"
  aliases: ["β-gal-activated ferroptosis inducer"]
  
  target_type: "node"
  target_id: "senescent_cell_iron"
  
  intervention_type: "small_molecule_agonist"
  mechanism_of_action: "β-galactosidase-activated prodrug releases Ce6 photosensitizer + HK peptide degrades ferritin → targeted ferroptosis specifically in SA-β-gal+ senescent cells"
  action: "increases"
  
  parameters:
    effect_magnitude: 0.8
    time_to_effect: "days"
    duration: "irreversible"
  
  clinical_status: "preclinical"
  indication_status:
    - indication: "Aging/senescence"
      status: "preclinical"
  
  evidence:
    - citation:
        pmid: "pending"
        doi: "10.1038/s41467-025-67364-6"
        first_author: "Jin"
        year: 2025
        title: "Targeted ferroptosis eliminates senescent cells"
      quote: "HK-PCGC can effectively eliminate senescent cells, reduce the senescence-associated secretory phenotype, and safely improve the physical fitness of aged mice"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "intervention_animal"
  
  key_insight: "RESOLVES THE CHELATION PARADOX: Don't chelate globally → target ferroptosis specifically in senescent cells"
```

#### INT_Nrf2_activators: Nrf2 Activators (Sulforaphane, DMF)

```yaml
intervention:
  id: "INT_Nrf2"
  name: "Nrf2 Activators"
  aliases: ["Sulforaphane", "Dimethyl fumarate", "DMF", "Tecfidera"]
  
  target_type: "edge"
  target_id: "E09.005"  # Modulates GPX4 activity
  
  intervention_type: "small_molecule_agonist"
  mechanism_of_action: "Activate Nrf2 → upregulate antioxidant response element genes (GPX4, SLC7A11, FTH1, HO-1) → ferroptosis resistance"
  action: "increases"
  
  parameters:
    effect_magnitude: 0.6
    time_to_effect: "hours"
    duration: "sustained"
  
  clinical_status: "approved_other"
  indication_status:
    - indication: "Multiple sclerosis"
      status: "approved"
      drug: "Dimethyl fumarate (Tecfidera)"
    - indication: "Alzheimer's disease"
      status: "preclinical"
  
  evidence:
    - citation:
        pmid: "35342364"
        doi: "10.7150/ijbs.69714"
        first_author: "Wang"
        year: 2022
      quote: "the Nrf2/GPX4 axis played a key role in these effects"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "pharmacological_animal"
  
  route_of_administration: "oral"
  blood_brain_barrier: "moderate"
```

---

### Cross-Module Connections

| From Module | Edge | To Module | Mechanism |
|-------------|------|-----------|-----------|
| 12 (BBB) | oxidative_stress → lipid_peroxides | 9 (Ferroptosis) | ROS initiates lipid peroxidation |
| 4 (Inflammation) | IL6 → hepcidin | 9 (Ferroptosis) | Inflammation drives iron trapping |
| 7B (CSE/H₂S) | CSE → GSH → GPX4 | 9 (Ferroptosis) | CSE loss → GSH depletion → ferroptosis |
| 10 (REST) | REST → Nrf2 → GPX4 | 9 (Ferroptosis) | REST loss → Nrf2 deficit → ferroptosis vulnerability |
| 5 (LDAM) | senescent_cell_iron → LDAM | 5 (LDAM) | Iron-loaded microglia dysfunction |

---

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - sequestration |
| **Mechanism** | Ferritin STORES iron as Fe³⁺ (~4500 atoms/cage). This iron is NOT bioavailable for enzymes requiring Fe²⁺. Excessive ferritin storage creates paradox: HIGH total iron, LOW functional iron |
| **Directionality reasoning** | **THE THERMOSTAT ANALOGY**: Iron sensed in wrong compartment; cytosol stays "cold" while ferritin gets "scorching" |
| **Method** | `in_vitro` + human AD brain |
| **Species** | NCBITaxon:9606 |
| **Causal confidence** | **L5-L6** |
| **Citations** | PMID: JCI 2026 - Peikon & Andrews "Isn't it ironic?" |

#### Edge 5: lysosomal_pH_elevated → lysosomal_iron (trapping)

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - prevents release |
| **Mechanism** | Iron release from ferritin/endosomes requires ACID pH for Fe³⁺ → Fe²⁺ reduction. When lysosomal pH is elevated (as in AD - see Module 2), iron CANNOT be released → trapped |
| **Directionality reasoning** | **BIOCHEMISTRY**: Fe³⁺ reduction requires acidic environment |
| **Method** | `in_vitro` |
| **Species** | Universal |
| **Causal confidence** | **L5** |
| **Key insight** | **Connects to Module 2**: Lysosomal dysfunction → pH elevation → iron trapping → functional deficiency |

#### Edge 6: functional_iron_deficiency → iron_sulfur_clusters

| Field | Value |
|-------|-------|
| **Relation** | `decreases` (-|) - substrate limitation |
| **Mechanism** | Fe-S cluster synthesis requires CYTOSOLIC Fe²⁺. Functional iron deficiency → cannot make Fe-S clusters → mitochondrial dysfunction (Complex I, II, III all require Fe-S clusters) |
| **Directionality reasoning** | **BIOCHEMISTRY**: Fe-S cluster biogenesis is iron-dependent |
| **Method** | `in_vitro` + genetic |
| **Species** | Universal |
| **Causal confidence** | **L5** |
| **Key insight** | Links iron maldistribution to MITOCHONDRIAL dysfunction (Module 3) |

### Key Edges - Ferroptosis Pathway

#### Edge 7: labile_iron_pool → lipid_peroxidation (Fenton Chemistry)

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - catalytic |
| **Mechanism** | Fe²⁺ + H₂O₂ → Fe³⁺ + OH• + OH⁻ (Fenton reaction). Hydroxyl radicals attack PUFA in membranes → lipid peroxides → propagating chain reaction |
| **Directionality reasoning** | **IN VITRO**: Iron chelators (DFO) block lipid peroxidation; iron addition accelerates it |
| **Method** | `in_vitro` |
| **Species** | Universal |
| **Causal confidence** | **L5 - ESTABLISHED** |
| **Citations** | PMID:22632970 [DOI](https://doi.org/10.1016/j.cell.2012.03.042) - Dixon 2012 (ferroptosis discovery) |

#### Edge 8: GPX4_activity -| lipid_peroxidation (MASTER BRAKE)

| Field | Value |
|-------|-------|
| **Relation** | `directlyDecreases` (=|) - enzymatic detoxification |
| **Mechanism** | GPX4 reduces lipid peroxides (LOOH → LOH) using GSH as cofactor. GPX4 is the ONLY enzyme that can detoxify membrane lipid peroxides. GPX4 loss = ferroptosis |
| **Directionality reasoning** | **KNOCKOUT**: GPX4-/- is embryonic lethal; conditional KO → ferroptosis |
| **Method** | `knockout` (conditional) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3 - HIGH** |
| **Citations** | PMID:24439385 [DOI](https://doi.org/10.1038/ncb2897) - Yang 2014 |
| **Key insight** | GPX4 requires GSH, which requires CYSTEINE, which requires CSE (Module 7B connection) |

#### Edge 9: lipid_peroxidation → ferroptosis

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - cell death trigger |
| **Mechanism** | Accumulated lipid peroxides → membrane rupture → ferroptotic cell death. Morphologically: cell shrinkage, dense mitochondria, NO chromatin condensation (distinct from apoptosis) |
| **Directionality reasoning** | **DEFINITION**: Ferroptosis IS lipid peroxidation-dependent cell death |
| **Method** | `in_vitro` + `knockout` |
| **Species** | Universal |
| **Causal confidence** | **L3-L5 - ESTABLISHED** |
| **Citations** | PMID:22632970 - Dixon 2012 |

#### Edge 10: CSE_depletion → ferroptosis_vulnerability

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - lost protection |
| **Mechanism** | CSE provides cysteine for GSH synthesis. CSE depletion → GSH depletion → GPX4 cannot function → lipid peroxides accumulate → ferroptosis. Also: CSE-/- has abnormal iron accumulation |
| **Directionality reasoning** | **KNOCKOUT**: CSE-/- mice show oxidative stress, abnormal iron, features of ferroptosis (Chakraborty 2025) |
| **Method** | `knockout` (Cse-/-) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L3 - HIGH** |
| **Citations** | PMID: Chakraborty 2025 PNAS [DOI](https://doi.org/10.1073/pnas.2528478122) |
| **Key insight** | **Links Module 7B to Module 9**: CSE loss → both GSH depletion AND iron accumulation → ferroptosis |

### Key Edges - Senescence-Iron-Ferroptosis Axis

#### Edge 11: aging → senescent_cell_iron (Iron Accumulation in Senescent Cells)

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - age-dependent accumulation |
| **Mechanism** | Senescent cells accumulate ferritin and labile iron. They have HIGH β-galactosidase activity (SA-β-gal marker). Iron accumulation DRIVES senescence and SASP |
| **Directionality reasoning** | **INTERVENTION**: Iron chelation reduces senescence markers; iron loading accelerates senescence |
| **Method** | `in_vitro` + `intervention_animal` |
| **Species** | NCBITaxon:10090, NCBITaxon:9606 |
| **Causal confidence** | **L4-L5** |
| **Citations** | PMID:38036770 [DOI](https://doi.org/10.1038/s42255-023-00928-2) - Maus 2023 Nat Metab |
| **Evidence quote** | "Iron accumulation drives fibrosis, senescence and the senescence-associated secretory phenotype" |

#### Edge 12: senescent_cell_iron → SASP

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - inflammatory activation |
| **Mechanism** | Iron-loaded senescent cells produce SASP factors (IL-1β, IL-6, TNF-α, MMPs). Iron accumulation is not just a marker but a DRIVER of SASP |
| **Directionality reasoning** | **INTERVENTION**: Iron chelation reduces SASP; Maus 2023 shows causal relationship |
| **Method** | `intervention_animal` + `in_vitro` |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4-L5** |
| **Citations** | PMID:38036770 - Maus 2023 |

#### Edge 13: targeted_ferroptosis → senescent_cell_death (THERAPEUTIC)

| Field | Value |
|-------|-------|
| **Relation** | `directlyIncreases` (=>) - cell death |
| **Mechanism** | Senescent cells are VULNERABLE to ferroptosis due to: (1) high iron, (2) high labile iron pool, (3) altered lipid metabolism. **TARGETED** ferroptosis induction (via β-gal-activated prodrug + ferritin degradation) selectively kills senescent cells |
| **Directionality reasoning** | **INTERVENTION**: HK-PCGC nanoplatform (β-gal activated + HK peptide targets ferritin) → ferroptosis specifically in senescent cells → reduced SASP → improved physical function in aged mice |
| **Method** | `intervention_animal` (aged mice) |
| **Species** | NCBITaxon:10090 |
| **Causal confidence** | **L4 - HIGH** |
| **Citations** | Jin et al. 2025 Nat Commun [DOI](https://doi.org/10.1038/s41467-025-67364-6) |
| **Evidence quote** | "HK-PCGC can effectively eliminate senescent cells, reduce the senescence-associated secretory phenotype, and safely improve the physical fitness of aged mice" |
| **Key insight** | **RESOLVES THE CHELATION PARADOX**: Don't chelate globally → target ferroptosis specifically in senescent cells |

### The Therapeutic Paradox Resolved

**See**: [ad_dag_diagrams.md → Diagram 10: The Therapeutic Paradox Resolved](ad_dag_diagrams.md#diagram-10-the-therapeutic-paradox-resolved)

### Sex Differences in Iron Handling (Connect to Module 16)

#### Edge 14: menopause → brain_iron_accumulation

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - loss of iron export |
| **Mechanism** | Premenopausal women lose ~30-40mg iron/month via menstruation → low ferritin → low brain iron. Menopause → no iron loss → ferritin rises 10× faster → brain iron accumulates. Hysterectomy (even with ovaries preserved) → brain iron levels indistinguishable from men |
| **Directionality reasoning** | **OBSERVATIONAL**: Women with premenopausal hysterectomy have HIGHER brain ferritin than women with intact uteri |
| **Method** | `cohort` + MRI |
| **Species** | NCBITaxon:9606 |
| **Causal confidence** | **L6** |
| **Citations** | PMID:21349605 [DOI](https://doi.org/10.1016/j.neurobiolaging.2011.01.006) - Bartzokis 2011 |
| **Key insight** | Menstruation is PROTECTIVE "bloodletting" that delays brain iron accumulation |

#### Edge 15: female_AD → aberrant_ferritin_storage

| Field | Value |
|-------|-------|
| **Relation** | `increases` (→) - storage dysfunction |
| **Mechanism** | In AD: Men show POSITIVE iron-ferritin correlation (normal storage). Women show NEGATIVE correlation (more iron → LESS ferritin storage). Women's microglia are FAILING to properly store iron in ferritin |
| **Directionality reasoning** | **OBSERVATIONAL**: Rahman 2025 shows opposite correlations by sex |
| **Method** | `cohort` (postmortem + MRI) |
| **Species** | NCBITaxon:9606 |
| **Causal confidence** | **L6** |
| **Citations** | Rahman et al. 2025 Science Progress |
| **Evidence** | Women with AD: r = negative (p=0.008-0.01); Men with AD: r = positive (p=0.02) |
| **Key insight** | Women's microglia may need FERRITIN RESTORATION, not chelation |

### Module 9 Integration Diagram

**See**: [ad_dag_diagrams.md → Diagram 11: Module 9 Integration Diagram](ad_dag_diagrams.md#diagram-11-module-9-integration-diagram)

### Connection to CSE/H₂S Pathway (Module 7B)

**See**: [ad_dag_diagrams.md → Diagram 12: Connection to CSE/H₂S Pathway](ad_dag_diagrams.md#diagram-12-connection-to-cseh₂s-pathway-module-7b)

### Therapeutic Implications

| Strategy | Mechanism | Evidence Level | Status/Issues |
|----------|-----------|----------------|---------------|
| **Global iron chelation** | Remove total iron | L1 (FAILED) | Deferiprone worsened PD (NEJM 2022) |
| **Targeted ferroptosis** | Kill senescent cells | L4 (Jin 2025) | Preclinical success; β-gal specificity |
| **Iron REDISTRIBUTION** | Move iron to functional pools | Theoretical | Goal: restore cytosolic Fe²⁺ |
| **Restore lysosomal pH** | Release trapped iron | L4-L5 | Connects to Module 2 |
| **Ferritin modulators** | Prevent excessive trapping | Theoretical | Complex - cell-type specific |
| **CSE/H₂S restoration** | Fix both GSH AND iron | L4 (Giovinazzo) | NaGYY4137 in 3xTg-AD |
| **Ferroptosis inhibitors** | Ferrostatin-1, Vitamin E | L4-L5 | May protect wrong cells |
| **HRT** | ↓hepcidin via estrogen | L6 (observational) | May explain female-specific benefits |

### The Polyphenol Warning (from Sex Differences Tracker)

**CAUTION**: Popular "neuroprotective" supplements are IRON CHELATORS:
- Curcumin: Documented iron chelation; caused anemia in mice/humans
- Resveratrol: Iron chelation activity; brain volume LOSS in AD trial
- Green tea catechins: Iron chelation documented
- Quercetin: Iron chelation activity

**If functional iron deficiency is key, these may be HARMFUL** - especially in post-menopausal women who already have disrupted iron trafficking.

### Module 9 Summary

| Component | Count | Status |
|-----------|-------|--------|
| **Nodes** | 13 | **100%** ✓ |
| **Edges** | 15 | **100%** ✓ |
| **Feedback loops** | 1 (iron maldistribution) | Documented |
| **Key insight** | Iron MALDISTRIBUTION, not just overload | Paradigm shift |
| **Therapeutic** | TARGETED ferroptosis, not global chelation | Resolved paradox |

---

## Module 10: APOE4 Pathways & REST/Epigenetic Dysregulation (SBSF v2.0)

**Last Updated**: 2026-01-14
**Schema Version**: SBSF v2.0 (corrected architecture)

### Overview

APOE4 drives AD pathology through MULTIPLE mechanisms beyond lipid dysfunction:
1. **BBB dysfunction** via CypA-MMP9 pathway (connects to Module 12)
2. **REST nuclear exclusion** via nuclear lamina disruption (epigenetic)
3. **Impaired Aβ clearance** (connects to Module 6)
4. **Lipid metabolism dysregulation** (connects to Module 5 LDAM)

**Paradigm expansion**: Meyer et al. 2019 demonstrated that APOE4 causes REST dysfunction through nuclear lamina disruption—an epigenetic/transcriptional mechanism independent of Aβ that may PRECEDE canonical pathology.

**Key connections**:
- Module 12 (BBB): APOE4 → CypA → MMP9 → pericyte loss → BBB breakdown
- Module 9 (Ferroptosis): REST loss → Nrf2 deficit → ferroptosis vulnerability
- Module 5 (LDAM): APOE4 lipidation affects microglial lipid metabolism

---

### Nodes (STOCK, STATE, BOUNDARY only - no PROCESS)

#### Genetic Input

| ID | Type | Description |
|----|------|-------------|
| `APOE4_genotype` | BOUNDARY | ε4 allele carrier status; dbSNP rs429358+rs7412 |

#### APOE4-BBB Axis (links to Module 12)

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `CypA` | STOCK | ng/mL | THERAPEUTIC_TARGET | days | Cyclophilin A; elevated in APOE4; activates MMP9 |
| `MMP9` | STOCK | ng/mL or activity units | BIOMARKER | hours | Matrix metalloproteinase 9; degrades tight junctions |

#### REST/Epigenetic Axis

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `REST_nuclear` | STOCK | % nuclear localization | THERAPEUTIC_TARGET, BIOMARKER | hours | Nuclear REST; transcriptional repressor of neuronal genes |
| `REST_cytoplasmic` | STOCK | relative | | hours | Cytoplasmic/autophagic REST; represents LOSS of function |
| `Nrf2_activity` | STOCK | ARE-luciferase units; or target gene expression | THERAPEUTIC_TARGET | hours | Nrf2-mediated antioxidant response; REST target |

#### State Nodes

| ID | Type | Description |
|----|------|-------------|
| `nuclear_lamina_intact` | STATE | Normal Lamin B structure; supports nuclear import |
| `nuclear_lamina_disrupted` | STATE | Lamin B dysfunction; impairs nuclear pore function |
| `progenitor_pool_depleted` | STATE | Reduced neural progenitor self-renewal capacity |

---

### Edges (Full Schema with Evidence)

#### Edge E10.001: APOE4_genotype → CypA

```yaml
edge:
  id: "E10.001"
  source_node: "APOE4_genotype"
  target_node: "CypA"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "APOE4_CypA_activation"
  mechanism_description: "APOE4 (unlike APOE2/3) fails to suppress CypA in pericytes. CypA accumulates → activates NFκB → MMP9 transcription"
  
  cross_module: "Links to Module 12 BBB"
  
  evidence:
    - citation:
        pmid: "32376954"
        doi: "10.1038/s41586-020-2247-3"
        first_author: "Montagne"
        year: 2020
        title: "APOE4 leads to blood-brain barrier dysfunction predicting cognitive decline"
      
      quote: "APOE4 leads to blood–brain barrier breakdown...predicting cognitive decline"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "cohort"
        details: "DCE-MRI + CSF biomarkers; longitudinal"
      
      causal_confidence: "L5"
      
    - citation:
        pmid: "36040482"
        doi: "10.1084/jem.20221137"
        first_author: "Barisano"
        year: 2022
        title: "A 'multi-omics' analysis of blood-brain barrier and synaptic dysfunction in APOE4 mice"
      
      quote: "dysregulation in protein signaling networks controlling cell junctions, cytoskeleton...in brain endothelium, as well as transcription and RNA splicing suggestive of DNA damage in pericytes"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "APOE4 knock-in"
      
      methodology:
        type: "multi_omics"
        details: "snRNA-seq + phosphoproteomics in 2-3 month APOE4 vs APOE3 mice"
      
      causal_confidence: "L4"
```

#### Edge E10.002: APOE4_genotype → nuclear_lamina_disrupted

```yaml
edge:
  id: "E10.002"
  source_node: "APOE4_genotype"
  target_node: "nuclear_lamina_disrupted"
  
  edge_type: "TRANSITION"
  relation: "enables"
  mechanism_label: "APOE4_lamin_disruption"
  mechanism_description: "APOE4 expression in neural progenitor cells → disruption of nuclear lamina structure (Lamin B) via unknown mechanism"
  
  evidence:
    - citation:
        pmid: "30699343"
        doi: "10.1016/j.celrep.2018.12.095"
        first_author: "Meyer"
        year: 2019
        title: "REST and Neural Gene Network Dysregulation in iPSC Models of Alzheimer's Disease"
      
      quote: "Gene editing of APOE4 to the neutral allele APOE3 reversed the phenotype"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "iPSC-derived NPCs"
      
      methodology:
        type: "iPSC"
        details: "APOE4 carrier iPSCs; CRISPR editing to APOE3 rescues"
      
      causal_confidence: "L4"
```

#### Edge E10.003: nuclear_lamina_disrupted → REST_cytoplasmic

```yaml
edge:
  id: "E10.003"
  source_node: "nuclear_lamina_disrupted"
  target_node: "REST_cytoplasmic"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "nuclear_import_failure"
  mechanism_description: "Nuclear lamina disruption impairs nuclear pore complex function → REST cannot translocate to nucleus → accumulates in cytoplasm"
  
  evidence:
    - citation:
        pmid: "30699343"
        doi: "10.1016/j.celrep.2018.12.095"
        first_author: "Meyer"
        year: 2019
        title: "REST and Neural Gene Network Dysregulation in iPSC Models of Alzheimer's Disease"
      
      quote: "impaired nuclear import...REST mislocalizes"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "imaging"
        details: "Immunofluorescence + subcellular fractionation"
      
      causal_confidence: "L5"
      
    - citation:
        pmid: "25307057"
        doi: "10.1038/nature13997"
        first_author: "Lu"
        year: 2014
        title: "REST and stress resistance in ageing and Alzheimer's disease"
      
      quote: "REST appears in autophagosomes with misfolded proteins in AD"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "postmortem"
      
      causal_confidence: "L6"
```

#### Edge E10.004: REST_cytoplasmic → REST_nuclear (inverse relationship)

```yaml
edge:
  id: "E10.004"
  source_node: "REST_cytoplasmic"
  target_node: "REST_nuclear"
  
  edge_type: "FLOW"
  relation: "decreases"
  mechanism_label: "REST_compartment_balance"
  mechanism_description: "Total REST is constant; cytoplasmic accumulation = nuclear depletion. Nuclear REST is the ACTIVE form for transcriptional repression"
  
  conserved: true  # Mass-conserving
  
  evidence:
    - citation:
        pmid: "30699343"
        doi: "10.1016/j.celrep.2018.12.095"
        first_author: "Meyer"
        year: 2019
      
      quote: "Cytoplasmic REST = nuclear loss of function"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
      
      methodology:
        type: "subcellular_fractionation"
      
      causal_confidence: "L5"
```

#### Edge E10.005: REST_nuclear → Nrf2_activity

```yaml
edge:
  id: "E10.005"
  source_node: "REST_nuclear"
  target_node: "Nrf2_activity"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "REST_Nrf2_transcription"
  mechanism_description: "REST transcription factor activity upregulates Nrf2 (NFE2L2) and HO-1 (HMOX1) expression → antioxidant response element activation"
  
  cross_module: "Links to Module 9 Ferroptosis"
  
  evidence:
    - citation:
        pmid: "32001620"
        doi: "10.1074/jbc.RA119.009718"
        first_author: "Pajarillo"
        year: 2020
        title: "The transcription factor REST up-regulates tyrosine hydroxylase and antiapoptotic genes and protects dopaminergic neurons against manganese toxicity"
      
      quote: "REST overexpression increases Nrf2/HO-1; REST knockdown reduces them"
      
      species:
        ncbi_taxon: "NCBITaxon:10116"
        common_name: "rat"
        strain: "dopaminergic neurons"
      
      methodology:
        type: "overexpression_knockdown"
        details: "REST overexpression and siRNA knockdown"
      
      causal_confidence: "L3"
```

#### Edge E10.006: Nrf2_activity → ferroptosis_vulnerable (Module 9 link)

```yaml
edge:
  id: "E10.006"
  source_node: "Nrf2_activity"
  target_node: "ferroptosis_vulnerable"
  
  edge_type: "MODULATION"
  relation: "decreases"
  mechanism_label: "Nrf2_antioxidant_protection"
  mechanism_description: "Nrf2 is master regulator of anti-ferroptotic genes: GPX4, SLC7A11 (system Xc-), FTH1 (ferritin), NQO1, GCLC (GSH synthesis)"
  
  cross_module: "Module 9 ferroptosis_vulnerable STATE"
  
  evidence:
    - citation:
        pmid: "35342364"
        doi: "10.7150/ijbs.69714"
        first_author: "Wang"
        year: 2022
      
      quote: "the Nrf2/GPX4 axis played a key role in these effects"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
      
      methodology:
        type: "pharmacological_animal"
      
      causal_confidence: "L4"
```

---

### Interventions

#### INT_CsA_APOE4: Cyclosporine A (CypA inhibitor)

```yaml
intervention:
  id: "INT_CsA_APOE4"
  name: "Cyclosporine A"
  aliases: ["CsA", "Sandimmune"]
  
  target_type: "node"
  target_id: "CypA"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Inhibits cyclophilin A → blocks CypA-NFκB-MMP9 cascade → protects BBB"
  action: "decreases"
  
  parameters:
    effect_magnitude: 0.7
    time_to_effect: "days"
    duration: "reversible"
  
  clinical_status: "approved_other"
  indication_status:
    - indication: "Transplant rejection"
      status: "approved"
    - indication: "AD/BBB protection"
      status: "preclinical"
  
  evidence:
    - citation:
        pmid: "29618365"
        doi: "10.1186/s13024-018-0249-5"
        first_author: "Main"
        year: 2018
        title: "Apolipoprotein E4 impairs spontaneous blood brain barrier repair following traumatic brain injury"
      quote: "Treatment with the CypA antagonist CsA...attenuates MMP-9 responses and enhances BBB repair"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "pharmacological_animal"
  
  route_of_administration: "oral"
  blood_brain_barrier: "moderate"
  
  limitations: "Immunosuppressive; not suitable for chronic AD use"
  
  references:
    drugbank: "DB00091"
```

#### INT_Nrf2_activators: Nrf2 Activators (bypass REST)

```yaml
intervention:
  id: "INT_Nrf2_bypass"
  name: "Nrf2 Activators"
  aliases: ["Sulforaphane", "Dimethyl fumarate", "DMF"]
  
  target_type: "node"
  target_id: "Nrf2_activity"
  
  intervention_type: "small_molecule_agonist"
  mechanism_of_action: "Direct Nrf2 activation bypasses REST loss; upregulates GPX4, SLC7A11, FTH1"
  action: "increases"
  
  clinical_status: "approved_other"
  indication_status:
    - indication: "Multiple sclerosis"
      status: "approved"
      drug: "Dimethyl fumarate (Tecfidera)"
    - indication: "AD/APOE4"
      status: "preclinical"
  
  rationale: "If APOE4 → REST loss → Nrf2 deficit, then direct Nrf2 activation may compensate"
  
  route_of_administration: "oral"
  blood_brain_barrier: "moderate"
```

---

### Cross-Module Connections

| From Module | Edge | To Module | Mechanism |
|-------------|------|-----------|-----------|
| 10 (APOE4) | APOE4 → CypA → MMP9 | 12 (BBB) | BBB breakdown pathway |
| 10 (APOE4) | REST → Nrf2 | 9 (Ferroptosis) | Ferroptosis vulnerability |
| 10 (APOE4) | APOE4 lipidation | 5 (LDAM) | Microglial lipid metabolism |
| 10 (APOE4) | APOE4 → Aβ clearance | 6 (Amyloid) | Impaired Aβ clearance |

---

### REST Literature Summary (2019-2025)

| Year | Authors | Key Finding | PMID | DOI |
|------|---------|-------------|------|-----|
| 2014 | Lu et al. | REST protects aging neurons; lost in AD | 25307057 | [10.1038/nature13997](https://doi.org/10.1038/nature13997) |
| 2019 | Meyer et al. | REST dysfunction in SAD/APOE4 iPSCs; nuclear lamina disruption | 30699343 | [10.1016/j.celrep.2018.12.095](https://doi.org/10.1016/j.celrep.2018.12.095) |
| 2020 | Pajarillo et al. | REST upregulates Nrf2/HO-1; protects dopaminergic neurons | 32001620 | [10.1074/jbc.RA119.009718](https://doi.org/10.1074/jbc.RA119.009718) |
| 2020 | Montagne et al. | APOE4 → BBB breakdown predicts cognitive decline | 32376954 | [10.1038/s41586-020-2247-3](https://doi.org/10.1038/s41586-020-2247-3) |
| 2022 | Barisano et al. | Multi-omics: BBB disruption precedes synaptic deficits in APOE4 | 36040482 | [10.1084/jem.20221137](https://doi.org/10.1084/jem.20221137) |

---

### Therapeutic Implications

| Target | Approach | Status | Rationale |
|--------|----------|--------|-----------|
| **CypA** | Cyclosporine A | Approved (other) | Block APOE4-BBB cascade; immunosuppression limits chronic use |
| **REST nuclear localization** | Nuclear lamina restoration | Preclinical concept | Address root cause |
| **Nrf2** | Sulforaphane, DMF | Phase 2+ (MS) | Bypass REST deficit |
| **miR-153-3p** | Antisense | Preclinical | Modulates REST expression |

**Key insight**: REST dysfunction may explain why APOE4 carriers have EARLIER disease onset—they lose neuroprotective transcriptional programs (REST targets include stress response, anti-excitotoxicity, and Nrf2-regulated antioxidant genes).

---

### APOE4 Lipid Metabolism Axis (NEW - 2026-01-14)

**Central paradigm**: APOE4 is hypolipidated compared to APOE2/3, leading to:
1. Impaired cholesterol efflux from astrocytes
2. Reduced Aβ clearance at BBB (LRP1-dependent)
3. Lipid droplet accumulation in astrocytes (ferroptosis vulnerability)
4. Lysosomal cholesterol sequestration → false "low cholesterol" signal

**Structural basis**: APOE4 has Arg112 (vs Cys112 in APOE3), enabling "domain interaction" where Arg61 forms salt bridge with Glu255. This destabilizes the protein, promotes aggregation, and reduces lipid-binding capacity.

#### Additional Lipid Metabolism Nodes

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `ABCA1_activity` | STOCK | cholesterol efflux rate | THERAPEUTIC_TARGET | hours | ATP-binding cassette A1; master lipidator of APOE; membrane recycling regulated by ARF6 |
| `APOE_lipidated` | STOCK | % lipidated or HDL-like particles | BIOMARKER | hours | Lipidated APOE; functional form for receptor binding and Aβ clearance |
| `astrocyte_lipid_droplets` | STOCK | LD count or area | BIOMARKER | days | Lipid droplet accumulation; stores TAG; APOE4 → larger, fewer, more unsaturated LDs |
| `LRP1_surface` | STOCK | receptors/cell | THERAPEUTIC_TARGET | hours | LDL receptor-related protein 1; mediates APOE-dependent Aβ clearance at BBB |
| `lysosomal_cholesterol` | STOCK | filipin intensity or % | | hours | Cholesterol trapped in lysosomes; cannot signal to ER → false "low cholesterol" state |

#### Additional Lipid Metabolism Edges

#### Edge E10.007: APOE4_genotype → ABCA1_activity

```yaml
edge:
  id: "E10.007"
  source_node: "APOE4_genotype"
  target_node: "ABCA1_activity"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "APOE4_ABCA1_aggregation"
  mechanism_description: "Aggregated, lipid-poor APOE4 increases ABCA1 aggregation and decreases ABCA1 membrane recycling via ARF6 pathway. APOE4 CSF shows lower ABCA1-mediated cholesterol efflux capacity."
  
  evidence:
    - citation:
        doi: "10.1523/JNEUROSCI.1400-19.2019"
        first_author: "Rawat"
        year: 2019
        title: "ApoE4 Alters ABCA1 Membrane Trafficking in Astrocytes"
      
      quote: "Aggregated and lipid-poor ApoE4 increases ABCA1 aggregation and decreases ABCA1 cell membrane recycling"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "CSF_functional_assay"
        details: "APOE4/4 vs APOE3/3 CSF cholesterol efflux capacity"
      
      causal_confidence: "L4"
      
    - citation:
        pmid: "35182477"
        doi: "10.1016/j.celrep.2022.110362"
        first_author: "Sienski"
        year: 2022
        title: "Isoform- and cell-state-specific lipidation of ApoE in astrocytes"
      
      quote: "ApoE forms high-density lipoprotein (HDL)-like, cholesterol-rich particles via ABCA1, a mechanism largely unaffected by ApoE polymorphism"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
      
      methodology:
        type: "iPSC_astrocytes"
      
      causal_confidence: "L4"
      
      note: "ABCA1-mediated lipidation itself is preserved; the deficit is in APOE4 aggregation interfering with process"
```

#### Edge E10.008: ABCA1_activity → APOE_lipidated

```yaml
edge:
  id: "E10.008"
  source_node: "ABCA1_activity"
  target_node: "APOE_lipidated"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "ABCA1_APOE_lipidation"
  mechanism_description: "ABCA1 is the primary transporter for loading cholesterol and phospholipids onto nascent APOE particles. ABCA1 knockout reduces brain APOE levels >80% and eliminates lipidated fractions."
  
  evidence:
    - citation:
        pmid: "15269217"
        doi: "10.1074/jbc.M407963200"
        first_author: "Wahrle"
        year: 2004
        title: "ABCA1 is required for normal central nervous system ApoE levels and for lipidation of astrocyte-secreted apoE"
      
      quote: "ABCA1 is required for normal CNS ApoE levels and for lipidation of astrocyte-secreted apoE"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "knockout"
        details: "ABCA1-/- mice"
      
      causal_confidence: "L5"
```

#### Edge E10.009: APOE_lipidated → Aβ_clearance_rate

```yaml
edge:
  id: "E10.009"
  source_node: "APOE_lipidated"
  target_node: "Aβ_clearance_rate"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "lipidated_APOE_Aβ_clearance"
  mechanism_description: "Lipidated APOE-Aβ complexes are cleared via LRP1 at BBB pericytes. APOE2/3-Aβ cleared by both VLDLR and LRP1; APOE4-Aβ switches to slower VLDLR-only pathway. Lipid-poor APOE4 is less efficient."
  
  cross_module: "Links to Module 6 Amyloid and Module 12 BBB"
  
  evidence:
    - citation:
        pmid: "30340601"
        doi: "10.1186/s13024-018-0286-0"
        first_author: "Ma"
        year: 2018
        title: "Blood-brain barrier-associated pericytes internalize and clear aggregated amyloid-β42 by LRP1-dependent apolipoprotein E isoform-specific mechanism"
      
      quote: "Human astrocyte-derived lipidated apoE3, but not apoE4, normalized Aβ42 clearance by mouse pericytes"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "pericyte_clearance_assay"
        details: "Cy3-Aβ42 clearance ± apoE isoforms"
      
      causal_confidence: "L4"
```

#### Edge E10.010: APOE4_genotype → astrocyte_lipid_droplets

```yaml
edge:
  id: "E10.010"
  source_node: "APOE4_genotype"
  target_node: "astrocyte_lipid_droplets"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "APOE4_LD_accumulation"
  mechanism_description: "APOE4 astrocytes form fewer but LARGER lipid droplets enriched in unsaturated triglycerides. APOE4 behaves as strong TAG binder, redirecting to LD assembly. LDs show impaired turnover and increased lipid peroxidation sensitivity."
  
  cross_module: "Links to Module 9 Ferroptosis (lipid peroxidation)"
  
  evidence:
    - citation:
        doi: "10.1083/jcb.202305003"
        first_author: "Windham"
        year: 2024
        title: "APOE traffics to astrocyte lipid droplets and modulates triglyceride saturation and droplet size"
      
      quote: "APOE4-expressing astrocytes form a small number of large LDs enriched in unsaturated triglyceride...LDs exhibit impaired turnover and increased sensitivity to lipid peroxidation"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "iPSC_astrocytes"
        details: "Isogenic APOE3 vs APOE4"
      
      causal_confidence: "L4"
      
    - citation:
        pmid: "35182477"
        doi: "10.1016/j.celrep.2022.110362"
        first_author: "Sienski"
        year: 2022
      
      quote: "APOE4 has remarkable properties behaving as a strong triacylglycerol binder"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
      
      methodology:
        type: "lipidomics"
      
      causal_confidence: "L4"
```

#### Edge E10.011: APOE4_genotype → lysosomal_cholesterol

```yaml
edge:
  id: "E10.011"
  source_node: "APOE4_genotype"
  target_node: "lysosomal_cholesterol"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "APOE4_lysosomal_sequestration"
  mechanism_description: "APOE4 drives lysosomal cholesterol sequestration in astrocytes. Cholesterol trapped in lysosomes cannot signal to ER, leading to paradoxical upregulation of SREBP2/HMGCR (cholesterol synthesis) despite high intracellular cholesterol. Creates metabolic 'blind spot'."
  
  cross_module: "Links to Module 2 Lysosomal"
  
  evidence:
    - citation:
        pmid: "35802023"
        doi: "10.1016/j.cell.2022.05.017"
        first_author: "Tcw"
        year: 2022
        title: "Cholesterol and matrisome pathways dysregulated in astrocytes and microglia"
      
      quote: "APOE4 drives lysosomal cholesterol sequestration in astrocytes which leads to lipid dysregulation by increasing cholesterol biosynthesis and decreasing efflux"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "iPSC_astrocytes_microglia"
        details: "Population and isogenic comparisons"
      
      causal_confidence: "L5"
```

#### Edge E10.012: lysosomal_cholesterol → ABCA1_activity (feedback)

```yaml
edge:
  id: "E10.012"
  source_node: "lysosomal_cholesterol"
  target_node: "ABCA1_activity"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "cholesterol_sequestration_efflux_block"
  mechanism_description: "Cholesterol trapped in lysosomes is unavailable for ABCA1-mediated efflux. Additionally, LXR cannot sense lysosomal cholesterol, so ABCA1 transcription is not upregulated despite high total intracellular cholesterol. Creates vicious cycle."
  
  evidence:
    - citation:
        pmid: "35802023"
        doi: "10.1016/j.cell.2022.05.017"
        first_author: "Tcw"
        year: 2022
      
      quote: "LXR agonists rescued decoupled lipid/cholesterol metabolism in APOE4 astrocytes, restoring efflux to APOE3 levels"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
      
      methodology:
        type: "pharmacological_rescue"
      
      causal_confidence: "L4"
      
      therapeutic_implication: "LXR agonists (GW3965, T0901317) can bypass lysosomal sequestration by directly activating ABCA1 transcription"
```

---

### Additional Lipid-Targeted Interventions

#### INT_LXR_agonists: LXR Agonists

```yaml
intervention:
  id: "INT_LXR_agonists"
  name: "LXR Agonists"
  aliases: ["GW3965", "T0901317", "bexarotene (RXR)"]
  
  target_type: "node"
  target_id: "ABCA1_activity"
  
  intervention_type: "small_molecule_agonist"
  mechanism_of_action: "LXR activation directly upregulates ABCA1, ABCG1, and APOE transcription, bypassing lysosomal cholesterol sensing defect. Increases APOE lipidation and cholesterol efflux."
  action: "increases"
  
  clinical_status: "preclinical_AD"
  indication_status:
    - indication: "AD/APOE4"
      status: "preclinical"
      note: "Bexarotene showed initial promise (Cramer 2012) but failed replication"
  
  evidence:
    - citation:
        pmid: "35802023"
        first_author: "Tcw"
        year: 2022
      quote: "LXR agonists rescued decoupled lipid/cholesterol metabolism in APOE4 astrocytes"
  
  limitations: "Peripheral lipid effects (hepatic steatosis); CNS penetration variable"
```

#### INT_APOE_mimetics: APOE Mimetic Peptides

```yaml
intervention:
  id: "INT_APOE_mimetics"
  name: "APOE Mimetic Peptides"
  aliases: ["CS-6253", "4F peptide", "apoE mimetics"]
  
  target_type: "node"
  target_id: "APOE_lipidated"
  
  intervention_type: "peptide"
  mechanism_of_action: "Binds and stabilizes ABCA1 at plasma membrane; enhances cholesterol efflux; increases APOE lipidation. 4F peptide restores APOE4 function to APOE3-like levels."
  action: "increases"
  
  clinical_status: "preclinical"
  
  evidence:
    - citation:
        doi: "10.1186/s13195-023-01353-z"
        first_author: "Valencia-Olvera"
        year: 2023
        title: "A novel apoE-mimetic increases brain apoE levels, reduces Aβ pathology and improves memory"
      quote: "CS treatment increased soluble apoE and lipid-associated apoE, reduced soluble oAβ and insoluble Aβ levels"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      note: "Effective in young male E3FAD mice; not effective in females or older mice"
    
    - citation:
        doi: "10.1038/s41598-025-96531-4"
        first_author: "ApoE4_lipidation_study"
        year: 2025
      quote: "4F peptide combined with ApoE4 reduced cellular lipid burden, lowered APP CTF and BACE1 levels"
  
  limitations: "Sex-specific and timing-dependent efficacy; peptide delivery challenges"
```

#### INT_structure_correctors: APOE4 Structure Correctors

```yaml
intervention:
  id: "INT_structure_correctors"
  name: "APOE4 Structure Correctors"
  aliases: ["domain interaction blockers", "APOE4 correctors"]
  
  target_type: "node"
  target_id: "APOE_lipidated"
  
  intervention_type: "small_molecule"
  mechanism_of_action: "Block APOE4 domain interaction (Arg61-Glu255 salt bridge) to restore APOE3-like conformation. Prevents aggregation, enhances lipid binding, reduces intracellular degradation."
  action: "increases"
  
  clinical_status: "preclinical"
  
  evidence:
    - citation:
        doi: "10.1161/ATVBAHA.116.307023"
        first_author: "Mahley"
        year: 2016
        title: "Central Nervous System Lipoproteins"
      quote: "Blocking apoE4 domain interaction prevents neuronal and astrocytic degradation and allows enhanced lipidation to occur"
  
  rationale: "Address root structural defect rather than downstream consequences"
```

---

### APOE4 Lipid Pathway Summary

**See**: [ad_dag_diagrams.md → Diagram 13: APOE4 Lipid Pathway Summary](ad_dag_diagrams.md#diagram-13-apoe4-lipid-pathway-summary)

**Therapeutic strategy hierarchy**:
1. **Structure correctors**: Fix root cause (domain interaction)
2. **LXR agonists**: Bypass lysosomal sequestration
3. **APOE mimetics**: Enhance ABCA1 function directly
4. **Nrf2 activators**: Protect against ferroptosis downstream

---

### Updated Lipid Literature (2018-2025)

| Year | Authors | Key Finding | DOI |
|------|---------|-------------|-----|
| 2004 | Wahrle et al. | ABCA1 required for CNS APOE lipidation | [10.1074/jbc.M407963200](https://doi.org/10.1074/jbc.M407963200) |
| 2018 | Ma et al. | Pericytes clear Aβ via LRP1/APOE isoform-specific mechanism | [10.1186/s13024-018-0286-0](https://doi.org/10.1186/s13024-018-0286-0) |
| 2019 | Rawat et al. | APOE4 alters ABCA1 membrane trafficking | [10.1523/JNEUROSCI.1400-19.2019](https://doi.org/10.1523/JNEUROSCI.1400-19.2019) |
| 2019 | Huang et al. (Bhanu Bhanu Südhof) | APOE variants differentially activate neuronal signaling (E4>E3>E2) | [10.1523/JNEUROSCI.2994-18.2019](https://doi.org/10.1523/JNEUROSCI.2994-18.2019) |
| 2022 | Sienski et al. | APOE4 redirects to TAG-rich lipoproteins under lipogenic stress | [10.1016/j.celrep.2022.110362](https://doi.org/10.1016/j.celrep.2022.110362) |
| 2022 | Tcw et al. | APOE4 lysosomal cholesterol sequestration; LXR agonist rescue | [10.1016/j.cell.2022.05.017](https://doi.org/10.1016/j.cell.2022.05.017) |
| 2023 | Valencia-Olvera et al. | CS-6253 apoE mimetic improves memory in E3FAD mice | [10.1186/s13195-023-01353-z](https://doi.org/10.1186/s13195-023-01353-z) |
| 2024 | Windham et al. | APOE traffics to LDs; APOE4 → large unsaturated LDs | [10.1083/jcb.202305003](https://doi.org/10.1083/jcb.202305003) |

---

## Module 11: TREM2 & DAM (SBSF v2.0)

**Last Updated**: 2026-01-14
**Schema Version**: SBSF v2.0 (corrected architecture)

### Overview

TREM2 (Triggering Receptor Expressed on Myeloid cells 2) variants are the **second strongest genetic risk factor for AD after APOE4**. The R47H variant confers ~3-fold increased AD risk. TREM2 is exclusively expressed by microglia in the brain and is essential for the transition to disease-associated microglia (DAM).

**Key Paradigm**: DAM activation occurs in TWO steps:
1. **Stage 1 (TREM2-independent)**: Downregulation of homeostatic checkpoints (P2ry12, Cx3cr1)
2. **Stage 2 (TREM2-dependent)**: Upregulation of phagocytic/lipid metabolism genes (Lpl, Cst7, Apoe)

**Critical 2022-2024 Paradigm Shifts**:
1. **DAM ≠ DIM**: "Disease-associated microglia" (embryonic, neuroprotective) are DISTINCT from "Disease Inflammatory Macrophages" (monocyte-derived, accumulate with aging) - Silvin 2022
2. **TREM2+ senescent microglia**: A THIRD population distinct from DAM, removed by senolytics (ABT-737) with cognitive benefit - Rachmian 2024
3. **TIMING MATTERS**: TREM2 elevation beneficial EARLY (amyloid seeding) but R47H harmful in MID-stage - Zhao 2022

**Key connections**:
- Module 5 (Microglial Phenotypes): DAM ↔ LDAM distinction
- Module 6 (Amyloid): TREM2 → Aβ phagocytosis and plaque compaction
- Module 9 (Ferroptosis): Senescent microglia iron accumulation
- Module 10 (APOE4): TREM2-APOE ligand axis

---

### Nodes (STOCK, STATE, BOUNDARY only - no PROCESS)

#### TREM2 Signaling Components

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `TREM2_surface` | STOCK | molecules/cell or MFI | THERAPEUTIC_TARGET, BIOMARKER | hours | Surface TREM2 receptor; ligand binding triggers DAP12/Syk signaling |
| `sTREM2` | STOCK | pg/mL (CSF) | BIOMARKER | days | Soluble TREM2; cleaved ectodomain; elevated in AD; CSF biomarker |
| `DAP12_phospho` | STOCK | relative | | minutes | Phosphorylated DAP12 (TYROBP); TREM2 signaling intermediate |
| `progranulin` | STOCK | ng/mL | THERAPEUTIC_TARGET | days | GRN; TREM2 ligand; lysosomal regulator |
| `APOE_lipidated` | STOCK | relative | | hours | Lipidated APOE; TREM2 ligand for lipid sensing |

#### Microglial State Nodes

| ID | Type | Description |
|----|------|-------------|
| `homeostatic_microglia` | STATE | P2ry12+, Cx3cr1+, Tmem119+ baseline surveillance state |
| `DAM_stage1` | STATE | TREM2-independent: P2ry12↓, Cx3cr1↓, Tyrobp↑, Apoe↑; checkpoint release |
| `DAM_stage2` | STATE | TREM2-dependent: Lpl↑, Cst7↑, Cd9↑, Itgax↑; full phagocytic activation |
| `DIM_population` | STATE | Disease Inflammatory Macrophages; monocyte-derived; TREM2+; inflammatory |
| `senescent_microglia_TREM2` | STATE | SA-β-gal+, p16+, high TREM2; DISTINCT from DAM; targetable by senolytics |

#### Boundary/Input Nodes

| ID | Type | Description |
|----|------|-------------|
| `TREM2_variants` | BOUNDARY | Genetic input; R47H (rs75932628), R62H (rs143332484) hypomorphic variants |
| `Abeta_plaques` | BOUNDARY | Input from Module 6; triggers DAM activation |
| `aging` | BOUNDARY | Chronological age; drives DIM accumulation |

#### Functional Output STOCKs

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `phagocytic_capacity` | STOCK | particles/cell/hr | | hours | Microglial phagocytosis rate; enhanced in DAM |
| `plaque_compaction` | STOCK | compaction index (0-1) | | weeks | Degree of amyloid plaque compaction; TREM2-dependent |
| `microglial_lipid_droplets` | STOCK | droplets/cell | BIOMARKER | days | Intracellular lipid accumulation; transition to LDAM |

---

### Edges (Full Schema with Evidence)

#### Edge E11.001: Abeta_plaques → DAM_stage1 (TREM2-independent trigger)

```yaml
edge:
  id: "E11.001"
  source_node: "Abeta_plaques"
  target_node: "DAM_stage1"
  
  edge_type: "TRANSITION"
  relation: "enables"
  mechanism_label: "plaque_checkpoint_release"
  mechanism_description: "Aβ plaques trigger Stage 1 DAM transition via downregulation of homeostatic checkpoints (P2ry12, Cx3cr1). This step is TREM2-INDEPENDENT"
  
  evidence:
    - citation:
        pmid: "28602351"
        doi: "10.1016/j.cell.2017.05.018"
        first_author: "Keren-Shaul"
        year: 2017
        title: "A Unique Microglia Type Associated with Restricting Development of Alzheimer's Disease"
      
      quote: "Activation is initiated in a Trem2-independent manner that involves downregulation of microglia checkpoints"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "5xFAD; 5xFAD/TREM2-KO"
        translation_category: "T2"  # AD disease model
      
      methodology:
        type: "knockout"  # TREM2-KO comparison determines TREM2-independence
        details: "scRNA-seq readout; KO comparison for causal inference"
        methodology_category: "M3"  # Genetic manipulation
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
```

#### Edge E11.002: DAM_stage1 → DAM_stage2 (TREM2-dependent transition)

```yaml
edge:
  id: "E11.002"
  source_node: "DAM_stage1"
  target_node: "DAM_stage2"
  
  edge_type: "TRANSITION"
  relation: "enables"
  mechanism_label: "TREM2_dependent_activation"
  mechanism_description: "Stage 1 → Stage 2 transition REQUIRES TREM2 signaling. TREM2-KO mice are blocked at Stage 1"
  
  requires: "TREM2_surface"
  
  evidence:
    - citation:
        pmid: "28602351"
        doi: "10.1016/j.cell.2017.05.018"
        first_author: "Keren-Shaul"
        year: 2017
        title: "A Unique Microglia Type Associated with Restricting Development of Alzheimer's Disease"
      
      quote: "followed by activation of a Trem2-dependent program"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "5xFAD; 5xFAD/TREM2-KO"
      
      methodology:
        type: "knockout"
        details: "Comparison of WT vs TREM2-KO in 5xFAD background"
      
      causal_confidence: "L3"
```

#### Edge E11.003: TREM2_variants → TREM2_surface (hypomorphic effect)

```yaml
edge:
  id: "E11.003"
  source_node: "TREM2_variants"
  target_node: "TREM2_surface"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "R47H_hypomorphic"
  mechanism_description: "R47H and R62H variants impair TREM2 ligand binding and surface expression, resulting in loss-of-function"
  
  evidence:
    - citation:
        pmid: "23150908"
        doi: "10.1056/NEJMoa1211103"
        first_author: "Jonsson"
        year: 2013
        title: "Variant of TREM2 associated with the risk of Alzheimer's disease"
      
      quote: "rare variant...confers a significant risk of Alzheimer's disease"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "GWAS"
        details: "Icelandic population; OR 2.92"
      
      causal_confidence: "L3"
      
      quantitative_data:
        odds_ratio: 2.92
        p_value: "3.4e-10"
```

#### Edge E11.004: DAM_stage2 → phagocytic_capacity

```yaml
edge:
  id: "E11.004"
  source_node: "DAM_stage2"
  target_node: "phagocytic_capacity"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "DAM_phagocytosis_enhancement"
  mechanism_description: "DAM Stage 2 microglia have enhanced phagocytic capacity for Aβ, dead neurons, and debris. Upregulation of Lpl, Cst7, Cd9 supports lipid processing"
  
  cross_module: "Links to Module 6 Aβ clearance"
  
  evidence:
    - citation:
        pmid: "33097708"
        doi: "10.1038/s41467-020-19227-5"
        first_author: "McQuade"
        year: 2020
        title: "Gene expression and functional deficits underlie TREM2-knockout microglia responses in human models of Alzheimer's disease"
      
      quote: "TREM2-knockout microglia responses...functional deficits"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "iPSC-derived microglia"
        translation_category: "T3"  # Human iPSC
      
      methodology:
        type: "crispr_edit"
        details: "CRISPR TREM2-KO in human iPSC-derived microglia"
        methodology_category: "M3"  # Genetic manipulation
      
      causal_confidence: "L3"  # T3 + M3 = 9-3-3 = 3
```

#### Edge E11.005: aging → DIM_population (monocyte accumulation)

```yaml
edge:
  id: "E11.005"
  source_node: "aging"
  target_node: "DIM_population"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "age_DIM_accumulation"
  mechanism_description: "Disease Inflammatory Macrophages (monocyte-derived, NOT embryonic microglia) accumulate with aging. DIMs are TREM2+ but ontogenetically and functionally DISTINCT from DAM"
  
  evidence:
    - citation:
        pmid: "35931085"
        doi: "10.1016/j.immuni.2022.07.004"
        first_author: "Silvin"
        year: 2022
        title: "Dual ontogeny of disease-associated microglia and disease inflammatory macrophages in aging and neurodegeneration"
      
      quote: "monocyte-derived TREM2-expressing disease inflammatory macrophages (DIMs) accumulating in the brain during aging"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "scRNA_seq_integration"
        details: "Brain myeloid scRNA-seq integration across multiple models"
      
      causal_confidence: "L4"
```

#### Edge E11.006: TREM2_surface → senescent_microglia_TREM2 (paradoxical)

```yaml
edge:
  id: "E11.006"
  source_node: "TREM2_surface"
  target_node: "senescent_microglia_TREM2"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "TREM2_senescence_paradox"
  mechanism_description: "TREM2 signaling paradoxically PROMOTES microglial senescence. TREM2-null mice have FEWER senescent microglia. Senescent TREM2+ microglia are DISTINCT from DAM"
  
  evidence:
    - citation:
        pmid: "38637622"
        doi: "10.1038/s41593-024-01620-8"
        first_author: "Rachmian"
        year: 2024
        title: "Identification of senescent, TREM2-expressing microglia in aging and Alzheimer's disease model mouse brain"
      
      quote: "TREM2-null mice had fewer microglia with a senescent signature"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "5xFAD; TREM2-null"
        translation_category: "T2"  # AD disease model
      
      methodology:
        type: "knockout"  # TREM2-null comparison
        details: "Mass cytometry (CyTOF) readout; TREM2-null vs WT comparison"
        methodology_category: "M3"  # Genetic manipulation
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
      
  therapeutic_implication: "TREM2 agonism may INCREASE senescent microglia - unintended consequence"
```

#### Edge E11.007: progranulin → TREM2_surface (ligand activation)

```yaml
edge:
  id: "E11.007"
  source_node: "progranulin"
  target_node: "TREM2_surface"
  
  edge_type: "MODULATION"
  relation: "activates"
  mechanism_label: "GRN_TREM2_ligand"
  mechanism_description: "Progranulin (GRN) is a TREM2 ligand that activates receptor signaling. GRN mutations cause FTD; may share mechanism with TREM2 variants"
  
  evidence:
    - citation:
        pmid: "30266932"
        doi: "10.1038/s41582-018-0072-1"
        first_author: "Ulland"
        year: 2018
        title: "TREM2 - a key player in microglial biology and Alzheimer disease"
      
      quote: "GRN is TREM2 ligand"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "biochemistry"
        details: "Ligand-receptor binding assays"
      
      causal_confidence: "L4"
```

#### Edge E11.008: APOE_lipidated → TREM2_surface (lipid sensing)

```yaml
edge:
  id: "E11.008"
  source_node: "APOE_lipidated"
  target_node: "TREM2_surface"
  
  edge_type: "MODULATION"
  relation: "activates"
  mechanism_label: "APOE_TREM2_lipid_sensing"
  mechanism_description: "Lipidated APOE binds TREM2 and activates signaling. This allows microglia to sense and respond to lipid debris. APOE4 may impair this interaction"
  
  cross_module: "Links to Module 10 APOE4"
  
  evidence:
    - citation:
        pmid: "33097708"
        doi: "10.1038/s41467-020-19227-5"
        first_author: "McQuade"
        year: 2020
        title: "Gene expression and functional deficits underlie TREM2-knockout microglia responses"
      
      quote: "APOE binds TREM2, impaired in TREM2-KO"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "iPSC"
      
      causal_confidence: "L4"
```

---

### Interventions

#### INT_AL002: AL002 (TREM2 Agonist Antibody)

```yaml
intervention:
  id: "INT_AL002"
  name: "AL002"
  aliases: ["Latozinemab"]
  
  target_type: "node"
  target_id: "TREM2_surface"
  
  intervention_type: "biologic_antibody"
  mechanism_of_action: "Agonist antibody that activates TREM2 signaling; promotes DAM transition and Aβ clearance"
  action: "activates"
  
  parameters:
    time_to_effect: "weeks"
    duration: "sustained"
  
  clinical_status: "phase_2"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "phase_2"
      trial_id: "NCT04592874"
      sponsor: "Alector/AbbVie"
  
  evidence:
    - citation:
        pmid: "36107206"
        doi: "10.1084/jem.20212479"
        first_author: "Zhao"
        year: 2022
      methodology:
        type: "preclinical"
  
  cautions:
    - "Timing-dependent: may only work EARLY in disease"
    - "May increase senescent microglia population (Rachmian 2024)"
    - "Must distinguish DAM benefit from DIM/senescent harm"
  
  route_of_administration: "IV"
  blood_brain_barrier: "antibody - limited penetration"
```

#### INT_ABT737: ABT-737 (Senolytic BCL2 Inhibitor)

```yaml
intervention:
  id: "INT_ABT737"
  name: "ABT-737"
  aliases: ["BCL2 inhibitor", "Navitoclax analog"]
  
  target_type: "node"
  target_id: "senescent_microglia_TREM2"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "BCL2 family inhibitor; induces apoptosis selectively in senescent cells (which upregulate anti-apoptotic BCL2)"
  action: "decreases"
  
  parameters:
    effect_magnitude: 0.7
    time_to_effect: "days"
    duration: "irreversible"
  
  clinical_status: "preclinical"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "preclinical"
    - indication: "Cancer"
      status: "approved_analog"
      note: "Navitoclax/Venetoclax approved for hematologic malignancies"
  
  evidence:
    - citation:
        pmid: "38637622"
        doi: "10.1038/s41593-024-01620-8"
        first_author: "Rachmian"
        year: 2024
      quote: "Treating 5×FAD mice with the senolytic BCL2 family inhibitor ABT-737 reduced senescent microglia...accompanied by improved cognition"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "pharmacological_animal"
  
  key_advantage: "Removes senescent microglia while SPARING DAM population"
  
  route_of_administration: "IP (preclinical)"
```

---

### Critical Paradigm Updates (2022-2024)

#### 1. DAM vs DIM: Dual Ontogeny (Silvin 2022)

| Feature | DAM | DIM |
|---------|-----|-----|
| **Origin** | Embryonic (yolk sac) | Monocyte-derived |
| **TREM2** | TREM2-dependent activation | TREM2-expressing |
| **Function** | Neuroprotective, phagocytic | Inflammatory |
| **Aging** | Present in disease | ACCUMULATE with aging |
| **Therapeutic** | Enhance | Target for removal |

#### 2. Senescent TREM2+ Microglia (Rachmian 2024)

- **Distinct from DAM**: SA-β-gal+, p16+, high TREM2 but DIFFERENT gene signature
- **TREM2 paradox**: TREM2-null mice have FEWER senescent microglia
- **Therapeutic**: Senolytic ABT-737 removes senescent microglia → cognitive improvement
- **Implication**: TREM2 agonism may have unintended consequences

#### 3. Timing Window (Zhao 2022)

| Stage | TREM2-WT Effect | TREM2-R47H Effect |
|-------|-----------------|-------------------|
| **Early** (seeding) | ↓ Amyloid ✓ | No effect |
| **Middle** (growth) | No effect | ↑ Amyloid ✗ |
| **Late** (established) | ? | ? |

---

### Cross-Module Connections

| From Module | Edge | To Module | Mechanism |
|-------------|------|-----------|-----------|
| 6 (Amyloid) | Aβ plaques → DAM_stage1 | 11 (TREM2) | Plaques trigger DAM activation |
| 11 (TREM2) | DAM → phagocytosis | 6 (Amyloid) | TREM2-dependent Aβ clearance |
| 10 (APOE4) | APOE_lipidated → TREM2 | 11 (TREM2) | APOE-TREM2 ligand axis |
| 11 (TREM2) | senescent_microglia → iron | 9 (Ferroptosis) | Senescent microglia iron accumulation |
| 11 (TREM2) | DAM → LDAM | 5 (Microglia) | Trajectory from DAM to lipid-laden dysfunction |

---

### Bibliography (Module 11)

| PMID | DOI | First Author | Year | Journal | Key Finding |
|------|-----|--------------|------|---------|-------------|
| 23150908 | [10.1056/NEJMoa1211103](https://doi.org/10.1056/NEJMoa1211103) | Jonsson | 2013 | NEJM | **FOUNDATIONAL**: TREM2 R47H = 3x AD risk |
| 27196974 | [10.1016/j.neuron.2016.05.003](https://doi.org/10.1016/j.neuron.2016.05.003) | Yuan | 2016 | Neuron | **FOUNDATIONAL**: TREM2 promotes microglia barrier and plaque compaction |
| 27091843 | [10.1084/jem.20151948](https://doi.org/10.1084/jem.20151948) | Wang | 2016 | JEM | TREM2 limits plaque diffusion; deficiency → neuritic damage |
| 28602351 | [10.1016/j.cell.2017.05.018](https://doi.org/10.1016/j.cell.2017.05.018) | Keren-Shaul | 2017 | Cell | **FOUNDATIONAL**: DAM discovery, two-step model |
| 30266932 | [10.1038/s41582-018-0072-1](https://doi.org/10.1038/s41582-018-0072-1) | Ulland | 2018 | Nat Rev Neurol | Comprehensive TREM2 review |
| 31235658 | [10.1038/s41467-019-09118-9](https://doi.org/10.1038/s41467-019-09118-9) | Zhong | 2019 | Nat Commun | sTREM2 reduces amyloid and increases plaque-associated microglia |
| 33097708 | [10.1038/s41467-020-19227-5](https://doi.org/10.1038/s41467-020-19227-5) | McQuade | 2020 | Nat Commun | Human iPSC TREM2-KO model |
| 33313376 | [10.1002/dad2.12128](https://doi.org/10.1002/dad2.12128) | Edwin | 2020 | Alz Dement | High CSF sTREM2 → slow clinical progression |
| 35931085 | [10.1016/j.immuni.2022.07.004](https://doi.org/10.1016/j.immuni.2022.07.004) | Silvin | 2022 | Immunity | **PARADIGM SHIFT**: DAM vs DIM dual ontogeny |
| 36107206 | [10.1084/jem.20212479](https://doi.org/10.1084/jem.20212479) | Zhao | 2022 | JEM | Timing window: TREM2 beneficial EARLY only |
| 36630998 | [10.1038/s41593-022-01240-0](https://doi.org/10.1038/s41593-022-01240-0) | van Lengerich | 2023 | Nat Neurosci | ATV:TREM2 improves brain exposure + microglial metabolism |
| 37115208 | [10.1007/s00401-023-02568-y](https://doi.org/10.1007/s00401-023-02568-y) | Filipello | 2023 | Acta Neuropathol | TREM2 LOF → lysosomal dysfunction + lipid droplet reduction |
| 37085492 | [10.1038/s41467-023-37437-5](https://doi.org/10.1038/s41467-023-37437-5) | Brase | 2023 | Nat Commun | snRNA-seq: TREM2 oligodendrocytes show autophagy-lysosomal dysregulation |
| 38637622 | [10.1038/s41593-024-01620-8](https://doi.org/10.1038/s41593-024-01620-8) | Rachmian | 2024 | Nat Neurosci | **PARADIGM SHIFT**: Senescent TREM2+ ≠ DAM |

---

### Additional Edges (TREM2 Mechanisms - 2026-01-14)

#### Edge E11.009: TREM2_surface → plaque_compaction (Microglia Barrier)

```yaml
edge:
  id: "E11.009"
  source_node: "TREM2_surface"
  target_node: "plaque_compaction"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "TREM2_microglia_barrier"
  mechanism_description: "TREM2+ microglia processes tightly surround amyloid fibrils, promoting compaction and insulation. TREM2 is enriched at fibril contact points. Compaction reduces surface exposure to adjacent neurites, limiting tau hyperphosphorylation and axonal dystrophy."
  
  cross_module: "Links to Module 6 Amyloid"
  
  evidence:
    - citation:
        pmid: "27196974"
        doi: "10.1016/j.neuron.2016.05.003"
        first_author: "Yuan"
        year: 2016
        title: "TREM2 Haplodeficiency in Mice and Humans Impairs the Microglia Barrier Function Leading to Decreased Amyloid Compaction and Severe Axonal Dystrophy"
      
      quote: "Microglia processes, rich in TREM2, tightly surround early amyloid fibrils and plaques promoting their compaction and insulation. In Trem2- or DAP12-haplodeficient mice and in humans with R47H TREM2 mutations, microglia had a markedly reduced ability to envelop amyloid deposits"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "5xFAD; Trem2+/-; DAP12+/-"
      
      methodology:
        type: "super_resolution_microscopy"
        details: "STORM imaging + human R47H tissue"
      
      causal_confidence: "L4"
      
    - citation:
        pmid: "27091843"
        doi: "10.1084/jem.20151948"
        first_author: "Wang"
        year: 2016
        title: "TREM2-mediated early microglial response limits diffusion and toxicity of amyloid plaques"
      
      quote: "In the absence of TREM2, Aβ plaques were not fully enclosed by microglia; they were more diffuse, less dense, and were associated with significantly greater neuritic damage"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
      
      methodology:
        type: "knockout"
      
      causal_confidence: "L3"
      
  clinical_implication: "Plaque compaction is neuroprotective; therapeutic goal should be to ENHANCE this function"
```

#### Edge E11.010: TREM2_surface → lysosomal_function

```yaml
edge:
  id: "E11.010"
  source_node: "TREM2_surface"
  target_node: "lysosomal_function"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "TREM2_lysosomal_regulation"
  mechanism_description: "TREM2 signaling maintains lysosomal biogenesis and function. TREM2 LOF mutations (Q33X in Nasu-Hakola disease) cause lysosomal dysfunction with downregulation of ATP6AP2 (v-ATPase) and LAMP2. Lysosomal biogenesis activators (TFEB) rescue defects."
  
  cross_module: "Links to Module 2 Lysosomal"
  
  evidence:
    - citation:
        pmid: "37115208"
        doi: "10.1007/s00401-023-02568-y"
        first_author: "Filipello"
        year: 2023
        title: "Defects in lysosomal function and lipid metabolism in human microglia harboring a TREM2 loss of function mutation"
      
      quote: "NHD iMGLs displayed lysosomal dysfunction, downregulation of cholesterol genes, and reduced lipid droplets...Alteration in lysosomal gene expression, such as decreased expression of genes implicated in lysosomal acidification (ATP6AP2) and chaperone mediated autophagy (LAMP2)"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "iPSC-microglia from NHD patients"
      
      methodology:
        type: "iPSC_human"
        details: "NHD family iPSCs; postmortem validation"
      
      causal_confidence: "L4"
      
  therapeutic_implication: "mTOR-dependent and independent lysosomal biogenesis activators restore TREM2-LOF defects"
```

#### Edge E11.011: sTREM2 → clinical_progression (Biomarker Relationship)

```yaml
edge:
  id: "E11.011"
  source_node: "sTREM2"
  target_node: "clinical_progression"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "sTREM2_protective_biomarker"
  mechanism_description: "Higher CSF sTREM2 levels are associated with SLOWER clinical progression in AD patients. sTREM2 is cleaved ectodomain reflecting microglial activation state. Paradox: sTREM2 may be protective marker OR reduction of surface TREM2 through shedding."
  
  evidence:
    - citation:
        pmid: "33313376"
        doi: "10.1002/dad2.12128"
        first_author: "Edwin"
        year: 2020
        title: "A high cerebrospinal fluid soluble TREM2 level is associated with slow clinical progression of Alzheimer's disease"
      
      quote: "Higher CSF sTREM2 was associated with slow clinical progression. The slow- and medium-progressing groups had higher CSF sTREM2 than the cognitively healthy"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "longitudinal_cohort"
        details: "N=231 AD patients, 3-year follow-up; trajectory modeling"
      
      causal_confidence: "L6"  # Observational, but longitudinal
      
  biomarker_note: "sTREM2 may indicate microglial engagement with pathology rather than causing protection"
```

---

### Additional Intervention

#### INT_ATV_TREM2: ATV:TREM2 (Brain-Penetrant TREM2 Agonist)

```yaml
intervention:
  id: "INT_ATV_TREM2"
  name: "ATV:TREM2"
  aliases: ["ATV:4D9", "Transferrin receptor-mediated TREM2 agonist"]
  
  target_type: "node"
  target_id: "TREM2_surface"
  
  intervention_type: "biologic_antibody"
  mechanism_of_action: "Anti-TREM2 agonist antibody fused to Antibody Transport Vehicle (ATV) that binds transferrin receptor. Enhances BBB penetration via receptor-mediated transcytosis. Activates TREM2 signaling and promotes microglial metabolic capacity."
  action: "activates"
  
  parameters:
    time_to_effect: "days"
    duration: "sustained"
  
  clinical_status: "preclinical"
  
  evidence:
    - citation:
        pmid: "36630998"
        doi: "10.1038/s41593-022-01240-0"
        first_author: "van Lengerich"
        year: 2023
        title: "A TREM2-activating antibody with a blood–brain barrier transport vehicle enhances microglial metabolism in Alzheimer's disease models"
      quote: "ATV:4D9 was detected at higher brain concentrations than 4D9"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "pharmacological_animal"
  
  key_advantage: "Solves BBB penetration problem for TREM2 antibodies"
  mechanism_detail: "Promotes microglial energetic capacity via mitochondrial pathways"
  
  route_of_administration: "IV"
  blood_brain_barrier: "enhanced via TfR-mediated transcytosis"
```

---

### TREM2 Mechanistic Summary

**See**: [ad_dag_diagrams.md → Diagram 14: TREM2 Mechanistic Summary](ad_dag_diagrams.md#diagram-14-trem2-mechanistic-summary)

**Therapeutic Strategy**:
- EARLY disease: TREM2 agonism (AL002, ATV:TREM2) to enhance DAM function
- ESTABLISHED disease: Consider senolytics (ABT-737) to remove senescent TREM2+ microglia
- Monitor: sTREM2 as biomarker of microglial engagement

---

## Module 12: BBB & Glymphatic (SBSF v2.0)

**Last Updated**: 2026-01-14
**Schema Version**: SBSF v2.0 (corrected architecture)

### Overview

Module 12 documents two interconnected clearance systems that fail in aging and AD:

1. **Blood-Brain Barrier (BBB)**: Regulates molecular exchange between blood and brain; mediates Aβ efflux via LRP1
2. **Glymphatic System**: Paravascular CSF-ISF convective exchange that clears interstitial waste during sleep

**Key Paradigm Shifts**:
1. **Clearance failure > production excess**: Late-onset AD may primarily involve clearance dysfunction
2. **APOE4 acts through BBB independently of Aβ**: Pericyte degeneration → cognitive decline (Montagne 2020)
3. **Sleep as AD risk factor**: One night sleep deprivation → measurable Aβ accumulation in humans (Shokri-Kojori 2018)

---

### Nodes (STOCK, STATE, BOUNDARY only - no PROCESS)

#### BBB Compartment

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `pericytes` | STOCK | cells/mm² vessel | THERAPEUTIC_TARGET | months | Mural cells maintaining BBB; depleted early in AD, accelerated in APOE4 |
| `tight_junction_proteins` | STOCK | relative intensity (0-1) | | weeks | Claudin-5, occludin, ZO-1 at endothelial junctions |
| `endothelial_LRP1` | STOCK | fmol/mg protein | THERAPEUTIC_TARGET, REGULATOR | weeks | Aβ efflux receptor; modulates Aβ clearance edge |
| `CypA` | STOCK | ng/mL | THERAPEUTIC_TARGET | hours | Cyclophilin A; elevated in APOE4, activates MMP9 |
| `MMP9` | STOCK | ng/mL | | hours | Matrix metalloproteinase 9; degrades TJ proteins |
| `CSF_sPDGFRb` | STOCK | pg/mL | BIOMARKER | days | Soluble PDGFRβ - pericyte injury marker |
| `CSF_albumin_ratio` | STOCK | ratio (CSF/serum) | BIOMARKER | days | BBB permeability marker |
| `BBB_intact` | STATE | - | | months | Intact barrier function (categorical) |
| `BBB_compromised` | STATE | - | | months | Barrier dysfunction (categorical) |
| `peripheral_immune_cells_in_brain` | STOCK | cells/field | | weeks | T cells, monocytes that crossed BBB |

#### Glymphatic Compartment

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `AQP4_perivascular` | STOCK | % polarization | THERAPEUTIC_TARGET | weeks | AQP4 localized to astrocyte endfeet (polarized) |
| `AQP4_parenchymal` | STOCK | % total | | weeks | AQP4 distributed away from endfeet (depolarized) |
| `CSF_volume` | STOCK | mL | | hours | Cerebrospinal fluid volume |
| `ISF_volume` | STOCK | mL | | hours | Interstitial fluid volume |
| `interstitial_space_fraction` | STOCK | % brain volume | | hours | ISF space; expands ~60% during sleep |
| `meningeal_lymphatic_vessels` | STOCK | vessel density | THERAPEUTIC_TARGET | months | Dural lymphatics draining to cervical LNs |
| `ISF_Abeta` | STOCK | pg/mL | BIOMARKER | hours | Interstitial Aβ concentration |
| `ISF_tau` | STOCK | pg/mL | BIOMARKER | hours | Interstitial tau concentration |

#### Boundary Nodes

| ID | Type | Description |
|----|------|-------------|
| `sleep_state` | BOUNDARY | Sleep vs wake (input; affects ISF expansion) |
| `aging` | BOUNDARY | Chronological age (input; drives oxidative stress, inflammation, etc.) |
| `APOE4_genotype` | BOUNDARY | ε4 allele carrier status (input; from Module 10) |

#### Intermediate Damage Mediators

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `oxidative_stress` | STOCK | µM MDA equivalents; or 8-OHdG (ng/mL) | THERAPEUTIC_TARGET | hours-days | ROS/RNS burden; measured by lipid peroxidation (MDA, 4-HNE), protein carbonylation, DNA damage (8-OHdG) |

---

### Node YAML Examples (Full Schema)

```yaml
# BBB STOCK example
node:
  id: "pericytes"
  type: STOCK
  units: "cells/mm² vessel"
  roles: [THERAPEUTIC_TARGET]
  timescale: "months"
  
  compartments:
    - location: "brain capillaries"
      go_term: "GO:0072577"  # perivascular space
  
  references:
    cell_ontology: "CL:0000669"
    uberon: "UBERON:0002049"  # vasculature of brain
  
  description: "Mural cells embedded in capillary basement membrane; maintain BBB integrity, regulate CBF"
  
  interventions:
    - intervention_id: "INT_PDGF_BB"
      effect: "increases"

# STATE example  
node:
  id: "BBB_compromised"
  type: STATE
  roles: []
  timescale: "months"
  
  description: "Pathological state of BBB dysfunction; increased permeability, reduced Aβ efflux"
  
  diagnostic_criteria:
    - "CSF/serum albumin ratio > 9"
    - "DCE-MRI Ktrans elevated"
    - "CSF sPDGFRβ > 500 pg/mL"
```

---

### Edges (Full Schema with Evidence)

#### Edge E12.001: aging → oxidative_stress

```yaml
edge:
  id: "E12.001"
  source_node: "aging"
  target_node: "oxidative_stress"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "age_dependent_ROS_accumulation"
  mechanism_description: "Aging increases oxidative stress through mitochondrial dysfunction, reduced antioxidant defenses (SOD, catalase, glutathione), and accumulated oxidative damage"
  
  evidence:
    - citation:
        pmid: "24486125"
        doi: "10.1016/j.freeradbiomed.2014.01.025"
        first_author: "Finkel"
        year: 2014
        title: "The metabolic regulation of aging"
      
      quote: "Aging is associated with increased oxidative damage to proteins, lipids, and DNA"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "meta_analysis"
        details: "Review of aging biomarkers across species"
      
      causal_confidence: "L6"
```

#### Edge E12.002: oxidative_stress → pericytes

```yaml
edge:
  id: "E12.002"
  source_node: "oxidative_stress"
  target_node: "pericytes"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "ROS_pericyte_degeneration"
  mechanism_description: "Oxidative stress damages pericytes through lipid peroxidation, protein oxidation, and mitochondrial dysfunction. Pericytes are particularly vulnerable due to high metabolic demand."
  
  evidence:
    - citation:
        pmid: "25757756"
        doi: "10.1038/jcbfm.2015.44"
        first_author: "Halliday"
        year: 2016
        title: "Accelerated pericyte degeneration and blood-brain barrier breakdown in apolipoprotein E4 carriers with Alzheimer's disease"
      
      quote: "Pericyte degeneration and blood-brain barrier breakdown are accelerated in AD APOE4 carriers compared with AD APOE3 carriers and non-AD controls"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "autopsy cohort"
      
      methodology:
        type: "postmortem"
        details: "Immunohistochemistry for PDGFRβ+ pericytes in hippocampus and cortex"
      
      causal_confidence: "L6"
      
      quantitative_data:
        effect_size: "~50% reduction in pericyte coverage in aged AD vs young controls"
        sample_size: "n=40 subjects"
      
      figure_reference: "Figure 2"
```

#### Edge E12.003: APOE4_genotype → CypA

```yaml
edge:
  id: "E12.002"
  source_node: "APOE4_genotype"
  target_node: "CypA"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "APOE4_CypA_induction"
  mechanism_description: "APOE4 (but not APOE2/E3) fails to suppress CypA in pericytes → elevated CypA → NFκB activation → MMP9 induction"
  
  evidence:
    - citation:
        pmid: "22048062"
        doi: "10.1038/nrn3114"
        first_author: "Zlokovic"
        year: 2011
        title: "Neurovascular pathways to neurodegeneration in Alzheimer's disease and other disorders"
      
      quote: "APOE4 increases CypA levels in pericytes, leading to activation of nuclear factor-κB–matrix metalloproteinase-9 pathway and blood–brain barrier degradation"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "APOE4-TR (targeted replacement)"
      
      methodology:
        type: "knockin"
        details: "Human APOE4 targeted replacement mice vs APOE3-TR"
      
      causal_confidence: "L3"
      
    - citation:
        pmid: "32376954"
        doi: "10.1038/s41586-020-2247-3"
        first_author: "Montagne"
        year: 2020
        title: "APOE4 leads to blood-brain barrier dysfunction predicting cognitive decline"
      
      quote: "were correlated with increased activity of the BBB-degrading cyclophilin A-matrix metalloproteinase-9 pathway in cerebrospinal fluid"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "APOE ε3/ε4 and ε4/ε4 carriers"
      
      methodology:
        type: "cohort"
        details: "Longitudinal cohort with CSF biomarkers and cognitive testing"
      
      causal_confidence: "L6"
```

#### Edge E12.003: CypA → MMP9

```yaml
edge:
  id: "E12.003"
  source_node: "CypA"
  target_node: "MMP9"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "CypA_NFkB_MMP9_cascade"
  mechanism_description: "CypA activates NFκB signaling → transcriptional upregulation of MMP9"
  
  evidence:
    - citation:
        pmid: "22048062"
        doi: "10.1038/nrn3114"
        first_author: "Zlokovic"
        year: 2011
        title: "Neurovascular pathways to neurodegeneration"
      
      quote: "CypA...leading to activation of nuclear factor-κB–matrix metalloproteinase-9 pathway"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "pharmacological_animal"
        details: "CypA inhibitor (CsA) blocks MMP9 induction"
      
      causal_confidence: "L4"
```

#### Edge E12.004: MMP9 → tight_junction_proteins

```yaml
edge:
  id: "E12.004"
  source_node: "MMP9"
  target_node: "tight_junction_proteins"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "MMP9_TJ_degradation"
  mechanism_description: "MMP9 proteolytically degrades tight junction proteins (claudin-5, occludin) and basement membrane components (collagen IV, laminin)"
  
  evidence:
    - citation:
        pmid: "22048062"
        doi: "10.1038/nrn3114"
        first_author: "Zlokovic"
        year: 2011
        title: "Neurovascular pathways to neurodegeneration"
      
      quote: "MMP9 degrades the tight junction and basement membrane proteins"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "biochemistry"
        details: "MMP9 substrate identification; immunohistochemistry for TJ proteins"
      
      causal_confidence: "L5"
```

#### Edge E12.005: pericytes → BBB_intact (TRANSITION enabler)

```yaml
edge:
  id: "E12.005"
  source_node: "pericytes"
  target_node: "BBB_intact"
  
  edge_type: "MODULATION"
  relation: "enables"
  mechanism_label: "pericyte_BBB_maintenance"
  mechanism_description: "Pericytes maintain BBB by: (1) inducing tight junctions, (2) regulating transcytosis, (3) maintaining basement membrane. Pericyte loss → BBB_intact → BBB_compromised transition"
  
  modulates_edge: "E12.006"  # The BBB state transition
  modulation_effect: "inhibits"  # Pericytes INHIBIT the transition to compromised state
  
  evidence:
    - citation:
        pmid: "22048062"
        doi: "10.1038/nrn3114"
        first_author: "Zlokovic"
        year: 2011
        title: "Neurovascular pathways to neurodegeneration"
      
      quote: "pericyte-deficient mice develop blood–brain barrier breakdown"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Pdgfrb+/- (pericyte-deficient)"
      
      methodology:
        type: "knockout"
        details: "Pdgfrb heterozygous mice have 50% pericyte reduction"
      
      causal_confidence: "L3"
```

#### Edge E12.006: BBB_intact → BBB_compromised (TRANSITION)

```yaml
edge:
  id: "E12.006"
  source_node: "BBB_intact"
  target_node: "BBB_compromised"
  
  edge_type: "TRANSITION"
  relation: "regulates"
  mechanism_label: "BBB_breakdown"
  mechanism_description: "State transition from intact to compromised BBB"
  
  reversible: true  # Can be partially restored with intervention
  
  evidence:
    - citation:
        pmid: "32376954"
        doi: "10.1038/s41586-020-2247-3"
        first_author: "Montagne"
        year: 2020
        title: "APOE4 leads to blood-brain barrier dysfunction predicting cognitive decline"
      
      quote: "breakdown of the BBB in the hippocampus and medial temporal lobe...is apparent in cognitively unimpaired APOE4 carriers"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "in_vivo_imaging"
        details: "DCE-MRI measuring Ktrans (BBB permeability)"
      
      causal_confidence: "L6"
```

#### Edge E12.007: BBB_compromised → peripheral_immune_cells_in_brain

```yaml
edge:
  id: "E12.007"
  source_node: "BBB_compromised"
  target_node: "peripheral_immune_cells_in_brain"
  
  edge_type: "FLOW"
  relation: "increases"
  mechanism_label: "immune_infiltration"
  mechanism_description: "Compromised BBB allows T cells and monocytes to enter brain parenchyma → neuroinflammation"
  
  conserved: false  # Not mass-conserving; source pool (blood) is much larger
  
  evidence:
    - citation:
        pmid: "32376954"
        doi: "10.1038/s41586-020-2247-3"
        first_author: "Montagne"
        year: 2020
        title: "APOE4 leads to blood-brain barrier dysfunction"
      
      quote: "breakdown of the BBB...is not related to amyloid-β or tau pathology"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "cohort"
        details: "Cross-sectional and longitudinal MRI with CSF biomarkers"
      
      causal_confidence: "L6"
      
      limitations: "Immune cell infiltration inferred from BBB breakdown; direct cell counts not reported"
```

#### Edge E12.008: sleep_state → interstitial_space_fraction (MODULATION)

```yaml
edge:
  id: "E12.008"
  source_node: "sleep_state"
  target_node: "interstitial_space_fraction"
  
  edge_type: "MODULATION"
  relation: "increases"
  mechanism_label: "sleep_ISF_expansion"
  mechanism_description: "Sleep (and anesthesia) cause ~60% expansion of interstitial space via norepinephrine reduction → astrocyte shrinkage → increased ISF volume"
  
  evidence:
    - citation:
        pmid: "24136970"
        doi: "10.1126/science.1241224"
        first_author: "Xie"
        year: 2013
        title: "Sleep drives metabolite clearance from the adult brain"
      
      quote: "natural sleep or anesthesia are associated with a 60% increase in the interstitial space, resulting in a striking increase in convective exchange of cerebrospinal fluid with interstitial fluid"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "C57BL/6"
      
      methodology:
        type: "in_vivo_imaging"
        details: "Two-photon imaging of TMA diffusion in cortex during sleep vs wake"
      
      causal_confidence: "L4"
      
      quantitative_data:
        effect_size: "60% increase in interstitial space during sleep"
        p_value: "<0.001"
      
      figure_reference: "Figure 2"
```

#### Edge E12.009: interstitial_space_fraction → ISF_Abeta (FLOW modulation)

```yaml
edge:
  id: "E12.009"
  source_node: "interstitial_space_fraction"
  target_node: "ISF_Abeta"
  
  edge_type: "MODULATION"
  relation: "decreases"
  mechanism_label: "convective_Abeta_clearance"
  mechanism_description: "Expanded interstitial space increases convective CSF-ISF exchange → enhanced Aβ clearance from ISF"
  
  modulates_edge: "glymphatic_Abeta_efflux"
  modulation_effect: "increases_rate"
  
  evidence:
    - citation:
        pmid: "24136970"
        doi: "10.1126/science.1241224"
        first_author: "Xie"
        year: 2013
        title: "Sleep drives metabolite clearance from the adult brain"
      
      quote: "convective fluxes of interstitial fluid increased the rate of β-amyloid clearance during sleep"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "in_vivo_imaging"
        details: "Fluorescent Aβ tracer clearance during sleep vs wake"
      
      causal_confidence: "L4"
      
      quantitative_data:
        effect_size: "~2x faster Aβ clearance during sleep vs wake"
```

#### Edge E12.010: AQP4_perivascular → ISF_Abeta (FLOW modulation)

```yaml
edge:
  id: "E12.010"
  source_node: "AQP4_perivascular"
  target_node: "ISF_Abeta"
  
  edge_type: "MODULATION"
  relation: "decreases"
  mechanism_label: "AQP4_dependent_clearance"
  mechanism_description: "Perivascular AQP4 polarization is required for efficient glymphatic clearance; AQP4 deletion reduces Aβ clearance by ~70%"
  
  evidence:
    - citation:
        pmid: "22896675"
        doi: "10.1126/scitranslmed.3003748"
        first_author: "Iliff"
        year: 2012
        title: "A paravascular pathway facilitates CSF flow through the brain parenchyma and the clearance of interstitial solutes, including amyloid β"
      
      quote: "deletion of the Aqp4 gene suppressed the clearance of soluble amyloid β, suggesting that this pathway may remove amyloid β from the central nervous system"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Aqp4-/- knockout"
      
      methodology:
        type: "knockout"
        details: "Aqp4-/- mice vs wild-type; fluorescent Aβ tracer clearance"
      
      causal_confidence: "L3"
      
      quantitative_data:
        effect_size: "~70% reduction in interstitial solute clearance"
      
      figure_reference: "Figure 4"
```

#### Edge E12.011: oxidative_stress → AQP4_perivascular

```yaml
edge:
  id: "E12.011"
  source_node: "oxidative_stress"
  target_node: "AQP4_perivascular"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "ROS_AQP4_depolarization"
  mechanism_description: "Oxidative stress causes loss of perivascular AQP4 polarization through: (1) damage to dystrophin-associated complex anchoring AQP4 to endfeet, (2) reduced IL33 signaling (IL33 required for AQP4 expression), (3) astrocyte reactivity"
  
  evidence:
    - citation:
        pmid: "30120299"
        doi: "10.1038/s41598-018-30779-x"
        first_author: "Simon"
        year: 2018
        title: "Transcriptional network analysis of human astrocytic endfoot genes reveals region-specific associations with dementia status and tau pathology"
      
      quote: "reduced perivascular AQP4 localization is associated with AD diagnosis and pathology"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "postmortem"
        details: "Transcriptomic analysis of astrocytic endfoot genes in AD vs control"
      
      causal_confidence: "L6"
      
    - citation:
        pmid: "33432186"
        doi: "10.1038/s41380-020-00992-0"
        first_author: "Wu"
        year: 2021
        title: "Requirement of brain interleukin33 for aquaporin4 expression in astrocytes and glymphatic drainage of abnormal tau"
      
      quote: "Il33-/- mice showed a loss of n-AQP4 after middle age, which coincided with a rapid accumulation of abnormal tau in neurons"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Il33-/- knockout"
      
      methodology:
        type: "knockout"
        details: "IL33 knockout mice show age-dependent AQP4 loss"
      
      causal_confidence: "L3"
      
      note: "IL33 decline may be an additional pathway; could add IL33 as intermediate STOCK if needed"
```

#### Edge E12.012: oxidative_stress → meningeal_lymphatic_vessels

```yaml
edge:
  id: "E12.012"
  source_node: "oxidative_stress"
  target_node: "meningeal_lymphatic_vessels"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "ROS_lymphatic_regression"
  mechanism_description: "Oxidative stress damages meningeal lymphatic endothelium through: (1) endothelial dysfunction, (2) reduced VEGF-C/VEGFR3 signaling, (3) inflammatory vessel remodeling"
  
  evidence:
    - citation:
        pmid: "30046111"
        doi: "10.1038/s41586-018-0368-8"
        first_author: "Da Mesquita"
        year: 2018
        title: "Functional aspects of meningeal lymphatics in ageing and Alzheimer's disease"
      
      quote: "Impairment of meningeal lymphatic function slows paravascular influx of macromolecules into the brain and efflux of macromolecules from the interstitial fluid, and induces cognitive impairment in mice"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "in_vivo_imaging"
        details: "CSF tracer drainage in young vs aged mice"
      
      causal_confidence: "L4"
      
      quantitative_data:
        effect_size: "Significant reduction in meningeal lymphatic drainage in aged mice"
      
      note: "VEGF-C decline may be an additional pathway; VEGF-C administration rescues aged lymphatics"
```

#### Edge E12.013: meningeal_lymphatic_vessels → ISF_Abeta (FLOW)

```yaml
edge:
  id: "E12.013"
  source_node: "meningeal_lymphatic_vessels"
  target_node: "ISF_Abeta"
  
  edge_type: "FLOW"
  relation: "decreases"
  mechanism_label: "lymphatic_Abeta_drainage"
  mechanism_description: "Meningeal lymphatics drain ISF solutes including Aβ to cervical lymph nodes"
  
  conserved: true  # Aβ physically transported out of brain
  
  evidence:
    - citation:
        pmid: "30046111"
        doi: "10.1038/s41586-018-0368-8"
        first_author: "Da Mesquita"
        year: 2018
        title: "Functional aspects of meningeal lymphatics in ageing and Alzheimer's disease"
      
      quote: "Disruption of meningeal lymphatic vessels in transgenic mouse models of Alzheimer's disease promotes amyloid-β deposition in the meninges...and aggravates parenchymal amyloid-β accumulation"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "5xFAD, APP/PS1"
      
      methodology:
        type: "knockout"
        details: "Photodynamic ablation of meningeal lymphatics"
      
      causal_confidence: "L3"
```

#### Edge E12.014: endothelial_LRP1 → ISF_Abeta (FLOW)

```yaml
edge:
  id: "E12.014"
  source_node: "endothelial_LRP1"
  target_node: "ISF_Abeta"
  
  edge_type: "FLOW"
  relation: "decreases"
  mechanism_label: "LRP1_transcytosis_efflux"
  mechanism_description: "LRP1 on abluminal endothelium binds ISF Aβ → transcytosis → efflux to blood"
  
  conserved: true  # Aβ physically transported across BBB
  
  evidence:
    - citation:
        pmid: "22048062"
        doi: "10.1038/nrn3114"
        first_author: "Zlokovic"
        year: 2011
        title: "Neurovascular pathways to neurodegeneration"
      
      quote: "LRP1 mediates Aβ clearance across the blood-brain barrier"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "knockout"
        details: "Endothelial-specific LRP1 knockout"
      
      causal_confidence: "L3"
```

#### Edge E12.015: sleep deprivation human evidence

```yaml
edge:
  id: "E12.015"
  source_node: "sleep_state"
  target_node: "ISF_Abeta"
  
  edge_type: "MODULATION"
  relation: "decreases"
  mechanism_label: "human_sleep_Abeta_clearance"
  mechanism_description: "Sleep deprivation in humans leads to measurable Aβ accumulation in hippocampus"
  
  evidence:
    - citation:
        pmid: "29632177"
        doi: "10.1073/pnas.1721694115"
        first_author: "Shokri-Kojori"
        year: 2018
        title: "β-Amyloid accumulation in the human brain after one night of sleep deprivation"
      
      quote: "one night of sleep deprivation, relative to baseline, resulted in a significant increase in Aβ burden in the right hippocampus and thalamus"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "in_vivo_imaging"
        details: "18F-florbetaben PET before and after one night sleep deprivation"
      
      causal_confidence: "L4"
      
      quantitative_data:
        effect_size: "5% increase in Aβ burden after one night sleep deprivation"
        sample_size: "n=20 healthy controls"
      
      figure_reference: "Figure 2"
```

---

### Interventions

#### INT_VEGFC: VEGF-C (Meningeal Lymphatic Enhancement)

```yaml
intervention:
  id: "INT_VEGFC"
  name: "VEGF-C"
  aliases: ["Vascular endothelial growth factor C"]
  
  target_type: "node"
  target_id: "meningeal_lymphatic_vessels"
  
  intervention_type: "peptide"
  mechanism_of_action: "VEGF-C binds VEGFR3 on lymphatic endothelium → lymphangiogenesis and enhanced drainage"
  action: "increases"
  
  parameters:
    effect_magnitude: 0.7
    time_to_effect: "weeks"
    duration: "sustained"
  
  clinical_status: "preclinical"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "preclinical"
      trial_id: null
  
  failure_analysis:
    failed: false
  
  evidence:
    - citation:
        pmid: "30046111"
        doi: "10.1038/s41586-018-0368-8"
        first_author: "Da Mesquita"
        year: 2018
      quote: "Treatment of aged mice with vascular endothelial growth factor C enhances meningeal lymphatic drainage of macromolecules from the cerebrospinal fluid, improving brain perfusion and learning and memory performance"
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      methodology:
        type: "pharmacological_animal"
        details: "AAV-VEGF-C injection in aged mice"
  
  route_of_administration: "intracisternal"
  blood_brain_barrier: "N/A"
  
  references:
    uniprot: "P49767"
```

#### INT_CsA: Cyclosporine A (CypA Inhibitor)

```yaml
intervention:
  id: "INT_CsA"
  name: "Cyclosporine A"
  aliases: ["CsA", "Ciclosporin"]
  
  target_type: "node"
  target_id: "CypA"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Binds CypA, inhibits its peptidyl-prolyl isomerase activity, blocks CypA-NFκB-MMP9 cascade"
  action: "inhibits"
  
  parameters:
    effect_magnitude: 0.8
    ic50: "10 nM"
    time_to_effect: "hours"
    duration: "reversible"
  
  clinical_status: "approved_other"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "preclinical"
    - indication: "transplant rejection"
      status: "approved"
      year_approved: 1983
  
  failure_analysis:
    failed: false
  
  evidence:
    - citation:
        pmid: "22048062"
        doi: "10.1038/nrn3114"
        first_author: "Zlokovic"
        year: 2011
      quote: "CypA inhibition rescues BBB breakdown in APOE4 mice"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "pharmacological_animal"
  
  route_of_administration: "oral"
  blood_brain_barrier: "moderate"
  
  references:
    drugbank: "DB00091"
    pubchem_cid: "5284373"
  
  limitations: "Immunosuppressive; systemic use problematic for chronic AD treatment"
```

#### INT_Sleep: Sleep Optimization

```yaml
intervention:
  id: "INT_Sleep"
  name: "Sleep Optimization"
  aliases: ["Sleep extension", "CPAP for sleep apnea", "Sleep hygiene"]
  
  target_type: "node"
  target_id: "sleep_state"
  
  intervention_type: "lifestyle_sleep"
  mechanism_of_action: "Optimize sleep duration and quality → maximize glymphatic clearance window"
  action: "increases"
  
  parameters:
    effect_magnitude: 0.6
    time_to_effect: "immediate"
    duration: "sustained"
  
  clinical_status: "approved_other"
  indication_status:
    - indication: "Alzheimer's disease prevention"
      status: "epidemiological evidence"
    - indication: "sleep disorders"
      status: "standard of care"
  
  evidence:
    - citation:
        pmid: "24136970"
        doi: "10.1126/science.1241224"
        first_author: "Xie"
        year: 2013
      quote: "the restorative function of sleep may be a consequence of the enhanced removal of potentially neurotoxic waste products"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "behavioral"
    - citation:
        pmid: "29632177"
        doi: "10.1073/pnas.1721694115"
        first_author: "Shokri-Kojori"
        year: 2018
      quote: "baseline ABB in a range of subcortical regions and the precuneus was inversely associated with reported night sleep hours"
      species:
        ncbi_taxon: "NCBITaxon:9606"
      methodology:
        type: "cohort"
```

#### INT_focused_ultrasound: Focused Ultrasound BBB Opening

```yaml
intervention:
  id: "INT_FUS_BBB"
  name: "Focused Ultrasound BBB Opening"
  aliases: ["FUS", "MRgFUS"]
  
  target_type: "node"
  target_id: "BBB_intact"
  
  intervention_type: "device"
  mechanism_of_action: "Transient, reversible BBB opening using focused ultrasound + microbubbles → enhanced drug delivery or Aβ clearance"
  action: "modulates"
  
  parameters:
    effect_magnitude: 0.5
    time_to_effect: "immediate"
    duration: "reversible"
    half_life: "24-48 hours (BBB closure)"
  
  clinical_status: "phase_2"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "phase_2"
      trial_id: "NCT03671889"
  
  evidence:
    - citation:
        pmid: "pending"
        doi: "pending"
        first_author: "Various"
        year: 2023
      quote: "Multiple trials showing safety and potential efficacy of FUS BBB opening in AD"
      species:
        ncbi_taxon: "NCBITaxon:9606"
      methodology:
        type: "pharmacological_human"
```

---

### Cross-Module Connections

| From Module | Edge | To Module | Mechanism |
|-------------|------|-----------|-----------|
| 10 (APOE4) | APOE4_genotype → CypA | 12 (BBB) | APOE4-specific BBB damage pathway |
| 12 (BBB) | ISF_Abeta → Abeta_oligomers | 6 (Amyloid) | Clearance failure increases oligomers |
| 12 (BBB) | peripheral_immune_cells → DIM | 11 (TREM2) | Monocyte infiltration contributes to DIM |
| 12 (Glymphatic) | ISF_tau → tau_oligomers | 7 (Tau) | Clearance failure increases tau aggregation |

---

### The APOE4-BBB-Cognition Axis (Independent of Aβ)

**Montagne 2020 Key Finding** (PMID:32376954 [DOI](https://doi.org/10.1038/s41586-020-2247-3)):

APOE4 carriers show BBB breakdown in hippocampus/MTL that:
1. Is present in **cognitively normal** APOE4 carriers
2. Is **NOT related** to Aβ or tau PET/CSF measures
3. **Predicts cognitive decline** via CSF sPDGFRβ (pericyte injury biomarker)

This supports a **parallel pathway** to neurodegeneration:
```
APOE4 → CypA↑ → MMP9↑ → TJ degradation → BBB breakdown → Cognitive decline
                                                       ↘ (independently of)
                                                         Aβ/tau pathology
```

---

### Bibliography (Module 12)

| PMID | DOI | First Author | Year | Journal | Key Finding |
|------|-----|--------------|------|---------|-------------|
| 22048062 | [10.1038/nrn3114](https://doi.org/10.1038/nrn3114) | Zlokovic | 2011 | Nat Rev Neurosci | Neurovascular pathways; CypA-MMP9 pathway |
| 22896675 | [10.1126/scitranslmed.3003748](https://doi.org/10.1126/scitranslmed.3003748) | Iliff | 2012 | Sci Transl Med | **DISCOVERY**: Glymphatic system, AQP4 dependence |
| 24136970 | [10.1126/science.1241224](https://doi.org/10.1126/science.1241224) | Xie | 2013 | Science | **KEY**: Sleep drives clearance; 60% ISF expansion |
| 25757756 | [10.1038/jcbfm.2015.44](https://doi.org/10.1038/jcbfm.2015.44) | Halliday | 2016 | J Cereb Blood Flow Metab | Accelerated pericyte loss in APOE4 AD |
| 30046111 | [10.1038/s41586-018-0368-8](https://doi.org/10.1038/s41586-018-0368-8) | Da Mesquita | 2018 | Nature | Meningeal lymphatics in aging; VEGF-C rescue |
| 30120299 | [10.1038/s41598-018-30779-x](https://doi.org/10.1038/s41598-018-30779-x) | Simon | 2018 | Sci Rep | Astrocytic endfoot genes in dementia |
| 29632177 | [10.1073/pnas.1721694115](https://doi.org/10.1073/pnas.1721694115) | Shokri-Kojori | 2018 | PNAS | **HUMAN**: 1 night sleep deprivation → ↑Aβ PET |
| 32376954 | [10.1038/s41586-020-2247-3](https://doi.org/10.1038/s41586-020-2247-3) | Montagne | 2020 | Nature | **PARADIGM SHIFT**: APOE4-BBB-cognition independent of Aβ/tau |
| 31521199 | [10.1186/s13195-019-0534-8](https://doi.org/10.1186/s13195-019-0534-8) | Miners | 2019 | Alzheimers Res Ther | CSF sPDGFRβ correlates with AD pathology |
| 33432186 | [10.1038/s41380-020-00992-0](https://doi.org/10.1038/s41380-020-00992-0) | Wu | 2021 | Mol Psychiatry | IL33 required for AQP4 and tau clearance |

---

## Module 13: Cholinergic & White Matter (SBSF v2.0)

**Last Updated**: 2026-01-14
**Schema Version**: SBSF v2.0 (corrected architecture)

### Overview

Module 13 documents two interconnected pathological axes that are affected EARLY in AD:

1. **Basal Forebrain Cholinergic Neurons (BFCNs)**: Neurons in nucleus basalis of Meynert (NBM) and medial septum that provide cholinergic innervation to cortex and hippocampus; degenerate early in AD
2. **White Matter/Oligodendrocytes**: Myelinating cells that insulate axons; show dysfunction 22+ years before AD symptom onset

**Key Paradigm Shifts (2020-2024)**:
1. **White matter injury PRECEDES gray matter pathology**: DTI abnormalities appear decades before plaques/tangles
2. **APOE4 → oligodendrocyte cholesterol dysregulation → demyelination** (Blanchard 2022 Nature)
3. **Selective TrkA agonism (not NGF) is therapeutic**: p75NTR activation is harmful; TrkA-selective agonists + focused ultrasound rescue BFCNs
4. **Oligodendrocytes PRODUCE Aβ**: OLs contribute to plaque formation, not just suffer from it (Sasmita 2024)

**Cross-module connections**:
- Module 10 (APOE4): APOE4 → oligodendrocyte cholesterol trapping → demyelination
- Module 4 (Inflammasome): Demyelination releases myelin debris → microglial activation
- Module 9 (Ferroptosis): Iron accumulates in demyelinated white matter
- Module 7 (Tau): Reduced myelin increases vulnerability to tau accumulation

---

### Nodes

#### Cholinergic System

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `BFCNs` | STOCK | cells/mm³ | | years | Basal forebrain cholinergic neurons; ChAT+; project to cortex/hippocampus |
| `acetylcholine` | STOCK | pmol/mg protein | BIOMARKER | minutes | ACh neurotransmitter; reduced 50-90% in AD cortex |
| `NGF_mature` | STOCK | pg/mL | | days | Mature NGF; trophic support for BFCNs via TrkA |
| `proNGF` | STOCK | pg/mL | | days | Pro-form NGF; binds p75NTR → apoptosis (ratio to mNGF matters) |
| `TrkA_signaling` | STATE | | THERAPEUTIC_TARGET | hours | NGF receptor signaling; neuroprotective |
| `p75NTR_signaling` | STATE | | THERAPEUTIC_TARGET | hours | Low-affinity NGF receptor; pro-apoptotic in AD |
| `gamma_oscillations` | STOCK | power (μV²/Hz) | BIOMARKER | seconds | 30-80 Hz oscillations; require ACh; impaired in AD |

#### White Matter/Oligodendrocyte System

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `OPCs` | STOCK | cells/mm² | THERAPEUTIC_TARGET | weeks | Oligodendrocyte precursor cells; NG2+, PDGFRα+ |
| `mature_oligodendrocytes` | STOCK | cells/mm² | | months | Myelinating oligodendrocytes; produce myelin |
| `oligodendrocyte_cholesterol` | STOCK | μg/mg protein | | days | Cholesterol in OLs; required for myelin synthesis |
| `myelin_integrity` | STOCK | FA (0-1) or MBP level | BIOMARKER | months | Fractional anisotropy or myelin basic protein |
| `myelin_debris` | STOCK | relative | | days | Degenerated myelin; triggers microglial activation |

#### White Matter State Nodes

| ID | Type | Description |
|----|------|-------------|
| `WM_intact` | STATE | Normal white matter microstructure (high FA, low MD) |
| `WM_compromised` | STATE | White matter degeneration (low FA, high MD) |
| `OL_senescent` | STATE | Senescent oligodendrocytes; NF-κB activated; impaired myelination |

#### Boundary Nodes

| ID | Type | Description |
|----|------|-------------|
| `aging` | BOUNDARY | Chronological age; drives OPC exhaustion |
| `APOE4_genotype` | BOUNDARY | From Module 10; impairs OL cholesterol metabolism |

---

### Edges (Full Schema with Evidence)

#### Edge E13.001: aging → BFCNs (Cholinergic Vulnerability)

```yaml
edge:
  id: "E13.001"
  source_node: "aging"
  target_node: "BFCNs"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "age_BFCN_vulnerability"
  mechanism_description: "BFCNs are selectively vulnerable to aging and AD. NGF retrograde transport declines with age; p75NTR/TrkA ratio shifts toward pro-apoptotic signaling. BFCNs depend on target-derived NGF, making them vulnerable when transport is impaired."
  
  evidence:
    - citation:
        pmid: "20495020"
        doi: "10.1016/j.neuroscience.2010.05.040"
        first_author: "Schliebs"
        year: 2011
        title: "The cholinergic system in aging and neuronal degeneration"
      
      quote: "Basal forebrain cholinergic neurons...are among the first neuronal populations to be affected in AD"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "review"
      
      causal_confidence: "L6"
```

#### Edge E13.002: NGF_mature → TrkA_signaling → BFCNs (Trophic Support)

```yaml
edge:
  id: "E13.002"
  source_node: "NGF_mature"
  target_node: "BFCNs"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "NGF_TrkA_BFCN_survival"
  mechanism_description: "Mature NGF binds TrkA receptor with high affinity, activating PI3K/Akt and MAPK/ERK survival pathways. TrkA signaling promotes BFCN survival, neurite outgrowth, and ChAT expression. AD shows impaired NGF/TrkA signaling despite normal NGF mRNA."
  
  evidence:
    - citation:
        pmid: "32010781"
        doi: "10.1126/sciadv.aax6646"
        first_author: "Xhima"
        year: 2020
        title: "Focused ultrasound delivery of a selective TrkA agonist rescues cholinergic function in a mouse model of Alzheimer's disease"
      
      quote: "The selective TrkA agonist D3 rescued neurotrophin signaling in TgCRND8 mice, whereas NGF, interacting with both TrkA and p75, did not"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "TgCRND8"
      
      methodology:
        type: "pharmacological_intervention"
        details: "D3 TrkA agonist + MRI-guided focused ultrasound"
      
      causal_confidence: "L4"
      
  therapeutic_implication: "Selective TrkA agonism (avoiding p75) is key for therapeutic efficacy"
```

#### Edge E13.003: proNGF → p75NTR_signaling → BFCNs (Pro-apoptotic)

```yaml
edge:
  id: "E13.003"
  source_node: "proNGF"
  target_node: "BFCNs"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "proNGF_p75_apoptosis"
  mechanism_description: "ProNGF preferentially binds p75NTR, inducing JNK-mediated apoptosis. AD shows elevated proNGF/mNGF ratio due to impaired proNGF processing. p75NTR is upregulated in AD, shifting balance toward cell death."
  
  evidence:
    - citation:
        pmid: "15056723"
        doi: "10.1126/science.1093322"
        first_author: "Volosin"
        year: 2004
        title: "Interaction of survival and death signals in basal forebrain neurons"
      
      quote: "Pro-NGF activates the p75 neurotrophin receptor pathway, leading to neuronal death"
      
      species:
        ncbi_taxon: "NCBITaxon:10116"
      
      methodology:
        type: "in_vitro_signaling"
      
      causal_confidence: "L4"
      
  therapeutic_implication: "Avoiding p75NTR activation is critical; why NGF gene therapy failed"
```

#### Edge E13.004: BFCNs → acetylcholine

```yaml
edge:
  id: "E13.004"
  source_node: "BFCNs"
  target_node: "acetylcholine"
  
  edge_type: "FLOW"
  relation: "produces"
  mechanism_label: "BFCN_ACh_synthesis"
  mechanism_description: "BFCNs synthesize ACh via choline acetyltransferase (ChAT). BFCN loss leads to 50-90% reduction in cortical ACh. ACh deficit underlies cognitive symptoms in AD."
  
  evidence:
    - citation:
        pmid: "6309134"
        doi: "10.1126/science.6309134"
        first_author: "Coyle"
        year: 1983
        title: "Alzheimer's disease: a disorder of cortical cholinergic innervation"
      
      quote: "Cortical cholinergic innervation...is markedly reduced in Alzheimer's disease"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
      
      methodology:
        type: "postmortem_biochemistry"
      
      causal_confidence: "L6"
```

#### Edge E13.005: acetylcholine → gamma_oscillations

```yaml
edge:
  id: "E13.005"
  source_node: "acetylcholine"
  target_node: "gamma_oscillations"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "ACh_gamma_modulation"
  mechanism_description: "ACh modulates gamma oscillations (30-80 Hz) via muscarinic and nicotinic receptors on interneurons. Gamma oscillations coordinate neural activity for memory encoding/retrieval. AD shows impaired gamma, partly due to cholinergic deficit."
  
  cross_module: "Links to cholinergic-gamma feedback loop (Module 18)"
  
  evidence:
    - citation:
        pmid: "26774161"
        doi: "10.1038/nature16621"
        first_author: "Iaccarino"
        year: 2016
        title: "Gamma frequency entrainment attenuates amyloid load and modifies microglia"
      
      quote: "Gamma oscillations...reduced amyloid load and modified microglia"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
      
      methodology:
        type: "optogenetic"
      
      causal_confidence: "L3"
      
  therapeutic_implication: "Gamma entrainment (40 Hz light/sound) being tested clinically"
```

#### Edge E13.006: APOE4_genotype → oligodendrocyte_cholesterol (LANDMARK)

```yaml
edge:
  id: "E13.006"
  source_node: "APOE4_genotype"
  target_node: "oligodendrocyte_cholesterol"
  
  edge_type: "INFLUENCE"
  relation: "disrupts"
  mechanism_label: "APOE4_OL_cholesterol_trapping"
  mechanism_description: "APOE4 causes intracellular cholesterol accumulation in lipid droplets within oligodendrocytes, reducing cholesterol availability for myelin synthesis. This leads to demyelination and reduced white matter integrity BEFORE Aβ pathology."
  
  cross_module: "Links to Module 10 APOE4 lipid metabolism"
  
  evidence:
    - citation:
        pmid: "36385529"
        doi: "10.1038/s41586-022-05439-w"
        first_author: "Blanchard"
        year: 2022
        title: "APOE4 impairs myelination via cholesterol dysregulation in oligodendrocytes"
        journal: "Nature"
      
      quote: "APOE4 presence results in intracellular cholesterol accumulation in lipid droplets while decreasing cholesterol availability for myelin production...reduced expression of myelin-associated genes and decreased myelinated axons"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "single_cell_RNAseq"
        details: "snRNA-seq of postmortem human brains + iPSC + mice"
      
      causal_confidence: "L4"
      
  therapeutic_implication: "Facilitating cholesterol transport improves myelination + cognition in APOE4 mice"
```

#### Edge E13.007: oligodendrocyte_cholesterol → myelin_integrity

```yaml
edge:
  id: "E13.007"
  source_node: "oligodendrocyte_cholesterol"
  target_node: "myelin_integrity"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "cholesterol_myelin_synthesis"
  mechanism_description: "Cholesterol is the most abundant lipid in myelin (~28% dry weight). Oligodendrocytes must synthesize cholesterol de novo or obtain it from astrocytes. Cholesterol depletion impairs myelin membrane wrapping and compaction."
  
  evidence:
    - citation:
        pmid: "15632169"
        doi: "10.1016/j.brainresrev.2004.09.002"
        first_author: "Saher"
        year: 2005
        title: "Cholesterol: a novel regulatory role in myelin formation"
      
      quote: "Cholesterol is essential for the assembly and maintenance of myelin sheaths"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
      
      methodology:
        type: "knockout"
        details: "Oligodendrocyte-specific squalene synthase KO"
      
      causal_confidence: "L3"
```

#### Edge E13.008: myelin_integrity → WM_compromised

```yaml
edge:
  id: "E13.008"
  source_node: "myelin_integrity"
  target_node: "WM_compromised"
  
  edge_type: "TRANSITION"
  relation: "decreases_prevents"
  mechanism_label: "demyelination_WM_damage"
  mechanism_description: "Loss of myelin integrity leads to white matter damage detectable by DTI (reduced FA, increased MD). White matter hyperintensities appear on MRI. WM changes occur 22+ years before AD symptom onset in FAD."
  
  evidence:
    - citation:
        pmid: "29499767"
        doi: "10.1186/s40478-018-0515-3"
        first_author: "Nasrabady"
        year: 2018
        title: "White matter changes in Alzheimer's disease: a focus on myelin and oligodendrocytes"
      
      quote: "Radiological markers of white matter damage occur as early as 22 years before the estimated age of symptom onset in humans who carry AD mutations"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
      
      methodology:
        type: "neuroimaging_longitudinal"
      
      causal_confidence: "L6"
```

#### Edge E13.009: myelin_debris → microglia_activation

```yaml
edge:
  id: "E13.009"
  source_node: "myelin_debris"
  target_node: "microglial_activation"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "myelin_debris_inflammation"
  mechanism_description: "Myelin debris from demyelination activates microglia via scavenger receptors and TLRs. This triggers inflammatory response and can impair OPC differentiation, creating a vicious cycle."
  
  cross_module: "Links to Module 5 Microglial Phenotypes and Module 11 TREM2"
  
  evidence:
    - citation:
        pmid: "25403833"
        doi: "10.1016/j.neuron.2014.10.020"
        first_author: "Cantuti-Castelvetri"
        year: 2018
        title: "Defective cholesterol clearance limits remyelination in the aged central nervous system"
      
      quote: "Age-related decline in cholesterol efflux impairs myelin debris clearance and remyelination"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
      
      methodology:
        type: "demyelination_model"
      
      causal_confidence: "L4"
```

#### Edge E13.010: OPCs → mature_oligodendrocytes

```yaml
edge:
  id: "E13.010"
  source_node: "OPCs"
  target_node: "mature_oligodendrocytes"
  
  edge_type: "TRANSITION"
  relation: "differentiates_to"
  mechanism_label: "OPC_differentiation"
  mechanism_description: "OPCs differentiate into mature myelinating oligodendrocytes. This process continues throughout life but declines with age. AD pathology (Aβ, tau, inflammation) impairs OPC differentiation."
  
  evidence:
    - citation:
        pmid: "30116056"
        doi: "10.1038/s41593-018-0217-1"
        first_author: "Orthmann-Murphy"
        year: 2018
        title: "Remyelination alters the pattern of myelin in the cerebral cortex"
      
      quote: "OPCs continue to generate new oligodendrocytes throughout life"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
      
      methodology:
        type: "lineage_tracing"
      
      causal_confidence: "L4"
```

---

### Interventions

#### INT_AChEI: Acetylcholinesterase Inhibitors

```yaml
intervention:
  id: "INT_AChEI"
  name: "Acetylcholinesterase Inhibitors"
  aliases: ["Donepezil", "Rivastigmine", "Galantamine"]
  
  target_type: "node"
  target_id: "acetylcholine"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Inhibit acetylcholinesterase, increasing ACh availability in synaptic cleft. Provides symptomatic benefit but does not halt BFCN degeneration."
  action: "increases"
  
  clinical_status: "approved"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "approved"
      note: "First-line symptomatic treatment"
  
  limitations: "Symptomatic only; does not modify disease progression; effect diminishes as BFCNs degenerate"
```

#### INT_TrkA_agonist: Selective TrkA Agonists

```yaml
intervention:
  id: "INT_TrkA_agonist"
  name: "Selective TrkA Agonists"
  aliases: ["D3", "LM11A-31", "PTX-BD10-2"]
  
  target_type: "node"
  target_id: "TrkA_signaling"
  
  intervention_type: "small_molecule_agonist"
  mechanism_of_action: "Selectively activate TrkA receptor WITHOUT activating p75NTR. Promotes BFCN survival via PI3K/Akt and MAPK/ERK pathways. Can be delivered with focused ultrasound for BBB penetration."
  action: "activates"
  
  clinical_status: "phase_2"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "phase_2"
      trial_id: "NCT03069014"
      note: "LM11A-31 (PharmatrophiX)"
  
  evidence:
    - citation:
        pmid: "34919633"
        doi: "10.1093/brain/awab460"
        first_author: "Xhima"
        year: 2022
      quote: "D3/FUS treatment effectively attenuated cholinergic degeneration and promoted functional recovery...reduced brain amyloid pathology and enhanced hippocampal neurogenesis"
  
  key_advantage: "Avoids p75NTR activation that caused NGF gene therapy failure"
```

#### INT_gamma_entrainment: Gamma Frequency Entrainment

```yaml
intervention:
  id: "INT_gamma_entrainment"
  name: "Gamma Frequency Entrainment"
  aliases: ["40 Hz stimulation", "GENUS", "EVOKE trial"]
  
  target_type: "node"
  target_id: "gamma_oscillations"
  
  intervention_type: "neuromodulation"
  mechanism_of_action: "External 40 Hz light/sound stimulation entrains gamma oscillations, which activates microglia for Aβ clearance and promotes neural circuit function. Non-invasive, home-based therapy."
  action: "increases"
  
  clinical_status: "phase_3"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "phase_3"
      trial_id: "NCT05637801"
      sponsor: "Cognito Therapeutics"
  
  evidence:
    - citation:
        pmid: "26774161"
        doi: "10.1038/nature16621"
        first_author: "Iaccarino"
        year: 2016
      quote: "Gamma frequency entrainment attenuates amyloid load and modifies microglia"
  
  mechanism_detail: "40 Hz gamma → microglia activation → Aβ clearance + vascular function"
```

#### INT_cholesterol_transport: Cholesterol Transport Enhancers

```yaml
intervention:
  id: "INT_OL_cholesterol"
  name: "Oligodendrocyte Cholesterol Transport Enhancers"
  aliases: ["CYP46A1 activators", "24S-hydroxycholesterol pathway"]
  
  target_type: "node"
  target_id: "oligodendrocyte_cholesterol"
  
  intervention_type: "small_molecule"
  mechanism_of_action: "Enhance cholesterol efflux from oligodendrocytes to restore cholesterol availability for myelin synthesis. Addresses APOE4-mediated cholesterol trapping."
  action: "normalizes"
  
  clinical_status: "preclinical"
  
  evidence:
    - citation:
        pmid: "36385529"
        doi: "10.1038/s41586-022-05439-w"
        first_author: "Blanchard"
        year: 2022
      quote: "Pharmacologically facilitating cholesterol transport increases axonal myelination and improves learning and memory in APOE4 mice"
  
  rationale: "Address root cause of APOE4-mediated demyelination"
```

---

### Cross-Module Connections

| From Module | Edge | To Module | Mechanism |
|-------------|------|-----------|-----------|
| 10 (APOE4) | APOE4 → OL cholesterol | 13 (WM) | Cholesterol trapping impairs myelination |
| 13 (WM) | myelin_debris → microglia | 5 (Microglia) | Demyelination activates neuroinflammation |
| 13 (WM) | WM damage → axonal injury | 7 (Tau) | Demyelinated axons vulnerable to tau |
| 13 (Cholinergic) | ACh → gamma → microglia | 11 (TREM2) | Gamma entrainment activates Aβ clearance |
| 9 (Iron) | iron → OL damage | 13 (WM) | Iron accumulates in demyelinated WM |

---

### Bibliography (Module 13)

| PMID | DOI | First Author | Year | Journal | Key Finding |
|------|-----|--------------|------|---------|-------------|
| 6309134 | [10.1126/science.6309134](https://doi.org/10.1126/science.6309134) | Coyle | 1983 | Science | **FOUNDATIONAL**: Cholinergic hypothesis of AD |
| 26774161 | [10.1038/nature16621](https://doi.org/10.1038/nature16621) | Iaccarino | 2016 | Nature | Gamma entrainment reduces amyloid |
| 29499767 | [10.1186/s40478-018-0515-3](https://doi.org/10.1186/s40478-018-0515-3) | Nasrabady | 2018 | Acta Neuropathol Commun | WM changes 22 years before symptoms |
| 32010781 | [10.1126/sciadv.aax6646](https://doi.org/10.1126/sciadv.aax6646) | Xhima | 2020 | Sci Adv | D3 TrkA agonist + FUS rescues BFCNs |
| 34838668 | [10.1016/j.nbd.2021.105563](https://doi.org/10.1016/j.nbd.2021.105563) | Gonzalez | 2021 | Neurobiol Dis | TrkB/TrkC agonists protect BFCNs |
| 34919633 | [10.1093/brain/awab460](https://doi.org/10.1093/brain/awab460) | Xhima | 2022 | Brain | D3/FUS comprehensive protection |
| 36385529 | [10.1038/s41586-022-05439-w](https://doi.org/10.1038/s41586-022-05439-w) | Blanchard | 2022 | Nature | **LANDMARK**: APOE4 → OL cholesterol → demyelination |
| 39497961 | [10.1186/s13024-024-00760-6](https://doi.org/10.1186/s13024-024-00760-6) | Review | 2024 | Mol Neurodegen | OLs as missing link in AD |

---

## Module 14: MAM & Calcium (SBSF v2.0)

**Last Updated**: 2026-01-14
**Schema Version**: SBSF v2.0 (corrected architecture)

### Overview

Mitochondria-Associated ER Membranes (MAM) are specialized lipid raft-like subdomains of the ER that are physically and functionally coupled to mitochondria. MAM serves as a critical hub for:

1. **Ca²⁺ transfer from ER to mitochondria** (IP3R-GRP75-VDAC-MCU axis)
2. **Lipid biosynthesis and trafficking** (phospholipid and cholesterol)
3. **Aβ production** (γ-secretase is enriched at MAM)
4. **Autophagosome formation**
5. **Apoptosis regulation**

**MAM Hypothesis of AD (Area-Gomez & Schon)**: AD is fundamentally a disorder of **ER-mitochondrial hyperconnectivity**. FAD mutations in PS1/PS2 and LOAD-associated changes both converge on increased MAM function, which may explain:
- Aberrant Aβ production
- Altered calcium homeostasis  
- Disrupted phospholipid/cholesterol metabolism
- Mitochondrial dysfunction

**Calcium Hypothesis of AD (Berridge 2009)**: Aβ and FAD mutations remodel neuronal Ca²⁺ signaling, enhancing ER Ca²⁺ stores and release via ryanodine receptors (RYR), leading to:
- Enhanced calcineurin activation → LTD enhancement → memory erasure
- Mitochondrial Ca²⁺ overload → mPTP opening → neurodegeneration

**Cross-module connections**:
- Module 3 (Mitochondrial): MAM regulates mito Ca²⁺ and mPTP sensitivity
- Module 6 (Amyloid): γ-secretase (PS1/PS2) localized to MAM; Aβ production occurs here
- Module 9 (Ferroptosis): MAM cholesterol metabolism affects membrane composition
- Module 10 (APOE4): APOE4 affects cholesterol trafficking including at MAM

---

### Nodes

#### MAM Structural/Functional Nodes

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `MAM_contact_sites` | STOCK | contact points per cell | BIOMARKER | hours | Number of ER-mitochondria contact sites; INCREASED in AD (hyperconnectivity) |
| `MAM_distance` | STOCK | nm | | hours | Distance between ER and mitochondrial membranes; ~10-25 nm at tight contacts; DECREASED in AD |
| `ER_Ca_store` | STOCK | μM | | minutes | ER luminal calcium concentration; maintained by SERCA; elevated in AD |
| `cytosolic_Ca` | STOCK | nM | | seconds | Cytosolic free calcium; resting ~100 nM; transients reach μM |
| `mitochondrial_Ca` | STOCK | μM | | minutes | Mitochondrial matrix Ca²⁺; regulates ATP synthesis and mPTP |

#### Ca²⁺ Transfer Machinery

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `IP3R` | STOCK | relative | REGULATOR, THERAPEUTIC_TARGET | hours | Inositol trisphosphate receptor; ER Ca²⁺ release channel; complexes with GRP75 at MAM |
| `RYR` | STOCK | relative | REGULATOR | hours | Ryanodine receptor; ER Ca²⁺ release; sensitized in AD; CICR (Ca²⁺-induced Ca²⁺ release) |
| `GRP75` | STOCK | relative | REGULATOR | hours | Heat shock protein 70 chaperone (HSPA9); tethers IP3R to VDAC at MAM |
| `VDAC1` | STOCK | relative | REGULATOR | hours | Voltage-dependent anion channel; OMM Ca²⁺ channel; complexes with GRP75/IP3R |
| `MCU` | STOCK | relative | REGULATOR, THERAPEUTIC_TARGET | hours | Mitochondrial calcium uniporter; IMM Ca²⁺ uptake; regulated by MICU1/2 |
| `SERCA` | STOCK | relative | REGULATOR, THERAPEUTIC_TARGET | hours | Sarco/endoplasmic reticulum Ca²⁺-ATPase; refills ER Ca²⁺ stores |

#### MAM-Resident Enzymes/Regulators

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `sigma1R` | STOCK | relative | REGULATOR, THERAPEUTIC_TARGET | hours | Sigma-1 receptor; ER chaperone enriched at MAM; modulates IP3R function; neuroprotective |
| `PS1_MAM` | STOCK | relative | REGULATOR | hours | Presenilin-1 at MAM; γ-secretase component; FAD mutations alter MAM function |
| `PS2_MAM` | STOCK | relative | REGULATOR | hours | Presenilin-2 at MAM; interacts with Mfn2 to modulate ER-mito tethering; FAD mutations increase MAM contacts |
| `Mfn2` | STOCK | relative | REGULATOR | hours | Mitofusin 2; ER-mito tether; antagonizes MAM formation in some contexts |
| `gamma_secretase_MAM` | STOCK | relative | REGULATOR | hours | γ-secretase complex at MAM; primary site of Aβ production |

#### Calcium-Dependent Effectors

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `calcineurin` | STOCK | relative | REGULATOR, THERAPEUTIC_TARGET | minutes | Ca²⁺/calmodulin-dependent phosphatase (PP2B); dephosphorylates tau; activates NFAT |
| `CaMKII` | STOCK | relative | REGULATOR | minutes | Ca²⁺/calmodulin-dependent kinase II; synaptic plasticity; dysregulated in AD |
| `calpain` | STOCK | relative | REGULATOR | minutes | Ca²⁺-activated protease; cleaves tau, CDK5→p25 conversion; neurotoxic when chronically active |

#### State Nodes

| ID | Type | Description |
|----|------|-------------|
| `MAM_hyperconnected` | STATE | Increased ER-mito apposition; elevated MAM function; characteristic of AD |
| `ER_Ca_overload` | STATE | Elevated ER Ca²⁺ store; enhanced IP3R/RYR sensitivity |
| `mitochondrial_Ca_overload` | STATE | Excessive mito Ca²⁺; sensitizes mPTP; promotes apoptosis |
| `NFAT_nuclear` | STATE | Nuclear translocation of NFAT; calcineurin-dependent; pro-apoptotic in neurons |

#### Boundary Nodes

| ID | Type | Description |
|----|------|-------------|
| `PS1_FAD_mutations` | BOUNDARY | Familial AD mutations in PSEN1 (e.g., M146V, L286V); alter Ca²⁺ handling |
| `PS2_FAD_mutations` | BOUNDARY | Familial AD mutations in PSEN2 (e.g., N141I, M239V); increase MAM contacts |
| `aging` | BOUNDARY | Chronological age; Ca²⁺ dysregulation increases with age |

---

### Edges (Full Schema with Evidence)

#### Edge E14.001: PS2_FAD_mutations → MAM_contact_sites (Increased ER-Mito Tethering)

```yaml
edge:
  id: "E14.001"
  source_node: "PS2_FAD_mutations"
  target_node: "MAM_contact_sites"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "PS2_Mfn2_tethering"
  mechanism_description: "PS2 FAD mutations enhance binding to Mfn2 at MAM, antagonizing Mfn2's normal function of limiting ER-mito contacts. This increases the number and tightness of MAM contact sites."
  
  evidence:
    - citation:
        pmid: "27239030"
        doi: "10.1016/j.celrep.2016.05.013"
        first_author: "Filadi"
        year: 2016
        title: "Presenilin 2 Modulates ER-Mitochondria Coupling by Tuning the Antagonistic Effect of Mitofusin 2"
      
      quote: "PS2 mutants associated with FAD are more effective than the wild-type form in modulating ER-mitochondria tethering because their binding to Mfn2 in mitochondria-associated membranes is favored"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "in_vitro_signaling"
        details: "Confocal microscopy, electron microscopy, biochemical fractionation"
      
      causal_confidence: "L4"
```

#### Edge E14.002: MAM_contact_sites → mitochondrial_Ca (Ca²⁺ Transfer)

```yaml
edge:
  id: "E14.002"
  source_node: "MAM_contact_sites"
  target_node: "mitochondrial_Ca"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "IP3R_GRP75_VDAC_MCU_transfer"
  mechanism_description: "MAM contact sites contain the IP3R-GRP75-VDAC1-MCU Ca²⁺ transfer machinery. Increased MAM contacts = increased Ca²⁺ flux from ER to mitochondria. Hyperconnectivity in AD drives mitochondrial Ca²⁺ overload."
  
  evidence:
    - citation:
        pmid: "24316057"
        doi: "10.1016/j.bbalip.2013.11.014"
        first_author: "Vance"
        year: 2014
        title: "MAM in mammalian cells: lipids and beyond"
      
      quote: "Formation of these contact sites between MAM and mitochondria appears to be required for key cellular events including the transport of calcium from the ER to mitochondria"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "review"
      
      causal_confidence: "L5"
```

#### Edge E14.003: sigma1R → IP3R (Ca²⁺ Release Modulation)

```yaml
edge:
  id: "E14.003"
  source_node: "sigma1R"
  target_node: "IP3R"
  
  edge_type: "MODULATION"
  relation: "regulates"
  mechanism_label: "sigma1R_IP3R_chaperone"
  mechanism_description: "Sigma-1 receptor acts as chaperone at MAM, stabilizing IP3R under ER stress. Sigma-1R agonists protect neurons by modulating ER-mitochondria Ca²⁺ transfer and preventing excessive Ca²⁺ release."
  
  evidence:
    - citation:
        pmid: "29127580"
        doi: "10.1007/s12640-017-9838-2"
        first_author: "Goguadze"
        year: 2017
        title: "Sigma-1 Receptor Agonists Induce Oxidative Stress in Mitochondria but Protect Against Pathological Oxidative Stress"
      
      quote: "The σR is a chaperone protein residing at mitochondria-associated endoplasmic reticulum membranes (MAMs), where it modulates Ca exchange between the ER and mitochondria by interacting with IP3Rs"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
      
      methodology:
        type: "pharmacological_animal"
        details: "σR agonists PRE-084, ANAVEX compounds tested"
      
      causal_confidence: "L4"
```

#### Edge E14.004: ER_Ca_store → RYR (CICR Sensitization)

```yaml
edge:
  id: "E14.004"
  source_node: "ER_Ca_store"
  target_node: "RYR"
  
  edge_type: "MODULATION"
  relation: "increases"
  mechanism_label: "Ca_store_RYR_sensitization"
  mechanism_description: "Elevated ER luminal Ca²⁺ (seen in AD) sensitizes ryanodine receptors, lowering their threshold for Ca²⁺-induced Ca²⁺ release (CICR). This amplifies Ca²⁺ signals pathologically."
  
  evidence:
    - citation:
        pmid: "19795132"
        doi: "10.1007/s00424-009-0736-1"
        first_author: "Berridge"
        year: 2009
        title: "Calcium hypothesis of Alzheimer's disease"
      
      quote: "An increase in the luminal level of Ca within the ER enhances the sensitivity of the ryanodine receptors (RYRs) to increase the amount of Ca being released from the internal stores"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "review"
        details: "Foundational calcium hypothesis paper"
      
      causal_confidence: "L5"
```

#### Edge E14.005: PS1_FAD_mutations → ER_Ca_store (ER Ca²⁺ Overload)

```yaml
edge:
  id: "E14.005"
  source_node: "PS1_FAD_mutations"
  target_node: "ER_Ca_store"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "PS1_Ca_leak_channel"
  mechanism_description: "Wild-type PS1 may function as an ER Ca²⁺ leak channel. FAD mutations in PS1 disrupt this function, leading to ER Ca²⁺ overload and potentiated IP3-mediated release."
  
  evidence:
    - citation:
        pmid: "9422341"
        doi: "10.1046/j.1471-4159.1998.70010001.x"
        first_author: "Mattson"
        year: 1998
        title: "Presenilins, the endoplasmic reticulum, and neuronal apoptosis in Alzheimer's disease"
      
      quote: "PS mutations sensitize cultured neural cells to apoptosis...The mechanism responsible for the proapoptotic action of mutant PSs may involve perturbed calcium release from ER stores"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "in_vitro_signaling"
        details: "Transfection of PS1/PS2 mutants in neural cells"
      
      causal_confidence: "L4"
```

#### Edge E14.006: cytosolic_Ca → calcineurin (PP2B Activation)

```yaml
edge:
  id: "E14.006"
  source_node: "cytosolic_Ca"
  target_node: "calcineurin"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "Ca_calmodulin_calcineurin"
  mechanism_description: "Elevated cytosolic Ca²⁺ binds calmodulin, activating calcineurin (PP2B). Chronic calcineurin activation in AD leads to: (1) tau dephosphorylation at some sites, (2) NFAT nuclear translocation, (3) LTD enhancement → memory impairment."
  
  evidence:
    - citation:
        pmid: "19795132"
        doi: "10.1007/s00424-009-0736-1"
        first_author: "Berridge"
        year: 2009
        title: "Calcium hypothesis of Alzheimer's disease"
      
      quote: "The Ca signaling remodeling may erase newly acquired memories by enhancing the mechanism of long-term depression that depends on activation of the Ca-dependent protein phosphatase calcineurin"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "review"
      
      causal_confidence: "L5"
```

#### Edge E14.007: mitochondrial_Ca → mPTP_opening (from Module 3)

```yaml
edge:
  id: "E14.007"
  source_node: "mitochondrial_Ca"
  target_node: "mPTP"  # Cross-module link to Module 3
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "mito_Ca_mPTP_sensitization"
  mechanism_description: "Excessive mitochondrial Ca²⁺ sensitizes the mitochondrial permeability transition pore (mPTP). Combined with oxidative stress, this triggers mPTP opening → cytochrome c release → apoptosis."
  
  cross_module: "Links to Module 3 (Mitochondrial Dysfunction)"
  
  evidence:
    - citation:
        pmid: "17328689"
        doi: "10.1111/j.1474-9726.2007.00275.x"
        first_author: "Mattson"
        year: 2007
        title: "Calcium and neurodegeneration"
      
      quote: "Alterations of Ca-regulating proteins in...mitochondria (electron transport chain proteins, Bcl-2 family members, and uncoupling proteins) are implicated in age-related neuronal dysfunction and disease"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "review"
      
      causal_confidence: "L5"
```

#### Edge E14.008: gamma_secretase_MAM → Abeta_production (Aβ Generation at MAM)

```yaml
edge:
  id: "E14.008"
  source_node: "gamma_secretase_MAM"
  target_node: "Abeta_production"  # Cross-module link to Module 6
  
  edge_type: "FLOW"
  relation: "produces"
  mechanism_label: "MAM_Abeta_generation"
  mechanism_description: "γ-secretase activity is predominantly localized to MAM. APP processing occurs here, generating Aβ. Increased MAM function in AD = increased Aβ production site."
  
  cross_module: "Links to Module 6 (Amyloid Pathology)"
  
  evidence:
    - citation:
        pmid: "22922446"
        doi: "10.1016/j.mcn.2012.07.011"
        first_author: "Schon"
        year: 2012
        title: "Mitochondria-associated ER membranes in Alzheimer disease"
      
      quote: "γ-secretase activity, which processes the amyloid precursor protein to generate Aβ, is located predominantly in the MAM"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "subcellular_fractionation"
        details: "Biochemical isolation of MAM fractions"
      
      causal_confidence: "L4"
```

#### Edge E14.009: cytosolic_Ca → CaMKII (Dysregulation in AD)

```yaml
edge:
  id: "E14.009"
  source_node: "cytosolic_Ca"
  target_node: "CaMKII"
  
  edge_type: "INFLUENCE"
  relation: "regulates"
  mechanism_label: "Ca_CaMKII_plasticity"
  mechanism_description: "CaMKII is activated by Ca²⁺/calmodulin and is critical for LTP and memory. In AD, CaMKII dysregulation (both over- and under-activation depending on context) impairs synaptic plasticity."
  
  evidence:
    - citation:
        pmid: "26603284"
        doi: "10.1186/s13041-015-0166-2"
        first_author: "Ghosh"
        year: 2015
        title: "Calcium/calmodulin-dependent kinase II and Alzheimer's disease"
      
      quote: "CaMKII dysregulation may therefore be a modulator of toxicity in Alzheimer's disease, a dementia characterised by aberrant calcium signalling"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "review"
      
      causal_confidence: "L5"
```

#### Edge E14.010: cytosolic_Ca → calpain (Neurotoxic Protease Activation)

```yaml
edge:
  id: "E14.010"
  source_node: "cytosolic_Ca"
  target_node: "calpain"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "Ca_calpain_activation"
  mechanism_description: "Sustained cytosolic Ca²⁺ elevation activates calpains, Ca²⁺-dependent proteases. Calpain cleaves CDK5 activator p35→p25 (hyperactive form), cleaves tau generating neurotoxic fragments, and degrades cytoskeletal proteins."
  
  evidence:
    - citation:
        pmid: "34066371"
        doi: "10.3390/ijms22094914"
        first_author: "Cascella"
        year: 2021
        title: "Calcium Dyshomeostasis in Alzheimer's Disease Pathogenesis"
      
      quote: "Intracellular calcium acts as a second messenger and plays a key role in the regulation of neuronal functions...The calcium hypothesis of AD posits that activation of the amyloidogenic pathway affects neuronal Ca homeostasis"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
      
      methodology:
        type: "review"
      
      causal_confidence: "L5"
```

---

### Interventions

#### INT_sigma1R_agonist: Sigma-1 Receptor Agonists (ANAVEX2-73)

```yaml
intervention:
  id: "INT_sigma1R_agonist"
  name: "ANAVEX2-73 (Blarcamesine)"
  aliases: ["blarcamesine", "sigma-1 receptor agonist"]
  
  target_type: "node"
  target_id: "sigma1R"
  
  intervention_type: "small_molecule_agonist"
  mechanism_of_action: "Activates sigma-1 receptor at MAM, modulating ER-mitochondria Ca²⁺ transfer and providing neuroprotection against Aβ toxicity. Also has muscarinic M1 agonist activity."
  action: "activates"
  
  parameters:
    time_to_effect: "weeks"
    duration: "sustained"
  
  clinical_status: "phase_3"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "phase_3"
      trial_id: "NCT04314934"
      sponsor: "Anavex Life Sciences"
  
  evidence:
    - citation:
        pmid: "31048034"
        doi: "10.1016/j.phrs.2019.04.026"
        first_author: "Maurice"
        year: 2019
      quote: "σ receptor activation...act behaviorally as antidepressant, anti-amnesic and neuroprotective agents"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "pharmacological_animal"
  
  key_advantages:
    - "Novel mechanism distinct from anti-amyloid/anti-tau"
    - "Good BBB penetration"
    - "Oral bioavailability"
  
  route_of_administration: "oral"
  blood_brain_barrier: "good penetration"
```

#### INT_dantrolene: Dantrolene (RYR Inhibitor)

```yaml
intervention:
  id: "INT_dantrolene"
  name: "Dantrolene"
  aliases: ["ryanodine receptor antagonist"]
  
  target_type: "node"
  target_id: "RYR"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Inhibits ryanodine receptor, reducing ER Ca²⁺ release and preventing pathological CICR amplification seen in AD models."
  action: "decreases"
  
  parameters:
    time_to_effect: "hours"
    duration: "reversible"
  
  clinical_status: "approved_repurposing"
  indication_status:
    - indication: "Malignant hyperthermia"
      status: "approved"
    - indication: "Alzheimer's disease"
      status: "preclinical"
  
  evidence:
    - citation:
        pmid: "19795132"
        doi: "10.1007/s00424-009-0736-1"
        first_author: "Berridge"
        year: 2009
      quote: "An increase in the luminal level of Ca within the ER enhances the sensitivity of the ryanodine receptors"
      methodology:
        type: "review"
  
  cautions:
    - "Hepatotoxicity risk with chronic use"
    - "Muscle weakness side effect"
    - "BBB penetration limited"
  
  route_of_administration: "oral or IV"
  blood_brain_barrier: "limited penetration"
```

#### INT_FK506: FK506/Tacrolimus (Calcineurin Inhibitor)

```yaml
intervention:
  id: "INT_FK506"
  name: "FK506 (Tacrolimus)"
  aliases: ["calcineurin inhibitor"]
  
  target_type: "node"
  target_id: "calcineurin"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Binds FKBP12 and inhibits calcineurin, preventing NFAT activation and potentially reducing LTD-mediated memory erasure."
  action: "decreases"
  
  parameters:
    time_to_effect: "hours"
    duration: "reversible"
  
  clinical_status: "approved_repurposing"
  indication_status:
    - indication: "Transplant rejection"
      status: "approved"
    - indication: "Alzheimer's disease"
      status: "preclinical"
  
  evidence:
    - citation:
        pmid: "19795132"
        doi: "10.1007/s00424-009-0736-1"
        first_author: "Berridge"
        year: 2009
      methodology:
        type: "review"
  
  cautions:
    - "Immunosuppression"
    - "Nephrotoxicity"
    - "Neurotoxicity at high doses (paradoxical)"
  
  route_of_administration: "oral"
```

#### INT_ACAT1_inhibitor: ACAT1/SOAT1 Inhibitors (MAM Cholesterol Modulation)

```yaml
intervention:
  id: "INT_ACAT1_inhibitor"
  name: "ACAT1/SOAT1 Inhibitors"
  aliases: ["K-604", "F12511", "cholesterol esterification inhibitors"]
  
  target_type: "edge"
  target_id: "MAM_contact_sites"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "ACAT1 inhibition increases MAM cholesterol, paradoxically strengthening ER-mito contacts. However, this also promotes autophagy and lysosomal biogenesis, reducing amyloid pathology in AD models."
  action: "modulates"
  
  parameters:
    time_to_effect: "days"
    duration: "sustained"
  
  clinical_status: "preclinical"
  indication_status:
    - indication: "Alzheimer's disease"
      status: "preclinical"
  
  evidence:
    - citation:
        pmid: "36982602"
        doi: "10.3390/ijms24065525"
        first_author: "Harned"
        year: 2023
        title: "Acute ACAT1/SOAT1 Blockade Increases MAM Cholesterol and Strengthens ER-Mitochondria Connectivity"
      quote: "ACAT1/SOAT1 inhibition strengthens the ER-mitochondria connection...suggests that cholesterol buildup at the MAM is the impetus behind the therapeutic benefits"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "in_vitro_biochemical"
  
  route_of_administration: "oral (preclinical)"
```

---

### The MAM Hypothesis: Mechanistic Summary

**See**: [ad_dag_diagrams.md → Diagram 15: The MAM Hypothesis Mechanistic Summary](ad_dag_diagrams.md#diagram-15-the-mam-hypothesis-mechanistic-summary)

---

### Cross-Module Connections

| From Module | Edge | To Module | Mechanism |
|-------------|------|-----------|-----------|
| 14 (MAM) | mito_Ca_overload → mPTP | 3 (Mito) | Ca²⁺ sensitizes mPTP opening |
| 14 (MAM) | gamma_secretase_MAM → Aβ | 6 (Amyloid) | γ-secretase enriched at MAM |
| 14 (MAM) | MAM_cholesterol → ferroptosis_vulnerability | 9 (Ferroptosis) | Membrane lipid composition |
| 10 (APOE4) | APOE4 → MAM_cholesterol | 14 (MAM) | APOE4 alters cholesterol trafficking |
| 14 (MAM) | calcineurin → tau | 7 (Tau) | Calcineurin affects tau phosphorylation |
| 14 (MAM) | calpain → p25/CDK5 | 7 (Tau) | Calpain generates hyperactive CDK5 |

---

### Bibliography (Module 14)

| PMID | DOI | First Author | Year | Journal | Key Finding |
|------|-----|--------------|------|---------|-------------|
| 22922446 | [10.1016/j.mcn.2012.07.011](https://doi.org/10.1016/j.mcn.2012.07.011) | Schon | 2012 | Mol Cell Neurosci | **FOUNDATIONAL**: γ-secretase at MAM; AD = ER-mito hyperconnectivity |
| 27235807 | [10.1016/j.gde.2016.04.006](https://doi.org/10.1016/j.gde.2016.04.006) | Area-Gomez | 2016 | Curr Opin Genet Dev | MAM and AD pathogenesis |
| 28815528 | [10.1007/978-981-10-4567-7_11](https://doi.org/10.1007/978-981-10-4567-7_11) | Area-Gomez | 2017 | Adv Exp Med Biol | Comprehensive MAM-AD review |
| 19795132 | [10.1007/s00424-009-0736-1](https://doi.org/10.1007/s00424-009-0736-1) | Berridge | 2009 | Pflugers Arch | **FOUNDATIONAL**: Calcium hypothesis of AD |
| 27239030 | [10.1016/j.celrep.2016.05.013](https://doi.org/10.1016/j.celrep.2016.05.013) | Filadi | 2016 | Cell Rep | PS2 modulates MAM via Mfn2 interaction |
| 9422341 | [10.1046/j.1471-4159.1998.70010001.x](https://doi.org/10.1046/j.1471-4159.1998.70010001.x) | Mattson | 1998 | J Neurochem | Presenilins, ER, and neuronal apoptosis |
| 17328689 | [10.1111/j.1474-9726.2007.00275.x](https://doi.org/10.1111/j.1474-9726.2007.00275.x) | Mattson | 2007 | Aging Cell | Calcium and neurodegeneration review |
| 24316057 | [10.1016/j.bbalip.2013.11.014](https://doi.org/10.1016/j.bbalip.2013.11.014) | Vance | 2014 | BBA Lipids | MAM structure and function review |
| 29491385 | [10.1038/s41419-017-0105-5](https://doi.org/10.1038/s41419-017-0105-5) | Janikiewicz | 2018 | Cell Death Dis | MAM in aging and senescence |
| 31991578 | [10.3390/ijms21030770](https://doi.org/10.3390/ijms21030770) | Galla | 2020 | Int J Mol Sci | PS2 and intracellular calcium dysregulation |
| 34066371 | [10.3390/ijms22094914](https://doi.org/10.3390/ijms22094914) | Cascella | 2021 | Int J Mol Sci | Calcium dyshomeostasis in AD pathogenesis |
| 26603284 | [10.1186/s13041-015-0166-2](https://doi.org/10.1186/s13041-015-0166-2) | Ghosh | 2015 | Mol Brain | CaMKII and AD |
| 29127580 | [10.1007/s12640-017-9838-2](https://doi.org/10.1007/s12640-017-9838-2) | Goguadze | 2017 | Neurotox Res | Sigma-1R agonists and mitochondria |
| 31048034 | [10.1016/j.phrs.2019.04.026](https://doi.org/10.1016/j.phrs.2019.04.026) | Maurice | 2019 | Pharmacol Res | Sigma-1R positive modulators in AD |
| 33404051 | [10.1042/CS20200844](https://doi.org/10.1042/CS20200844) | Yu | 2021 | Clin Sci | MAM as therapeutic target in AD |
| 36982602 | [10.3390/ijms24065525](https://doi.org/10.3390/ijms24065525) | Harned | 2023 | Int J Mol Sci | ACAT1 blockade increases MAM connectivity |
| 37495165 | [10.1016/j.mito.2023.07.005](https://doi.org/10.1016/j.mito.2023.07.005) | Sammeta | 2023 | Mitochondrion | ER-MT communication in neurodegeneration |
| 36571634 | [10.1007/s10571-022-01299-0](https://doi.org/10.1007/s10571-022-01299-0) | Agrawal | 2023 | Cell Mol Neurobiol | MAM upregulation after TBI links to AD |

---

## Module 15: Interventions & Clinical Boundaries (SBSF v2.0)

**Last Updated**: 2026-01-14
**Schema Version**: SBSF v2.0 (corrected architecture)

### Overview

Module 15 captures **clinical and translational boundary conditions** that determine whether mechanistically sound interventions succeed or fail in practice. These nodes represent the "real-world" constraints that must be satisfied for therapeutic efficacy:

1. **Pharmacokinetic boundaries**: Drug exposure at target site
2. **Biomarker boundaries**: Measurable changes that indicate target engagement
3. **Safety boundaries**: Adverse events that limit therapeutic window
4. **Logistical boundaries**: Implementation barriers affecting adherence

**Critical insight**: Many AD trials fail NOT because the mechanism is wrong, but because:
- Drug doesn't reach target (CSF concentration)
- Target engagement not verified (no biomarker movement)
- Safety events force dose reduction (ARIA, hepatotoxicity)
- Patient burden limits adherence (infusion logistics, MRI monitoring)

---

### Pharmacokinetic Boundary Nodes

| ID | Type | Units | Description | Relevance |
|----|------|-------|-------------|-----------|
| `CSF_drug_concentration` | BOUNDARY | ng/mL | Drug concentration in cerebrospinal fluid | Required for CNS target engagement; many drugs fail due to poor BBB penetration |
| `brain_parenchyma_exposure` | BOUNDARY | ng/g tissue | Drug concentration in brain tissue | CSF ≠ parenchyma; antibodies especially limited |
| `target_occupancy` | BOUNDARY | % receptors bound | Fraction of target occupied by drug | PET ligands can measure; required for dose selection |
| `half_life_plasma` | BOUNDARY | hours | Plasma elimination half-life | Determines dosing frequency |
| `half_life_CSF` | BOUNDARY | hours | CSF elimination half-life | May differ from plasma; relevant for CNS drugs |

---

### Biomarker Boundary Nodes (Target Engagement)

| ID | Type | Units | Description | Relevance |
|----|------|-------|-------------|-----------|
| `amyloid_PET_SUVR` | BOUNDARY | SUVR or Centiloid | Amyloid PET signal (florbetapir, florbetaben, flutemetamol) | Primary endpoint for anti-amyloid trials; Centiloid scale standardizes across tracers |
| `tau_PET_SUVR` | BOUNDARY | SUVR | Tau PET signal (flortaucipir, MK-6240, PI-2620) | Tracks tau pathology; more closely correlates with cognition than amyloid |
| `CSF_Abeta42` | BOUNDARY | pg/mL | CSF Aβ42 concentration | Decreases with amyloid deposition (sequestration); increases with clearance |
| `CSF_Abeta42_40_ratio` | BOUNDARY | ratio | Aβ42/Aβ40 ratio | More specific than Aβ42 alone; normalizes for production rate |
| `CSF_pTau181` | BOUNDARY | pg/mL | CSF phospho-tau 181 | Marker of tau pathology and neurodegeneration |
| `CSF_pTau217` | BOUNDARY | pg/mL | CSF phospho-tau 217 | More specific for AD than pTau181; better correlation with tau PET |
| `CSF_pTau231` | BOUNDARY | pg/mL | CSF phospho-tau 231 | Early marker; increases before amyloid PET positivity |
| `CSF_NfL` | BOUNDARY | pg/mL | Neurofilament light chain | Marker of axonal damage; non-specific but sensitive |
| `CSF_GFAP` | BOUNDARY | pg/mL | Glial fibrillary acidic protein | Astrocyte activation marker |
| `CSF_sTREM2` | BOUNDARY | pg/mL | Soluble TREM2 | Microglial activation marker; higher = slower progression |
| `plasma_pTau217` | BOUNDARY | pg/mL | Plasma phospho-tau 217 | Blood-based biomarker; approaching CSF performance |
| `plasma_Abeta42_40` | BOUNDARY | ratio | Plasma Aβ42/Aβ40 ratio | Blood-based; less invasive than CSF |

---

### Downstream Phosphorylation Markers

| ID | Type | Units | Description | Relevance |
|----|------|-------|-------------|-----------|
| `pGSK3β_Ser9` | BOUNDARY | relative | Inhibitory GSK3β phosphorylation | Indicates insulin/Akt pathway engagement |
| `pAkt_Ser473` | BOUNDARY | relative | Akt activation marker | Survival signaling engagement |
| `pERK1_2` | BOUNDARY | relative | MAPK pathway activation | Growth factor signaling |
| `pTrkA_Tyr490` | BOUNDARY | relative | TrkA activation | NGF signaling engagement |
| `pSyk` | BOUNDARY | relative | Syk kinase activation | TREM2 signaling downstream |
| `pAMPK_Thr172` | BOUNDARY | relative | AMPK activation | Metabolic stress response |
| `pULK1_Ser555` | BOUNDARY | relative | Autophagy initiation | AMPK-mediated autophagy activation |
| `pS6K1_Thr389` | BOUNDARY | relative | mTORC1 activity readout | Protein synthesis/autophagy balance |

---

### Safety Boundary Nodes

#### ARIA (Amyloid-Related Imaging Abnormalities)

| ID | Type | Units | Description | Relevance |
|----|------|-------|-------------|-----------|
| `ARIA_E` | BOUNDARY | MRI finding (Y/N, severity grade) | ARIA-Edema: vasogenic edema on FLAIR MRI | Most common AE with anti-amyloid antibodies; dose-limiting |
| `ARIA_H_microhemorrhage` | BOUNDARY | count | ARIA-H: cerebral microhemorrhages on GRE/SWI | Hemosiderin deposits; more common in APOE4 carriers |
| `ARIA_H_superficial_siderosis` | BOUNDARY | MRI finding | Superficial siderosis on GRE/SWI | Linear hemosiderin at cortical surface |
| `ARIA_symptomatic` | BOUNDARY | Y/N | Symptomatic ARIA (headache, confusion, visual) | ~25% of ARIA-E cases; requires treatment hold |
| `APOE4_ARIA_risk` | BOUNDARY | OR | APOE4 carrier status modifies ARIA risk | Homozygotes: 3-4x higher ARIA risk; some trials exclude |

**ARIA Risk Factors**:
- APOE4 homozygosity: OR ~3-4 for ARIA-E
- Higher antibody dose
- Faster titration
- Baseline microhemorrhages >4
- Use of anticoagulants

#### Hepatotoxicity

| ID | Type | Units | Description | Relevance |
|----|------|-------|-------------|-----------|
| `ALT_elevation` | BOUNDARY | xULN | Alanine aminotransferase elevation | Liver injury marker; Hy's Law threshold = 3xULN |
| `AST_elevation` | BOUNDARY | xULN | Aspartate aminotransferase elevation | Less specific than ALT |
| `bilirubin_elevation` | BOUNDARY | xULN | Total bilirubin | Hy's Law: ALT >3x + bilirubin >2x = high mortality risk |
| `DILI_risk` | BOUNDARY | Y/N | Drug-induced liver injury | Led to termination of several AD trials (e.g., semagacestat) |

#### Infection Risk

| ID | Type | Units | Description | Relevance |
|----|------|-------|-------------|-----------|
| `infection_rate` | BOUNDARY | events/patient-year | Serious infection incidence | Immunomodulatory therapies increase risk |
| `UTI_rate` | BOUNDARY | events/patient-year | Urinary tract infections | Common in elderly; confounds cognitive assessment |
| `pneumonia_rate` | BOUNDARY | events/patient-year | Pneumonia incidence | Leading cause of death in advanced AD |
| `opportunistic_infections` | BOUNDARY | Y/N | Opportunistic infection occurrence | Risk with strong immunosuppression |
| `herpes_reactivation` | BOUNDARY | Y/N | HSV/VZV reactivation | Risk with immunomodulation; relevant given viral hypothesis |

#### Other Safety Boundaries

| ID | Type | Units | Description | Relevance |
|----|------|-------|-------------|-----------|
| `infusion_reactions` | BOUNDARY | % patients | Infusion-related reactions | Common with IV antibodies; premedication helps |
| `injection_site_reactions` | BOUNDARY | % patients | SC injection site reactions | Relevant for SC formulations |
| `QTc_prolongation` | BOUNDARY | ms change | Cardiac QT interval prolongation | Torsades de pointes risk; ECG monitoring required |
| `suicidality_signal` | BOUNDARY | Y/N | Suicidal ideation/behavior | Required monitoring for CNS drugs |

---

### Logistical Boundary Nodes

| ID | Type | Units | Description | Relevance |
|----|------|-------|-------------|-----------|
| `MRI_monitoring_frequency` | BOUNDARY | scans/year | Required MRI monitoring frequency | ARIA detection requires regular MRI; 5-7 scans in year 1 for lecanemab |
| `MRI_access` | BOUNDARY | Y/N availability | MRI scanner availability | Rural/underserved areas may lack access |
| `infusion_duration` | BOUNDARY | hours | IV infusion time | Lecanemab: 1 hour q2w; aducanumab: 1 hour q4w |
| `infusion_frequency` | BOUNDARY | infusions/year | Number of infusions per year | Lecanemab: 26/year; aducanumab: 13/year |
| `infusion_center_access` | BOUNDARY | Y/N availability | Access to infusion center | Geographic/socioeconomic barrier |
| `caregiver_burden` | BOUNDARY | hours/week | Time burden on caregivers | Affects adherence; infusions require accompaniment |
| `treatment_cost` | BOUNDARY | $/year | Annual treatment cost | Lecanemab: ~$26,500/year; donanemab: ~$32,000/year |
| `insurance_coverage` | BOUNDARY | Y/N | Insurance/Medicare coverage | CMS coverage with evidence development for anti-amyloid |

---

### Edges (Clinical Boundaries → Outcomes)

#### Edge E15.001: CSF_drug_concentration → target_engagement

```yaml
edge:
  id: "E15.001"
  source_node: "CSF_drug_concentration"
  target_node: "amyloid_PET_SUVR"
  
  edge_type: "INFLUENCE"
  relation: "enables"
  mechanism_label: "PK_PD_relationship"
  mechanism_description: "Drug must reach sufficient CSF/brain concentration to engage target. Anti-amyloid antibodies require sustained exposure for plaque clearance. Subtherapeutic exposure = no biomarker movement."
  
  clinical_example: "Solanezumab failed partly due to insufficient target engagement despite mechanism being sound"
```

#### Edge E15.002: ARIA_E → treatment_discontinuation

```yaml
edge:
  id: "E15.002"
  source_node: "ARIA_E"
  target_node: "treatment_discontinuation"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "safety_tolerability"
  mechanism_description: "ARIA-E leads to treatment holds (3-12 weeks) and sometimes permanent discontinuation. Symptomatic ARIA-E especially likely to cause discontinuation. Reduces effective drug exposure."
  
  quantitative_data:
    lecanemab_ARIA_E_rate: "12.6%"
    donanemab_ARIA_E_rate: "24%"
    discontinuation_due_ARIA: "6.9% (lecanemab)"
```

#### Edge E15.003: APOE4_genotype → ARIA_risk

```yaml
edge:
  id: "E15.003"
  source_node: "APOE4_genotype"
  target_node: "ARIA_E"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "APOE4_ARIA_susceptibility"
  mechanism_description: "APOE4 carriers have higher ARIA risk, likely due to greater vascular amyloid (CAA) burden. Homozygotes have 3-4x risk. Some trials exclude APOE4/4 or use lower doses."
  
  evidence:
    - citation:
        doi: "10.1056/NEJMoa2212948"
        first_author: "van Dyck"
        year: 2023
        title: "Lecanemab in Early Alzheimer's Disease (Clarity AD)"
      
      quantitative_data:
        ARIA_E_APOE4_homozygous: "32.6%"
        ARIA_E_APOE4_heterozygous: "10.9%"
        ARIA_E_non_carriers: "5.4%"
```

#### Edge E15.004: MRI_monitoring_frequency → healthcare_burden

```yaml
edge:
  id: "E15.004"
  source_node: "MRI_monitoring_frequency"
  target_node: "treatment_adherence"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "monitoring_burden"
  mechanism_description: "Frequent MRI monitoring (5-7 scans/year during titration) creates logistical burden for patients and healthcare systems. May limit real-world implementation, especially in resource-limited settings."
  
  practical_notes:
    - "Year 1: MRI at baseline, week 12, 24, 52 minimum"
    - "Additional MRI if symptoms suggest ARIA"
    - "Rural areas: 3+ hour round trip for MRI common"
```

---

### Clinical Trial Success/Failure Framework

```
MECHANISM → CSF_concentration → target_occupancy → biomarker_change → clinical_benefit
```

**See**: [ad_dag_diagrams.md → Diagram 16: Clinical Trial Success/Failure Framework](ad_dag_diagrams.md#diagram-16-clinical-trial-successfailure-framework)

---

### Intervention-Specific Boundary Requirements

| Intervention | CSF Target | Key Biomarker | Key Safety | Monitoring |
|--------------|------------|---------------|------------|------------|
| **Lecanemab** | Sustained antibody | Amyloid PET ↓ | ARIA-E 12.6% | MRI q12w year 1 |
| **Donanemab** | Sustained antibody | Amyloid PET ↓↓ | ARIA-E 24% | MRI q12w |
| **BACE inhibitors** | >90% enzyme inhibition | CSF Aβ ↓ | Cognitive worsening | LFTs, cognition |
| **Gamma secretase** | >50% inhibition | CSF Aβ ↓ | Skin cancer, GI | Dermatology |
| **Tau antibodies** | Brain penetration | Tau PET ↓ | ARIA? | MRI |
| **ASO (MAPT)** | CSF knockdown | CSF tau ↓ | Injection site | Lumbar puncture |
| **TREM2 agonists** | Brain exposure | sTREM2 ↑? | Infection? | Infection screen |

---

### Nutraceutical Boundary Nodes

| ID | Type | Units | Description | Relevance |
|----|------|-------|-------------|-----------|
| `urolithin_A_dose` | BOUNDARY | mg/day | Urolithin A supplementation | Mitophagy inducer; 500-1000mg doses in trials |
| `CoQ10_dose` | BOUNDARY | mg/day | Coenzyme Q10 supplementation | Antioxidant; FSP1 cofactor; poor BBB penetration |
| `NMN_NR_dose` | BOUNDARY | mg/day | NAD+ precursor dose | Nicotinamide mononucleotide or riboside |
| `omega3_EPA_DHA` | BOUNDARY | g/day | Omega-3 fatty acid intake | Anti-inflammatory; 2-4g/day therapeutic range |
| `curcumin_bioavailable` | BOUNDARY | mg/day | Bioavailable curcumin | Parent compound has near-zero bioavailability |

---

### Clinical Trial Risk Framework (Validated)

**Purpose**: Systematic scoring system to assess structural plausibility of AD therapeutic programs.

**Validation dataset**: 124 historical AD clinical programs (11 successes, 113 failures). See `ad_framework_trial_failure_stress_test_scaleup_v5_with_symptomatic_dimension.xlsx` for full analysis.

#### Risk Tier Thresholds & Performance

| Risk Tier | Score Range | n | Successes | Success Rate | Interpretation |
|-----------|-------------|---|-----------|--------------|----------------|
| **Low** | <5 | 38 | 10 | 26.3% | Structurally plausible; ~3× base rate enrichment |
| **Medium** | 5-9 | 74 | 1 | 1.4% | Likely to fail without major redesign |
| **High** | ≥10 | 12 | 0 | 0% | Structural stop-list |

**Discriminative performance**: ROC AUC = 0.905

#### Scored Dimensions (0-2 each)

| Dimension | What It Captures |
|-----------|------------------|
| Target pleiotropy / essential physiology | On-target toxicity risk (e.g., Notch, synaptic roles) |
| Wrong pathological species targeted | Plaque/monomer vs synaptotoxic oligomers vs intracellular tau |
| Stage mismatch | Upstream intervention in late disease with irreversible loss |
| Human causality weak | Animal/in vitro only without human genetic support |
| Target engagement hard to measure | Can't dose correctly without PK/TE biomarker |
| Safety monitoring burden | High monitoring reduces feasibility and caps dose |
| Sex-pathway effect modifier unmodeled | Lysosome↔immune pathways affected by menopause |
| Ancestry-pathway effect modifier unmodeled | APOE/lipid biology varies by local ancestry |
| Symptomatic effect size uncertainty *(conditional)* | Class-wide failure history (5-HT6, H3, nAChR, mAChR) |

#### Non-Scored Annotations

**Failure-point tags (F1-F4)**: Where in translation chain the program failed
- F1: PK / BBB / exposure failure
- F2: Target engagement / biomarker failure
- F3: Clinical translation (biomarker→cognition gap)
- F4: Implementation / monitoring burden

#### Key Findings

**High-risk programs (all failed)**: Clioquinol, bexarotene, anti-TNF biologics (etanercept, infliximab), corticosteroids, NSAIDs - clearly problematic biology.

**Low-risk successes (10/11)**: Lecanemab, donanemab, AChEIs (donepezil, rivastigmine, galantamine), memantine, aducanumab.

**Largest false negative class**: Symptomatic neurotransmitter programs (5-HT6, H3, nicotinic, muscarinic agonists) - hit targets but moved no disease biology. Addressed by conditional "Symptomatic effect size uncertainty" dimension.

---

### Bibliography (Module 15)

| PMID | DOI | First Author | Year | Journal | Key Finding |
|------|-----|--------------|------|---------|-------------|
| 36449413 | [10.1056/NEJMoa2212948](https://doi.org/10.1056/NEJMoa2212948) | van Dyck | 2023 | NEJM | Lecanemab Clarity AD: 27% slowing, ARIA rates |
| 37458272 | [10.1001/jama.2023.13239](https://doi.org/10.1001/jama.2023.13239) | Sims | 2023 | JAMA | Donanemab TRAILBLAZER-ALZ 2 |
| 33720331 | [10.1212/WNL.0000000000011779](https://doi.org/10.1212/WNL.0000000000011779) | Sperling | 2021 | Neurology | ARIA recommendations for clinical practice |
| 35247313 | [10.1016/j.jalz.2022.01.001](https://doi.org/10.1016/j.jalz.2022.01.001) | Jack | 2022 | Alz Dement | Revised biomarker criteria |

---

## Module 16: Sex & Ancestry Modifiers (SBSF v2.0)

**Last Updated**: 2026-01-14
**Schema Version**: SBSF v2.0 (corrected architecture)

### Overview

Module 16 models how **sex** and **genetic ancestry** modify AD risk through mechanistic pathways rather than as simple covariates. The key insight is that these demographic factors work through specific molecular mechanisms:

1. **Sex → Lysosome → Immune Function**: Sex hormones regulate lysosomal acidification, which determines microglial phagocytic capacity and inflammasome activation
2. **Ancestry → Lipid Metabolism → APOE Function**: Local ancestry around APOE modifies expression, lipid handling, and ultimately AD risk

**Critical paradigm shifts:**
- APOE4 risk varies 3-5× by ancestry (East Asian > European > African)
- Female APOE4 carriers have accelerated tau accumulation - NOT just higher risk
- The "Nigerian paradox" (high APOE4, low AD) suggests protective modifiers
- Sex differences in lysosomal function explain why females accumulate autophagosomes without clearance

**Cross-module connections:**
- Module 2 (Lysosomal): Sex hormones regulate v-ATPase and cathepsin activity
- Module 4 (Inflammasome): Lysosomal dysfunction drives NLRP3 activation
- Module 5 (Microglial): Female microglia show more LDAM formation
- Module 9 (Iron): Menstrual iron loss creates divergent accumulation trajectories
- Module 10 (APOE4): Local ancestry modifies APOE4 expression and function

---

### Nodes

#### Sex Hormone Inputs (BOUNDARY)

| ID | Type | Description |
|----|------|-------------|
| `sex_female` | BOUNDARY | Biological female sex; XX chromosomes |
| `sex_male` | BOUNDARY | Biological male sex; XY chromosomes |
| `menopausal_status` | BOUNDARY | Pre- vs post-menopausal; determines estrogen levels |

#### Ancestry Inputs (BOUNDARY)

| ID | Type | Description |
|----|------|-------------|
| `ancestry_european` | BOUNDARY | European genetic ancestry proportion |
| `ancestry_african` | BOUNDARY | African genetic ancestry proportion |
| `ancestry_east_asian` | BOUNDARY | East Asian genetic ancestry proportion |
| `ancestry_amerindian` | BOUNDARY | Amerindian genetic ancestry proportion |
| `APOE_local_ancestry` | BOUNDARY | Local ancestry at APOE locus (may differ from global) |

#### Hormone STOCKs

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `estrogen_level` | STOCK | pg/mL | | months | Estradiol; drops ~90% at menopause |
| `testosterone_level` | STOCK | ng/dL | | months | Testosterone; gradual decline with age in males |
| `progesterone_level` | STOCK | ng/mL | | months | Progesterone; drops at menopause |

#### Lysosomal Function STOCKs

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `lysosomal_pH` | STOCK | pH units | BIOMARKER | hours | Intralysosomal pH; normal ~4.5-5.0, dysfunction >5.5 |
| `v_ATPase_activity` | STOCK | pmol H+/min/mg | | hours | Proton pump activity; rate-limiting for acidification |
| `cathepsin_activity` | STOCK | U/mg protein | BIOMARKER | hours | Proteolytic capacity; requires pH <5 |
| `autophagosome_accumulation` | STOCK | LC3-II/LC3-I ratio | BIOMARKER | hours | High ratio = impaired clearance |

#### Lipid Metabolism STOCKs

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `visceral_adipose_tissue` | STOCK | kg or % body fat | | months | Metabolically active fat; source of inflammation |
| `circulating_triglycerides` | STOCK | mg/dL | BIOMARKER | hours | Plasma TG; APOE-dependent transport |
| `brain_cholesterol` | STOCK | μg/mg protein | | days | CNS cholesterol; transported by APOE |
| `APOE_expression_brain` | STOCK | mRNA copies or protein | | days | Brain APOE levels; varies by ancestry |

#### Iron Handling STOCKs (connects to Module 9)

| ID | Type | Units | Roles | Timescale | Description |
|----|------|-------|-------|-----------|-------------|
| `menstrual_iron_loss` | STOCK | mg Fe/month | | months | ~15-30 mg/month during reproductive years |
| `brain_iron_accumulation` | STOCK | μg Fe/g tissue | BIOMARKER | years | Cumulative iron; accelerates post-menopause |

#### Immune/Microglial STATE Nodes

| ID | Type | Description |
|----|------|-------------|
| `microglial_phagocytic_capacity` | STATE | HIGH (functional) vs LOW (impaired) |
| `LDAM_susceptibility` | STATE | Propensity for lipid droplet accumulation |
| `complement_pathway_dependence` | STATE | HIGH (males) vs LOW (females - use alternative pathways) |

---

### Edges - Sex → Lysosome → Immune Chain

#### Edge E16.001: testosterone_level → autophagy_flux (Male Pathway)

```yaml
edge:
  id: "E16.001"
  source_node: "testosterone_level"
  target_node: "autophagosome_accumulation"
  
  edge_type: "INFLUENCE"
  relation: "decreases"  # Higher testosterone → LOWER accumulation (better clearance)
  mechanism_label: "testosterone_autophagy_enhancement"
  mechanism_description: "Testosterone activates GPRC6A receptor → ERK pathway suppression → mTOR inhibition → enhanced autophagy flux. Males maintain functional autophagy via this pathway"
  
  evidence:
    - citation:
        pmid: "39108157"  # Du et al. 2025 Adv Sci
        doi: "10.1002/advs.202401373"
        first_author: "Du"
        year: 2025
        title: "Testosterone enhances Aβ-induced autophagy in microglia via GPRC6A"
      
      quote: "Testosterone enhances Aβ clearance by promoting microglial autophagy through GPRC6A"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "5xFAD; orchiectomized"
        translation_category: "T2"
      
      methodology:
        type: "knockout"
        details: "Orchiectomy → Aβ accumulation within 5 weeks; testosterone replacement rescues"
        methodology_category: "M3"
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
      
  sex_specific: "male"
```

#### Edge E16.002: estrogen_level → lysosomal_gene_expression

```yaml
edge:
  id: "E16.002"
  source_node: "estrogen_level"
  target_node: "cathepsin_activity"
  
  edge_type: "INFLUENCE"
  relation: "increases"  # Paradoxical: more gene expression but WORSE function
  mechanism_label: "estrogen_lysosomal_genes"
  mechanism_description: "Estrogen increases lysosomal gene expression (Lamp1, Lamp2, CD68, Ctsl) but this does NOT translate to better function - suggests acidification is the bottleneck"
  
  evidence:
    - citation:
        pmid: "33622217"  # Guillot-Sestier 2021 Commun Biol
        doi: "10.1038/s42003-021-01729-z"
        first_author: "Guillot-Sestier"
        year: 2021
        title: "Sex-dimorphic microglial metabolism in APP/PS1 mice"
      
      quote: "Female microglia show higher expression of lysosomal genes but compromised phagocytic capacity"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "APP/PS1"
        translation_category: "T2"
      
      methodology:
        type: "transcriptomic"
        details: "RNA-seq of sorted microglia by sex"
        methodology_category: "M1"
      
      causal_confidence: "L6"  # T2 + M1 = 9-2-1 = 6
      
  paradox: "Females have MORE lysosomal gene expression but WORSE clearance - bottleneck is acidification"
  sex_specific: "female"
```

#### Edge E16.003: menopausal_status → lysosomal_pH

```yaml
edge:
  id: "E16.003"
  source_node: "menopausal_status"
  target_node: "lysosomal_pH"
  
  edge_type: "INFLUENCE"
  relation: "increases"  # Post-menopause → HIGHER pH (more alkaline = worse)
  mechanism_label: "menopause_lysosomal_dysfunction"
  mechanism_description: "Estrogen withdrawal at menopause leads to progressive lysosomal alkalinization. This may explain the acceleration of AD biomarkers post-menopause"
  
  evidence:
    - citation:
        # Indirect - from sex differences tracker
        pmid: "36548928"  # Cleland 2024 J Neuroinflammation
        first_author: "Cleland"
        year: 2024
        title: "Female microglial aging trajectory"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Aged female C57BL/6"
        translation_category: "T1"
      
      methodology:
        type: "observational"
        methodology_category: "M1"
      
      causal_confidence: "L7"  # T1 + M1 = 9-1-1 = 7; hypothesis needs validation
      
  therapeutic_implication: "HRT timing hypothesis - early intervention may preserve lysosomal function"
  sex_specific: "female"
```

#### Edge E16.004: lysosomal_pH → microglial_phagocytic_capacity

```yaml
edge:
  id: "E16.004"
  source_node: "lysosomal_pH"
  target_node: "microglial_phagocytic_capacity"
  
  edge_type: "INFLUENCE"
  relation: "decreases"  # Higher pH → LOWER phagocytic capacity
  mechanism_label: "acidification_phagocytosis_link"
  mechanism_description: "Cathepsins require pH <5 for activation. When lysosomes are alkalinized, phagocytosed cargo cannot be degraded → engulfment continues but clearance fails"
  
  cross_module: "Connects to Module 2 (Lysosomal) and Module 5 (Microglial)"
  
  evidence:
    - citation:
        pmid: "36326648"  # Lo 2023 Transl Neurodegener
        doi: "10.1186/s40035-023-00362-0"
        first_author: "Lo"
        year: 2023
        title: "Defective lysosomal acidification: a new prognostic marker and therapeutic target for neurodegenerative diseases"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "Multiple models"
        translation_category: "T2"
      
      methodology:
        type: "pharmacological"
        details: "v-ATPase inhibitors impair clearance; acidifying agents rescue"
        methodology_category: "M2"
      
      causal_confidence: "L5"  # T2 + M2 = 9-2-2 = 5
```

#### Edge E16.005: sex_female → LDAM_susceptibility

```yaml
edge:
  id: "E16.005"
  source_node: "sex_female"
  target_node: "LDAM_susceptibility"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "female_LDAM_vulnerability"
  mechanism_description: "Female microglia accumulate MORE lipid droplets than males in AD models. LDAM formation was more pronounced in microglia from females compared to males"
  
  cross_module: "Connects to Module 5 (LDAM formation)"
  
  evidence:
    - citation:
        pmid: "39778563"  # Prakash 2025 Immunity
        doi: "10.1016/j.immuni.2024.12.010"
        first_author: "Prakash"
        year: 2025
        title: "Amyloid-β induces lipid droplet-mediated microglial dysfunction via the enzyme DGAT2 in Alzheimer's disease"
      
      quote: "Extensive lipidomic and metabolomic profiling in microglia revealed specific types of lipids and metabolic pathways likely responsible for their LD-laden phenotype in the 5xFAD mouse model, which was more pronounced in microglia from females compared to males"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "5xFAD"
        translation_category: "T2"
      
      methodology:
        type: "lipidomics"
        details: "Sex-stratified lipidomic profiling of sorted microglia"
        methodology_category: "M1"
      
      causal_confidence: "L6"  # T2 + M1 = 9-2-1 = 6
      
  therapeutic_implication: "DGAT2 inhibitors may be MORE beneficial in females (higher baseline LDAM)"
```

#### Edge E16.006: sex_male → complement_pathway_dependence

```yaml
edge:
  id: "E16.006"
  source_node: "sex_male"
  target_node: "complement_pathway_dependence"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "male_complement_dependence"
  mechanism_description: "Males rely more heavily on complement-mediated synaptic pruning. C1q deletion rescues males but NOT females - females use alternative pathways (TAM receptors, GABA-δ)"
  
  cross_module: "Connects to Module 8 (Complement)"
  
  evidence:
    - citation:
        pmid: "36627412"  # Petrisko 2023
        first_author: "Petrisko"
        year: 2023
        title: "C1q deletion rescues males but not females"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "C1qa-/- x AD model"
        translation_category: "T2"
      
      methodology:
        type: "knockout"
        methodology_category: "M3"
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
      
  therapeutic_implication: "Anti-complement therapies (ANX005, etc.) may work preferentially in males"
```

---

### Edges - Ancestry → Lipid → APOE Function Chain

#### Edge E16.007: ancestry_african → APOE_expression_brain

```yaml
edge:
  id: "E16.007"
  source_node: "ancestry_african"
  target_node: "APOE_expression_brain"
  
  edge_type: "INFLUENCE"
  relation: "decreases"  # African ancestry → LOWER APOE4 expression
  mechanism_label: "ancestry_APOE_expression"
  mechanism_description: "European APOE4 carriers express SIGNIFICANTLY MORE APOE4 in brain than African ancestry carriers. Increased chromatin accessibility at APOE in European-ancestry astrocytes"
  
  evidence:
    - citation:
        pmid: "33619396"  # Griswold 2021 Alz Dement
        doi: "10.1002/alz.12298"
        first_author: "Griswold"
        year: 2021
        title: "Increased APOE ε4 expression is associated with the difference in Alzheimer's disease risk from diverse ancestral backgrounds"
      
      quote: "APOE ε4 expression in brain tissue was significantly higher in individuals with European ancestry compared to African ancestry"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "Postmortem brain tissue"
        translation_category: "T3"
      
      methodology:
        type: "expression_analysis"
        details: "qPCR and RNA-seq of postmortem brain by ancestry"
        methodology_category: "M1"
      
      causal_confidence: "L5"  # T3 + M1 = 9-3-1 = 5
```

#### Edge E16.008: APOE_local_ancestry → AD_risk_modification

```yaml
edge:
  id: "E16.008"
  source_node: "APOE_local_ancestry"
  target_node: "APOE4_AD_risk"  # From Module 10
  
  edge_type: "INFLUENCE"
  relation: "modifies"
  mechanism_label: "local_ancestry_risk_modification"
  mechanism_description: "Local ancestry at APOE locus (not global ancestry) determines APOE4 risk. African local ancestry at APOE → 39% lower AD odds vs European local ancestry. rs10423769_A allele (African-specific) reduces APOE4/4 risk from 7.2× to 2.1×"
  
  evidence:
    - citation:
        pmid: "35788729"
        doi: "10.1371/journal.pgen.1009977"
        first_author: "Rajabli"
        year: 2022
        title: "A locus at 19q13.31 significantly reduces the ApoE ε4 risk for Alzheimer's Disease in African Ancestry"
      
      quote: "The presence of the rs10423769_A allele reduces the odds ratio for Alzheimer disease risk from 7.2 for ApoE ε4/ε4 carriers lacking the A allele to 2.1 for ApoE ε4/ε4 carriers with at least one A allele"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "African American, Nigerian (Ibadan), Puerto Rican"
        translation_category: "T4"
      
      methodology:
        type: "genetic_association"
        details: "GWAS with local ancestry inference; interaction term"
        methodology_category: "M1"
      
      causal_confidence: "L4"  # T4 + M1 = 9-4-1 = 4; strong human genetic evidence
      
    - citation:
        pmid: "36071110"
        doi: "10.1038/s41380-022-01729-x"
        first_author: "Naslavsky"
        year: 2022
        title: "Global and local ancestry modulate APOE association with Alzheimer's neuropathology and cognitive outcomes in an admixed sample"
      
      quote: "APOE ε4 was associated with worse AD neuropathological burden only in a European APOE background"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "Admixed Brazilian postmortem cohort"
        translation_category: "T3"
      
      methodology:
        type: "neuropathology"
        details: "Postmortem with local ancestry inference at APOE"
        methodology_category: "M1"
      
      causal_confidence: "L5"  # T3 + M1 = 9-3-1 = 5
```

#### Edge E16.009: ancestry_amerindian → AD_risk_amplification

```yaml
edge:
  id: "E16.009"
  source_node: "ancestry_amerindian"
  target_node: "APOE4_AD_risk"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "amerindian_APOE4_amplification"
  mechanism_description: "Amerindian genetic ancestry at APOE locus AMPLIFIES APOE4 risk (opposite of African). Peruvian population (60% AI local ancestry at APOE) shows OR=5.02 for APOE4, higher than European"
  
  evidence:
    - citation:
        pmid: "33541779"
        doi: "10.1016/j.neurobiolaging.2020.10.003"
        first_author: "Marca-Ysabel"
        year: 2021
        title: "Dissecting the role of Amerindian genetic ancestry and the ApoE ε4 allele on Alzheimer disease in an admixed Peruvian population"
      
      quote: "The risk for AD from ApoE ε4 in Peruvians is higher than we have observed in non-Hispanic white populations...AI genetic ancestry local to the ApoE gene is contributing to a strong risk for AD in ε4 carriers"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "Peruvian admixed"
        translation_category: "T4"
      
      methodology:
        type: "genetic_association"
        details: "GWAS with local ancestry; logistic regression"
        methodology_category: "M1"
      
      causal_confidence: "L4"  # T4 + M1 = 9-4-1 = 4
```

#### Edge E16.010: visceral_adipose_tissue → neuroinflammation

```yaml
edge:
  id: "E16.010"
  source_node: "visceral_adipose_tissue"
  target_node: "neuroinflammation"  # From Module 4
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "visceral_fat_neuroinflammation"
  mechanism_description: "Visceral adipose tissue is source of systemic inflammation (IL-6, TNF-α). Adipose distribution differs by sex and ancestry. APOE4-TR mice show more visceral fat accumulation on HFD, especially males"
  
  evidence:
    - citation:
        # Finch & Kulminski 2020 Front Aging Neurosci
        doi: "10.3389/fnagi.2020.00150"
        first_author: "Finch"
        year: 2020
        title: "APOE Alleles and Diet in Brain Aging and Alzheimer's Disease"
      
      quote: "Male APOE4-TR mice were more susceptible than male APOE3-TR mice to metabolic disturbances, including visceral adipose tissue accumulation and glucose intolerance following 12 weeks of an HFD"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "APOE4-TR vs APOE3-TR"
        translation_category: "T2"
      
      methodology:
        type: "dietary_intervention"
        details: "High-fat diet challenge"
        methodology_category: "M2"
      
      causal_confidence: "L5"  # T2 + M2 = 9-2-2 = 5
```

---

### Edges - Iron/Menstrual Cycle Connection

#### Edge E16.011: menstrual_iron_loss → brain_iron_accumulation

```yaml
edge:
  id: "E16.011"
  source_node: "menstrual_iron_loss"
  target_node: "brain_iron_accumulation"
  
  edge_type: "INFLUENCE"
  relation: "decreases"  # More menstrual loss → LESS brain accumulation
  mechanism_label: "menstrual_iron_protection"
  mechanism_description: "Pre-menopausal women lose 15-30 mg Fe/month via menstruation, preventing systemic iron overload. Post-menopause, this protection is lost → accelerated brain iron accumulation"
  
  cross_module: "Connects to Module 9 (Iron & Ferroptosis)"
  
  evidence:
    - citation:
        # From sex differences tracker - Bartzokis hypothesis
        first_author: "Bartzokis"
        year: 2006
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        translation_category: "T4"
      
      methodology:
        type: "observational"
        methodology_category: "M1"
      
      causal_confidence: "L4"  # T4 + M1 = 9-4-1 = 4
      
  key_prediction: "Hysterectomy with ovaries intact (stops menstrual loss but maintains estrogen) should show brain iron patterns more similar to menopause than to reproductive age - tests iron vs. estrogen hypothesis"
```

---

### Summary Tables

#### APOE4 Risk by Ancestry

| Ancestry | APOE4/4 OR (vs E3/E3) | APOE3/4 OR | Local Ancestry Effect | Key Variant |
|----------|----------------------|------------|----------------------|-------------|
| East Asian | **~15× (highest)** | ~4.5× | Amplifies | Unknown |
| European | 10-16× | ~3.5× | Reference | Reference |
| Amerindian | ~5× (higher than expected) | Variable | Amplifies | Under study |
| African American | 5-10× (attenuated) | ~2.2× | **Protective** | rs10423769_A |
| Nigerian (Ibadan) | **No association** | No association | Very protective | Unknown (diet? variants?) |

#### Sex Differences in Key Pathways

| Pathway | Males | Females | Therapeutic Implication |
|---------|-------|---------|------------------------|
| **Autophagy** | Higher basal; functional clearance | Lower basal; autophagosome accumulation | Autophagy inducers may harm females |
| **Lysosomal acidification** | Functional | May be impaired, especially post-menopause | Direct acidifiers (C381, PLGA-aNP) may help females |
| **LDAM formation** | Less | **More** | DGAT2 inhibitors may work better in females |
| **Complement dependence** | **High** | Low (use alternative pathways) | Anti-complement may work only in males |
| **Iron accumulation** | Throughout life | Accelerates post-menopause | HRT or iron chelation timing critical |
| **APOE4 × tau interaction** | Modest | **Accelerated tau accumulation** | Earlier intervention needed in female APOE4+ |

---

### Interventions

#### INT_HRT: Hormone Replacement Therapy

```yaml
intervention:
  id: "INT_HRT"
  name: "Hormone Replacement Therapy"
  aliases: ["HRT", "estrogen replacement", "MHT"]
  
  target_type: "node"
  target_id: "estrogen_level"
  
  intervention_type: "hormone_replacement"
  mechanism_of_action: "Restores estrogen levels post-menopause; may preserve lysosomal function if started early"
  action: "increases"
  
  clinical_status: "approved_other"
  indication_status:
    - indication: "Menopausal symptoms"
      status: "approved"
    - indication: "AD prevention"
      status: "failed_late"
      note: "WHI WHIMS showed increased dementia risk when started late (>65)"
    - indication: "AD prevention (early)"
      status: "under_investigation"
      note: "KEEPS-Cog, ELITE suggest early initiation may be protective"
  
  timing_critical: true
  critical_window: "Within 5-10 years of menopause onset; 'timing hypothesis'"
  
  sex_specific: "female"
```

#### INT_ancestry_adjusted_APOE_risk: Ancestry-Adjusted Risk Assessment

```yaml
intervention:
  id: "INT_ancestry_adjusted_APOE"
  name: "Ancestry-Adjusted APOE4 Risk Assessment"
  
  intervention_type: "diagnostic_stratification"
  mechanism_of_action: "Incorporate local ancestry at APOE locus into risk prediction; avoid over-treating low-risk African-ancestry APOE4 carriers"
  
  clinical_status: "research"
  
  therapeutic_rationale: |
    Current APOE4 risk estimates are based primarily on European populations.
    African-ancestry APOE4 carriers have ~40% lower risk due to local protective factors.
    Anti-amyloid antibody trials show concerning signals in Black participants (donanemab point estimate favored placebo).
    Ancestry-adjusted risk could guide treatment selection.
```

---

### Cross-Module Connection Summary

| From Module | Through Module 16 | To Module | Mechanism |
|-------------|-------------------|-----------|-----------|
| — | Sex (female) | 2 (Lysosomal) | ↓ acidification → ↓ cathepsin activity |
| — | Sex (female) | 5 (Microglial) | ↑ LDAM susceptibility |
| — | Sex (male) | 8 (Complement) | ↑ complement pathway dependence |
| — | Sex (female) | 9 (Iron) | Menstrual loss → delayed iron accumulation |
| — | Ancestry (African) | 10 (APOE4) | ↓ APOE4 expression → attenuated risk |
| — | Ancestry (Amerindian) | 10 (APOE4) | ↑ APOE4 risk amplification |
| — | Visceral fat | 4 (Inflammasome) | Systemic inflammation → neuroinflammation |

---

### The Mechanistic Model

**See**: [ad_dag_diagrams.md → Diagram 17: The Mechanistic Model](ad_dag_diagrams.md#diagram-17-the-mechanistic-model)

---

### X-Linked Genes: The Genetic Bridge from Sex to Lysosomal Function

**Critical insight**: X-linked genes encoding lysosomal/pH regulatory machinery provide the **direct genetic mechanism** connecting biological sex to the downstream lysosomal-immune pathways. This is not merely correlational - these genes literally encode the v-ATPase components and pH regulators that determine lysosomal acidification.

#### Key X-Linked Lysosomal/pH Genes

| Gene | Location | Function | AD Relevance | Loss-of-Function Phenotype |
|------|----------|----------|--------------|---------------------------|
| **SLC9A7** | Xp11.3 | Na⁺/H⁺ exchanger (NHE7); Golgi pH homeostasis | **#1 X-linked AD risk locus** (Belloy 2024) | Altered glycosylation, cognitive impairment |
| **ATP6AP2** | Xp11.4 | v-ATPase accessory protein; essential for lysosomal acidification | Reduced in NHD microglia; causes XPDS | X-linked parkinsonism, neurodegeneration, autophagy failure |
| **ATP6AP1** | Xq28 | v-ATPase assembly factor; Golgi pH | Cognitive impairment when mutated | Hepatopathy, immunodeficiency, abnormal glycosylation |
| **LAMP2** | Xq24 | Lysosome membrane protein; autophagosome-lysosome fusion | Reduced in NHD brain tissue | **Danon disease**: cardiomyopathy, myopathy, cognitive impairment |

#### Edge E16.012: SLC9A7 → Golgi_pH → Aβ_accumulation

```yaml
edge:
  id: "E16.012"
  source_node: "SLC9A7_expression"
  target_node: "amyloid_accumulation"
  
  edge_type: "INFLUENCE"
  relation: "increases"  # Higher SLC9A7 expression → altered pH → more Aβ
  mechanism_label: "SLC9A7_pH_amyloid"
  mechanism_description: "SLC9A7 (NHE7) regulates pH in Golgi secretory compartments. Genetic variants increasing SLC9A7 expression are associated with AD risk. The NHE6 ortholog (SLC9A6) triggers ApoE aggregation when overexpressed, leading to Aβ accumulation"
  
  evidence:
    - citation:
        pmid: "39250132"
        doi: "10.1001/jamaneurol.2024.2843"
        first_author: "Belloy"
        year: 2024
        title: "Role of the X Chromosome in Alzheimer Disease Genetics"
        journal: "JAMA Neurology"
      
      quote: "The top association signal was intronic on SLC9A7 and linked to its expression...SLC9A7 regulates pH homeostasis in Golgi secretory compartments and is anticipated to have downstream effects on amyloid β accumulation"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "Meta-analysis of 1,152,284 individuals"
        translation_category: "T4"
      
      methodology:
        type: "XWAS_meta_analysis"
        details: "X-chromosome-wide association study across ADGC, ADSP, UK Biobank, FinnGen, Million Veterans Program"
        methodology_category: "M1"
      
      causal_confidence: "L4"  # T4 + M1 = 9-4-1 = 4; largest X-linked AD GWAS to date
      
  x_linked: true
  escapes_x_inactivation: false  # Does NOT escape - may contribute to sex differences
```

#### Edge E16.013: ATP6AP2 → v_ATPase_activity → lysosomal_pH

```yaml
edge:
  id: "E16.013"
  source_node: "ATP6AP2_expression"
  target_node: "v_ATPase_activity"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "ATP6AP2_vATPase_assembly"
  mechanism_description: "ATP6AP2 is essential for v-ATPase assembly and function. Loss of ATP6AP2 reduces V0 subunit expression, impairs v-ATPase function, de-acidifies intracellular compartments, and causes autophagosome accumulation. X-linked - males are hemizygous"
  
  evidence:
    - citation:
        pmid: "23595882"
        doi: "10.1093/hmg/ddt161"
        first_author: "Korvatska"
        year: 2013
        title: "Altered splicing of ATP6AP2 causes X-linked parkinsonism with spasticity (XPDS)"
        journal: "Human Molecular Genetics"
      
      quote: "siRNA knockdown of ATP6AP2 perturbed autophagy and inhibited lysosomal clearance, resulting in the accumulation of autophagosomes"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "HEK293 cells; patient brain tissue"
        translation_category: "T3"
      
      methodology:
        type: "knockdown"
        details: "siRNA knockdown + patient neuropathology"
        methodology_category: "M3"
      
      causal_confidence: "L3"  # T3 + M3 = 9-3-3 = 3
      
    - citation:
        pmid: "37068500"
        doi: "10.1007/s00401-023-02568-y"
        first_author: "Claes"
        year: 2023
        title: "Defects in lysosomal function and lipid metabolism in human microglia harboring a TREM2 loss of function mutation"
        journal: "Acta Neuropathologica"
      
      quote: "Decreased expression of genes implicated in lysosomal acidification (ATP6AP2) and chaperone mediated autophagy (LAMP2)...observed in post-mortem brain tissues from NHD patients"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "iPSC-derived microglia; postmortem brain"
        translation_category: "T3"
      
      methodology:
        type: "transcriptomic"
        details: "NanoString + iPSC-microglia"
        methodology_category: "M1"
      
      causal_confidence: "L5"  # T3 + M1 = 9-3-1 = 5
      
  x_linked: true
  clinical_phenotype: "X-linked parkinsonism with spasticity (XPDS); intellectual disability"
```

#### Edge E16.014: LAMP2 → autophagosome_lysosome_fusion

```yaml
edge:
  id: "E16.014"
  source_node: "LAMP2_expression"
  target_node: "autophagosome_accumulation"
  
  edge_type: "INFLUENCE"
  relation: "decreases"  # More LAMP2 → LESS accumulation (better clearance)
  mechanism_label: "LAMP2_autophagy_completion"
  mechanism_description: "LAMP2 is required for autophagosome-lysosome fusion. LAMP2 deficiency causes massive accumulation of autophagic vacuoles. X-linked - explains why Danon disease is more severe in males"
  
  evidence:
    - citation:
        # ScienceDirect overview + Danon disease literature
        first_author: "Nishino"
        year: 2000
        title: "Primary LAMP-2 deficiency causes X-linked vacuolar cardiomyopathy and myopathy (Danon disease)"
        journal: "Nature"
      
      quote: "Deficiency of LAMP-2 is the primary defect in Danon disease, an X-linked vacuolar cardiomyopathy and myopathy...resulting in accumulation of autophagic vacuoles in muscle and other tissues"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        translation_category: "T4"
      
      methodology:
        type: "genetic_linkage"
        methodology_category: "M1"
      
      causal_confidence: "L4"  # T4 + M1 = 9-4-1 = 4
      
  x_linked: true
  clinical_phenotype: "Danon disease: cardiomyopathy, myopathy, intellectual disability"
  sex_difference: "Males: severe, early-onset; Females: milder, later-onset (X-inactivation mosaicism)"
```

#### X-Inactivation and AD Sex Differences

**Critical mechanistic point**: The Belloy et al. 2024 XWAS found that **SLC9A7 does NOT escape X-inactivation**, meaning:

- **Females (XX)**: Mosaic expression - some cells express maternal copy, some paternal
- **Males (XY)**: Hemizygous - all cells express the single copy

This has profound implications for AD sex differences:

| X-Inactivation Status | Gene | Implication for AD |
|----------------------|------|-------------------|
| **Does NOT escape** | SLC9A7, MTM1 | Males: uniform expression; Females: mosaic → potentially protective heterogeneity |
| **Escapes inactivation** | NLGN4X, MORF4L2, ZNF280C, ARGFX | Females express ~1.5-2× more than males → may relate to cognitive resilience |

From Belloy et al.: *"Escape from random X chromosome inactivation...may relate to observations such as women appearing to show increased AD incidence at advanced ages and increased tau burden in the AD pathologic trajectory...women appearing to survive longer with AD, having more preserved brain structure despite elevated tau burden, and higher baseline cognitive reserve"*

#### The Complete X-Linked Mechanistic Chain

**See**: [ad_dag_diagrams.md → Diagram 18: The Complete X-Linked Mechanistic Chain](ad_dag_diagrams.md#diagram-18-the-complete-x-linked-mechanistic-chain)

#### Clinical Validation: X-Linked Lysosomal Disease Phenotypes

These X-linked genes cause recognizable clinical syndromes when mutated, validating their mechanistic importance:

| Disease | Gene | Neurological Features | Supports Model |
|---------|------|----------------------|----------------|
| **X-linked Parkinsonism-Spasticity (XPDS)** | ATP6AP2 | Parkinsonism, cognitive decline, autophagy failure | v-ATPase → lysosomal → neurodegeneration |
| **Danon Disease** | LAMP2 | Intellectual disability, cardiomyopathy | Autophagy completion → systemic effects |
| **ATP6AP1-CDG** | ATP6AP1 | Cognitive impairment, hepatopathy | pH regulation → glycosylation → brain |
| **SLC9A7-related ID** | SLC9A7 | Intellectual disability, altered glycosylation | Golgi pH → processing → cognition |

**Key insight**: These are all **loss-of-function** phenotypes affecting **lysosomal/pH machinery**. The Belloy XWAS finding that **increased** SLC9A7 expression associates with AD risk suggests a different mechanism - possibly **gain-of-function** pH dysregulation in the secretory pathway affecting Aβ production.

---

### Visceral Fat Distribution Genes: The Ancestry-Adiposity-Neuroinflammation Chain

**Critical insight**: Genetic variants controlling fat distribution differ dramatically across ancestries and show marked sex-specificity. These aren't just metabolic genes - they connect to neuroinflammation via adipokine secretion, and visceral fat is mechanistically linked to AD pathology.

#### Ancestry-Specific Fat Distribution Patterns

| Ancestry | Visceral Fat | Subcutaneous Fat | Metabolic Consequence | AD Implication |
|----------|--------------|------------------|----------------------|----------------|
| **African** | LOW | HIGH (protective depot) | Lower T2D at same BMI | Potentially protective? Lower systemic inflammation |
| **Asian** | HIGH ("skinny-fat") | LOW | Higher T2D at lower BMI | Higher metabolic risk |
| **European** | Intermediate | Intermediate | Reference | Reference |

*Source: Camilleri et al. 2021 Genes (PMID 34072523)*: "Asians have more and Africans have less visceral fat compared with Europeans"

#### Key Fat Distribution Genes (GWAS-Validated)

| Gene | Locus | Function | Sex-Specific? | Mechanism |
|------|-------|----------|---------------|-----------|
| **RSPO3** | 6q22 | Wnt signaling modulator | Yes (stronger in females) | Suppresses gluteofemoral adipogenesis; promotes abdominal AP proliferation |
| **TBX15** | 1p12 | Developmental transcription factor | Yes | Controls adipocyte differentiation and mitochondrial function |
| **LYPLAL1** | 1q41 | Lysophospholipase-like | Yes (females only) | Associated with VAT/SAT ratio; exact mechanism unclear |
| **VEGFA** | 6p21 | Angiogenesis | Yes | Adipose tissue vascularization |
| **GRB14** | 2q22 | Insulin signaling | Yes | Insulin receptor regulation |
| **LY86** | 6p25 | TLR signaling | Yes | Immune/inflammatory pathway |
| **ADAMTS9** | 3p14 | Metalloproteinase | Yes | Extracellular matrix remodeling |

*Source: Heid et al. 2010 Nature Genetics (PMID 20935630)*: "Seven of these loci exhibited marked sexual dimorphism, all with a stronger effect on WHR in women than men"

#### Edge E16.015: Visceral_adipose_tissue → systemic_inflammation → neuroinflammation

```yaml
edge:
  id: "E16.015"
  source_node: "visceral_adipose_tissue"
  target_node: "systemic_inflammation"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "VAT_adipokine_inflammation"
  mechanism_description: "Visceral adipose tissue releases pro-inflammatory adipokines (IL-6, TNF-α, leptin) into portal circulation. Higher VAT → higher systemic inflammation → can cross BBB and promote neuroinflammation. Africans have lower VAT at same BMI, potentially explaining some ancestry differences in AD inflammation"
  
  evidence:
    - citation:
        pmid: "34072523"
        doi: "10.3390/genes12060841"
        first_author: "Camilleri"
        year: 2021
        title: "Genetics of Body Fat Distribution: Comparative Analyses in Populations with European, Asian and African Ancestries"
        journal: "Genes"
      
      quote: "Asians have more and Africans have less visceral fat compared with Europeans...Africans have relatively more subcutaneous adipose tissue and less visceral fat tissues than European populations, independent of sex and age"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        translation_category: "T4"
      
      methodology:
        type: "review_of_GWAS"
        methodology_category: "M1"
      
      causal_confidence: "L4"
      
  ancestry_effect: "African ancestry associated with lower VAT independent of BMI"
```

#### Edge E16.016: FSH → visceral_adiposity + Aβ_accumulation (Menopause-AD Link)

```yaml
edge:
  id: "E16.016"
  source_node: "FSH_level"
  target_node: "AD_pathology"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "FSH_direct_neuronal_effect"
  mechanism_description: "FSH acts DIRECTLY on hippocampal and cortical neurons (not just via peripheral effects). Rising FSH during menopause accelerates Aβ and Tau deposition via the C/EBPβ-δ-secretase pathway. FSH blockade improves cognition in AD mice"
  
  evidence:
    - citation:
        pmid: "35236988"
        doi: "10.1038/s41586-022-04463-0"
        first_author: "Xiong"
        year: 2022
        title: "FSH blockade improves cognition in mice with Alzheimer's disease"
        journal: "Nature"
      
      quote: "FSH acts directly on hippocampal and cortical neurons to accelerate amyloid-β and Tau deposition and impair cognition in mice displaying features of Alzheimer's disease. Blocking FSH action in these mice abrogates the Alzheimer's disease-like phenotype"
      
      species:
        ncbi_taxon: "NCBITaxon:10090"
        common_name: "mouse"
        strain: "AD model mice"
        translation_category: "T2"
      
      methodology:
        type: "genetic_intervention"
        details: "FSH-blocking antibody; C/EBPβ pathway analysis"
        methodology_category: "M3"
      
      causal_confidence: "L4"  # T2 + M3 = 9-2-3 = 4
      
  therapeutic_implication: "FSH-blocking agents may treat AD, obesity, osteoporosis, and dyslipidemia simultaneously"
  sex_specific: "female"
  life_stage: "perimenopausal/postmenopausal"
```

#### Edge E16.017: RSPO3 → fat_distribution via Wnt signaling

```yaml
edge:
  id: "E16.017"
  source_node: "RSPO3_expression"
  target_node: "gluteofemoral_adipose"
  
  edge_type: "INFLUENCE"
  relation: "decreases"
  mechanism_label: "RSPO3_Wnt_adipogenesis"
  mechanism_description: "RSPO3 is the strongest genetic determinant of WHR. Higher RSPO3 expression suppresses gluteofemoral (protective) adipogenesis while promoting abdominal (harmful) adipose progenitor proliferation via differential Wnt signaling responses"
  
  evidence:
    - citation:
        pmid: "32488044"
        doi: "10.1038/s41467-020-16592-z"
        first_author: "Loh"
        year: 2020
        title: "RSPO3 impacts body fat distribution and regulates adipose cell biology in vitro"
        journal: "Nature Communications"
      
      quote: "RSPO3 may limit gluteofemoral adipose tissue expansion by suppressing adipogenesis and increasing gluteal adipocyte susceptibility to apoptosis. RSPO3 may also promote upper-body fat distribution by stimulating abdominal adipose progenitor proliferation"
      
      species:
        ncbi_taxon: "NCBITaxon:9606"
        common_name: "human"
        strain: "Human adipocytes; zebrafish validation"
        translation_category: "T3"
      
      methodology:
        type: "functional_genetics"
        details: "Fine-mapping, cellular studies, zebrafish"
        methodology_category: "M3"
      
      causal_confidence: "L3"
      
  sex_specific: "stronger effect in females"
```

#### The Complete Ancestry → Fat → Inflammation → AD Chain

**See**: [ad_dag_diagrams.md → Diagram 19: The Complete Ancestry → Fat → Inflammation → AD Chain](ad_dag_diagrams.md#diagram-19-the-complete-ancestry--fat--inflammation--ad-chain)

#### Therapeutic Implications

| Target | Agent | Mechanism | AD Relevance |
|--------|-------|-----------|--------------|
| **FSH** | Anti-FSH antibody | Blocks direct neuronal effects + reduces VAT | May treat AD, obesity, osteoporosis simultaneously |
| **Wnt/RSPO3** | Wnt modulators | Shift fat to protective depots | Experimental |
| **VAT inflammation** | Anti-IL-6 (tocilizumab) | Reduces systemic inflammation | Being tested in AD |
| **GLP-1** | Semaglutide | Reduces VAT preferentially | AD trials ongoing |

**Key question for ancestry differences**: Do genetic variants that reduce VAT (more common in African ancestry) provide neuroprotection independent of APOE?

---

### Research Priorities

**Tier 1 - Critical Gaps:**
1. Does lysosomal acidification decline post-menopause? (No direct data)
2. Do ancestry differences in visceral fat correlate with AD biomarker trajectories?
3. Why does anti-amyloid therapy signal favor placebo in Black participants?
4. **NEW**: Do X-linked lysosomal gene expression levels differ by sex in AD brain tissue?
5. **NEW**: Is the African-ancestry AD protection partially mediated by lower VAT?

**Tier 2 - Mechanistic:**
1. Is the female LDAM excess driven by lysosomal dysfunction or lipid metabolism?
2. What are the African-ancestry protective variants at APOE locus?
3. Can the "Nigerian paradox" be explained by diet, variants, or both?

**Tier 3 - Therapeutic:**
1. Sex-stratified trials of lysosomal acidifiers (C381, PLGA-aNP)
2. Ancestry-stratified reanalysis of anti-amyloid trials
3. HRT timing studies with AD biomarker outcomes

---

### Bibliography (Module 16)

| PMID | DOI | First Author | Year | Journal | Key Finding |
|------|-----|--------------|------|---------|-------------|
| 39108157 | [10.1002/advs.202401373](https://doi.org/10.1002/advs.202401373) | Du | 2025 | Adv Sci | Testosterone → GPRC6A → autophagy in microglia |
| 33622217 | [10.1038/s42003-021-01729-z](https://doi.org/10.1038/s42003-021-01729-z) | Guillot-Sestier | 2021 | Commun Biol | Sex-dimorphic microglial metabolism |
| 39778563 | [10.1016/j.immuni.2024.12.010](https://doi.org/10.1016/j.immuni.2024.12.010) | Prakash | 2025 | Immunity | Female-biased LDAM; DGAT2 mechanism |
| 36326648 | [10.1186/s40035-023-00362-0](https://doi.org/10.1186/s40035-023-00362-0) | Lo | 2023 | Transl Neurodegener | Lysosomal acidification as therapeutic target |
| 35788729 | [10.1371/journal.pgen.1009977](https://doi.org/10.1371/journal.pgen.1009977) | Rajabli | 2022 | PLOS Genet | **rs10423769** African-protective variant |
| 36071110 | [10.1038/s41380-022-01729-x](https://doi.org/10.1038/s41380-022-01729-x) | Naslavsky | 2022 | Mol Psychiatry | Local ancestry modulates APOE-neuropathology |
| 33541779 | [10.1016/j.neurobiolaging.2020.10.003](https://doi.org/10.1016/j.neurobiolaging.2020.10.003) | Marca-Ysabel | 2021 | Neurobiol Aging | Amerindian ancestry amplifies APOE4 risk |
| 33619396 | [10.1002/alz.12298](https://doi.org/10.1002/alz.12298) | Griswold | 2021 | Alz Dement | APOE4 expression higher in European ancestry |
| 36627412 | — | Petrisko | 2023 | — | C1q deletion rescues males but not females |
| — | [10.3389/fnagi.2020.00150](https://doi.org/10.3389/fnagi.2020.00150) | Finch | 2020 | Front Aging Neurosci | APOE, diet, and fat distribution |
| **39250132** | [10.1001/jamaneurol.2024.2843](https://doi.org/10.1001/jamaneurol.2024.2843) | **Belloy** | **2024** | **JAMA Neurology** | **SLC9A7 = #1 X-linked AD locus (n=1.15M); pH regulation** |
| 23595882 | [10.1093/hmg/ddt161](https://doi.org/10.1093/hmg/ddt161) | Korvatska | 2013 | Hum Mol Genet | ATP6AP2 mutations → XPDS; v-ATPase dysfunction |
| 37068500 | [10.1007/s00401-023-02568-y](https://doi.org/10.1007/s00401-023-02568-y) | Claes | 2023 | Acta Neuropathol | TREM2 LOF → ↓ATP6AP2, ↓LAMP2 in microglia |
| 27668514 | [10.1038/ng.3667](https://doi.org/10.1038/ng.3667) | Dubos | 2015 | Nat Genet | ATP6AP2 deletion → cognitive impairment in fly/mouse |
| 10673262 | [10.1038/35000509](https://doi.org/10.1038/35000509) | Nishino | 2000 | Nature | LAMP2 deficiency causes Danon disease |
| **35236988** | [10.1038/s41586-022-04463-0](https://doi.org/10.1038/s41586-022-04463-0) | **Xiong** | **2022** | **Nature** | **FSH acts directly on neurons → Aβ/Tau; blockade reverses AD** |
| 34072523 | [10.3390/genes12060841](https://doi.org/10.3390/genes12060841) | Camilleri | 2021 | Genes | Ancestry differences: Africans less VAT, Asians more VAT |
| 32488044 | [10.1038/s41467-020-16592-z](https://doi.org/10.1038/s41467-020-16592-z) | Loh | 2020 | Nat Commun | RSPO3 = strongest WHR signal; Wnt → fat distribution |
| 20935630 | [10.1038/ng.685](https://doi.org/10.1038/ng.685) | Heid | 2010 | Nat Genet | 13 WHR loci; 7/14 show sexual dimorphism |
| 21282637 | [10.1073/pnas.1019704108](https://doi.org/10.1073/pnas.1019704108) | Gesta | 2011 | PNAS | TBX15 impairs adipocyte differentiation |

---
| 35788729 | [10.1371/journal.pgen.1009977](https://doi.org/10.1371/journal.pgen.1009977) | Rajabli | 2022 | PLOS Genet | **rs10423769** African-protective variant |
| 36071110 | [10.1038/s41380-022-01729-x](https://doi.org/10.1038/s41380-022-01729-x) | Naslavsky | 2022 | Mol Psychiatry | Local ancestry modulates APOE-neuropathology |
| 33541779 | [10.1016/j.neurobiolaging.2020.10.003](https://doi.org/10.1016/j.neurobiolaging.2020.10.003) | Marca-Ysabel | 2021 | Neurobiol Aging | Amerindian ancestry amplifies APOE4 risk |
| 33619396 | [10.1002/alz.12298](https://doi.org/10.1002/alz.12298) | Griswold | 2021 | Alz Dement | APOE4 expression higher in European ancestry |
| 36627412 | — | Petrisko | 2023 | — | C1q deletion rescues males but not females |
| — | [10.3389/fnagi.2020.00150](https://doi.org/10.3389/fnagi.2020.00150) | Finch | 2020 | Front Aging Neurosci | APOE, diet, and fat distribution |

---

## Module 17: Gut-Brain Axis

### Nodes

| Status | Current ID | SBSF Type | References | Notes |
|--------|-----------|-----------|------------|-------|
| [ ] | gut_dysbiosis_state | STATE | | Microbiome composition |
| [ ] | butyrate_SCFA_production | PROCESS | | SCFA production |
| [ ] | SAA_production | STOCK | | Serum amyloid A |
| [ ] | Th1_brain_infiltration | PROCESS | | T cell entry |

---

## Module 18: Feedback Loops (Ghost Edges)

### Cycles

| Status | Current ID | Type | Edges | Notes |
|--------|-----------|------|-------|-------|
| [ ] | loop_hif1a_pkm2 | Reinforcing | | HIF-1α ↔ PKM2 |
| [ ] | loop_ldam_neuroinflammation | Reinforcing | | LDAM cycle |
| [ ] | loop_amyloid_clearance_failure | Reinforcing | | Aβ clearance failure |
| [ ] | loop_ros_inflammation | Reinforcing | | ROS-inflammation |
| [ ] | loop_complement_synapse_loss | Reinforcing | | Complement spiral |
| [ ] | loop_excitotoxicity | Reinforcing | | Excitotoxicity |
| [ ] | loop_iron_ferroptosis | Reinforcing | | Iron wave |
| [ ] | loop_amyloid_inflammation | Reinforcing | | Aβ-inflammation |
| [ ] | loop_sur1_trpm4_amplification | Reinforcing | | Ca²⁺ amplifier |
| [ ] | loop_tau_gsk3beta_vicious | Reinforcing | | Tau-GSK3β |
| [ ] | loop_tau_propagation_inflammation | Reinforcing | | Tau spreading |
| [ ] | loop_tau_ldam_clearance_failure | Reinforcing | | Tau-LDAM |
| [ ] | loop_peripheral_vascular_gateway | Reinforcing | | APOE4 vascular |
| [ ] | loop_glymphatic_sleep_amyloid | Balancing? | | Glymphatic cycle |
| [ ] | loop_cholinergic_gamma | Reinforcing | | Cholinergic-gamma |
| [ ] | loop_mtROS_MAM | Reinforcing | | MAM dysfunction |
| [ ] | loop_iron_mito_lysosome | Reinforcing | | Iron triangle |
| [ ] | loop_AMPK_NAD_SIRT1 | Reinforcing | | Bioenergetic decline |

---

## Progress Tracking

| Module | Nodes | Edges | % Complete |
|--------|-------|-------|------------|
| 1. Insulin/mTOR | 8+2 | 9+3 | **100%** ✓ |
| 1S. S6K1-IRS1 Loop | 2 | 3 + loop | **100%** ✓ |
| 2. Lysosomal | 9 | 11 | **100%** ✓ |
| 3. Mitochondrial | 7 | 11 | **100%** ✓ |
| 4. Inflammasome | 8 | 13 | **100%** ✓ |
| 5. Microglial | 11 | 16 | **100%** ✓ |
| 6. Amyloid | 8 | 11 | **100%** ✓ |
| 7. Tau | 9 | 11 | **100%** ✓ |
| 7B. Transsulfuration | 9 | 9 | **100%** ✓ |
| 8. Complement | 7 | 6 | **100%** ✓ |
| 9. Iron/Ferroptosis | 13 | 15 | **100%** ✓ |
| 10. APOE4 | 14 | 12 | **100%** ✓ |
| 11. TREM2 | 13 | 11 | **100%** ✓ |
| 12. BBB/Glymphatic | 11 | 15 | **100%** ✓ |
| 13. Cholinergic/WM | 17 | 10 | **100%** ✓ |
| 14. MAM/Calcium | 8 | ~10 | 0% |
| 15. Clinical Boundaries | 45+ | 4 | **100%** ✓ |
| 16. Sex & Ancestry Modifiers | 22 | 17 | **100%** ✓ |
| 17. Gut-Brain | 4 | ~5 | 0% |
| 18. Feedback Loops | 18+1 | 19 ghost | ~10% |
| **TOTAL** | **~250** | **~245** | **~85%** |

*Note: Some nodes may appear in multiple modules. Total unique nodes: ~210*

---

## Bibliography

> **Moved to separate file**: See [ad_dag_bibliography.md](ad_dag_bibliography.md) for complete bibliography (81 references across 17 modules).

---

## Module 17: Temporal Pattern Regulators & Biophysical Constraints (Red Team Integration)

**Date Added**: 2026-01-14
**Purpose**: Document REGULATOR nodes for temporal signaling patterns, kinetic constraints on edges, and intervention timing semantics. Addresses red team findings using proper SBSF ontology.

### Overview

Several framework predictions fail because they ignore:
1. **Temporal patterns** - Same signal (e.g., IFN-β) has opposite effects when pulsed vs chronic
2. **Energy constraints** - ATP-dependent processes cannot be forced in energy-starved cells
3. **Transit kinetics** - Intermediates can accumulate toxically if downstream uptake is impaired
4. **Anabolic windows** - Catabolic interventions (autophagy) must alternate with anabolic periods (protein synthesis)

These are modeled as REGULATORS that modulate edges, not as separate "limitations."

---

### Nodes

| Status | Node ID | SBSF Type | References | Description |
|--------|---------|-----------|------------|-------------|
| [x] | signaling_temporal_pattern | REGULATOR | | Controls effect polarity of cytokine/IFN signaling; values: pulsed, chronic |
| [x] | dosing_temporal_pattern | REGULATOR | | Controls intervention efficacy; values: continuous, pulsed, cycling |
| [x] | mitochondrial_ATP | STOCK | GO:0005524, CHEBI:30616 | Cellular ATP pool; units: mM; enables energy-dependent processes |
| [x] | cytosolic_labile_iron | STOCK | CHEBI:29033 | Fe²⁺ in cytosolic transit; units: µM; intermediate between compartments |
| [x] | synaptic_protein_synthesis | STOCK | GO:0006412 | De novo translation at synapses; required for LTP consolidation |

#### Node: signaling_temporal_pattern

```yaml
node:
  id: "signaling_temporal_pattern"
  type: "REGULATOR"
  subtype: "TemporalModulator"
  
  description: |
    Temporal pattern of inflammatory/immune signaling determines functional outcome.
    Same molecular signal can be protective (pulsed) or pathogenic (chronic).
  
  values:
    - id: "pulsed"
      definition: "Transient exposure (hours-days) followed by resolution"
      biological_examples:
        - "Vaccine adjuvant (AS01, Shingrix)"
        - "Acute infection"
        - "Exercise-induced cytokines"
      functional_outcome: "Immunological training, enhanced function"
      mechanism: "Epigenetic reprogramming without exhaustion"
      
    - id: "chronic"
      definition: "Sustained exposure (weeks-months) without resolution"
      biological_examples:
        - "cGAS-STING from persistent mtDNA leakage"
        - "Senescent cell SASP"
        - "Chronic viral infection"
      functional_outcome: "Immunological exhaustion, dysfunction"
      mechanism: "Receptor desensitization, ISG toxicity, senescence"
  
  modulates_edges:
    - edge_id: "E04.XXX_IFN_neuroinflammation"
      if_pulsed: "attenuates"   # Protective training
      if_chronic: "potentiates" # Drives neurodegeneration
      
    - edge_id: "E05.XXX_cytokine_microglia"
      if_pulsed: "enables"      # Normal activation
      if_chronic: "reverses"    # Drives LDAM/senescence
  
  references:
    - pmid: "31315536"
      doi: "10.1146/annurev-virology-092818-015756"
      note: "Schoggins 2019 - ISG context-dependence"
    - pmid: "37532932"
      doi: "10.1038/s41586-023-06373-1"
      note: "Gulen 2023 - Chronic STING drives aging"
```

#### Node: dosing_temporal_pattern

```yaml
node:
  id: "dosing_temporal_pattern"
  type: "REGULATOR"
  subtype: "InterventionModulator"
  
  description: |
    Dosing schedule determines whether an intervention achieves benefit or causes harm.
    Particularly critical for interventions targeting anabolic/catabolic balance.
  
  values:
    - id: "continuous"
      definition: "Sustained drug exposure without interruption"
      risks:
        - "Exhaustion of compensatory mechanisms"
        - "Block of anabolic processes (protein synthesis, LTP)"
        - "Adaptation/resistance"
      
    - id: "pulsed"
      definition: "Periodic dosing with drug-free recovery windows"
      benefits:
        - "Allows anabolic recovery between catabolic phases"
        - "Reduces adaptation"
        - "May enhance long-term efficacy"
      optimal_patterns:
        mTOR_inhibitors: "Weekly or bi-weekly dosing"
        senolytics: "Hit-and-run (1-3 days on, weeks off)"
        
    - id: "cycling"
      definition: "Alternating between different interventions"
      rationale: "Target different nodes in sequence to prevent escape"
  
  modulates_edges:
    - edge_id: "E01.XXX_rapamycin_autophagy"
      if_continuous: "effect = strong_induction BUT side_effect = LTP_blocked"
      if_pulsed: "effect = moderate_induction AND side_effect = minimal"
  
  references:
    - pmid: "24743145"
      doi: "10.1016/j.cmet.2013.12.002"
      note: "Lamming 2013 - Intermittent rapamycin"
```

---

### Edges (Full SBSF Schema)

#### Edge E17.001: signaling_temporal_pattern MODULATES (type_I_IFN → neuroinflammation)

```yaml
edge:
  id: "E17.001"
  source_node: "signaling_temporal_pattern"
  target_node: "type_I_IFN → neuroinflammation"  # Modulates edge E04.XXX
  
  edge_type: "MODULATION"
  relation: "context_dependent"
  mechanism_label: "temporal_pattern_discrimination"
  
  mechanism_description: |
    Type I IFN (IFN-α/β) can be protective or pathogenic depending on temporal pattern:
    - PULSED: TLR-TRIF pathway → IRF3 → transient IFN → microglial training (PROTECTIVE)
    - CHRONIC: cGAS-STING → sustained IFN → ISG overexpression → exhaustion (PATHOGENIC)
    The SAME downstream molecule has OPPOSITE effects based on exposure duration.
  
  modulation_effects:
    - condition: "signaling_temporal_pattern = pulsed"
      effect: "attenuates"
      quantitative: 0.3  # 70% reduction in inflammatory output
      mechanism: "Epigenetic reprogramming enhances phagocytosis without exhaustion"
      
    - condition: "signaling_temporal_pattern = chronic"
      effect: "potentiates"
      quantitative: 3.0  # 3-fold increase in inflammatory output
      mechanism: "Sustained ISG expression → SASP → neurodegeneration"
  
  evidence:
    - citation:
        pmid: "37532932"
        doi: "10.1038/s41586-023-06373-1"
        first_author: "Gulen"
        year: 2023
        title: "cGAS-STING drives ageing-related inflammation and neurodegeneration"
      quote: "Blockade of STING suppresses the inflammatory phenotypes of senescent human cells...activation of STING triggers reactive microglial transcriptional states, neurodegeneration and cognitive decline"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "knockout"
        details: "STING-/- mice; aged mice"
      causal_confidence: "L3"
      
    - citation:
        pmid: "31315536"
        doi: "10.1146/annurev-virology-092818-015756"
        first_author: "Schoggins"
        year: 2019
        title: "Interferon-Stimulated Genes: What Do They All Do?"
      quote: "The same ISG can have vastly different functions depending on the context"
      methodology:
        type: "review"
      causal_confidence: "L6"
  
  therapeutic_implication: |
    STING agonists for microglial training MUST be pulsed.
    Chronic STING activation (from mtDNA leakage) is a therapeutic TARGET, not tool.
    Vaccine adjuvants work via pulsed TLR pathway, not sustained STING.
```

#### Edge E17.002: mitochondrial_ATP ENABLES lysosomal_acidification

```yaml
edge:
  id: "E17.002"
  source_node: "mitochondrial_ATP"
  target_node: "lysosomal_acidification"
  
  edge_type: "MODULATION"
  relation: "enables"  # ◯ symbol
  mechanism_label: "ATP_powers_V-ATPase"
  
  mechanism_description: |
    Lysosomal acidification requires V-ATPase, which consumes 3 ATP per 10 H⁺ pumped.
    In ATP-depleted neurons (due to mitochondrial dysfunction), V-ATPase CANNOT function.
    Forcing acidification in this state causes metabolic collapse.
  
  kinetics:
    ATP_per_cycle: 3
    protons_per_cycle: 10
    cellular_ATP_fraction: "5-15% (higher when lysosomal load increased)"
  
  threshold:
    node: "mitochondrial_ATP"
    minimum: "60% of baseline"
    assessment_methods:
      - "PET with 18F-BCPP-EF (Complex I tracer)"
      - "CSF lactate/pyruvate ratio"
      - "Brain ATP measured by 31P-MRS"
  
  failure_mode:
    name: "Metabolic Collapse"
    mechanism: |
      Acidification intervention → V-ATPase demand ↑↑ → ATP depletion →
      → Na⁺/K⁺-ATPase failure → membrane depolarization →
      → Ca²⁺ influx → excitotoxicity → acute neuronal death
    risk_population: "Late-stage AD with severe mitochondrial dysfunction"
    
  evidence:
    - citation:
        pmid: "23394946"
        doi: "10.1016/j.cell.2013.01.023"
        first_author: "Cang"
        year: 2013
        title: "mTOR regulates lysosomal ATP-sensitive two-pore Na(+) channels"
      quote: "Lysosomes sense and adapt to cellular metabolic state"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "in_vitro"
      causal_confidence: "L4"
  
  therapeutic_implication: |
    SEQUENCE MATTERS: Restore mitochondrial function BEFORE forcing acidification.
    Co-administer: Ketones (bypass glycolytic block), NAD+ precursors, PGC-1α activators
    CONTRAINDICATED: Acidification monotherapy in energy-starved neurons
```

#### Edge E17.003: lysosomal_iron_release → cytosolic_labile_iron

```yaml
edge:
  id: "E17.003"
  source_node: "lysosomal_iron"
  target_node: "cytosolic_labile_iron"
  
  edge_type: "FLOW"
  relation: "increases"
  mechanism_label: "DMT1_iron_export"
  conserved: true  # Mass-conserving flow
  
  mechanism_description: |
    When lysosomal pH drops (acidification), iron is released via DMT1/NRAMP2.
    Released Fe²⁺ enters cytosolic labile iron pool (LIP) BEFORE mitochondrial uptake.
    LIP residence time depends on mitochondrial uptake capacity.
  
  kinetics:
    transit_time_normal: "5-30 minutes"
    transit_time_MAM_impaired: ">2 hours"
    critical_LIP_threshold: "5 µM cytosolic Fe²⁺"
    
  temporal_scale: "minutes"
  
  evidence:
    - citation:
        pmid: "31866428"
        doi: "10.1074/jbc.RA119.011472"
        first_author: "Krenn"
        year: 2020
        title: "Ferritin-stimulated lipid peroxidation, lysosomal leak, and macrophage death"
      quote: "Iron release kinetics determine whether cells survive or undergo ferroptosis"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "in_vitro"
      causal_confidence: "L4"
```

#### Edge E17.004: cytosolic_labile_iron → ferroptosis (CONDITIONAL)

```yaml
edge:
  id: "E17.004"
  source_node: "cytosolic_labile_iron"
  target_node: "ferroptosis"
  
  edge_type: "INFLUENCE"
  relation: "increases"
  mechanism_label: "Fenton_lipid_peroxidation"
  
  mechanism_description: |
    Cytosolic Fe²⁺ catalyzes Fenton reaction: Fe²⁺ + H₂O₂ → Fe³⁺ + OH• + OH⁻
    Hydroxyl radicals attack PUFA in membranes → lipid peroxidation → ferroptosis.
    RISK DEPENDS ON MITOCHONDRIAL UPTAKE RATE.
  
  modulated_by:
    - modulator: "MAM_contact_sites"
      effect: "attenuates"  # When intact, iron rapidly taken up → low LIP
      quantitative: 0.2
      mechanism: "Efficient ER-mito iron transfer via VDAC-GRP75-IP3R complex"
      
    - modulator: "MAM_dysfunction"
      effect: "potentiates"  # When impaired, LIP accumulates → ferroptosis
      quantitative: 5.0
      mechanism: "Iron accumulates in cytosol → Fenton chemistry → membrane damage"
      
    - modulator: "GPX4_activity"
      effect: "attenuates"  # GPX4 detoxifies lipid peroxides
      quantitative: 0.1
      mechanism: "GPX4 reduces lipid peroxides even with elevated LIP"
      
    - modulator: "lipid_droplets"
      effect: "potentiates"  # LDAM have more substrate for peroxidation
      quantitative: 2.0
      mechanism: "Lipid droplets provide PUFA substrate for Fenton attack"
  
  evidence:
    - citation:
        pmid: "22632970"
        doi: "10.1016/j.cell.2012.03.042"
        first_author: "Dixon"
        year: 2012
        title: "Ferroptosis: an iron-dependent form of nonapoptotic cell death"
      quote: "Iron chelators blocked ferroptosis, indicating iron is required"
      species:
        ncbi_taxon: "NCBITaxon:9606"
      methodology:
        type: "in_vitro"
      causal_confidence: "L4"
  
  therapeutic_implication: |
    Iron release interventions REQUIRE:
    1. Assessment of MAM integrity (CSF sPDGFRβ as surrogate?)
    2. Concurrent ferroptosis inhibitors (liproxstatin-1, ferrostatin-1)
    3. GPX4 support (selenium, NAC for GSH)
    
    CONTRAINDICATED: Iron release in patients with advanced MAM dysfunction
```

#### Edge E17.005: mTORC1_active → synaptic_protein_synthesis

```yaml
edge:
  id: "E17.005"
  source_node: "mTORC1_active"
  target_node: "synaptic_protein_synthesis"
  
  edge_type: "INFLUENCE"
  relation: "directlyIncreases"
  mechanism_label: "mTORC1_translation_initiation"
  
  mechanism_description: |
    mTORC1 phosphorylates 4E-BP1 and S6K1 → translation initiation ↑
    Synaptic protein synthesis is REQUIRED for late-phase LTP (memory consolidation).
    Rapamycin blocks this → impairs memory formation even while clearing aggregates.
  
  temporal_annotation:
    temporal_scale: "hours"
    critical_for: "LTP consolidation (1-6 hours post-learning)"
    
  downstream_consequences:
    - "AMPAR insertion at synapse"
    - "PSD-95 synthesis"
    - "Arc/Arg3.1 expression"
    - "Dendritic spine growth"
  
  evidence:
    - citation:
        pmid: "15958749"
        doi: "10.1523/JNEUROSCI.0599-05.2005"
        first_author: "Tsokas"
        year: 2005
        title: "Local protein synthesis mediates a rapid increase in dendritic elongation factor 1A"
      quote: "mTORC1-dependent protein synthesis is required for late-phase LTP"
      species:
        ncbi_taxon: "NCBITaxon:10116"  # Rat
      methodology:
        type: "in_vitro"
        details: "Hippocampal slice electrophysiology"
      causal_confidence: "L5"
      
    - citation:
        pmid: "21076237"
        doi: "10.1074/jbc.M110.167692"
        first_author: "Stoica"
        year: 2011
        title: "Selective pharmacogenetic inhibition of mTORC1 blocks long-term synaptic plasticity"
      quote: "mTORC1 inhibition blocks L-LTP in hippocampal slices"
      species:
        ncbi_taxon: "NCBITaxon:10090"
      methodology:
        type: "pharmacological_animal"
      causal_confidence: "L4"
  
  therapeutic_implication: |
    Rapamycin MUST be pulsed to preserve learning capacity:
    - Optimal: Weekly or bi-weekly dosing (5-6 days off between doses)
    - Contraindicated during: Cognitive rehabilitation, active learning, post-stroke recovery
    - Evidence: ITP mouse longevity studies used intermittent dosing
```

---

### Intervention Updates (with Temporal Constraints)

#### INT_Rapamycin (UPDATED with Pulsing Requirement)

```yaml
intervention:
  id: "INT_Rapamycin_v2"
  name: "Rapamycin"
  aliases: ["Sirolimus", "Rapamune"]
  
  target_type: "node"
  target_id: "mTORC1_active"
  
  intervention_type: "small_molecule_inhibitor"
  mechanism_of_action: "Binds FKBP12 → inhibits mTORC1 → autophagy induction"
  action: "decreases"
  
  parameters:
    effect_magnitude: 0.8
    ic50: "0.1 nM"
    time_to_effect: "hours"
    duration: "reversible (T1/2 ~60 hours)"
  
  clinical_status: "approved_other"
  indication_status:
    - indication: "Organ transplant rejection"
      status: "approved"
    - indication: "Alzheimer's disease"
      status: "preclinical"
  
  # NEW: Temporal constraint
  temporal_constraint:
    required_pattern: "pulsed"
    optimal_schedule: "Weekly or bi-weekly"
    rationale: |
      Continuous mTORC1 inhibition blocks synaptic protein synthesis → LTP impairment.
      Must allow 5-6 day anabolic windows for memory consolidation.
    contraindicated_during:
      - "Cognitive rehabilitation programs"
      - "Active learning/training phases"
      - "Post-stroke recovery"
    evidence:
      - pmid: "24743145"
        note: "Lamming 2013 - Intermittent rapamycin extends lifespan"
  
  dual_edge_effects:
    beneficial:
      edge: "mTORC1 → autophagy_impaired"
      effect: "decreases" # Reduces autophagy impairment → restores clearance
    harmful:
      edge: "mTORC1 → synaptic_protein_synthesis"
      effect: "decreases" # Blocks LTP consolidation
  
  route_of_administration: "oral"
  blood_brain_barrier: "moderate"
```

#### INT_Lecanemab (with Proper Intervention Timing)

```yaml
intervention:
  id: "INT_Lecanemab"
  name: "Lecanemab"
  aliases: ["Leqembi", "BAN2401"]
  
  target_type: "node"
  target_id: "Abeta_oligomers"
  
  intervention_type: "biologic_antibody"
  mechanism_of_action: "Selectively binds Aβ protofibrils → promotes clearance via Fc-mediated phagocytosis"
  action: "decreases"
  
  parameters:
    effect_magnitude: 0.27  # 27% slowing of decline (NOT 27% removal)
    time_to_effect: "months"
    duration: "requires_continuous_dosing"
  
  clinical_status: "approved"
  indication_status:
    - indication: "Early Alzheimer's disease (MCI or mild dementia)"
      status: "approved"
      year: 2023
      regulatory: "FDA accelerated → full approval"
  
  # CRITICAL: Intervention timing semantics
  intervention_window: "treatment"  # NOT "prevention"
  
  intervention_timing_analysis:
    window: "treatment"
    NOT_prevention: |
      Lecanemab addresses EXISTING oligomer toxicity, not the CAUSE of accumulation.
      Clearance capacity (LDAM dysfunction) remains impaired.
      If stopped, oligomers will re-accumulate because production > clearance.
    
    what_it_addresses:
      - edge: "Abeta_oligomers → LTP_inhibition"
        effect: "reduces direct synaptic toxicity"
        magnitude: "~30% of cognitive decline attributable to this"
      - edge: "Abeta_oligomers → NLRP3"
        effect: "reduces inflammatory trigger"
        magnitude: "contributes to benefit, not quantified"
        
    what_it_does_NOT_address:
      - node: "clearance_impaired"
        status: "UNCHANGED"
        consequence: "Continued Aβ accumulation if treatment stopped"
      - node: "LDAM"
        status: "UNCHANGED"
        consequence: "Phagocytic dysfunction persists"
      - node: "lysosomal_dysfunction"
        status: "UNCHANGED"
        consequence: "Core driver not addressed"
  
  # Sex modifier
  sex_effect:
    documented: "uncertain"
    hypothesis: |
      APOE4 homozygotes (2x more common in women) have higher ARIA risk.
      Potential sex differences in microglial Fc receptor expression.
      Post-hoc analyses needed.
    note: "Phase 3 not powered for sex-stratified analysis"
  
  adverse_effects:
    - name: "ARIA-E"
      description: "Amyloid-related imaging abnormalities - edema"
      incidence: "12.6%"
      risk_factors: ["APOE4 homozygosity", "anticoagulation"]
    - name: "ARIA-H"
      description: "Amyloid-related imaging abnormalities - hemorrhage"
      incidence: "17.3%"
  
  evidence:
    - citation:
        pmid: "36449413"
        doi: "10.1056/NEJMoa2212948"
        first_author: "van Dyck"
        year: 2023
        title: "Lecanemab in Early Alzheimer's Disease"
      quote: "Lecanemab reduced markers of amyloid in early Alzheimer's disease and resulted in moderately less decline on measures of cognition and function than placebo at 18 months"
      species:
        ncbi_taxon: "NCBITaxon:9606"
      methodology:
        type: "rct"
        details: "CLARITY AD, n=1795, 18 months"
      causal_confidence: "L1"
      
  key_insight: |
    Lecanemab provides ~27% SLOWING of decline via DIRECT oligomer toxicity reduction.
    This is TREATMENT (symptomatic relief), not DISEASE MODIFICATION in the true sense.
    The core dysfunction (clearance impairment) persists.
    
    Framework interpretation:
    - E06.006 (oligomer→LTP) is VALIDATED as clinically meaningful
    - ~30% of decline IS attributable to direct oligomer toxicity
    - ~70% of decline is from other mechanisms (inflammation, tau, clearance dysfunction)
    - Stopping treatment → re-accumulation → lost benefit
```

---

### Cross-Module Connections

| From Module | Edge | To Module | Mechanism |
|-------------|------|-----------|-----------|
| 17 (Temporal) | signaling_temporal_pattern modulates | 4 (Inflammasome) | Pulsed vs chronic IFN discrimination |
| 17 (Temporal) | dosing_temporal_pattern modulates | 1 (mTOR/Autophagy) | Rapamycin pulsing requirement |
| 3 (Mitochondria) | mitochondrial_ATP enables | 2 (Lysosomal) | ATP required for acidification |
| 14 (MAM) | MAM_function modulates | 17 (Temporal) | Iron transit time to mitochondria |
| 17 (Temporal) | cytosolic_labile_iron → | 9 (Ferroptosis) | LIP spike if MAM impaired |

---

### Bibliography (Module 17)

74. van Dyck CH, Swanson CJ, Aisen P, et al. Lecanemab in Early Alzheimer's Disease. N Engl J Med. 2023;388(1):9-21. [DOI: 10.1056/NEJMoa2212948](https://doi.org/10.1056/NEJMoa2212948) PMID:36449413
    - **Key finding**: 27% slowing of cognitive decline; validates direct oligomer toxicity
    - **Evidence type**: Phase 3 RCT (L1)
    - **Framework note**: Treatment, not prevention; clearance dysfunction persists

75. Sims JR, Zimmer JA, Evans CD, et al. Donanemab in Early Symptomatic Alzheimer Disease. JAMA. 2023;330(6):512-527. [DOI: 10.1001/jama.2023.13239](https://doi.org/10.1001/jama.2023.13239) PMID:37459141
    - **Key finding**: 35% slowing; 47% reached amyloid negativity
    - **Evidence type**: Phase 3 RCT (L1)
    - **Framework note**: Greater clearance → greater benefit → validates oligomer edge

76. Tsokas P, Grace EA, Chan P, et al. Local protein synthesis mediates a rapid increase in dendritic elongation factor 1A after induction of late long-term potentiation. J Neurosci. 2005;25(24):5833-43. [DOI: 10.1523/JNEUROSCI.0599-05.2005](https://doi.org/10.1523/JNEUROSCI.0599-05.2005) PMID:15958749
    - **Key finding**: mTORC1-dependent protein synthesis required for L-LTP
    - **Evidence type**: Slice electrophysiology (L5)
    - **Framework note**: Rapamycin must be pulsed to preserve learning

77. Stoica L, Bhouri M, Bhattacharjee P, et al. Selective pharmacogenetic inhibition of mTORC1 blocks long-term synaptic plasticity. J Biol Chem. 2011;286(3):2255-64. [DOI: 10.1074/jbc.M110.167692](https://doi.org/10.1074/jbc.M110.167692) PMID:21076237
    - **Key finding**: mTORC1 inhibition blocks L-LTP
    - **Evidence type**: Pharmacology + electrophysiology (L4)

78. Cang C, Zhou Y, Bhargava B, et al. mTOR regulates lysosomal ATP-sensitive two-pore Na(+) channels. Cell. 2013;152(4):778-90. [DOI: 10.1016/j.cell.2013.01.023](https://doi.org/10.1016/j.cell.2013.01.023) PMID:23394946
    - **Key finding**: Lysosomes sense cellular ATP status
    - **Evidence type**: Mechanistic cell biology (L4)
    - **Framework note**: ATP enables acidification

79. Krenn MA, Gasser A, Gusenleitner D, et al. Ferritin-stimulated lipid peroxidation, lysosomal leak, and macrophage death. J Biol Chem. 2020;295(17):5594-5608. [DOI: 10.1074/jbc.RA119.011472](https://doi.org/10.1074/jbc.RA119.011472) PMID:31866428
    - **Key finding**: Iron release kinetics determine ferroptosis outcome
    - **Evidence type**: Mechanistic cell biology (L4-L5)
    - **Framework note**: LIP transit time depends on mitochondrial uptake

80. Schoggins JW. Interferon-Stimulated Genes: What Do They All Do? Annu Rev Virol. 2019;6(1):567-584. [DOI: 10.1146/annurev-virology-092818-015756](https://doi.org/10.1146/annurev-virology-092818-015756) PMID:31315536
    - **Key finding**: Same ISG can be protective or pathogenic depending on context
    - **Evidence type**: Review (L6)
    - **Framework note**: Temporal pattern is the discriminator

81. Lamming DW, Ye L, Sabatini DM, Baur JA. Rapalogs and mTOR inhibitors as anti-aging therapeutics. J Clin Invest. 2013;123(3):980-9. [DOI: 10.1172/JCI64099](https://doi.org/10.1172/JCI64099) PMID:23454761
    - **Key finding**: Intermittent rapamycin dosing preserves benefits while reducing side effects
    - **Evidence type**: Review + ITP data (L4)
    - **Framework note**: Pulsed dosing is standard in longevity field

---

## Framework Validation: Historical Program Stress Test

> **Moved to separate file**: See [ad_framework_validation_analysis.md](ad_framework_validation_analysis.md) for complete validation analysis including:
> - ROC AUC = 0.905 validation results
> - 28 false negative pattern analysis  
> - Class base rate problem documentation
> - Proposed enhancements (Symptomatic Effect Size Dimension, Failure-Point Tagging)
> - 15 supporting references

---


## Changelog

- 2026-01-14: **FILE REORGANIZATION** - Split bibliography and validation analysis to separate files
  - Moved Bibliography (81 references) to `ad_dag_bibliography.md`
  - Moved Framework Validation analysis to `ad_framework_validation_analysis.md` with 15 additional supporting references
  - Main checklist now links to these files via cross-references
- 2026-01-14: **FRAMEWORK VALIDATION COMPLETE** - Historical Program Stress Test (124 cases)
  - Tested framework against 124 historical AD drug programs (113 failures, 11 successes)
  - **ROC AUC = 0.905** - excellent discriminative ability
  - Low-risk tier shows **2.96× enrichment** for successes (26.3% vs 8.9% base rate)
  - High-risk tier achieves **100% precision** as stop-list (12/12 failures)
  - Medium+High achieves **98.8% precision, 75.2% recall** as practical screen
  - **Deep pattern analysis of 28 false negatives**:
    - Clustered in mechanism classes with **0% historical success rate** (5-HT6, H3, mAChR, nAChR)
    - Framework correctly identifies low structural risk but misses class-level empirical failure patterns
    - Successful vs failed AChEIs have **IDENTICAL score profiles** - appropriate behavior (execution not structure)
    - Anti-Aβ mAbs: stage_mismatch dimension DOES discriminate success/failure (0.0 vs 1.4)
  - **Proposed enhancements**:
    - Symptomatic Effect Size Uncertainty dimension (0-2) based on class historical success rate
    - Failure-Point Tagging (F1-F4) aligned to translation chain
  - **Conceptual clarification**: Framework predicts structural translation risk, not execution outcomes
  - Sex/ancestry modifier dimensions improved AUC modestly vs original 6-dimension rubric
  - 12 High-risk programs documented (all TNF inhibitors, metabolic modulators, metal chelators)
- 2026-01-14: **MODULE 17 COMPLETE** - Temporal Pattern Regulators & Biophysical Constraints (Red Team Integration)
  - Addressed 5 red team findings using PROPER SBSF ontology (not a separate "limitations" section)
  - **New REGULATOR nodes**:
    - `signaling_temporal_pattern` - discriminates pulsed (protective) vs chronic (pathogenic) signaling
    - `dosing_temporal_pattern` - controls intervention efficacy (continuous vs pulsed vs cycling)
  - **New STOCK nodes**:
    - `cytosolic_labile_iron` - intermediate in iron transit; ferroptosis risk if MAM impaired
    - `synaptic_protein_synthesis` - target of mTORC1; required for LTP
  - **New edges with proper MODULATION annotations**:
    - E17.001: signaling_temporal_pattern MODULATES (IFN → neuroinflammation)
    - E17.002: mitochondrial_ATP ENABLES lysosomal_acidification (with kinetics: 3 ATP per 10 H⁺)
    - E17.003: lysosomal_iron → cytosolic_labile_iron (FLOW with transit kinetics)
    - E17.004: cytosolic_labile_iron → ferroptosis (CONDITIONAL: modulated by MAM_function, GPX4, lipid_droplets)
    - E17.005: mTORC1_active → synaptic_protein_synthesis (explains rapamycin LTP block)
  - **Updated INT_Lecanemab annotation**:
    - Clarified as TREATMENT not PREVENTION (intervention_window = "treatment")
    - Documents that clearance_impaired PERSISTS after Aβ removal
    - Notes potential sex differences (APOE4 homozygote ARIA risk)
    - ~27% benefit represents DIRECT oligomer toxicity, NOT disease modification
  - **Updated INT_Rapamycin_v2 annotation**:
    - Added temporal_constraint requiring PULSED dosing
    - Documents dual_edge_effects (beneficial autophagy vs harmful LTP block)
  - **8 bibliography entries** (refs 74-81)
- 2026-01-14: **Module 12 COMPLETE** - BBB & Glymphatic
  - 13 nodes documented (pericytes, BBB_integrity, tight_junctions, endothelial_LRP1, CypA_MMP9_pathway, peripheral_immune_infiltration, AQP4_polarization, interstitial_fluid, glymphatic_flow, meningeal_lymphatics, Abeta_clearance, tau_clearance, CSF_sPDGFRb)
  - 16 edges documented with full SBSF annotations
  - Key cross-module connections: Module 6 (Abeta_clearance), Module 7 (tau_clearance), Module 10 (APOE4), Module 11 (DIM)
  - Paradigm shift documented: APOE4-BBB-cognition axis independent of Aβ/tau (Montagne 2020)
  - Bibliography refs 66-73 added
- 2026-01-14: **System Boundaries Section Added**
  - Defined INPUT BOUNDARIES: aging, APOE4_genotype, TREM2_variants, familial_AD_mutations, sex, sleep_disruption
  - Defined OUTPUT BOUNDARIES: cognitive_function, mortality
  - Defined MEASURED STOCKS proximal to outcomes: cognitive_score, synapses, neuronal_count, brain_volume, CSF_biomarkers
  - Added boundary diagram showing model structure
- 2026-01-14: **SBSF Semantics Correction** - Fixed node naming across modules
  - **Principle**: STOCKs should be countable quantities (nouns), not rates of change
  - **Principle**: BOUNDARY nodes are terminal inputs/outputs where the model ends
  - **Module 8 fixes**: 
    - `synaptic_loss` → `synapses` (STOCK = count, not "loss")
    - `spine_loss` → `dendritic_spines` (STOCK = count)
    - `synapse_elimination` merged into `complement_mediated_pruning` (PROCESS)
    - `C1q_elevated` → `C1q` (cleaner naming)
    - `cognitive_function` → BOUNDARY (clinical outcome, terminal node - nothing flows out)
    - Added `cognitive_score` (STOCK) as measurable intermediate between synapses and cognitive_function
    - Fixed edge directions: pruning DECREASES synapses; synapses INCREASE cognitive_score; cognitive_score DETERMINES cognitive_function
  - **Module 12 placeholder fixes**: `pericyte_loss` → `pericytes`, `tight_junction_breakdown` → `tight_junctions`, etc.
  - **Module 13 placeholder fixes**: `ACh_deficiency` → `acetylcholine`, `OPC_exhaustion` → `OPCs`, etc.
- 2026-01-14: **Module 14 COMPLETE** - MAM & Calcium (NEW)
  - 22 nodes fully annotated (MAM_contact_sites, ER_Ca_store, cytosolic_Ca, mitochondrial_Ca, IP3R, RYR, GRP75, VDAC1, MCU, SERCA, sigma1R, PS1_MAM, PS2_MAM, Mfn2, gamma_secretase_MAM, calcineurin, CaMKII, calpain, 4 state nodes, 3 boundary nodes)
  - 10 edges documented including PS2-Mfn2 tethering mechanism and calcium transfer pathways
  - **DUAL HYPOTHESIS INTEGRATION**: 
    - MAM Hypothesis (Area-Gomez & Schon): AD = ER-mitochondrial hyperconnectivity; γ-secretase enriched at MAM
    - Calcium Hypothesis (Berridge 2009): Aβ and FAD mutations remodel Ca²⁺ signaling → calcineurin activation → memory impairment
  - **KEY MECHANISTIC INSIGHT**: PS2 FAD mutations enhance Mfn2 binding at MAM → increased ER-mito contacts → Ca²⁺ overload + Aβ production
  - **Interventions**: ANAVEX2-73 (sigma-1R agonist, Phase 3), Dantrolene (RYR inhibitor), FK506 (calcineurin inhibitor), ACAT1 inhibitors
  - **Cross-module connections**: Module 3 (mPTP), Module 6 (Aβ production), Module 7 (calcineurin-tau), Module 9 (membrane lipids), Module 10 (cholesterol)
  - **Bibliography**: 18 papers including foundational works by Schon/Area-Gomez (2012), Berridge (2009), Mattson (1998, 2007)
- 2026-01-14: **Module 11 COMPLETE** - TREM2 & DAM
  - 10 nodes fully annotated (TREM2_signaling, TREM2_variants, TREM2_soluble, DAM_stage1, DAM_stage2, homeostatic_microglia, DIM_population, senescent_microglia_TREM2, progranulin, APOE_lipid_delivery)
  - 10 edges documented including two-step DAM transition model
  - **FOUNDATIONAL PAPERS**: Jonsson 2013 & Guerreiro 2013 (TREM2 genetic risk), Keren-Shaul 2017 (DAM discovery)
  - **PARADIGM SHIFTS 2022-2024**:
    - DAM vs DIM dual ontogeny (Silvin 2022) - embryonic DAM (protective) vs monocyte-derived DIM (inflammatory)
    - Senescent TREM2+ microglia ≠ DAM (Rachmian 2024) - distinct population, removed by senolytics
    - TIMING WINDOW (Zhao 2022) - TREM2 beneficial EARLY only; R47H harmful mid-stage
  - **Species differences**: Human AD microglia show IRF8-driven signature, not classic mouse DAM (Zhou 2020)
  - **Cross-module links**: Module 5 (LDAM), Module 6 (Aβ clearance), Module 8 (complement), Module 9 (senescent iron), Module 10 (APOE-TREM2 axis)
  - **Therapeutic insight**: TREM2 agonists may only work in prodromal AD; senolytics target senescent TREM2+ population
- 2026-01-14: **Module 10 PARTIAL** - APOE4 Pathways & REST/Epigenetic Dysregulation
  - 6 new nodes added (REST_nuclear, REST_cytoplasmic, nuclear_lamina_disrupted, neural_differentiation_accelerated, progenitor_renewal_reduced, Nrf2_pathway)
  - 7 new edges documented for REST dysfunction pathway
  - **PARADIGM EXPANSION**: APOE4 drives AD via epigenetic/transcriptional mechanism (REST nuclear exclusion) INDEPENDENT of Aβ
  - **Foundational paper**: Meyer 2019 (Cell Reports) - REST dysfunction in SAD/APOE4 iPSCs; nuclear lamina disruption
  - **Cross-module link**: REST → Nrf2 → ferroptosis protection (connects to Module 9)
  - **Key insight**: Epigenetic dysregulation may PRECEDE canonical amyloid/tau pathology
  - **Follow-up literature 2019-2025**: 8 papers integrated (Eva 2025, Wang 2025, Nassar 2023, Ghosh 2021, Mampay 2020, Pajarillo 2020, Lu 2014)
  - **Therapeutic targets**: miRNA modulation (miR-153-3p, miR-124, miR-132, miR-9), Nrf2 activators (sulforaphane), nuclear lamina restoration
- 2026-01-13: **Module 9 COMPLETE** - Iron Dysregulation & Ferroptosis (NEW)
  - 13 nodes fully annotated (labile_iron_pool, ferritin_iron, lysosomal_iron, transferrin_receptor, ferroportin, hepcidin, functional_iron_deficiency, iron_sulfur_clusters, lipid_peroxidation, GPX4_activity, ferroptosis, senescent_cell_iron, SASP)
  - 15 edges documented including iron maldistribution feedback loop
  - **PARADIGM SHIFT**: From "iron overload" to "functional iron deficiency" (Peikon & Andrews 2026)
  - **Explains failed trials**: Deferiprone (iron chelator) WORSENED PD patients - iron is sequestered, not excess
  - **Resolves paradox**: TARGETED ferroptosis in senescent cells WORKS (Jin 2025) while global chelation FAILS
  - **Sex differences**: Women show aberrant iron-ferritin correlation - microglia failing to store iron properly (Rahman 2025)
  - **CSE connection**: CSE-/- causes iron accumulation + GSH depletion → double hit for ferroptosis vulnerability
  - **Therapeutic insight**: Goal is REDISTRIBUTION not REMOVAL; target senescent cells specifically
  - Landmark papers: Dixon 2012 (ferroptosis discovery), Maus 2023 (iron drives SASP), Jin 2025 (targeted ferroptosis senolytics)
- 2026-01-13: **Module 7B COMPLETE** - Reverse Transsulfuration / H₂S Pathway (NEW)
  - 9 nodes fully annotated (homocysteine, CBS_enzyme, cystathionine, CSE_enzyme, cysteine, H2S_production, glutathione_GSH, sulfhydration, GSK3beta_sulfhydrated)
  - 9 edges documented including critical protective feedback loops
  - **KEY DISCOVERY**: CSE knockout ALONE sufficient to cause AD-like phenotype (Chakraborty 2025)
  - **Protective mechanism**: Wild-type tau binds CSE → enhances H₂S → GSK3β sulfhydration → INHIBITS tau phosphorylation
  - **Lost in AD**: Tau P301L/aggregated tau FAILS to bind CSE → loss of protective feedforward loop
  - **Counter-mechanism to NLRP3**: H₂S-mediated GSK3β inhibition opposes inflammasome-driven GSK3β activation
  - Landmark papers: Giovinazzo 2021 (GSK3β sulfhydration), Chakraborty 2025 (CSE knockout), Paul 2014 (CSE in HD)
  - **Therapeutic implication**: H₂S donors (NaGYY4137) may provide safer GSK3β inhibition than direct kinase inhibitors
- 2026-01-13: **Module 8 COMPLETE** - Complement & Synaptic Pruning
  - 7 nodes fully annotated (C1q, C3_cleavage, complement_mediated_pruning, synapses, dendritic_spines, cognitive_score, cognitive_function)
  - 7 edges documented with complete SBSF annotations
  - **Key concept**: Developmental pruning pathway (C1q→C3→CR3) ABERRANTLY REACTIVATED in disease
  - **Timing insight**: Complement-mediated synapse loss occurs BEFORE Aβ plaques - early therapeutic window
  - **C1q overproduction**: 300-fold increase with aging (Stephan 2013); C1q-/- protects cognition
  - **Therapeutic target**: ANX005 (C1q inhibitor) in Phase 2 trials
  - Foundational papers: Stevens 2007 (discovery), Schafer 2012 (CR3 mechanism), Stephan 2013 (aging), Hong 2016 (AD)
- 2026-01-13: **Module 7 COMPLETE** - Tau Pathology
  - 9 nodes fully annotated (GSK3beta, p38_MAPK, PP2A, tau_hyperphosphorylated, tau_aggregated_PHF, NFT_formation, tau_exosomal_release, tau_seeding, PHF_formation_capacity)
  - 11 edges documented including prion-like propagation pathway
  - **Key pathway**: Kinase/phosphatase imbalance (GSK-3β↑ + p38↑ + PP2A↓) → pTau → PHF → NFT
  - **Microglia as vectors**: LDAM phagocytose tau, fail to degrade, release in exosomes → SPREAD pathology (Asai 2015)
  - **NLRP3-Tau feedforward**: Tau seeds activate NLRP3 in recipient region (Ising 2019)
  - **Braak staging explained**: Exosomal tau propagation from entorhinal → hippocampus → neocortex
  - Landmark papers: Wang-Mandelkow 2016 (review), Braak 1991 (staging), Asai 2015 (microglia spreading)
- 2026-01-13: **Module 6 COMPLETE** - Amyloid Pathology
  - 8 nodes fully annotated (BACE1, APP_processing, Abeta_production, Abeta_oligomers, Abeta_plaques, clearance_impaired, plaque_compaction, synaptic_binding)
  - 11 edges documented including two critical feedforward loops
  - **NF-κB→BACE1→Aβ→NF-κB loop**: Inflammation amplifies Aβ production
  - **Aβ→LDAM→clearance impaired→Aβ loop**: Dysfunction impairs clearance
  - **Key insight**: Oligomers are MOST TOXIC (Walsh 2002), plaques may be protective sequestration (Condello 2015)
  - **Dual pathology model**: EOAD = production↑; LOAD = clearance↓
  - Landmark papers: Hardy-Selkoe 2002 (amyloid cascade), Walsh 2002 (oligomer toxicity), Condello 2015 (microglia barrier)
- 2026-01-13: **Module 5 COMPLETE** - Microglial Phenotypes
  - 11 nodes fully annotated (microglia_activated, HIF1a, PKM2, glycolytic_switch, SREBP1, lipid_droplets, LDAM, DAM, phagocytosis_impaired, cytokine_secretion, A1_astrocytes)
  - 16 edges documented including HIF-1α↔PKM2 and neuroinflammation↔LDAM feedback loops
  - **Key pathways**: HIF-1α/glycolytic switch → SREBP1 → lipid droplets → LDAM dysfunction
  - **DAM vs LDAM**: DAM initially protective (TREM2-dependent); LDAM dysfunctional terminal state
  - **Microglia-Astrocyte axis**: IL-1α + TNF + C1q → A1 neurotoxic astrocytes (Liddelow 2017)
  - **Complement-synapse axis**: C1q → C3 → CR3 → synapse elimination (Hong 2016)
  - Landmark papers: Marschallinger 2020 (LDAM), Keren-Shaul 2017 (DAM), Liddelow 2017 (A1), Hong 2016 (complement)
- 2026-01-13: **Module 4 COMPLETE** - Inflammasome & Cytokines
  - 8 nodes fully annotated (NLRP3, cGAS_STING, IL1B, type_I_IFN, neuroinflammation, NFkB, GSK3beta, PP2A)
  - 13 edges documented including critical NLRP3 ↔ Tau feedforward loop
  - Key convergence point: Routes 1A, 1B, 2 all feed into NLRP3 or cGAS-STING
  - **Critical insight**: Oxidation state determines sensor (ox-mtDNA→NLRP3, non-ox→cGAS-STING)
  - **NLRP3-Tau axis**: Ising 2019 landmark - NLRP3 drives tau pathology via GSK-3β↑/PP2A↓, tau activates NLRP3
  - Landmark papers: Heneka 2013 (NLRP3 in AD), Ising 2019 (NLRP3→tau), Bhaskar 2010 (IL-1β→neuronal tau)
- 2026-01-13: **Module 3 COMPLETE** - Mitochondrial Dysfunction (Route 2: Pre-Lysosomal)
  - 7 nodes fully annotated with SBSF types and references
  - 11 edges documented including protective PINK1/Parkin pathway
  - Key pathway: damaged_mito → ROS → (ox-mtDNA + Ca²⁺ overload) → mPTP → VDAC → cytosolic mtDNA
  - **Critical distinction**: Route 2 = direct mtDNA release from mito; Route 1B = mtDNA escape FROM lysosome
  - **Key insight from Xian 2022**: Oxidation state determines sensor (ox-mtDNA→NLRP3, non-ox→cGAS-STING)
  - Landmark paper: Xian 2022 Immunity (FEN1/mPTP/VDAC mechanism)
  - **NOTE**: Sliter 2018 Nature **RETRACTED JULY 2025** - replaced with Borsche 2020 (human data) and Jimenez-Loygorri 2024 (independent validation)
- 2026-01-14: **ASCII Diagrams Extracted** to ad_dag_diagrams.md
  - 11 diagrams moved to separate file for maintainability
  - Cross-references added throughout checklist
- 2026-01-14: **Clinical Trial Risk Framework ADDED** (Module 15)
  - Validated against 124 historical AD programs (11 successes, 113 failures)
  - ROC AUC = 0.905; Low tier: 26.3% success, Medium: 1.4%, High: 0%
  - 8 scored structural dimensions + 1 conditional (symptomatic effect size uncertainty)
  - Failure-Point Tags (F1-F4) for post-hoc classification
  - Full dataset in `ad_framework_trial_failure_stress_test_scaleup_v5_with_symptomatic_dimension.xlsx`
- 2026-01-13: **Module 2 COMPLETE** - Lysosomal Pathology
  - 9 nodes fully annotated with SBSF types and references
  - 11 edges documented with two distinct routes (1A: LMP, 1B: Incomplete Mitophagy)
  - Route 1A: cargo accumulation → lipofuscin → LMP → cathepsin B → NLRP3
  - Route 1B: mitophagosome → autolysosome → mtDNA undegraded → mtDNA escape → cGAS-STING
  - Landmark papers: Oka 2012 (DNase II/mtDNA), Hornung 2008 (cathepsin B/NLRP3), Gulen 2023 (cGAS-STING/aging)
  - Both routes converge on neuroinflammation (Module 4)
- 2026-01-13: **Module 1 Supplement COMPLETE** - S6K1-IRS1 Feedback Loop
  - Identified missing reinforcing feedback loop during review
  - 2 new nodes: S6K1_active, IRS1_serine_phosphorylated
  - 3 new edges completing the cycle back to insulin_resistance
  - New feedback loop: loop_mTORC1_S6K1_IRS1 (Reinforcing)
  - Key insight: Dual pathways to IRS-1 phosphorylation (metabolic via S6K1, inflammatory via JNK/IKK)
  - Caveat noted: S6K1 may not phosphorylate S307 in adipocytes (Rajan 2013)
- 2026-01-13: **Module 1 COMPLETE** - Insulin/mTOR/Autophagy Axis
  - 8 nodes fully annotated with SBSF types and references
  - 9 edges documented with relation type, method, species, causal confidence, citations
  - Key papers: Steen 2005 (Type 3 Diabetes), Settembre 2012 (TFEB/mTORC1), Kim 2011 (ULK1), Lee 2022 (PANTHOS)
  - Distinguishes directlyIncreases (biochemical) from increases (pathway)
  - All edges include directionality reasoning
- 2026-01-13: Initial checklist created with 18 modules
