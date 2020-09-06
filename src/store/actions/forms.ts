import { FormActionTypes, RESET_FORM, UPDATE_FORM } from '../../interfaces/formActions';
import { IFormValues } from '../../interfaces/form';
import { initialState } from '../reducers/forms';

export const resetForm = (key: keyof typeof initialState): FormActionTypes => ({
  type: RESET_FORM,
  key,
});

export const updateFrom = (
  key: keyof typeof initialState, value: IFormValues,
): FormActionTypes => ({
  type: UPDATE_FORM,
  key,
  value,
});
