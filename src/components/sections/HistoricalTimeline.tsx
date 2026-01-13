'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  FlaskConical,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  ArrowDown,
} from 'lucide-react';
import { Container, Section, SectionHeader } from '@/components/ui';
import { getTimelineEras, TimelineEvent, TimelineEventType, FrameworkId } from '@/data';

// Framework colors
const frameworkColors: Record<string, string> = {
  amyloid: 'blue',
  vascular: 'purple',
  metabolic: 'orange',
  mitochondrial: 'yellow',
  lysosomal: 'emerald',
  myelin: 'pink',
  null: 'slate',
};

// Event type icons
function getEventIcon(type: TimelineEventType) {
  switch (type) {
    case 'discovery':
      return <Lightbulb className="w-4 h-4" />;
    case 'hypothesis':
      return <FlaskConical className="w-4 h-4" />;
    case 'milestone':
      return <CheckCircle className="w-4 h-4" />;
    case 'failure':
      return <TrendingDown className="w-4 h-4" />;
    case 'scandal':
      return <AlertTriangle className="w-4 h-4" />;
    case 'approval':
      return <CheckCircle className="w-4 h-4" />;
    case 'rejection':
      return <XCircle className="w-4 h-4" />;
    default:
      return <Lightbulb className="w-4 h-4" />;
  }
}

// Get color classes based on framework
function getFrameworkColorClasses(framework: FrameworkId) {
  const color = frameworkColors[framework || 'null'];
  return {
    bg: `bg-${color}-500/20`,
    border: `border-${color}-500/50`,
    text: `text-${color}-400`,
    dot: `bg-${color}-500`,
  };
}

// Event card component
function EventCard({
  event,
  index,
  isLeft,
}: {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const colors = getFrameworkColorClasses(event.framework);

  return (
    <motion.div
      className={`flex items-start gap-4 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Timeline dot */}
      <div className="hidden md:flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full ${colors.dot} ring-4 ring-slate-900`}
        />
        <div className="w-0.5 h-full bg-slate-700 min-h-[80px]" />
      </div>

      {/* Event card */}
      <div
        className={`flex-1 p-4 rounded-lg border ${colors.border} ${colors.bg}
          cursor-pointer hover:border-opacity-100 transition-colors max-w-xl`}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className={colors.text}>{getEventIcon(event.type)}</span>
            <span className="text-slate-400 text-sm font-mono">{event.year}</span>
          </div>
          {event.dramaticDescription && (
            <button className="text-slate-500 hover:text-slate-300">
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Title */}
        <h4 className="text-white font-semibold mb-2">{event.title}</h4>

        {/* Description */}
        <AnimatePresence mode="wait">
          {expanded && event.dramaticDescription ? (
            <motion.p
              key="dramatic"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-slate-300 text-sm leading-relaxed italic"
            >
              {event.dramaticDescription}
            </motion.p>
          ) : (
            <motion.p
              key="short"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-400 text-sm"
            >
              {event.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Framework tag */}
        {event.framework && (
          <div className="mt-3">
            <span
              className={`text-xs px-2 py-1 rounded ${colors.bg} ${colors.text} capitalize`}
            >
              {event.framework} hypothesis
            </span>
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
  const [isCollapsed, setIsCollapsed] = useState(eraIndex > 1); // Collapse all but first two eras

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
          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent w-12" />
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {era.title}
            </h3>
            <p className="text-sm text-slate-500">
              {era.startYear}–{era.endYear}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {era.events.length} events
          </span>
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          )}
        </div>
      </button>

      {/* Era description */}
      <motion.p
        className="text-slate-400 mb-6 max-w-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        {era.description}
      </motion.p>

      {/* Events */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 md:space-y-0"
          >
            {era.events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Framework display info with explicit Tailwind classes (for JIT compilation)
const frameworkInfo: Record<string, { label: string; bgActive: string; textActive: string; borderActive: string; dot: string }> = {
  amyloid: {
    label: 'Amyloid',
    bgActive: 'bg-blue-500/20',
    textActive: 'text-blue-300',
    borderActive: 'border-blue-500/50',
    dot: 'bg-blue-500',
  },
  vascular: {
    label: 'Vascular',
    bgActive: 'bg-purple-500/20',
    textActive: 'text-purple-300',
    borderActive: 'border-purple-500/50',
    dot: 'bg-purple-500',
  },
  metabolic: {
    label: 'Metabolic',
    bgActive: 'bg-orange-500/20',
    textActive: 'text-orange-300',
    borderActive: 'border-orange-500/50',
    dot: 'bg-orange-500',
  },
  mitochondrial: {
    label: 'Mitochondrial',
    bgActive: 'bg-yellow-500/20',
    textActive: 'text-yellow-300',
    borderActive: 'border-yellow-500/50',
    dot: 'bg-yellow-500',
  },
  lysosomal: {
    label: 'Lysosomal',
    bgActive: 'bg-emerald-500/20',
    textActive: 'text-emerald-300',
    borderActive: 'border-emerald-500/50',
    dot: 'bg-emerald-500',
  },
  myelin: {
    label: 'Myelin',
    bgActive: 'bg-pink-500/20',
    textActive: 'text-pink-300',
    borderActive: 'border-pink-500/50',
    dot: 'bg-pink-500',
  },
};

export function HistoricalTimeline() {
  const eras = getTimelineEras();
  const [activeFilter, setActiveFilter] = useState<FrameworkId | 'all'>('all');
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current || !sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const filterRect = filterRef.current.getBoundingClientRect();

      // Stick when filter reaches top, unstick when section ends
      const shouldStick = sectionRect.top < 80 && sectionRect.bottom > filterRect.height + 100;
      setIsFilterSticky(shouldStick);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Skip to next section
  const skipToNextSection = () => {
    const nextSection = document.getElementById('trial-barriers');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter events based on selected framework
  const filterEvents = (events: TimelineEvent[]) => {
    if (activeFilter === 'all') return events;
    return events.filter(e => e.framework === activeFilter);
  };

  // Get filtered eras (only show eras with matching events)
  const filteredEras = eras
    .map(era => ({
      ...era,
      events: filterEvents(era.events),
    }))
    .filter(era => era.events.length > 0);

  // Count events by framework
  const allEvents = eras.flatMap(era => era.events);
  const frameworkCounts = Object.keys(frameworkColors).reduce((acc, fw) => {
    if (fw === 'null') {
      acc['general'] = allEvents.filter(e => e.framework === null).length;
    } else {
      acc[fw] = allEvents.filter(e => e.framework === fw).length;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get frameworks that have events
  const activeFrameworks = Object.keys(frameworkInfo).filter(
    fw => frameworkCounts[fw] && frameworkCounts[fw] > 0
  );

  return (
    <Section id="timeline" className="bg-slate-950/50" ref={sectionRef}>
      <Container>
        <SectionHeader
          title="A Century of Search"
          subtitle="From the first case in 1906 to today's controversies—the long road that led us here."
        />

        {/* Sticky Filter Bar */}
        <div
          ref={filterRef}
          className={`
            ${isFilterSticky
              ? 'fixed top-16 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 py-2'
              : 'relative mb-8'
            }
            transition-all duration-200
          `}
        >
          <div className={isFilterSticky ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}>
            <div className="flex items-center justify-between gap-4">
              {/* Section label */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Timeline
                </span>
                <span className="text-slate-700">|</span>
              </div>

              {/* Filter controls */}
              <div className="flex-1 overflow-x-auto">
                <div className="flex items-center gap-1 min-w-max">
                  {/* All toggle */}
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`
                      px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded
                      ${activeFilter === 'all'
                        ? 'bg-white/10 text-white'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                      }
                    `}
                  >
                    All
                  </button>

                  <span className="text-slate-700 mx-1">·</span>

                  {/* Framework toggles */}
                  {activeFrameworks.map(framework => {
                    const info = frameworkInfo[framework];
                    const isActive = activeFilter === framework;
                    return (
                      <button
                        key={framework}
                        onClick={() => setActiveFilter(framework as FrameworkId)}
                        className={`
                          flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium
                          transition-all duration-200 rounded
                          ${isActive
                            ? `${info.bgActive} ${info.textActive}`
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
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
                      <span className="text-slate-700 mx-1">·</span>
                      <button
                        onClick={() => setActiveFilter(null)}
                        className={`
                          flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium
                          transition-all duration-200 rounded
                          ${activeFilter === null
                            ? 'bg-slate-500/20 text-slate-300'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                          }
                        `}
                      >
                        <span className="w-2 h-2 rounded-full bg-slate-500" />
                        <span className="hidden sm:inline">General</span>
                        <span className="text-xs opacity-60">
                          {frameworkCounts['general']}
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Skip to next section button */}
              <button
                onClick={skipToNextSection}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-400
                  hover:text-white hover:bg-slate-800/50 rounded transition-all duration-200
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

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2" />

          {/* Eras */}
          <AnimatePresence mode="wait">
            {filteredEras.length > 0 ? (
              filteredEras.map((era, index) => (
                <EraSection key={era.id} era={era} eraIndex={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 text-slate-500"
              >
                No events match this filter.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary insight */}
        <motion.div
          className="mt-12 p-6 rounded-lg bg-amber-500/10 border border-amber-500/30 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-amber-400 text-lg">
            Over 100 years of research. Billions of dollars invested. And a
            hypothesis that dominated for 30 years despite mounting evidence it
            was incomplete.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
