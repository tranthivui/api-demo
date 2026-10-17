import { expect } from '@playwright/test';
import { test } from '../src/fixtures/api.fixture';

test("Get current Auth",async({request})=>{
    const response=await request.get("/auth/me");
    await expect(response).toBeOK();
})
