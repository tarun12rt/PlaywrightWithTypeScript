const {test,expect} = require('@playwright/test');

test('Browser Context Playwright Test', async({browser})=>{
        const context = await browser.newContext();
        const a = await context.newPage();
        a.goto("https://rahulshettyacademy.com/");
        console.log(await page.title())
        
});

test('Page Playwright Test', async({page})=>{
        
        await page.goto("https://www.google.com/");
        console.log(await page.getByTitle());
        await expect(page).toHaveTitle("Google");
        
});