import {APIRequestContext, test as base, expect, request as playwrightRequest} from "@playwright/test";
import { BASE_URL } from "../paths/paths";
import { user } from "../data/users";
import { LoginResponse } from "../data/loginResponse";
type ApiFixture = {authAPI: APIRequestContext};
export const test=base.extend<ApiFixture>({
    authAPI: async({},use)=>{
        const loginContext=await playwrightRequest.newContext({baseURL: BASE_URL});
        const loginRes=await loginContext.post("/auth/login",{
            data: {username: user.username, password: user.password},
        });
        await expect(loginRes).toBeOK();
        const loginResData: LoginResponse= await loginRes.json();
        expect(loginResData.username).toBe(user.username);
        const token=loginResData.accessToken;
        if(!token) throw new Error(" Login response not have asccessToke");
        await loginContext.dispose();
        const api=await playwrightRequest.newContext({
            baseURL: BASE_URL,
            extraHTTPHeaders: {Authorization: `Bearer ${token}`},
        });
         await use(api);
         await api.dispose();
    }
})
