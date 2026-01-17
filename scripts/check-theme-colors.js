#!/usr/bin/env node

/**
 * Theme Color Checker
 *
 * Scans the codebase for Tailwind default color classes that should be
 * replaced with theme CSS variables for consistency.
 *
 * Usage: node scripts/check-theme-colors.js
 */

const fs = require('fs');
const path = require('path');

// Tailwind color patterns to flag (these should use theme variables instead)
const TAILWIND_COLOR_PATTERNS = [
  // Background colors
  /\bbg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // Text colors
  /\btext-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // Border colors
  /\bborder-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // Ring colors
  /\bring-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // Divide colors
  /\bdivide-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // Fill/Stroke colors
  /\bfill-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  /\bstroke-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // Shadow colors
  /\bshadow-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // Decoration colors
  /\bdecoration-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // Accent colors
  /\baccent-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // Caret colors
  /\bcaret-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // Outline colors
  /\boutline-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  // From/Via/To gradient colors
  /\bfrom-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  /\bvia-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
  /\bto-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
];

// Theme variable suggestions
const THEME_SUGGESTIONS = {
  // Backgrounds
  'bg-white': 'bg-[var(--bg-card)]',
  'bg-gray': 'bg-[var(--bg-secondary)] or bg-[var(--bg-primary)]',
  'bg-slate': 'bg-[var(--bg-secondary)] or bg-[var(--bg-primary)]',
  'bg-red': 'bg-[var(--danger)] or bg-[var(--danger-light)]',
  'bg-green': 'bg-[var(--success)] or bg-[var(--success-light)]',
  'bg-emerald': 'bg-[var(--success)] or bg-[var(--success-light)]',
  'bg-orange': 'bg-[var(--accent-orange)] or bg-[var(--accent-orange-light)]',
  'bg-blue': 'bg-[var(--chart-primary)] or bg-[var(--category-amyloid)]',
  'bg-purple': 'bg-[var(--category-vascular)]',
  'bg-yellow': 'bg-[var(--category-metabolic)] or bg-[var(--chart-warning)]',
  'bg-teal': 'bg-[var(--chart-secondary)] or bg-[var(--category-mitochondrial)]',
  'bg-pink': 'bg-[var(--chart-pink)] or bg-[var(--category-myelin)]',

  // Text
  'text-gray': 'text-[var(--text-primary)], text-[var(--text-body)], or text-[var(--text-muted)]',
  'text-slate': 'text-[var(--text-primary)], text-[var(--text-body)], or text-[var(--text-muted)]',
  'text-red': 'text-[var(--danger)]',
  'text-green': 'text-[var(--success)]',
  'text-emerald': 'text-[var(--success)]',
  'text-orange': 'text-[var(--accent-orange)]',
  'text-blue': 'text-[var(--chart-primary)]',

  // Borders
  'border-gray': 'border-[var(--border)]',
  'border-slate': 'border-[var(--border)]',
};

// Files/directories to scan
const SCAN_DIRS = ['src'];
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css'];

// Files to ignore
const IGNORE_PATTERNS = [
  'node_modules',
  '.next',
  'dist',
  '.git',
];

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues = [];

  lines.forEach((line, index) => {
    TAILWIND_COLOR_PATTERNS.forEach(pattern => {
      const matches = line.match(pattern);
      if (matches) {
        matches.forEach(match => {
          // Extract the color family for suggestions
          const colorFamily = match.match(/(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)/);
          const prefix = match.split('-')[0];
          const suggestionKey = colorFamily ? `${prefix}-${colorFamily[0]}` : null;

          issues.push({
            line: index + 1,
            match,
            suggestion: suggestionKey ? THEME_SUGGESTIONS[suggestionKey] : 'Use a theme CSS variable',
            context: line.trim().substring(0, 100),
          });
        });
      }
    });
  });

  return issues;
}

function scanDirectory(dir) {
  const results = {};

  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach(file => {
      const filePath = path.join(currentDir, file);

      if (shouldIgnore(filePath)) return;

      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
      } else if (EXTENSIONS.includes(path.extname(file))) {
        const issues = scanFile(filePath);
        if (issues.length > 0) {
          results[filePath] = issues;
        }
      }
    });
  }

  walk(dir);
  return results;
}

function main() {
  console.log('🎨 Theme Color Checker\n');
  console.log('Scanning for Tailwind default colors that should use theme variables...\n');

  let totalIssues = 0;
  const allResults = {};

  SCAN_DIRS.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      const results = scanDirectory(dirPath);
      Object.assign(allResults, results);
    }
  });

  const fileCount = Object.keys(allResults).length;

  if (fileCount === 0) {
    console.log('✅ No Tailwind default colors found! All colors use theme variables.\n');
    return;
  }

  Object.entries(allResults).forEach(([filePath, issues]) => {
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`\n📄 ${relativePath}`);
    console.log('─'.repeat(60));

    issues.forEach(issue => {
      totalIssues++;
      console.log(`  Line ${issue.line}: ${issue.match}`);
      if (issue.suggestion) {
        console.log(`    → Suggestion: ${issue.suggestion}`);
      }
      console.log(`    Context: ...${issue.context}...`);
      console.log('');
    });
  });

  console.log('\n' + '═'.repeat(60));
  console.log(`\n⚠️  Found ${totalIssues} issue(s) in ${fileCount} file(s)\n`);
  console.log('Theme variables available:');
  console.log('  Backgrounds: --bg-primary, --bg-secondary, --bg-card');
  console.log('  Text: --text-primary, --text-body, --text-muted');
  console.log('  Accent: --accent-orange, --accent-orange-light');
  console.log('  Semantic: --danger, --danger-light, --success, --success-light');
  console.log('  Charts: --chart-primary, --chart-secondary, --chart-accent, --chart-muted');
  console.log('  Categories: --category-amyloid, --category-vascular, --category-metabolic, etc.');
  console.log('  Border: --border');
  console.log('');
}

main();
