import * as Actions from "../actions/Actions";
import * as Util from '../../lib/Util/Util';
import { UserState } from "../../lib/State/UserState";
import { Action } from "redux";
import { Transaction, Category } from "@hyperbudget/hyperbudget-core";
import { APIError } from "../../lib/APIError/APIError";

const initialState: UserState = (() => {
    return {
        email: window.localStorage.getItem('email') || window.sessionStorage.getItem('email') || null,
        isLoggedIn: false,
        transactions: [],
        categories: [],
        txnPassword: '',
        APIError: null,
    };
})();

export interface UserAction extends Action  {
    params?: {
        email?: string,
        transactions?: Transaction[],
        categories?: Category[],
        password?: string,
        txnPassword?: string,
        error?: APIError,
    }
};

export const UserReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case Actions.ActionTypes.DO_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                email: action.params.email,
                APIError: null,
            };
        case Actions.ActionTypes.SET_TRANSACTION_PASSWORD:
        return {
          ...state,
          txnPassword: action.params.txnPassword
        }
        case Actions.ActionTypes.SET_TRANSACTIONS_AND_CATEGORIES:
        return {
            ...state,
            transactions: action.params.transactions,
            categories: action.params.categories,
            txnPassword: action.params.txnPassword,
            APIError: null,
        }
        case Actions.ActionTypes.API_ERROR:
        return {
            ...state,
            APIError: action.params.error,
            email: state.APIError && state.APIError.type === 'auth' ? null : state.email,
        }
        case Actions.ActionTypes.DO_LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          email: null,
          txnPassword: null,
          transactions: [],
          categories: [],
        }
    }

    return state;
}
