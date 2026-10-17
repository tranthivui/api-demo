import { expect } from '@playwright/test';
import { test } from '../src/fixtures/api.fixture';
import { AuthenResponse } from '../src/types/loginResponse';
import { user } from '../src/data/users';

test("Get current Auth",async({authAPI})=>{
    const responseAuth=await authAPI.get("/auth/me");
    await expect(responseAuth).toBeOK();
    const responseData: AuthenResponse =await responseAuth.json();
    expect(responseData.username).toBe(user.username);
});

test("Case wrong accessToken", async({request})=>{
    const responseAuth=await request.get("/auth/me",{
        headers: {
            Authorization: `Bearer abcdeed`,
        }
    });
    expect(responseAuth.status()).toBe(401);
})
