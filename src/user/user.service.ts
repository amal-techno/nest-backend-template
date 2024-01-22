import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { DB, Database, SelectUser, UpdateUser, userEntity } from '../shared';
import { UpdateUserDto } from './dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
    constructor(@Inject(DB) private readonly conn: Database) {}

    async _updateUser(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<SelectUser> {
        const updateUser: UpdateUser = updateUserDto;
        try {
            const updatedUser = await this.conn
                .update(userEntity)
                .set(updateUser)
                .where(eq(userEntity.id, id))
                .returning();
            return updatedUser[0];
        } catch (error) {
            console.log(error);
            throw new ConflictException('Email or Ory user id already exist.');
        }
    }
}
