'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/cn';

interface HeroStatProps {
  value: string | number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  animate?: boolean;
  className?: string;
  valueClassName?: string;
  color?: 'default' | 'orange' | 'teal' | 'danger';
}

/**
 * HeroStat - A dramatic, oversized statistic component for key insights
 * Used sparingly (1-2 per section) for maximum impact
 */
export function HeroStat({
  value,
  suffix = '',
  prefix = '',
  label,
  sublabel,
  animate = true,
  className,
  valueClassName,
  color = 'orange',
}: HeroStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState<string | number>(
    typeof value === 'number' ? 0 : value
  );

  // Animate number counting up
  useEffect(() => {
    if (!animate || !isInView || typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }

    const duration = 1500; // ms
    const startTime = Date.now();
    const startValue = 0;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (value - startValue) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [value, animate, isInView]);

  const colorClasses = {
    default: 'text-[var(--text-primary)]',
    orange: 'text-[var(--accent-orange)]',
    teal: 'text-[#007385]',
    danger: 'text-[var(--danger)]',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={cn('text-center', className)}
    >
      <div
        className={cn(
          'font-serif font-bold tracking-tight leading-none',
          'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
          colorClasses[color],
          valueClassName
        )}
      >
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <p className="mt-4 text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] font-medium">
        {label}
      </p>
      {sublabel && (
        <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)] max-w-md mx-auto">
          {sublabel}
        </p>
      )}
    </motion.div>
  );
}
