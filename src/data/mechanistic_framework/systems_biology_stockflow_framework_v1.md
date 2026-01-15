# Systems Biology Stock-Flow (SBSF) Framework
## Version 1.0 - January 2026

### Overview

This framework combines:
1. **Donella Meadows' Systems Dynamics** - Stock-flow thinking, feedback loops, leverage points
2. **BEL (Biological Expression Language)** - Causal semantics, entity functions, context annotations
3. **SBGN/SBO** - Visual notation standards, entity classification
4. **OBO Relation Ontology** - Standardized biological relationships

The goal is to create a representation system for disease mechanisms that supports:
- Causal reasoning and intervention prioritization
- Prevention vs. treatment timing analysis
- Multi-scale integration (molecular → cellular → tissue → organ)
- Feedback loop identification and leverage point scoring

---

## Part 1: Node Types

### 1.1 Core Classification

Following Meadows, we distinguish between things that **accumulate** (stocks), things that **control rates** (regulators), and **system boundaries**:

| Category | Definition | Examples | Characteristic |
|----------|------------|----------|----------------|
| **STOCK** | Accumulations; snapshot values | Protein levels, cell counts, plaque burden | Has inflows and outflows |
| **REGULATOR** | Controls rate of change; not consumed | Enzymes, receptors, channels | Modulates flow rates |
| **PROCESS** | Dynamic; flows over time | Phagocytosis, inflammation | Measured as rate |
| **STATE** | Qualitative condition | Cell phenotype, compartment integrity | Categorical |
| **BOUNDARY** | System boundary condition | Gene, dietary intake, drug, excretion, clinical outcome | Edge of modeled system |

**BOUNDARY nodes** represent where flows enter or exit the modeled system. They are not stocks because we don't model their internal dynamics. Examples:
- Gene transcription (generates mRNA - we don't model what maintains the gene)
- Dietary iron intake (enters system - we don't model digestion)
- Drug administration (external perturbation)
- Protein degradation (leaves system - we don't model amino acid recycling)
- Clinical outcome (measured endpoint)

**Direction is not implied by node type.** Whether a boundary node is an input or output depends on the edges:
- `boundary_node -> stock` = input (source-like)
- `stock -> boundary_node` = output (sink-like)
- Some boundaries are bidirectional or context-dependent

**Boundary choice matters**: What's a boundary vs. a stock depends on modeling scope. If modeling cellular iron, "dietary intake" is a boundary. If modeling whole-body iron including gut absorption, dietary intake flows into a "gut lumen iron" stock.

### 1.2 Stock Subtypes

```
STOCK
├── MolecularStock
│   ├── ProteinPool         # Total protein abundance (any form)
│   ├── ActiveProteinPool   # Active/phosphorylated/bound form specifically
│   ├── MetabolitePool      # Iron, lipids, ATP, ROS, etc.
│   ├── RNAPool             # mRNA, miRNA levels
│   └── ComplexPool         # Assembled protein complexes (e.g., inflammasome)
│
├── CellularStock  
│   ├── CellPopulation      # Count of cells (neurons, microglia, etc.)
│   └── PhenotypePool       # Count in specific phenotype (LDAM, DAM, M1, M2)
│
├── StructuralStock
│   ├── Aggregate           # Plaques, tangles, lipid droplets, lipofuscin
│   ├── OrganellePool       # Functional lysosomes, mitochondria
│   └── CompartmentState    # BBB integrity, lysosomal pH, membrane potential
│
└── SignalStock
    ├── CytokineLevel       # IL-6, TNF-α, IFN-γ concentrations
    ├── HormoneLevel        # Hepcidin, insulin, cortisol
    └── MetaboliteSignal    # When metabolite acts as signal (e.g., iron as signal)
```

### 1.3 Regulator Subtypes

```
REGULATOR
├── Enzyme                  # Catalytic activity (not consumed)
│   ├── Kinase              # Phosphorylation
│   ├── Phosphatase         # Dephosphorylation
│   ├── Protease            # Cleavage (e.g., caspases, cathepsins)
│   └── Transferase         # Transfer groups (methylation, etc.)
│
├── Receptor                # Signal transduction (converts signal type)
│   ├── SurfaceReceptor     # TLR4, TREM2, cytokine receptors
│   ├── NuclearReceptor     # Steroid receptors, PPARs
│   └── IntracellularSensor # NLRP3, cGAS-STING
│
├── Channel_Transporter     # Moves entities across barriers
│   ├── IonChannel          # Ca2+, K+, Na+ channels
│   ├── Transporter         # DMT1, ferroportin, glucose transporters
│   └── Pump                # ATP-dependent pumps
│
└── TranscriptionFactor     # Controls gene expression rate
    ├── Activator           # NRF2, TFEB, HIF-1α
    ├── Repressor           # REST, HDACs
    └── MasterRegulator     # PGC-1α, SREBP
```

### 1.4 Process Subtypes

```
PROCESS
├── BiologicalProcess       # GO Biological Process terms
│   ├── Phagocytosis        # GO:0006909
│   ├── Autophagy           # GO:0006914
│   ├── Apoptosis           # GO:0006915
│   └── InflammatoryResponse # GO:0006954
│
├── Pathology               # Disease processes
│   ├── Neuroinflammation   # MESH:D000071618
│   ├── Neurodegeneration   # HP:0002180
│   └── Dementia            # DOID:1307
│
└── Reaction                # Specific biochemical reactions
    └── (Enzyme-substrate transformations)
```

### 1.5 State Subtypes

```
STATE
├── ActivationState         # Binary or graded activation
│   ├── Phosphorylated      # Specific residue modifications
│   ├── Bound               # In complex with partner
│   ├── NuclearLocalized    # Translocated to nucleus
│   └── Cleaved             # Proteolytically processed
│
├── CellPhenotype           # Cell state (often emergent from molecular states)
│   ├── M1_Microglial       # Pro-inflammatory
│   ├── M2_Microglial       # Anti-inflammatory
│   ├── LDAM                # Lipid-droplet accumulating
│   ├── DAM                 # Disease-associated
│   └── Senescent           # SASP-positive
│
└── SystemState             # Larger-scale states
    ├── CompartmentIntegrity    # BBB_intact, lysosomal_pH_normal
    ├── MetabolicState          # Glycolytic, oxidative
    └── DiseaseStage            # Preclinical, MCI, dementia
```

### 1.6 Boundary Subtypes

Boundary nodes represent the **edge of the modeled system**. Direction (input vs output) is determined by edges, not by the node subtype.

```
BOUNDARY
├── GeneticElement          # Genes, regulatory elements
│   └── Gene                # Source of transcription (not consumed)
│
├── ExternalExposure        # Things entering/leaving organism
│   ├── DietaryIntake       # Nutrients, xenobiotics
│   ├── EnvironmentalAgent  # Pathogens, toxins, pollutants
│   └── Excretion           # Renal, biliary, fecal elimination
│
├── Intervention            # Deliberate perturbations
│   ├── SmallMolecule       # Drugs, supplements
│   ├── Biologic            # Antibodies, vaccines, gene therapy
│   └── Lifestyle           # Exercise, diet change, sleep
│
├── Degradation             # Removal processes (when products not modeled)
│   ├── Proteolysis         # Proteasome, lysosome
│   ├── Autophagy           # When not modeling recycled components
│   └── CellDeath           # Apoptosis, necrosis
│
└── ClinicalMeasure         # Measured endpoints
    ├── Biomarker           # CSF tau, PET signal, blood test
    ├── CognitiveScore      # MMSE, CDR, ADAS-Cog
    └── Diagnosis           # MCI, dementia
```

**Key principle:** The same subtype can act as input or output depending on context:
- `gene -> mRNA_stock` (gene is input boundary)
- `protein_stock -> degradation` (degradation is output boundary)
- `intervention -> regulator_activity` (intervention modifies system)
- `pathology_stock -> clinical_measure` (measure is output boundary)

**Modeling note:** What's a boundary vs. a stock depends on scope:
- Modeling one cell: "iron export" is a boundary
- Modeling tissue: "iron export" flows to "extracellular iron" stock

---

## Part 2: Syntax Conventions

### 2.1 Node Identifiers

Each node has a unique **NodeID** - a human-readable string that serves as the primary identifier within the graph.

```yaml
NodeID: "IL6_protein_pool"          # Descriptive, unique within graph
NodeID: "NLRP3_activity"            # Use underscores, lowercase preferred
NodeID: "microglial_LDAM_phenotype" # Include cell type when relevant
```

**Naming conventions:**
- Use lowercase with underscores: `amyloid_plaque_burden`
- Include entity type suffix when helpful: `_pool`, `_activity`, `_level`, `_rate`
- Include cell/tissue context when ambiguous: `microglial_IL6` vs `astrocytic_IL6`

### 2.2 External References (Ontology Links)

Nodes can link to external ontologies for interoperability. Use **namespace:identifier** format:

```yaml
References:
  gene: "HGNC:6018"           # IL6 gene
  protein: "UniProt:P05231"   # IL6 protein  
  process: "GO:0006909"       # Phagocytosis
  disease: "DOID:10652"       # Alzheimer's disease
  drug: "CHEBI:75291"         # MCC950
  cell_type: "CL:0000129"     # Microglial cell
  anatomy: "UBERON:0000955"   # Brain
```

**Common namespaces:**

| Namespace | Content | Example |
|-----------|---------|---------|
| HGNC | Human gene symbols | `HGNC:6018` (IL6) |
| UniProt | Proteins | `UniProt:P05231` |
| GO | Gene Ontology (process, function, component) | `GO:0006909` |
| CHEBI | Chemical entities | `CHEBI:75291` |
| DOID | Disease Ontology | `DOID:10652` |
| MESH | Medical Subject Headings | `MESH:D000544` |
| HP | Human Phenotype Ontology | `HP:0000726` |
| CL | Cell Ontology | `CL:0000129` |
| UBERON | Anatomy | `UBERON:0000955` |
| SBO | Systems Biology Ontology | `SBO:0000179` |

**References are optional.** A node can exist without external references - they add interoperability but aren't required for the graph to function.

### 2.3 Molecular States and Modifications

For proteins/molecules that exist in multiple states, use separate nodes or state annotations:

**Option A: Separate nodes** (preferred when states have different edges)
```yaml
# Two distinct nodes
NodeID: "TFEB_cytoplasmic"
NodeID: "TFEB_nuclear"

# Edge between them
- from: "TFEB_cytoplasmic"
  to: "TFEB_nuclear"  
  relation: "increases"
  trigger: "lysosomal_stress"
```

**Option B: State annotation** (when tracking the same pool)
```yaml
NodeID: "tau_protein_pool"
Modifications:
  - type: "phosphorylation"
    sites: ["S396", "S404", "T231"]
    effect: "pathological aggregation"
  - type: "truncation"
    site: "D421"
    effect: "increased toxicity"
```

**Common modification types:**
- Phosphorylation, acetylation, ubiquitination, SUMOylation
- Cleavage/truncation
- Oxidation, nitrosylation
- Glycosylation
- Aggregation state (monomer, oligomer, fibril)

### 2.4 Edge Notation

Edges are defined with `from`, `to`, and `relation`:

```yaml
Edges:
  - from: "NLRP3_activity"
    to: "IL1B_maturation"
    relation: "directlyIncreases"
    evidence: "PMID:25686106"
    
  - from: "MCC950_treatment"
    to: "NLRP3_activity"
    relation: "directlyDecreases"
    mechanism: "competitive inhibition of ATPase"
```

**Relation symbols** (for compact notation):

| Full name | Symbol | Meaning |
|-----------|--------|---------|
| `directlyIncreases` | `=>` | Physical interaction, increases |
| `directlyDecreases` | `=\|` | Physical interaction, decreases |
| `increases` | `->` | Indirect/pathway, increases |
| `decreases` | `-\|` | Indirect/pathway, decreases |
| `regulates` | `~` | Direction unknown or context-dependent |
| `correlates` | `--` | Non-causal association |

---

## Part 3: Edge Types (Relations)

### 3.1 Causal Relations

#### 3.1.1 Direct Causation (physical interaction known)

| Relation | Symbol | Definition | Example |
|----------|--------|------------|---------|
| `directlyIncreases` | `=>` | A physically causes increase in B | `TREM2_activity => phagocytosis_rate` |
| `directlyDecreases` | `=\|` | A physically causes decrease in B | `MCC950_treatment =\| NLRP3_activity` |

#### 3.1.2 Indirect Causation (pathway exists, details hidden)

| Relation | Symbol | Definition | Example |
|----------|--------|------------|---------|
| `increases` | `->` | A indirectly increases B | `IL6_level -> neuroinflammation` |
| `decreases` | `-\|` | A indirectly decreases B | `autophagy_rate -\| amyloid_aggregates` |

#### 3.1.3 Regulation (direction context-dependent)

| Relation | Symbol | Definition | Example |
|----------|--------|------------|---------|
| `regulates` | `reg` | A affects B, direction unknown | `APOE_level ~ lipid_metabolism` |
| `modulates` | `~` | A changes B bidirectionally | `SIRT1_activity ~ PGC1A_activity` |

#### 3.1.4 No Effect (important for negative results)

| Relation | Symbol | Definition | Example |
|----------|--------|------------|---------|
| `causesNoChange` | `cnc` | A perturbed, B unchanged | `valacyclovir_treatment cnc AD_progression` |
| `noCorrelation` | `nocorr` | No correlation found | `X_level nocorr Y_level` |

### 3.2 Correlative Relations (non-causal)

| Relation | Symbol | Definition |
|----------|--------|------------|
| `positiveCorrelation` | `pos` | A and B increase/decrease together |
| `negativeCorrelation` | `neg` | A increases as B decreases |
| `association` | `--` | A and B associated, mechanism unknown |

### 3.3 Structural Relations

| Relation | Definition | Example |
|----------|------------|---------|
| `partOf` | A is component of B | `CASP1 partOf NLRP3_inflammasome_complex` |
| `hasComponent` | B is component of A | `NLRP3_inflammasome_complex hasComponent CASP1` |
| `locatedIn` | A found in compartment B | `TFEB_active locatedIn nucleus` |
| `occursIn` | Process A happens in location B | `autophagy occursIn lysosome` |

### 3.4 Transformational Relations

| Relation | Symbol | Definition |
|----------|--------|------------|
| `transcribedTo` | `:>` | Gene → RNA |
| `translatedTo` | `>>` | RNA → Protein |
| `hasActivity` | | Protein has molecular function |
| `isA` | | Subtype relationship |

### 3.5 Stock-Flow Relations

| Relation | Definition | Example |
|----------|------------|---------|
| `flowsInto` | Mass/quantity enters stock | `IL6_synthesis flowsInto IL6_protein_pool` |
| `flowsOutOf` | Mass/quantity leaves stock | `IL6_degradation flowsOutOf IL6_protein_pool` |
| `rateControlledBy` | Flow rate set by regulator | `IL6_synthesis rateControlledBy NFkB_activity` |
| `buffers` | Stock dampens variation | `ferritin_pool buffers labile_iron_pool` |

### 3.6 Boundary Connections

Boundary nodes connect to the modeled system via standard causal relations. Direction is determined by edge direction, not node type:

```yaml
# Input boundary (flow enters system)
- from: "gene_IL6"           # BOUNDARY node
  to: "IL6_mRNA_pool"        # STOCK node
  relation: "increases"      # Gene expression adds to mRNA pool

# Output boundary (flow exits system)  
- from: "IL6_protein_pool"   # STOCK node
  to: "proteasomal_degradation"  # BOUNDARY node
  relation: "increases"      # More protein = more degradation flux

# Intervention boundary (modifies system)
- from: "MCC950_treatment"   # BOUNDARY node
  to: "NLRP3_activity"       # REGULATOR node
  relation: "decreases"      # Drug inhibits regulator

# Measurement boundary (observes system)
- from: "amyloid_plaque_burden"  # STOCK node
  to: "PET_signal"               # BOUNDARY node
  relation: "increases"          # More plaques = higher signal
```

**No special relations needed.** Boundaries use the same `increases`/`decreases`/`regulates` relations as other edges. What makes them boundaries is their node type, not a special edge type.

---

## Part 4: Edge Annotations

### 4.1 Context Annotations

```yaml
# Required
Citation: "PMID:12345678"
Evidence: "Direct quote from paper supporting this edge"

# Recommended context
Tissue: "UBERON:0000955"        # Brain
CellType: "CL:0000129"          # Microglial cell
Disease: "DOID:10652"           # Alzheimer's disease
CellLine: "CLO:0000019"         # HEK293 (if in vitro)
```

### 4.2 Species Annotation

Species context is critical because findings may not translate across species or even across different animal models. Use NCBI Taxonomy IDs with model-specific qualifiers.

```yaml
Species:
  taxonomy_id: "NCBITaxon:10090"     # Mus musculus
  strain: "C57BL/6J"                  # Background strain
  model: "5xFAD"                      # Disease model name
  model_id: "MGI:3693208"             # MGI ID for the model
  genetic_modification: "Tg(APP*K670N*M671L,PSEN1*M146L*L286V)"
  notes: "Aggressive amyloid model, no tau pathology"
```

**Common Species Codes (NCBI Taxonomy)**

| Species | NCBITaxon ID | Notes |
|---------|--------------|-------|
| Homo sapiens | NCBITaxon:9606 | Human |
| Mus musculus | NCBITaxon:10090 | Mouse (specify strain/model) |
| Rattus norvegicus | NCBITaxon:10116 | Rat (specify strain) |
| Macaca mulatta | NCBITaxon:9544 | Rhesus macaque |
| Danio rerio | NCBITaxon:7955 | Zebrafish |
| Caenorhabditis elegans | NCBITaxon:6239 | Nematode |
| Drosophila melanogaster | NCBITaxon:7227 | Fruit fly |

**Common AD Mouse Models** (use MGI IDs when available)

| Model | MGI ID | Background | Pathology | Limitations |
|-------|--------|------------|-----------|-------------|
| 5xFAD | MGI:3693208 | C57BL/6 × SJL | Rapid Aβ, no tau | No tau, aggressive |
| APP/PS1 | MGI:3665286 | C57BL/6 | Aβ plaques | No tau |
| 3xTg-AD | MGI:3720694 | Mixed | Aβ + tau | Different background |
| APPNL-G-F | MGI:5637816 | C57BL/6 | Knock-in APP | More physiological |
| PS19 (Tau) | MGI:3690443 | B6C3 | Tau only | No Aβ |
| hTau | MGI:3619769 | C57BL/6 | Human tau | No mouse tau |
| APOE4-TR | MGI:1931116 | C57BL/6 | Human APOE4 | Targeted replacement |

**Common Rat Models**

| Model | Strain | Pathology | Notes |
|-------|--------|-----------|-------|
| STZ-ICV | Wistar/SD | Sporadic AD-like | Streptozotocin injection |
| TgF344-AD | Fischer 344 | Aβ + tau | Better tau than mice |
| McGill-R-Thy1-APP | Wistar | APP overexpression | |

**Why This Matters**: A finding in 5xFAD (aggressive, Aβ-only) may not replicate in 3xTg-AD (slower, Aβ+tau) or translate to humans. Always specify the model.

### 4.3 Method/Evidence Type Annotation

The method used to establish a relationship determines causal confidence. Use standardized codes:

```yaml
Method:
  type: "knockout"                    # Method code (see table)
  design: "conditional_cre_lox"       # Specific design details
  manipulation: "CTSB-/-"             # What was changed
  comparator: "wild_type_littermates" # Control group
  blinding: "double_blind"            # Blinding status
  n_per_group: 12                     # Sample size
  replication: "independent_cohort"   # Replication status
```

**Method Type Codes**

| Code | Name | Causal Strength | Description |
|------|------|-----------------|-------------|
| `rct` | Randomized Controlled Trial | **L1 - Strong** | Human randomized intervention |
| `mr` | Mendelian Randomization | **L2 - Strong** | Genetic instrument as natural experiment |
| `knockout` | Genetic Knockout | **L3 - Strong** | Gene deletion (constitutive or conditional) |
| `knockin` | Genetic Knock-in | **L3 - Strong** | Gene insertion or replacement |
| `transgenic` | Transgenic Overexpression | **L3 - Moderate** | Gene overexpression |
| `intervention_animal` | Animal Intervention | **L4 - Moderate** | Drug/compound administration in animals |
| `intervention_human` | Human Intervention (non-RCT) | **L4 - Moderate** | Open-label, single-arm human study |
| `in_vitro` | In Vitro Mechanistic | **L5 - Mechanistic** | Cell culture, biochemical assays |
| `ex_vivo` | Ex Vivo | **L5 - Mechanistic** | Tissue slices, organoids |
| `cohort` | Prospective Cohort | **L6 - Correlational** | Longitudinal observational |
| `case_control` | Case-Control | **L6 - Correlational** | Retrospective comparison |
| `cross_sectional` | Cross-Sectional | **L7 - Weak** | Single timepoint association |
| `case_report` | Case Report/Series | **L7 - Weak** | Clinical observation |
| `toxicology` | Toxicology/Adverse Event | **L-Tox** | Illness or poisoning observation |
| `computational` | Computational/In Silico | **L-Comp** | Modeling, prediction |
| `meta_analysis` | Meta-Analysis | **Varies** | Pooled analysis (strength depends on inputs) |

**Toxicology/Illness Observations**

For relationships discovered through adverse events, poisoning, or disease observations:

```yaml
Method:
  type: "toxicology"
  observation_type: "human_poisoning"  # or "occupational_exposure", "drug_adverse_event"
  exposure: "MPTP"
  outcome: "parkinsonism"
  n_cases: 7
  reversibility: "irreversible"
  dose_response: "yes"
  citation: "PMID:6823561"  # Langston 1983
```

**Causal Inference Checklist**

When assigning causal confidence, consider:

| Criterion | Question | Impact |
|-----------|----------|--------|
| Temporality | Does cause precede effect? | Required for causation |
| Dose-response | Does more exposure = more effect? | Strengthens causation |
| Reversibility | Does removing cause remove effect? | Strengthens causation |
| Specificity | Is the effect specific to this cause? | Moderate support |
| Consistency | Replicated across studies/models? | Strengthens confidence |
| Biological plausibility | Mechanism makes sense? | Required for acceptance |
| Coherence | Fits with other knowledge? | Moderate support |

### 4.4 Temporal Annotations [OPTIONAL]

These help distinguish prevention vs. treatment windows:

```yaml
# Temporal scale of effect
TemporalScale:
  - "seconds"      # Ion channels, phosphorylation
  - "minutes"      # Protein localization, acute signaling
  - "hours"        # Gene expression, protein synthesis
  - "days"         # Cell proliferation, phenotype change
  - "weeks"        # Tissue remodeling
  - "months"       # Aggregate accumulation
  - "years"        # Disease progression
  - "decades"      # Lifespan-scale effects

# Developmental timing (critical for prevention vs treatment)
DevelopmentalWindow:
  - "prenatal"
  - "early_postnatal"
  - "adolescent"  
  - "young_adult"
  - "middle_age"
  - "late_life"

# Disease stage relevance
DiseaseStage:
  - "preclinical"     # No symptoms, pathology beginning
  - "prodromal"       # Subtle symptoms, significant pathology
  - "early_clinical"  # Diagnosis possible
  - "established"     # Full clinical syndrome
  - "advanced"        # Severe symptoms

# Intervention timing
InterventionWindow:
  - "prevention"      # Before pathology starts
  - "early_treatment" # Pathology present, symptoms absent
  - "treatment"       # Symptoms present
  - "management"      # Irreversible damage, symptom control
```

### 4.5 Confidence/Evidence Annotations

```yaml
# Evidence strength
EvidenceType:
  - "direct_experiment"   # Tested this exact relationship
  - "inferred"            # Derived from related experiments
  - "computational"       # Predicted from data
  - "review"              # Stated in review, original source unclear

# Confidence level
Confidence:
  - "high"      # Multiple independent replications
  - "medium"    # Single well-controlled study
  - "low"       # Preliminary or conflicting evidence
  - "disputed"  # Contradictory findings exist
```

### 4.6 Quantitative Edge Strength [OPTIONAL]

Edges have qualitative polarity (positive/negative) but biological effects aren't binary. When quantitative data is available, annotate edge strength:

```yaml
# Kinetic parameters (gold standard, often unavailable)
Kinetics:
  Km: 10.5              # μM - substrate concentration at half-max rate
  Vmax: 100             # μmol/min - maximum reaction rate  
  kcat: 50              # s⁻¹ - catalytic rate constant
  Ki: 0.5               # μM - inhibition constant
  Kd: 2.3               # nM - dissociation constant
  Hill_coefficient: 1.8 # cooperativity (1 = no cooperativity)
  IC50: 15              # nM - half-maximal inhibitory concentration
  EC50: 8               # nM - half-maximal effective concentration

# Stoichiometry (for defined biochemical reactions)
Stoichiometry:
  reactant_coefficients:
    ATP: 2              # 2 ATP consumed
    substrate: 1
  product_coefficients:
    ADP: 2
    product: 1
    Pi: 2

# Correlation (when mechanism unclear or kinetics unavailable)
Correlation:
  coefficient: 0.72     # Pearson r, Spearman ρ, or other
  type: "pearson"       # pearson | spearman | partial
  p_value: 0.001
  n: 45                 # sample size
  context: "post-mortem AD brain, Braak V-VI"
  confounders_controlled: ["age", "PMI", "sex"]

# Effect size (from perturbation experiments)
EffectSize:
  fold_change: 3.2
  direction: "increase"
  log2_fc: 1.68
  confidence_interval: [2.1, 4.8]
  comparison: "AD vs control"
  
# Dose-response (for interventions)
DoseResponse:
  EC50: 15              # nM
  Emax: 0.85            # maximal effect as fraction
  Hill_slope: 1.2
  therapeutic_window: [10, 100]  # nM
```

**Data hierarchy:** Prefer kinetics > stoichiometry > effect size > correlation. 

**When to annotate:** Only add quantitative data when:
1. The data exists and is published
2. The measurement context matches the edge context (species, tissue, disease state)
3. You can cite the source

Most edges will only have qualitative polarity. That's fine - quantitative data enables richer analysis but isn't required.

### 4.7 Edge Modulation (State-Dependent Behavior) [OPTIONAL]

Biological relationships often behave differently depending on cellular state. For example, TREM2 signaling has different effects in homeostatic vs LDAM microglia. Rather than creating duplicate edges for each context, we annotate **modulation** - how a state node affects an edge's behavior.

```yaml
Modulation:
  modulator: "LDAM_phenotype"      # Node ID of the state that modifies this edge
  effect: "attenuates"            # How the modulator changes the edge
  quantitative: 0.3               # Optional: fold-change in edge strength (0.3 = 70% reduction)
  mechanism: |
    Lipid-laden lysosomes in LDAM microglia impair phagosome-lysosome 
    fusion, reducing phagocytic efficiency despite intact TREM2 signaling
  evidence: "PMID:12345678"
```

**Effect types:**

| Effect | Meaning | Visual |
|--------|---------|--------|
| `potentiates` | Increases edge strength | ⊕ |
| `attenuates` | Decreases edge strength | ◐ |
| `blocks` | Prevents edge from acting | ⊗ |
| `enables` | Required for edge to act (permissive) | ◯ |
| `reverses` | Flips edge polarity | ⊖ |

**Multiple modulators:** An edge can have multiple modulators:

```yaml
# TREM2 → phagocytosis edge
modulated_by:
  - modulator: "LDAM_phenotype"
    effect: "attenuates"
    quantitative: 0.3
    
  - modulator: "complement_opsonization"
    effect: "potentiates"
    quantitative: 2.5
    
  - modulator: "ATP_depletion"
    effect: "blocks"
    threshold: "ATP < 20% baseline"
```

**When to use modulation vs separate edges:**
- Use **modulation** when: the same biological relationship exists but its strength/efficacy changes
- Use **separate edges** when: completely different mechanisms are engaged in different states

Example: TREM2→phagocytosis is the same mechanism (TREM2 signaling promotes engulfment) whether the cell is homeostatic or LDAM - it's just less effective in LDAM. This is modulation.

Counter-example: If TREM2 activated completely different downstream pathways in different states, those would be separate edges.

---

## Part 5: Cycle Annotations (Feedback in a DAG)

### 5.1 The DAG Constraint Problem

A Directed Acyclic Graph (DAG) cannot contain cycles by definition. However, biological systems are full of feedback loops. We resolve this by:

1. **Keeping the graph acyclic** for computational tractability
2. **Annotating "ghost edges"** - the cycle-completing edges that exist biologically but aren't drawn
3. **Computing cycle properties** from edge composition at analysis time

A **ghost edge** is a would-be edge from node B back to node A that would complete a cycle A → ... → B → A. We don't add it to the graph, but we annotate its existence.

### 5.2 Ghost Edge Annotation

Ghost edges are stored separately from the main edge list:

```yaml
GhostEdges:
  - id: "ghost_IL6_NFkB"
    from: "il6_signaling"
    to: "nfkb_activation"           # This would complete the cycle
    relation: "increases"            # The polarity of the ghost edge
    completes_cycle: "inflammatory_amplification"
    evidence: "PMID:12345678"
    notes: |
      IL-6 → JAK/STAT3 → acute phase response → hepcidin → iron retention →
      ROS → NF-κB → IL-6 transcription. The ghost edge connects IL-6 effects
      back to NF-κB activation via oxidative stress.
```

### 5.3 Cycle Definition

Cycles are defined by listing their constituent edges (real + ghost). Polarity is derived from relation types, not stored separately:

```yaml
Cycles:
  - id: "inflammatory_amplification"
    description: |
      Inflammatory amplification loop: cytokines → iron dysregulation → 
      oxidative stress → more inflammation
    
    # List all edges in the cycle (in order)
    # Polarity is derived from relation: increases→(+), decreases→(-)
    edges:
      - from: "nfkb_activation"
        to: "il6_transcription"
        relation: "increases"
      - from: "il6_transcription"
        to: "il6_protein"
        relation: "increases"
      - from: "il6_protein"
        to: "hepcidin_induction"
        relation: "increases"
      - from: "hepcidin_induction"
        to: "cellular_iron_retention"
        relation: "increases"
      - from: "cellular_iron_retention"
        to: "oxidative_stress"
        relation: "increases"
      - from: "oxidative_stress"
        to: "nfkb_activation"
        relation: "increases"
        is_ghost: true
    
    # Cycle type COMPUTED: 0 negative edges → Reinforcing

  - id: "iron_homeostasis"
    description: |
      Normal iron homeostasis: high iron → hepcidin → reduced export → lower iron
    edges:
      - from: "serum_iron"
        to: "hepcidin_induction"
        relation: "increases"
      - from: "hepcidin_induction"
        to: "ferroportin_level"
        relation: "decreases"       # Hepcidin degrades ferroportin
      - from: "ferroportin_level"
        to: "iron_export"
        relation: "increases"       # More ferroportin = more export
      - from: "iron_export"
        to: "serum_iron"
        relation: "increases"
        is_ghost: true
    
    # Cycle type COMPUTED: 1 negative edge → Balancing
    # Trace: ↑Fe → ↑Hepcidin → ↓Ferroportin → ↓Export → ↓Fe (counteracts)
```

### 5.4 Edge Polarity (Derived, Not Stored)

Edge polarity (positive/negative) is **derived** from available data, not stored as a separate required field. It can come from:

**1. Relation type (most common):**
```
increases, directlyIncreases, ->  , =>   → positive
decreases, directlyDecreases, -|  , =|   → negative
regulates, associates, correlates        → undefined (need more data)
```

**2. Quantitative data:**
```yaml
# From correlation
Correlation:
  coefficient: -0.72    # Negative sign → negative polarity

# From effect size  
EffectSize:
  fold_change: 3.2
  direction: "decrease"  # → negative polarity

# From kinetic parameter type
Kinetics:
  Ki: 0.5       # Inhibition constant → negative polarity
  Kact: 10      # Activation constant → positive polarity
  IC50: 15      # Inhibitory → negative
  EC50: 8       # Effective (activating) → positive (usually)
```

**3. Explicit annotation (fallback):**
Only when relation type is ambiguous AND no quantitative data exists:
```yaml
Polarity: "negative"  # Use sparingly - prefer data-derived
```

**Computing polarity for cycle analysis:**

```python
def get_edge_polarity(edge: dict) -> int | None:
    """
    Derive polarity from available edge data.
    Returns +1 (positive), -1 (negative), or None (undefined).
    """
    # 1. Check relation type
    relation = edge.get('relation', '')
    if relation in ['increases', 'directlyIncreases', '->', '=>']:
        return +1
    if relation in ['decreases', 'directlyDecreases', '-|', '=|']:
        return -1
    
    # 2. Check quantitative data
    if 'correlation' in edge:
        r = edge['correlation'].get('coefficient')
        if r is not None:
            return +1 if r > 0 else -1
    
    if 'effect_size' in edge:
        direction = edge['effect_size'].get('direction')
        if direction == 'increase':
            return +1
        if direction == 'decrease':
            return -1
    
    if 'kinetics' in edge:
        k = edge['kinetics']
        if any(key in k for key in ['Ki', 'IC50']):
            return -1  # Inhibitory
        if any(key in k for key in ['Kact', 'EC50']):
            return +1  # Activating (usually)
    
    # 3. Check explicit annotation
    explicit = edge.get('polarity')
    if explicit == 'positive':
        return +1
    if explicit == 'negative':
        return -1
    
    return None  # Undefined - cannot determine


def compute_qualitative_cycle_type(cycle_edges: list) -> str | None:
    """
    Classify cycle as reinforcing/balancing from edge polarities.
    Returns None if any edge has undefined polarity.
    """
    polarities = [get_edge_polarity(e) for e in cycle_edges]
    
    if None in polarities:
        return None  # Can't classify - missing polarity data
    
    negative_count = sum(1 for p in polarities if p == -1)
    return "reinforcing" if negative_count % 2 == 0 else "balancing"
```

**Key principle:** Don't duplicate information. If the relation type or quantitative data tells us the direction, we derive polarity from that rather than storing it separately.

### 5.5 Why This Matters

Identifying cycles helps us:
1. **Find intervention points** - Breaking a reinforcing cycle can halt amplification
2. **Predict unintended consequences** - Perturbing a balancing cycle may cause oscillation
3. **Understand treatment timing** - Early intervention may prevent cycle establishment
4. **Model dynamics** - Even qualitatively, knowing cycle structure predicts behavior

---

## Part 6: Multi-Scale Organization

### 6.1 Compartment Hierarchy

```
ORGANISM
├── ORGAN
│   ├── brain
│   │   ├── REGION
│   │   │   ├── hippocampus
│   │   │   ├── cortex
│   │   │   └── substantia_nigra
│   │   └── TISSUE_TYPE
│   │       ├── gray_matter
│   │       └── white_matter
│   ├── gut
│   └── liver
│
├── CELL_TYPE
│   ├── neuron
│   ├── microglia
│   ├── astrocyte
│   ├── oligodendrocyte
│   └── endothelial
│
├── SUBCELLULAR
│   ├── nucleus
│   ├── cytoplasm
│   ├── mitochondria
│   ├── lysosome
│   ├── endoplasmic_reticulum
│   └── plasma_membrane
│
└── MOLECULAR
    └── (proteins, metabolites, etc.)
```

### 6.2 Cross-Scale Edges

Edges can cross scales with explicit annotation:

```yaml
CrossScaleEdge:
  source_scale: "molecular"
  target_scale: "cellular"
  mechanism: "threshold_accumulation"
  description: |
    When lipid peroxides exceed lysosomal capacity, 
    cell transitions to LDAM phenotype
```

---

## Part 7: Example Node Definitions

### 7.1 Stock Node

```yaml
NodeID: "IL6_protein_pool"
NodeType: 
  primary: "STOCK"
  subtype: "MolecularStock.ProteinPool"
  
References:
  protein: "UniProt:P05231"
  gene: "HGNC:6018"

Compartment:
  cell_type: "CL:0000129"       # Microglia
  subcellular: "GO:0005737"     # Cytoplasm

# Stocks have inflows and outflows
Inflows:
  - from: "IL6_mRNA_translation"
Outflows:
  - to: "IL6_secretion"
  - to: "IL6_degradation"
```

### 7.2 Regulator Node

```yaml
NodeID: "NLRP3_inflammasome_activity"
NodeType: 
  primary: "REGULATOR"
  subtype: "IntracellularSensor"
  
References:
  complex: "GO:0072559"        # NLRP3 inflammasome complex
  protein: "UniProt:Q96P20"    # NLRP3

Compartment:
  cell_type: "CL:0000129"   # Microglia
  subcellular: "GO:0005829" # Cytosol

TemporalAnnotations:  # Optional
  activation_timescale: "minutes"
  effect_timescale: "hours"
```

### 7.3 Boundary Node (Input)

```yaml
# Gene as input boundary - generates mRNA without being consumed
NodeID: "IL6_gene"
NodeType:
  primary: "BOUNDARY"
  subtype: "GeneticElement.Gene"

References:
  gene: "HGNC:6018"    # IL6

# Direction comes from edges, not node type
# This node will have outgoing edges to mRNA stocks
```

### 7.4 Boundary Node (Output)

```yaml
# Degradation as output boundary - removes material from modeled system
NodeID: "proteasomal_degradation"
NodeType:
  primary: "BOUNDARY"
  subtype: "Degradation.Proteolysis"

References:
  process: "GO:0010498"    # Proteasomal protein catabolic process

# Proteins flow into this boundary and leave the modeled system
# We don't track amino acid recycling in this model
```

### 7.5 Boundary Node (Intervention)

```yaml
# Drug as intervention boundary
NodeID: "MCC950_treatment"
NodeType:
  primary: "BOUNDARY"
  subtype: "Intervention.SmallMolecule"

References:
  drug: "CHEBI:75291"    # MCC950 / CRID3

# Intervention modifies system behavior via edges to regulators/stocks
Edges:
  - to: "NLRP3_inflammasome_activity"
    relation: "directlyDecreases"
    mechanism: "competitive inhibition of NLRP3 ATPase"
    evidence: "PMID:25686106"
```

### 7.6 Boundary Node (Measurement)

```yaml
# Clinical outcome as measurement boundary
NodeID: "cognitive_score_MMSE"
NodeType:
  primary: "BOUNDARY"
  subtype: "ClinicalMeasure.CognitiveScore"

References:
  measure: "MESH:D008609"    # Mental Status Schedule

# System states flow into this measurement
# It's a boundary because we don't model what happens after measurement
```

### 7.7 State Node

```yaml
# Cell phenotype as qualitative state
NodeID: "LDAM_phenotype"
NodeType:
  primary: "STATE"
  subtype: "CellPhenotype"

References:
  process: "GO:0019915"    # Lipid storage (approximate)

# States can modulate edges
ModulatesEdges:
  - edge: "TREM2_activity -> phagocytosis"
    effect: "attenuates"
    quantitative: 0.3
    mechanism: "lipid-laden lysosomes impair phagosome maturation"
```

---

## Part 8: Mapping from Current AD DAG

### 8.1 Current NodeType Enum → SBSF

| Current | SBSF Primary | SBSF Subtype | Notes |
|---------|--------------|--------------|-------|
| MOLECULAR | STOCK | MolecularStock (varies) | Protein pools, metabolites |
| CELLULAR | STOCK | CellularStock | Cell populations, phenotype counts |
| PROCESS | PROCESS | BiologicalProcess | Reference: GO process terms |
| PATHWAY | PROCESS | BiologicalProcess | Multi-step process |
| PHENOTYPE | STATE | CellPhenotype or SystemState | Qualitative condition |
| ORGANELLE | STOCK | StructuralStock.OrganellePool | Lysosome count, etc. |
| INTERVENTION | BOUNDARY | Intervention.* | Drug, lifestyle, etc. |
| CLINICAL | BOUNDARY or STATE | ClinicalMeasure or SystemState | Depends on role |

**Guidance for CLINICAL nodes:**
- If it's a **measured endpoint** (MMSE score, PET signal) → `BOUNDARY.ClinicalMeasure`
- If it's a **disease state** that affects other things (MCI → behavioral changes) → `STATE.SystemState`

### 8.2 Current EdgeType Enum → SBSF

| Current | SBSF Relation | Notes |
|---------|---------------|-------|
| CAUSES | `->` or `=>` | Need to distinguish direct/indirect |
| INHIBITS | `-\|` or `=\|` | Need to distinguish direct/indirect |
| ACTIVATES | `->` | Usually indirect |
| REGULATES | `reg` | Keep as is |
| PRODUCES | `=>` | Direct production |
| REQUIRES | (structural) | `partOf` or `hasInput` |
| ASSOCIATED_WITH | `--` | Association |
| TRANSFORMS | `:>` or `>>` | Transcription/translation |
| MODULATION | `~` | Bidirectional |
| INHIBITION | `=\|` | Direct decrease |
| NO_EFFECT | `cnc` | Important for negative results |

---

## Part 9: Implementation Notes

### 9.1 Minimum Viable Annotation

For rapid curation, only require:
1. NodeType (primary + subtype)
2. Edge relation type
3. Citation (PMID)

Everything else is optional enhancement.

### 9.2 Validation Rules

1. **Stock-Flow Consistency**: 
   - `flowsInto` target must be STOCK
   - `rateControlledBy` source must be flow, target must be REGULATOR or STOCK
   
2. **Causal Direction**:
   - `=>` requires physical interaction evidence
   - `->` can be used for pathway-level claims

3. **Boundary Guidance** (not strict constraints):
   - BOUNDARY nodes typically have edges in only one direction (input OR output)
   - But some boundaries are bidirectional (e.g., BBB transport)
   - Direction is determined by edges, not by node type
   - A node with edges in both directions might be better classified as STOCK

4. **Cycle Integrity** (ghost edges):
   - Ghost edges must complete an actual path in the DAG
   - Cycle type derived from edge polarities:
     - Even negative edges → Reinforcing (perturbation returns same sign)
     - Odd negative edges → Balancing (perturbation returns opposite sign)
   - Ghost edges are stored separately, never added to the main edge list

### 9.3 Temporal Annotation Guidelines

- Only add temporal annotations when they inform intervention timing
- Required for nodes where prevention ≠ treatment
- Examples:
  - Microglial training: `prevention` >> `treatment`
  - Complement inhibition: `early_clinical` optimal
  - Iron chelation: `preclinical` through `early_clinical`

---

## Part 10: Visualization

The goal of this framework is to enable interactive visualization of disease mechanisms. This section defines visual conventions.

### 10.1 Node Symbols

Nodes are represented by shapes that indicate their type:

```
┌─────────────────────────────────────────────────────────────────┐
│  NODE TYPE          SYMBOL              DESCRIPTION             │
├─────────────────────────────────────────────────────────────────┤
│  STOCK              ┌─────┐             Rectangle (container)   │
│                     │     │             Can "hold" quantity     │
│                     └─────┘                                     │
│                                                                 │
│  REGULATOR          ◇                   Diamond                 │
│                                         Controls flow rate      │
│                                                                 │
│  PROCESS            ( ═══ )             Rounded / pill shape    │
│                                         Activity over time      │
│                                                                 │
│  STATE              ╱    ╲              Hexagon                 │
│                    ╲      ╱             Qualitative condition   │
│                                                                 │
│  BOUNDARY           ☁ or ◖ ◗           Cloud or half-circle    │
│                                         System edge (input,     │
│                                         output, intervention,   │
│                                         measurement)            │
└─────────────────────────────────────────────────────────────────┘
```

**Color coding** (suggested, customizable):
- Stocks: Blue shades (darker = larger accumulation)
- Regulators: Orange/amber
- Processes: Green
- States: Purple
- Boundaries: Gray (system edge) - optionally tinted by subtype:
  - Interventions: Red/pink tint
  - Measurements: Teal tint
  - Genes/inputs: Yellow tint

### 10.2 Edge Symbols

Edges indicate relationships. Line endings indicate polarity:

```
┌─────────────────────────────────────────────────────────────────┐
│  RELATION           SYMBOL              MEANING                 │
├─────────────────────────────────────────────────────────────────┤
│  increases          ───────▶            Arrow (positive)        │
│  directlyIncreases  ═══════▶            Bold arrow (direct)     │
│                                                                 │
│  decreases          ────────┤           Flat head (negative)    │
│  directlyDecreases  ════════┤           Bold flat head          │
│                                                                 │
│  regulates          ───────◇            Diamond head (unknown)  │
│                                                                 │
│  association        ─ ─ ─ ─             Dashed (non-causal)     │
│                                                                 │
│  correlation (+)    ┈┈┈┈┈┈▶            Dotted + arrow          │
│  correlation (-)    ┈┈┈┈┈┈┤            Dotted + flat           │
│                                                                 │
│  ghost edge         ╌╌╌╌╌╌▶            Long dash (cycle)       │
│  (completes cycle)  (often curved)      Not in main graph       │
└─────────────────────────────────────────────────────────────────┘
```

**Line weight:** Can indicate confidence or effect strength
- Thick line: high confidence or strong effect
- Thin line: low confidence or weak effect
- Variable width: if quantitative strength data exists

### 10.3 Edge Modulation Symbols

When a state node modulates an edge, the modulator connects to a **symbol on the edge itself**:

```
                      State Node
                          │
                          │ (modulation link)
                          ▼
                          ◇ ← modulation point symbol
    Source ───────────────●───────────────▶ Target
                          
```

**Modulation point symbols:**

| Symbol | Effect | Meaning |
|--------|--------|---------|
| ⊕ | potentiates | Modulator increases edge strength |
| ◐ | attenuates | Modulator decreases edge strength |
| ⊗ | blocks | Modulator prevents edge from acting |
| ◯ | enables | Modulator required for edge to act |
| ⊖ | reverses | Modulator flips edge polarity |

**Example: TREM2 → phagocytosis modulated by LDAM state**

```
                    LDAM_phenotype
                          │
                          ▼
                          ◐ (attenuates)
    TREM2_activity ───────●─────────────────▶ phagocytosis
```

**Multiple modulators on one edge:**

```
                LDAM_phenotype    complement_C3
                      │                │
                      ▼                ▼
                      ◐                ⊕
    TREM2 ────────────●────────────────●──────────▶ phagocytosis
```

### 10.4 Compartment Visualization

Compartments (cell types, subcellular locations, tissues) are represented as **nested containers**:

```
┌─────────────────────── Brain ───────────────────────┐
│                                                     │
│  ┌──────── Microglia ────────┐   ┌─── Neuron ───┐  │
│  │                           │   │              │  │
│  │  ┌────────┐  ┌────────┐  │   │  ┌────────┐  │  │
│  │  │Lysosome│  │  Cyto- │  │   │  │Mito-   │  │  │
│  │  │        │  │  plasm │  │   │  │chondria│  │  │
│  │  └────────┘  └────────┘  │   │  └────────┘  │  │
│  │                           │   │              │  │
│  └───────────────────────────┘   └──────────────┘  │
│                                                     │
│            ─────── BBB ───────                      │
│                                                     │
│  ┌─────────── Blood ────────────────────────────┐  │
│  │   [transferrin]  [hepcidin]  [cytokines]     │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Cross-compartment edges:** Edges crossing compartment boundaries can be styled differently (e.g., double-line) to highlight transport/signaling between compartments.

### 10.5 Cycle Visualization

Feedback cycles are highlighted with ghost edges and optional cycle highlighting:

```
    ┌──────────────────────────────────────────────┐
    │                 CYCLE: R1                    │
    │            (inflammatory amp)                │
    │                                              │
    │   ┌─────┐      ┌─────┐      ┌─────┐        │
    │   │NFκB │─────▶│IL-6 │─────▶│Hep- │        │
    │   │     │      │     │      │cidin│        │
    │   └──▲──┘      └─────┘      └──┬──┘        │
    │      │                         │            │
    │      │    ╭╌╌╌╌╌╌╌╌╌╌╌╌╮       │            │
    │      │    ╎ ghost edge ╎       ▼            │
    │      ╰╌╌╌╌┤            ╰───┌─────┐         │
    │           │                │Iron │         │
    │           ╰────────────────│ret. │         │
    │                            └──┬──┘         │
    │                               │             │
    │                               ▼             │
    │                           ┌─────┐          │
    │                           │ ROS │          │
    │                           └─────┘          │
    └──────────────────────────────────────────────┘
```

**Cycle indicators:**
- Background shading or border around cycle members
- Ghost edge shown as dashed/curved line
- Label indicating cycle ID and type (R/B if computable)
- Interactive: click to highlight all edges in cycle

### 10.6 Interactive Features

For the interactive visualization tool:

| Feature | Behavior |
|---------|----------|
| **Hover node** | Show: type, full name, key properties |
| **Hover edge** | Show: relation, evidence, PMIDs, modulators |
| **Click node** | Highlight all connected edges, show detail panel |
| **Click cycle indicator** | Highlight all cycle members and ghost edge |
| **Filter by type** | Show/hide node types (e.g., hide all STATEs) |
| **Filter by compartment** | Focus on single cell type or subcellular region |
| **Filter by disease stage** | Show only edges relevant to selected stage |
| **Search** | Find nodes by name, gene symbol, or ChEMBL ID |
| **Zoom semantic** | Zoomed out: show clusters. Zoomed in: show all nodes |
| **Layout options** | Hierarchical, force-directed, compartment-grouped |

### 10.7 Legend Template

Every visualization should include a legend:

```
┌─────────────────── LEGEND ───────────────────┐
│                                              │
│  NODES                    EDGES              │
│  ┌───┐ Stock              ──▶ increases      │
│  ◇    Regulator           ──┤ decreases      │
│  (═)  Process             ──◇ regulates      │
│  ⬡    State               ╌╌▶ ghost edge     │
│  ☁    Boundary            ─ ─ association    │
│       (input/output/                         │
│        intervention)       MODULATION        │
│                           ⊕ potentiates      │
│  CONFIDENCE               ◐ attenuates       │
│  ━━━ high                 ⊗ blocks           │
│  ─── medium               ◯ enables          │
│  ┄┄┄ low                  ⊖ reverses         │
│                                              │
└──────────────────────────────────────────────┘
```

---

## References

### Foundational
1. Meadows DH. Thinking in Systems: A Primer. Chelsea Green Publishing, 2008.
2. Slater T. Recent advances in modeling languages for pathway maps and computable biological networks. Drug Discovery Today 2014;19(2):193-198.

### BEL Specification
3. BEL Language Specification v2.1. https://language.bel.bio
4. Hoyt CT et al. PyBEL: a computational framework for Biological Expression Language. Bioinformatics 2018;34(4):703-704.

### Ontologies
5. Systems Biology Ontology (SBO). https://www.ebi.ac.uk/sbo
6. OBO Relation Ontology (RO). https://obofoundry.org/ontology/ro.html
7. Le Novère N et al. The Systems Biology Graphical Notation. Nat Biotechnol 2009;27(8):735-741.

### Application to AD
8. Domingo-Fernández D et al. Multimodal Mechanistic Signatures for Neurodegenerative Diseases (NeuroMMSig). NPJ Syst Biol Appl 2017;3:26.
9. Catlett NL et al. Reverse causal reasoning: applying qualitative causal knowledge to the interpretation of high-throughput data. BMC Bioinformatics 2013;14:340.

---

## Changelog

- **v1.2** (2026-01-13): Species and Method annotations
  - Added Section 4.2: Species Annotation with NCBI Taxonomy IDs
  - Detailed mouse model table (5xFAD, APP/PS1, 3xTg-AD, etc.) with MGI IDs
  - Added Section 4.3: Method/Evidence Type with causal strength hierarchy
  - Method codes: rct, mr, knockout, knockin, transgenic, intervention_animal, in_vitro, cohort, cross_sectional, toxicology, etc.
  - Causal inference checklist (temporality, dose-response, reversibility, etc.)
  - Renumbered Part 4 sections (4.1-4.7)

- **v1.1** (2026-01-13): Syntax and structure refinements
  - Merged SOURCE, SINK, INTERVENTION → unified BOUNDARY type
  - Direction (input/output) now determined by edges, not node type
  - Added Part 2: Syntax Conventions with clean `namespace:id` format
  - Replaced BEL function syntax (e.g., `bp(GO:...)`) with plain identifiers
  - Node IDs: human-readable strings; References: optional ontology links
  - Renumbered all parts (now 10 parts total)

- **v1.0** (2026-01-13): Initial specification
  - Combined Meadows stock-flow thinking with BEL causal semantics
  - Node types: Stock, Regulator, Process, State, Boundary
  - Edge relations with stock-flow extensions
  - Temporal annotations (optional) for prevention vs treatment timing
  - Cycle tracking with ghost edges; R/B type computed from edge polarities
  - Edge modulation for state-dependent behavior (LDAM example)
  - Quantitative edge strength (optional): kinetics, stoichiometry, correlation, effect size
  - Polarity derived from relation type or quantitative data, not stored separately
  - Visualization conventions for nodes, edges, modulation points, compartments, cycles
