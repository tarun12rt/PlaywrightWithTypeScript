const { test, expect } = require('@playwright/test');

test('Browser Context Playwright Test', async ({ browser }) => {
       const context = await browser.newContext();
        const page = await context.newPage();
        
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        
        const userName = page.locator("#username");
        const password = page.locator("[name='password']");
        const signInBtn = page.locator("#signInBtn");
        const cardTitles = page.locator(".card-body a");

        console.log(await page.title())
        await page.locator("#username").fill("rahulshettyacademy");
        await page.locator("[name='password']").fill("earning@830$3mK2");
        await page.locator("#signInBtn").click();
        
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText("Incorrect");
        await password.fill("");
        await password.fill("Learning@830$3mK2");
        await signInBtn.click();
        console.log(await cardTitles.first().textContent());
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);

});

test('Page Playwright Test 2', async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

        const registerLink = page.locator(".text-reset");
        const firstName = page.locator("#firstName");
        const lastName = page.locator("#lastName");
        const email = page.locator("#userEmail");
        const phoneNumber = page.locator("#userMobile");
        const occupationDropDown = page.locator("[formcontrolname='occupation']");
        const genderMale = page.locator("[value='Male']");
        const password = page.locator("#userPassword");
        const confirmPassword = page.locator("#confirmPassword");
        const checkBox = page.locator("[type='checkbox']");
        const registerBtn = page.locator("#login");
        const accountCreationSuccessMsg = page.locator('text=Account Created Successfully');  
        const loginBtn = page.locator('text=Login');
        const loginPageLoginBtn = page.locator("#login");
        const productsImage = page.locator(".card-img-top");
        const productsTitle = page.locator(".card-body b");

        await registerLink.click();
        await firstName.fill("Tarun");
        await lastName.fill("Kumar");
        await email.fill("tarun15.rt+8@gmail.com");
        await phoneNumber.fill("9472606686");
        await occupationDropDown.selectOption("Engineer");
        await genderMale.click();
        await password.fill("Roadno8a@");
        await confirmPassword.fill("Roadno8a@");
        await checkBox.click();
        await registerBtn.click();
        await expect(accountCreationSuccessMsg).toBeVisible();
        await loginBtn.click();
        await email.fill("tarun15.rt+8@gmail.com");
        await password.fill("Roadno8a@");
        await loginPageLoginBtn.click();
        await page.waitForLoadState('networkidle');
        console.log(await productsTitle.first().textContent());

});

test('Page Playwright Test', async ({ page }) => {

        await page.goto("https://www.google.com/");
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");

});

test('UI Controls', async ({ page})=>{
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

         const userName = page.locator("#username");
        const password = page.locator("[name='password']");
        const signInBtn = page.locator("#signInBtn");
        const userCheckBox = page.locator("[value='user']+.checkmark");
        const blinkingText = page.locator("div [href*='documents-request']");

         await page.locator("#username").fill("rahulshettyacademy");
        await page.locator("[name='password']").fill("Learning@830$3mK2");
        await userCheckBox.click();
        await page.locator("#okayBtn").click();
        await expect(userCheckBox).toBeChecked();
        await page.locator("select.form-control").selectOption("consult");
        await page.locator("#terms").click();
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();
        expect(blinkingText).toHaveAttribute("class","blinkingText");
        
})

test.only('Child Window Handling',async({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();   
        const blinkingText = page.locator("div [href*='documents-request']");
        const userName = page.locator("#username");
        const password = page.locator("[name='password']");
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        const [newPage] = await Promise.all(
        [context.waitForEvent("page"),
         blinkingText.click()]);

         const text = await newPage.locator("p.red").textContent();
         const email = text.split("@")[1];
         const domain = email.split(" ")[0];
         console.log(domain);
         await page.locator("#username").fill(domain);
         await page.locator("[name='password']").fill("Learning@830$3mK2");

})