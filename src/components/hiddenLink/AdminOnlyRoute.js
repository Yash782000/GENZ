import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/auth/authSlice'
import { Link } from "react-router-dom";
const AdminOnlyRoute = ({children}) => {
    const user = useSelector(selectUser);
    const userRole = user?.role;

    if(userRole === "admin"){
        return children
    }
  return (
    <section style = {{height:"80vh"}}>
        <div className='container'>
            <h2>Permission denied</h2>
            <p>This page can only viewd by an admin user</p>
            <br/>
            <Link to={"/"}>
                <button className="--btn">Back to Home</button>
            </Link>
        </div>
    </section>
  )
}

export default AdminOnlyRoute

export const AdminOnlyLink = ({children}) =>{
    const user = useSelector(selectUser);
    const userRole = user?.role;

    if(userRole === "admin"){
        return children
    }
    return null
}
