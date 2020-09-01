import { ThunkDispatch } from 'redux-thunk';
import {
  StoreNames, StoreKey, StoreValue,
} from 'idb';

import { IMaterialCalculatorDB } from '../../interfaces/db';
import { AppActions } from '../../interfaces/appActions';
import { StateSingleTypes } from '../../interfaces/state';
import { AsyncAction } from '../../interfaces/asyncActions';
import { updateUi } from './ui';
import getDB from '../../idb';

export const getDBItems = (
  storeName: StoreNames<IMaterialCalculatorDB>,
  action: (id: number, storeContent: StateSingleTypes) => AppActions,
): AsyncAction => async (dispatch: ThunkDispatch<{}, {}, AppActions>): Promise<void> => {
  dispatch(updateUi({ isLoading: true }));

  try {
    const db = await getDB();
    let cursor = await db.transaction(storeName, 'readonly').objectStore(storeName).openCursor();

    while (cursor) {
      dispatch(action(cursor.value.id, cursor.value));
      // eslint-disable-next-line
      cursor = await cursor.continue();
    }
  } catch (error) {
    console.log(error);
  }

  dispatch(updateUi({ isLoading: false }));
};

export const addDBItem = (
  storeName: StoreNames<IMaterialCalculatorDB>,
  value: StoreValue<IMaterialCalculatorDB, StoreNames<IMaterialCalculatorDB>>,
  action: (id: number & string, storeContent: StateSingleTypes) => AppActions,
): AsyncAction => async (dispatch: ThunkDispatch<{}, {}, AppActions>, getState): Promise<void> => {
  try {
    const db = await getDB();
    const addedValue = await db.add(storeName, value);

    // @ts-ignore
    const storeContent = new Map([...getState().materials.entries()]);
    // @ts-ignore
    storeContent.set(addedValue, value);

    // @ts-ignore
    dispatch(action(addedValue, storeContent));
  } catch (error) {
    console.log(error);
  }
};

export const updateDBItem = (
  storeName: StoreNames<IMaterialCalculatorDB>,
  key: StoreKey<IMaterialCalculatorDB, StoreNames<IMaterialCalculatorDB>>,
  value: StoreValue<IMaterialCalculatorDB, StoreNames<IMaterialCalculatorDB>>,
  action: (id: any, value: StateSingleTypes) => AppActions,
): AsyncAction => async (dispatch: ThunkDispatch<{}, {}, AppActions>): Promise<void> => {
  try {
    const db = await getDB();
    await db.put(storeName, value);

    dispatch(action(key, value));
  } catch (error) {
    console.log(error);
  }
};

export const deleteDBItem = (
  storeName: StoreNames<IMaterialCalculatorDB>,
  keys: StoreKey<IMaterialCalculatorDB, StoreNames<IMaterialCalculatorDB>>[],
  action: (keys: any[]) => AppActions,
): AsyncAction => async (dispatch: ThunkDispatch<{}, {}, AppActions>): Promise<void> => {
  try {
    const db = await getDB();

    keys.forEach(async (key) => {
      await db.delete(storeName, key);

      // @ts-ignore
      dispatch(action(keys));
    });
  } catch (error) {
    console.log(error);
  }
};
