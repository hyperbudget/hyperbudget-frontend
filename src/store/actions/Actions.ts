import * as User from '../../lib/User/User';

export enum ActionTypes {
    DO_LOGIN = 'DO_LOGIN',
}

export const do_login = () => {
    return dispatch => {
        User.login({
            email: 'email@me.com',
            password: 'passpasspass',
        }).then((res) => {
            dispatch({ type: ActionTypes.DO_LOGIN, params: { token: res.data.token } });
        });
    };
};