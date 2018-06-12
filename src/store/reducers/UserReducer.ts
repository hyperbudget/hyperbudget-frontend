import { Actions } from "../actions/Actions";

const initialState = {};

export const UserReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case Actions.DO_LOGIN:
        return {
            ...state,
            isLoggedIn: true,
        };
    }

    return state;
}