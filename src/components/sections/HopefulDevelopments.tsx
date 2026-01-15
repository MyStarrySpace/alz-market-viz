'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill,
  Lightbulb,
  Heart,
  Activity,
  Sparkles,
  CheckCircle2,
  Clock,
  FlaskConical,
  AlertTriangle,
} from 'lucide-react';
import { Container, Section, SectionHeader, TextWithAbbreviations } from '@/components/ui';
import {
  getApprovedTreatments,
  getPipelineDrugs,
  getLifestyleInterventions,
  getDevelopmentsByCategory,
  type HopefulDevelopment,
  type DevelopmentCategory,
} from '@/data/hopefulDevelopments';

// Status badge colors - using theme colors
const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  fda_approved: { bg: 'bg-[var(--success-light)]', text: 'text-[var(--success)]', label: 'FDA Approved' },
  phase_3: { bg: 'bg-[#486393]/10', text: 'text-[#486393]', label: 'Phase 3' },
  phase_2: { bg: 'bg-[#C3577F]/10', text: 'text-[#C3577F]', label: 'Phase 2' },
  preclinical: { bg: 'bg-[#E5AF19]/10', text: 'text-[#b38600]', label: 'Preclinical' },
  evidence_based: { bg: 'bg-[#007385]/10', text: 'text-[#007385]', label: 'Evidence-Based' },
};

// Category icons
function getCategoryIcon(category: DevelopmentCategory) {
  switch (category) {
    case 'approved_drug':
      return <Pill className="w-4 h-4" />;
    case 'pipeline_drug':
      return <FlaskConical className="w-4 h-4" />;
    case 'device_therapy':
      return <Activity className="w-4 h-4" />;
    case 'lifestyle':
      return <Heart className="w-4 h-4" />;
    case 'supplement':
      return <Sparkles className="w-4 h-4" />;
    case 'research_tool':
      return <Lightbulb className="w-4 h-4" />;
    default:
      return <Pill className="w-4 h-4" />;
  }
}

// Two-panel list component for developments
function DevelopmentsList({ developments, emptyMessage }: { developments: HopefulDevelopment[]; emptyMessage: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = developments.find((d) => d.id === selectedId);

  if (developments.length === 0) {
    return <p className="text-center text-[var(--text-muted)] py-8">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Development list - full width when nothing selected, half when selected */}
      <motion.div
        layout
        className={selected ? 'lg:w-1/2' : 'w-full'}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="bg-white border border-[var(--border)] divide-y divide-[var(--border)]">
          {developments.map((dev, index) => {
            const status = statusStyles[dev.status];
            return (
              <motion.button
                key={dev.id}
                layout
                className={`w-full flex items-center justify-between p-4 text-left transition-all hover:bg-[var(--bg-secondary)] ${
                  selectedId === dev.id ? 'bg-[var(--bg-secondary)] border-l-4 border-l-[var(--success)]' : ''
                }`}
                onClick={() => setSelectedId(selectedId === dev.id ? null : dev.id)}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-[var(--text-primary)] font-semibold text-sm">{dev.name}</h4>
                  <p className="text-[var(--text-muted)] text-xs truncate">
                    <TextWithAbbreviations text={dev.description} />
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 font-medium shrink-0 ml-3 ${status.bg} ${status.text}`}>
                  {status.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Right: Details panel - only shows when item selected */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: 50, width: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white border border-[var(--border)] p-6 h-full"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{selected.name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    <TextWithAbbreviations text={selected.description} />
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 font-medium shrink-0 ${statusStyles[selected.status].bg} ${statusStyles[selected.status].text}`}>
                  {statusStyles[selected.status].label}
                </span>
              </div>

              <div className="space-y-4">
                {/* Why it matters */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--success)] uppercase tracking-wide mb-1">
                    Why It Matters
                  </h4>
                  <p className="text-sm text-[var(--text-body)]">
                    <TextWithAbbreviations text={selected.whyHopeful} />
                  </p>
                </div>

                {/* Mechanism */}
                <div>
                  <h4 className="text-xs font-semibold text-[#007385] uppercase tracking-wide mb-1">
                    How It Works
                  </h4>
                  <p className="text-sm text-[var(--text-body)]">
                    <TextWithAbbreviations text={selected.mechanism} />
                  </p>
                </div>

                {/* Evidence summary */}
                {selected.evidence.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-[#486393] uppercase tracking-wide mb-2">
                      Key Evidence
                    </h4>
                    <div className="space-y-2">
                      {selected.evidence.slice(0, 2).map((ev, idx) => (
                        <div key={idx} className="p-2 bg-[var(--bg-secondary)] text-xs">
                          {ev.trialName && (
                            <span className="font-medium text-[var(--text-primary)]">{ev.trialName}: </span>
                          )}
                          <span className="text-[var(--text-body)]">
                            <TextWithAbbreviations text={ev.result} />
                          </span>
                          {ev.limitation && (
                            <p className="text-[#b38600] mt-1 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              <TextWithAbbreviations text={ev.limitation} />
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cost & Availability */}
                {(selected.cost || selected.availability) && (
                  <div className="flex flex-wrap gap-4 text-xs">
                    {selected.cost && (
                      <div>
                        <span className="font-medium text-[var(--text-muted)]">Cost:</span>{' '}
                        <span className="text-[var(--text-body)]">{selected.cost}</span>
                      </div>
                    )}
                    {selected.availability && (
                      <div>
                        <span className="font-medium text-[var(--text-muted)]">Availability:</span>{' '}
                        <span className="text-[var(--text-body)]">{selected.availability}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Caveats */}
                {selected.caveats && selected.caveats.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-[#b38600] uppercase tracking-wide mb-1">
                      Important Caveats
                    </h4>
                    <ul className="space-y-1">
                      {selected.caveats.map((caveat, idx) => (
                        <li key={idx} className="text-xs text-[var(--text-muted)] flex items-start gap-1">
                          <span className="text-[#E5AF19]">•</span>
                          <TextWithAbbreviations text={caveat} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Summary stat component
function SummaryStat({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: 'emerald' | 'blue' | 'purple' | 'amber';
}) {
  const colorClasses = {
    emerald: 'bg-[var(--success-light)] text-[var(--success)]',
    blue: 'bg-[#486393]/10 text-[#486393]',
    purple: 'bg-[#C3577F]/10 text-[#C3577F]',
    amber: 'bg-[#E5AF19]/10 text-[#b38600]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className={`w-16 h-16 mx-auto rounded-full ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-3xl font-bold font-serif text-[var(--text-primary)]">{value}</div>
      <div className="text-sm text-[var(--text-muted)] mt-1">{label}</div>
    </motion.div>
  );
}

export function HopefulDevelopments() {
  const [activeTab, setActiveTab] = useState<'approved' | 'pipeline' | 'lifestyle'>('approved');

  const approvedTreatments = getApprovedTreatments();
  const pipelineDrugs = getPipelineDrugs();
  const supplements = getDevelopmentsByCategory('supplement');
  const lifestyleInterventions = getLifestyleInterventions();

  const tabs = [
    { id: 'approved', label: 'Approved Treatments', count: approvedTreatments.length },
    { id: 'pipeline', label: 'Promising Pipeline', count: pipelineDrugs.length + supplements.length },
    { id: 'lifestyle', label: 'Lifestyle Interventions', count: lifestyleInterventions.length },
  ] as const;

  return (
    <Section id="hopeful-developments" className="bg-gradient-to-b from-[var(--bg-primary)] to-emerald-50/30">
      <Container>
        <SectionHeader
          title="Reasons for Hope"
          subtitle="For the first time in history, we have treatments that slow cognitive decline, plus evidence-based interventions available to everyone today."
        />

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <SummaryStat
            icon={<CheckCircle2 className="w-7 h-7" />}
            value={approvedTreatments.length}
            label="FDA-approved disease-modifying treatments"
            color="emerald"
          />
          <SummaryStat
            icon={<FlaskConical className="w-7 h-7" />}
            value={pipelineDrugs.length + supplements.length}
            label="Promising approaches in development"
            color="blue"
          />
          <SummaryStat
            icon={<Heart className="w-7 h-7" />}
            value={lifestyleInterventions.length}
            label="Evidence-based lifestyle interventions"
            color="purple"
          />
          <SummaryStat
            icon={<Clock className="w-7 h-7" />}
            value="Now"
            label="Time to start prevention"
            color="amber"
          />
        </div>

        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded bg-[var(--bg-secondary)] p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[var(--bg-secondary)] text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'approved' && (
              <div>
                <p className="text-center text-[var(--text-body)] mb-6 max-w-2xl mx-auto">
                  These are the first treatments ever shown to slow Alzheimer&apos;s progression in clinical trials.
                  While benefits are modest, they represent a historic milestone.
                </p>
                <DevelopmentsList
                  developments={approvedTreatments}
                  emptyMessage="No approved treatments to display."
                />
              </div>
            )}

            {activeTab === 'pipeline' && (
              <div>
                <p className="text-center text-[var(--text-body)] mb-6 max-w-2xl mx-auto">
                  Beyond amyloid-targeting drugs, researchers are pursuing approaches based on
                  alternative hypotheses, many addressing upstream causes.
                </p>
                <DevelopmentsList
                  developments={[...pipelineDrugs, ...supplements]}
                  emptyMessage="No pipeline developments to display."
                />
              </div>
            )}

            {activeTab === 'lifestyle' && (
              <div>
                <p className="text-center text-[var(--text-body)] mb-6 max-w-2xl mx-auto">
                  You don&apos;t need to wait for a drug. Evidence-based lifestyle interventions can reduce
                  dementia risk by 30-50%, and they&apos;re available today.
                </p>
                <DevelopmentsList
                  developments={lifestyleInterventions}
                  emptyMessage="No lifestyle interventions to display."
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-[var(--text-primary)] mb-6">
            The Best Time to Act is <span className="text-[var(--accent-orange)]">Now.</span>
          </h3>
          <p className="text-lg text-[var(--text-body)] leading-relaxed mb-4">
            While we wait for better treatments, the evidence is clear:
          </p>
          <p className="text-xl md:text-2xl font-medium text-[var(--text-primary)] mb-6">
            <span className="text-[var(--success)]">Exercise</span>,{' '}
            <span className="text-[#486393]">diet</span>,{' '}
            <span className="text-[#C3577F]">sleep</span>, and{' '}
            <span className="text-[#007385]">cognitive engagement</span>{' '}
            can reduce your risk by <span className="font-bold text-[var(--accent-orange)]">30–50%</span>.
          </p>
          <p className="text-[var(--text-muted)]">
            These interventions address the same upstream mechanisms that sidelined researchers identified decades ago.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
