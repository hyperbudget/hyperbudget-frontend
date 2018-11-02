import { Transaction, Category } from "@hyperbudget/hyperbudget-core";
import { APIError } from "../APIError/APIError";

export type UserState = {
  email: string,
  isLoggedIn: boolean,
  transactions: Transaction[],
  categories: Category[],
  txnPassword: string,
  APIError: APIError,
};
