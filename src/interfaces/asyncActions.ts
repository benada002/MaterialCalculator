import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppActions } from './appActions';
import { RootState } from './state';

export type AsyncAction = ThunkAction<Promise<void>, RootState, null, AppActions>
