export enum ActionTypes {
    DO_LOGIN = 'DO_LOGIN',
}

export const do_login = () => {
    return {
        type: ActionTypes.DO_LOGIN
    };
};