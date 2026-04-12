const { test, expect } = require('@playwright/test');

test.only('Browser Context Playwright Test', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title())
        await page.locator("#username").fill("rahulshettyacademy");
        await page.locator("[name='password']").fill("earning@830$3mK2");
        await page.locator("#signInBtn").click();
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText("Incorrect");


});

test('Page Playwright Test', async ({ page }) => {

        await page.goto("https://www.google.com/");
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");

});