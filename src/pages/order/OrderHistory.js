import React, { useEffect } from 'react'
import "./OrderHistory.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOrders } from '../../redux/features/order/orderSlice';
import Loader from '../../components/loader/Loader';
import ListOfOrders from './ListOfOrders';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading,isError,message,orders} = useSelector((state)=>state.order);
  useEffect(()=>{
    dispatch(getOrders());
  },[dispatch])
  const openOrderDetails = (id) =>{
      navigate(`/order-details/${id}`)
  }
  
  return (
    <section>
      <div className='container order'>
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br/>
        <ListOfOrders openOrderDetails={openOrderDetails}/>
      </div>
    </section>
  )
}

export default OrderHistory