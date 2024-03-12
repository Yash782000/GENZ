import React, { useEffect } from 'react'
import "./OrderHistory.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOrders } from '../../redux/features/order/orderSlice';
import Loader from '../../components/loader/Loader';

const ListOfOrders = ({openOrderDetails}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading,isError,message,orders} = useSelector((state)=>state.order);
  useEffect(()=>{
    dispatch(getOrders());
  },[dispatch])
  
  return (
    
        <>
        {isLoading && <Loader/>}
        <div className='table'>
          {orders.length === 0 ? (
            <p>No order Found</p>
          ):(
            <table>
              <thead>
                 <th>s/n</th>
                 <th>Date</th>
                 <th>Order Id</th>
                 <th>Order Amount</th>
                 <th>Order Status</th>
              </thead>
              <tbody>
                 {orders.map((order,index)=>{
                  const {_id,orderDate,orderTime,orderAmount,orderStatus} = order;
                  return(
                    <tr key="_id" onClick={()=>openOrderDetails(_id)}>
                      <td>{index+1}</td>
                      <td>{orderDate} at {orderTime}</td>
                      <td>{_id}</td>
                      <td>${orderAmount}</td>
                      <td>
                        <p className={orderStatus !== "Delivered" ?"pending" :"delivered"}>
                             {orderStatus}
                        </p>
                      </td>
                    </tr>
                  )
                 })}
              </tbody>
            </table>
          )}
        </div>
        </>
     
  )
}

export default ListOfOrders;