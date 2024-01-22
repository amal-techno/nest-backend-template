import { FactoryProvider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DB, DbConfig } from './drizzle.constants';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schemas';
import postgres from 'postgres';

export const DbProvider: FactoryProvider = {
    provide: DB,
    inject: [DbConfig.KEY],
    useFactory: (dbConfig: ConfigType<typeof DbConfig>) => {
        const connection = postgres(dbConfig.DATABASE_URL);
        const options = {
            schema,
            logger: process.env.NODE_ENV === 'development',
        };
        return drizzle(connection, options);
    },
};
export { DB };
