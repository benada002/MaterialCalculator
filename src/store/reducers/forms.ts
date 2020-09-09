import { IForm } from '../../interfaces/form';
import { UPDATE_FORM, RESET_FORM, FormActionTypes } from '../../interfaces/formActions';

export const eb = null;

export const initialState: IForm = {
  currProduct: {
    name: '',
    parts: [],
    sizes: {},
  },
  currMaterial: {
    name: '',
    manufacturer: '',
    // @ts-ignore
    width: '',
    // @ts-ignore
    fLength: '',
    // @ts-ignore
    price: '',
  },
  deleteCurrent: {
    confirm: false,
    cancel: false,
  },
};

export default function (state = initialState, action: FormActionTypes) {
  /* eslint-disable */
  switch (action.type) {
    case UPDATE_FORM:
      Object.entries(action.value).forEach(([key, value]) => {
        // @ts-ignore
        if(!state[action.key]) return;
        // @ts-ignore
        if (typeof state[action.key][key] === 'object' && state[action.key][key] !== null && !Array.isArray(state[action.key][key])) {
          // @ts-ignore
          action.value[key] = { ...state[action.key][key], ...value };
        }
      });

      state = {
        ...state,
        [action.key]: {
          // @ts-ignore
          ...state[action.key],
          ...action.value,
        },
      };
      break;
    case RESET_FORM:
      state = {
        ...state,
        // @ts-ignore
        [action.key]: initialState[action.key],
      };
      break;
  }
  /* eslint-enable */

  return state;
}
