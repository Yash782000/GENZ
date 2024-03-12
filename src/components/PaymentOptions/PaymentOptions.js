import React, { useState } from 'react'
import "./Radio.scss"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { SAVE_PAYMENT_ACTION } from '../../redux/features/checkout/checkoutSlice'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
const PaymentOptions = () => {
  const [paymentMetohd,setPaymentMethods] = useState("")
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setPayment = (e) =>{
    e.preventDefault();
    console.log(paymentMetohd)
    if(paymentMetohd === ""){
        return toast.error("Please select a Payment Method")
    }
    dispatch(SAVE_PAYMENT_ACTION(paymentMetohd));
    if(isLoggedIn){
        navigate("/checkout-details");
    }else{
        navigate("/login?redirect=cart");
    }
  }
  return (
    <>
    <p>Please Choose a Payment</p>
    <form className='--form-control' onSubmit={setPayment}>
          <label htmlFor="stripe" className='radio-label'>
            <input
             className='radio-input'
             type="radio"
             name="paymentMetohd"
             id="stripe"
             value={"stripe"}
             onChange={(e)=>setPaymentMethods(e.target.value)}  
             />
             <span className='custom-radio'></span>
             Stripe
          </label>
          <label htmlFor="flutterwave" className='radio-label'>
            <input
             className='radio-input'
             type="radio"
             name="paymentMetohd"
             id="flutterwave"
             value={"flutterwave"}
             onChange={(e)=>setPaymentMethods(e.target.value)}  
             />
             <span className='custom-radio'></span>
             Flutterwave
          </label>
          <label htmlFor="paypal" className='radio-label'>
            <input
             className='radio-input'
             type="radio"
             name="paymentMetohd"
             id="paypal"
             value={"paypal"}
             onChange={(e)=>setPaymentMethods(e.target.value)}  
             />
             <span className='custom-radio'></span>
             Paypal
          </label>
          <label htmlFor="wallet" className='radio-label'>
            <input
             className='radio-input'
             type="radio"
             name="paymentMetohd"
             id="wallet"
             value={"wallet"}
             onChange={(e)=>setPaymentMethods(e.target.value)}  
             />
             <span className='custom-radio'></span>
             Wallet
          </label>
          <button type="submit" className='--btn --btn-primary --btn-block' >Checkout</button>
    </form>
    </>
  )
}

export default PaymentOptions