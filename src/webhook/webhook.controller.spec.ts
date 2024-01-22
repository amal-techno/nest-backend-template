import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WebhookModule } from './webhook.module';
import { AuthModule } from '../auth/auth.module';
import { OryModule } from '../ory/ory.module';

describe('WebhookController', () => {
    let controller: WebhookController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [WebhookModule, AuthModule, OryModule],
            controllers: [WebhookController],
            providers: [WebhookService],
        }).compile();

        controller = module.get<WebhookController>(WebhookController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
