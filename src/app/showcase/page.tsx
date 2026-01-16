'use client';

import { useState, useEffect } from 'react';
import {
  Download,
  ExternalLink,
  ArrowRight,
  Check,
  AlertCircle,
  Info,
} from 'lucide-react';
import { Container, Section, Card, CardContent, CardHeader, Button, Heading, DataCard } from '@/components/ui';
import { MenopauseComparison, AncestryRiskChart, FatDistributionChart, InterventionsTable, MechanisticNetworkGraph } from '@/components/sections';

// Section definitions for navigation
const sections = [
  { id: 'showcase-hero', label: 'Overview' },
  { id: 'typography', label: 'Typography' },
  { id: 'colors', label: 'Colors' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'cards', label: 'Cards' },
  { id: 'data-cards', label: 'Data Cards' },
  { id: 'badges', label: 'Badges' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'stats', label: 'Stats' },
  { id: 'tables', label: 'Tables' },
  { id: 'sex-ancestry-viz', label: 'Sex & Ancestry' },
  { id: 'network-graph', label: 'Network Graph' },
];

// Section navigation component
function SectionNav() {
  const [activeSection, setActiveSection] = useState('showcase-hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-14 z-40 bg-[var(--bg-primary)] border-b border-[var(--border)] py-2 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
                activeSection === id
                  ? 'text-[var(--accent-orange)] font-medium'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <SectionNav />
      {/* Add padding on mobile for the sticky nav */}
      <Section id="showcase-hero" className="pt-8 lg:pt-12 mt-14 lg:mt-0">
        <Container>
          <Heading as="h1" className="mb-4">Component Library</Heading>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl">
            A collection of reusable components for the Untangling Alzheimer&apos;s project.
          </p>
        </Container>
      </Section>

      {/* Typography */}
      <Section id="typography">
        <Container>
          <SectionTitle>Typography</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Examples */}
            <div className="lg:col-span-2">
              <Card variant="default" hover={false}>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-2">Heading 1 (Neuton)</p>
                    <Heading as="h1" animate={false}>Untangling Alzheimer&apos;s</Heading>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-2">Heading 2 (Neuton)</p>
                    <Heading as="h2" animate={false}>The Investment Paradox</Heading>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-2">Heading 3 (Neuton)</p>
                    <Heading as="h3" animate={false}>Case Studies in Market Failure</Heading>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[var(--text-muted)] mb-2">Body Text (Encode Sans)</p>
                      <p className="text-[var(--text-body)]">
                        Each of these researchers proposed that amyloid was a consequence—not a
                        cause—of upstream dysfunction.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-muted)] mb-2">Muted &amp; Accent</p>
                      <p className="text-[var(--text-muted)]">
                        Supporting info in gray. <span className="text-[var(--accent-orange)] font-semibold">Key terms in orange.</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Design rationale */}
            <div className="space-y-4">
              <DesignNote title="Why Neuton for headings?">
                Serif fonts convey authority and gravitas, appropriate for serious medical/scientific content. Neuton&apos;s moderate x-height ensures readability at large sizes.
              </DesignNote>
              <DesignNote title="Why Encode Sans for body?">
                Clean sans-serif provides excellent readability for longer passages. The neutral character doesn&apos;t compete with data visualizations.
              </DesignNote>
              <DesignNote title="Text hierarchy">
                Three-level gray scale (primary, body, muted) creates clear visual hierarchy without harsh contrast. Orange accent sparingly highlights key terms.
              </DesignNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* Colors */}
      <Section id="colors" className="bg-[var(--bg-secondary)]">
        <Container>
          <SectionTitle>Color Palette</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Color swatches */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-3 font-medium">Foundation</p>
                <div className="grid grid-cols-4 gap-3">
                  <ColorSwatch name="BG Primary" hex="#faf9f7" />
                  <ColorSwatch name="BG Secondary" hex="#f5f3f0" />
                  <ColorSwatch name="Text Primary" hex="#2d2d2d" dark />
                  <ColorSwatch name="Accent" hex="#e36216" dark />
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-3 font-medium">Semantic</p>
                <div className="grid grid-cols-4 gap-3">
                  <ColorSwatch name="Success" hex="#5a8a6e" dark />
                  <ColorSwatch name="Danger" hex="#c75146" dark />
                  <ColorSwatch name="Teal (increases)" hex="#007385" dark />
                  <ColorSwatch name="Red (decreases)" hex="#c75146" dark />
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-3 font-medium">Data Visualization</p>
                <div className="grid grid-cols-5 gap-3">
                  <ColorSwatch name="Primary" hex="#e36216" dark />
                  <ColorSwatch name="Teal" hex="#007385" dark />
                  <ColorSwatch name="Blue" hex="#486393" dark />
                  <ColorSwatch name="Warning" hex="#E5AF19" />
                  <ColorSwatch name="Pink" hex="#C3577F" dark />
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-3 font-medium">Module Colors (Network Graph)</p>
                <div className="grid grid-cols-6 gap-2">
                  <ColorSwatch name="M01" hex="#486393" dark compact />
                  <ColorSwatch name="M02" hex="#007385" dark compact />
                  <ColorSwatch name="M03" hex="#C9461D" dark compact />
                  <ColorSwatch name="M04" hex="#E5AF19" compact />
                  <ColorSwatch name="M05" hex="#C3577F" dark compact />
                  <ColorSwatch name="M06" hex="#60a5fa" dark compact />
                  <ColorSwatch name="M07" hex="#a78bfa" dark compact />
                  <ColorSwatch name="M08" hex="#34d399" dark compact />
                  <ColorSwatch name="M09" hex="#f472b6" dark compact />
                  <ColorSwatch name="M10" hex="#8ecae6" compact />
                  <ColorSwatch name="M11" hex="#fbbf24" compact />
                  <ColorSwatch name="M12" hex="#94a3b8" dark compact />
                </div>
              </div>
            </div>
            {/* Design rationale */}
            <div className="space-y-4">
              <DesignNote title="Warm neutrals">
                Off-white backgrounds (#faf9f7) feel warmer and less clinical than pure white. This warmth pairs well with the orange accent and creates a more approachable feel for difficult subject matter.
              </DesignNote>
              <DesignNote title="Orange as signature">
                #e36216 is used sparingly for CTAs, highlights, and key data points. It provides energy without overwhelming the scientific content.
              </DesignNote>
              <DesignNote title="Edge semantics">
                Teal (#007385) = increases/activates. Red (#c75146) = decreases/inhibits. This matches common biological pathway conventions.
              </DesignNote>
              <DesignNote title="Module differentiation">
                Each module in the network graph has a distinct hue. Colors were chosen to be distinguishable even for colorblind users (avoiding red-green only distinctions).
              </DesignNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section id="buttons">
        <Container>
          <SectionTitle>Buttons</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card variant="default" hover={false}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-[var(--text-muted)] mb-3">Primary</p>
                      <div className="flex flex-col gap-2">
                        <Button variant="primary">Primary Action</Button>
                        <Button variant="primary" disabled>Disabled</Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-muted)] mb-3">Secondary</p>
                      <div className="flex flex-col gap-2">
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="secondary" disabled>Disabled</Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-muted)] mb-3">Ghost</p>
                      <div className="flex flex-col gap-2">
                        <Button variant="ghost">Ghost Action</Button>
                        <Button variant="ghost" disabled>Disabled</Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-3">With Icons</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="secondary" size="sm">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Source
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-3">Sizes</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="primary" size="sm">Small</Button>
                      <Button variant="primary" size="md">Medium</Button>
                      <Button variant="primary" size="lg">Large</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <DesignNote title="Clean, minimal style">
                All buttons use white backgrounds with subtle borders and shadows. On hover, the border and text turn orange for clear feedback.
              </DesignNote>
              <DesignNote title="Square corners">
                All buttons have square corners (no border-radius). This creates a sharp, professional aesthetic consistent with the overall design system.
              </DesignNote>
              <DesignNote title="Icon placement">
                Leading icons for actions (Download, View). Trailing icons for navigation (Learn More →). Never both.
              </DesignNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cards */}
      <Section id="cards" className="bg-[var(--bg-secondary)]">
        <Container>
          <SectionTitle>Cards</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <Card variant="default">
                  <CardHeader>
                    <Heading as="h4" animate={false}>Default</Heading>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--text-body)]">White background, subtle border. General content.</p>
                  </CardContent>
                </Card>
                <Card variant="highlighted">
                  <CardHeader>
                    <Heading as="h4" animate={false}>Highlighted</Heading>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--text-body)]">Orange-tinted. Featured content, key insights.</p>
                  </CardContent>
                </Card>
                <Card variant="success">
                  <CardHeader>
                    <Heading as="h4" animate={false}>Success</Heading>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--text-body)]">Green-tinted. Positive outcomes, alternatives.</p>
                  </CardContent>
                </Card>
                <Card variant="danger">
                  <CardHeader>
                    <Heading as="h4" animate={false}>Danger</Heading>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--text-body)]">Red-tinted. Warnings, failures, critical info.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="space-y-4">
              <DesignNote title="Rectangular corners">
                Cards use `rounded` (4px) not `rounded-lg`. This creates a more professional, data-focused aesthetic that matches scientific literature.
              </DesignNote>
              <DesignNote title="Semantic variants">
                Success (green) for hopeful alternatives. Danger (red) for market failures and abandoned research. Highlighted (orange) for key takeaways.
              </DesignNote>
              <DesignNote title="Hover states">
                Cards have subtle lift on hover (shadow increase) to indicate interactivity. Can be disabled with `hover={false}`.
              </DesignNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* Data Cards */}
      <Section id="data-cards">
        <Container>
          <SectionTitle>Data Cards</SectionTitle>
          <p className="text-[var(--text-muted)] mb-6">
            Consistent cards for data visualizations, charts, and metrics. No rounded corners, compact padding, with optional colored callout boxes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DataCard
              title="1. With Teal Callout"
              description="Default callout color for highlighting key insights from the data."
              callout={{
                text: <><strong>Key insight:</strong> This is how callouts appear with the default teal color.</>,
                color: 'teal',
              }}
            >
              <div className="h-32 bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] text-sm">
                Chart or visualization goes here
              </div>
            </DataCard>

            <DataCard
              title="2. With Warning Callout"
              description="Yellow/amber callout for warnings or important caveats."
              callout={{
                text: <><strong>2.7x gap:</strong> Warning callouts draw attention to concerning data points.</>,
                color: 'warning',
              }}
            >
              <div className="h-32 bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] text-sm">
                Chart or visualization goes here
              </div>
            </DataCard>

            <DataCard
              title="3. With Pink Callout"
              description="Pink callout for concluding statements or results."
              callout={{
                text: <><strong>Result:</strong> Pink callouts work well for summarizing outcomes.</>,
                color: 'pink',
              }}
            >
              <div className="h-32 bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] text-sm">
                Chart or visualization goes here
              </div>
            </DataCard>

            <DataCard
              title="4. No Callout"
              description="Data cards can also be used without a callout for simpler presentations."
            >
              <div className="h-32 bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] text-sm">
                Chart or visualization goes here
              </div>
            </DataCard>
          </div>
        </Container>
      </Section>

      {/* Badges/Tags */}
      <Section id="badges">
        <Container>
          <SectionTitle>Badges &amp; Tags</SectionTitle>
          <Card variant="default" hover={false}>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4">Status Badges</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4">Category Tags</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="amyloid">Amyloid</Badge>
                  <Badge variant="vascular">Vascular</Badge>
                  <Badge variant="metabolic">Metabolic</Badge>
                  <Badge variant="lysosomal">Lysosomal</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Alerts */}
      <Section id="alerts" className="bg-[var(--bg-secondary)]">
        <Container>
          <SectionTitle>Alerts</SectionTitle>
          <div className="space-y-4">
            <Alert variant="info">
              <Info className="w-5 h-5" />
              <span>This is an informational message about the current state.</span>
            </Alert>
            <Alert variant="success">
              <Check className="w-5 h-5" />
              <span>Success! The operation completed successfully.</span>
            </Alert>
            <Alert variant="warning">
              <AlertCircle className="w-5 h-5" />
              <span>Warning: Please review this information carefully.</span>
            </Alert>
            <Alert variant="danger">
              <AlertCircle className="w-5 h-5" />
              <span>Error: Something went wrong. Please try again.</span>
            </Alert>
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section id="stats">
        <Container>
          <SectionTitle>Statistics Display</SectionTitle>
          <Card variant="default" hover={false}>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatDisplay value="55 million+" label="People living with dementia worldwide (2020)" />
                <StatDisplay value="99%" label="Clinical trial failure rate (2002-2012)" highlight />
                <StatDisplay value="~850:1" label="Novel molecule vs. repurposed drug trial ratio" />
                <StatDisplay value="$42.5 Billion" label="Cumulative private R&D expenditure (1995-2001)" />
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Tables */}
      <Section id="tables" className="bg-[var(--bg-secondary)]">
        <Container>
          <SectionTitle>Tables</SectionTitle>
          <Card variant="default" hover={false}>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Drug</th>
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Cost/Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-3 px-4 text-[var(--text-primary)] font-medium">Lecanemab</td>
                      <td className="py-3 px-4 text-[var(--text-body)]">Monoclonal Antibody</td>
                      <td className="py-3 px-4"><Badge variant="success">Approved</Badge></td>
                      <td className="py-3 px-4 text-[var(--accent-orange)] font-neuton font-bold">$26,500</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-3 px-4 text-[var(--text-primary)] font-medium">Lithium</td>
                      <td className="py-3 px-4 text-[var(--text-body)]">Generic</td>
                      <td className="py-3 px-4"><Badge variant="warning">No Pathway</Badge></td>
                      <td className="py-3 px-4 text-[var(--success)] font-neuton font-bold">$50</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[var(--text-primary)] font-medium">GV-971</td>
                      <td className="py-3 px-4 text-[var(--text-body)]">Generic</td>
                      <td className="py-3 px-4"><Badge variant="warning">China Only</Badge></td>
                      <td className="py-3 px-4 text-[var(--success)] font-neuton font-bold">$200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Sex & Ancestry Visualizations */}
      <Section id="sex-ancestry-viz">
        <Container>
          <SectionTitle>Sex &amp; Ancestry Visualizations</SectionTitle>
          <p className="text-[var(--text-muted)] mb-8">
            Visualizations showing how biological sex and genetic ancestry modify AD risk through specific molecular pathways.
          </p>

          <div className="space-y-8">
            {/* Menopause Comparison */}
            <div>
              <p className="text-sm text-[var(--text-muted)] mb-4 font-medium">Menopause Transition Comparison</p>
              <MenopauseComparison />
            </div>

            {/* Two-column layout for charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4 font-medium">APOE4 Risk by Ancestry</p>
                <AncestryRiskChart />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4 font-medium">Fat Distribution by Ancestry</p>
                <FatDistributionChart />
              </div>
            </div>

            {/* Interventions Table */}
            <div>
              <p className="text-sm text-[var(--text-muted)] mb-4 font-medium">Mechanism-Matched Interventions</p>
              <InterventionsTable />
            </div>
          </div>
        </Container>
      </Section>

      {/* Network Graph */}
      <Section id="network-graph" className="bg-[var(--bg-secondary)]">
        <Container>
          <SectionTitle>Mechanistic Network Graph</SectionTitle>
          <p className="text-[var(--text-muted)] mb-6">
            Interactive visualization of the AD mechanistic framework. Select a module to explore its nodes and edges.
            Click on nodes to see details. Drag to pan, scroll to zoom.
          </p>
          <MechanisticNetworkGraph height="700px" />
        </Container>
      </Section>
    </main>
  );
}

// Helper Components for Showcase

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h2" className="mb-8">{children}</Heading>
  );
}

function DesignNote({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-3 bg-white border border-[var(--border)] rounded">
      <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">{title}</p>
      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{children}</p>
    </div>
  );
}

function ColorSwatch({ name, hex, dark, compact }: { name: string; hex: string; dark?: boolean; compact?: boolean }) {
  return (
    <div className="overflow-hidden border border-[var(--border)]">
      <div
        className={`${compact ? 'h-8' : 'h-12'} flex items-end p-1.5`}
        style={{ backgroundColor: hex }}
      >
        <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} font-mono ${dark ? 'text-white' : 'text-[var(--text-body)]'}`}>
          {hex}
        </span>
      </div>
      <div className={`${compact ? 'px-1 py-0.5' : 'p-1.5'} bg-white`}>
        <p className={`${compact ? 'text-[8px]' : 'text-[10px]'} font-medium text-[var(--text-primary)] truncate`}>{name}</p>
      </div>
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'amyloid' | 'vascular' | 'metabolic' | 'lysosomal';
}

function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-[var(--bg-secondary)] text-[var(--text-body)] border-[var(--border)]',
    primary: 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)] border-[var(--accent-orange)]',
    success: 'bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]',
    warning: 'bg-amber-50 text-amber-700 border-amber-300',
    danger: 'bg-[var(--danger-light)] text-[var(--danger)] border-[var(--danger)]',
    amyloid: 'bg-blue-50 text-[var(--category-amyloid)] border-[var(--category-amyloid)]',
    vascular: 'bg-purple-50 text-[var(--category-vascular)] border-[var(--category-vascular)]',
    metabolic: 'bg-yellow-50 text-[var(--category-metabolic)] border-[var(--category-metabolic)]',
    lysosomal: 'bg-green-50 text-[var(--category-lysosomal)] border-[var(--category-lysosomal)]',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
}

function Alert({ children, variant = 'info' }: AlertProps) {
  const variantClasses = {
    info: 'bg-[#e8f4f6] text-[var(--chart-secondary)] border-[var(--chart-secondary)]',
    success: 'bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]',
    warning: 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)] border-[var(--accent-orange)]',
    danger: 'bg-[var(--danger-light)] text-[var(--danger)] border-[var(--danger)]',
  };

  return (
    <div className={`flex items-center gap-3 p-4 border ${variantClasses[variant]}`}>
      {children}
    </div>
  );
}

interface StatDisplayProps {
  value: string;
  label: string;
  highlight?: boolean;
}

function StatDisplay({ value, label, highlight }: StatDisplayProps) {
  return (
    <div className="text-center">
      <div className={`text-2xl md:text-3xl font-bold font-serif ${highlight ? 'text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'}`}>
        {value}
      </div>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{label}</p>
    </div>
  );
}
