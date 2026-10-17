import { expect } from '@playwright/test';
import { test } from '../src/fixtures/api.fixture';

test("Get current Auth",async({authAPI})=>{
    const response=await authAPI.get("/auth/me");
    await expect(response).toBeOK();
})
