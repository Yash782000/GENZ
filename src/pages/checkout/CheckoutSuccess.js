import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useDispatch } from 'react-redux'
import { CLEAR_CAT } from '../../redux/features/cart/CartSlice'
const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(CLEAR_CAT())
  },[dispatch])
  return (
    <>
    <Confetti/>
    <section style = {{height:"80vh"}}>
        <div className='container'>
            <h2>Checkout Successfull</h2>
            <p>Thanku for your purchase</p>
            <br/>
            <button className='--btn --btn-primary'>
                <Link to="/order-history">View Order Status</Link>
            </button>
        </div>
    </section>
    </>
  )
}

export default CheckoutSuccess