import { IProduct } from './product';
import { IMaterial } from './material';

interface IDelete {
    confirm?: boolean,
    cancel?: boolean
}

export interface IForm {
    currProduct: IProduct,
    currMaterial: IMaterial
    deleteCurrent: IDelete,
}

export type IFormValues = IProduct | IMaterial | IDelete;
