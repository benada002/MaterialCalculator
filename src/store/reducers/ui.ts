import { UPDATE_UI, UiActionTypes } from '../../interfaces/uiActions';

const initialState = {
    isLoading: false,
    error: '',
    currentModalComponent: ''
}

export default function (state = initialState, action: UiActionTypes) {
    if (action.type === UPDATE_UI) {
      state = {
          ...state,
          ...action.value
      }
    }

    return state
  }