'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantClasses = {
  primary: 'bg-white border-[var(--border)] shadow-sm hover:shadow-md hover:border-[var(--accent-orange)] text-[var(--text-body)] hover:text-[var(--accent-orange)]',
  secondary: 'bg-white border-[var(--border)] shadow-sm hover:shadow-md hover:border-[var(--accent-orange)] text-[var(--text-body)] hover:text-[var(--accent-orange)]',
  ghost: 'bg-transparent hover:bg-[var(--bg-secondary)] text-[var(--text-body)] border-transparent hover:text-[var(--accent-orange)]',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center border font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)] focus:ring-offset-2 focus:ring-offset-white',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
}
