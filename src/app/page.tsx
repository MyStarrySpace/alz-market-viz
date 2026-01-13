'use client';

import { ScrollProgress, Header, Footer } from '@/components/layout';
import {
  Hero,
  InvestmentWaterfall,
  EvidenceGraveyard,
  SidelinedResearchers,
  FailureCascade,
  CaseStudies,
  MechanisticCascade,
  Stakes,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="relative">
        {/* Act I: The Paradox */}
        <Hero />
        <InvestmentWaterfall />

        {/* Act II: The System */}
        <EvidenceGraveyard />
        <SidelinedResearchers />
        <FailureCascade />
        <CaseStudies />

        {/* Act III: The Science */}
        <MechanisticCascade />

        {/* Act IV: The Stakes */}
        <Stakes />
      </main>
      <Footer />
    </>
  );
}
