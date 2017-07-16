import { combineReducers } from 'redux';
import app from './app';
import header from './header';

const reducers = combineReducers({
    app,
    header,
});

export default reducers;
