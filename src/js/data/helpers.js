'use strict';

import { Map } from 'immutable';

export const interestPerMonth = function ( apr ) {
    return ( apr / 12 ) / 100;
};

export const calcMonthly = function ( total, duration ) {
    return total / duration;
};

export const calcTotal = function ( amount, apr, duration ) {
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

export const getStatus = function ( state ) {
    const duration = state.get('duration');
    const amount = state.get('amount');
    const apr = state.get('apr');
    // console.log(duration, amount, apr);
    let total = calcTotal(amount, apr, duration);
    let monthly = calcMonthly(total, duration);
    console.log(monthly, total);
    return Map({
        total,
        remaining: amount - ( monthly * duration )
    });
};
