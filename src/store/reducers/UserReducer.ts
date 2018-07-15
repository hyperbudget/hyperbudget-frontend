import * as Actions from "../actions/Actions";
import * as Util from '../../lib/Util/Util';
import { UserState } from "../../lib/State/UserState";
import { Action } from "redux";
import { Transaction, Category } from "@hyperbudget/hyperbudget-core";
import { APIError } from "../../lib/APIError/APIError";

const initialState: UserState = (() => {
    let token = Util.get_token_from_session();
    return {
        token: token,
        isLoggedIn: !!token,
        transactions: [],
        categories: [],
        txnPassword: '',
        loginErrors: null,
    };
})();

export interface UserAction extends Action  {
    params: {
        token?: string,
        transactions?: Transaction[],
        categories?: Category[],
        password?: string,
        txnPassword?: string,
        error?: APIError[],
    }
};

export const UserReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case Actions.ActionTypes.DO_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.params.token,
                loginErrors: null,
            };
        case Actions.ActionTypes.SET_TRANSACTIONS_AND_CATEGORIES:
        return {
            ...state,
            transactions: action.params.transactions,
            categories: action.params.categories,
            txnPassword: action.params.txnPassword,
            loginErrors: null,
        }
        case Actions.ActionTypes.LOGIN_ERROR:
        console.log(action);
        return {
            ...state,
            loginErrors: action.params.error,
            token: !!action.params.error.find(e => e.type && e.type === 'auth') ? null : state.token,
        }
        case Actions.ActionTypes.DO_LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          token: null,
          txnPassword: null,
        }
    }

    return state;
}
