import { IProduct } from './product';
import { IMaterial } from './material';
import rootReducer from '../store/reducers';

export type IProductState = Map<number, IProduct>
export type IMaterialState = Map<number, IMaterial>
export type ISettingState = Map<string, any>
export type IUiState = {
    isLoading: boolean,
    error: string
}

export type StateTypes = IProductState | IMaterialState | ISettingState;
export type StateSingleTypes = IMaterial & IProduct;
export type RootState = ReturnType<typeof rootReducer>
