'use client';

import { ScrollProgress, Header, Footer } from '@/components/layout';
import { ChapterBreak, SectionDivider } from '@/components/ui';
import {
  Hero,
  InvestmentWaterfall,
  HistoricalTimeline,
  TrialBarriers,
  PromisingFrontier,
  FailureCascade,
  CaseStudies,
  HopefulDevelopments,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="relative mt-14 lg:mt-0">
        {/* Act I: The Paradox */}
        <Hero />
        <SectionDivider variant="tick" />
        <InvestmentWaterfall />
        <SectionDivider variant="tick" />
        <HistoricalTimeline />
        <SectionDivider variant="tick" />
        <TrialBarriers />

        {/* Transition to Act II */}
        <ChapterBreak label="Act II" variant="warm">
          Here&apos;s the system that prevents cures.
        </ChapterBreak>

        {/* Act II: The System */}
        <FailureCascade />
        <SectionDivider variant="tick" />
        <CaseStudies />

        {/* Transition to Act III */}
        <ChapterBreak label="Act III" variant="teal">
          But there are reasons for hope.
        </ChapterBreak>

        {/* Act III: Reasons for Hope */}
        <HopefulDevelopments />
        <SectionDivider variant="tick" />
        <PromisingFrontier />
      </main>
      <Footer />
    </>
  );
}
