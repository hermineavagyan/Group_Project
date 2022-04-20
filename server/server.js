require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { resolve } = require('path');
const port = process.env.MY_PORT

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
app.use(cookieParser())

require('./middlewares/stripe.middleware')(app);
require('./config/mongoose.config')
require('./routes/item.routes')(app)
require('./routes/user.routes')(app)

function checkEnv() {
    const price = process.env.PRICE;
    if(price === "price_12345" || !price) {
    console.log("You must set a Price ID in the environment variables. Please see the README.");
    process.exit(0);
    }
}

const server = app.listen(port, ()=>console.log(`Listening on port: ${port}`))
