import 'dotenv/config';

export const ORY_API_KEY = process.env.ORY_API_KEY;
export const ORY_PROJECT_ID = process.env.ORY_PROJECT_ID;

export const ORY_SDK_URL = `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`;

export const REFRESH_TOKEN_DAY = 2;

export const LOGIN_FLOW_QUERY_PARAM = {
    returnSessionTokenExchangeCode: true,
    aal: 'aal1',
    refresh: true,
};

export const REGISTRATION_FLOW_QUERY_PARAM = {
    returnSessionTokenExchangeCode: true,
};
