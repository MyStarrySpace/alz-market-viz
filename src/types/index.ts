import type { LucideIcon } from 'lucide-react';

export interface Drug {
  id: string;
  name: string;
  type: 'patented' | 'generic' | 'supplement' | 'biosimilar';
  investment: number; // in millions USD
  annualCost: number; // patient cost per year
  fdaStatus: 'approved' | 'pending' | 'no-pathway';
  evidenceStrength: 1 | 2 | 3 | 4 | 5;
  outcome: string;
  mechanism: string;
  keyStudyYear: number;
  keyEvidence?: string;
}

export interface MarketFailure {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  impact: string;
  connections: string[]; // IDs of related failures
  icon: LucideIcon;
  order: number;
  citationIds?: string[]; // References to bibliography citations
}

export interface CaseStudy {
  id: string;
  title: string;
  drug: string;
  summary: string;
  year: number;
  keyFinding: string;
  whatShouldHappen: string;
  whatActuallyHappened: string;
  quote?: string;
  quoteSource?: string;
  cost: string;
  patentStatus: 'patented' | 'generic' | 'supplement' | 'biosimilar' | 'device' | 'unavailable';
}

export interface ComparisonRow {
  category: string;
  patented: string;
  generic: string;
  delta?: string;
  sourceId?: string;
  keyFinding?: string; // The specific quote from the source that supports this row
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: 'discovery' | 'trial' | 'failure' | 'approval' | 'funding';
  drug?: string;
}

// ============================================================================
// TRANSLATIONAL FAILURES / ANIMAL MODELS
// ============================================================================

export type OrganismType =
  | 'transgenic_mouse'
  | 'knockin_mouse'
  | 'rat'
  | 'dog'
  | 'degu'
  | 'non_human_primate'
  | 'simple_organism';

export type PathologyFeature =
  | 'amyloid_plaques'
  | 'tau_tangles'
  | 'neuronal_loss'
  | 'synaptic_dysfunction'
  | 'neuroinflammation'
  | 'cognitive_decline'
  | 'natural_aging'
  | 'bbb_dysfunction'
  | 'cholinergic_deficit';

export interface PathologyPresence {
  feature: PathologyFeature;
  present: boolean | 'partial';
  notes?: string;
  humanRelevance: 'high' | 'moderate' | 'low' | 'debated';
}

export interface FailedTranslation {
  drugName: string;
  modelResult: string;
  humanResult: string;
  trialName?: string;
  year: number;
}

export interface AnimalModel {
  id: string;
  name: string;
  commonName: string;
  organismType: OrganismType;
  species: string;
  yearDeveloped?: number;
  geneticBasis: string;
  primaryUseCase: string;
  pathologyFeatures: PathologyPresence[];
  strengths: string[];
  limitations: string[];
  failedTranslations: FailedTranslation[];
  keyInsight?: {
    title: string;
    description: string;
    implication: string;
  };
  citationIds?: string[];
}

export interface TranslationalInsight {
  id: string;
  title: string;
  description: string;
  implication: string;
}
