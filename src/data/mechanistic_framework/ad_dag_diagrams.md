# AD DAG SBSF Translation Checklist: Visual Diagrams

**Parent Document**: ad_dag_sbsf_translation_checklist.md
**Date Created**: 2026-01-14
**Last Updated**: 2026-01-14
**Purpose**: ASCII art visualizations of pathway flows and module interactions

**Note**: Source line numbers refer to the original locations in the parent checklist where these diagrams were first documented. The checklist now contains "See" references pointing back to this document.

---

## Table of Contents

**System Boundaries**

- [Boundary Diagram](#diagram-1)

**Module 1: Insulin/mTOR/Autophagy Axis**

- [Diagram: Complete mTORC1 Feedback System](#diagram-2)

**Module 2: Lysosomal Pathology**

- [Module 2 Summary Diagram](#diagram-3)

**Module 3: Mitochondrial Dysfunction**

- [Module 3 Summary Diagram](#diagram-4)

**Module 4: Inflammasome & Cytokines**

- [Critical Feedback Loop: NLRP3 ↔ Tau](#diagram-5)

**Module 5: Microglial Phenotypes**

- [Module 5 Summary Diagram](#diagram-5b)

**Module 6: Amyloid Pathology**

- [Module 6 Summary Diagram](#diagram-6)

**Module 7: Tau Pathology**

- [Tau-Inflammation Spreading Front](#diagram-7)
- [Transsulfuration Pathway](#diagram-8)
- [The Broken Protective Loop in AD](#diagram-8b)
- [GSK3β - Opposing Pathways](#diagram-8c)

**Module 8: Complement & Synaptic Pruning**

- [The Timing Paradigm: Early Therapeutic Window](#diagram-9)

**Module 9: Iron Dysregulation & Ferroptosis**

- [The Therapeutic Paradox Resolved](#diagram-10)
- [Module 9 Integration Diagram](#diagram-11)
- [Connection to CSE/H₂S Pathway (Module 7B)](#diagram-12)

**Module 10: APOE4 Pathways & REST/Epigenetic Dysregulation**

- [APOE4 Lipid Pathway Summary](#diagram-13)

**Module 11: TREM2 & DAM**

- [TREM2 Mechanistic Summary](#diagram-14)

**Module 12: BBB & Glymphatic**

- [APOE4-BBB-Cognition Axis](#diagram-12b)

**Module 14: MAM & Calcium**

- [The MAM Hypothesis: Mechanistic Summary](#diagram-15)

**Module 15: Interventions & Clinical Boundaries**

- [Clinical Trial Success/Failure Framework](#diagram-16)

**Module 16: Sex & Ancestry Modifiers**

- [The Mechanistic Model](#diagram-17)
- [The Complete X-Linked Mechanistic Chain](#diagram-18)
- [The Complete Ancestry → Fat → Inflammation → AD Chain](#diagram-19)

---

# System Boundaries

## Diagram 1: Boundary Diagram

**Source**: Lines 113-127

```
INPUT BOUNDARIES                    INTERNAL MODEL                    OUTPUT BOUNDARIES
                                    (Modules 1-14)
    aging ─────────────────┐                                    ┌──→ cognitive_score ──→ cognitive_function
                           │                                    │
    APOE4_genotype ────────┼──→ [Molecular/Cellular Mechanisms] ┼──→ synapses
                           │         Feedback Loops             │
    TREM2_variants ────────┤         Reinforcing Cascades       ├──→ neuronal_count
                           │                                    │
    familial_AD_mutations ─┤                                    ├──→ brain_volume
                           │                                    │
    sex ───────────────────┤                                    └──→ CSF_biomarkers
                           │
    sleep_disruption ──────┘
```

---

# Module 1: Insulin/mTOR/Autophagy Axis

## Diagram 2: Diagram: Complete mTORC1 Feedback System

**Source**: Lines 349-388

```
                    INSULIN RESISTANCE
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             │
    ↓PI3K-AKT signaling                   │
            │                             │
            ▼                             │
    ↓TSC1/2 activity                      │
            │                             │
            ▼                             │
    ┌───────────────┐                     │
    │   mTORC1      │◄────────────────────┤
    │ HYPERACTIVE   │                     │
    └───────┬───────┘                     │
            │                             │
    ┌───────┼───────────┬─────────┐       │
    │       │           │         │       │
    ▼       ▼           ▼         ▼       │
  TFEB-P  ULK1-P    AMPK-P    S6K1-P      │
    │       │           │         │       │
    ▼       ▼           ▼         ▼       │
  Lyso    Mitophagy   Mitophagy  IRS1-pSer│
  genes↓  reduced     reduced       │     │
    │       │           │           │     │
    ▼       └─────┬─────┘           │     │
  Lysosomal       ▼                 │     │
  dysfunction  Damaged              │     │
    │          mito pool            │     │
    │             │                 │     │
    ▼             ▼                 ▼     │
  [Module 2]   [Module 3]    INSULIN ─────┘
                             RESISTANCE
                             (AMPLIFIED)
                                  ▲
                                  │
                    Also fed by inflammatory pathway:
                    Aβ → microglia → TNF-α → JNK → IRS1-pS307
```

---

# Module 2: Lysosomal Pathology

## Diagram 3: Module 2 Summary Diagram

**Source**: Lines 576-611

```
LYSOSOMAL DYSFUNCTION (from Module 1)
         │
         ├──────────────────────────────────────────────┐
         │                                              │
         ▼                                              ▼
    ROUTE 1A: LMP                              ROUTE 1B: INCOMPLETE MITOPHAGY
         │                                              │
         ▼                                              │
  Cargo accumulation                           Damaged mito pool
         │                                              │
         ▼                                              ▼
    Lipofuscin                                  Mitophagosome
         │                                              │
         ▼                                              ▼
       LMP ◄────────────────────────────────────Autolysosome
         │                                              │
         ▼                                              │
  Cathepsin B (cytosolic)                      mtDNA undegraded
         │                                     (DNase II inactive)
         │                                              │
         ▼                                              ▼
      NLRP3 ←───────────────────────────── mtDNA from lysosome
         │                                              │
         │                                              ▼
         │                                        cGAS-STING
         │                                              │
         ▼                                              ▼
     IL-1β ───────────────────────────────────→ Type I IFN
         │                                              │
         └──────────────────┬───────────────────────────┘
                            │
                            ▼
                   NEUROINFLAMMATION
                      (Module 4)
```

---

# Module 3: Mitochondrial Dysfunction

## Diagram 4: Module 3 Summary Diagram

**Source**: Lines 789-830

```
DAMAGED MITOCHONDRIA POOL (from Module 1)
         │
         ▼
    MITO ROS ──────────────────────────────────────┐
         │                                          │
    ┌────┴────┐                                     │
    ▼         ▼                                     │
mtDNA      Ca²⁺                                     │
OXIDIZED   OVERLOAD                                 │
    │         │                                     │
    │         ▼                                     │
    │      mPTP OPEN                                │
    │         │                                     │
    │         ▼                                     │
    │    VDAC OLIGOMERS                             │
    │         │                                     │
    ▼         ▼                                     │
  FEN1    ┌──────┐                                  │
  cleavage│      │                                  │
    │     │      │                                  │
    ▼     ▼      ▼                                  │
ox-mtDNA  │   mtDNA                                 │
(cytosol) │  (cytosol)                              │
    │     │      │                                  │
    │     │      │                                  │
    ▼     │      ▼                                  │
  NLRP3 ◄─┘   cGAS-STING                           │
    │              │                                │
    ▼              ▼                                │
  IL-1β      Type I IFN ────────────────────────────┘
    │              │                              (also
    └──────┬───────┘                              Module 2
           │                                      Route 1B)
           ▼
    NEUROINFLAMMATION
       (Module 4)

PROTECTIVE PATHWAY:
PINK1/Parkin mitophagy ─────┤ (removes damaged mito 
                              BEFORE mtDNA release)
```

---

# Module 4: Inflammasome & Cytokines

## Diagram 5: Critical Feedback Loop: NLRP3 ↔ Tau

**Source**: Lines 1450-1478

```
         Aβ Oligomers
              │
              ▼
         ┌─────────┐
         │  NLRP3  │◄──────────────────────────┐
         │  Active │                           │
         └────┬────┘                           │
              │                                │
      ┌───────┼───────┐                        │
      │       │       │                        │
      ▼       ▼       ▼                        │
  IL-1β    GSK-3β↑   PP2A↓                     │
      │       │       │                        │
      │       └───┬───┘                        │
      │           │                            │
      │           ▼                            │
      │    TAU HYPERPHOSPHORYLATED             │
      │           │                            │
      │           ▼                            │
      │    TAU AGGREGATED (PHF/NFT)            │
      │           │                            │
      └──────────►├────────────────────────────┘
                  │        (tau seeds activate NLRP3)
                  │
                  ▼
           TAU PROPAGATION
           (Braak staging)
```

---

# Module 5: Microglial Phenotypes

## Diagram 5B: Module 5 Summary Diagram

**Source**: Lines 1786-1837

```
                    NEUROINFLAMMATION (from Module 4)
                              │
                              ▼
                    MICROGLIA ACTIVATED
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
         NF-κB active    DAM Transition   Direct to LDAM
              │          (2-step TREM2)   (under chronic
              │               │            activation)
              ▼               │               │
        HIF-1α ←──────────────┤               │
        Stabilized            │               │
              │               │               │
              ▼               │               │
         PKM2 Dimer ◄─────────┤               │
        (nuclear TF)          │               │
              │               │               │
              ▼               │               │
        GLYCOLYTIC SWITCH     │               │
              │               │               │
              ▼               │               │
        SREBP1 Active         │               │
              │               │               │
              ▼               │               │
        LIPID DROPLETS        │               │
              │               │               │
              ▼               ▼               │
              └───────────► LDAM ◄───────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
        Phagocytosis    Persistent      IL-1α + TNF
        IMPAIRED        Cytokines       + C1q secretion
              │               │               │
              │               │               ▼
              │               │          A1 ASTROCYTES
              │               │               │
              │               │               ▼
              │               │         NEUROTOXICITY
              │               │
              ▼               ▼
        Aβ, debris      FEED-FORWARD
        accumulate       → MORE
                      NEUROINFLAMMATION

PARALLEL PATHWAY:
C1q from LDAM → synapse tagging → CR3-mediated pruning → SYNAPSE LOSS
```

---

# Module 6: Amyloid Pathology

## Diagram 6: Module 6 Summary Diagram

**Source**: Lines 2073-2116

```
        INFLAMMATION (Module 4)
               │
               ▼
         NF-κB ACTIVE
               │
               ▼
    ┌──────────────────────┐
    │  BACE1 UPREGULATED   │
    │  (rate-limiting)     │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │  APP → C99 → Aβ      │
    │  (γ-secretase)       │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │    Aβ MONOMERS       │
    └──────────┬───────────┘
               │ aggregation
               ▼
    ┌──────────────────────┐
    │   Aβ OLIGOMERS       │◄─────────── CLEARANCE IMPAIRED
    │   (MOST TOXIC)       │             (LDAM, Module 5)
    └──────────┬───────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
    ▼          ▼          ▼
 Synapse   Microglia   Plaque
 Binding   Activation  Formation
    │          │          │
    ▼          │          ▼
 LTP Block     │     COMPACTION
 Cognition↓    │     (protective if
               │      TREM2 intact)
               ▼
         NEUROINFLAMMATION
               │
               └────► FEED-FORWARD TO NF-κB → BACE1
```

---

# Module 7: Tau Pathology

## Diagram 7: Tau-Inflammation Spreading Front

**Source**: Lines 2313-2359

```
              REGION 1 (e.g., Entorhinal)                   REGION 2 (e.g., Hippocampus)
              ───────────────────────────                   ──────────────────────────────
              
    Aβ + Inflammation                                       
           │                                                
           ▼                                                
    NLRP3 ACTIVATION                                        
           │                                                
           ├───► GSK-3β↑ + PP2A↓                            
           │                                                
           ▼                                                
    TAU HYPERPHOSPHORYLATION                                
           │                                                
           ▼                                                
    PHF → NFT FORMATION                                     
           │                                                
           ▼                                                
    ┌──────────────────────┐                                
    │ NEURONAL DEATH or    │                                
    │ MICROGLIAL UPTAKE    │                                
    └──────────┬───────────┘                                
               │                                            
               ▼                                            
    ┌──────────────────────┐                                
    │ EXOSOMAL TAU RELEASE │────────────────────────────────►  TAU SEEDS
    │ (Microglia are       │                                      │
    │  primary vectors)    │                                      │
    └──────────────────────┘                                      │
                                                                  ▼
                                                           UPTAKE BY NEURONS
                                                                  │
                                                                  ▼
                                                           NLRP3 ACTIVATION
                                                           (in local microglia)
                                                                  │
                                                                  ├──► GSK-3β↑
                                                                  │
                                                                  ▼
                                                           TEMPLATED MISFOLDING
                                                           OF NATIVE TAU
                                                                  │
                                                                  ▼
                                                           NEW PHF/NFT FORMATION
                                                           
                       This cycle repeats → Braak staging (I-VI)
```

---

## Diagram 8: Transsulfuration Pathway

**Source**: Lines 2420-2478

```
                    DIETARY METHIONINE
                           │
                           ▼
                    S-adenosylmethionine (SAM)
                           │ (methylation reactions)
                           ▼
                    S-adenosylhomocysteine (SAH)
                           │
                           ▼
    ┌──────────────────────────────────────────────────────────────┐
    │               HOMOCYSTEINE                                    │
    │  (elevated = AD risk factor, vascular damage)                │
    └──────────────────────┬───────────────────────────────────────┘
                           │
                           │ + Serine
                           ▼
    ┌──────────────────────────────────────────────────────────────┐
    │           CBS (Cystathionine β-synthase)                     │
    │           • Primarily in ASTROCYTES                          │
    │           • PLP (vitamin B6)-dependent                       │
    │           • Also produces H₂S from homocysteine              │
    └──────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
    ┌──────────────────────────────────────────────────────────────┐
    │               CYSTATHIONINE                                   │
    └──────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
    ┌──────────────────────────────────────────────────────────────┐
    │           CSE (Cystathionine γ-lyase)                        │
    │           • Primarily in NEURONS                             │
    │           • KEY NEUROPROTECTIVE ENZYME                       │
    │           • Depleted in AD                                   │
    └──────────────────────┬───────────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
    ┌───────────────┐             ┌───────────────┐
    │   CYSTEINE    │             │    H₂S        │
    │               │             │  (Hydrogen    │
    │ Rate-limiting │             │   Sulfide)    │
    │ for GSH       │             │               │
    └───────┬───────┘             └───────┬───────┘
            │                             │
            ▼                             ▼
    ┌───────────────┐             ┌───────────────────────────┐
    │  GLUTATHIONE  │             │     SULFHYDRATION         │
    │    (GSH)      │             │  (S-persulfidation)       │
    │               │             │                           │
    │  Antioxidant  │             │  Target proteins:         │
    │  defense      │             │  • GSK3β → INHIBITED      │
    │               │             │  • Parkin → ACTIVATED     │
    │               │             │  • NF-κB → anti-apoptotic │
    │               │             │  • Keap1 → Nrf2 release   │
    └───────────────┘             └───────────────────────────┘
```

---

## Diagram 8B: The Broken Protective Loop in AD

**Source**: Lines 2599-2656

```
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                        HEALTHY STATE                                         │
    │                                                                             │
    │    WILD-TYPE TAU ──────► BINDS CSE ──────► ENHANCES CSE ACTIVITY            │
    │         │                                         │                         │
    │         │                                         ▼                         │
    │         │                               H₂S PRODUCTION ↑                    │
    │         │                                         │                         │
    │         │                          ┌──────────────┴──────────────┐          │
    │         │                          │                             │          │
    │         │                          ▼                             ▼          │
    │         │                    GSH ↑                       SULFHYDRATION      │
    │         │                    (antioxidant)                       │          │
    │         │                                                        ▼          │
    │         │                                               GSK3β-SSH           │
    │         │                                               (INACTIVE)          │
    │         │                                                        │          │
    │         │                                                        ▼          │
    │         ◄────────────────────────────────────────────── TAU STAYS           │
    │         (maintains normal tau)                          UNPHOSPHORYLATED    │
    │                                                                             │
    │                       PROTECTIVE FEEDFORWARD LOOP                           │
    └─────────────────────────────────────────────────────────────────────────────┘
    
    
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                        AD / AGING STATE                                      │
    │                                                                             │
    │    MUTANT/AGGREGATED TAU ─╳─► CANNOT BIND CSE                               │
    │         │                          │                                        │
    │         │                          ▼                                        │
    │         │                 CSE ACTIVITY ↓                                    │
    │         │                 (also depleted in AD brain)                       │
    │         │                          │                                        │
    │         │                          ▼                                        │
    │         │                 H₂S PRODUCTION ↓                                  │
    │         │                          │                                        │
    │         │           ┌──────────────┴──────────────┐                         │
    │         │           │                             │                         │
    │         │           ▼                             ▼                         │
    │         │     GSH ↓                        SULFHYDRATION ↓                  │
    │         │     (oxidative stress ↑)                │                         │
    │         │           │                             ▼                         │
    │         │           │                     GSK3β ACTIVE                      │
    │         │           │                             │                         │
    │         │           ▼                             ▼                         │
    │         │     DNA damage               TAU HYPERPHOSPHORYLATION ↑           │
    │         │     BBB breakdown                       │                         │
    │         │     Neurogenesis ↓                      ▼                         │
    │         │                               AGGREGATION → NFT                   │
    │         │                                         │                         │
    │         ◄─────────────────────────────────────────┘                         │
    │         (more pathological tau)                                             │
    │                                                                             │
    │                       VICIOUS CYCLE                                         │
    └─────────────────────────────────────────────────────────────────────────────┘
```

---

## Diagram 8C: GSK3β - Opposing Pathways (NLRP3 vs CSE/H₂S)

**Source**: Lines 2660-2685

```
                    ┌─────────────────────────────────────┐
                    │              GSK3β                   │
                    │                                     │
    INFLAMMASOME    │                                     │    TRANSSULFURATION
    (PATHOGENIC)    │                                     │    (PROTECTIVE)
                    │                                     │
    NLRP3 ─────────►│ ACTIVATION                          │◄────────── CSE/H₂S
       │            │    ↓                                │              │
       │            │ GSK3β-active                        │         GSK3β-SSH
       │            │    │                                │         (inactive)
       │            │    ▼                                │              │
       │            │ TAU PHOSPHORYLATION ↑               │              │
       ▼            │                                     │              ▼
    IL-1β           │                                     │         TAU PROTECTED
       │            │         NET EFFECT:                 │
       │            │    Balance determines outcome       │
       │            │                                     │
       │            │    AD = NLRP3 > CSE                 │
       │            │    Healthy = CSE > NLRP3            │
       │            └─────────────────────────────────────┘
       │
       ▼
    p38 → pTau
```

---

# Module 8: Complement & Synaptic Pruning

## Diagram 9: The Timing Paradigm: Early Therapeutic Window

**Source**: Lines 3156-3173

```
DISEASE PROGRESSION →

EARLY                                                      LATE
├──────────────────────────────────────────────────────────►
│
│    C1q ↑              Aβ plaques         NFTs            Dementia
│    Synapse loss       appear             spread
│    BEGINS
│    │                  │                  │               │
│    ▼                  ▼                  ▼               ▼
├────┬──────────────────┬──────────────────┬───────────────┤
     │                  │                  │
     │                  │                  │
     COMPLEMENT         ANTI-Aβ            ANTI-TAU
     INHIBITORS         (lecanemab)        (ongoing)
     (early window)
```

---

# Module 9: Iron Dysregulation & Ferroptosis

## Diagram 10: The Therapeutic Paradox Resolved

**Source**: Lines 3519-3595

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     WHY GLOBAL CHELATION FAILS                                  │
│                                                                                 │
│   DEFERIPRONE (Global Chelator) in Parkinson's Disease:                        │
│                                                                                 │
│   ├── Removes iron from ALL cells                                              │
│   ├── Healthy neurons become iron-STARVED                                      │
│   │   ├── Tyrosine hydroxylase (iron-dependent) fails                         │
│   │   ├── Ribonucleotide reductase (iron-dependent) fails                     │
│   │   └── Fe-S cluster enzymes fail                                           │
│   └── RESULT: Patients DETERIORATED (NEJM 2022)                               │
│                                                                                 │
│   "Early separation of curves in favor of PLACEBO group"                       │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                     WHY TARGETED FERROPTOSIS WORKS                              │
│                                                                                 │
│   HK-PCGC (Targeted Ferroptosis Inducer) in Aged Mice:                         │
│                                                                                 │
│   ├── β-galactosidase activation = SENESCENT CELL SPECIFICITY                  │
│   │   └── Healthy cells (low β-gal) are NOT activated                         │
│   ├── HK peptide → ferritin degradation → labile iron release                 │
│   ├── Labile iron → Fenton chemistry → lipid peroxidation                     │
│   ├── Lipid peroxidation → FERROPTOSIS (in senescent cells only)              │
│   ├── Senescent cells DIE (they were dysfunctional anyway)                    │
│   └── RESULT: ↓SASP, ↓inflammation, IMPROVED physical fitness                 │
│                                                                                 │
│   "Safely improve the physical fitness of aged mice"                           │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                     THE RESOLUTION                                              │
│                                                                                 │
│   WRONG: Remove iron globally                                                   │
│   RIGHT: Cell-type specific approach                                            │
│                                                                                 │
│   ┌─────────────────┬────────────────────┬─────────────────────────┐           │
│   │ Cell Type       │ Iron Status        │ Therapeutic Goal        │           │
│   ├─────────────────┼────────────────────┼─────────────────────────┤           │
│   │ Senescent cells │ High iron, β-gal+  │ TRIGGER ferroptosis     │           │
│   │ LDAM            │ Iron-loaded        │ Restore function OR kill│           │
│   │ Functional      │ Need Fe²⁺          │ REDISTRIBUTE iron to    │           │
│   │ neurons         │                    │ them (NOT chelate!)     │           │
│   │ Healthy glia    │ Normal homeostasis │ PROTECT from overload   │           │
│   └─────────────────┴────────────────────┴─────────────────────────┘           │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Diagram 11: Module 9 Integration Diagram

**Source**: Lines 3603-3669

```
                    INFLAMMATION (Modules 4-5)
                           │
                           │ IL-6
                           ▼
                    ┌──────────────┐
                    │   HEPCIDIN   │
                    │   (↑ in AD)  │
                    └──────┬───────┘
                           │
                           │ Degrades
                           ▼
                    ┌──────────────┐
                    │  FERROPORTIN │◄─────────── Estrogen promotes
                    │   (↓ in AD)  │             (lost at menopause)
                    └──────┬───────┘
                           │
                           │ Iron TRAPPED in cells
                           ▼
    ┌──────────────────────┴──────────────────────┐
    │                                             │
    ▼                                             ▼
FERRITIN TRAP                              LYSOSOMAL TRAP
(Fe³⁺ in cages)                            (pH too high)
    │                                             │
    │ ◄───────────────────────────────────────────┤
    │         FUNCTIONAL IRON DEFICIENCY          │
    │         (cytosolic Fe²⁺ depleted)           │
    │                                             │
    ├─────────────────────┬───────────────────────┤
    │                     │                       │
    ▼                     ▼                       ▼
Fe-S clusters↓      TH activity↓           Mitochondria↓
(Module 3)          (dopamine↓)            (Complex I-III)
    │                     │                       │
    └─────────────────────┴───────────────────────┘
                          │
                          ▼
              CELLULAR DYSFUNCTION
                          │
                          │
    ┌─────────────────────┼─────────────────────────┐
    │                     │                         │
    ▼                     ▼                         ▼
HEALTHY NEURONS      SENESCENT CELLS           LDAM
    │                     │                         │
    │                     │ HIGH labile iron        │ Iron-loaded
    │                     │ HIGH β-gal              │ Dysfunctional
    │                     │                         │
    ▼                     ▼                         ▼
NEED: Iron           TARGET: Ferroptosis      RESTORE: Function
REDISTRIBUTION       (Jin 2025)               OR eliminate
(NOT chelation!)
                          │
                          ▼
              ┌───────────────────────┐
              │  TARGETED SENOLYSIS   │
              │  via FERROPTOSIS      │
              │                       │
              │  β-gal probe (GD)     │
              │  + Ce6 photosensitizer│
              │  + HK peptide (→FTN)  │
              │  ───────────────────  │
              │  ↓ SASP               │
              │  ↓ Inflammation       │
              │  ↑ Physical function  │
              └───────────────────────┘
```

---

## Diagram 12: Connection to CSE/H₂S Pathway (Module 7B)

**Source**: Lines 3674-3710

```
                    CSE DEPLETION (AD/Aging)
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
    CYSTEINE ↓                     H₂S ↓
            │                             │
            ▼                             │
    GSH ↓                                 │
    (antioxidant)                         │
            │                             │
            ▼                             │
    GPX4 CANNOT FUNCTION                  │
    (needs GSH as cofactor)               │
            │                             │
            ▼                             │
    LIPID PEROXIDES ACCUMULATE            │
            │                             │
            └──────────────┬──────────────┘
                           │
                           ▼
                    FERROPTOSIS VULNERABILITY
                           │
                           │ + IRON ACCUMULATION
                           │   (CSE-/- phenotype)
                           │
                           ▼
                    DOUBLE HIT:
                    • More iron (Fenton fuel)
                    • Less GPX4 (no brake)
                           │
                           ▼
                    FERROPTOTIC CELL DEATH
```

---

# Module 10: APOE4 Pathways & REST/Epigenetic Dysregulation

## Diagram 13: APOE4 Lipid Pathway Summary

**Source**: Lines 4536-4560

```
APOE4 genotype (Arg112)
    │
    ├──→ Domain interaction (Arg61-Glu255)
    │         │
    │         ├──→ ↓ Protein stability → aggregation
    │         └──→ ↓ Lipid-binding capacity
    │
    ├──→ ↑ ABCA1 aggregation → ↓ membrane recycling
    │         │
    │         └──→ ↓ APOE lipidation
    │                   │
    │                   └──→ ↓ Aβ clearance (LRP1-dependent)
    │
    ├──→ ↑ Lysosomal cholesterol sequestration
    │         │
    │         ├──→ ER "blind" to cholesterol → ↑ SREBP2/HMGCR
    │         └──→ LXR cannot sense → ↓ ABCA1 transcription
    │
    └──→ ↑ TAG binding → ↑ astrocyte lipid droplets
              │
              └──→ ↑ Unsaturated lipids → ↑ ferroptosis vulnerability
```

---

# Module 11: TREM2 & DAM

## Diagram 14: TREM2 Mechanistic Summary

**Source**: Lines 5283-5309

```
TREM2 Variants (R47H, R62H, Q33X)
    │
    └──→ ↓ TREM2 surface expression/function
              │
              ├──→ ↓ DAM Stage 2 transition
              │         │
              │         └──→ ↓ Phagocytic capacity
              │
              ├──→ ↓ Microglia barrier function
              │         │
              │         └──→ ↓ Plaque compaction → ↑ neuritic dystrophy
              │
              ├──→ ↓ Lysosomal function
              │         │
              │         ├──→ ↓ ATP6AP2 (v-ATPase)
              │         └──→ ↓ LAMP2 (CMA)
              │
              └──→ ↓ Lipid droplet homeostasis
                        │
                        └──→ Lipid metabolism defects

PARADOXES:
1. TREM2 → ↑ Senescent microglia (Rachmian 2024)
2. sTREM2↑ = slower progression (protective biomarker?)
3. Timing-dependent: beneficial EARLY, harmful MID-stage
```

---

# Module 12: BBB & Glymphatic

## Diagram 12B: APOE4-BBB-Cognition Axis

**Source**: Lines 6287-6291
**Key Reference**: Montagne 2020 Nature (PMID:32376954)

```
APOE4 → CypA↑ → MMP9↑ → TJ degradation → BBB breakdown → Cognitive decline
                                                       ↘ (independently of)
                                                         Aβ/tau pathology
```

**Key Insight**: This parallel pathway shows APOE4 drives cognitive decline through BBB breakdown INDEPENDENTLY of amyloid and tau pathology. BBB breakdown:
1. Is present in cognitively normal APOE4 carriers
2. Is NOT related to Aβ or tau PET/CSF measures
3. Predicts cognitive decline via CSF sPDGFRβ (pericyte injury biomarker)

---

# Module 14: MAM & Calcium

## Diagram 15: The MAM Hypothesis: Mechanistic Summary

**Source**: Lines 7491-7520

```
FAD Mutations (PS1, PS2, APP)
    │
    ├──→ PS2: Enhanced Mfn2 binding → ↑ER-mito tethering
    │
    ├──→ PS1: ER Ca²⁺ leak dysfunction → ↑ER Ca²⁺ stores
    │
    └──→ APP C99 accumulation → ↑MAM cholesterol
                │
                ▼
        ┌───────────────────────────────────┐
        │     MAM HYPERCONNECTIVITY         │
        │  (↑contact sites, ↓distance)      │
        └───────────────────────────────────┘
                │
    ┌───────────┼───────────┬───────────────┐
    ▼           ▼           ▼               ▼
↑γ-secretase  ↑ER-mito    ↑Lipid      ↑Autophagosome
  at MAM      Ca²⁺ flux   dysmetab.   formation defect
    │           │           │               │
    ▼           ▼           ▼               ▼
  ↑Aβ       ↑Mito Ca²⁺  Membrane      Impaired
production   overload   composition   clearance
                │           ↓
                ▼       ↑Ferroptosis
            mPTP opening vulnerability
                │
                ▼
         NEURODEGENERATION
```

---

# Module 15: Interventions & Clinical Boundaries

## Diagram 16: Clinical Trial Success/Failure Framework

**Source**: Lines 7780-7798

```
MECHANISM → CSF_concentration → target_occupancy → biomarker_change → clinical_benefit
    │              │                   │                  │                │
    │              ↓                   ↓                  ↓                ↓
    │         BBB penetration     PET/CSF marker    Cognitive      Real-world
    │         sufficient?        movement?         slowing?       implementable?
    │              │                   │                │                │
    │              ↓                   ↓                ↓                ↓
    │           FAILURE           FAILURE          FAILURE         FAILURE
    │           POINT 1          POINT 2          POINT 3         POINT 4
    │              │                   │                │                │
    └──────────────┴───────────────────┴────────────────┴────────────────┘
                                    
Examples of each failure mode:
1. PK failure: Solanezumab (insufficient target engagement)
2. Biomarker failure: Semagacestat (wrong direction - increased Aβ)
3. Clinical failure: Many BACE inhibitors (biomarker hit, no cognitive benefit)
4. Implementation failure: Aducanumab (approved but limited uptake due to ARIA/logistics)
```

---

# Module 16: Sex & Ancestry Modifiers

## Diagram 17: The Mechanistic Model

**Source**: Lines 8473-8535

```
                         SEX & ANCESTRY MODIFIER ARCHITECTURE
                                        
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                           BOUNDARY INPUTS                                   │
  │                                                                             │
  │   SEX                                    GENETIC ANCESTRY                   │
  │   ┌──────────┐                          ┌───────────────────┐              │
  │   │ Female   │                          │ Local Ancestry    │              │
  │   │ Male     │                          │ at APOE Locus     │              │
  │   │ Menopause│                          │ (EUR/AFR/AI/EAS)  │              │
  │   └────┬─────┘                          └─────────┬─────────┘              │
  └────────┼──────────────────────────────────────────┼─────────────────────────┘
           │                                          │
           ▼                                          ▼
  ┌─────────────────────────┐              ┌─────────────────────────┐
  │    HORMONE LEVELS       │              │   APOE EXPRESSION       │
  │  ┌─────────────────┐    │              │   ┌─────────────────┐   │
  │  │ Testosterone    │────┼──────────────┼──►│ Brain APOE4     │   │
  │  │ Estrogen        │    │              │   │ (ancestry-      │   │
  │  │ Progesterone    │    │              │   │  dependent)     │   │
  │  └────────┬────────┘    │              │   └────────┬────────┘   │
  └───────────┼─────────────┘              └────────────┼────────────┘
              │                                         │
              ▼                                         ▼
  ┌───────────────────────────────────────────────────────────────────┐
  │                    LYSOSOMAL FUNCTION                              │
  │                                                                    │
  │   Testosterone ──────► ↑ Autophagy flux (males)                   │
  │                                                                    │
  │   Estrogen loss ─────► ↓ v-ATPase activity ──► ↑ Lysosomal pH     │
  │                        (post-menopause)                            │
  │                                                                    │
  │   Ancestry ──────────► Lipid substrate availability               │
  │                                                                    │
  └────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
  ┌───────────────────────────────────────────────────────────────────┐
  │                   IMMUNE CELL FUNCTION                             │
  │                                                                    │
  │   MICROGLIA:                                                       │
  │   • Phagocytic capacity (requires lysosomal acidification)        │
  │   • LDAM formation (female > male)                                │
  │   • Complement pathway use (male > female)                        │
  │                                                                    │
  │   ASTROCYTES:                                                      │
  │   • APOE secretion (ancestry-dependent expression)                │
  │   • Lipid handling                                                │
  │                                                                    │
  └────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
  ┌───────────────────────────────────────────────────────────────────┐
  │                    AD PATHOLOGY                                    │
  │                                                                    │
  │   Female APOE4+: Accelerated tau accumulation                     │
  │   Male:          More complement-driven synapse loss              │
  │   African:       Attenuated APOE4 effect; lower plaque burden     │
  │   Amerindian:    Amplified APOE4 effect                           │
  │                                                                    │
  └───────────────────────────────────────────────────────────────────┘
```

---

## Diagram 18: The Complete X-Linked Mechanistic Chain

**Source**: Lines 8714-8777

```
                     X-LINKED GENES → LYSOSOMAL → IMMUNE → AD
                                        
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                        CHROMOSOMAL SEX                                      │
  │                                                                             │
  │   XX (Female)                              XY (Male)                        │
  │   ┌──────────────────────┐                ┌──────────────────────┐         │
  │   │ 2 copies of X-linked │                │ 1 copy (hemizygous)  │         │
  │   │ lysosomal genes      │                │                      │         │
  │   │ BUT: X-inactivation  │                │ Complete LOF if      │         │
  │   │ → mosaic expression  │                │ mutated              │         │
  │   └──────────┬───────────┘                └──────────┬───────────┘         │
  └──────────────┼────────────────────────────────────────┼─────────────────────┘
                 │                                        │
                 ▼                                        ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    X-LINKED LYSOSOMAL GENES                                 │
  │                                                                             │
  │   ATP6AP2 (Xp11.4)  ───────►  v-ATPase assembly                            │
  │                               (proton pump)                                 │
  │                                    │                                        │
  │   SLC9A7 (Xp11.3)   ───────►  Golgi/endo pH    ◄── #1 X-linked AD locus   │
  │                               regulation                                    │
  │                                    │                                        │
  │   ATP6AP1 (Xq28)    ───────►  v-ATPase function                            │
  │                                    │                                        │
  │   LAMP2 (Xq24)      ───────►  Autophagosome-lysosome fusion                │
  │                                                                             │
  └────────────────────────────────────┬────────────────────────────────────────┘
                                       │
                                       ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    LYSOSOMAL ACIDIFICATION                                  │
  │                                                                             │
  │   Normal pH (~4.5-5.0):           Alkalinized pH (>5.5):                   │
  │   • Cathepsins ACTIVE             • Cathepsins INACTIVE                    │
  │   • Substrates degraded           • Substrates ACCUMULATE                  │
  │   • Autophagosomes cleared        • Autophagosomes PILE UP                 │
  │                                                                             │
  └────────────────────────────────────┬────────────────────────────────────────┘
                                       │
                                       ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    MICROGLIAL IMMUNE FUNCTION                               │
  │                                                                             │
  │   Functional lysosomes:           Dysfunctional lysosomes:                 │
  │   • Phagocytosed Aβ CLEARED       • Aβ engulfed but NOT degraded           │
  │   • Lipids processed              • LDAM formation (lipid droplets)        │
  │   • MHC-II presentation OK        • Impaired antigen presentation          │
  │   • NLRP3 appropriately primed    • Chronic NLRP3 activation               │
  │                                                                             │
  └────────────────────────────────────┬────────────────────────────────────────┘
                                       │
                                       ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    AD PATHOLOGY                                             │
  │                                                                             │
  │   • Aβ accumulation (SLC9A7 → Golgi pH → APP processing)                   │
  │   • Tau accumulation (failed autophagic clearance)                         │
  │   • Neuroinflammation (chronic NLRP3, cytokine release)                    │
  │   • Synaptic loss                                                          │
  │                                                                             │
  └─────────────────────────────────────────────────────────────────────────────┘
```

---

## Diagram 19: The Complete Ancestry → Fat → Inflammation → AD Chain

**Source**: Lines 8945-9014

```
                ANCESTRY → FAT DISTRIBUTION → NEUROINFLAMMATION
                                        
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    GENETIC ANCESTRY                                         │
  │                                                                             │
  │   African               European              Asian                         │
  │   ┌────────────┐       ┌────────────┐       ┌────────────┐                 │
  │   │ Lower VAT  │       │ Intermediate│       │ Higher VAT │                 │
  │   │ Higher SAT │       │            │       │ Lower SAT  │                 │
  │   │ (protective)│       │            │       │ "skinny-fat"│                 │
  │   └─────┬──────┘       └─────┬──────┘       └─────┬──────┘                 │
  └─────────┼────────────────────┼────────────────────┼─────────────────────────┘
            │                    │                    │
            ▼                    ▼                    ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    FAT DISTRIBUTION GENES                                   │
  │                                                                             │
  │   RSPO3  ──► Wnt signaling ──► Suppresses gluteofemoral fat                │
  │   TBX15  ──► Adipocyte differentiation + mitochondrial function            │
  │   LYPLAL1 ──► VAT/SAT ratio (sex-specific, females)                        │
  │   LY86   ──► TLR signaling ──► Immune/inflammatory                         │
  │                                                                             │
  │   Sexual dimorphism: 7/14 loci stronger in women                           │
  │                                                                             │
  └────────────────────────────────┬────────────────────────────────────────────┘
                                   │
                                   ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    VISCERAL ADIPOSE TISSUE                                  │
  │                                                                             │
  │   Secretes:                                                                 │
  │   • IL-6, TNF-α (pro-inflammatory)                                         │
  │   • Leptin (crosses BBB)                                                   │
  │   • Resistin, visfatin                                                     │
  │                                                                             │
  │   Portal drainage → Liver → Systemic circulation → BBB                     │
  │                                                                             │
  └────────────────────────────────┬────────────────────────────────────────────┘
                                   │
                                   ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    MENOPAUSE AMPLIFICATION                                  │
  │                                                                             │
  │   Rising FSH (Xiong 2022 Nature):                                          │
  │   • Acts DIRECTLY on hippocampal neurons (not just peripherally)           │
  │   • Activates C/EBPβ-δ-secretase pathway                                   │
  │   • Accelerates Aβ and Tau deposition                                      │
  │   • FSH blockade REVERSES AD-like phenotype in mice                        │
  │                                                                             │
  │   + Visceral fat redistribution post-menopause                             │
  │   + Loss of estrogen's anti-inflammatory effects                           │
  │                                                                             │
  └────────────────────────────────┬────────────────────────────────────────────┘
                                   │
                                   ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    NEUROINFLAMMATION                                        │
  │                                                                             │
  │   • Microglial activation                                                  │
  │   • BBB disruption                                                         │
  │   • Cytokine amplification in brain                                        │
  │   • NLRP3 inflammasome priming                                             │
  │                                                                             │
  └────────────────────────────────┬────────────────────────────────────────────┘
                                   │
                                   ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                    AD PATHOLOGY                                             │
  │                                                                             │
  │   Ancestry prediction:                                                      │
  │   • African: Lower VAT → Lower systemic inflammation → ?Protective         │
  │   • Asian: Higher VAT → Higher inflammation → May offset lower APOE4 freq  │
  │                                                                             │
  │   Sex prediction:                                                          │
  │   • Female post-menopause: FSH↑ + VAT redistribution + estrogen↓           │
  │     = Perfect storm for AD acceleration                                    │
  │                                                                             │
  └─────────────────────────────────────────────────────────────────────────────┘
```

---

