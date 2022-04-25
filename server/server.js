require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const cors = require("cors");
const { resolve } = require('path');
// const bodyParser = require("body-parser");
const e = require("express"); // do we even use this variable? otherwise to be removed.
const cookieParser = require("cookie-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const port = process.env.MY_PORT

// Ensure environment variables are set.
checkEnv();

app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true // when someone is on the front-end, we need to add: 'withCredentials: true,' to the axios request to ensure they're authenticated.
}))

app.use(express.static(process.env.STATIC_DIR));
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(cookieParser())

require('./middlewares/stripe.middleware')(app);
require('./config/mongoose.config')
require('./routes/item.routes')(app)
require('./routes/user.routes')(app)
require('./routes/cart.routes')(app)

function checkEnv() {
    const price = process.env.PRICE;
    if(price === "price_12345" || !price) {
    console.log("You must set a Price ID in the environment variables. Please see the README.");
    process.exit(0);
    }
}

const server = app.listen(port, ()=>console.log(`Listening on port: ${port}`))
