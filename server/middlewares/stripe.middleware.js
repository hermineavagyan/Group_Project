const express = require('express');
const app = express();
const axios = require('axios');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});

// IMPORTANT HERE, use this.
const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

module.exports = (app) => {
    app.post("/create-customer", async (req,res)=>{
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

    app.get(`/get-products`, async (req, res)=>{
        const getProducts = async () => {
            try {
                const products = await stripe.products.list({
                    limit: 10,
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
    
    // app.post("/create-payment-intent", async (req, res) => { // ref: https://stripe.com/docs/api/payment_intents/create
    //     const { items, customer } = req.body;
    //     // Create a PaymentIntent with the order amount and currency
    //     const paymentIntent = await stripe.paymentIntents.create({
    //         amount: calculateOrderAmount(items),
    //         currency: "usd",
    //             automatic_payment_methods: {
    //             enabled: true,
    //             },
    //         customer,
    //         confirm: true,
    //     });
    //     res.send({
    //     clientSecret: paymentIntent.client_secret,
    //     });
    // });

    // for testing below.
    // app.post('/test-payment-intent', async (req, res) => {
    //     const paymentIntent = async () => {
    //         try {
    //             await stripe.paymentIntents.create({
    //             customer: 'cus_LX4BVmdaPGRZaz', //{{CUSTOMER_ID}}
    //             currency: 'usd',
    //             amount: 2000,
    //             payment_method_types: ['card'],
    //             setup_future_usage: 'on_session',
    //             });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     const makePaymentIntent = await paymentIntent();
    //     res.send(makePaymentIntent);
    // })

    // for testing below.
//     app.post('/create-checkout-session', async (req, res) => {
//         const checkoutSesson = async () => {
//             try {
//                 const YOUR_DOMAIN = 'localhost';
//                 await stripe.checkout.sessions.create({
//                     line_items: [
//                         {
//                         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//                         price: 'price_1Kpm8I4F6Om3sJ1tXj3FRfLc',// {{PRICE_ID}}
//                         quantity: 1,
//                         payment_method_types: ['card'],
//                         payment_method: 'card_1Kq05Y4F6Om3sJ1tro1J2DMs',
//                         // charge: xxx,
//                         },
//                     ],
//                     mode: 'payment',
//                     success_url: `${YOUR_DOMAIN}/success.html`,
//                     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//                 });
//             res.redirect(303, session.url);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         const makeCheckoutSession = await checkoutSesson();
//         res.send(makeCheckoutSession);
//     })
// }

// app.get('/', (req, res) => {
//     const path = resolve(process.env.STATIC_DIR + '/checkout.html');
//     res.sendFile(path);
// });

// // Fetch the Checkout Session to display the JSON result on the success page
// app.get('/checkout-session', async (req, res) => {
//     const { sessionId } = req.query;
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     res.send(session);
// });

// app.post('/create-checkout-session', async (req, res) => {
//     const domainURL = process.env.DOMAIN;

//   // Create new Checkout Session for the order
//   // Other optional params include:
//   // For full details see https://stripe.com/docs/api/checkout/sessions/create
//     const session = await stripe.checkout.sessions.create({
//     mode: 'payment',
//     line_items: [{
//     price: process.env.PRICE,
//     payment_method: 'card_1Kq05Y4F6Om3sJ1tro1J2DMs',
//     quantity: 1,
//     }],
//     // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
//     success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${domainURL}/canceled.html`,
//     // automatic_tax: { enabled: true }
// });

// return res.redirect(303, session.url);
// });

// Webhook handler for asynchronous events.
app.post('/webhook', async (req, res) => {
    let event;

  // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let signature = req.headers['stripe-signature'];

    try {
        event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
    );
    } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`);
    return res.sendStatus(400);
    }
    } else {
    // Webhook signing is recommended, but if the secret is not configured in `.env`,
    // retrieve the event data directly from the request body.
    event = req.body;
}

    if (event.type === 'checkout.session.completed') {
    console.log(`🔔  Payment received!`);

    // Note: If you need access to the line items, for instance to
    // automate fullfillment based on the the ID of the Price, you'll
    // need to refetch the Checkout Session here, and expand the line items:
    //
    // const session = await stripe.checkout.sessions.retrieve(
    //   'cs_test_KdjLtDPfAjT1gq374DMZ3rHmZ9OoSlGRhyz8yTypH76KpN4JXkQpD2G0',
    //   {
    //     expand: ['line_items'],
    //   }
    // );
    //
    // const lineItems = session.line_items;
    }
}


// res.sendStatus(200);
// });
)
}