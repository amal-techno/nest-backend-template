import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Welcome Livekit';
    }

    _checkHealth(): string {
        return 'Application is working!';
    }

    _checkVersion(): string {
        return process.env.npm_package_version;
    }
}
