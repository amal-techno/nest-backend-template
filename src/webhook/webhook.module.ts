import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { AuthModule } from '../auth/auth.module';
import { OryModule } from '../ory/ory.module';

@Module({
    imports: [AuthModule, OryModule],
    controllers: [WebhookController],
    providers: [WebhookService],
})
export class WebhookModule {}
