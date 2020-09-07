import { IFormValues } from './form';

export const RESET_FORM = 'RESET_FORM';
export const UPDATE_FORM = 'UPDATE_FORM';

export interface IUpdateFormAction {
    type: typeof UPDATE_FORM;
    key: string;
    value: IFormValues
}

export interface IResetFormAction {
    type: typeof RESET_FORM;
    key: string;
}

export type FormActionTypes = IUpdateFormAction | IResetFormAction;
