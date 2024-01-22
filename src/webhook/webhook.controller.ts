import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { OryAdminGuard } from '../auth/guard/oryAdmin.guard';
import { CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { OryService } from '../ory/ory.service';
import { Identity } from '@ory/client';

@ApiTags('Webhooks')
@Controller('webhook')
export class WebhookController {
    constructor(
        private readonly webhookService: WebhookService,
        private oryService: OryService,
    ) {}

    @UseGuards(OryAdminGuard)
    @Post('user')
    async create(@Body() createUserDto: CreateUserDto) {
        const identity: Identity = await this.oryService._getOryUser(
            createUserDto.oryId,
        );
        createUserDto.email = identity.traits.email;
        return this.webhookService._addUser(createUserDto);
    }
}
