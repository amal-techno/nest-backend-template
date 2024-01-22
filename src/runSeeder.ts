import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './shared/modules/drizzle/schemas';
import postgres from 'postgres';
import { SeederService } from './seeder/seeder.service';
import 'dotenv/config';

async function bootstrap() {
    const command = process.argv[2];

    if (command) {
        const connection = postgres(process.env.DATABASE_URL);
        const options = {
            schema,
        };
        const conn = drizzle(connection, options);
        const seederService = new SeederService(conn);
        const res = await seederService.runSeeders(process.argv[3]);
        console.log(res);
        console.log('Seeding Task Completed.');
    } else {
        console.log('Command not found');
        process.exit(1);
    }

    process.exit(0);
}

bootstrap();
