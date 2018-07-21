declare const BACKEND_URL;

export const api_url = (path: string): string => {
    return `${BACKEND_URL}${path}`;
}

export const get_token_from_session = (): string => {
    return window.localStorage.getItem('hb-login-token');
}

export const save_token_to_session = (token: string) : void => {
    window.localStorage.setItem('hb-login-token', token);
}

export const delete_token_from_session = () : void => {
  window.localStorage.removeItem('hb-login-token');
}

export const formatError = (error: any) => {
  if (!error.response && error.message) {
    error.response = {
      data: {
        error: [
          {
            msg: error.message,
          }
        ]
      }
    }
  }
};
