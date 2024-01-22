import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
    schema: './src/shared/modules/drizzle/schemas.ts',
    out: './migration/output',
    driver: 'pg',
    breakpoints: true,
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
} satisfies Config;
