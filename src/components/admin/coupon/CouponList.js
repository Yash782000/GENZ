import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoupon, getCoupon, getCoupons } from '../../../redux/features/coupon/couponSlice';
import { FaTrashAlt } from 'react-icons/fa';
import Loader from '../../loader/Loader';
import { confirmAlert } from 'react-confirm-alert';

const CouponList = () => {
  const { isLoading, coupons } = useSelector((state) => state.coupon);
    const dispatch = useDispatch();
  
    useEffect( () => {
       dispatch(getCoupons())
      // dispatch(getCoupon('AAAA12'));
    }, [dispatch]);
    const confirmDelete = (id) => {
      confirmAlert({
        title: 'Delete Coupon ',
        message: 'Are you sure to delete this Coupon.',
        buttons: [
          {
            label: 'Delete',
            onClick: () => delCoupon(id)
          },
          {
            label: 'Cancel',
           
          }
        ]
      });
    };
  
    const delCoupon =async(id) =>{
      await dispatch(deleteCoupon(id))
      await dispatch(getCoupons());
    }
    return (
      <>
        {isLoading && <Loader />}
        <div className='--mb2'>
          <h3>All Coupons</h3>
          <div className='table'>
            {Array.isArray(coupons) && coupons.length === 0 ? (
              <p>No Coupon</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Discount(%)</th>
                    <th>Date Created</th>
                    <th>Expiry Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons?.map((coupon, index) => {
                    const { _id, name,discount,expiresAt,createdAt} = coupon;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{discount}</td>
                        <td>{createdAt.substring(0,10)}</td>
                        <td>{expiresAt.substring(0,10)}</td>
                        <td>
                          <span>
                            <FaTrashAlt onClick={()=>confirmDelete(_id)} size={20} color={'red'} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </>
    );
}

export default CouponList