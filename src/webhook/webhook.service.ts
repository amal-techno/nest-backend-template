import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { DB, Database } from '../shared';
import { CreateUserDto } from './dto/create-user.dto';
import { NewUser, userEntity } from '../user/entities';

@Injectable()
export class WebhookService {
    constructor(@Inject(DB) private readonly conn: Database) {}

    async _addUser(createUserDto: CreateUserDto) {
        const newUser: NewUser = createUserDto;
        try {
            const createdUser = await this.conn
                .insert(userEntity)
                .values(newUser)
                .onConflictDoUpdate({
                    target: userEntity.id,
                    set: {
                        email: newUser.email,
                        oryId: newUser.oryId,
                    },
                })
                .returning();
            return createdUser[0];
        } catch (error) {
            console.log(error);
            throw new ConflictException('Email or Ory user id already exist.');
        }
    }
}
