---
planStatus:
  planId: plan-external-validation-framework
  title: External Validation Framework for AD Mechanistic Model
  status: draft
  planType: research
  priority: high
  owner: developer
  stakeholders:
    - developer
    - research-team
  tags:
    - validation
    - clinical-trials
    - prediction
    - external-data
  created: "2026-01-20"
  updated: "2026-01-20T14:35:00.000Z"
  progress: 0
  dueDate: "2026-02-15"
---

# External Validation Framework for AD Mechanistic Model

## Goals

1. **Eliminate circular reasoning** - Validate the DAG's predictive power against trials NOT used to construct it
2. **Establish honest metrics** - Report ROC/AUC on held-out temporal data with proper confidence intervals
3. **Identify what the model actually captures** - Distinguish between "predicts failure" vs "detects downstream mechanism"
4. **Create reproducible validation pipeline** - Scripts that can be re-run as new trial data becomes available

## Problem Description

### The Core Issue

The current scripts (`predict-trial-failures.ts`, `analyze-failed-trials.ts`) claim predictive power but suffer from **information leakage**:

- The DAG was constructed with knowledge of which trials failed
- Keyword→node mappings were created to match known failure patterns
- "100% of failures don't break loops" is a tautology if loops were defined post-hoc

### Jobs to Be Done

1. **As a researcher**, I want to know if this mechanistic model genuinely predicts trial outcomes, so I can trust its recommendations for novel drug development
2. **As a skeptic**, I want to see validation against data the model builders never saw, so I can assess whether the claims are overfit
3. **As a developer**, I want an automated pipeline that fetches new trials and tests predictions, so the model stays honest over time

### What Success Looks Like

- A validation dataset of 50+ trials completed after 2023 (trials the current model couldn't have been trained on)
- Honest ROC-AUC with 95% confidence intervals
- Clear documentation of what information was available vs. held out
- Comparison against naive baselines (e.g., "predict all Phase 3 trials fail" = 95% accuracy)

## High-Level Approach

### Phase 1: Build External Validation Dataset

**Data Sources:**
1. **AACT Database** - PostgreSQL dump of ClinicalTrials.gov, structured for queries
2. **Cummings Pipeline Reviews (2021-2025)** - CADRO-annotated mechanism data
3. **Kim et al. 2022** - Curated list of 98 failed trials 2004-2021 with mechanisms

**Output:** A CSV/JSON file with:
- NCT ID
- Drug name
- Mechanism (CADRO category + free text)
- Phase
- Start date, completion date
- Outcome (success/failure/ongoing)
- Whether it was in the original training data (boolean flag)

### Phase 2: Define Temporal Holdout Split

| Set | Time Period | Purpose | Expected Size |
|-----|-------------|---------|---------------|
| Training | Completed before 2020 | What the model "knew" | ~60 trials |
| Validation | Completed 2020-2022 | Hyperparameter tuning | ~30 trials |
| Test | Completed 2023-2025 | Final honest evaluation | ~40 trials |

**Critical:** The test set must contain trials that concluded AFTER the model was built.

### Phase 3: Standardize Mechanism Mapping

Current problem: Ad-hoc keyword matching ("amyloid" → 3 nodes, "tau" → 2 nodes)

**Solution:**
- Map CADRO categories to DAG modules systematically
- Document the mapping rules BEFORE testing
- Use exact target names from trial registrations, not inferred keywords

| CADRO Category | DAG Module(s) | Mapping Rule |
|----------------|---------------|--------------|
| Anti-amyloid immunotherapy | M06 | Direct |
| Tau aggregation inhibitor | M07 | Direct |
| Anti-inflammatory | M04, M05 | Check specific target |
| Metabolism/Bioenergetics | M01, M03 | Check mTOR vs mitochondria |
| Neuroprotection | BOUNDARY | Generic symptomatic |

### Phase 4: Define Prediction Logic

The current model conflates multiple signals. Separate them:

1. **Structural prediction** (from DAG alone):
   - Betweenness centrality of target node
   - Distance to clinical outcomes
   - Number of feedback loops broken

2. **Pharmacological prediction** (from drug properties):
   - CNS MPO score
   - BBB penetration
   - Antibody vs small molecule

3. **Historical pattern** (from past trials):
   - Failure rate of mechanism class
   - Success of similar drugs

Test each independently, then combine.

### Phase 5: Implement Validation Scripts

**New scripts needed:**

1. `scripts/fetch-external-trials.ts` - Downloads and processes AACT data
2. `scripts/validate-model.ts` - Runs predictions on held-out set, reports metrics
3. `scripts/compare-baselines.ts` - Tests naive baselines for comparison

**Metrics to report:**
- ROC-AUC with 95% CI (bootstrapped)
- Precision-recall curve
- Calibration plot (predicted probability vs actual rate)
- Comparison to naive baselines:
  - "All fail" (95% accuracy, 0% informativeness)
  - "Anti-amyloid fails" (historical pattern only)
  - "Phase 3 × anti-amyloid fails"

### Phase 6: Document Limitations Honestly

The README and script outputs must clearly state:
- What data the model was trained on
- What data it was tested on
- What the model CAN and CANNOT predict
- Confidence intervals on all metrics

## Key Components

### 1. Validation Data Pipeline
- AACT database connection/download
- CADRO annotation joining
- Temporal split logic
- Data quality checks

### 2. Standardized Mechanism Mapper
- CADRO → DAG module mapping table
- Drug target → node ID resolution
- Handling of multi-target drugs
- Unknown mechanism handling

### 3. Prediction Model Refactor
- Separate structural vs pharmacological vs historical signals
- Explicit feature definitions (not ad-hoc)
- Probability calibration
- Uncertainty quantification

### 4. Metrics Dashboard
- ROC curves with CI bands
- Calibration plots
- Feature importance analysis
- Temporal stability analysis (does model degrade over time?)

### 5. Baseline Comparisons
- Naive "all fail" baseline
- Historical mechanism rate baseline
- "Phase + mechanism" heuristic baseline
- Published model comparisons (if available)

## Files Affected

### New Files
- `scripts/fetch-external-trials.ts`
- `scripts/validate-model.ts`
- `scripts/compare-baselines.ts`
- `src/data/validation/external-trials.json`
- `src/data/validation/cadro-mapping.ts`
- `src/data/validation/temporal-splits.ts`
- `src/lib/validationMetrics.ts`

### Modified Files
- `scripts/predict-trial-failures.ts` - Add caveat about circular reasoning, reference validation
- `scripts/analyze-failed-trials.ts` - Same caveats
- `CLAUDE.md` - Document validation approach

### Potentially Deprecated
- Current prediction claims in script outputs
- "ROC ~0.90" claim without external validation backing

## Acceptance Criteria

1. **Validation dataset exists** with 100+ trials, clearly marked by temporal split
2. **CADRO→DAG mapping is documented** before running tests (pre-registration)
3. **Metrics are reported with confidence intervals** - no point estimates without uncertainty
4. **Naive baselines are compared** - can't claim victory without comparison
5. **Test set was truly held out** - no peeking during development
6. **Limitations section is honest** - clearly states what the model does NOT predict

## Success Metrics

| Metric | Baseline (Naive) | Target | Stretch Goal |
|--------|------------------|--------|--------------|
| Test Set ROC-AUC | 0.50 (random) | >0.65 | >0.75 |
| Better than "all fail" | 0% lift | >5% precision lift | >15% |
| Calibration error | - | <0.15 | <0.10 |
| Trials evaluated | - | 50+ test set | 100+ |

**Honest outcome:** If the model only achieves 0.55-0.60 AUC on truly held-out data, that's a valid finding. It means the DAG captures some signal but is far from a reliable predictor. This is still valuable - it guides where to improve the model.

## Open Questions

1. **How to handle mechanism ambiguity?**
   - Some trials have vague mechanisms ("neuroprotection")
   - Options: exclude, use generic mapping, create "unknown" category

2. **What counts as "failure"?**
   - Terminated for futility = clear failure
   - Terminated for business reasons = ambiguous
   - Withdrawn before enrollment = exclude?

3. **How to handle combination trials?**
   - Multiple mechanisms complicate node mapping
   - Options: exclude, use primary mechanism, create composite score

4. **Should we compare to published models?**
   - Some ML models exist for trial success prediction
   - Fair comparison would strengthen claims

5. **How often to re-validate?**
   - New trials complete regularly
   - Quarterly? Annually? On-demand?

6. **What if the model performs poorly?**
   - Publish anyway (negative results matter)
   - Investigate which features fail
   - Consider whether DAG structure needs revision

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Model performs poorly on held-out data | Medium | High | Document honestly, investigate why |
| CADRO mapping is arbitrary | Medium | Medium | Pre-register mapping, sensitivity analysis |
| Insufficient test set size | Low | High | Combine multiple data sources |
| AACT data quality issues | Low | Medium | Manual verification of sample |

## Timeline Estimate

- Phase 1 (Data collection): 3-5 days
- Phase 2 (Temporal splits): 1 day
- Phase 3 (Mechanism mapping): 2-3 days
- Phase 4 (Prediction refactor): 3-5 days
- Phase 5 (Validation scripts): 3-5 days
- Phase 6 (Documentation): 1-2 days

**Total: 2-3 weeks**

---

*This plan prioritizes honest evaluation over impressive metrics. A well-calibrated model with modest AUC is more valuable than an overfit model with inflated claims.*
