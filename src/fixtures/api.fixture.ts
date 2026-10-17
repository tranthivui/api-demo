import {APIRequestContext, test as base, expect, request as playwrightRequest} from "@playwright/test";
import { BASE_URL } from "../paths/paths";
import { user } from "../data/users";
type ApiFixture = {authAPI: APIRequestContext};
export const test=base.extend<ApiFixture>({
    authAPI: async({},use)=>{
        const loginContext=await playwrightRequest.newContext({baseURL: BASE_URL});
        const loginRes=await loginContext.post("/auth/login",{
            data: {username: user.username, password: user.password},
        });
        await expect(loginRes).toBeOK();
        const state=await loginContext.storageState();
        await loginContext.dispose();

        const accessToken=state.cookies.find(c => c.name==="accessToken");
        if(!accessToken) throw new Error("Not found accessToken after login");
         const api=await playwrightRequest.newContext({
            baseURL: BASE_URL,
            storageState: state,
            extraHTTPHeaders: {"accessToken": accessToken.value},
         });
         await use(api);
         await api.dispose();
    }
})
