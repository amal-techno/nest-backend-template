import { Session } from '@ory/client';
import { SelectUser } from '../../shared';

export class AuthorizedHeaderDto extends Headers {
    sessionData: Session;
    user: SelectUser;
}
