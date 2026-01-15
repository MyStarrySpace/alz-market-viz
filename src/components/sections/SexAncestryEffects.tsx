'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Users,
  Dna,
  AlertTriangle,
  TrendingDown,
} from 'lucide-react';
import { Container, Section, SectionHeader } from '@/components/ui';
import {
  sexDifferencesSummary,
  xLinkedLysosomalGenes,
  hormoneEffects,
  sexPathwayDifferences,
  ancestryAPOE4Risks,
  ancestryAPOE4Expression,
  ancestryFatDistribution,
  nigerianParadox,
  mechanismMatchedInterventions,
  currentTrialProblems,
  sexAncestryKeyStatistics,
} from '@/data';

// Color palette
const colors = {
  dark: '#263238',
  blue: '#486393',
  lightBlue: '#E6F1F6',
  lightGray: '#F6F6F6',
  muted: '#787473',
  orange: '#C9461D',
  teal: '#007385',
  pink: '#FFA1D7',
  yellow: '#FFE485',
  skyBlue: '#7ED3FF',
  lightOrange: '#FFA380',
  amerindian: '#E5AF19',
  nigerian: '#C3577F',
};

// Tab options
type TabId = 'sex' | 'ancestry' | 'trials';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'sex', label: 'Sex Differences', icon: <Users className="w-4 h-4" /> },
  { id: 'ancestry', label: 'Ancestry Effects', icon: <Dna className="w-4 h-4" /> },
  { id: 'trials', label: 'Trial Implications', icon: <AlertTriangle className="w-4 h-4" /> },
];

// Menopause comparison visualization
function MenopauseComparison() {
  const factors = [
    { label: 'Estrogen', pre: 'HIGH', post: 'LOW', impact: 'negative' },
    { label: 'Lysosomal pH', pre: '~4.5-5.0', post: '>5.5', impact: 'negative' },
    { label: 'Cathepsins', pre: 'ACTIVE', post: 'INACTIVE', impact: 'negative' },
    { label: 'Clearance', pre: 'Aβ/Tau CLEARED', post: 'ACCUMULATE', impact: 'negative' },
    { label: 'FSH', pre: 'LOW', post: 'HIGH', impact: 'negative' },
    { label: 'Fat Distribution', pre: 'Subcutaneous', post: 'Visceral', impact: 'negative' },
  ];

  return (
    <div className="bg-white rounded-sm border border-[var(--border)] p-6">
      <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">
        The Menopause "Perfect Storm"
      </h4>
      <div className="grid grid-cols-3 gap-2 text-sm mb-4">
        <div className="font-medium" style={{ color: colors.muted }}>Factor</div>
        <div className="font-medium text-center" style={{ color: colors.teal }}>Pre-Menopause</div>
        <div className="font-medium text-center" style={{ color: colors.orange }}>Post-Menopause</div>
      </div>
      {factors.map((factor, idx) => (
        <motion.div
          key={factor.label}
          className="grid grid-cols-3 gap-2 py-2 border-t border-[var(--border)] text-sm"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          viewport={{ once: true }}
        >
          <div className="font-medium" style={{ color: colors.dark }}>{factor.label}</div>
          <div
            className="text-center px-2 py-1"
            style={{ backgroundColor: colors.lightBlue, color: colors.teal }}
          >
            {factor.pre}
          </div>
          <div
            className="text-center px-2 py-1"
            style={{ backgroundColor: colors.lightOrange + '40', color: colors.orange }}
          >
            {factor.post}
          </div>
        </motion.div>
      ))}
      <p className="mt-4 text-sm italic" style={{ color: colors.muted }}>
        Multiple protective factors reverse simultaneously at menopause, creating a "perfect storm" for AD pathology.
      </p>
    </div>
  );
}

// APOE4 risk by ancestry chart
function AncestryRiskChart() {
  const maxRisk = 15;

  // Map ancestry to specific colors
  const getBarColor = (ancestry: string, vsEuropean: string) => {
    if (ancestry === 'Amerindian') return colors.amerindian;
    if (ancestry === 'Nigerian') return colors.nigerian;
    if (vsEuropean === 'Reference') return colors.blue;
    if (vsEuropean.includes('AMPLIFIED')) return colors.orange;
    if (vsEuropean.includes('ATTENUATED') || vsEuropean.includes('PROTECTED')) return colors.teal;
    return colors.blue;
  };

  return (
    <div className="bg-white rounded-sm border border-[var(--border)] p-6">
      <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">
        APOE4 Risk Varies 3-5× by Ancestry
      </h4>
      <div className="space-y-3">
        {ancestryAPOE4Risks.map((item, idx) => {
          const riskValue = item.apoe4OddsRatio === 'No association'
            ? 1
            : item.apoe4OddsRatio.includes('~')
              ? parseFloat(item.apoe4OddsRatio.replace('~', '').replace('×', ''))
              : parseFloat(item.apoe4OddsRatio.split('-')[1]?.replace('×', '') || item.apoe4OddsRatio.replace('×', ''));
          const width = (riskValue / maxRisk) * 100;

          const barColor = getBarColor(item.ancestry, item.vsEuropean);

          return (
            <motion.div
              key={item.ancestry}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: colors.dark }}>{item.ancestry}</span>
                <span className="text-sm" style={{ color: colors.muted }}>{item.apoe4OddsRatio}</span>
              </div>
              <div className="h-6 overflow-hidden" style={{ backgroundColor: colors.lightGray }}>
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: barColor }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${width}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: colors.muted }}>{item.notes}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Fat distribution by ancestry
function FatDistributionChart() {
  return (
    <div className="bg-white rounded-sm border border-[var(--border)] p-6">
      <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">
        Fat Distribution by Ancestry
      </h4>
      <p className="text-sm mb-4" style={{ color: colors.muted }}>
        Visceral fat secretes inflammatory cytokines (IL-6, TNF-α) that cross the BBB and promote neuroinflammation.
      </p>
      <div className="space-y-4">
        {ancestryFatDistribution.map((item, idx) => (
          <motion.div
            key={item.ancestry}
            className="border border-[var(--border)] rounded-sm p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="font-medium mb-2" style={{ color: colors.dark }}>{item.ancestry}</div>
            <div className="flex gap-4 mb-2">
              <div className="flex-1">
                <div className="text-xs mb-1" style={{ color: colors.muted }}>Visceral (VAT)</div>
                <div
                  className="h-3"
                  style={{
                    width: item.visceralFat === 'high' ? '100%' : item.visceralFat === 'low' ? '33%' : '66%',
                    backgroundColor: item.visceralFat === 'high' ? colors.orange : item.visceralFat === 'low' ? colors.teal : colors.yellow
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="text-xs mb-1" style={{ color: colors.muted }}>Subcutaneous (SAT)</div>
                <div
                  className="h-3"
                  style={{
                    width: item.subcutaneousFat === 'high' ? '100%' : item.subcutaneousFat === 'low' ? '33%' : '66%',
                    backgroundColor: item.subcutaneousFat === 'high' ? colors.teal : item.subcutaneousFat === 'low' ? colors.orange : colors.yellow
                  }}
                />
              </div>
            </div>
            <p className="text-xs" style={{ color: colors.muted }}>{item.metabolicPattern}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Mechanism-matched interventions table
function InterventionsTable() {
  return (
    <div className="bg-white rounded-sm border border-[var(--border)] p-6 overflow-x-auto">
      <h4 className="font-serif font-bold text-[var(--text-primary)] mb-4">
        Mechanism-Matched Interventions
      </h4>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="text-left py-2 pr-4 font-medium" style={{ color: colors.muted }}>Intervention</th>
            <th className="text-left py-2 pr-4 font-medium" style={{ color: colors.teal }}>Best Candidates</th>
            <th className="text-left py-2 font-medium" style={{ color: colors.orange }}>Worst Candidates</th>
          </tr>
        </thead>
        <tbody>
          {mechanismMatchedInterventions.map((item, idx) => (
            <motion.tr
              key={item.intervention}
              className="border-b border-[var(--border)] last:border-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <td className="py-3 pr-4 font-medium" style={{ color: colors.dark }}>{item.intervention}</td>
              <td className="py-3 pr-4" style={{ backgroundColor: colors.lightBlue + '80', color: colors.teal }}>{item.bestCandidates}</td>
              <td className="py-3" style={{ backgroundColor: colors.lightOrange + '30', color: colors.orange }}>{item.worstCandidates}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Sex differences content
function SexDifferencesContent() {
  const [showXLinkedGenes, setShowXLinkedGenes] = useState(false);

  return (
    <div className="space-y-8">
      {/* Key statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          className="border rounded-sm p-6 text-center"
          style={{ backgroundColor: colors.pink + '20', borderColor: colors.pink }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl font-bold font-serif" style={{ color: colors.dark }}>{sexAncestryKeyStatistics.femaleToMaleRatio}</div>
          <div className="text-sm mt-2" style={{ color: colors.muted }}>Female to Male AD ratio</div>
        </motion.div>
        <motion.div
          className="border rounded-sm p-6 text-center"
          style={{ backgroundColor: colors.lightOrange + '30', borderColor: colors.orange }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl font-bold font-serif" style={{ color: colors.dark }}>{sexAncestryKeyStatistics.postMenopausalAccelerationWindow}</div>
          <div className="text-sm mt-2" style={{ color: colors.muted }}>Post-menopausal acceleration window</div>
        </motion.div>
        <motion.div
          className="border rounded-sm p-6 text-center"
          style={{ backgroundColor: colors.lightBlue, borderColor: colors.blue }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl font-bold font-serif" style={{ color: colors.dark }}>7/14</div>
          <div className="text-sm mt-2" style={{ color: colors.muted }}>Fat distribution loci with sex dimorphism</div>
        </motion.div>
      </div>

      {/* Key insight */}
      <div
        className="border rounded-sm p-4"
        style={{ backgroundColor: colors.yellow + '40', borderColor: colors.yellow }}
      >
        <p className="text-sm" style={{ color: colors.dark }}>
          <strong>Key insight:</strong> {sexDifferencesSummary.keyInsight}
        </p>
      </div>

      {/* X-linked genes (collapsible) */}
      <div className="bg-white rounded-sm border border-[var(--border)]">
        <button
          onClick={() => setShowXLinkedGenes(!showXLinkedGenes)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Dna className="w-5 h-5" style={{ color: colors.orange }} />
            <span className="font-medium" style={{ color: colors.dark }}>
              X-Linked Lysosomal Genes (Chain 1: pH → Clearance)
            </span>
          </div>
          {showXLinkedGenes ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        <AnimatePresence>
          {showXLinkedGenes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 space-y-3">
                {xLinkedLysosomalGenes.map((gene) => (
                  <div key={gene.gene} className="border border-[var(--border)] rounded-sm p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-mono font-bold" style={{ color: colors.orange }}>{gene.gene}</span>
                        <span className="text-xs ml-2" style={{ color: colors.muted }}>{gene.location}</span>
                      </div>
                      <span
                        className="text-xs px-2 py-1"
                        style={{
                          backgroundColor: gene.escapesXInactivation ? colors.lightOrange + '40' : colors.lightBlue,
                          color: gene.escapesXInactivation ? colors.orange : colors.teal
                        }}
                      >
                        {gene.escapesXInactivation ? 'Escapes X-inactivation' : 'Subject to X-inactivation'}
                      </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: colors.dark }}><strong>Function:</strong> {gene.function}</p>
                    <p className="text-sm mb-1" style={{ color: colors.dark }}><strong>Disease:</strong> {gene.diseaseWhenMutated}</p>
                    <p className="text-xs italic" style={{ color: colors.muted }}>{gene.adRelevance}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hormone effects */}
      <div className="bg-white rounded-sm border border-[var(--border)] p-6">
        <h4 className="font-serif font-bold mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
          <TrendingDown className="w-5 h-5" style={{ color: colors.orange }} />
          Hormone Effects on Lysosomal Function
        </h4>
        <div className="space-y-4">
          {hormoneEffects.map((effect, idx) => (
            <motion.div
              key={effect.hormone}
              className="border-l-4 pl-4 py-2"
              style={{ borderColor: colors.orange }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="font-medium" style={{ color: colors.dark }}>{effect.hormone}</div>
              <div className="text-sm" style={{ color: colors.dark }}>{effect.effectOnLysosomes}</div>
              <div className="text-xs mt-1 italic" style={{ color: colors.muted }}>{effect.adImplication}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menopause comparison */}
      <MenopauseComparison />

      {/* Sex-specific pathway usage */}
      <div className="bg-white rounded-sm border border-[var(--border)] p-6 overflow-x-auto">
        <h4 className="font-serif font-bold mb-4" style={{ color: colors.dark }}>
          Sex-Specific Pathway Usage
        </h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-2 pr-4 font-medium" style={{ color: colors.muted }}>Pathway</th>
              <th className="text-left py-2 pr-4 font-medium" style={{ color: colors.blue }}>Males</th>
              <th className="text-left py-2 pr-4 font-medium" style={{ color: colors.pink }}>Females</th>
              <th className="text-left py-2 font-medium" style={{ color: colors.muted }}>Therapeutic Implication</th>
            </tr>
          </thead>
          <tbody>
            {sexPathwayDifferences.map((item, idx) => (
              <motion.tr
                key={item.pathway}
                className="border-b border-[var(--border)] last:border-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <td className="py-3 pr-4 font-medium" style={{ color: colors.dark }}>{item.pathway}</td>
                <td className="py-3 pr-4" style={{ color: colors.blue }}>{item.males}</td>
                <td className="py-3 pr-4" style={{ color: colors.pink }}>{item.females}</td>
                <td className="py-3 text-xs" style={{ color: colors.muted }}>{item.therapeuticImplication}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Ancestry differences content
function AncestryDifferencesContent() {
  return (
    <div className="space-y-8">
      {/* Key statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          className="border rounded-sm p-6 text-center"
          style={{ backgroundColor: colors.lightBlue, borderColor: colors.blue }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl font-bold font-serif" style={{ color: colors.blue }}>{sexAncestryKeyStatistics.apoe4RiskVariationAcrossAncestries}</div>
          <div className="text-sm mt-2" style={{ color: colors.muted }}>APOE4 risk variation across ancestries</div>
        </motion.div>
        <motion.div
          className="border rounded-sm p-6 text-center"
          style={{ backgroundColor: colors.lightBlue, borderColor: colors.teal }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl font-bold font-serif" style={{ color: colors.teal }}>{sexAncestryKeyStatistics.africanAPOE4RiskReduction}</div>
          <div className="text-sm mt-2" style={{ color: colors.muted }}>African APOE4 risk reduction vs European</div>
        </motion.div>
      </div>

      {/* APOE expression insight */}
      <div
        className="border rounded-sm p-4"
        style={{ backgroundColor: colors.yellow + '40', borderColor: colors.yellow }}
      >
        <p className="text-sm" style={{ color: colors.dark }}>
          <strong>Critical insight:</strong> {ancestryAPOE4Expression.criticalInsight}
        </p>
      </div>

      {/* Charts side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AncestryRiskChart />
        <FatDistributionChart />
      </div>

      {/* Nigerian Paradox */}
      <div className="bg-white rounded-sm border border-[var(--border)] p-6">
        <h4 className="font-serif font-bold mb-4" style={{ color: colors.dark }}>
          The "Nigerian Paradox"
        </h4>
        <p className="mb-4" style={{ color: colors.dark }}>{nigerianParadox.phenomenon}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {nigerianParadox.possibleExplanations.map((exp, idx) => (
            <motion.div
              key={exp.factor}
              className="border border-[var(--border)] rounded-sm p-3"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="font-medium text-sm" style={{ color: colors.orange }}>{exp.factor}</div>
              <div className="text-sm" style={{ color: colors.muted }}>{exp.explanation}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Trial implications content
function TrialImplicationsContent() {
  return (
    <div className="space-y-8">
      {/* Current problems */}
      <div
        className="border rounded-sm p-6"
        style={{ backgroundColor: colors.lightOrange + '20', borderColor: colors.orange }}
      >
        <h4 className="font-serif font-bold mb-4 flex items-center gap-2" style={{ color: colors.orange }}>
          <AlertTriangle className="w-5 h-5" />
          Current Trial Problems
        </h4>
        <ul className="space-y-2">
          {currentTrialProblems.map((problem, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-2 text-sm"
              style={{ color: colors.orange }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <span className="mt-1" style={{ color: colors.lightOrange }}>•</span>
              {problem}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Interventions table */}
      <InterventionsTable />

      {/* Bottom line */}
      <motion.div
        className="border rounded-sm p-6 text-center"
        style={{ backgroundColor: colors.lightBlue, borderColor: colors.teal }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-medium" style={{ color: colors.teal }}>
          <strong>Bottom line:</strong> Precision medicine in AD requires stratification by sex, menopausal status, ancestry (with local APOE haplotype), and metabolic phenotype. One-size-fits-all approaches will continue to fail.
        </p>
      </motion.div>
    </div>
  );
}

export function SexAncestryEffects() {
  const [activeTab, setActiveTab] = useState<TabId>('sex');

  return (
    <Section id="sex-ancestry" className="bg-[var(--bg-secondary)]">
      <Container>
        <SectionHeader
          title="Sex & Ancestry in AD"
          subtitle="Mechanistic drivers, rather than statistical covariates, that determine who gets AD and who responds to treatment."
        />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: activeTab === tab.id ? colors.orange : 'white',
                color: activeTab === tab.id ? 'white' : colors.muted,
                border: activeTab === tab.id ? `1px solid ${colors.orange}` : '1px solid var(--border)',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'sex' && <SexDifferencesContent />}
            {activeTab === 'ancestry' && <AncestryDifferencesContent />}
            {activeTab === 'trials' && <TrialImplicationsContent />}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
}

// Export individual visualization components for showcase
export { MenopauseComparison, AncestryRiskChart, FatDistributionChart, InterventionsTable };
