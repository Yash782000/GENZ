
import "./Checkout.scss"
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../../components/checkout/checkoutForm/CheckoutForm';
import { extractIdAndCartQunatity } from "../../utlis";
import { useSelector } from "react-redux";
import { selectShippingAddress } from "../../redux/features/checkout/checkoutSlice";
import { selectUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Checkout = () => {
    const [message,setMessage] = useState("Initialization checkout ....")
    const [clientSecret, setClientSecret] = useState("");
    const {cartItems,cartTotalAmount} = useSelector((state)=>state.cart)
    const user = useSelector(selectUser);
    const productIDs = extractIdAndCartQunatity(cartItems);
    const shipAddress = useSelector(selectShippingAddress) ?? {};
    const {coupon} = useSelector((state)=>state.coupon);
    const description = `Shopito Payment : by email : ${user?.email}  , amount : ${cartTotalAmount}`
    console.log(description)
    console.log(coupon);
    console.log(shipAddress);
    console.log(productIDs);
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: productIDs,shipping:shipAddress,description:description,coupon }),
      })
        .then((res) => {
          if(res.ok){
            return res.json();
          }
          return res.json().then((json)=>Promise.reject(json));
        })
        .then((data) => setClientSecret(data.clientSecret)).catch((error)=>{
          setMessage("Failed to initialize checkout");
          toast.error("something went wrong !!!")
          console.log(error);
        })
    }, []);
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
  
    return (
      <>
      <section>
        <div className="container">
          {!clientSecret && <h3>{message}</h3>}
        </div>
      </section>
   
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      
      </>
    );
  
}

export default Checkout