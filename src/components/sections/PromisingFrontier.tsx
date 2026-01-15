'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react';
import { Container, Section, SectionHeader, TextWithAbbreviations } from '@/components/ui';
import { promisingFrontierData, type PromisingDrug } from '@/data/promisingFrontier';

// Drug card component - simplified
function DrugCard({ drug, index }: { drug: PromisingDrug; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <div className="bg-[var(--bg-card)] border border-[var(--border)]">
        {/* Header - clickable */}
        <button
          className="w-full p-5 text-left hover:bg-[var(--bg-secondary)] transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          {/* Top row: name and mechanism */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{drug.drug}</h3>
              <span className="text-sm text-[var(--text-muted)]">{drug.mechanism}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 mt-1">
              <span className="text-xs text-[var(--text-muted)]">{drug.status}</span>
              {expanded ? (
                <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
              )}
            </div>
          </div>

          {/* Key evidence - the main content */}
          <p className="text-[var(--text-body)] mb-4">
            <TextWithAbbreviations text={drug.keyEvidence} />
          </p>

          {/* Why it matters - prominent */}
          <p className="text-[var(--accent-orange)] font-medium">
            <TextWithAbbreviations text={drug.whyItMatters} />
          </p>
        </button>

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
              <div className="px-5 pb-5 border-t border-[var(--border)] pt-4 space-y-4">
                {/* Quote */}
                <blockquote className="border-l-2 border-[var(--border)] pl-4">
                  <p className="text-sm italic text-[var(--text-body)]">"{drug.quote}"</p>
                  <cite className="block text-xs text-[var(--text-muted)] mt-1 not-italic">— {drug.quoteSource}</cite>
                </blockquote>

                {/* Details row */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div>
                    <span className="text-[var(--text-muted)]">Cost: </span>
                    <span className="text-[var(--text-primary)]">{drug.costPerMonth}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)]">Decisive trial: </span>
                    <span className="text-[var(--text-primary)]">
                      <TextWithAbbreviations text={drug.decisiveTrial} />
                    </span>
                  </div>
                </div>

                {/* Caveat */}
                <div className="flex items-start gap-2 pt-2">
                  <AlertTriangle className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[var(--text-muted)]">
                    <TextWithAbbreviations text={drug.keyCaveat} />
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function PromisingFrontier() {
  return (
    <Section id="promising-frontier" className="bg-[var(--bg-primary)]">
      <Container>
        <SectionHeader
          title="The Promising Frontier"
          subtitle="Drugs with strong mechanistic rationale that deserve proper trials—but can't attract funding."
        />

        {/* Summary stats - simplified to just numbers */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-12 text-center">
          <div>
            <div className="text-3xl font-serif font-bold text-[var(--accent-orange)]">{promisingFrontierData.length}</div>
            <div className="text-sm text-[var(--text-muted)]">promising candidates</div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#007385]">&lt;$50</div>
            <div className="text-sm text-[var(--text-muted)]">monthly cost</div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[var(--text-primary)]">Generic</div>
            <div className="text-sm text-[var(--text-muted)]">patent status</div>
          </div>
        </div>

        {/* Intro text */}
        <p className="text-center text-[var(--text-body)] mb-10 max-w-3xl mx-auto">
          These drugs target <span className="font-semibold text-[var(--text-primary)]">upstream mechanisms</span>—not
          downstream amyloid—and have early human or strong preclinical evidence. Because they're
          generic or off-patent, no company will fund the decisive trials.
        </p>

        {/* Drug cards - 2 column grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {promisingFrontierData.map((drug, index) => (
            <DrugCard key={drug.id} drug={drug} index={index} />
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
            <span className="font-semibold text-[var(--accent-orange)]">short, inexpensive biomarker trials</span>.
            The science exists. The patients exist. What's missing is a{' '}
            <span className="font-semibold text-[var(--text-primary)]">funding model</span> that doesn't require
            patent protection.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
