import {
  MaterialActionTypes, ADD_MATERIAL, UPDATE_MATERIAL, DELETE_MATERIAL,
} from '../../interfaces/materialActions';
import { IMaterialState } from '../../interfaces/state';

export default function (state: IMaterialState = new Map(), action: MaterialActionTypes) {
  switch (action.type) {
    case ADD_MATERIAL:
      state.set(action.id, action.material);
      return new Map(state.entries());
    case UPDATE_MATERIAL:
      state.set(action.id, { ...state.get(action.id), ...action.material });
      return new Map(state.entries());
    case DELETE_MATERIAL:
      action.keys.forEach((id) => state.delete(id));
      return new Map(state.entries());
    default:
      return state;
  }
}
