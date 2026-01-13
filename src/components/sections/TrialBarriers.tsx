'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Users,
  DollarSign,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Building2,
  Heart,
  Pill,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent } from '@/components/ui';
import {
  trialRequirements,
  adTrialPhaseCosts,
  fundingSources,
  getFundingGapAnalysis,
  redirectedDrugs,
  adDevelopmentStatistics,
} from '@/data/trialBarriers';
import { investmentData, comparisonData } from '@/data';
import { formatCurrency } from '@/lib/utils';

// Format large numbers with suffix
function formatLargeNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(0)}M`;
  }
  return `$${num.toLocaleString()}`;
}

// Phase cost bar component
function PhaseCostBar({
  phase,
  index,
}: {
  phase: (typeof adTrialPhaseCosts)[0];
  index: number;
}) {
  const maxCost = 462_000_000; // Phase 3 cost
  const widthPercent = (phase.perDrugCost / maxCost) * 100;

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{phase.phase}</span>
        <span className="text-slate-400 text-sm">{phase.typicalDuration}</span>
      </div>
      <div className="relative h-10 bg-slate-800 rounded-lg overflow-hidden">
        <motion.div
          className={`h-full rounded-lg ${
            index === 2
              ? 'bg-gradient-to-r from-red-600 to-red-400'
              : 'bg-gradient-to-r from-blue-600 to-blue-400'
          }`}
          initial={{ width: 0 }}
          whileInView={{ width: `${widthPercent}%` }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
        <div className="absolute inset-0 flex items-center px-4">
          <span className="text-white font-bold font-mono text-lg">
            {formatLargeNumber(phase.perDrugCost)}
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-slate-500">
          {phase.typicalPatients} patients
        </span>
        <span className="text-xs text-red-400">{phase.failureRate}% failure rate</span>
      </div>
    </motion.div>
  );
}

// Funding source bubble
function FundingBubble({
  source,
  index,
  phase3Cost,
}: {
  source: (typeof fundingSources)[0];
  index: number;
  phase3Cost: number;
}) {
  const budgetUSD = source.annualBudget * 1_000_000;
  const percentOfPhase3 = (budgetUSD / phase3Cost) * 100;
  // Size bubbles proportionally (but with a minimum)
  const size = Math.max(40, Math.min(150, Math.sqrt(budgetUSD / 1_000_000) * 8));

  const typeColors = {
    government: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
    nonprofit: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
    industry: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
  };

  const typeIcons = {
    government: <Building2 className="w-4 h-4" />,
    nonprofit: <Heart className="w-4 h-4" />,
    industry: <Pill className="w-4 h-4" />,
  };

  return (
    <motion.div
      className={`flex flex-col items-center p-3 rounded-lg border ${typeColors[source.type]}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-1 mb-1">
        {typeIcons[source.type]}
        <span className="text-xs font-medium truncate max-w-[120px]">
          {source.name.split('(')[0].trim()}
        </span>
      </div>
      <span className="text-lg font-bold font-mono">
        ${source.annualBudget >= 1000
          ? `${(source.annualBudget / 1000).toFixed(1)}B`
          : `${source.annualBudget}M`}
      </span>
      <span className="text-xs text-slate-500">
        {percentOfPhase3 >= 100
          ? `${Math.floor(percentOfPhase3 / 100)} trials/yr`
          : `${percentOfPhase3.toFixed(0)}% of 1 trial`}
      </span>
    </motion.div>
  );
}

// Redirected drug card
function RedirectedDrugCard({
  drug,
  index,
}: {
  drug: (typeof redirectedDrugs)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    none: 'text-red-400 bg-red-500/20',
    phase_1: 'text-yellow-400 bg-yellow-500/20',
    phase_2: 'text-blue-400 bg-blue-500/20',
    phase_3: 'text-emerald-400 bg-emerald-500/20',
    abandoned: 'text-slate-400 bg-slate-500/20',
  };

  const statusLabels = {
    none: 'No AD trial',
    phase_1: 'Phase 1',
    phase_2: 'Phase 2',
    phase_3: 'Phase 3',
    abandoned: 'Abandoned',
  };

  return (
    <motion.div
      className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 cursor-pointer
        hover:border-slate-600 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-white font-semibold">{drug.name}</h4>
          <p className="text-slate-400 text-sm">{drug.mechanism}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded ${statusColors[drug.adTrialStatus]}`}
        >
          {statusLabels[drug.adTrialStatus]}
        </span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-slate-700"
          >
            <p className="text-sm text-slate-300 mb-2">
              <strong className="text-emerald-400">AD Rationale:</strong>{' '}
              {drug.adRationale}
            </p>
            <p className="text-sm text-slate-300 mb-2">
              <strong className="text-amber-400">Why not AD:</strong>{' '}
              {drug.whyNotAD}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {drug.currentIndications.map((ind) => (
                <span
                  key={ind}
                  className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300"
                >
                  {ind}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function TrialBarriers() {
  const [showAllDrugs, setShowAllDrugs] = useState(false);
  const analysis = getFundingGapAnalysis();
  const phase3Cost = adTrialPhaseCosts.find((p) => p.phase === 'Phase 3')!.perDrugCost;

  return (
    <Section id="trial-barriers">
      <Container>
        <SectionHeader
          title="Why AD Trials Are Different"
          subtitle="Alzheimer's trials are 3-5x more expensive, take 2-3x longer, and have higher failure rates than almost any other disease."
        />

        {/* Key statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="p-4 rounded-lg bg-slate-800/50 text-center">
            <DollarSign className="w-6 h-6 mx-auto text-blue-400 mb-2" />
            <span className="text-2xl font-bold font-mono text-white">$42.5B</span>
            <p className="text-xs text-slate-400 mt-1">Invested 1995-2021</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/50 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto text-red-400 mb-2" />
            <span className="text-2xl font-bold font-mono text-red-400">
              {adDevelopmentStatistics.overallFailureRate}%
            </span>
            <p className="text-xs text-slate-400 mt-1">Failure rate</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/50 text-center">
            <Users className="w-6 h-6 mx-auto text-emerald-400 mb-2" />
            <span className="text-2xl font-bold font-mono text-white">
              {(adDevelopmentStatistics.totalParticipants / 1000).toFixed(0)}K
            </span>
            <p className="text-xs text-slate-400 mt-1">Trial participants</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/50 text-center">
            <Clock className="w-6 h-6 mx-auto text-amber-400 mb-2" />
            <span className="text-2xl font-bold font-mono text-white">
              {adDevelopmentStatistics.fdaApprovals}
            </span>
            <p className="text-xs text-slate-400 mt-1">FDA approvals (26 yrs)</p>
          </div>
        </motion.div>

        {/* Phase costs visualization */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-6">
            Cost Per Drug by Phase
          </h3>
          <div className="max-w-2xl">
            {adTrialPhaseCosts.map((phase, index) => (
              <PhaseCostBar key={phase.phase} phase={phase} index={index} />
            ))}
          </div>
          <p className="text-sm text-slate-400 mt-4 max-w-2xl">
            Phase 3 alone costs <span className="text-red-400 font-bold">$462 million</span> per drug.
            This is why generic drugs with expired patents are rarely tested—no one can recoup the investment.
          </p>
        </motion.div>

        {/* Funding gap visualization */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-2">The Funding Gap</h3>
          <p className="text-slate-400 mb-6">
            Who funds AD research, and can they afford a Phase 3 trial?
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {fundingSources.map((source, index) => (
              <FundingBubble
                key={source.id}
                source={source}
                index={index}
                phase3Cost={phase3Cost}
              />
            ))}
          </div>

          {/* Key insight */}
          <motion.div
            className="p-6 rounded-lg bg-red-500/10 border border-red-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-red-400 text-lg">
              <strong>The math doesn&apos;t work:</strong> All AD nonprofits combined
              (~${(analysis.totalNonprofitAnnualUSD / 1_000_000).toFixed(0)}M/year)
              cannot fund a single Phase 3 trial (${(phase3Cost / 1_000_000).toFixed(0)}M).
              This leaves Phase 3 entirely dependent on pharma—which only funds patentable compounds.
            </p>
          </motion.div>
        </motion.div>

        {/* Requirements comparison table */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-6">
            Why Companies Test Elsewhere First
          </h3>
          <Card variant="default" hover={false}>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">
                        Factor
                      </th>
                      <th className="text-left py-3 px-4 text-red-400 font-medium">
                        AD Trials
                      </th>
                      <th className="text-left py-3 px-4 text-emerald-400 font-medium">
                        Other Diseases
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {trialRequirements.slice(0, 5).map((req, index) => (
                      <motion.tr
                        key={req.factor}
                        className="border-b border-slate-800 last:border-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <td className="py-3 px-4 text-white font-medium">
                          {req.factor}
                        </td>
                        <td className="py-3 px-4 text-slate-300">{req.adTrials}</td>
                        <td className="py-3 px-4 text-slate-300">
                          {req.otherIndications}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Redirected drugs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-2">
            Drugs That Might Help—Tested Elsewhere
          </h3>
          <p className="text-slate-400 mb-6">
            These drugs have plausible mechanisms for AD but were tested in faster, cheaper indications first.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {(showAllDrugs ? redirectedDrugs : redirectedDrugs.slice(0, 4)).map(
              (drug, index) => (
                <RedirectedDrugCard key={drug.id} drug={drug} index={index} />
              )
            )}
          </div>

          {redirectedDrugs.length > 4 && (
            <button
              className="mt-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 mx-auto"
              onClick={() => setShowAllDrugs(!showAllDrugs)}
            >
              {showAllDrugs ? (
                <>
                  Show less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show {redirectedDrugs.length - 4} more <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </motion.div>

        {/* Investment Asymmetry Section */}
        <motion.div
          className="mt-20 pt-16 border-t border-slate-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-2 text-center">
            The Investment Asymmetry
          </h3>
          <p className="text-slate-400 mb-12 text-center max-w-2xl mx-auto">
            The drugs that receive investment are selected based on patent status, not scientific promise.
          </p>

          {/* Waterfall visualization */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-16">
              {/* Patented bar */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'bottom' }}
              >
                <div className="relative">
                  <motion.div
                    className="w-32 sm:w-40 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
                    style={{ height: '300px' }}
                    initial={{ height: 0 }}
                    whileInView={{ height: 300 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <DollarSign className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-2xl sm:text-3xl font-bold font-mono block">
                          {formatCurrency(investmentData.patented.total, true)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </motion.div>
                </div>
                <p className="mt-4 text-white font-semibold">{investmentData.patented.label}</p>
                <p className="text-sm text-slate-400 mt-1">
                  {investmentData.patented.examples.join(', ')}
                </p>
              </motion.div>

              {/* Ratio indicator */}
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl sm:text-5xl font-bold font-mono text-amber-500">
                  {investmentData.ratio}:1
                </span>
                <p className="text-slate-400 mt-2">Investment Ratio</p>
              </motion.div>

              {/* Generic bar */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'bottom' }}
              >
                <div className="relative h-[300px] flex items-end">
                  <motion.div
                    className="w-32 sm:w-40 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg flex items-center justify-center"
                    initial={{ height: 0 }}
                    whileInView={{ height: 3 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    style={{ minHeight: '3px' }}
                  />
                  <motion.div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 block">
                      {formatCurrency(investmentData.generic.total, true)}
                    </span>
                    <TrendingDown className="w-5 h-5 text-emerald-400 mx-auto mt-1" />
                  </motion.div>
                </div>
                <p className="mt-4 text-white font-semibold">{investmentData.generic.label}</p>
                <p className="text-sm text-slate-400 mt-1">
                  {investmentData.generic.examples.join(', ')}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card variant="default" hover={false}>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Category</th>
                        <th className="text-left py-3 px-4 text-blue-400 font-medium">Patented Drugs</th>
                        <th className="text-left py-3 px-4 text-emerald-400 font-medium">Generic/Supplement</th>
                        <th className="text-left py-3 px-4 text-amber-400 font-medium">Delta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, index) => (
                        <motion.tr
                          key={row.category}
                          className="border-b border-slate-800 last:border-0"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <td className="py-3 px-4 text-white font-medium">{row.category}</td>
                          <td className="py-3 px-4 text-slate-300">{row.patented}</td>
                          <td className="py-3 px-4 text-slate-300">{row.generic}</td>
                          <td className="py-3 px-4 text-amber-400 font-mono">{row.delta || '—'}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
