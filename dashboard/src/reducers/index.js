import { combineReducers } from 'redux';
import app from './app';
import header from './header';
import workforce from './workforce';

const reducers = combineReducers({
    app,
    header,
    workforce,
});

export default reducers;
