import { describe, expect, it } from 'vitest';
import { filterWorkshops } from '../src/workshops.js';

const items = [
  { id: 'react', title: 'Créer une interface avec l’IA', topic: 'React', seats: 12 },
  { id: 'quality', title: 'Tester avant de livrer', topic: 'Qualité', seats: 0 },
  { id: 'delivery', title: 'Publier avec GitHub Actions', topic: 'DevOps', seats: 8 },
];
const ids = (result) => result.map((item) => item.id);
describe('program search and availability', () => {
  it('shows all workshops for an empty search', () => {
    expect(ids(filterWorkshops(items, '', false))).toEqual(['react', 'quality', 'delivery']);
  });
  it('searches both the title and the topic', () => {
    expect(ids(filterWorkshops(items, 'react', false))).toEqual(['react']);
    expect(ids(filterWorkshops(items, 'tester', false))).toEqual(['quality']);
  });
  it('ignores case, surrounding spaces and accents', () => {
    expect(ids(filterWorkshops(items, ' GITHUB ', false))).toEqual(['delivery']);
    expect(ids(filterWorkshops(items, 'qualite', false))).toEqual(['quality']);
  });
  it('shows only workshops with a positive number of places', () => {
    expect(ids(filterWorkshops(items, '', true))).toEqual(['react', 'delivery']);
  });
  it('combines search and availability', () => {
    expect(filterWorkshops(items, 'qualité', true)).toEqual([]);
    expect(ids(filterWorkshops(items, 'react', true))).toEqual(['react']);
  });
  it('handles no match and an empty program', () => {
    expect(filterWorkshops(items, 'python', false)).toEqual([]);
    expect(filterWorkshops([], '', false)).toEqual([]);
  });
  it('preserves the order and the original data', () => {
    const frozen = Object.freeze(items.map((item) => Object.freeze({ ...item })));
    const before = structuredClone(frozen);
    expect(ids(filterWorkshops(frozen, '', true))).toEqual(['react', 'delivery']);
    expect(frozen).toEqual(before);
  });
});
