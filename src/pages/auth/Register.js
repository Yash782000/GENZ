import React, { useEffect, useState } from 'react'
import styles from "./auth.module.scss"
import registerImg from  "../../assets/register.png"
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { validateEmail } from '../../utlis'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_AUTH, register } from '../../redux/features/auth/authSlice'
import {toast} from "react-toastify"
import Loader from '../../components/loader/Loader'
const initailValue = {
    name:"",
    email:"",
    password:"",
    cPassword:""
}
const Register = () => {
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const {isLoading,isLoggedIn,isSuccess} = useSelector((state)=>state.auth);
    const [formData,setFormData] = useState(initailValue);
    const {name,email,password,cPassword} = formData;
    const handleInputChange = (e) =>{
      const {name,value} = e.target;
 
      setFormData({...formData,[name]:value})

    }

    const registerdUser = async(e) =>{
       e.preventDefault();
       if(!email || !password){
         return toast.error("All fileds are required")
       }
       if(password.length <6){
        return toast.error("Password must be greater that 6 words")
       }
       if(!validateEmail(email)){
        return toast.error("Pleasr enter a valid email address")
       }
       if(password !== cPassword){
        return toast.error("Password do not match")
       }

       const userData = {
        name,email,password
       }
       await dispatch(register(userData));
    }

    useEffect(()=>{
      if(isSuccess && isLoggedIn){
          navigate("/login");
      }
      dispatch(RESET_AUTH())
    },[isSuccess,isLoggedIn,dispatch,navigate])

  return (

    <>
      {isLoading && <Loader/>}
    <section className={`container ${styles.auth}` }>
    
    <Card>
        <div className={styles.form}>
           <h2>Register</h2>
           <form >
           <input 
              type="text"
              placeholder='Name'
              value={name}
              name="name"
              onChange = {handleInputChange}
              required
           />
           <input 
              type="text"
              placeholder='email'
              name="email"
              value={email}
              onChange = {handleInputChange}
              required
           />
           <input 
                type="text"
                placeholder='password'
                value={password}
                name="password"
                onChange={handleInputChange}
            />
            <input 
                type="text"
                placeholder='Cpassword'
                value={cPassword}
                name="cPassword"
                onChange={handleInputChange}
            />
            <button onClick={registerdUser} type="submit" className='--btn --btn-primary --btn-block'>Submit</button>
            </form>
            <span className={styles.register}>
               <p>Already have an Account ?</p>
               <Link to="/login">Login</Link>
            </span>
        </div>
    </Card>
    <div className={styles.img}>
        <img src={registerImg} alt="login" width="400"/>
    </div>
    
</section>
</>
  )
}

export default Register