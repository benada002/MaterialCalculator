import { ProductActionTypes, IDeleteProductAction } from './productActions';
import { MaterialActionTypes, IDeleteMaterialAction } from './materialActions';
import { UiActionTypes } from './uiActions';

export type AppActions = ProductActionTypes | MaterialActionTypes | UiActionTypes;

export type DeleteActions = IDeleteProductAction | IDeleteMaterialAction;
