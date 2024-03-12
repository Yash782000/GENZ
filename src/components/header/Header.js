import React, { useEffect, useState } from 'react'
import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, logout } from '../../redux/features/auth/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { UserName } from '../../pages/profile/Profile';
import { FaUserCircle } from "react-icons/fa";
import { AdminOnlyLink } from '../hiddenLink/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalQuantity } from '../../redux/features/cart/CartSlice';
export const logo = (
    <div className={styles.logo}>
    <Link to="/">
        <h2>
            Genz<span>Store</span>
        </h2>
    </Link>
</div>
);
const activeLink = ({isActive}) =>(isActive ? `${styles.active}`:"")
function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu,setShowMenu] =useState(false);
    const [scrollPage,setScrollPage] = useState(false);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const cartItems = useSelector(selectCartItems);
    useEffect(()=>{
        dispatch(CALCULATE_TOTAL_QUANTITY());
      },[dispatch,cartItems])
    const fixedNav = () =>{
        if(window.scrollY > 50){
            setScrollPage(true);
        }else{
            setScrollPage(false);
        }
    }
    window.addEventListener("scroll",fixedNav)
    const toggleMenu = () =>{
        setShowMenu(!showMenu)
    }
    const hideMenu = () =>{
        setShowMenu(false);
    }
    const logoutUser = async()=>{
       await dispatch(logout());
       await dispatch(RESET_AUTH());
       navigate("/login");
    }
    const cart = (
        <span className={styles.cart}>
            <Link to="/cart">
                Cart
                <FaShoppingCart size={20} />
                <p>{cartTotalQuantity}</p>
            </Link>
        </span>
    );
  return (
     <header className={scrollPage ? `${styles.fixed}`:null}>
        <div className={styles.header}>
           {logo}
           <nav className={showMenu ? `${styles["show-nav"]}`:`${styles["hide-nav"]}`}>
            <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`:`${styles["nav-wrapper"]}`} onClick={hideMenu}>

            </div>
            <ul>
                <li className={styles["logo-mobile"]}>
                    {logo}
                    <FaTimes color="#fff" onClick={hideMenu} />
                </li>
                <li>
                    <NavLink to="/shop" className={activeLink}>Shop</NavLink>
                </li>
                <AdminOnlyLink>
                <li>
                    <NavLink to="/admin/home" className={activeLink}> | Admin</NavLink>
                </li>
                </AdminOnlyLink>

                
            </ul>
            <div className={styles["header-right"]}>
                <span className={styles.links}>
                    <ShowOnLogin>
                    <Link to={"/profile"} >
                      <FaUserCircle size={16} color="#ff7722"/>
                      <UserName/>
                    </Link>
                    </ShowOnLogin>
                    <ShowOnLogout>
                      <NavLink to={"/register"} className={activeLink}>Register</NavLink>
                    </ShowOnLogout>
                    <ShowOnLogout>
                      <NavLink to={"/login"} className={activeLink}>Login</NavLink>
                    </ShowOnLogout>
                    <ShowOnLogin>
                        <NavLink to={"order-history"} className={activeLink}>My Order</NavLink>
                    </ShowOnLogin>
                    <ShowOnLogin>
                       <Link to={"/"} onClick={logoutUser}>Logout</Link>
                    </ShowOnLogin>
                </span>
                {cart}
                
            </div>
           </nav>
           <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenu size={28} onClick={toggleMenu} />
           </div>
        </div>
     </header>
  )
}

export default Header