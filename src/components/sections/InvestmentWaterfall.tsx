'use client';

import { motion } from 'framer-motion';
import { Pill, FlaskConical } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent, InsightCallout, CitedNumber } from '@/components/ui';
import { investmentData, comparisonData, getSection } from '@/data';
import { formatCurrency } from '@/lib/utils';

const sectionConfig = getSection('paradox')!;

export function InvestmentWaterfall() {
  return (
    <Section id={sectionConfig.id} className="bg-[var(--bg-secondary)]">
      <Container>
        <SectionHeader
          title={sectionConfig.title}
          subtitle={sectionConfig.subtitle}
        />

        {/* Main comparison - two cards side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Patented drugs card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card variant="default" hover={false} className="h-full border-l-4 border-l-[#486393]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#486393]/10 flex items-center justify-center">
                    <Pill className="w-5 h-5 text-[#486393]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{investmentData.patented.label}</h3>
                    <p className="text-xs text-[var(--text-muted)]">Amyloid-targeting, patented</p>
                  </div>
                </div>

                {/* Big number with citation */}
                <div className="mb-4">
                  <CitedNumber
                    sourceId="cummings-ad-costs-2022"
                    keyFinding="Total private clinical R&D: $42.5 billion (1995-2021)"
                    className="text-4xl font-bold font-serif text-[#486393]"
                  >
                    {formatCurrency(investmentData.patented.total, true)}
                  </CitedNumber>
                  <p className="text-sm text-[var(--text-muted)] mt-1">Private clinical R&D ({investmentData.patented.period})</p>
                </div>

                {/* Funding breakdown */}
                <div className="mb-4 p-3 bg-[#486393]/5 border-l-2 border-[#486393]">
                  <CitedNumber
                    sourceId="cummings-pipeline-2024"
                    keyFinding="79% of Phase 3 trials are industry-funded"
                    className="text-sm text-[var(--text-body)]"
                  >
                    <span className="font-bold text-[#486393]">{investmentData.patented.industryFundedPercent}%</span> of Phase 3 trials are industry-funded
                  </CitedNumber>
                </div>

                {/* Examples */}
                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)] mb-2">Examples</p>
                  <div className="flex flex-wrap gap-2">
                    {investmentData.patented.examples.map((example) => (
                      <span
                        key={example}
                        className="px-2 py-1 text-xs bg-[#486393]/10 text-[#486393] rounded"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Repurposed drugs card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card variant="default" hover={false} className="h-full border-l-4 border-l-[var(--success)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--success)]/10 flex items-center justify-center">
                    <FlaskConical className="w-5 h-5 text-[var(--success)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{investmentData.repurposed.label}</h3>
                    <p className="text-xs text-[var(--text-muted)]">Multi-target, off-patent</p>
                  </div>
                </div>

                {/* Key stat with citation */}
                <div className="mb-4">
                  <CitedNumber
                    sourceId="cummings-pipeline-2024"
                    keyFinding="77% of repurposed trials are funded by non-industry sources"
                    className="text-4xl font-bold font-serif text-[var(--success)]"
                  >
                    {investmentData.repurposed.nonIndustryFundedPercent}%
                  </CitedNumber>
                  <p className="text-sm text-[var(--text-muted)] mt-1">Funded by NIH/academic/philanthropic sources</p>
                </div>

                {/* Funding gap callout */}
                <div className="mb-4 p-3 bg-[var(--success)]/5 border-l-2 border-[var(--success)]">
                  <p className="text-sm text-[var(--text-body)]">
                    <span className="font-bold text-[var(--success)]">No industry pathway</span> to fund $462M Phase 3 trials
                  </p>
                </div>

                {/* Examples */}
                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)] mb-2">Examples</p>
                  <div className="flex flex-wrap gap-2">
                    {investmentData.repurposed.examples.map((example) => (
                      <span
                        key={example}
                        className="px-2 py-1 text-xs bg-[var(--success)]/10 text-[var(--success)] rounded"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* The Funding Gap callout */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-white border border-[var(--border)] shadow-sm max-w-lg">
            <div className="text-center">
              <span className="text-4xl font-bold font-serif text-[var(--accent-orange)]">
                The Funding Gap
              </span>
            </div>
            <p className="text-sm text-[var(--text-body)] text-center">
              Repurposed drugs make up <span className="font-semibold">31% of the AD pipeline</span>,
              but <span className="font-semibold text-[var(--accent-orange)]">77% lack industry funding</span>.
              Without patent protection, no company will invest $462M in a Phase 3 trial.
            </p>
          </div>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card variant="default" hover={false}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium text-sm">Category</th>
                      <th className="text-left py-3 px-4 text-[#486393] font-medium text-sm">Patented</th>
                      <th className="text-left py-3 px-4 text-[var(--success)] font-medium text-sm">Repurposed</th>
                      <th className="text-left py-3 px-4 text-[var(--accent-orange)] font-medium text-sm">Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <motion.tr
                        key={row.category}
                        className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-secondary)]/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <td className="py-3 px-4 text-[var(--text-primary)] font-medium text-sm">
                          <span className="flex items-center gap-1.5">
                            {row.category}
                            {row.sourceId && (
                              <CitedNumber
                                sourceId={row.sourceId as 'cummings-ad-costs-2022' | 'cummings-pipeline-2024' | 'lecanemab-fda-2023'}
                                keyFinding={row.keyFinding}
                                className="text-xs"
                              >
                                <span />
                              </CitedNumber>
                            )}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[var(--text-body)] text-sm">{row.patented}</td>
                        <td className="py-3 px-4 text-[var(--text-body)] text-sm">{row.generic}</td>
                        <td className="py-3 px-4 text-[var(--accent-orange)] text-sm font-semibold">{row.delta || '—'}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insight callout */}
        <InsightCallout>
          $42.5 billion in private R&D, with <span className="text-[var(--accent-orange)] font-semibold">57% spent on Phase 3 trials</span>.
          Meanwhile, repurposed drugs with promising mechanisms cannot attract the funding needed for definitive trials.
        </InsightCallout>
      </Container>
    </Section>
  );
}
