import * as Actions from "../actions/Actions";
import * as Util from '../../lib/Util/Util';

const initialState = (() => {
    let token = Util.get_token_from_session();
    return {
        token: token,
        isLoggedIn: !!token,
        transactions: [],
        categories: [],
        txn_password: '',
        login_errors: null,
    };
})();

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.ActionTypes.DO_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.params.token,
                login_error: null,
            };
        case Actions.ActionTypes.SET_TRANSACTIONS_AND_CATEGORIES:
        return {
            ...state,
            transactions: action.params.transactions,
            categories: action.params.categories,
            txn_password: action.params.password,
            login_errors: null,
        }
        case Actions.ActionTypes.LOGIN_ERROR:
        return {
            ...state,
            login_errors: action.params.error,
        }
    }

    return state;
}