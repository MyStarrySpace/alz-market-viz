'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, FlaskConical, Scale, TrendingDown, Users, DollarSign, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { ScrollProgress, Header, Footer } from '@/components/layout';
import { Container, Section, SectionHeader, Card, CardContent } from '@/components/ui';
import { EvidenceHierarchy } from '@/components/sections';

// Methodology page sections
const methodologySections = [
  { id: 'methodology-hero', label: 'Overview' },
  { id: 'statistics', label: 'Key Statistics' },
  { id: 'evidence', label: 'Evidence Hierarchy' },
  { id: 'sources', label: 'Research Sources' },
  { id: 'works-cited', label: 'Works Cited' },
  { id: 'principles', label: 'Principles' },
];

export default function MethodologyPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="relative pt-16 mt-14 lg:mt-0">
        {/* Hero */}
        <Section id="methodology-hero" fullHeight={false} className="py-16 bg-[var(--bg-secondary)]">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-orange)] transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to main visualization
              </Link>

              <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4 font-serif">
                Research Methodology
              </h1>
              <p className="text-xl text-[var(--text-body)] max-w-3xl">
                How we evaluate evidence for causality in Alzheimer&apos;s disease research.
                Most biological evidence is correlational—this framework helps distinguish
                strong causal evidence from mere association.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Key Statistics */}
        <Section id="statistics" fullHeight={false} className="bg-[var(--bg-primary)]">
          <Container>
            <SectionHeader
              title="Key Statistics"
              subtitle="The numbers that define the Alzheimer's research landscape, with full source citations."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <StatisticCard
                icon={<Users className="w-6 h-6" />}
                stat="55+ million"
                label="People living with dementia worldwide (2020)"
                source='Alzheimer&apos;s Disease International. "Dementia Statistics." World Alzheimer Report, 2020. Updated by World Health Organisation, Global Status Report on the Public Health Response to Dementia, 2021.'
                sourceUrl="https://www.alzint.org/about/dementia-facts-figures/dementia-statistics/"
                note="Projected to reach 78 million by 2030 and 139 million by 2050. One new case every 3.2 seconds."
              />

              <StatisticCard
                icon={<TrendingDown className="w-6 h-6" />}
                stat="99.6%"
                label="Clinical trial failure rate (2002-2012)"
                source='Cummings, Jeffrey L., et al. "Alzheimer&apos;s Disease Drug-Development Pipeline: Few Candidates, Frequent Failures." Alzheimer&apos;s Research &amp; Therapy, vol. 6, no. 4, 2014, pp. 37-43.'
                sourceUrl="https://pubmed.ncbi.nlm.nih.gov/25024750/"
                note="The highest failure rate of any therapeutic area. Only 1 compound out of 244 reached market in this decade."
              />

              <StatisticCard
                icon={<DollarSign className="w-6 h-6" />}
                stat="$42.5 billion"
                label="Cumulative private R&D expenditure (1995-2021)"
                source='Cummings, Jeffrey L., et al. "The Costs of Developing Treatments for Alzheimer&apos;s Disease: A Retrospective Exploration." Alzheimer&apos;s &amp; Dementia, vol. 18, no. 3, 2022, pp. 469-477.'
                sourceUrl="https://pubmed.ncbi.nlm.nih.gov/34581499/"
                note="57% ($24B) spent on Phase 3 trials. Average cost per approved drug: $5.7 billion (including failures)."
              />

              <StatisticCard
                icon={<BarChart3 className="w-6 h-6" />}
                stat="~850:1"
                label="Patented vs. generic drug R&D investment ratio"
                source='Cummings, Jeffrey L., et al. "Who Funds Alzheimer&apos;s Disease Drug Development?" Alzheimer&apos;s &amp; Dementia: Translational Research &amp; Clinical Interventions, vol. 7, no. 1, 2021, e12185.'
                sourceUrl="https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/trc2.12185"
                note="$42.5B on patented drugs vs. ~$50M estimated on generic repurposing. Trial ratio is ~2:1 (67% novel vs. 33% repurposed in pipeline)."
              />
            </div>

            {/* Investment disparity explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="p-6 rounded-lg bg-[var(--accent-orange-light)] border border-[var(--accent-orange)]">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 font-serif">The Funding Structure Problem</h3>
                <p className="text-[var(--text-body)] mb-4">
                  The disparity between novel molecule and repurposed drug investment reflects a structural problem:
                  pharmaceutical companies fund trials that can generate patent-protected returns, while generic
                  drugs with promising evidence languish in early-stage academic research.
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  As Cummings et al. (2021) note: &quot;The limited patent and intellectual property opportunities
                  for repurposed agents make them less attractive candidates for development by biopharmaceutical
                  companies whose business model requires a substantial return on investment.&quot;
                </p>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* Evidence Hierarchy */}
        <EvidenceHierarchy />

        {/* Research Foundation */}
        <Section id="sources" fullHeight={false} className="bg-[var(--bg-secondary)]">
          <Container>
            <SectionHeader
              title="Research Foundation"
              subtitle="This project is grounded in a comprehensive mechanistic framework developed through systematic literature review."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SourceCard
                icon={<FlaskConical className="w-6 h-6" />}
                title="Primary Literature"
                sources={[
                  'Aron, Liviu, et al. "Lithium Deficiency and the Onset of Alzheimer\'s Disease." Nature, 2025.',
                  'Zhou, Ming, et al. "TNF Blocking Agents Associated with Lower AD Risk." PLoS One, 2020.',
                  'Wang, Jun, et al. "Investigation of Nebivolol as Therapeutic Agent for AD." Journal of Alzheimer\'s Disease, vol. 35, 2013, pp. 771-782.',
                  'Sharaf, Ahmed M., et al. "Metoprolol Exacerbates Dementia via NADPH Oxidase." Neuropharmacology, 2025.',
                  'Wang, Xinying, et al. "Sodium Oligomannate Remodels Gut Microbiota." Cell Research, vol. 29, 2019, pp. 787-803.',
                ]}
              />

              <SourceCard
                icon={<BookOpen className="w-6 h-6" />}
                title="Alternative Hypothesis Champions"
                sources={[
                  'de la Monte, Suzanne M., and Jack R. Wands. "Alzheimer\'s Disease Is Type 3 Diabetes—Evidence Reviewed." Journal of Diabetes Science and Technology, vol. 2, no. 6, 2008, pp. 1101-1113.',
                  'Lee, Ju-Hyun, et al. "Faulty Autolysosome Acidification in Alzheimer\'s Disease." Nature Neuroscience, vol. 25, 2022, pp. 688-701.',
                  'Depp, Constanze, et al. "Myelin Dysfunction Drives Amyloid-β Deposition." Nature, vol. 618, 2023, pp. 349-357.',
                  'Swerdlow, Russell H., and S. M. Khan. "A Mitochondrial Cascade Hypothesis for Sporadic AD." Medical Hypotheses, vol. 63, 2004, pp. 8-20.',
                  'de la Torre, Jack C. "The Vascular Hypothesis of AD." Journal of Alzheimer\'s Disease, vol. 65, 2018, pp. 725-730.',
                ]}
              />

              <SourceCard
                icon={<Scale className="w-6 h-6" />}
                title="Epidemiological & Meta Sources"
                sources={[
                  'Chen, Si, et al. "Lithium Use and Dementia Incidence." PLoS Medicine, vol. 19, no. 6, 2022, e1004020.',
                  'Zheng, Cynthia, et al. "TNF Inhibitors and Dementia in US Veterans." Alzheimer\'s & Dementia, vol. 18, 2022, pp. 1327-1337.',
                  'Beaman, Emily E., et al. "BBB-Permeable β-Blockers and AD Risk." Brain, vol. 145, no. 6, 2022, pp. 2065-2076.',
                  'Eyting, Markus, et al. "A Natural Experiment on Herpes Zoster Vaccination and Dementia." Nature, vol. 625, 2024, pp. 156-164.',
                  'Piller, Charles. "Blots on a Field?" Science, vol. 377, no. 6604, 2022, pp. 358-363.',
                ]}
              />
            </div>
          </Container>
        </Section>

        {/* Works Cited */}
        <Section id="works-cited" fullHeight={false} className="bg-[var(--bg-primary)]">
          <Container size="md">
            <SectionHeader
              title="Works Cited"
              subtitle="Full MLA citations for key statistics referenced in this visualization."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card variant="default" hover={false}>
                <CardContent className="space-y-4">
                  <Citation>
                    Alzheimer&apos;s Disease International. &quot;Dementia Statistics.&quot; <em>Alzheimer&apos;s Disease International</em>,
                    2020, www.alzint.org/about/dementia-facts-figures/dementia-statistics/. Accessed 12 Jan. 2026.
                  </Citation>

                  <Citation>
                    Cummings, Jeffrey L., et al. &quot;Alzheimer&apos;s Disease Drug-Development Pipeline: Few Candidates,
                    Frequent Failures.&quot; <em>Alzheimer&apos;s Research &amp; Therapy</em>, vol. 6, no. 4, 2014, pp. 37-43,
                    doi:10.1186/alzrt269.
                  </Citation>

                  <Citation>
                    Cummings, Jeffrey L., et al. &quot;The Costs of Developing Treatments for Alzheimer&apos;s Disease:
                    A Retrospective Exploration.&quot; <em>Alzheimer&apos;s &amp; Dementia</em>, vol. 18, no. 3, 2022, pp. 469-477,
                    doi:10.1002/alz.12450.
                  </Citation>

                  <Citation>
                    Cummings, Jeffrey L., et al. &quot;Who Funds Alzheimer&apos;s Disease Drug Development?&quot;
                    <em>Alzheimer&apos;s &amp; Dementia: Translational Research &amp; Clinical Interventions</em>,
                    vol. 7, no. 1, 2021, e12185, doi:10.1002/trc2.12185.
                  </Citation>

                  <Citation>
                    World Health Organisation. <em>Global Status Report on the Public Health Response to Dementia</em>.
                    WHO, 2021.
                  </Citation>
                </CardContent>
              </Card>
            </motion.div>
          </Container>
        </Section>

        {/* Principles */}
        <Section id="principles" fullHeight={false} className="bg-[var(--bg-secondary)]">
          <Container size="md">
            <SectionHeader
              title="Guiding Principles"
              subtitle="Our approach to evaluating and presenting AD research evidence."
            />

            <div className="space-y-6">
              <PrincipleCard
                number={1}
                title="Evidence Over Authority"
                description="We rank evidence by methodological strength, not by journal prestige or citation count. The Lesne scandal demonstrates why citation metrics alone are unreliable."
              />
              <PrincipleCard
                number={2}
                title="Causality Over Correlation"
                description="Most AD research shows correlation, not causation. We explicitly highlight when evidence demonstrates causal relationships through genetic knockouts, natural experiments, or bidirectional interventions."
              />
              <PrincipleCard
                number={3}
                title="Transparency About Limitations"
                description="We acknowledge what we don't know. Alternative hypotheses are presented alongside mainstream views, with clear indication of evidence quality for each."
              />
              <PrincipleCard
                number={4}
                title="Follow the Incentives"
                description="Understanding why certain research gets funded (and why other research doesn't) is essential to understanding the state of AD science."
              />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

interface StatisticCardProps {
  icon: React.ReactNode;
  stat: string;
  label: string;
  source: string;
  sourceUrl: string;
  note?: string;
}

function StatisticCard({ icon, stat, label, source, sourceUrl, note }: StatisticCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card variant="highlighted" className="h-full">
        <CardContent>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--accent-orange-light)] flex items-center justify-center text-[var(--accent-orange)] flex-shrink-0">
              {icon}
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--text-primary)] font-mono">{stat}</div>
              <div className="text-[var(--text-body)]">{label}</div>
            </div>
          </div>
          {note && (
            <p className="text-sm text-[var(--text-muted)] mb-4 pl-4 border-l-2 border-[var(--accent-orange)]">
              {note}
            </p>
          )}
          <div className="pt-4 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--text-muted)] mb-1">Source:</p>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--accent-orange)] hover:underline transition-colors break-words"
            >
              {source}
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface SourceCardProps {
  icon: React.ReactNode;
  title: string;
  sources: string[];
}

function SourceCard({ icon, title, sources }: SourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card variant="default" className="h-full">
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-orange-light)] flex items-center justify-center text-[var(--accent-orange)]">
              {icon}
            </div>
            <h3 className="font-bold text-[var(--text-primary)] font-serif">{title}</h3>
          </div>
          <ul className="space-y-2">
            {sources.map((source, i) => (
              <li key={i} className="text-sm text-[var(--text-muted)] pl-3 border-l-2 border-[var(--border)]">
                {source}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface PrincipleCardProps {
  number: number;
  title: string;
  description: string;
}

function PrincipleCard({ number, title, description }: PrincipleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card variant="default">
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-orange)] flex items-center justify-center text-white font-bold flex-shrink-0">
              {number}
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-2 font-serif">{title}</h3>
              <p className="text-[var(--text-muted)]">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Citation({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-[var(--text-body)] pl-8 -indent-8 leading-relaxed">
      {children}
    </p>
  );
}
