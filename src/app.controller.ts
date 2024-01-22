import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Application Status')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('health')
    checkHealth(): string {
        return this.appService._checkHealth();
    }

    @Get('version')
    checkVersion(): string {
        return this.appService._checkVersion();
    }
}
