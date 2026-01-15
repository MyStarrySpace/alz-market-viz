'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Microscope,
  FlaskConical,
  Star,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertTriangle,
  DollarSign,
  Target,
  Beaker,
} from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent, TextWithAbbreviations } from '@/components/ui';
import { promisingFrontierData, type PromisingDrug } from '@/data/promisingFrontier';

// Mechanism category colors using theme chart colors
const mechanismColors: Record<string, { bg: string; text: string; border: string }> = {
  lysosomal: { bg: 'bg-[#34d399]/10', text: 'text-[#34d399]', border: 'border-[#34d399]' },
  tau: { bg: 'bg-[#a78bfa]/10', text: 'text-[#a78bfa]', border: 'border-[#a78bfa]' },
  inflammatory: { bg: 'bg-[#fbbf24]/10', text: 'text-[#b38600]', border: 'border-[#fbbf24]' },
  viral: { bg: 'bg-[#f472b6]/10', text: 'text-[#f472b6]', border: 'border-[#f472b6]' },
};

// Evidence strength to border color (more evidence = greener)
function getEvidenceBorderColor(strength: number): string {
  if (strength >= 3) return 'border-l-[var(--success)]';
  if (strength === 2) return 'border-l-[#E5AF19]';
  return 'border-l-[var(--danger)]';
}

// Star rating component
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-[var(--accent-orange)] text-[var(--accent-orange)]' : 'text-[var(--border)]'}`}
        />
      ))}
    </div>
  );
}

// Drug card component
function DrugCard({ drug }: { drug: PromisingDrug }) {
  const [expanded, setExpanded] = useState(false);
  const mechanismStyle = mechanismColors[drug.mechanismCategory] || mechanismColors.lysosomal;
  const evidenceBorder = getEvidenceBorderColor(drug.evidenceStrength);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card
        variant="default"
        hover={false}
        className={`overflow-hidden border-l-4 ${evidenceBorder}`}
      >
        <CardContent className="p-0">
          {/* Header - clickable */}
          <div
            className="p-5 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors"
            onClick={() => setExpanded(!expanded)}
          >
            {/* Top row: icon, name, stars, chevron */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${mechanismStyle.bg} flex items-center justify-center`}>
                  <Microscope className={`w-5 h-5 ${mechanismStyle.text}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{drug.drug}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${mechanismStyle.bg} ${mechanismStyle.text}`}>
                    {drug.mechanism}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <StarRating rating={drug.evidenceStrength} />
                {expanded ? (
                  <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
                )}
              </div>
            </div>

            {/* Key evidence */}
            <p className="text-sm text-[var(--text-body)] mb-3">
              <TextWithAbbreviations text={drug.keyEvidence} />
            </p>

            {/* Quote */}
            <blockquote className="text-sm italic text-[var(--text-muted)] border-l-2 border-[var(--accent-orange)] pl-3 mb-4">
              "{drug.quote}"
              <cite className="block text-xs mt-1 not-italic">— {drug.quoteSource}</cite>
            </blockquote>

            {/* Why it matters - always visible */}
            <div className="p-3 rounded border bg-[var(--success-light)] border-[var(--success)]">
              <p className="text-sm text-[var(--success)]">
                <Lightbulb className="w-4 h-4 inline mr-1" />
                <span className="font-medium">Why it matters:</span>{' '}
                <TextWithAbbreviations text={drug.whyItMatters} />
              </p>
            </div>

            {/* Key caveat */}
            <div className="mt-3 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#b38600] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[#b38600]">
                <span className="font-medium">Caveat:</span>{' '}
                <TextWithAbbreviations text={drug.keyCaveat} />
              </p>
            </div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 border-t border-[var(--border)] pt-4">
                  {/* Status, Cost, Trial */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-2">
                      <FlaskConical className="w-4 h-4 text-[#486393] mt-0.5" />
                      <div>
                        <span className="text-xs font-medium text-[var(--text-primary)]">Status</span>
                        <p className="text-sm text-[var(--text-body)]">{drug.status}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="w-4 h-4 text-[var(--success)] mt-0.5" />
                      <div>
                        <span className="text-xs font-medium text-[var(--text-primary)]">Cost</span>
                        <p className="text-sm text-[var(--text-body)]">{drug.costPerMonth}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-[var(--accent-orange)] mt-0.5" />
                      <div>
                        <span className="text-xs font-medium text-[var(--text-primary)]">Decisive Trial</span>
                        <p className="text-sm text-[var(--text-body)]">
                          <TextWithAbbreviations text={drug.decisiveTrial} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
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
    purple: 'bg-[#a78bfa]/10 text-[#a78bfa]',
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
      <div className={`w-14 h-14 mx-auto rounded-full ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-[var(--text-primary)]">{value}</div>
      <div className="text-sm text-[var(--text-muted)] mt-1">{label}</div>
    </motion.div>
  );
}

export function PromisingFrontier() {
  return (
    <Section id="promising-frontier" className="bg-gradient-to-b from-[var(--bg-primary)] to-emerald-50/30">
      <Container>
        <SectionHeader
          title="The Promising Frontier"
          subtitle="Drugs with strong mechanistic rationale that deserve proper trials—but can't attract funding."
        />

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <SummaryStat
            icon={<Microscope className="w-6 h-6" />}
            value={promisingFrontierData.length}
            label="Mechanistically sound candidates"
            color="emerald"
          />
          <SummaryStat
            icon={<DollarSign className="w-6 h-6" />}
            value="<$50"
            label="Monthly cost per patient"
            color="blue"
          />
          <SummaryStat
            icon={<Beaker className="w-6 h-6" />}
            value="Generic"
            label="Patent status (no profit incentive)"
            color="purple"
          />
          <SummaryStat
            icon={<Target className="w-6 h-6" />}
            value="1-2 yrs"
            label="To run decisive biomarker trials"
            color="amber"
          />
        </div>

        {/* Intro text */}
        <p className="text-center text-[var(--text-body)] mb-8 max-w-3xl mx-auto">
          These drugs target <span className="font-medium text-[var(--text-primary)]">upstream mechanisms</span>—not
          downstream amyloid—and have early human or strong preclinical evidence. But because they're
          generic or off-patent, no company will fund the decisive trials.
        </p>

        {/* Drug cards - 2 column grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {promisingFrontierData.map((drug) => (
            <DrugCard key={drug.id} drug={drug} />
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <p className="text-lg text-[var(--text-body)] leading-relaxed">
            Each of these drugs could be tested with{' '}
            <span className="font-medium text-[var(--accent-orange)]">short, inexpensive biomarker trials</span>.
            The science exists. The patients exist. What's missing is a{' '}
            <span className="font-medium text-[var(--text-primary)]">funding model</span> that doesn't require
            patent protection.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
