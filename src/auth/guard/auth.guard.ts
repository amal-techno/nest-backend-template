import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { OryService } from '../../ory/ory.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private oryService: OryService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        const bearerToken = request.headers['authorization'];
        const xSessionToken = bearerToken
            ? bearerToken.split('Bearer ')[1]
            : null;

        if (!xSessionToken) {
            throw new UnauthorizedException();
        }
        try {
            const orySession = await this.oryService._getActiveSession(
                xSessionToken,
            );
            if (orySession.active) {
                request.headers['sessionData'] = orySession;
                await this.oryService.extendSession(orySession);
                return true;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
