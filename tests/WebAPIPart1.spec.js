    const {test, expect, request}=require('@playwright/test');
   const {APIUtils} = require('./utils/APIUtils')

    let token;
    let orderId;

    test.beforeAll (async()=>{
        const apiContext = await request.newContext();
        
    });

    test.beforeEach (()=>{

    })

    test('Add to cart',async({page})=>{

        const apiUtils = new APIUtils(apiContext,loginPayLoad);
        const orderId = createOrder(orderPayLoad);  

        await page.addInitScript(value => {
            window.localStorage.setItem('token',value);
        }, token);

        await page.goto("https://rahulshettyacademy.com/client/");            
            await page.locator("button[routerlink='/dashboard/myorders']").click();
            await page.locator("tbody").waitFor();

            const rows = page.locator("tbody tr");

            for(let i=0; i< await rows.count(); ++i){
                const rowOrderID = await rows.nth(i).locator("th").textContent();
                if(orderId.includes(rowOrderID)){
                    await rows.nth(i).locator("button").first().click();
                    break;  
                }
            }

            // await page.locator("p.tagline").waitFor();

            const orderDetails = await page.locator("div.col-text").textContent();
            expect(orderId.includes(orderDetails)).toBeTruthy();


        })