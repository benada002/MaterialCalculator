import { IProduct } from '../../interfaces/product';
import {
  ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, ProductActionTypes,
} from '../../interfaces/productActions';

export const addProduct = (id: number, product: IProduct):ProductActionTypes => ({
  type: ADD_PRODUCT,
  id,
  product,
});

export const deleteProduct = (ids: Array<number>):ProductActionTypes => ({
  type: DELETE_PRODUCT,
  ids,
});

export const updateProduct = (id: number, product: IProduct): ProductActionTypes => ({
  type: UPDATE_PRODUCT,
  id,
  product,
});
