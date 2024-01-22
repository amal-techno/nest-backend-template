import {
    Controller,
    Body,
    Patch,
    Headers,
    UseGuards,
    Header,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard';
import { UpdateUserDto } from './dto';
import { SelectUser } from './entities';
import { AuthorizedHeaderDto } from '../auth/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Header('Content-Type', 'application/json')
    @Patch()
    update(
        @Headers() headers: AuthorizedHeaderDto,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<SelectUser> {
        updateUserDto.updatedAt = new Date();
        return this.userService._updateUser(headers.user.id, updateUserDto);
    }
}
