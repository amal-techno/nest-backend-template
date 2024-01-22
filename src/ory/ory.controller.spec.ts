import { Test, TestingModule } from '@nestjs/testing';
import { OryController } from './ory.controller';
import { OryService } from './ory.service';

describe('OryController', () => {
    let controller: OryController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OryController],
            providers: [OryService],
        }).compile();

        controller = module.get<OryController>(OryController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
