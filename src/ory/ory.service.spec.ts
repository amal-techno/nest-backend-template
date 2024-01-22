import { Test, TestingModule } from '@nestjs/testing';
import { OryService } from './ory.service';

describe('OryService', () => {
    let service: OryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OryService],
        }).compile();

        service = module.get<OryService>(OryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
