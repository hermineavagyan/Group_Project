import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import NavBar from './NavBar';
import MyContext from './MyContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
// import axios from 'axios';

const CheckoutForm = (props) => {

    const context = useContext(MyContext);
    const [ cartItems, setCartItems ] = useState([]);
    const [ loggedInUser, setLoggedInUser ] = useState(''); // primary registered user id in database.
    const [ stripeCustomerId, setStripeCustomerId ] = useState('');
    const navigate = useNavigate();

    const itemsTotal = () => {
        let sum = 0;
        for(let i = 0; i < cartItems.length; i++) {
            let stringToNum = parseFloat(cartItems[i].productPrice);
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

    const elements = useElements();
    const stripe = useStripe();

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
        e.preventDefault();
        try {
            if(!stripe || !elements){
                return;
            }

            // Create the payment intent on the server, we can pass whatever is needed here via props, inside this client secret const. Perhaps we are sending product information, or a cart id, or perhaps a customer id, or the shipping info, or a location, etc.
            const { error: backendError, clientSecret } = await fetch('http://localhost:8000/create-payment-intent', { // Currently working with fetch, update to axios in future release.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodType: 'card',
                    currency: 'usd',
                    amount: parseInt(orderTotal() * 100),
                    stripeCustomerId: stripeCustomerId,
                    description: `${cartItems[0].productName}, etc.`
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

            if(stripeError){
                console.log(stripeError.message)
            }

            if(!stripeError && !backendError){
                context.setCartCount(0);
                axios.get('http://localhost:8000/api/cart/delete');
                axios.put(`http://localhost:8000/api/users/${loggedInUser._id}`,
                {
                    cartCount: 0,
                }, { withCredentials: true })
                navigate('/ordersuccess');
            }

        } catch (error) {
            console.log(error);
        }
    }



    return(
        <div>
            <NavBar 
            dontDisplaySearch={'filterHide'}
            />
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
                            <div id="row-review-items">
                                <div id="user-information-container">
                                    <h3>2</h3>
                                </div>
                                <div id="user-information-container" className="left-margin">
                                    <h3>Review order items</h3>
                                </div>
                            </div>
                            <table className="customTable">
                                <thead id="margin-bottom">
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
                                                <td id="checkout-image"><img id="checkout-image" src={item.productImage} alt="product"/></td>
                                                <td>{item.productName}</td>
                                                <td>${parseFloat(item.productPrice).toLocaleString()}</td>
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
                                        <td id="item-count-price">Items ({cartItems.length}):</td>
                                        <td className="pad">${itemsTotal().toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td id="shipping-and-handling">Shipping and handling:</td>
                                        <td className="pad">${shippingHandlingCalc().toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td id="order-total">Order total:</td>
                                        <td className="pad">${orderTotal().toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <form id="payment-form" onSubmit={handleSubmit}>
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