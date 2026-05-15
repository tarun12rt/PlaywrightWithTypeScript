const { test, expect } = require('@playwright/test');

test.only('Add to cart',async({page})=>{
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        const body = page.locator("#products .card-body");
        const expectedProductname = "iphone 13 pro";
        const productsTitle = page.locator("#products b");
        const products = page.locator(".card-body");
        const cartButton = page.locator("button.btn.w-10.rounded");
        const email = page.locator("#userEmail");
        const password = page.locator("#userPassword");
        const loginPageLoginBtn = page.locator("#login");
        await email.fill("tarun14.rt@gmail.com");
        await password.fill("Roadno8a@");
        await loginPageLoginBtn.click();
        await page.waitForLoadState('networkidle');
        await productsTitle.first().waitFor();
        const count = await productsTitle.count();
        console.log(count);
        for(let i=0; i<count; ++i){
            if(await products.nth(i).locator("b").textContent() === expectedProductname){
                await products.nth(i).locator("button.btn.w-10.rounded").click();
                break;
            }

        }
        await page.locator("[routerlink*=cart]").click();
        await page.locator(".cart li").first().waitFor();
        const bln = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
        expect(bln).toBeTruthy();
        

        
        // const cartProducts = await page.locator(".cartSection h3").textContent();
        // console.log(cartProducts);

    })