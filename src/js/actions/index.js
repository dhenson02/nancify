'use strict';

import * as constants from './constants';

export const loanAmount = function ( amount ) {
    return {
        type: constants.LOAN_AMOUNT,
        amount
    };
};

export const loanMonthly = function ( monthly ) {
    return {
        type: constants.LOAN_MONTHLY,
        monthly
    };
};

export const loanAPR = function ( apr ) {
    return {
        type: constants.LOAN_APR,
        apr
    };
};

export const loanDuration = function ( duration ) {
    return {
        type: constants.LOAN_DURATION,
        duration
    };
};

export const loanStatus = function ( period, remaining, total ) {
    return {
        type: constants.LOAN_STATUS,
        period: parseInt(period, 10),
        loan: Map({
            'remaining': parseFloat(remaining),
            'total': parseFloat(total)
        })
    };
};

/*export const loanTotal = function ( total, period ) {
    return {
        type: constants.LOAN_TOTAL,
        total: parseFloat(total),
        period: parseInt(period, 10)
    };
};*/

export const progressChange = function ( increase ) {
    return {
        type: increase === true ?
              'INCREMENT_PROGRESS' :
              'DECREMENT_PROGRESS'
    };
};
