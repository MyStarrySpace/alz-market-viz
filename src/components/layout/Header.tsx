'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui';

const navItems = [
  { label: 'Timeline', href: '/#timeline' },
  { label: 'Trials', href: '/#trial-barriers' },
  { label: 'System', href: '/#system' },
  { label: 'Science', href: '/#cascade' },
  { label: 'Stakes', href: '/#stakes' },
  { label: 'Methodology', href: '/methodology' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-white font-semibold">
            <Brain className="w-6 h-6 text-blue-500" />
            <span className="hidden sm:inline">Untangling Alzheimer's</span>
          </Link>
          <ul className="flex items-center gap-1 sm:gap-4">
            {navItems.map((item) => {
              const isActive = item.href === '/methodology' && pathname === '/methodology';
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-2 sm:px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'text-blue-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </motion.header>
  );
}
