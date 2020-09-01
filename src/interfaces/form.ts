import { IProduct } from './product';
import { IMaterial } from './material';

interface IDeleteAction {
    confirm: boolean,
    cancel: boolean
}

export interface IForm {
    currProduct: IProduct,
    currMaterial: IMaterial
    deleteCurrent: IDeleteAction,
}

export type IFormValues = IProduct | IMaterial;
