import { registerAs } from '@nestjs/config';
import { DATABASE_URL } from '../../../config';

export const DbConfig = registerAs('db', () => ({
    DATABASE_URL: DATABASE_URL,
}));

export const DB = Symbol('DB_SERVICE');
