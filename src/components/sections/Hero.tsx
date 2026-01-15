'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroStat } from '@/components/ui';

export function Hero() {
  const scrollToContent = () => {
    const contentSection = document.getElementById('paradox');
    contentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="flex items-center justify-center relative px-6 overflow-hidden"
      style={{
        minHeight: 'calc(100vh - 64px)',
        paddingBottom: '80px',
      }}
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="relative px-6 py-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight font-serif leading-tight"
          >
            Untangling Alzheimer&apos;s
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto"
          >
            The science, the system, and the search for a cure
          </motion.p>

          {/* Hero stat - the most impactful number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 mb-12"
          >
            <HeroStat
              value={99}
              suffix="%"
              label="Clinical trial failure rate"
              sublabel="Over 400 trials failed between 2002-2012"
              color="danger"
            />
          </motion.div>

          {/* Supporting stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto"
          >
            <StatCard value="55M+" label="People with dementia worldwide" />
            <StatCard value="850:1" label="Novel vs. repurposed drug trials" />
            <StatCard value="$42.5B" label="Private R&D spent (1995-2021)" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 1 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <span className="text-sm text-[var(--text-muted)] mb-2 group-hover:text-[var(--text-body)] transition-colors">
          Scroll to explore
        </span>
        <ChevronDown className="w-8 h-8 text-[var(--text-muted)] group-hover:text-[var(--text-body)] transition-colors" />
      </motion.button>
    </section>
  );
}

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-[var(--bg-secondary)] rounded border border-[var(--border)] p-6 text-center">
      <span className="text-2xl sm:text-3xl font-bold font-serif text-[var(--accent-orange)] block">
        {value}
      </span>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{label}</p>
    </div>
  );
}
