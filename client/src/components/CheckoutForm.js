import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import axios from 'axios';

/* We will pass all "cart" items as props to the CheckoutForm for submission. 
An idea about what the checkout form will include, will be:

- a sub-header (below the main header) with the customer's billing information (name, email, phone #, billing address, etc.)
- a list of items (maybe using map?) that are in the cart state. Perhaps we can reuse the cart exactly... like this: <Cart />, on this checkout form in the return.
- the order total
*/

const CheckoutForm = (props) => {
    
    // const { orderTotal,}

    const elements = useElements();
    const stripe = useStripe();
    
    const testCurrency = 'usd';
    const orderTotal = 35000;

    const handleSubmit = async (e) => {
        e.preventDefault(); // I believe we will remove this when we go live and redirect to an 'order success' page.
        try {
            if(!stripe || !elements){
                return;
            }

            // Create the payment intent on the server, we can pass whatever is needed here via props, inside this client secret const. Perhaps we are sending product information, or a cart id, or perhaps a customer id, or the shipping info, or a location, etc.
            const { error: backendError, clientSecret } = await fetch('http://localhost:8000/create-payment-intent', { // Currently working with fetch.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodType: 'card',
                    // currency: 'usd',
                    currency: testCurrency,
                    amount: orderTotal,
                }),
            }).then(r => r.json());

            if(backendError){ // might remove this in production.
                console.log(backendError.message)
            }
            
            /*// try to get this to work with axios in the future... below code is a good start.*/
            // const { clientSecret } = await axios.post('http://localhost:8000/create-payment-intent', {
            //     paymentMethodType: 'card',
            //     currency: 'usd',
            // });

            // Confirm the payment on the client
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement), // this collects the data given by the user on the page. We could otherwise grab a payment method id from Stripe and set the value to that instead of taking input from the user here, i.e.: card: 'payment_method_string'
                    }
                }
            )

            if(stripeError){ // might remove this in production.
                console.log(stripeError.message)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <h1>Card</h1>
            <form id="payment-form" onSubmit={handleSubmit}>
                {/* <label id="card-label" htmlFor="card-element">Card</label> */}
                    <CardElement id="card-element" />
                <button id="pay-button">Pay</button>
            </form>
        </div>
    )
}

export default CheckoutForm;