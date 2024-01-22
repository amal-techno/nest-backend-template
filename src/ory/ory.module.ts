import { Module } from '@nestjs/common';
import { OryService } from './ory.service';
import { OryController } from './ory.controller';
import { AuthService } from '../auth/auth.service';

@Module({
    controllers: [OryController],
    providers: [OryService, AuthService],
    exports: [OryService],
})
export class OryModule {}
