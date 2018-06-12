import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import { App } from "./components/App";
import { UserReducer } from "./store/reducers/UserReducer";

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] dispatching', action);
            const result = next(action);
            console.log('[Middleware], result', result);
            console.log('next state', store.getState());
            return result;
        }
    }
};

const rootReducer = combineReducers({
    user: UserReducer,
});

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(logger)
));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("example")
);
