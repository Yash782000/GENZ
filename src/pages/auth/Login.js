import React, { useEffect, useState } from 'react'
import styles from "./auth.module.scss"
import loginImg from  "../../assets/login.png"
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { validateEmail } from '../../utlis'
import {toast} from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import { RESET_AUTH, login } from '../../redux/features/auth/authSlice'

const Login = () => {
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const {isLoading,isLoggedIn,isSuccess} = useSelector((state)=>state.auth);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const loginUser = async (e) =>{
        e.preventDefault();
        //Validation Check
        if(!email || !password){
            toast.error("all fields required")
        } 
        if(password.length<6){
            toast.error("Password must have more than 6 characters")
        }
        if(!validateEmail(email)){
            toast.error("Please enter correct email")
        }
        const userData = {
            email,
            password
        }
        await dispatch(login(userData))
    }
    useEffect(()=>{
        if(isSuccess && isLoggedIn){
            navigate("/");
        }
        dispatch(RESET_AUTH())
      },[isSuccess,isLoggedIn,dispatch,navigate])
  
  return (
    <>
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}` }>
         <div className={styles.img}>
             <img src={loginImg} alt="login" width="400"/>
         </div>
         <Card>
             <div className={styles.form}>
                <h2>Login</h2>
                <form >
                <input 
                   type="text"
                   placeholder='email'
                   name="email"
                   value={email}
                   onChange = {(e)=>setEmail(e.target.value)}
                   required
                />
                <input 
                     type="text"
                     placeholder='password'
                     value={password}
                     name="password"
                     onChange={(e)=>setPassword(e.target.value)}
                 />
                 <button onClick={loginUser} type="submit" className='--btn --btn-primary --btn-block'>Submit</button>
                 </form>
                 <span className={styles.register}>
                    <p>Dont have an Account ?</p>
                    <Link to="/register">Register</Link>
                 </span>
             </div>
         </Card>
         
    </section>
    </>
  )
}

export default Login