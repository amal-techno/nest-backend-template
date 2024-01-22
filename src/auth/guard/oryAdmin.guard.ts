import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class OryAdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        const bearerToken = request.headers['authorization'];
        const xSessionToken = bearerToken
            ? bearerToken.split('Bearer ')[1]
            : null;

        if (xSessionToken === process.env.ORY_API_KEY) {
            return true;
        } else {
            throw new UnauthorizedException('Api key is missing!');
        }
    }
}
