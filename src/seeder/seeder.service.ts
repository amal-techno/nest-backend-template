import { Injectable } from '@nestjs/common';
import { ENTITY_NAMES } from '../config/constant';
import { userSeed } from './seeds/user.seed';
import { userEntity } from '../shared/modules/drizzle/schemas';
import { Database } from '../shared/modules';

@Injectable()
export class SeederService {
    private seedingTables = [ENTITY_NAMES.USER];

    constructor(private readonly conn: Database) {}

    async runSeeders(param) {
        if (!param || param == 'all') {
            param = Object.values(ENTITY_NAMES).join(',');
        }
        const tables = param.split(',');
        for (const name of tables) {
            if (this.seedingTables.includes(name)) {
                await this.dataInsert(name);
            }
        }
    }

    async dataInsert(name) {
        if (name == ENTITY_NAMES.USER) {
            await this.conn.insert(userEntity).values(userSeed);
        }
    }
}
