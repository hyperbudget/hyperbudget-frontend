import * as User from '../../lib/User/User';

export enum ActionTypes {
    DO_LOGIN = 'DO_LOGIN',
    SET_TRANSACTIONS_AND_CATEGORIES = 'SET_TRANSACTIONS_AND_CATEGORIES',
    LOGIN_ERROR = 'LOGIN_ERROR',
}

export interface LoginParams {
    username: string;
    password: string;
}

export interface RegisterParams {
    username: string;
    firstname: string;
    password: string;
}

export interface AuthenticatedParams {
    token: string;
}

export interface TransactionParams extends AuthenticatedParams {
    password: string;
}

export const do_login = (params: LoginParams) => {
    return dispatch => {
        User.login({
            email: params.username,
            password: params.password,
        }).then((res) => {
            dispatch({ type: ActionTypes.DO_LOGIN, params: { token: res.data.token } });
        });
    };
};

export const do_register = (params: RegisterParams) => {
    return dispatch => {
        User.register({
            firstname: params.firstname,
            email: params.username,
            password: params.password,
        })
        .then(() => (
            User.login({
                email: params.username,
                password: params.password,
            })
        ))
        .then((res) => {
            dispatch({ type: ActionTypes.DO_LOGIN, params: { token: res.data.token } });
        });
    };
};

export const get_transactions = (params: TransactionParams) => {
    return dispatch => {
        User.get_categories_and_transactions({ password: params.password, token: params.token })
        .then(
            catandtxn => dispatch({
                type: ActionTypes.SET_TRANSACTIONS_AND_CATEGORIES,
                params: {
                    ...catandtxn,
                    password: params.password,
                }
            }),
            err => {
                dispatch({
                    type: ActionTypes.LOGIN_ERROR,
                    params: {
                        error: err.response.data.error,
                    }
                })
            },
        );
    };
};