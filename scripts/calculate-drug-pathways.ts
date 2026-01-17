/**
 * CLI Script: Calculate Drug Pathways
 *
 * Pre-calculates pathway configurations for all drugs in the library.
 * Outputs to src/data/mechanisticFramework/drugPathways.json
 *
 * Usage:
 *   npx tsx scripts/calculate-drug-pathways.ts
 *   npm run calculate-pathways
 */

import * as fs from 'fs';
import * as path from 'path';

import { allNodes } from '../src/data/mechanisticFramework/nodes';
import { allEdges } from '../src/data/mechanisticFramework/edges';
import { feedbackLoops } from '../src/data/mechanisticFramework/feedbackLoops';
import { drugLibrary, type DrugPathwayConfig } from '../src/data/mechanisticFramework/drugLibrary';
import {
  calculateDrugPathway,
  getPathwayStats,
} from '../src/lib/pathwayCalculation';

// ============================================================================
// CONFIGURATION
// ============================================================================

const MAX_DEPTH = 5; // BFS depth limit
const OUTPUT_PATH = path.join(__dirname, '../src/data/mechanisticFramework/drugPathways.json');

// ============================================================================
// MAIN
// ============================================================================

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║           DRUG PATHWAY CALCULATOR                              ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

console.log('Configuration:');
console.log(`  Max BFS depth: ${MAX_DEPTH}`);
console.log(`  Output path: ${OUTPUT_PATH}`);
console.log(`  Drugs in library: ${drugLibrary.length}`);
console.log(`  Network nodes: ${allNodes.length}`);
console.log(`  Network edges: ${allEdges.length}`);
console.log(`  Feedback loops: ${feedbackLoops.length}`);
console.log('');

// Validate that drug targets exist in the network
console.log('════════════════════════════════════════════════════════════════');
console.log('VALIDATING DRUG TARGETS');
console.log('════════════════════════════════════════════════════════════════');

const nodeIdSet = new Set(allNodes.map(n => n.id));
let hasErrors = false;

drugLibrary.forEach(drug => {
  drug.primaryTargets.forEach(target => {
    if (!nodeIdSet.has(target.nodeId)) {
      console.log(`  ✗ ${drug.name}: Target "${target.nodeId}" not found in network`);
      hasErrors = true;
    }
  });
});

if (!hasErrors) {
  console.log('  ✓ All drug targets exist in network');
}
console.log('');

// Calculate pathways
console.log('════════════════════════════════════════════════════════════════');
console.log('CALCULATING PATHWAYS');
console.log('════════════════════════════════════════════════════════════════');

const pathways: Record<string, DrugPathwayConfig> = {};
const startTime = Date.now();

drugLibrary.forEach((drug, index) => {
  process.stdout.write(`  [${index + 1}/${drugLibrary.length}] ${drug.name}...`);

  try {
    const pathway = calculateDrugPathway(
      drug,
      allNodes,
      allEdges,
      feedbackLoops,
      MAX_DEPTH
    );

    pathways[drug.id] = pathway;

    const stats = getPathwayStats(pathway);
    console.log(` ✓ (${stats.upstreamCount}↑ ${stats.targetCount}● ${stats.downstreamCount}↓, ${stats.loopCount} loops)`);
  } catch (error) {
    console.log(` ✗ ERROR: ${error}`);
  }
});

const elapsed = Date.now() - startTime;
console.log('');
console.log(`Completed in ${elapsed}ms`);
console.log('');

// Summary statistics
console.log('════════════════════════════════════════════════════════════════');
console.log('SUMMARY');
console.log('════════════════════════════════════════════════════════════════');

const allPathwayStats = Object.values(pathways).map(p => getPathwayStats(p));
const totalUpstream = allPathwayStats.reduce((sum, s) => sum + s.upstreamCount, 0);
const totalDownstream = allPathwayStats.reduce((sum, s) => sum + s.downstreamCount, 0);
const totalLoops = allPathwayStats.reduce((sum, s) => sum + s.loopCount, 0);
const totalBreaking = allPathwayStats.reduce((sum, s) => sum + s.loopsBreaking, 0);

console.log(`  Pathways calculated: ${Object.keys(pathways).length}`);
console.log(`  Average upstream nodes: ${(totalUpstream / allPathwayStats.length).toFixed(1)}`);
console.log(`  Average downstream nodes: ${(totalDownstream / allPathwayStats.length).toFixed(1)}`);
console.log(`  Total loop involvements: ${totalLoops}`);
console.log(`  Loops being broken: ${totalBreaking}`);
console.log('');

// Find drugs that break the most loops
console.log('Top loop-breaking drugs:');
const byLoopBreaking = Object.entries(pathways)
  .map(([id, p]) => ({
    id,
    name: drugLibrary.find(d => d.id === id)?.name || id,
    breaking: p.relevantLoops.filter(l => l.involvement === 'breaks').length,
    total: p.relevantLoops.length,
  }))
  .sort((a, b) => b.breaking - a.breaking)
  .slice(0, 5);

byLoopBreaking.forEach((d, i) => {
  console.log(`  ${i + 1}. ${d.name}: ${d.breaking} loops broken (${d.total} total)`);
});
console.log('');

// Write output
console.log('════════════════════════════════════════════════════════════════');
console.log('WRITING OUTPUT');
console.log('════════════════════════════════════════════════════════════════');

const output = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  config: {
    maxDepth: MAX_DEPTH,
    nodesCount: allNodes.length,
    edgesCount: allEdges.length,
    loopsCount: feedbackLoops.length,
  },
  pathways,
};

try {
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`  ✓ Written to ${OUTPUT_PATH}`);
  console.log(`  File size: ${(fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1)} KB`);
} catch (error) {
  console.log(`  ✗ ERROR writing file: ${error}`);
}

console.log('');
console.log('════════════════════════════════════════════════════════════════');
console.log('DONE');
console.log('════════════════════════════════════════════════════════════════');
