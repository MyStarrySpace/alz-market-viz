'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  ArrowDown,
  User,
  Building2,
  Expand,
} from 'lucide-react';
import { Container, Section, SectionHeader, TextWithAbbreviations } from '@/components/ui';
import { getTimelineEras, TimelineEvent, FrameworkId } from '@/data';

// Default collapsed height (approximately one viewport)
const COLLAPSED_HEIGHT = 600;

// Framework display info with explicit Tailwind classes (for JIT compilation)
const frameworkInfo: Record<string, { label: string; borderColor: string; bgHover: string; dot: string; textColor: string }> = {
  amyloid: {
    label: 'Amyloid',
    borderColor: 'border-l-[var(--category-amyloid)]',
    bgHover: 'hover:bg-blue-50',
    dot: 'bg-[var(--category-amyloid)]',
    textColor: 'text-blue-600',
  },
  cholinergic: {
    label: 'Cholinergic',
    borderColor: 'border-l-[#10b981]', // emerald-500
    bgHover: 'hover:bg-emerald-50',
    dot: 'bg-[#10b981]',
    textColor: 'text-emerald-600',
  },
  tau: {
    label: 'Tau',
    borderColor: 'border-l-[#f59e0b]', // amber-500
    bgHover: 'hover:bg-amber-50',
    dot: 'bg-[#f59e0b]',
    textColor: 'text-amber-600',
  },
  vascular: {
    label: 'Vascular',
    borderColor: 'border-l-[var(--category-vascular)]',
    bgHover: 'hover:bg-purple-50',
    dot: 'bg-[var(--category-vascular)]',
    textColor: 'text-purple-600',
  },
  metabolic: {
    label: 'Metabolic',
    borderColor: 'border-l-[var(--category-metabolic)]',
    bgHover: 'hover:bg-orange-50',
    dot: 'bg-[var(--category-metabolic)]',
    textColor: 'text-orange-600',
  },
  mitochondrial: {
    label: 'Mitochondrial',
    borderColor: 'border-l-[var(--category-mitochondrial)]',
    bgHover: 'hover:bg-cyan-50',
    dot: 'bg-[var(--category-mitochondrial)]',
    textColor: 'text-cyan-600',
  },
  lysosomal: {
    label: 'Lysosomal',
    borderColor: 'border-l-[var(--category-lysosomal)]',
    bgHover: 'hover:bg-emerald-50',
    dot: 'bg-[var(--category-lysosomal)]',
    textColor: 'text-emerald-600',
  },
  infection: {
    label: 'Infection',
    borderColor: 'border-l-[#ef4444]', // red-500
    bgHover: 'hover:bg-red-50',
    dot: 'bg-[#ef4444]',
    textColor: 'text-red-600',
  },
  neuroinflammation: {
    label: 'Neuroinflammation',
    borderColor: 'border-l-[#ec4899]', // pink-500
    bgHover: 'hover:bg-pink-50',
    dot: 'bg-[#ec4899]',
    textColor: 'text-pink-600',
  },
  myelin: {
    label: 'Myelin',
    borderColor: 'border-l-[var(--category-myelin)]',
    bgHover: 'hover:bg-pink-50',
    dot: 'bg-[var(--category-myelin)]',
    textColor: 'text-pink-600',
  },
  null: {
    label: 'General',
    borderColor: 'border-l-[var(--text-muted)]',
    bgHover: 'hover:bg-gray-50',
    dot: 'bg-[var(--text-muted)]',
    textColor: 'text-[var(--text-muted)]',
  },
};

// Get framework info, defaulting to null for general events
function getFrameworkInfo(framework: FrameworkId) {
  return frameworkInfo[framework || 'null'];
}

// Event card component
function EventCard({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const info = getFrameworkInfo(event.framework);
  const hasResearcher = !!event.researcher;

  return (
    <motion.div
      className="mb-3 flex gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-50px' }}
      data-year={event.year}
    >
      {/* Year - outside the card for better alignment */}
      <div className="flex-shrink-0 w-14 text-right pt-4">
        <span className="text-lg font-serif font-bold text-[var(--text-primary)]">
          {event.year}
        </span>
      </div>

      {/* Event card */}
      <div
        className={`flex-1 border border-l-4 ${info.borderColor} p-4 cursor-pointer transition-all ${info.bgHover}
          ${hasResearcher
            ? 'bg-gradient-to-r from-amber-50 to-white border-amber-200 shadow-md ring-1 ring-amber-100'
            : 'bg-white border-[var(--border)]'}`}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Title row with expand button */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-[var(--text-primary)] font-semibold text-sm leading-snug">
            <TextWithAbbreviations text={event.title} />
          </h4>
          {event.expandedDescription && (
            <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] flex-shrink-0 mt-0.5">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          {expanded && event.expandedDescription ? (
            <motion.p
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-[var(--text-body)] text-sm leading-relaxed"
            >
              <TextWithAbbreviations text={event.expandedDescription} />
            </motion.p>
          ) : (
            <motion.p
              key="short"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[var(--text-muted)] text-sm leading-relaxed"
            >
              <TextWithAbbreviations text={event.description} />
            </motion.p>
          )}
        </AnimatePresence>

        {/* Researcher callout - inline with content */}
        {hasResearcher && (
          <div className="mt-3 pt-3 border-t border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {event.researcher!.name}
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{event.researcher!.institution}</span>
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full whitespace-nowrap">
                    {event.researcher!.hypothesis}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Era section component
function EraSection({
  era,
  eraIndex,
}: {
  era: ReturnType<typeof getTimelineEras>[0];
  eraIndex: number;
}) {
  const [isCollapsed, setIsCollapsed] = useState(eraIndex > 1);

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Era header */}
      <button
        className="w-full flex items-center justify-between gap-4 mb-6 group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent w-12" />
          <div className="text-left">
            <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-orange)] transition-colors font-serif">
              {era.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              {era.startYear}–{era.endYear}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-muted)]">
            {era.events.length} events
          </span>
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
          ) : (
            <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
          )}
        </div>
      </button>

      {/* Era description */}
      <motion.p
        className="text-[var(--text-muted)] mb-6 max-w-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <TextWithAbbreviations text={era.description} />
      </motion.p>

      {/* Events */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-0"
          >
            {era.events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HistoricalTimeline() {
  const eras = getTimelineEras();
  const [activeFilter, setActiveFilter] = useState<FrameworkId | 'all'>('all');
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isYearPickerSticky, setIsYearPickerSticky] = useState(false);
  const [isYearPickerAtBottom, setIsYearPickerAtBottom] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const yearPickerRef = useRef<HTMLDivElement>(null);
  const yearPickerContentRef = useRef<HTMLDivElement>(null);
  const storedScrollPosition = useRef<number | null>(null);

  // Extract all unique years from events for year picker
  const allYears = useMemo(() => {
    const years = new Set<number>();
    eras.forEach(era => {
      era.events.forEach(event => years.add(event.year));
    });
    return Array.from(years).sort((a, b) => a - b);
  }, [eras]);

  // Group years by decade for the picker
  const yearsByDecade = useMemo(() => {
    const decades: Record<string, number[]> = {};
    allYears.forEach(year => {
      const decade = Math.floor(year / 10) * 10;
      const key = `${decade}s`;
      if (!decades[key]) decades[key] = [];
      decades[key].push(year);
    });
    return decades;
  }, [allYears]);

  // Handle sticky filter bar and year picker
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current || !sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const filterRect = filterRef.current.getBoundingClientRect();

      const shouldStick = sectionRect.top < 80 && sectionRect.bottom > filterRect.height + 100;
      setIsFilterSticky(shouldStick);

      // Year picker sticky logic (only when expanded)
      if (isExpanded && timelineRef.current && yearPickerRef.current && yearPickerContentRef.current) {
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const yearPickerContentHeight = yearPickerContentRef.current.offsetHeight;
        const stickyTop = 128; // top-32 = 8rem = 128px
        const bottomPadding = 48; // Extra padding at bottom

        // Calculate if we've scrolled past the start (should start sticking)
        const pastStart = timelineRect.top < stickyTop;

        // Calculate if the year picker would overflow past the timeline bottom
        const yearPickerBottomIfSticky = stickyTop + yearPickerContentHeight + bottomPadding;
        const wouldOverflow = timelineRect.bottom < yearPickerBottomIfSticky;

        if (!pastStart) {
          // Haven't scrolled to sticky zone yet - relative positioning
          setIsYearPickerSticky(false);
          setIsYearPickerAtBottom(false);
        } else if (wouldOverflow) {
          // Would overflow - pin to bottom
          setIsYearPickerSticky(false);
          setIsYearPickerAtBottom(true);
        } else {
          // In the sticky zone
          setIsYearPickerSticky(true);
          setIsYearPickerAtBottom(false);
        }
      } else {
        setIsYearPickerSticky(false);
        setIsYearPickerAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  // Skip to next section
  const skipToNextSection = () => {
    const nextSection = document.getElementById('trial-barriers');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to a specific year (or nearest visible year before it)
  const scrollToYear = (year: number) => {
    // First try to find the exact year
    let yearElement = document.querySelector(`[data-year="${year}"]`);

    // If not found (filtered out), find the nearest visible year before it
    if (!yearElement) {
      const allVisibleYearElements = Array.from(document.querySelectorAll('[data-year]'));
      const visibleYears = allVisibleYearElements
        .map(el => parseInt(el.getAttribute('data-year') || '0', 10))
        .filter(y => y > 0);

      // Find years before or equal to the selected year
      const yearsBefore = visibleYears.filter(y => y <= year).sort((a, b) => b - a);

      if (yearsBefore.length > 0) {
        // Scroll to the nearest year before the selected one
        yearElement = document.querySelector(`[data-year="${yearsBefore[0]}"]`);
      } else if (visibleYears.length > 0) {
        // If no years before, scroll to the first visible year (earliest)
        const sortedYears = visibleYears.sort((a, b) => a - b);
        yearElement = document.querySelector(`[data-year="${sortedYears[0]}"]`);
      }
    }

    if (yearElement) {
      const offset = 160; // Account for sticky headers with padding
      const elementPosition = yearElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  // Toggle expand/collapse
  const toggleExpand = () => {
    if (isExpanded) {
      // Collapsing: scroll back to top of timeline
      if (timelineRef.current) {
        const offset = 100;
        const elementPosition = timelineRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    }
    setIsExpanded(!isExpanded);
  };

  // Handle filter change with scroll position management
  const handleFilterChange = (newFilter: FrameworkId | 'all') => {
    if (newFilter === activeFilter) return;

    if (newFilter !== 'all' && activeFilter === 'all') {
      // Turning on a filter: store current position and scroll to top of timeline
      storedScrollPosition.current = window.scrollY;
      setActiveFilter(newFilter);
      // Wait for state update then scroll to timeline
      setTimeout(() => {
        if (timelineRef.current) {
          const offset = 100; // Account for sticky header
          const elementPosition = timelineRef.current.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        }
      }, 50);
    } else if (newFilter === 'all' && activeFilter !== 'all') {
      // Turning off filter: restore stored position
      setActiveFilter(newFilter);
      if (storedScrollPosition.current !== null) {
        setTimeout(() => {
          window.scrollTo({ top: storedScrollPosition.current!, behavior: 'smooth' });
          storedScrollPosition.current = null;
        }, 50);
      }
    } else {
      // Switching between filters: scroll to top of timeline
      setActiveFilter(newFilter);
      setTimeout(() => {
        if (timelineRef.current) {
          const offset = 100;
          const elementPosition = timelineRef.current.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  // Filter events based on selected framework
  const filterEvents = (events: TimelineEvent[]) => {
    if (activeFilter === 'all') return events;
    return events.filter(e => e.framework === activeFilter);
  };

  // Get filtered eras
  const filteredEras = eras
    .map(era => ({
      ...era,
      events: filterEvents(era.events),
    }))
    .filter(era => era.events.length > 0);

  // Count events by framework
  const allEvents = eras.flatMap(era => era.events);
  const frameworkCounts: Record<string, number> = {};
  Object.keys(frameworkInfo).forEach(fw => {
    if (fw === 'null') {
      frameworkCounts['general'] = allEvents.filter(e => e.framework === null).length;
    } else {
      frameworkCounts[fw] = allEvents.filter(e => e.framework === fw).length;
    }
  });

  // Get frameworks that have events
  const activeFrameworks = Object.keys(frameworkInfo).filter(
    fw => fw !== 'null' && frameworkCounts[fw] && frameworkCounts[fw] > 0
  );

  return (
    <Section id="timeline" className="bg-[var(--bg-secondary)]" ref={sectionRef}>
      <Container>
        <SectionHeader
          title="A Century of Search"
          subtitle="From the first case in 1906 to today's controversies: the long road that led us here."
        />

        {/* Sticky Filter Bar */}
        <div
          ref={filterRef}
          className={`
            ${isFilterSticky
              ? 'fixed top-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[var(--border)] py-2 shadow-sm'
              : 'relative mb-8'
            }
            transition-all duration-200
          `}
        >
          <div className={isFilterSticky ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}>
            <div className="flex items-center justify-between gap-4">
              {/* Section label */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Timeline
                </span>
                <span className="text-[var(--border)]">|</span>
              </div>

              {/* Filter controls */}
              <div className="flex-1 overflow-x-auto">
                <div className="flex items-center gap-1 min-w-max">
                  {/* All toggle */}
                  <button
                    onClick={() => handleFilterChange('all')}
                    className={`
                      px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded
                      ${activeFilter === 'all'
                        ? 'bg-[var(--text-primary)] text-white'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                      }
                    `}
                  >
                    All
                  </button>

                  <span className="text-[var(--border)] mx-1">·</span>

                  {/* Framework toggles */}
                  {activeFrameworks.map(framework => {
                    const info = frameworkInfo[framework];
                    const isActive = activeFilter === framework;
                    return (
                      <button
                        key={framework}
                        onClick={() => handleFilterChange(framework as FrameworkId)}
                        className={`
                          flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium
                          transition-all duration-200 rounded border
                          ${isActive
                            ? `bg-white ${info.textColor} border-current`
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border-transparent hover:bg-[var(--bg-secondary)]'
                          }
                        `}
                      >
                        <span className={`w-2 h-2 rounded-full ${info.dot}`} />
                        <span className="hidden sm:inline">{info.label}</span>
                        <span className="text-xs opacity-60">
                          {frameworkCounts[framework]}
                        </span>
                      </button>
                    );
                  })}

                  {/* General events toggle */}
                  {frameworkCounts['general'] > 0 && (
                    <>
                      <span className="text-[var(--border)] mx-1">·</span>
                      <button
                        onClick={() => handleFilterChange(null)}
                        className={`
                          flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium
                          transition-all duration-200 rounded border
                          ${activeFilter === null
                            ? 'bg-white text-[var(--text-primary)] border-[var(--text-muted)]'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border-transparent hover:bg-[var(--bg-secondary)]'
                          }
                        `}
                      >
                        <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]" />
                        <span className="hidden sm:inline">General</span>
                        <span className="text-xs opacity-60">
                          {frameworkCounts['general']}
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Skip/Collapse button */}
              <button
                onClick={() => {
                  if (isExpanded) {
                    // If expanded, collapse and skip
                    setIsExpanded(false);
                    skipToNextSection();
                  } else {
                    // If collapsed, just skip
                    skipToNextSection();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[var(--text-muted)]
                  hover:text-[var(--accent-orange)] hover:bg-[var(--bg-secondary)] rounded transition-all duration-200
                  whitespace-nowrap shrink-0"
              >
                <span className="hidden sm:inline">Skip</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Spacer when filter is sticky */}
        {isFilterSticky && <div className="h-12" />}

        {/* Timeline with year picker layout */}
        <div className="relative flex justify-center gap-8" ref={timelineRef}>
          {/* Main timeline content - full width and centered when collapsed, shrinks when expanded */}
          <motion.div
            layout
            className="relative w-full"
            style={{ maxWidth: isExpanded ? '100%' : '900px' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Collapsed container with fade */}
            <div
              className={`relative transition-all duration-500 ${
                !isExpanded ? 'overflow-hidden' : ''
              }`}
              style={!isExpanded ? { maxHeight: COLLAPSED_HEIGHT } : undefined}
            >
              {/* Eras */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter === 'all' ? 'all' : activeFilter || 'general'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {filteredEras.length > 0 ? (
                    filteredEras.map((era, index) => (
                      <EraSection key={era.id} era={era} eraIndex={index} />
                    ))
                  ) : (
                    <div className="text-center py-12 text-[var(--text-muted)]">
                      No events match this filter.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Fade overlay when collapsed */}
              {!isExpanded && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent, var(--bg-secondary))',
                  }}
                />
              )}
            </div>

            {/* Expand button (only shown when collapsed) */}
            {!isExpanded && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={toggleExpand}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-[var(--border)]
                    rounded-full shadow-sm hover:shadow-md hover:border-[var(--accent-orange)]
                    text-[var(--text-body)] hover:text-[var(--accent-orange)] transition-all duration-200"
                >
                  <Expand className="w-4 h-4" />
                  <span>Expand Full Timeline</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* Year picker sidebar - desktop only, animates in from right */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                ref={yearPickerRef}
                className="hidden lg:block shrink-0 relative"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 96, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <div
                  ref={yearPickerContentRef}
                  className={`w-24 ${
                    isYearPickerSticky
                      ? 'fixed top-32 pt-4'
                      : isYearPickerAtBottom
                        ? 'absolute bottom-0'
                        : 'relative'
                  } transition-all duration-200`}
                >
                  <div className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-3">
                    Jump to Year
                  </div>
                  <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin">
                    {Object.entries(yearsByDecade).map(([decade, years]) => (
                      <div key={decade}>
                        <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">
                          {decade}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {years.map(year => (
                            <button
                              key={year}
                              onClick={() => scrollToYear(year)}
                              className="text-xs px-1.5 py-0.5 rounded hover:bg-[var(--accent-orange-light)]
                                hover:text-[var(--accent-orange)] text-[var(--text-muted)] transition-colors"
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
