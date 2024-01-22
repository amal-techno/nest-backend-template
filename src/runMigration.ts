import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './shared/modules/drizzle/schemas';
import postgres from 'postgres';
import 'dotenv/config';

async function bootstrap() {
    const command = process.argv[2];
    if (command) {
        console.log(process.env.DATABASE_URL);

        const connection = postgres(process.env.DATABASE_URL);
        const options = {
            schema,
        };
        const db = drizzle(connection, options);
        // This will run migrations on the database, skipping the ones already applied
        await migrate(db, { migrationsFolder: 'src/migration/output' });
        console.log('Migration Task Completed.');
        await connection.end();
    } else {
        console.log('Command not found');
        process.exit(1);
    }
    process.exit(0);
}

bootstrap();
