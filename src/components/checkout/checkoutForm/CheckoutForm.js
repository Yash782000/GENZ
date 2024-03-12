import React, { useEffect, useState } from "react";
import styles from "./Checkoutform.module.scss"
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import Card from "../../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotalAmount } from "../../../redux/features/cart/CartSlice";
import { selectPaymentMethod, selectShippingAddress } from "../../../redux/features/checkout/checkoutSlice";
import { createOrder } from "../../../redux/features/order/orderSlice";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const {coupon} = useSelector((state)=>state.coupon);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const saveOrder = () =>{
    const today = new Date();
    const formData = {
      orderDate : today.toDateString(),
      orderTime : today.toLocaleDateString(),
      orderAmount : cartTotalAmount,
      orderStatus : "Order Placed .....",
      cartItems : cartItems,
      shippingAddress,
      paymentMethod,
      coupon:coupon != null ? coupon : { name :"nil"},
    }
    dispatch(createOrder(formData));
    navigate("/checkout-success");
  }
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_FRONTEND_URL}/checkout_success`,
      },
      redirect:"if_required",
    })
    .then((result)=>{
      if(result.error){
        toast.error(result.error.message);
        setMessage(result.error.message);
        return;
      }
      if(result.paymentIntent){
        if(result.paymentIntent.status === "succeeded"){
          setIsLoading(false);
          toast.success("Payment Successfull")
          saveOrder();
        }
      }
    })

    
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>
          Checkout
        </h2>
        <form onSubmit={handleSubmit}>
        <div>
          <Card cardClass={styles.card}>
            <CheckoutSummary/>
          </Card>
        </div>
        <div>
          <Card cardClass={`${styles.card} ${styles.pay}`}>
            <h3>Stripe Checkout</h3>
            <PaymentElement id={styles["payment-element"]} options={paymentElementOptions} />
           <button disabled={isLoading || !stripe || !elements} id="submit" className={styles.button}>
           <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
          </button>
          {/* Show any error or success messages */}
          {message && <div id={styles["payment-message"]}>{message}</div>}
          </Card>
        </div>
      
    </form>
      </div>
    </section>
    
    </>
  );
}