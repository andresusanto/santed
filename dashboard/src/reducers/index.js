import { combineReducers } from 'redux';
import app from './app';
import header from './header';
import workforce from './workforce';
import leave from './leave';
import redTicket from './redticket';
import license from './license';
import clocking from './clocking';
import project from './project';
import create from './create';

const reducers = combineReducers({
    app,
    header,
    workforce,
    leave,
    redTicket,
    license,
    clocking,
    project,
    create,
});

export default reducers;
