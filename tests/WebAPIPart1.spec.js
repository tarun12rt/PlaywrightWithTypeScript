    const {test, expect, request}=require('@playwright/test');
    const loginPayLoad = {userEmail: "tarun14.rt@gmail.com", userPassword: "Roadno8a@"};
    const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
    let token;
    let orderId;

    test.beforeAll (async()=>{
        const apiContext = await request.newContext();
        const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data:loginPayLoad
            }
        )
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log(token);

        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
            {
                data:orderPayLoad,
                headers:{
                    'Authorization':token,
                    'content-type':'application/json'

                },
            }
        )

       const orderResponseJson = await orderResponse.json();
       console.log(orderResponseJson);
       orderId = orderResponseJson.orders[0];
    });

    test.beforeEach (()=>{

    })

    test('Add to cart',async({page})=>{

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