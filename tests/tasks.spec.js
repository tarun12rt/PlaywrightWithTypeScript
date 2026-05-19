const { test, expect } = require('@playwright/test');

test.only('Add to cart',async({page})=>{
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        const userEmail = "tarun14.rt@gmail.com";
        const body = page.locator("#products .card-body");
        const expectedProductname = "iphone 13 pro";
        const productsTitle = page.locator("#products b");
        const products = page.locator(".card-body");
        const cartButton = page.locator("button.btn.w-10.rounded");
        const email = page.locator("#userEmail");
        const password = page.locator("#userPassword");
        const loginPageLoginBtn = page.locator("#login");
        await email.fill(userEmail);
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
        await page.locator("li[class='totalRow'] button[type='button']").click();

        await page.locator("[class=actions] a").waitFor();

        // enter card details
        const cardNumber="6548 5689 4589 4451";
        const expMonth="12";
        const expDay="15";
        const cvvCode="123";
        const nameOnCard="Tarun Kumar";
        const creditCardNumField=page.locator("input.txt");

        await creditCardNumField.first().clear();
        await creditCardNumField.first().fill(cardNumber);

        await page.locator('.input.ddl').first().selectOption(expMonth);
        await page.locator('.input.ddl').last().selectOption(expDay);

        await page.locator(".field.small input").first().fill(cvvCode);

        await page.locator("input.txt").nth("2").fill(nameOnCard);
      
        
        await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
        const results = page.locator("[class*='results']");
        await results.waitFor();
        const optionsCount = await results.locator("[class*='ta-item']").count();
        

        for(let i=0; i<optionsCount; ++i){
            const text = await results.locator("[class*='ta-item']").nth(i).textContent();
            if(text === " India"){
                await results.locator("[class*='ta-item']").nth(i).click();
                break;
            }
        }

        await page.pause();

        expect(page.locator(".details__user label[type='text']")).toHaveText(userEmail);
        await page.locator(".action__submit").click();

        await page.locator(".hero-primary").waitFor();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

        


    })