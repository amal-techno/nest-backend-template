import { Test, TestingModule } from '@nestjs/testing';
import { WebhookService } from './webhook.service';
import { WebhookModule } from './webhook.module';

describe('WebhookService', () => {
    let service: WebhookService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebhookService],
            imports: [WebhookModule],
        }).compile();

        service = module.get<WebhookService>(WebhookService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
