import * as User from '../../lib/User/User';

export enum ActionTypes {
    DO_LOGIN = 'DO_LOGIN',
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