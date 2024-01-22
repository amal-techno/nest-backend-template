import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OryModule } from './ory/ory.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
    imports: [AuthModule, UserModule, OryModule, WebhookModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
