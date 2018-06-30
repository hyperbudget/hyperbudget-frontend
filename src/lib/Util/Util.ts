const config = require('../../../client_config.json');

export const api_url = (path: string): string => {
    return `${config.server_url}${path}`;
}

export const get_token_from_session = (): string => {
    return window.sessionStorage.getItem('hb-login-token');
}

export const save_token_to_session = (token: string) : void => {
    window.sessionStorage.setItem('hb-login-token', token);
}