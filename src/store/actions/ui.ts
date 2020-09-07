import { IUi } from '../../interfaces/ui';
import { UPDATE_UI, UiActionTypes } from '../../interfaces/uiActions';

export const updateUi = (value: IUi): UiActionTypes => ({
  type: UPDATE_UI,
  value,
});

export const updateUiModal = (component = ''): UiActionTypes => ({
  type: UPDATE_UI,
  value: {
    currentModalComponent: component,
  },
});
