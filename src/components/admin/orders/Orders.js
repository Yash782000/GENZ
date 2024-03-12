import React, { useEffect } from 'react'
import styles from "./Order.module.scss"
import ListOfOrders from '../../../pages/order/ListOfOrders'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getOrders } from '../../../redux/features/order/orderSlice'

const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getOrders())
    },[])
    const openOrderDetails = (id) =>{
         navigate(`/admin/order-details/${id}`)
    }
  return (
    <div className='contianer order'>
      <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br/>
        <ListOfOrders openOrderDetails={openOrderDetails}/>
    </div>
  )
}

export default Orders