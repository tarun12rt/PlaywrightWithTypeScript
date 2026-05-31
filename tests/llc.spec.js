import { test, expect } from '@playwright/test';
 
test('Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByRole('checkbox', { name: 'Check me out if you Love' });
    await page.getByRole('radio', { name: 'Employed' })
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
    //locator(css)
 
});

test('test using codegen', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await expect(page.getByRole('navigation')).toContainText('ProtoCommerce');
  await page.getByRole('link', { name: 'Shop' }).click();
  await expect(page.getByRole('img', { name: 'Second slide' })).toBeVisible();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Blackberry $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await expect(page.locator('tbody')).toContainText('Checkout');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('India');
  await page.getByText('India').click();
  await page.getByText('I agree with the term &').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toMatchAriaSnapshot(`
    - link "close":
      - /url: "#"
      - text: ""
    - strong: Success!
    - text: Thank you! Your order will be delivered in next few weeks :-).
    `);
  await page.getByRole('button', { name: 'Purchase' }).click();
});