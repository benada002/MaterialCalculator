export const ADD_KEY_VAL = 'ADD_KEY_VAL';
export const DELETE_KEY_VAL = 'DELETE_KEY_VAL';
export const UPDATE_KEY_VAL = 'UPDATE_KEY_VAL';

export interface IAddKeyValAction {
    type: typeof ADD_KEY_VAL;
    key: number|string;
    value: any
}

export interface IUpdateKeyValAction {
    type: typeof UPDATE_KEY_VAL;
    key: number|string;
    value: any
}

export interface IDeleteKeyValAction {
    type: typeof DELETE_KEY_VAL;
    keys: string[]|number[];
}

export type KeyValActionTypes = IAddKeyValAction | IUpdateKeyValAction | IDeleteKeyValAction;
