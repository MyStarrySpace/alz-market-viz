'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Pill,
  DollarSign,
  FlaskConical,
  Quote,
} from 'lucide-react';
import { Container, Section, SectionHeader, TextWithAbbreviations } from '@/components/ui';
import { promisingFrontierData, type PromisingDrug } from '@/data/promisingFrontier';

// Two-panel list component for drugs
function DrugsList({ drugs }: { drugs: PromisingDrug[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = drugs.find((d) => d.id === selectedId);

  if (drugs.length === 0) {
    return <p className="text-center text-[var(--text-muted)] py-8">No drugs to display.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Drug list */}
      <div className={`transition-all duration-300 ${selected ? 'lg:w-1/2' : 'w-full'}`}>
        <div className="bg-[var(--bg-card)] border border-[var(--border)]">
          {drugs.map((drug, index) => {
            const isSelected = selectedId === drug.id;
            return (
              <button
                key={drug.id}
                className={`w-full flex items-center justify-between p-4 text-left hover:bg-[var(--bg-secondary)] transition-all ${
                  index > 0 ? 'border-t border-[var(--border)]' : ''
                } ${isSelected ? 'bg-[var(--bg-secondary)] border-l-4 border-l-[var(--accent-orange)]' : 'border-l-4 border-l-transparent'}`}
                onClick={() => setSelectedId(isSelected ? null : drug.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold text-sm ${isSelected ? 'text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'}`}>
                      {drug.drug}
                    </h4>
                    <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                      {drug.status}
                    </span>
                  </div>
                  <p className="text-[var(--text-muted)] text-xs">
                    {drug.mechanism}
                  </p>
                  {/* Show brief "why it matters" on mobile when not selected */}
                  <p className="text-[var(--accent-orange)] text-xs mt-1 line-clamp-1 lg:hidden">
                    <TextWithAbbreviations text={drug.whyItMatters} />
                  </p>
                </div>
                <div className="text-xs text-[var(--text-muted)] ml-2 shrink-0">
                  {drug.costPerMonth}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Details panel - only shows when item selected */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-white border border-[var(--border)] p-6 h-full">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Pill className="w-5 h-5 text-[var(--accent-orange)]" />
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{selected.drug}</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">{selected.mechanism}</p>
              </div>

              <div className="space-y-4">
                {/* Key Evidence */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Key Evidence
                  </h4>
                  <p className="text-sm text-[var(--text-body)]">
                    <TextWithAbbreviations text={selected.keyEvidence} />
                  </p>
                </div>

                {/* Why It Matters */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Why It Matters
                  </h4>
                  <p className="text-sm text-[var(--accent-orange)] font-medium">
                    <TextWithAbbreviations text={selected.whyItMatters} />
                  </p>
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 border-[var(--accent-orange)] pl-4 bg-[var(--bg-secondary)] py-3 pr-3">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm italic text-[var(--text-body)]">"{selected.quote}"</p>
                      <cite className="block text-xs text-[var(--text-muted)] mt-1 not-italic">— {selected.quoteSource}</cite>
                    </div>
                  </div>
                </blockquote>

                {/* Details row */}
                <div className="flex flex-wrap gap-4 text-sm pt-2 border-t border-[var(--border)]">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-[var(--text-muted)]">Cost:</span>
                    <span className="text-[var(--text-primary)] font-medium">{selected.costPerMonth}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FlaskConical className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-[var(--text-muted)]">Status:</span>
                    <span className="text-[var(--text-primary)]">{selected.status}</span>
                  </div>
                </div>

                {/* Decisive Trial */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    Decisive Trial Needed
                  </h4>
                  <p className="text-sm text-[var(--text-body)]">
                    <TextWithAbbreviations text={selected.decisiveTrial} />
                  </p>
                </div>

                {/* Caveat */}
                <div className="flex items-start gap-2 p-3 bg-[var(--bg-secondary)] border-l-2 border-[var(--text-muted)]">
                  <AlertTriangle className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                      Key Caveat
                    </h4>
                    <p className="text-sm text-[var(--text-muted)]">
                      <TextWithAbbreviations text={selected.keyCaveat} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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

        {/* Drug list */}
        <DrugsList drugs={promisingFrontierData} />

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
