import * as User from '../../lib/User/User';
import { Dispatch } from 'react-redux';
import { UserAction } from '../reducers/UserReducer';

export enum ActionTypes {
  DO_LOGIN = 'DO_LOGIN',
  SET_TRANSACTIONS_AND_CATEGORIES = 'SET_TRANSACTIONS_AND_CATEGORIES',
  SET_TRANSACTION_PASSWORD = 'SET_TRANSACTION_PASSWORD',
  API_ERROR = 'API_ERROR',
  DO_LOGOUT = 'DO_LOGOUT',
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface AuthenticatedParams {
  token: string;
}

export interface TransactionParams extends AuthenticatedParams {
  txnPassword: string;
}

export const do_register = (params: RegisterParams) => {
  return (dispatch: Dispatch<UserAction>) => {
    User.register({
      firstname: params.firstname,
      email: params.username,
      password: params.password,
      lastname: params.lastname,
    })
    .then(() => (
      User.get_categories_and_transactions({ password: params.password, token: params.username })
      .then(
        catandtxn => {
          dispatch({
            type: ActionTypes.DO_LOGIN,
            params: {
              token: params.username
            }
          });
          dispatch({
            type: ActionTypes.SET_TRANSACTIONS_AND_CATEGORIES,
            params: {
              ...catandtxn,
              txnPassword: params.password
            }
          });
        },
      )
    ),
    err => {
        dispatch({
          type: ActionTypes.API_ERROR,
          params: {
            error: err.response.data.error,
          }
        })
      }
    )
  };
};

export const get_transactions = (params: TransactionParams) => {
  return (dispatch: Dispatch<UserAction>) => {
    User.get_categories_and_transactions({ password: params.txnPassword, token: params.token })
    .then(
      catandtxn => {
        dispatch({
          type: ActionTypes.DO_LOGIN,
          params: {
            token: params.token
          }
        });
        dispatch({
          type: ActionTypes.SET_TRANSACTIONS_AND_CATEGORIES,
          params: {
            ...catandtxn,
            txnPassword: params.txnPassword,
          }
        });
      },
      err => {
        dispatch({
          type: ActionTypes.API_ERROR,
          params: {
            error: err.response.data.error,
          }
        })
      },
    );
  };
};
