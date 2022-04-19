import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm"; // TODO



const PaymentForm = () => {

    const stripePromise = loadStripe("pk_test_4URHkw2uhYDVLDoPhJebHWoF");
    const [clientSecret, setClientSecret] = useState("");

    useEffect(()=>{
        const paymentIntent = async () => {
            try {
                const res = axios.post(`http://localhost:8000/create-payment-intent`, // reference: https://stripe.com/docs/api/payment_intents/create
                    {
                        items: [{
                            id: `${productId}`,
                        }],
                        customer: `${customerId}`,
                        

                    }
                );
                
            } catch (error) {
                
            }
        }

    }, [])



    return(
        <div></div>
    )
}

export default PaymentForm;