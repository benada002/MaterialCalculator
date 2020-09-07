import { IMaterial } from './material';

export const ADD_MATERIAL = 'ADD_MATERIAL';
export const DELETE_MATERIAL = 'DELETE_MATERIAL';
export const UPDATE_MATERIAL = 'UPDATE_MATERIAL';

export interface IAddMaterialAction {
    type: typeof ADD_MATERIAL;
    id: number;
    material: IMaterial
}

export interface IUpdateMaterialAction {
    type: typeof UPDATE_MATERIAL;
    id: number;
    material: IMaterial
}

export interface IDeleteMaterialAction {
    type: typeof DELETE_MATERIAL;
    keys: number[];
}

export type MaterialActionTypes = IAddMaterialAction
| IUpdateMaterialAction
| IDeleteMaterialAction;
