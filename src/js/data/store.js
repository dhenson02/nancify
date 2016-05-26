'use strict';

import { Map, List } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';

/**
 * For redux devtools in chrome
 */
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const defaults = {
    loan: List([
        Map({
            amount: 0.00,
            monthly: 0.00,
            apr: 0.00,
            duration: 0
        })
    ]),
    progress: 0
};

const middleware = routerMiddleware(browserHistory);

export const store = createStore(
    rootReducer,
    defaults,
    enhancers,
    applyMiddleware(middleware)
);

export const history = syncHistoryWithStore(browserHistory, store);
