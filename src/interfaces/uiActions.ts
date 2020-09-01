import { IUi } from './ui';

export const UPDATE_UI = 'UPDATE_UI';

export interface IUpdateUi {
    type: typeof UPDATE_UI;
    value: IUi
}

export type UiActionTypes = IUpdateUi;
