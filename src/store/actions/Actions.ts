import * as User from '../../lib/User/User';

export enum ActionTypes {
    DO_LOGIN = 'DO_LOGIN',
}

export interface LoginParams {
    username: string;
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