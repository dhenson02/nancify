'use strict';

import { Map, List } from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as constants from '../actions/constants';

const settings = function ( state = Map(), action ) {
    switch ( action.type ) {
        case constants.LOAN_AMOUNT:
            return state.set('amount', action.amount);
        case constants.LOAN_MONTHLY:
            return state.set('monthly', action.monthly);
        case constants.LOAN_APR:
            return state.set('apr', action.apr);
        case constants.LOAN_DURATION:
            return state.set('duration', action.duration);
        default:
            return state;
    }
};

const interestPerMonth = function ( apr ) {
    return ( apr / 12 ) / 100;
};

const calcMonthly = function ( total, duration ) {
    return total / duration;
};

const calcTotal = function ( amount, apr, duration ) {
    let interestMonthly = interestPerMonth(apr);
    let interest = amount * interestMonthly;
    let interimTotal = amount;
    for ( let i = 0; i < duration; ++i ) {
        if ( i % 12 === 0 ) {
            interest = interimTotal * interestMonthly;
        }
        interimTotal = interimTotal - interest;
    }
    return amount + interest;
};

/*
var init = 27107.63;
var interim = 27107.63;
var apr = 0.0365 / 12;
var total = 0.0;
var count = 60;
var interest = 0.0;
var baseMonthly = init / count;

for ( var i = 0; i < count; ++i ) {
    interest = interim * apr;
    total = total + interest;
    interim = interim - interest;
}
*/

const status = function ( state = List(), action ) {
    switch ( action.type ) {
        case constants.LOAN_AMOUNT:
        case constants.LOAN_MONTHLY:
        case constants.LOAN_APR:
        case constants.LOAN_DURATION:
            let monthly = calcMonthly(action.amount, action.apr, action.duration);
            let paid = monthly * state.size;
            return state.set(action.period,
                Map({
                    remaining: monthly * duration - paid,
                    total: paid
                })
            );
        /*case constants.LOAN_STATUS:
            return state.set(action.period, action.loan);*/
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
        case 'INCREMENT_PROGRESS':
            return state + 1;
        case 'DECREMENT_PROGRESS':
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
    settings,
    status,
    // total,
    progress,
    routing: routerReducer
});

export default rootReducer;
