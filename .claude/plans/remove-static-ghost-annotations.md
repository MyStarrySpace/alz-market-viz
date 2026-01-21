---
planStatus:
  planId: plan-remove-static-ghost-annotations
  title: Remove Static Ghost/Loop Annotations in Favor of Runtime Calculation
  status: draft
  planType: refactor
  priority: medium
  owner: developer
  stakeholders:
    - developer
  tags:
    - graph
    - mechanistic-framework
    - data-model
    - runtime-calculation
  created: "2026-01-21"
  updated: "2026-01-21T19:45:00.000Z"
  progress: 0
---

# Remove Static Ghost/Loop Annotations in Favor of Runtime Calculation

## Goals
- Remove `isGhost` and `completesLoop` static annotations from edge data
- Rely entirely on runtime calculation for identifying back edges (feedback loops)
- Make the graph visualization independent of any assumed starting point
- Simplify the data model by removing derived/redundant properties

## Problem Description

### Current State
The mechanistic framework currently has two parallel systems for identifying feedback loops:

1. **Static annotations in `edges.ts`**:
   - `isGhost: boolean` - Marks edges that "complete a cycle but aren't drawn"
   - `completesLoop: string` - References a loop ID from `feedbackLoops.ts`
   - Currently only used on 1 edge (tau_aggregated → nlrp3_active)

2. **Runtime calculation in `computeGreedyLayout()`**:
   - Dynamically identifies back edges based on node positions
   - An edge is a "back edge" if `targetPos.y <= sourcePos.y` (vertical flow)
   - Already used by the visualization for routing feedback loops to the left side

### Why This Is Problematic

1. **Starting point dependency**: The static annotations assume "aging" as the entry point. But:
   - Aging doesn't always lead to AD; it advances other systemic factors
   - Different entry points (e.g., head trauma, insulin resistance, infection) would change which edges are "back edges"
   - The graph should be agnostic to starting point

2. **Redundancy**: The runtime calculation already determines back edges correctly for any given layout. The static annotations are unused by the visualization code.

3. **Maintenance burden**: If we add new edges or change the graph structure, we'd need to manually update static annotations that the system already calculates.

## High-Level Approach

### Phase 1: Verify Static Annotations Are Unused
- Confirm `isGhost` and `completesLoop` are not used anywhere in components
- Check if any presets, exports, or scripts depend on these properties

### Phase 2: Remove Static Annotations
- Remove `isGhost` property from edges in `edges.ts`
- Remove `completesLoop` property from edges in `edges.ts`
- Update `MechanisticEdge` type in `types.ts` to remove these optional fields

### Phase 3: Evaluate feedbackLoops.ts
- The `feedbackLoops.ts` file defines loops with `ghostEdge` objects
- These are semantic/documentation, not used for visualization
- Decision: Keep for documentation or remove entirely?

### Phase 4: Consider Entry Point Flexibility
- Currently the layout starts from nodes with no incoming edges
- Consider whether to expose entry point selection in UI (future enhancement)

## Files Affected

| File | Change |
|------|--------|
| `src/data/mechanisticFramework/edges.ts` | Remove `isGhost` and `completesLoop` from edge(s) |
| `src/data/mechanisticFramework/types.ts` | Remove properties from `MechanisticEdge` interface |
| `src/data/mechanisticFramework/feedbackLoops.ts` | Evaluate: keep `ghostEdge` for documentation or remove |

## Acceptance Criteria

- [ ] No TypeScript errors after removing properties
- [ ] Graph visualization works identically (back edges still route correctly)
- [ ] All presets and filters continue to work
- [ ] No runtime errors in console
- [ ] Build passes

## Open Questions

1. **Should `feedbackLoops.ts` ghost edges be kept?**
   - Pro: They document the biological reality of which edges complete cycles
   - Con: They're starting-point-dependent and potentially misleading
   - Alternative: Rename to `completingEdge` with a note that it's semantic, not layout-driven

2. **Should we support multiple entry points in the UI?**
   - This would be a separate feature but is enabled by removing static annotations
   - Could allow users to explore "what if insulin resistance is the starting point?"

3. **Do any external scripts or exports use these properties?**
   - Need to check `scripts/` folder for any consumers

## What Success Looks Like

- Simpler data model with fewer redundant properties
- Graph behavior identical to current (no visual changes)
- Clear separation: data defines biological relationships, runtime determines layout
- Foundation for future entry-point-flexible exploration
