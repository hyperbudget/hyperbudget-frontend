import axios from 'axios';

import * as Util from '../Util/Util';
import { Transaction, Category } from '@hyperbudget/hyperbudget-core';

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface AuthenticatedParams {
  email: string;
}

interface GetTransactionsParams extends AuthenticatedParams {
  password: string;
}

interface SetTransactionsParams extends GetTransactionsParams {
  transactions: Transaction[];
}

interface SetCategoriesParams extends GetTransactionsParams {
  categories: Category[],
};

interface ResetPasswordParams {
  userId: string;
  password: string;
  token: string;
};

export const register = (params: RegisterParams) : Promise<any> => {
  return axios.post(Util.api_url('/account/register'), params);
}

export const get_categories = (params: GetTransactionsParams) : Promise<Category[]> => {
  return new Promise((resolve, reject) => (
    axios.post(
      Util.api_url('/account/categories/list'),
      {
        ...params,
        'email': params.email,
      }
    ).then(
      (res) => {
        return resolve(res.data.categories);
      }, err => {
        return reject(err);
      }
    )
  ));
}

export const get_transactions = (params: GetTransactionsParams) : Promise<Transaction[]> => {
  return new Promise((resolve, reject) => (
    axios.post(
      Util.api_url('/account/transactions/list'),
      {
        ...params,
          email: params.email,
      }
    ).then(
      (res) => {
        return resolve(res.data.transactions);
      }, err => {
        return reject(err);
      }
    )
  ));
}

export const set_transactions = (params: SetTransactionsParams) : Promise<void> => {
  return new Promise((resolve, reject) => (
    axios.post(
      Util.api_url('/account/transactions/update'),
      {
        ...params,
        email: params.email,
      }
    ).then(
      (res) => {
        return resolve();
      }, err => {
        return reject(err);
      }
    )
  ));
}

export const set_categories = (params: SetCategoriesParams) : Promise<void> => {
  return new Promise((resolve, reject) => (
    axios.post(
      Util.api_url('/account/categories/update'),
      {
        ...params,
        email: params.email,
      },
    ).then(
      (res) => {
        return resolve();
      }, err => {
        return reject(err);
      }
    )
  ));
}

export const get_categories_and_transactions = (params: GetTransactionsParams) : Promise<{transactions: Transaction[], categories: Category[]}> => {
    return Promise.all([
        get_transactions(params),
        get_categories(params),
    ]).then(result => ({ transactions: result[0], categories: result[1] }));
}

export const reset_password = (params: ResetPasswordParams): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(
      Util.api_url('/account/confirm-reset-password'),
      {
        password: params.password,
        user_id: params.userId,
        token: params.token
      }
    )
    .then(res => {
      resolve(res.data.user);
    }, reject);
  });
}
