'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Expand,
  Minimize2,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Beaker,
  Users,
  Clock,
  Target,
  Waves,
} from 'lucide-react';
import {
  Container,
  Section,
  SectionHeader,
  Card,
  CardContent,
} from '@/components/ui';
import {
  animalModels,
  pathologyFeatureLabels,
  organismTypeLabels,
  translationalInsights,
  getModelsByOrganism,
  getPathologyStatus,
} from '@/data/translationalFailures';
import { getSection } from '@/data';
import type { AnimalModel, PathologyFeature, PathologyPresence } from '@/types';

const sectionConfig = getSection('translational-failures')!;

// ============================================================================
// CONSTANTS
// ============================================================================

const COLLAPSED_HEIGHT = 400;

const PATHOLOGY_COLUMNS: PathologyFeature[] = [
  'amyloid_plaques',
  'tau_tangles',
  'neuronal_loss',
  'neuroinflammation',
  'cognitive_decline',
  'natural_aging',
];

const ORGANISM_FILTERS: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'transgenic_mouse', label: 'Tg Mice' },
  { id: 'knockin_mouse', label: 'KI Mice' },
  { id: 'rat', label: 'Rats' },
  { id: 'dog', label: 'Dogs' },
  { id: 'degu', label: 'Degus' },
  { id: 'non_human_primate', label: 'Primates' },
  { id: 'simple_organism', label: 'Simple' },
];

// ============================================================================
// BADGE COMPONENT
// ============================================================================

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

function Badge({
  children,
  variant = 'default'
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-[var(--bg-secondary)] text-[var(--text-body)] border-[var(--border)]',
    primary: 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)] border-[var(--accent-orange)]',
    success: 'bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]',
    warning: 'bg-amber-50 text-amber-700 border-amber-300',
    danger: 'bg-[var(--danger-light)] text-[var(--danger)] border-[var(--danger)]',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium border ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

// ============================================================================
// COMPACT PATHOLOGY INDICATOR
// ============================================================================

function PathologyCell({ status }: { status: PathologyPresence | undefined }) {
  if (!status) {
    return <span className="text-[var(--text-muted)]">—</span>;
  }

  const { present, humanRelevance, notes } = status;
  let symbol: string;
  let colorClass: string;
  let title: string;

  if (present === true) {
    if (humanRelevance === 'high') {
      symbol = '✓';
      colorClass = 'text-[var(--success)] font-bold';
      title = 'Present (high human relevance)';
    } else if (humanRelevance === 'debated') {
      symbol = '?';
      colorClass = 'text-[var(--text-muted)]';
      title = 'Present but debated relevance';
    } else {
      symbol = '✓';
      colorClass = 'text-[var(--accent-orange)]';
      title = 'Present (moderate relevance)';
    }
  } else if (present === 'partial') {
    symbol = '◐';
    colorClass = 'text-[var(--accent-orange)]';
    title = 'Partial';
  } else {
    symbol = '✗';
    colorClass = 'text-[var(--danger)]';
    title = 'Absent';
  }

  if (notes) title += `: ${notes}`;

  return (
    <span className={`${colorClass} cursor-help`} title={title}>
      {symbol}
    </span>
  );
}

// ============================================================================
// EXPANDED ROW DETAILS
// ============================================================================

function ExpandedDetails({ model }: { model: AnimalModel }) {
  return (
    <div className="p-4 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Genetic Basis</p>
          <p className="text-[var(--text-body)]">{model.geneticBasis}</p>
        </div>
        <div>
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Primary Use</p>
          <p className="text-[var(--text-body)]">{model.primaryUseCase}</p>
        </div>
        <div>
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">Key Points</p>
          <div className="flex flex-wrap gap-1">
            <span className="text-[var(--success)] text-xs">+{model.strengths.length} strengths</span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--danger)] text-xs">-{model.limitations.length} limitations</span>
          </div>
        </div>
      </div>

      {model.failedTranslations.length > 0 && (
        <div className="mt-4">
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-wide mb-2">Failed Translations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {model.failedTranslations.map((ft, i) => (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] p-2 text-xs">
                <div className="font-medium text-[var(--text-primary)]">
                  {ft.drugName} <span className="text-[var(--text-muted)]">({ft.year})</span>
                </div>
                <div className="mt-1 text-[var(--text-muted)]">
                  <span className="text-[var(--success)]">Model:</span> {ft.modelResult.slice(0, 50)}...
                </div>
                <div className="text-[var(--text-muted)]">
                  <span className="text-[var(--danger)]">Human:</span> {ft.humanResult.slice(0, 50)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {model.keyInsight && (
        <div className="mt-4 bg-[var(--accent-orange-light)] border-l-4 border-[var(--accent-orange)] p-3">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-[var(--accent-orange)] flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-bold text-[var(--text-primary)]">{model.keyInsight.title}:</span>{' '}
              <span className="text-[var(--text-body)]">{model.keyInsight.description}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function TranslationalFailures() {
  const [filterOrganism, setFilterOrganism] = useState('all');
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  const filteredModels = getModelsByOrganism(filterOrganism);
  const totalFailures = animalModels.reduce((sum, m) => sum + m.failedTranslations.length, 0);

  const toggleModel = (modelId: string) => {
    setExpandedModel(expandedModel === modelId ? null : modelId);
  };

  return (
    <Section id={sectionConfig.id} className="bg-[var(--bg-secondary)]">
      <Container>
        <SectionHeader
          title={sectionConfig.title}
          subtitle={sectionConfig.subtitle}
        />

        {/* Narrative Lead-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-lg text-[var(--text-body)] leading-relaxed">
            Over <span className="font-serif font-bold text-[var(--accent-orange)]">400 drugs</span> have
            shown promise in Alzheimer&apos;s animal models. Yet more than{' '}
            <span className="font-serif font-bold text-[var(--danger)]">99%</span> failed in human trials.
            The question isn&apos;t whether our models are wrong—it&apos;s{' '}
            <em>how</em> they&apos;re wrong, and what that reveals about the disease itself.
          </p>
        </motion.div>

        {/* Filter + Legend Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap gap-1">
            {ORGANISM_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setFilterOrganism(filter.id);
                  setExpandedModel(null);
                }}
                className={`px-3 py-1 text-xs transition-colors ${
                  filterOrganism === filter.id
                    ? 'bg-[var(--accent-orange)] text-white'
                    : 'bg-[var(--bg-card)] text-[var(--text-body)] hover:bg-[var(--bg-primary)] border border-[var(--border)]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span><span className="text-[var(--success)] font-bold">✓</span> High</span>
            <span><span className="text-[var(--accent-orange)]">✓</span> Moderate</span>
            <span><span className="text-[var(--accent-orange)]">◐</span> Partial</span>
            <span><span className="text-[var(--danger)]">✗</span> Absent</span>
          </div>
        </motion.div>

        {/* Collapsible Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="default" hover={false}>
            <CardContent className="p-0">
              {/* Table container with collapse logic */}
              <div
                className={`relative transition-all duration-500 ${
                  !isTableExpanded ? 'overflow-hidden' : ''
                }`}
                style={!isTableExpanded ? { maxHeight: COLLAPSED_HEIGHT } : undefined}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] bg-[var(--bg-primary)]">
                        <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Model</th>
                        <th className="text-left py-3 px-2 text-[var(--text-muted)] font-medium">Species</th>
                        {PATHOLOGY_COLUMNS.map((feature) => (
                          <th
                            key={feature}
                            className="text-center py-3 px-2 text-[var(--text-muted)] font-medium"
                            title={pathologyFeatureLabels[feature].label}
                          >
                            {pathologyFeatureLabels[feature].shortLabel}
                          </th>
                        ))}
                        <th className="text-center py-3 px-2 text-[var(--text-muted)] font-medium">Failures</th>
                        <th className="py-3 px-2 w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredModels.map((model) => {
                        const orgInfo = organismTypeLabels[model.organismType];
                        const isExpanded = expandedModel === model.id;

                        return (
                          <AnimatePresence key={model.id} mode="wait">
                            <motion.tr
                              className={`border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] cursor-pointer transition-colors ${
                                isExpanded ? 'bg-[var(--bg-secondary)]' : ''
                              }`}
                              onClick={() => toggleModel(model.id)}
                            >
                              <td className="py-2 px-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-base">{orgInfo?.icon || '🧬'}</span>
                                  <div>
                                    <div className="font-medium text-[var(--text-primary)]">{model.name}</div>
                                    <div className="text-xs text-[var(--text-muted)]">{model.commonName}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-2 px-2 text-[var(--text-body)]">{model.species}</td>
                              {PATHOLOGY_COLUMNS.map((feature) => (
                                <td key={feature} className="py-2 px-2 text-center">
                                  <PathologyCell status={getPathologyStatus(model, feature)} />
                                </td>
                              ))}
                              <td className="py-2 px-2 text-center">
                                {model.failedTranslations.length > 0 ? (
                                  <Badge variant="danger">{model.failedTranslations.length}</Badge>
                                ) : (
                                  <span className="text-[var(--text-muted)]">—</span>
                                )}
                              </td>
                              <td className="py-2 px-2 text-center">
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-[var(--text-muted)] inline-block" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-[var(--text-muted)] inline-block" />
                                )}
                              </td>
                            </motion.tr>

                            {isExpanded && (
                              <motion.tr
                                key={`${model.id}-expanded`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <td colSpan={PATHOLOGY_COLUMNS.length + 4} className="p-0">
                                  <ExpandedDetails model={model} />
                                </td>
                              </motion.tr>
                            )}
                          </AnimatePresence>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Gradient fade overlay when collapsed */}
                {!isTableExpanded && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, transparent, var(--bg-card))',
                    }}
                  />
                )}
              </div>

              {/* Expand/Collapse button */}
              <div className="flex justify-center py-4 border-t border-[var(--border)] bg-[var(--bg-card)]">
                <button
                  onClick={() => setIsTableExpanded(!isTableExpanded)}
                  className="flex items-center gap-2 px-5 py-2 bg-white border border-[var(--border)]
                    shadow-sm hover:shadow-md hover:border-[var(--accent-orange)]
                    text-[var(--text-body)] hover:text-[var(--accent-orange)] transition-all duration-200 text-sm"
                >
                  {isTableExpanded ? (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      <span>Collapse Table</span>
                    </>
                  ) : (
                    <>
                      <Expand className="w-4 h-4" />
                      <span>Expand All {animalModels.length} Models</span>
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ================================================================== */}
        {/* TRANSLATIONAL INSIGHTS - Storytelling Flow */}
        {/* ================================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          {/* Section intro */}
          <div className="max-w-3xl mb-12">
            <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-4">
              Why Do Models Fail to Predict Human Outcomes?
            </h3>
            <p className="text-[var(--text-body)] leading-relaxed">
              The {totalFailures} documented translation failures in our database reveal recurring patterns.
              Understanding these patterns isn&apos;t just academic—it&apos;s essential for designing
              better trials and choosing the right therapeutic targets.
            </p>
          </div>

          {/* Core insight cards - 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Card 1: Forced vs Natural */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--bg-card)] border border-[var(--border)] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-orange-light)] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[var(--accent-orange)]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2">
                    Forced vs. Natural Pathology
                  </h4>
                  <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                    Transgenic models develop pathology in <strong>months</strong> through artificial
                    overexpression. Human Alzheimer&apos;s unfolds over <strong>decades</strong> through
                    gradual, age-related processes.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[var(--accent-orange)]">
                    <ArrowRight className="w-4 h-4" />
                    <span>Drugs may work on rapid pathology but fail on slow progression</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: The Tau Gap */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--bg-card)] border border-[var(--border)] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--danger-light)] flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[var(--danger)]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2">
                    The Tau Gap
                  </h4>
                  <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                    Human AD features both amyloid plaques <strong>and</strong> tau tangles. Most mouse
                    models only develop one or the other. The 3xTg-AD model has both, but the tau is
                    human-mutant, not wild-type.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[var(--danger)]">
                    <ArrowRight className="w-4 h-4" />
                    <span>Combination therapies can&apos;t be properly tested</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Species Biology */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--success-light)] flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[var(--success)]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2">
                    Species-Specific Biology
                  </h4>
                  <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                    Mouse and human immune systems differ substantially. Microglia—the brain&apos;s
                    immune cells—respond differently to amyloid. Anti-inflammatory drugs that work
                    in mice often fail in humans.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[var(--success)]">
                    <ArrowRight className="w-4 h-4" />
                    <span>Neuroinflammation therapies need human-relevant testing</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4: The Degu Paradox */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-amber-50 to-white border border-amber-200 p-6 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Beaker className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2">
                    The Degu Paradox
                  </h4>
                  <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                    Degus share <strong>human-identical Aβ sequence</strong> and develop natural
                    plaques with age—no genetic manipulation needed. Yet their cognitive effects
                    remain debated. If natural plaques don&apos;t reliably cause dementia...
                  </p>
                  <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Is amyloid itself the cause, or just a marker?</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Morris Water Maze Methodological Paradox - Special callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 mb-12 bg-gradient-to-br from-blue-50 via-white to-blue-50 border-2 border-blue-200 p-8 max-w-4xl mx-auto shadow-lg"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Waves className="w-7 h-7 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-700 uppercase tracking-wide">
                    Methodological Confound
                  </span>
                </div>
                <h4 className="font-serif font-bold text-xl text-[var(--text-primary)] mb-3">
                  The Morris Water Maze Paradox
                </h4>
                <p className="text-[var(--text-body)] leading-relaxed mb-4">
                  The Morris Water Maze (MWM) is the gold standard for testing cognitive function
                  in AD mouse models. But there&apos;s a problem:{' '}
                  <strong>MWM involves swimming—a form of aerobic exercise</strong>. Swimming
                  exercise restores glymphatic clearance, increases BDNF, reduces inflammation, and
                  improves AQP4 polarization. The test itself may be{' '}
                  <em>treating</em> the mice while measuring them.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/80 border border-blue-100 p-3 rounded">
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                      Testing Protocol = Exercise Intervention
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      4-6 days × 4-6 trials/day of swimming. Enough to induce neurogenesis, ↑BDNF,
                      ↓TNF-α, and restore glymphatic function (Liang 2025, Bashiri 2020).
                    </p>
                  </div>
                  <div className="bg-white/80 border border-blue-100 p-3 rounded">
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                      No 2×2 Factorial Studies
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      We lack studies comparing: (1) drug + MWM test, (2) placebo + MWM test,
                      (3) drug + dry maze, (4) placebo + dry maze. The confound remains uncontrolled.
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-[var(--text-body)]">
                        <strong>Implication:</strong> Control mice (swimming in MWM) receive partial
                        treatment, potentially masking drug effects. Exercise interventions may show
                        smaller effects because both groups are exercising.
                        Drug effect sizes may be systematically underestimated across the entire field.
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-2 italic">
                        &ldquo;Morris water maze training is associated with locomotion, and physical
                        activity robustly increases hippocampal neurogenesis&rdquo; — Ehninger &
                        Kempermann, 2006
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom takeaway */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--text-primary)] text-white p-8 max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-[var(--accent-orange)] flex-shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-xl mb-3">
                  The Fundamental Problem
                </h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We&apos;ve been testing drugs that clear amyloid in models that don&apos;t
                  recapitulate the human disease. Success in mice tells us a drug <em>can</em> clear
                  plaques—not that clearing plaques <em>helps</em> humans.
                </p>
                <p className="text-[var(--accent-orange)] font-medium">
                  The 99% failure rate isn&apos;t a failure of drug development. It&apos;s a
                  failure of the hypothesis being tested.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
