const config = require('../../../client_config.json');

export const api_url = (path: string): string => {
    return `${config.server_url}${path}`;
}