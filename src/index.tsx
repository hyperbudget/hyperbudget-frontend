import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { UserReducer } from "./store/reducers/UserReducer";

import 'bootstrap';

import { App } from "./components/App";

const rootReducer = combineReducers({
    user: UserReducer,
});

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("hyperbudget-frontend-app")
);
