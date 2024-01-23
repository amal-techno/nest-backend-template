import 'dotenv/config';

// Client origin details
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
export const CLIENT_PORT = process.env.CLIENT_PORT;

// Database connection string
export const DATABASE_URL = process.env.DATABASE_URL;

// Database schema name
export const SCHEMA_NAME = '';

// All the tables name
export const ENTITY_NAMES = {
    USER: 'user'
};

// List of all user status. Please change user entity enum value if modified here.
export const USER_STATUS = {
    INCOMPLETE: 'INCOMPLETE',
    ACTIVE: 'ACTIVE',
    DELETED: 'DELETED',
};
