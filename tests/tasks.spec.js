const { test, expect } = require('@playwright/test');

test.only('Add to cart',async({page})=>{
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        const body = page.locator("#products .card-body");
        const expectedProductname = "iphone 13 pro";
        const productsTitle = page.locator("#products b");
        const cartButton = page.locator("button.btn.w-10.rounded");
        const email = page.locator("#userEmail");
        const password = page.locator("#userPassword");
        const loginPageLoginBtn = page.locator("#login");
        await email.fill("tarun14.rt@gmail.com");
        await password.fill("Roadno8a@");
        await loginPageLoginBtn.click();
        await page.waitForLoadState('networkidle');
        const count = await productsTitle.count();
        console.log(count);
        for(let i=0; i<count; i++){
            if(body.nth(i).locator("b").textContent() == expectedProductname){
                await body.nth(i).locator("button.btn.w-10.rounded").click();
                break;
            }

        }

    })