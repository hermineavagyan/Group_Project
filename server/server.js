require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require("cors");
const app = express();
const { resolve } = require('path');

// Ensure environment variables are set.
checkEnv();

app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true // when someone is on the front-end, we need to add: 'withCredentials: true,' to the axios request to ensure they're authenticated.
}))

app.use(express.static(process.env.STATIC_DIR));
app.use(express.urlencoded({extended:true}));
app.use(
express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
        if (req.originalUrl.startsWith('/webhook')) {
            req.rawBody = buf.toString();
        }
    },
    })
);

require('./middlewares/stripe.middleware')(app);

function checkEnv() {
    const price = process.env.PRICE;
    if(price === "price_12345" || !price) {
    console.log("You must set a Price ID in the environment variables. Please see the README.");
    process.exit(0);
    }
}

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));

