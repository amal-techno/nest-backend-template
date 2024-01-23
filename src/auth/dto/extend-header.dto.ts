import { Session } from '@ory/client';


export class AuthorizedHeaderDto extends Headers {
    sessionData: Session;
}
