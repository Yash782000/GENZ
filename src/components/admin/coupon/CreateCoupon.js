import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../loader/Loader';
import Card from '../../card/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { createCoupon } from '../../../redux/features/coupon/couponSlice';

const CreateCoupon = () => {
    const [name,setName] =useState("");
    const [discount,setDiscount] = useState(0);
    const [expiresAt,setExpiresAt] = useState(new Date());
    const {isLoading} = useSelector((state)=>state.coupon);
    const dispatch = useDispatch();
    const saveCoupon = async (e)=>{
        e.preventDefault();
        if(name.length<5){
           toast.error("Coupon must be up to 5 characters")
        }
        if(discount<1){
            toast.error("Discount must be more than 1 ")
        }
        
        const formData = {
            name,
            discount,
            expiresAt
        }
        await dispatch(createCoupon(formData));
        setName("");
        setDiscount(0);
        setExpiresAt(new Date());
    }
    return (
      <>
      {isLoading && <Loader/>}
      <div className='--mb3'>
          <h2>Create a Coupon</h2>
          <p>use the form to <b>create a coupon</b></p>
          <Card cardClass={"card"}>
              <br/>
  
              <form onSubmit={saveCoupon}>
                  <label>Coupon Name</label>
                  <input 
                      type="text"
                      placeholder='coupon name'
                      name="name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      required
                      />
                    <label>Coupon Discount</label>
                  <input 
                      type="number"
                      placeholder='coupon discount'
                      name="discount"
                      value={discount}
                      onChange={(e)=>setDiscount(e.target.value)}
                      required
                      />
                  <label>Expiry Date</label>
                  <DatePicker
                      selected={expiresAt}
                      value={expiresAt}
                      onChange={(date)=>setExpiresAt(date)}
                      required
                      />
                  <div className='--my1'>
                      <button type="sybmit" className='--btn --btn-primary'>
                          Save Coupon
                      </button>
                  </div>
              </form>
          </Card>
      </div>
      </>
    )
}
export default CreateCoupon