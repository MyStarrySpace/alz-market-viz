'use client';

import { motion } from 'framer-motion';
import { PauseCircle, BookOpen, FileText } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

interface ClaimWithEvidence {
  claim: string;
  evidence: string;
  sourceNote?: string;
}

interface PauseCardProps {
  /** Act number or label */
  actLabel: string;
  /** Brief summary of what was covered */
  summary: string;
  /** Array of claims with their supporting evidence */
  claimsWithEvidence: ClaimWithEvidence[];
  /** Optional call to action or forward look */
  lookAhead?: string;
  /** Background variant */
  variant?: 'default' | 'warm' | 'teal';
  className?: string;
}

/**
 * PauseCard - A summary component at the end of each act
 * Provides a natural stopping point and separates claims from evidence
 */
export function PauseCard({
  actLabel,
  summary,
  claimsWithEvidence,
  lookAhead,
  variant = 'default',
  className,
}: PauseCardProps) {
  const variantStyles = {
    default: 'bg-[var(--bg-primary)]',
    warm: 'bg-[#f0ebe5]',
    teal: 'bg-[#007385]/5',
  };

  return (
    <section
      className={cn(
        'py-16 md:py-24',
        variantStyles[variant],
        className
      )}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <PauseCircle className="w-5 h-5 text-[var(--text-muted)]" />
            <span className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wide">
              {actLabel} Summary
            </span>
          </div>

          {/* Summary */}
          <p className="text-xl md:text-2xl font-serif text-[var(--text-primary)] mb-10 leading-relaxed">
            {summary}
          </p>

          {/* Claims and Evidence */}
          <div className="space-y-6 mb-10">
            <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Key Takeaways
            </h3>

            {claimsWithEvidence.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-l-2 border-[var(--border)] pl-4"
              >
                {/* Claim - bold, primary */}
                <p className="font-semibold text-[var(--text-primary)] mb-2">
                  {item.claim}
                </p>

                {/* Evidence - smaller, muted, with icon */}
                <div className="flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[var(--text-body)]">
                      {item.evidence}
                    </p>
                    {item.sourceNote && (
                      <p className="text-xs text-[var(--text-muted)] mt-1 italic">
                        {item.sourceNote}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Look ahead */}
          {lookAhead && (
            <div className="pt-6 border-t border-[var(--border)]">
              <p className="text-sm text-[var(--text-muted)] italic">
                {lookAhead}
              </p>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
