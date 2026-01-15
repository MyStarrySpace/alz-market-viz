'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Container, Section, SectionHeader } from '@/components/ui';
import { marketFailures, failureCascadeNarrative } from '@/data';

// Color palette for cards - cycling through theme colors
const cardColors = [
  { bg: 'bg-[#486393]/10', border: 'border-[#486393]/30', icon: 'text-[#486393]', accent: '#486393' },
  { bg: 'bg-[#007385]/10', border: 'border-[#007385]/30', icon: 'text-[#007385]', accent: '#007385' },
  { bg: 'bg-[#C9461D]/10', border: 'border-[#C9461D]/30', icon: 'text-[#C9461D]', accent: '#C9461D' },
  { bg: 'bg-[#E5AF19]/10', border: 'border-[#E5AF19]/30', icon: 'text-[#b38600]', accent: '#b38600' },
  { bg: 'bg-[#C3577F]/10', border: 'border-[#C3577F]/30', icon: 'text-[#C3577F]', accent: '#C3577F' },
  { bg: 'bg-[#486393]/10', border: 'border-[#486393]/30', icon: 'text-[#486393]', accent: '#486393' },
  { bg: 'bg-[#007385]/10', border: 'border-[#007385]/30', icon: 'text-[#007385]', accent: '#007385' },
  { bg: 'bg-[#C9461D]/10', border: 'border-[#C9461D]/30', icon: 'text-[#C9461D]', accent: '#C9461D' },
];

export function FailureCascade() {
  const sortedFailures = marketFailures.sort((a, b) => a.order - b.order);

  return (
    <Section id="system">
      <Container>
        <SectionHeader
          title="The Failure Cascade"
          subtitle="Each market failure reinforces the others, creating a system that systematically excludes the most promising interventions."
        />

        {/* Narrative intro - compact */}
        <motion.div
          className="max-w-2xl mx-auto mb-10 flex items-start gap-3 p-4 border border-[var(--accent-orange)] bg-[var(--accent-orange-light)]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AlertTriangle className="w-5 h-5 text-[var(--accent-orange)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--accent-orange)]">{failureCascadeNarrative}</p>
        </motion.div>

        {/* Descending Stairs Layout - 4 columns */}
        <div className="max-w-6xl mx-auto">
          {/* Row 1: Items 1-4 descending like stairs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sortedFailures.slice(0, 4).map((failure, index) => {
              const colors = cardColors[index];
              // Each card steps down progressively
              const stepDown = index * 24; // 24px step per card
              return (
                <div key={failure.id} style={{ marginTop: stepDown }}>
                  <FailureCard
                    failure={failure}
                    index={index}
                    colors={colors}
                  />
                </div>
              );
            })}
          </div>

          {/* Row 2: Items 5-8 (if they exist) positioned below 1-4 */}
          {sortedFailures.length > 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              {sortedFailures.slice(4, 8).map((failure, index) => {
                const colors = cardColors[index + 4];
                // Continue the stair pattern from row 1
                const stepDown = index * 24;
                return (
                  <div key={failure.id} style={{ marginTop: stepDown }}>
                    <FailureCard
                      failure={failure}
                      index={index + 4}
                      colors={colors}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* The result */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-widest text-[var(--text-muted)] mb-2">
            The Result
          </p>
          <p className="text-5xl md:text-6xl font-serif font-bold text-[var(--danger)]">
            99%
          </p>
          <p className="text-xl md:text-2xl font-serif text-[var(--text-primary)] mt-1">
            Trial Failure Rate
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}

interface FailureCardProps {
  failure: (typeof marketFailures)[0];
  index: number;
  colors: typeof cardColors[0];
}

function FailureCard({ failure, index, colors }: FailureCardProps) {
  const Icon = failure.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div
        className={`p-3 border ${colors.bg} ${colors.border} transition-all duration-200 hover:shadow-md h-full`}
      >
        {/* Header row */}
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-8 h-8 flex items-center justify-center ${colors.bg}`}>
            <Icon className={`w-4 h-4 ${colors.icon}`} />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span
              className="text-xs font-bold px-1.5 py-0.5"
              style={{ backgroundColor: colors.accent, color: 'white' }}
            >
              {failure.order}
            </span>
            <h3 className="text-sm font-bold text-[var(--text-primary)] truncate">
              {failure.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[var(--text-body)] mb-2 leading-relaxed">
          {failure.description}
        </p>

        {/* Impact - styled as a quote */}
        <p
          className="text-xs italic pl-3 border-l-2"
          style={{ borderColor: colors.accent, color: colors.accent }}
        >
          {failure.impact}
        </p>
      </div>
    </motion.div>
  );
}
