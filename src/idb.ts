import { openDB } from 'idb';

import { IMaterialCalculatorDB } from './interfaces/db';

export default async function () {
  return openDB<IMaterialCalculatorDB>('MaterialCalculator', 1, {
    upgrade(db) {
      const products = db.createObjectStore('products', {
        keyPath: 'id',
        autoIncrement: true,
      });
      products.createIndex('name', 'name');

      const materials = db.createObjectStore('materials', {
        keyPath: 'id',
        autoIncrement: true,
      });
      materials.createIndex('manufacturer', 'manufacturer');

      db.createObjectStore('settings');
    },
  });
}
