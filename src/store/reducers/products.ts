import {
  ProductActionTypes, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT,
} from '../../interfaces/productActions';
import { IProductState } from '../../interfaces/state';

export default function (state: IProductState = new Map(), action: ProductActionTypes) {
  switch (action.type) {
    case ADD_PRODUCT:
      state.set(action.id, action.product);
      return new Map(state.entries());
    case UPDATE_PRODUCT:
      state.set(action.id, { ...state.get(action.id), ...action.product });
      return new Map(state.entries());
    case DELETE_PRODUCT:
      action.ids.forEach((id) => state.delete(id));
      return new Map(state.entries());
    default:
      return state;
  }
}
