import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OryModule } from '../ory/ory.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule, OryModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
