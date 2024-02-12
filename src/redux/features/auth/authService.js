import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/users/v1/`


//Register Route

const register = async(userData) =>{
    const response = await axios.post(API_URL + "register",userData,{
        withCredentials:true
    })
    return response.data;
}

//Login Route
const login = async(userData) =>{
    const response = await axios.post(API_URL + "login" ,userData,{
        withCredentials:true
    })
    return response.data;
}

//Logout user
const logout = async () =>{
    const response = await axios.get(API_URL + "logout")
    console.log(response.data.message+"bhoom")
    return response.data.message;
}

const getLoginStatus =async () =>{
    const response = await axios.get(API_URL + "getLoginStatus" )
    console.log(response.data + "yash");
    return response.data;
}
const authService = {
    register,
    login,
    logout,
    getLoginStatus
}

export default authService;