import { openDB, DBSchema } from 'idb';

interface Part {
    name: string;
    size: number;
}

interface Sizes {
    size: number | string;
    parts: Array<Part>
}

interface MaterialCalculatorDB extends DBSchema {
    products: {
        value: {
            id?: number;
            name: string;
            parts: Array<string>;
            sizes: Array<Sizes>;
        };
        key: number;
        indexes: { 'name': string };
    };
    materials: {
        value: {
            id?: number;
            name: string;
            manufacturer: string;
            width: number;
            fLength: number;
            price: number;
        };
        key: number;
        indexes: { 'manufacturer': string };
    };
    'settings': {
        key: string;
        value: any;
    };
}

async function getDB() {
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  return openDB<MaterialCalculatorDB>('MaterialCalculator', 1, {
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

export default getDB;
