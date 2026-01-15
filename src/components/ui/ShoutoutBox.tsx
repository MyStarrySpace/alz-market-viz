'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ShoutoutBoxProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'warning' | 'danger' | 'success';
}

// Theme-consistent colors
const variantStyles: Record<string, { bg: string; border: string; text: string }> = {
  default: {
    bg: 'rgba(120, 116, 115, 0.1)', // muted
    border: '#787473',
    text: '#787473',
  },
  primary: {
    bg: 'rgba(72, 99, 147, 0.1)', // primary blue
    border: '#486393',
    text: '#486393',
  },
  secondary: {
    bg: 'rgba(0, 115, 133, 0.1)', // teal
    border: '#007385',
    text: '#007385',
  },
  warning: {
    bg: 'rgba(229, 175, 25, 0.1)', // warning yellow
    border: '#E5AF19',
    text: '#b38600', // darker for readability
  },
  danger: {
    bg: 'var(--danger-light)',
    border: 'var(--danger)',
    text: 'var(--danger)',
  },
  success: {
    bg: 'var(--success-light)',
    border: 'var(--success)',
    text: 'var(--success)',
  },
  pink: {
    bg: 'rgba(195, 87, 127, 0.1)',
    border: '#C3577F',
    text: '#C3577F',
  },
  orange: {
    bg: 'var(--accent-orange-light)',
    border: 'var(--accent-orange)',
    text: 'var(--accent-orange)',
  },
};

export function ShoutoutBox({ children, className, variant = 'default' }: ShoutoutBoxProps) {
  const style = variantStyles[variant] || variantStyles.default;

  return (
    <motion.div
      className={cn('p-4 rounded border', className)}
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
      }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <p className="text-sm" style={{ color: style.text }}>
        {children}
      </p>
    </motion.div>
  );
}
