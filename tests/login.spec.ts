import {test} from "@playwright/test";
import { user} from "../src/data/users";

test("Show response api login", async({Api})=>{
    const res=await request.post("/auth/login",{
        data: {username: user.username, password: user.password},
    });
    console.log("Status: ", res.status());
    console.log("Body: ", await res.text());
    console.log("SET-COOKIE:", res.headers()["set-cookie"]);
});
