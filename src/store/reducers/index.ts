import { combineReducers } from 'redux';

import products from './products';
import materials from './materials';
import settings from './settings';
import ui from './ui'
import forms from './forms'

export default combineReducers({
    products,
    materials,
    settings,
    forms,
    ui
});
