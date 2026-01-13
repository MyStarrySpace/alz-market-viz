'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Pill,
  AlertTriangle,
  Zap,
  Brain,
  Droplets,
  Shield,
  Cpu,
  Network,
  Activity,
  Skull
} from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent } from '@/components/ui';
import { mechanisticCascade, drugEfficacyComparison } from '@/data';

const stageIcons = [
  Zap,       // Stage 1: Entry Points
  Droplets,  // Stage 2: Systemic
  Shield,    // Stage 3: BBB
  Cpu,       // Stage 4: Lysosomal
  Network,   // Stage 5: Myelin
  Activity,  // Stage 6: Abeta Production
  Brain,     // Stage 7: Microglia
  AlertTriangle, // Stage 8: Plaques
  Skull,     // Stage 9: Dementia
];

export function MechanisticCascade() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  return (
    <Section id="cascade">
      <Container>
        <SectionHeader
          title="The 9-Stage Causal Cascade"
          subtitle="Why amyloid is downstream: A unified model integrating all alternative hypotheses"
        />

        {/* Key insight */}
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card variant="highlighted" hover={false}>
            <CardContent>
              <p className="text-slate-300">
                A key insight from recent research is that amyloid-beta deposition appears to be a{' '}
                <span className="text-blue-400 font-semibold">consequence</span>—not a cause—of
                upstream dysfunction. The &quot;sidelined researchers&quot; weren&apos;t wrong—they were each
                describing different stages of the same cascade.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cascade visualization */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line connector */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-500 to-red-500 hidden md:block" />

          <div className="space-y-4">
            {mechanisticCascade.map((stage, index) => {
              const Icon = stageIcons[index] || Brain;
              const isExpanded = expandedStage === stage.stage;
              const isCurrentTarget = stage.stage === 8;

              return (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`
                      relative md:ml-16 rounded-lg border cursor-pointer transition-all
                      ${isCurrentTarget
                        ? 'bg-red-900/30 border-red-500/50 hover:border-red-400'
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'}
                    `}
                    onClick={() => setExpandedStage(isExpanded ? null : stage.stage)}
                  >
                    {/* Stage number bubble */}
                    <div className={`
                      absolute -left-16 top-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold hidden md:flex
                      ${isCurrentTarget ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'}
                    `}>
                      {stage.stage}
                    </div>

                    {/* Header */}
                    <div className="p-4 flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                        ${isCurrentTarget ? 'bg-red-500/20' : 'bg-slate-700'}
                      `}>
                        <Icon className={`w-5 h-5 ${isCurrentTarget ? 'text-red-400' : 'text-blue-400'}`} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-mono md:hidden">
                            Stage {stage.stage}
                          </span>
                          <h3 className="font-bold text-white">{stage.title}</h3>
                          {isCurrentTarget && (
                            <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">
                              Current Drug Target
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mt-1">{stage.description}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                      </motion.div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 border-t border-slate-700 pt-4">
                            <div className="space-y-4">
                              {/* Mechanisms */}
                              <div>
                                <h4 className="text-sm font-medium text-slate-400 mb-2">Mechanisms</h4>
                                <ul className="space-y-1">
                                  {stage.mechanisms.map((mechanism, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                      <ChevronRight className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                                      <span>{mechanism}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Evidence level */}
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-slate-500">Evidence:</span>
                                <span className="text-amber-400">{stage.evidenceLevel}</span>
                              </div>

                              {/* Researchers */}
                              {stage.researchers && stage.researchers.length > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-slate-500">Key researchers:</span>
                                  <span className="text-blue-400">{stage.researchers.join(', ')}</span>
                                </div>
                              )}

                              {/* Drugs targeting this stage */}
                              {stage.drugs && stage.drugs.length > 0 && (
                                <div className="mt-3 p-3 bg-slate-900/50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Pill className="w-4 h-4 text-red-400" />
                                    <span className="text-sm font-medium text-slate-300">Drugs targeting this stage</span>
                                  </div>
                                  <div className="space-y-1">
                                    {stage.drugs.map((drug) => (
                                      <div key={drug.name} className="flex justify-between text-sm">
                                        <span className="text-slate-400">{drug.name}</span>
                                        <span className="text-red-400 font-mono">{drug.effect}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Drug efficacy comparison */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white text-center mb-6">
            Why Anti-Amyloid Drugs Show Only Modest Efficacy
          </h3>
          <Card variant="default" hover={false}>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Drug</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Target Stage</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Efficacy</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Why Limited</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drugEfficacyComparison.map((drug, index) => (
                      <tr key={drug.drug} className="border-b border-slate-800 last:border-0">
                        <td className="py-3 px-4 text-white font-medium">{drug.drug}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-mono ${
                            drug.targetStage === 8 ? 'bg-red-900/30 text-red-400' : 'bg-emerald-900/30 text-emerald-400'
                          }`}>
                            Stage {drug.targetStage}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-mono text-sm">{drug.efficacy}</td>
                        <td className="py-3 px-4 text-slate-400 text-sm">{drug.limitation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-500 text-center">
                The &quot;minimal clinically important difference&quot; (MCID) for CDR-SB is 1.0 points.
                Lecanemab&apos;s effect (0.45 points) is less than half this threshold.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
}
