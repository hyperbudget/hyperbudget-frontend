import axios from 'axios';

import * as Util from '../Util/Util';

interface LoginParams {
    email: string;
    password: string;
}

interface RegisterParams {
    firstname: string;
    email: string;
    password: string;
}

export const login = (params: LoginParams) : Promise<any> => {
    console.log(Util.api_url(''));
    return axios.post(Util.api_url('/account/login'), params);
}

export const register = (params: RegisterParams) : Promise<any> => {
    return axios.post(Util.api_url('/account/register'), params);
}