import { Inject, Injectable } from '@nestjs/common';
import { DB, Database, userEntity } from '../shared';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
    constructor(@Inject(DB) private readonly conn: Database) {}

    /**
     * Get user by Ory Id
     * @param oryId
     * @returns
     */
    async findOneUser(oryId: string) {
        const cols = { id: true, firstName: true, lastName: true, email: true };
        return await this.conn.query.userEntity.findFirst({
            columns: cols,
            where: eq(userEntity.oryId, oryId),
        });
    }
}
