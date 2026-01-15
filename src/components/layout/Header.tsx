'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui';

// Navigation items - sections and act markers
type NavItem =
  | { type: 'section'; id: string; label: string }
  | { type: 'act'; label: string };

const mainPageNav: NavItem[] = [
  { type: 'act', label: 'I' },
  { type: 'section', id: 'timeline', label: 'Timeline' },
  { type: 'section', id: 'trial-barriers', label: 'Trials' },
  { type: 'act', label: 'II' },
  { type: 'section', id: 'system', label: 'System' },
  { type: 'section', id: 'cases', label: 'Cases' },
  { type: 'act', label: 'III' },
  { type: 'section', id: 'hopeful-developments', label: 'Hope' },
  { type: 'section', id: 'promising-frontier', label: 'Frontier' },
];

// Extract just sections for scroll tracking
const mainPageSections = mainPageNav.filter((item): item is { type: 'section'; id: string; label: string } => item.type === 'section');

export function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');
  const isHomePage = pathname === '/';

  // Track active section on scroll (only on home page)
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      // Find the current section
      for (let i = mainPageSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(mainPageSections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(mainPageSections[i].id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Handle smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[var(--border)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-serif text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-orange)] transition-colors"
          >
            Untangling Alzheimer&apos;s
          </Link>
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {isHomePage ? (
              // On home page: show section navigation with act labels
              mainPageNav.map((item, index) => (
                item.type === 'act' ? (
                  <li key={`act-${item.label}`} className="hidden sm:block">
                    <span className="px-1.5 py-2 text-xs font-medium text-[var(--border)] select-none">
                      {item.label}
                    </span>
                  </li>
                ) : (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`px-2 sm:px-2.5 py-2 text-sm font-medium transition-colors ${
                        activeSection === item.id
                          ? 'text-[var(--accent-orange)]'
                          : 'text-[var(--text-muted)] hover:text-[var(--accent-orange)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                )
              ))
            ) : (
              // On other pages: show link back to home
              <li>
                <Link
                  href="/"
                  className="px-2 sm:px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent-orange)] transition-colors"
                >
                  ← Back to Main
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </motion.header>
  );
}
