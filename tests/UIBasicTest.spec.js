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

test.only('Page Playwright Test 2', async ({ page }) => {
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
        await email.fill("tarun12.rt+5@gmail.com");
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