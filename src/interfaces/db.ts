import { DBSchema } from 'idb';

import { IMaterial } from './material';
import { IProduct } from './product';
import { IKeyVal } from './key-val';

export interface IMaterialCalculatorDB extends DBSchema {
    products: {
        value: IProduct;
        key: number;
        indexes: { 'name': string };
    };
    materials: {
        value: IMaterial;
        key: number;
        indexes: { 'manufacturer': string };
    };
    'settings': IKeyVal;
}
