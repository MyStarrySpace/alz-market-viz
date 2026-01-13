# Untangling Alzheimer's

## Project Overview
**The science, the system, and the search for a cure.**

An interactive exploration of Alzheimer's research that maps structural barriers preventing cures, visualizes competing theories in a network, and highlights promising future treatments. Includes the 9-stage mechanistic cascade and evidence hierarchy for evaluating causal claims.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main scrollytelling page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Heading.tsx
│   │   ├── Section.tsx
│   │   └── index.ts
│   ├── sections/           # Page sections (scrollytelling acts)
│   │   ├── Hero.tsx
│   │   ├── InvestmentWaterfall.tsx
│   │   ├── EvidenceGraveyard.tsx
│   │   ├── SidelinedResearchers.tsx
│   │   ├── FailureCascade.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── EvidenceHierarchy.tsx
│   │   ├── MechanisticCascade.tsx
│   │   ├── Stakes.tsx
│   │   └── index.ts
│   └── layout/             # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── ScrollProgress.tsx
│       └── index.ts
├── data/                   # Data structures and constants
│   ├── drugs.ts            # Drug comparison data
│   ├── failures.ts         # Market failure definitions
│   ├── caseStudies.ts      # Case study narratives + Lesne scandal
│   ├── researchers.ts      # Sidelined researchers, cascade, evidence hierarchy
│   └── index.ts
├── hooks/                  # Custom React hooks
│   ├── useScrollProgress.ts
│   └── index.ts
├── lib/                    # Utilities and helpers
│   ├── utils.ts
│   └── cn.ts               # className utility
└── types/                  # TypeScript type definitions
    └── index.ts
```

## Page Structure (Narrative Flow)

### Act I: The Paradox
- **Hero**: Introduction with key statistics (55M patients, 99% trial failure rate)
- **InvestmentWaterfall**: $50B vs $50M investment disparity visualization

### Act II: The System
- **EvidenceGraveyard**: Tombstone cards for abandoned generic drug research
- **SidelinedResearchers**: Researchers marginalized for challenging amyloid primacy
- **FailureCascade**: 7 interconnected market failures flow diagram
- **CaseStudies**: Interactive case studies (Lithium, GV-971, TNF inhibitors, Nebivolol, Lesne Scandal)

### Act III: The Science
- **EvidenceHierarchy**: 5-star ranking system for causal evidence
- **MechanisticCascade**: 9-stage causal cascade showing why amyloid is downstream

### Act IV: The Stakes
- **Stakes**: Human cost statistics and alternative timeline comparison

## Design System

### Color Palette
```css
/* Primary - Deep blue for trust and seriousness */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-900: #1e3a8a;

/* Accent - Amber for warnings and highlights */
--accent-50: #fffbeb;
--accent-500: #f59e0b;
--accent-600: #d97706;

/* Semantic Colors */
--success: #10b981;     /* Generic drugs, positive outcomes, upstream stages */
--danger: #ef4444;      /* Failed trials, market failures, Stage 8 (current target) */
--warning: #f59e0b;     /* Caution, underfunded */
--neutral: #6b7280;     /* Secondary information */

/* Background */
--bg-dark: #0f172a;     /* Slate 900 - main background */
--bg-card: #1e293b;     /* Slate 800 - card backgrounds */
--bg-highlight: #334155; /* Slate 700 - hover states */
```

### Typography
- **Headings**: Geist Sans, bold weights
- **Body**: Geist Sans, regular weight
- **Data/Numbers**: Geist Mono for numerical emphasis
- **Scale**: Use Tailwind's default type scale (text-sm through text-6xl)

### Animation Guidelines
- Use Framer Motion for all animations
- Standard easing: `[0.4, 0, 0.2, 1]` (ease-out)
- Section transitions: 0.6s duration
- Micro-interactions: 0.2-0.3s duration
- Scroll-triggered animations should use `whileInView`
- Stagger children animations with 0.1s delay

### Component Patterns

#### Cards
```tsx
<Card variant="default | highlighted | warning | success | danger">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>
```

#### Sections
```tsx
<Section id="unique-id" className="min-h-screen">
  <Container>
    <SectionHeader title="..." subtitle="..." />
    {/* Content */}
  </Container>
</Section>
```

#### Animated Elements
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {/* Content */}
</motion.div>
```

## Data Conventions

### Drug Data Structure
```typescript
interface Drug {
  id: string;
  name: string;
  type: 'patented' | 'generic' | 'supplement' | 'biosimilar';
  investment: number;        // in millions USD
  annualCost: number;        // patient cost per year
  fdaStatus: 'approved' | 'pending' | 'no-pathway';
  evidenceStrength: 1 | 2 | 3 | 4 | 5;
  outcome: string;
  mechanism: string;
  keyStudyYear: number;
  keyEvidence?: string;
}
```

### Sidelined Researcher Structure
```typescript
interface SidelinedResearcher {
  id: string;
  name: string;
  institution: string;
  hypothesis: string;
  year: number;
  keyFinding: string;
  cascadeStage: number;      // 1-9
  stageName: string;
}
```

### Cascade Stage Structure
```typescript
interface CascadeStage {
  stage: number;
  title: string;
  shortTitle: string;
  description: string;
  mechanisms: string[];
  evidenceLevel: string;
  researchers?: string[];
  drugs?: { name: string; effect: string }[];
}
```

### Evidence Hierarchy
```typescript
interface EvidenceLevel {
  stars: number;             // 1-5
  type: string;
  description: string;
  examples: string[];
}
```

## Key Visualizations

1. **Investment Waterfall**: Proportional bars showing $50B vs $50M disparity (1000:1 ratio)
2. **Evidence Graveyard**: Grid of "tombstone" cards for abandoned research
3. **Sidelined Researchers**: Cards showing marginalized scientists and their hypotheses
4. **Failure Cascade**: 7-node flow diagram of interconnected market failures
5. **Case Studies**: Interactive tabbed interface with 5 case studies including Lesne scandal
6. **Evidence Hierarchy**: 6-level star rating system for causal evidence types
7. **Mechanistic Cascade**: 9-stage expandable cascade showing disease progression
8. **Drug Efficacy Table**: Comparison of drugs by target stage and efficacy

## Coding Standards

### Imports Order
1. React/Next.js
2. Third-party libraries (framer-motion, lucide-react)
3. Local components (@/components/*)
4. Data/Types (@/data/*, @/types/*)
5. Utilities (@/lib/*)
6. Styles

### Component Structure
```tsx
'use client'; // Only if needed

import { motion } from 'framer-motion';
import { IconName } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ComponentProps {
  // Props interface
}

export function Component({ ...props }: ComponentProps) {
  // Hooks
  // Handlers
  // Render
  return (
    // JSX
  );
}
```

### Naming Conventions
- Components: PascalCase (`MechanisticCascade.tsx`)
- Hooks: camelCase with `use` prefix (`useScrollProgress.ts`)
- Data files: camelCase (`caseStudies.ts`)
- Types: PascalCase (`CascadeStage`)
- CSS classes: Use Tailwind utilities, avoid custom CSS

## Accessibility
- All interactive elements must be keyboard accessible
- Use semantic HTML (section, article, nav, etc.)
- Provide alt text for visualizations
- Ensure color contrast meets WCAG AA standards
- Animations should respect `prefers-reduced-motion`

## Performance
- Use Next.js Image component for images
- Lazy load below-fold sections
- Use `viewport={{ once: true }}` for scroll animations
- Keep bundle size minimal - import icons individually
