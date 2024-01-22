import {
    serial,
    varchar,
    timestamp,
    index,
    pgSchema,
    pgEnum,
    uniqueIndex,
} from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { ENTITY_NAMES, SCHEMA_NAME } from '../../config';
import { livekitRoomEntity } from '../../livekit/entities';

export const userSchema = pgSchema(SCHEMA_NAME);

// if modify here Please change the value constant USER_STATUS value also.
export const userStatusEnum = pgEnum('user_status', [
    'INCOMPLETE',
    'ACTIVE',
    'DELETED',
]);

export const userEntity = userSchema.table(
    ENTITY_NAMES.USER,
    {
        id: serial('id').primaryKey(),
        oryId: varchar('ory_id', { length: 256 }).notNull(),
        username: varchar('username', { length: 256 }),
        firstName: varchar('first_name', { length: 256 }),
        lastName: varchar('last_name', { length: 256 }),
        email: varchar('email', { length: 256 })
            .notNull()
            .unique('unique_email_address'),
        status: userStatusEnum('user_status').$defaultFn(() => 'INCOMPLETE'), // By default user status will be Incomplete
        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at'),
    },
    (user) => {
        return {
            idIdx: index('user_id_idx').on(user.id),
            emailIdx: uniqueIndex('email_idx').on(user.email),
            usernameIdx: uniqueIndex('username_idx').on(user.username),
        };
    },
);

export const userRelations = relations(userEntity, ({ many }) => ({
    rooms: many(livekitRoomEntity),
}));

export type NewUser =
    | InferInsertModel<typeof userEntity>
    | {
          oryId: string;
          email: string;
      };

export type UpdateUser =
    | InferInsertModel<typeof userEntity>
    | {
          firstName: string;
          lastName: string;
          updatedAt: Date;
      };

export type SelectUser = InferSelectModel<typeof userEntity>;
