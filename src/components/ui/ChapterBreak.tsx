'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

// Define act configuration
const acts = [
  { id: 'act-1', label: 'I', sectionId: 'paradox' },
  { id: 'act-2', label: 'II', sectionId: 'system' },
  { id: 'act-3', label: 'III', sectionId: 'hopeful-developments' },
];

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
  const containerRef = useRef<HTMLElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  // Calculate the width of the progress bar area
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Use a max-width similar to the content
        setBarWidth(Math.min(containerRef.current.offsetWidth - 48, 800));
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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

  const barColor = variant === 'dark' || variant === 'teal'
    ? 'bg-white/20'
    : 'bg-[var(--border)]';

  const tickColor = variant === 'dark' || variant === 'teal'
    ? 'bg-white/40'
    : 'bg-[var(--text-muted)]';

  const activeTickColor = variant === 'dark' || variant === 'teal'
    ? 'bg-white'
    : 'bg-[var(--accent-orange)]';

  // Determine which act is currently active based on the label
  const currentActIndex = label ? parseInt(label.replace(/\D/g, '')) - 1 : -1;

  // Scroll to a specific act section
  const scrollToAct = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Calculate tick positions (evenly distributed)
  const tickSpacing = barWidth / (acts.length + 1);

  return (
    <section
      ref={containerRef}
      id={label ? `act-${label.replace(/\D/g, '')}` : undefined}
      className={cn(
        'min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center px-6 py-16',
        variantStyles[variant],
        className
      )}
    >
      {/* Progress bar with act markers */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16 relative"
        style={{ width: barWidth || '100%' }}
      >
        {/* Main horizontal line */}
        <div className={cn('h-px w-full', barColor)} />

        {/* Tick marks and labels */}
        <div className="relative" style={{ height: 60 }}>
          {acts.map((act, index) => {
            const isActive = index === currentActIndex;
            const isPast = index < currentActIndex;
            const xPos = tickSpacing * (index + 1);

            return (
              <button
                key={act.id}
                onClick={() => scrollToAct(act.sectionId)}
                className="absolute flex flex-col items-center group transition-transform hover:scale-110"
                style={{
                  left: xPos,
                  transform: 'translateX(-50%)',
                  top: -8,
                }}
              >
                {/* Tick mark */}
                <div
                  className={cn(
                    'w-0.5 h-4 transition-colors',
                    isActive ? activeTickColor : isPast ? tickColor : barColor
                  )}
                />
                {/* Dot */}
                <div
                  className={cn(
                    'w-3 h-3 rounded-full border-2 transition-all mt-1',
                    isActive
                      ? `${activeTickColor} border-transparent`
                      : isPast
                        ? `${tickColor} border-transparent`
                        : `bg-transparent ${variant === 'dark' || variant === 'teal' ? 'border-white/30' : 'border-[var(--border)]'}`
                  )}
                />
                {/* Label */}
                <span
                  className={cn(
                    'mt-2 text-xs font-medium uppercase tracking-widest transition-colors',
                    isActive
                      ? labelColor
                      : isPast
                        ? (variant === 'dark' || variant === 'teal' ? 'text-white/50' : 'text-[var(--text-muted)]')
                        : (variant === 'dark' || variant === 'teal' ? 'text-white/30' : 'text-[var(--border)]'),
                    'group-hover:text-[var(--accent-orange)]'
                  )}
                >
                  Act {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main content */}
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

      {/* Bottom decorative element */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 flex flex-col items-center gap-2"
      >
        <div className={cn('w-px h-8', barColor)} />
        <div className={cn('w-2 h-2 rotate-45', barColor)} />
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
