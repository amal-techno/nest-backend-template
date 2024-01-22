import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {
    Configuration,
    FrontendApi,
    FrontendApiCreateNativeLoginFlowRequest,
    FrontendApiCreateNativeRegistrationFlowRequest,
    Identity,
    IdentityApi,
    IdentityApiGetIdentityRequest,
    LoginFlow,
    RegistrationFlow,
    Session,
} from '@ory/client';

import {
    LOGIN_FLOW_QUERY_PARAM,
    ORY_API_KEY,
    ORY_SDK_URL,
    REFRESH_TOKEN_DAY,
    REGISTRATION_FLOW_QUERY_PARAM,
} from './constant';

@Injectable()
export class OryService {
    private oryFrontendApi: FrontendApi;
    private identityApi: IdentityApi;

    constructor() {
        const oryConfig: Configuration = new Configuration({
            basePath: ORY_SDK_URL,
            accessToken: ORY_API_KEY,
        });
        this.oryFrontendApi = new FrontendApi(oryConfig);
        this.identityApi = new IdentityApi(oryConfig);
    }

    async extendSession(orySession) {
        const expireDate = new Date(orySession.expires_at).getTime();
        const today = new Date().getTime();
        const differentDays = Math.ceil(
            Math.abs(expireDate - today) / (1000 * 3600 * 24),
        );
        if (differentDays < REFRESH_TOKEN_DAY) {
            await this.identityApi.extendSession({
                id: orySession.data.id,
            });
        }
    }

    async _createRegistrationFlow(): Promise<RegistrationFlow> {
        try {
            const param: FrontendApiCreateNativeRegistrationFlowRequest =
                REGISTRATION_FLOW_QUERY_PARAM;
            const response =
                await this.oryFrontendApi.createNativeRegistrationFlow(param);
            return response.data;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async _createLoginFlow(): Promise<LoginFlow> {
        try {
            const param: FrontendApiCreateNativeLoginFlowRequest =
                LOGIN_FLOW_QUERY_PARAM;
            const response = await this.oryFrontendApi.createNativeLoginFlow(
                param,
            );
            return response.data;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async _getOryUser(oryUserId: string): Promise<Identity> {
        try {
            const param: IdentityApiGetIdentityRequest = { id: oryUserId };
            return (await this.identityApi.getIdentity(param)).data;
        } catch (error) {
            if (error['response']['status'] == 404) {
                throw new NotFoundException('Ory user is not exist.');
            }
        }
    }

    async _getActiveSession(xSessionToken: string): Promise<Session> {
        try {
            return (
                await this.oryFrontendApi.toSession({
                    xSessionToken: xSessionToken,
                })
            ).data;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
