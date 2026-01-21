#!/usr/bin/env npx tsx
/**
 * Similar Node Finder Script
 *
 * Compares node IDs and labels using string similarity (Levenshtein distance)
 * to flag potential duplicates. Will produce false positives, but helps catch
 * nodes that may represent the same concept with slightly different names.
 *
 * Usage: npx tsx scripts/find-similar-nodes.ts
 *
 * Options (via environment variables):
 *   THRESHOLD=0.8  - Similarity threshold (0-1, default 0.7)
 *   SHOW_ALL=true  - Show all comparisons, not just above threshold
 */

import { allNodes } from '../src/data/mechanisticFramework';

// ============================================================================
// STRING SIMILARITY ALGORITHMS
// ============================================================================

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;

  // Create distance matrix
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Initialize first row and column
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill in the rest of the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}

/**
 * Calculate similarity ratio (0-1) based on Levenshtein distance
 */
function similarityRatio(s1: string, s2: string): number {
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1;
  const distance = levenshteinDistance(s1, s2);
  return 1 - distance / maxLen;
}

/**
 * Normalize string for comparison (lowercase, remove underscores/hyphens)
 */
function normalizeString(s: string): string {
  return s.toLowerCase().replace(/[_-]/g, '').replace(/\s+/g, '');
}

/**
 * Check if two strings share common meaningful tokens
 */
function sharedTokens(s1: string, s2: string): string[] {
  const stopWords = new Set([
    'the',
    'a',
    'an',
    'and',
    'or',
    'of',
    'in',
    'to',
    'for',
    'with',
    'by',
    'at',
    'on',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'will',
    'would',
    'could',
    'should',
    'may',
    'might',
    'must',
    'can',
  ]);

  const tokenize = (s: string): Set<string> => {
    const tokens = s
      .toLowerCase()
      .replace(/[_-]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 2 && !stopWords.has(t));
    return new Set(tokens);
  };

  const tokens1 = tokenize(s1);
  const tokens2 = tokenize(s2);

  const shared: string[] = [];
  tokens1.forEach((t) => {
    if (tokens2.has(t)) shared.push(t);
  });

  return shared;
}

// ============================================================================
// SIMILARITY ANALYSIS
// ============================================================================

interface SimilarityMatch {
  node1: { id: string; label: string; module: string };
  node2: { id: string; label: string; module: string };
  idSimilarity: number;
  labelSimilarity: number;
  normalizedIdSimilarity: number;
  normalizedLabelSimilarity: number;
  maxSimilarity: number;
  sharedTokens: string[];
  sameModule: boolean;
}

function findSimilarNodes(threshold: number): SimilarityMatch[] {
  const matches: SimilarityMatch[] = [];

  for (let i = 0; i < allNodes.length; i++) {
    for (let j = i + 1; j < allNodes.length; j++) {
      const node1 = allNodes[i];
      const node2 = allNodes[j];

      // Calculate various similarity metrics
      const idSim = similarityRatio(node1.id, node2.id);
      const labelSim = similarityRatio(node1.label, node2.label);
      const normIdSim = similarityRatio(
        normalizeString(node1.id),
        normalizeString(node2.id)
      );
      const normLabelSim = similarityRatio(
        normalizeString(node1.label),
        normalizeString(node2.label)
      );

      const maxSim = Math.max(idSim, labelSim, normIdSim, normLabelSim);
      const shared = sharedTokens(
        `${node1.id} ${node1.label}`,
        `${node2.id} ${node2.label}`
      );

      // Include if above threshold OR if they share significant tokens
      if (maxSim >= threshold || shared.length >= 2) {
        matches.push({
          node1: { id: node1.id, label: node1.label, module: node1.moduleId },
          node2: { id: node2.id, label: node2.label, module: node2.moduleId },
          idSimilarity: idSim,
          labelSimilarity: labelSim,
          normalizedIdSimilarity: normIdSim,
          normalizedLabelSimilarity: normLabelSim,
          maxSimilarity: maxSim,
          sharedTokens: shared,
          sameModule: node1.moduleId === node2.moduleId,
        });
      }
    }
  }

  // Sort by max similarity (highest first)
  return matches.sort((a, b) => b.maxSimilarity - a.maxSimilarity);
}

// ============================================================================
// OUTPUT FORMATTING
// ============================================================================

function formatPercent(n: number): string {
  return `${(n * 100).toFixed(0)}%`;
}

function truncate(s: string, maxLen: number): string {
  if (s.length <= maxLen) return s;
  return s.substring(0, maxLen - 3) + '...';
}

function generateReport(matches: SimilarityMatch[], threshold: number) {
  console.log('# Similar Node Analysis Report\n');
  console.log(`Generated: ${new Date().toISOString()}`);
  console.log(`Similarity Threshold: ${formatPercent(threshold)}`);
  console.log(`Total Nodes Analyzed: ${allNodes.length}`);
  console.log(`Potential Matches Found: ${matches.length}\n`);

  if (matches.length === 0) {
    console.log('*No similar nodes found above threshold.*\n');
    return;
  }

  // High confidence matches (>85%)
  const highConfidence = matches.filter((m) => m.maxSimilarity >= 0.85);
  const mediumConfidence = matches.filter(
    (m) => m.maxSimilarity >= 0.75 && m.maxSimilarity < 0.85
  );
  const lowConfidence = matches.filter(
    (m) => m.maxSimilarity < 0.75 && m.sharedTokens.length >= 2
  );

  if (highConfidence.length > 0) {
    console.log('## ⚠️  High Confidence Matches (≥85%)\n');
    console.log('These are most likely to be actual duplicates.\n');
    console.log(
      '| Similarity | Node 1 | Module | Node 2 | Module | Shared Tokens |'
    );
    console.log(
      '|------------|--------|--------|--------|--------|---------------|'
    );
    highConfidence.forEach((m) => {
      const simStr = formatPercent(m.maxSimilarity);
      const tokens = m.sharedTokens.join(', ') || '-';
      console.log(
        `| **${simStr}** | ${truncate(m.node1.id, 25)} | ${m.node1.module} | ${truncate(m.node2.id, 25)} | ${m.node2.module} | ${truncate(tokens, 20)} |`
      );
    });
    console.log('');
  }

  if (mediumConfidence.length > 0) {
    console.log('## 🔍 Medium Confidence Matches (75-84%)\n');
    console.log('Review these for potential consolidation.\n');
    console.log(
      '| Similarity | Node 1 | Module | Node 2 | Module | Shared Tokens |'
    );
    console.log(
      '|------------|--------|--------|--------|--------|---------------|'
    );
    mediumConfidence.forEach((m) => {
      const simStr = formatPercent(m.maxSimilarity);
      const tokens = m.sharedTokens.join(', ') || '-';
      console.log(
        `| ${simStr} | ${truncate(m.node1.id, 25)} | ${m.node1.module} | ${truncate(m.node2.id, 25)} | ${m.node2.module} | ${truncate(tokens, 20)} |`
      );
    });
    console.log('');
  }

  if (lowConfidence.length > 0) {
    console.log('## 📋 Shared Token Matches (Lower Similarity)\n');
    console.log(
      'These share multiple keywords but have lower string similarity.\n'
    );
    console.log(
      '| Similarity | Node 1 | Module | Node 2 | Module | Shared Tokens |'
    );
    console.log(
      '|------------|--------|--------|--------|--------|---------------|'
    );
    lowConfidence.slice(0, 30).forEach((m) => {
      // Limit to 30
      const simStr = formatPercent(m.maxSimilarity);
      const tokens = m.sharedTokens.join(', ') || '-';
      console.log(
        `| ${simStr} | ${truncate(m.node1.id, 25)} | ${m.node1.module} | ${truncate(m.node2.id, 25)} | ${m.node2.module} | ${truncate(tokens, 20)} |`
      );
    });
    if (lowConfidence.length > 30) {
      console.log(`\n*...and ${lowConfidence.length - 30} more matches*`);
    }
    console.log('');
  }

  // Detailed view of top matches
  console.log('---\n');
  console.log('## Detailed Analysis of Top Matches\n');

  matches.slice(0, 15).forEach((m, i) => {
    console.log(`### ${i + 1}. ${m.node1.id} ↔ ${m.node2.id}\n`);
    console.log(`| Metric | Value |`);
    console.log(`|--------|-------|`);
    console.log(`| **Max Similarity** | ${formatPercent(m.maxSimilarity)} |`);
    console.log(`| ID Similarity | ${formatPercent(m.idSimilarity)} |`);
    console.log(`| Label Similarity | ${formatPercent(m.labelSimilarity)} |`);
    console.log(
      `| Normalized ID Sim | ${formatPercent(m.normalizedIdSimilarity)} |`
    );
    console.log(
      `| Normalized Label Sim | ${formatPercent(m.normalizedLabelSimilarity)} |`
    );
    console.log(`| Same Module | ${m.sameModule ? 'Yes' : 'No'} |`);
    console.log(
      `| Shared Tokens | ${m.sharedTokens.length > 0 ? m.sharedTokens.join(', ') : 'None'} |`
    );
    console.log('');
    console.log(`**Node 1**: \`${m.node1.id}\``);
    console.log(`- Label: ${m.node1.label}`);
    console.log(`- Module: ${m.node1.module}`);
    console.log('');
    console.log(`**Node 2**: \`${m.node2.id}\``);
    console.log(`- Label: ${m.node2.label}`);
    console.log(`- Module: ${m.node2.module}`);
    console.log('\n---\n');
  });

  // Summary statistics
  console.log('## Summary Statistics\n');
  console.log('| Category | Count |');
  console.log('|----------|-------|');
  console.log(`| High Confidence (≥85%) | ${highConfidence.length} |`);
  console.log(`| Medium Confidence (75-84%) | ${mediumConfidence.length} |`);
  console.log(`| Shared Token Matches | ${lowConfidence.length} |`);
  console.log(`| **Total Flagged** | ${matches.length} |`);

  // Same module matches (higher risk of being actual duplicates)
  const sameModuleMatches = matches.filter((m) => m.sameModule);
  if (sameModuleMatches.length > 0) {
    console.log('\n### Same-Module Matches (Higher Duplicate Risk)\n');
    console.log(
      '| Similarity | Node 1 | Node 2 | Module | Shared Tokens |'
    );
    console.log(
      '|------------|--------|--------|--------|---------------|'
    );
    sameModuleMatches.forEach((m) => {
      const simStr = formatPercent(m.maxSimilarity);
      const tokens = m.sharedTokens.join(', ') || '-';
      console.log(
        `| ${simStr} | ${truncate(m.node1.id, 25)} | ${truncate(m.node2.id, 25)} | ${m.node1.module} | ${truncate(tokens, 20)} |`
      );
    });
  }
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  const threshold = parseFloat(process.env.THRESHOLD || '0.7');

  if (threshold < 0 || threshold > 1) {
    console.error('Error: THRESHOLD must be between 0 and 1');
    process.exit(1);
  }

  const matches = findSimilarNodes(threshold);
  generateReport(matches, threshold);
}

main();
