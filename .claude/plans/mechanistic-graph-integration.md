---
planStatus:
  planId: plan-mechanistic-graph-integration
  title: Mechanistic Graph Integration with Visualization Sections
  status: draft
  planType: feature
  priority: high
  owner: developer
  stakeholders:
    - developer
    - content-team
  tags:
    - mechanistic-framework
    - visualization
    - api
    - presets
    - integration
  created: "2026-01-20"
  updated: "2026-01-20T18:45:00.000Z"
  progress: 0
---

# Mechanistic Graph Integration with Visualization Sections

## Goals

1. **Intertwine the mechanistic graph with narrative sections** so users can seamlessly explore the scientific detail behind each part of the story
2. **Create section-specific presets** that highlight relevant nodes/pathways when users navigate to different content sections
3. **Add API import capability** to complement existing export, enabling round-trip data workflows
4. **Enable bidirectional linking** between text sections and the graph

## Problem Description

### Current State
- The mechanistic graph exists as a standalone interactive component with 13 hypothesis presets and 5 drug category presets
- Content sections (CaseStudies, EvidenceGraveyard, HopefulDevelopments, etc.) contain narrative text but don't connect to the graph
- Export API exists (`/api/v1/export/network`) but no import API
- Users must manually navigate between text and graph, losing context

### Jobs to be Done
1. **As a reader**, when I'm reading about a case study (e.g., Butylphthalide), I want to see the relevant mechanistic pathways highlighted in the graph so I can understand the scientific basis
2. **As a researcher**, I want to export the network, modify it, and import my changes back so I can customize the visualization for presentations
3. **As a developer**, I want presets that automatically sync with content sections so the graph feels like an integral part of the narrative

### User Stories
- User reads CaseStudies section about TNF inhibitors → Graph highlights neuroinflammation hypothesis nodes
- User clicks "See in Graph" on a drug card → Graph focuses on that drug's pathway
- User exports network JSON, adds custom annotations, imports back → Custom view persists
- User scrolls to SexAncestryEffects section → Graph highlights M16 module nodes

## High-Level Approach

### Phase 1: Section-Aware Presets
Create new preset category "sections" that maps narrative sections to graph configurations

**Section-to-Preset Mappings:**
| Section | Preset Focus |
|---------|--------------|
| CaseStudies: GV-971 | gut_brain_axis hypothesis + GV-971 treatment node |
| CaseStudies: TNF Inhibitors | neuroinflammation_hypothesis + etanercept nodes |
| CaseStudies: 40Hz Gamma | microglial nodes + clearance pathways |
| CaseStudies: Butylphthalide | Multi-target: NLRP3, mitochondria, BBB, microcirculation |
| EvidenceGraveyard | failed_amyloid + failed_tau drug presets |
| HopefulDevelopments | approved_drugs preset |
| SexAncestryEffects | M16 module nodes |
| ForgottenObservations | biomarker_timeline preset |
| SidelinedResearchers | Map each researcher to their hypothesis preset |

### Phase 2: Bidirectional Navigation
Add UI affordances for text-to-graph and graph-to-text navigation

**Text → Graph:**
- "Explore in Graph" buttons on case study cards, drug mentions, researcher cards
- URL parameter support: `/graph?preset=case_butylphthalide`
- Scroll-triggered graph updates (optional, may be disorienting)

**Graph → Text:**
- Node click reveals "Learn More" link to relevant section
- Treatment nodes link to their case study if one exists
- Module nodes link to relevant narrative sections

### Phase 3: Import/Export API
Complete the round-trip data workflow

**New Import Endpoint:**
- `POST /api/v1/import/network` - Import modified network JSON
- Validation: schema compliance, node/edge integrity
- Merge strategy: replace, merge, or overlay modes
- Session-scoped: imports don't modify source data, only user's view

**Enhanced Export:**
- Add `format` parameter: json (default), graphml, cytoscape, csv
- Add `scope` parameter: full, selected, pathway
- Include preset definitions in export for reproducibility

### Phase 4: State Management
Persist graph state across navigation

**URL State:**
- Encode active preset, highlighted nodes, zoom/pan in URL
- Enable shareable links to specific graph states

**Session State:**
- Remember user's last graph configuration
- Preserve imported customizations during session

## Key Components

### New Files to Create
1. `src/data/mechanisticFramework/sectionPresets.ts` - Section-specific preset definitions
2. `src/app/api/v1/import/network/route.ts` - Import endpoint
3. `src/components/ui/ExploreInGraphButton.tsx` - Reusable link component
4. `src/hooks/useGraphNavigation.ts` - Navigation state management

### Files to Modify
1. `src/data/mechanisticFramework/presets.ts` - Add section preset category
2. `src/data/mechanisticFramework/index.ts` - Export new preset functions
3. `src/components/sections/CaseStudies.tsx` - Add graph links
4. `src/components/sections/EvidenceGraveyard.tsx` - Add graph links
5. `src/components/sections/SidelinedResearchers.tsx` - Add graph links
6. `src/components/sections/HopefulDevelopments.tsx` - Add graph links
7. `src/components/sections/MechanisticNetworkGraph/PresetPicker.tsx` - Support section presets
8. `src/app/api/v1/export/network/route.ts` - Add format options

### API Specification

**Import Endpoint:**
```
POST /api/v1/import/network
Content-Type: application/json

Request Body:
{
  "mode": "overlay" | "replace" | "merge",
  "data": {
    "nodes": [...],      // Optional: custom nodes
    "edges": [...],      // Optional: custom edges
    "annotations": [...] // Optional: user annotations
  }
}

Response:
{
  "success": true,
  "imported": { "nodes": 5, "edges": 3, "annotations": 2 },
  "sessionId": "abc123"  // For retrieving imported state
}
```

**Enhanced Export:**
```
GET /api/v1/export/network?format=json&scope=full&includePresets=true
GET /api/v1/export/network?format=graphml&scope=selected&nodes=node1,node2
GET /api/v1/export/network?format=cytoscape&scope=pathway&drugs=lecanemab
```

## Acceptance Criteria

### Phase 1: Section Presets
- [ ] 6+ section presets created mapping case studies to graph configurations
- [ ] PresetPicker UI shows "Sections" category alongside "Hypotheses" and "Drugs"
- [ ] Selecting a section preset highlights appropriate nodes and centers view

### Phase 2: Bidirectional Navigation
- [ ] "Explore in Graph" button appears on case study cards
- [ ] Clicking button scrolls to graph section and activates relevant preset
- [ ] URL parameter `?preset=X` loads specified preset on page load
- [ ] Node info panel includes "Learn More" links to relevant sections

### Phase 3: Import/Export API
- [ ] POST /api/v1/import/network accepts valid JSON and returns session ID
- [ ] Import validation rejects malformed data with helpful error messages
- [ ] GET /api/v1/export/network supports format parameter (json, graphml)
- [ ] Export includes active preset information for reproducibility

### Phase 4: State Management
- [ ] Graph state encoded in URL (preset, highlighted nodes)
- [ ] Shareable URLs reproduce exact graph view
- [ ] Session persists imported customizations

## Success Metrics

1. **Engagement**: Users who interact with graph after reading a section (target: 30%+)
2. **Navigation**: Bidirectional clicks between text and graph per session (target: 2+)
3. **API Usage**: Export/import endpoint calls per week (baseline then growth)
4. **Time on Page**: Increase in time spent on mechanistic content sections

## Open Questions

1. **Scroll Sync**: Should scrolling through text sections automatically update the graph? Could be powerful but also disorienting. Consider user preference toggle.

2. **Mobile Experience**: The graph is complex. Should mobile users see a simplified version or just the preset selector without the full graph?

3. **Import Persistence**: Should imported customizations persist across sessions (requires auth/storage) or be session-only?

4. **Annotation System**: Should users be able to add text annotations to nodes? Would require more complex import/export schema.

5. **Preset Composition**: Should users be able to combine presets (e.g., "Show me TNF inhibitors + vascular hypothesis")? Would require preset algebra.

6. **Performance**: With 330+ nodes, how do we ensure smooth transitions when switching presets? May need animation throttling or progressive loading.

## Dependencies

- ReactFlow library (already installed)
- Framer Motion for transitions (already installed)
- URL state management (Next.js built-in or nuqs library)

## Risks

1. **Complexity Creep**: Easy to over-engineer. Start with Phase 1-2, validate with users before Phase 3-4.
2. **Performance**: Large graph + animations + state sync could cause jank. Profile early.
3. **Content Maintenance**: Section presets require updating when content changes. Document the mapping.
