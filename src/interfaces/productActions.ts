import { IProduct } from './product';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export interface IAddProductAction {
    type: typeof ADD_PRODUCT;
    id:number;
    product: IProduct
}

export interface IUpdateProductAction {
    type: typeof UPDATE_PRODUCT;
    id: number;
    product: IProduct
}

export interface IDeleteProductAction {
    type: typeof DELETE_PRODUCT;
    ids: number[];
}

export type ProductActionTypes = IAddProductAction | IUpdateProductAction | IDeleteProductAction;
