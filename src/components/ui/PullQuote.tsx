'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
  variant?: 'default' | 'dramatic' | 'subtle';
}

/**
 * PullQuote - A dramatic callout for key insights
 * Used to break up data-dense sections with impactful statements
 */
export function PullQuote({
  children,
  attribution,
  className,
  variant = 'default',
}: PullQuoteProps) {
  const variantStyles = {
    default: 'py-12 md:py-16',
    dramatic: 'py-16 md:py-24 bg-[var(--bg-secondary)]',
    subtle: 'py-8 md:py-12',
  };

  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true }}
      className={cn(
        'text-center max-w-4xl mx-auto px-6',
        variantStyles[variant],
        className
      )}
    >
      <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[var(--text-primary)] leading-relaxed">
        &ldquo;{children}&rdquo;
      </p>
      {attribution && (
        <footer className="mt-4 text-sm sm:text-base text-[var(--text-muted)]">
          &mdash; {attribution}
        </footer>
      )}
    </motion.blockquote>
  );
}

interface InsightCalloutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * InsightCallout - A simpler callout without quotes, for editorial insights
 */
export function InsightCallout({ children, className }: InsightCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true }}
      className={cn(
        'text-center max-w-3xl mx-auto py-12 md:py-16 px-6',
        className
      )}
    >
      <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[var(--text-primary)] leading-relaxed">
        {children}
      </p>
    </motion.div>
  );
}
