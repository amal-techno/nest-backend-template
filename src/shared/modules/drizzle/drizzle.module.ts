import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbProvider, DB } from './db.provider';
import { DbConfig } from './drizzle.constants';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [DbConfig],
        }),
    ],
    providers: [DbProvider],
    exports: [DB],
})
export class DrizzleModule {}
