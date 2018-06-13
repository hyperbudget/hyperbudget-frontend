import * as Actions from "../actions/Actions";

const initialState = {};

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