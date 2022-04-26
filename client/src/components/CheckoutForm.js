import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import NavBar from './NavBar';
import MyContext from './MyContext';
// import axios from 'axios';

/* We will pass all "cart" items as props to the CheckoutForm for submission. 
An idea about what the checkout form will include, will be:

- a sub-header (below the main header) with the customer's billing information (name, email, phone #, billing address, etc.)
- a list of items (maybe using map?) that are in the cart state. Perhaps we can reuse the cart exactly... like this: <Cart />, on this checkout form in the return.
- the order total
*/

const CheckoutForm = (props) => {

    const context = useContext(MyContext);
    const [ cartItems, setCartItems ] = useState([]); // double check that it's an array and not an obj.
    const [ loggedInUser, setLoggedInUser ] = useState(''); // primary registered user id in database.
    const [ stripeCustomerId, setStripeCustomerId ] = useState('');
    
    // const { orderTotal,}

    const elements = useElements();
    const stripe = useStripe();
    
    const testCurrency = 'usd';
    const orderTotal = 35000;

    useEffect(()=>{
        const getCartItems = async () => {
            try {
                const res1 = await axios.get("http://localhost:8000/api/users", { withCredentials: true });
                setLoggedInUser(res1.data);
                setStripeCustomerId(res1.data.customerId);
                const res2 = await axios.get(`http://localhost:8000/api/itemsbyuser/${res1.data._id}`, { withCredentials: true });
                setCartItems(res2.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCartItems();
    }, [])

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
            <NavBar />
            <div className="checkout-main">
                <div className="two-thirds">
                    <div id="row-shipping-address">
                        <div id="user-information-container">
                            <h3>1</h3>
                        </div>
                        <div id="user-information-container" className="left-margin">
                            <h3>Shipping Address</h3>
                        </div>
                        <div id="user-information-container">
                            <ul id="li-shipping-address">
                                <li>{loggedInUser?.firstName} {loggedInUser?.lastName}</li>
                                <li>{loggedInUser?.address?.street}</li>
                                <li>{loggedInUser?.address?.city} {loggedInUser?.address?.state}, {loggedInUser?.address?.country}</li>
                                <li>{loggedInUser?.phoneNumber}</li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div id="order-list-via-props">
                            <table className="customTable">
                                <thead>
                                    <tr>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems?.map((item, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td><img id="checkout-image" src={item.productImage} alt="product"/></td>
                                                <td>{item.productName}</td>
                                                <td>${item.productPrice}</td>
                                            </tr>
                                        )})
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="one-third">
                        <h3>Order Summary</h3>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td id="item-count-price">Items '(3)':</td>
                                        <td className="pad">$83.24</td>
                                    </tr>
                                    <tr>
                                        <td id="shipping-and-handling">Shipping and handling:</td>
                                        <td className="pad">$83.24</td>
                                    </tr>
                                    <tr>
                                        <td id="order-total">Order total:</td>
                                        <td className="pad">$90.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <form id="payment-form" onSubmit={handleSubmit}>
                            {/* <label id="card-label" htmlFor="card-element">Card</label> */}
                                <CardElement id="card-element" />
                            <button id="pay-button">Place your order</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutForm;