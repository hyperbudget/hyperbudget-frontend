import * as Actions from "../actions/Actions";
import * as Util from '../../lib/Util/Util';

const initialState = (() => {
    let token = Util.get_token_from_session();
    return {
        token: token,
        isLoggedIn: !!token,
    };
})();

export const UserReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case Actions.ActionTypes.DO_LOGIN:
        return {
            ...state,
            isLoggedIn: true,
            token: action.params.token,
        };
    }

    return state;
}