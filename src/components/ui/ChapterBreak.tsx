'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ChapterBreakProps {
  /** The main statement or question */
  children: React.ReactNode;
  /** Optional chapter label like "Act II" or "Part 2" */
  label?: string;
  /** Background variant */
  variant?: 'default' | 'dark' | 'teal' | 'warm';
  className?: string;
}

/**
 * ChapterBreak - A full-viewport transitional moment between major sections
 * Creates narrative pause and signals a shift in the story
 */
export function ChapterBreak({
  children,
  label,
  variant = 'default',
  className,
}: ChapterBreakProps) {
  const variantStyles = {
    default: 'bg-[var(--bg-secondary)]',
    dark: 'bg-[var(--text-primary)] text-white',
    teal: 'bg-[#007385] text-white',
    warm: 'bg-[#f0ebe5]',
  };

  const textColor = variant === 'dark' || variant === 'teal'
    ? '!text-white'
    : 'text-[var(--text-primary)]';

  const labelColor = variant === 'dark' || variant === 'teal'
    ? 'text-white/70'
    : 'text-[var(--accent-orange)]';

  return (
    <section
      className={cn(
        'min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-6',
        variantStyles[variant],
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="text-center max-w-4xl mx-auto"
      >
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={cn(
              'inline-block text-sm sm:text-base font-medium uppercase tracking-widest mb-6',
              labelColor
            )}
          >
            {label}
          </motion.span>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className={cn(
            'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight',
            textColor
          )}
        >
          {children}
        </motion.h2>
      </motion.div>
    </section>
  );
}

interface SectionDividerProps {
  variant?: 'line' | 'gradient' | 'dots' | 'tick';
  className?: string;
}

/**
 * SectionDivider - A subtle visual separator between sections
 */
export function SectionDivider({ variant = 'gradient', className }: SectionDividerProps) {
  if (variant === 'tick') {
    // Small, secondary-styled tick mark between sections
    return (
      <div className={cn('flex justify-center py-4', className)}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-6 bg-[var(--border)]" />
          <div className="w-2 h-2 rounded-full border-2 border-[var(--border)] bg-transparent" />
          <div className="w-px h-6 bg-[var(--border)]" />
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex justify-center gap-2 py-8', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
      </div>
    );
  }

  if (variant === 'line') {
    return (
      <div className={cn('py-8', className)}>
        <div className="max-w-xs mx-auto h-px bg-[var(--border)]" />
      </div>
    );
  }

  // gradient (default)
  return (
    <div className={cn('py-8', className)}>
      <div
        className="max-w-md mx-auto h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #007385, transparent)',
        }}
      />
    </div>
  );
}
