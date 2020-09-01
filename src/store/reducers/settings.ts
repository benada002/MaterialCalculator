import {
  KeyValActionTypes, ADD_KEY_VAL, UPDATE_KEY_VAL, DELETE_KEY_VAL,
} from '../../interfaces/keyValActions';
import { ISettingState } from '../../interfaces/state';

export default function (state: ISettingState = new Map(), action: KeyValActionTypes) {
  switch (action.type) {
    case ADD_KEY_VAL:
      // @ts-ignore
      state.set(action.key, action.value);
      return new Map(state.entries());
    case UPDATE_KEY_VAL:
      // @ts-ignore
      state.set(action.id, { ...state.get(action.key), ...action.value });
      return new Map(state.entries());
    case DELETE_KEY_VAL:
      // @ts-ignore
      action.keys.forEach((key) => state.delete(key));
      return new Map(state.entries());
    default:
      return state;
  }
}
