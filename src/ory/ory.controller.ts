import { Controller, Get } from '@nestjs/common';
import { OryService } from './ory.service';
import { LoginFlow, RegistrationFlow } from '@ory/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ory')
@Controller('ory')
export class OryController {
    constructor(private readonly oryService: OryService) {}

    @Get('registration')
    createRegistrationFlow(): Promise<RegistrationFlow> {
        return this.oryService._createRegistrationFlow();
    }

    @Get('login')
    getLoginFlow(): Promise<LoginFlow> {
        return this.oryService._createLoginFlow();
    }
}
