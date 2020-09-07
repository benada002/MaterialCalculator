import { IMaterial } from '../../interfaces/material';
import {
  ADD_MATERIAL, UPDATE_MATERIAL, DELETE_MATERIAL, MaterialActionTypes,
} from '../../interfaces/materialActions';

export const addMaterial = (id: number, material: IMaterial): MaterialActionTypes => ({
  type: ADD_MATERIAL,
  id,
  material,
});

export const deleteMaterial = (keys: number[]): MaterialActionTypes => ({
  type: DELETE_MATERIAL,
  keys,
});

export const updateMaterial = (id: number, value: IMaterial): MaterialActionTypes => ({
  type: UPDATE_MATERIAL,
  id,
  material: value,
});
