'use strict';

import { Map, List } from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as constants from '../actions/constants';

const loan = function ( state = List([ Map() ]), action ) {
    let newState;
    let loanMap;
    console.log(state.last(), action.type);
    switch ( action.type ) {
        case constants.LOAN_AMOUNT:
            loanMap = state.last();
            newState = loanMap.set('amount', action.amount);
            return state.push(newState);
        case constants.LOAN_MONTHLY:
            loanMap = state.last();
            newState = loanMap.set('monthly', action.monthly);
            return state.push(newState);
        case constants.LOAN_APR:
            loanMap = state.last();
            newState = loanMap.set('apr', action.apr);
            return state.push(newState);
        case constants.LOAN_DURATION:
            loanMap = state.last();
            newState = loanMap.set('duration', action.duration);
            return state.push(newState);
        default:
            return state;
    }
};

/*const total = function ( state = Map(), action ) {
    switch ( action.type ) {
        case constants.LOAN_TOTAL:
            let period = state.get(action.period) || List();
            return period.push(period.last() + action.loan);
        default:
            return state;
    }
};*/

const progress = function ( state = 0, action ) {
    switch ( action.type ) {
        case constants.PROGRESS_INC:
            return state + 1;
        case constants.PROGRESS_DEC:
            return state && state -1 || state;
        default:
            return state;
    }
};

/*const progress = function ( state = List([ 0 ]), action ) {
    switch ( action.type ) {
        case 'INCREMENT':
            return state.push(state.last() + 1);
        case 'DECREMENT':
            return state.push(state.last() && state.last() - 1 || 0);
        default:
            return state;
    }
};*/

const rootReducer = combineReducers({
    loan,
    progress,
    routing: routerReducer
});

export default rootReducer;
