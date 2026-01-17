import { describe, it, expect } from 'vitest';
import { patentedDrugs, genericDrugs, allDrugs, comparisonData, investmentData } from './drugs';
import type { Drug, ComparisonRow } from '@/types';

describe('Drug Data Integrity', () => {
  describe('allDrugs', () => {
    it('contains all patented and generic drugs', () => {
      expect(allDrugs.length).toBe(patentedDrugs.length + genericDrugs.length);
    });

    it('has no duplicate IDs', () => {
      const ids = allDrugs.map(d => d.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('patentedDrugs', () => {
    it('has required fields for each drug', () => {
      patentedDrugs.forEach((drug: Drug) => {
        expect(drug.id).toBeDefined();
        expect(typeof drug.id).toBe('string');
        expect(drug.id.length).toBeGreaterThan(0);

        expect(drug.name).toBeDefined();
        expect(typeof drug.name).toBe('string');
        expect(drug.name.length).toBeGreaterThan(0);

        expect(drug.type).toBeDefined();
        expect(['patented', 'generic', 'supplement', 'biosimilar']).toContain(drug.type);

        expect(drug.investment).toBeDefined();
        expect(typeof drug.investment).toBe('number');
        expect(drug.investment).toBeGreaterThan(0);

        expect(drug.annualCost).toBeDefined();
        expect(typeof drug.annualCost).toBe('number');
        expect(drug.annualCost).toBeGreaterThanOrEqual(0);

        expect(drug.fdaStatus).toBeDefined();
        expect(['approved', 'pending', 'no-pathway']).toContain(drug.fdaStatus);

        expect(drug.evidenceStrength).toBeDefined();
        expect(drug.evidenceStrength).toBeGreaterThanOrEqual(1);
        expect(drug.evidenceStrength).toBeLessThanOrEqual(5);

        expect(drug.outcome).toBeDefined();
        expect(typeof drug.outcome).toBe('string');

        expect(drug.mechanism).toBeDefined();
        expect(typeof drug.mechanism).toBe('string');

        expect(drug.keyStudyYear).toBeDefined();
        expect(typeof drug.keyStudyYear).toBe('number');
        expect(drug.keyStudyYear).toBeGreaterThan(1990);
        expect(drug.keyStudyYear).toBeLessThanOrEqual(new Date().getFullYear() + 1);
      });
    });

    it('all have patented type', () => {
      patentedDrugs.forEach(drug => {
        expect(drug.type).toBe('patented');
      });
    });
  });

  describe('genericDrugs', () => {
    it('has required fields for each drug', () => {
      genericDrugs.forEach((drug: Drug) => {
        expect(drug.id).toBeDefined();
        expect(drug.name).toBeDefined();
        expect(drug.type).toBeDefined();
        expect(drug.investment).toBeDefined();
        expect(drug.annualCost).toBeDefined();
        expect(drug.fdaStatus).toBeDefined();
        expect(drug.evidenceStrength).toBeDefined();
        expect(drug.outcome).toBeDefined();
        expect(drug.mechanism).toBeDefined();
        expect(drug.keyStudyYear).toBeDefined();
      });
    });

    it('investment amounts are positive numbers', () => {
      genericDrugs.forEach(drug => {
        expect(drug.investment).toBeGreaterThan(0);
      });
    });

    it('annual costs are non-negative', () => {
      genericDrugs.forEach(drug => {
        expect(drug.annualCost).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

describe('Comparison Data', () => {
  it('has required fields for each row', () => {
    comparisonData.forEach((row: ComparisonRow) => {
      expect(row.category).toBeDefined();
      expect(typeof row.category).toBe('string');

      expect(row.patented).toBeDefined();
      expect(typeof row.patented).toBe('string');

      expect(row.generic).toBeDefined();
      expect(typeof row.generic).toBe('string');
    });
  });

  it('has source IDs where specified', () => {
    comparisonData.forEach(row => {
      if (row.sourceId) {
        expect(typeof row.sourceId).toBe('string');
        expect(row.sourceId.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('Investment Data', () => {
  it('has valid patented investment data', () => {
    expect(investmentData.patented.total).toBeDefined();
    expect(investmentData.patented.total).toBeGreaterThan(0);
    expect(investmentData.patented.label).toBeDefined();
    expect(investmentData.patented.examples).toBeDefined();
    expect(Array.isArray(investmentData.patented.examples)).toBe(true);
    expect(investmentData.patented.examples.length).toBeGreaterThan(0);
  });

  it('has valid repurposed data', () => {
    expect(investmentData.repurposed.label).toBeDefined();
    expect(investmentData.repurposed.examples).toBeDefined();
    expect(Array.isArray(investmentData.repurposed.examples)).toBe(true);
  });

  it('has valid phase 3 cost', () => {
    expect(investmentData.phase3Cost).toBeGreaterThan(0);
  });

  it('has valid NIH AD budget', () => {
    expect(investmentData.nihAdBudget).toBeGreaterThan(0);
  });

  it('has source IDs', () => {
    expect(Array.isArray(investmentData.sourceIds)).toBe(true);
    expect(investmentData.sourceIds.length).toBeGreaterThan(0);
  });
});
