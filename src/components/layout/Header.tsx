'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui';
import { getNavConfig } from '@/data';

// Get navigation config from centralized sections data
const acts = getNavConfig();

// Flatten sections for scroll tracking
const allSections = acts.flatMap(act => act.sections);

export function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [progressWidth, setProgressWidth] = useState(0); // Progress bar width in pixels
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isHomePage = pathname === '/';
  const { scrollYProgress } = useScroll();

  // Track active section on scroll (only on home page)
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      // Find the current section
      for (let i = allSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(allSections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(allSections[i].id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Update indicator position when active section changes
  useEffect(() => {
    if (!activeSection || !navRef.current) {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      setProgressWidth(0);
      return;
    }

    const activeButton = buttonRefs.current.get(activeSection);
    if (activeButton && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      const dotLeft = buttonRect.left - navRect.left + buttonRect.width / 2 - 3;

      setIndicatorStyle({
        left: dotLeft,
        width: 6,
        opacity: 1,
      });

      // Calculate progress bar width: from left edge of screen to center of active button
      // The dot center is at buttonRect.left + buttonRect.width / 2
      setProgressWidth(buttonRect.left + buttonRect.width / 2);
    }
  }, [activeSection]);

  // Store button ref
  const setButtonRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) {
      buttonRefs.current.set(id, el);
    } else {
      buttonRefs.current.delete(id);
    }
  }, []);

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

  // Scroll to first section of an act
  const scrollToAct = (actIndex: number) => {
    const firstSection = acts[actIndex]?.sections[0];
    if (firstSection) {
      scrollToSection(firstSection.id);
    }
  };

  // Determine which act is currently active based on the active section
  const getActiveActIndex = (): number => {
    if (!activeSection) return -1;
    return acts.findIndex(act =>
      act.sections.some(section => section.id === activeSection)
    );
  };

  const activeActIndex = getActiveActIndex();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[var(--border)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress bar aligned with the dot */}
      {isHomePage && (
        <div
          className="absolute top-0 left-0 h-1 bg-[var(--chart-secondary)]"
          style={{ width: progressWidth, opacity: progressWidth > 0 ? 1 : 0 }}
        />
      )}
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-serif text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-orange)] transition-colors"
          >
            Untangling Alzheimer&apos;s
          </Link>
          <div ref={navRef} className="relative flex items-center gap-1">
            {isHomePage && (
              <>
                {/* Indicator dot */}
                <div
                  className="absolute top-0 h-1.5 w-1.5 rounded-full bg-[var(--accent-orange)]"
                  style={{ left: indicatorStyle.left, opacity: indicatorStyle.opacity }}
                />

                {/* Navigation items */}
                {acts.map((act, actIndex) => (
                  <div key={act.label} className="flex items-center">
                    {/* Separator between acts */}
                    {actIndex > 0 && (
                      <div className="w-px h-4 bg-[var(--border)] mx-3 hidden sm:block" />
                    )}

                    {/* Act label - clickable */}
                    <button
                      onClick={() => scrollToAct(actIndex)}
                      aria-label={`Navigate to Act ${act.label}`}
                      aria-current={activeActIndex === actIndex ? 'true' : undefined}
                      className={`hidden sm:block px-2 py-1 text-xs font-semibold transition-colors ${
                        activeActIndex === actIndex
                          ? 'text-[var(--accent-orange)]'
                          : 'text-[var(--text-muted)] hover:text-[var(--accent-orange)]'
                      }`}
                    >
                      {act.label}
                    </button>

                    {/* Sections in this act */}
                    {act.sections.map((section) => (
                      <button
                        key={section.id}
                        ref={(el) => setButtonRef(section.id, el)}
                        onClick={() => scrollToSection(section.id)}
                        aria-current={activeSection === section.id ? 'true' : undefined}
                        aria-label={`Navigate to ${section.label} section`}
                        className={`px-2 sm:px-3 py-2 text-sm font-medium transition-colors ${
                          activeSection === section.id
                            ? 'text-[var(--accent-orange)]'
                            : 'text-[var(--text-muted)] hover:text-[var(--accent-orange)]'
                        }`}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                ))}
              </>
            )}
            {!isHomePage && (
              <Link
                href="/"
                className="px-2 sm:px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent-orange)] transition-colors"
              >
                ← Back to Main
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </motion.header>
  );
}
