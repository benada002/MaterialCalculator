import { IForm } from '../../interfaces/form';
import { UPDATE_FORM, RESET_FORM, FormActionTypes } from '../../interfaces/formActions';

export const eb = null;

const initialState: IForm = {
  currProduct: {
    name: '',
    parts: [],
    sizes: new Map(),
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
