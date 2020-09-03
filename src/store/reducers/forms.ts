import { IForm } from '../../interfaces/form';
import { UPDATE_FORM, RESET_FORM, FormActionTypes } from '../../interfaces/formActions';

export const eb = null;

const initialState: IForm = {
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
      state = {
        ...state,
        [action.key]: {
          // @ts-ignore
          ...state[action.key],
          ...Object.entries(action.value).map(([key, value]) => {
            // @ts-ignore
            if(typeof state[action.key][key] === 'object' && state[action.key][key] !== null && !Array.isArray(state[action.key][key])) {
              // @ts-ignore
              return {[key]: {...state[action.key][key], ...value}}
            }

            return {[key]: value}
          })[0],
        },
      };
      break;
    case RESET_FORM:
      state = {
        ...state,
        // @ts-ignore
        [action.key]: initialState[action],
      };
      break;
  }
  /* eslint-enable */

  return state;
}
