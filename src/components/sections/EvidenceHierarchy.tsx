'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Container, Section, SectionHeader, Card, CardContent } from '@/components/ui';
import { evidenceHierarchy } from '@/data';

export function EvidenceHierarchy() {
  return (
    <Section id="evidence" fullHeight={false}>
      <Container size="lg">
        <SectionHeader
          title="Evidence Hierarchy for Causality"
          subtitle="Most biological evidence is correlational. This ranking helps distinguish strong causal evidence from mere association."
        />

        <div className="space-y-4 max-w-4xl mx-auto">
          {evidenceHierarchy.map((level, index) => (
            <motion.div
              key={level.type}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <EvidenceLevelCard level={level} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

interface EvidenceLevelCardProps {
  level: (typeof evidenceHierarchy)[0];
}

function EvidenceLevelCard({ level }: EvidenceLevelCardProps) {
  const getColorClasses = (stars: number) => {
    if (stars >= 5) return 'border-emerald-500/50 bg-emerald-900/10';
    if (stars >= 4) return 'border-blue-500/50 bg-blue-900/10';
    if (stars >= 3) return 'border-amber-500/50 bg-amber-900/10';
    return 'border-slate-600 bg-slate-800/30';
  };

  const getStarColor = (stars: number) => {
    if (stars >= 5) return 'text-emerald-400';
    if (stars >= 4) return 'text-blue-400';
    if (stars >= 3) return 'text-amber-400';
    return 'text-slate-500';
  };

  return (
    <Card className={`${getColorClasses(level.stars)}`} hover={false}>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          {/* Stars */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < level.stars ? getStarColor(level.stars) : 'text-slate-700'}`}
                fill={i < level.stars ? 'currentColor' : 'none'}
              />
            ))}
          </div>

          {/* Content */}
          <div className="flex-grow">
            <h3 className="font-bold text-white mb-1">{level.type}</h3>
            <p className="text-sm text-slate-400 mb-3">{level.description}</p>

            {/* Examples */}
            <div className="space-y-1">
              {level.examples.map((example, i) => (
                <p key={i} className="text-xs text-slate-500 pl-3 border-l-2 border-slate-700">
                  {example}
                </p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
