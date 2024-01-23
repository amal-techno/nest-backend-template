import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OryModule } from './ory/ory.module';
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [AuthModule, OryModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
