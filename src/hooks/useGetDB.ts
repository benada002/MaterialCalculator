import {useEffect} from 'react';
import { StoreNames } from 'idb';

import {getDBItems} from '../store/actions/asyncActions';
import {addMaterial} from '../store/actions/materials'
import {addProduct} from '../store/actions/products'
//import {add} from '../store/actions/settings'
import store from '../store'
import { IMaterialCalculatorDB } from '../interfaces/db';

export const useDB = (storeName: StoreNames<IMaterialCalculatorDB>) => {
  const actions = {
    materials: addMaterial,
    products: addProduct
  }
  useEffect( () => {
    // @ts-ignore
    store.dispatch(getDBItems(storeName, actions[storeName]));
  }, [])
}