const express = require('express');
const app = express();
const axios = require('axios');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});



module.exports = (app) => {
    app.post("/create-customer", async (req,res)=>{ //create new customer via registration
        const createCustomer = async () => {
            const customerDetails = await req.body; //assign req.body to a variable.
            try {
                // console.log(customerDetails.email);
                // console.log(customerDetails.name);
                const customer = await stripe.customers.create({
                    // description: 'My First Test Customer (created for API docs)',
                    email: customerDetails.email,
                    name: customerDetails.firstName + " " + customerDetails.lastName,
                    phone: customerDetails.phone,
                    address: {
                        city: customerDetails.address.city,
                        country: customerDetails.address.country,
                        line1: customerDetails.address.line1,
                        line2: customerDetails.address.line2,
                        postal_code: customerDetails.address.postal_code,
                        state: customerDetails.address.state,
                    }
                });
                console.log(customerDetails.firstName + " " + customerDetails.lastName)
                return customer.id
                // res.send(customer.id);
            } catch (error) {
                console.log(error);
            }
        }
        const createCus = await createCustomer();
        res.send(createCus);
    })

    app.get(`/products/all`, async (req, res)=>{ //get all products.
        const getProducts = async () => {
            try {
                const products = await stripe.products.list({
                    limit: 20,
                });
                return products.data;
                // console.log(products.data);
            } catch (error) {
                console.log(error);
            }
        }
        const productPayload = await getProducts();
        res.send(productPayload);
    })

    app.get(`/products/one/:id`, async (req, res)=>{ // get one product by id.
        const oneProduct = await req.params;
        const getOneProduct = async () => {
            try {
                const product = await stripe.products.retrieve(
                    oneProduct.id,
                );
                return product;
                // console.log(product);
            } catch (error) {
                console.log(error);
            }
        }
        const productPayload = await getOneProduct();
        res.send(productPayload);
    })

    app.get(`/prices/one/:productId`, async (req, res)=>{ // get one price by product id.
        const prodId = await req.params;
        const getProductPrices = async () => {
            try {
                const prices = await stripe.prices.list({
                    limit: 10,
                    product: prodId.productId,
                });
                // console.log(prices);
                return prices;
            } catch (error) {
                console.log(error);
            }
        }
        const pricesPayload = await getProductPrices();
        res.send(pricesPayload);
    })

    app.get(`/prices/all`, async (req, res)=>{ // get all prices.
        // const allPrices = await req.params;
        const getAllPrices = async () => {
            try {
                const prices = await stripe.prices.list({
                    limit: 20,
                });
                // console.log(prices);
                return prices;
            } catch (error) {
                console.log(error);
            }
        }
        const allPricesPayload = await getAllPrices();
        res.send(allPricesPayload);
    })

    app.get(`/charges/one/:customerId`, async (req, res)=>{ // get all charges for a specific customer.
        const cusId = await req.params;
        console.log(cusId);
        const getOneCharge = async () => {
            try {
                const charges = await stripe.charges.list({
                    limit: 3,
                    customer: cusId.customerId,
                });
                // console.log(charges);
                return charges;
            } catch (error) {
                console.log(error);
            }
        }
        const chargePayload = await getOneCharge();
        res.send(chargePayload);
    })

    // to re-calculate order items on the server-side, so that the cart item totals can't be manipulated on the front end.
    // We should not do any calculation on the front end, so that should be updated in the future to POST to a route, and get back the totals separately.
    const calculateOrderAmount = (items) => {
        const itemsTotal = () => {
            let sum = 0;
            for(let i = 0; i < items.length; i++) {
                let stringToNum = parseFloat(items[i].productPrice);
                sum += stringToNum;
            }
            return sum;
        }
    
        const shippingHandlingCalc = () => {
            const retailTotal = itemsTotal();
            const shipping = retailTotal * 0.02; //2% s&h.
            return shipping;
        }
    
        const orderTotal = () => {
            return itemsTotal() + shippingHandlingCalc();
        }

        return orderTotal();
    };

    app.post('/create-payment-intent', async (req, res) => { //sending an empty object to here from client, returns the client secret.
        const { paymentMethodType, currency, stripeCustomerId, cartItems, amount } = req.body; // the items to destructure from the request body.
        try {
            const paymentIntent = await stripe.paymentIntents.create({
            // amount: calculateOrderAmount(cartItems),
            amount: amount,
            currency: currency,
            payment_method_types: [paymentMethodType],
            customer: stripeCustomerId,
            // customer: customerId, //when we are ready to pass the customerId to Stripe to charge the correct account.
            // currency: currency, //in case we wanted to pass the currency via destructure above
            // payment_method_types: [paymentMethodType], //in case we wanted to pass the currency via destructure above
        });
            res.json({ clientSecret: paymentIntent.client_secret });
        } catch(error) {
            res.status(400).json({ error: {message: error.message }});
        }
    });

    app.get('/config', async (req, res) => { // a way for any client, web or mobile to pick up the publishable key, so that it doesn't have to be hard coded in the app and can be maintained centrally (add jwtoken authentication to this route too?)
        res.json({publishableKey: process.env.STRIPE_PUBLISHABLE_KEY})
    });

    app.get("/", (req, res) => { // I don't even really know why this is necessary. Gotta look into this.
        const path = resolve(process.env.STATIC_DIR + "/index.html");
        res.sendFile(path);
    });

      // Stripe requires the raw body to construct the event
      // app.post("/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
    app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => { // The webhook stuff handles asynchronous statuses for each payment, increases security, assurance, etc that payments are actually fulfilled properly.
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } catch (err) {
            // On error, log and return the error message
            console.log(`❌ Error message: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        
        // Successfully constructed event
        console.log('✅ Success:', event.id);
        
        if(event.type === 'payment_intent.created'){
            console.log(`[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`);
        }

        if(event.type === 'payment_intent.canceled'){
            console.log(`[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`);
        }

        if(event.type === 'payment_intent.payment_failed'){
            console.log(`[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`);
        }

        if(event.type === 'payment_intent.processing'){
            console.log(`[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`);
        }

        if(event.type === 'payment_intent.requires_action'){
            console.log(`[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`);
        }

        if(event.type === 'payment_intent.succeeded'){
            console.log(`[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`);
        }

        // Return a response to acknowledge receipt of the event
        res.json({received: true});
    });
}