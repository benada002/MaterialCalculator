import { FormActionTypes, RESET_FORM, UPDATE_FORM } from '../../interfaces/formActions';
import { IFormValues } from '../../interfaces/form';

export const resetForm = (key: string): FormActionTypes => ({
  type: RESET_FORM,
  key,
});

export const updateFrom = (key: string, value: IFormValues): FormActionTypes => ({
  type: UPDATE_FORM,
  key,
  value,
});
