import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import PageMenu from '../../components/pageMenu/PageMenu'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/Card';
import { useNavigate } from 'react-router-dom';
import { getUser, updatePhoto, updateUser } from '../../redux/features/auth/authSlice';
import Loader from "../../components/loader/Loader"
import { AiOutlineCloudUpload } from "react-icons/ai";
import {toast} from "react-toastify"
import { shortenText } from '../../utlis';
const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset  = process.env.REACT_APP_UPLOAD_PRESENT
const url = `https://api.cloudinary.com/v1_1/dsedxqrca/image/upload`;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading,user}  = useSelector((state)=>state.auth);
  const initialState = {
        name : user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo:user?.photo || "",
        address:{
          address: user?.address?.address || "",
          state:user?.address?.state || "",
          country:user?.address?.country || "",
        }
      }
  const [profile,setProfile] = useState(initialState);
  const [profileImage,setProfileImage] = useState(null);
  const [imagePreview,setImagePreview] = useState(null);
  useEffect(()=>{
    if(user===null){
     dispatch(getUser());
    }
   },[dispatch,user])

   useEffect(()=>{
    if(user){
       setProfile({
            name : user?.name || "",
           email: user?.email || "",
           phone: user?.phone || "",
           role: user?.role || "",
           photo:user?.photo || "",
           address:{
            address: user?.address?.address || "",
            state:user?.address?.state || "",
            country:user?.address?.country || "",
           },
        });
    }
},[dispatch,user]);
  
  const handleInputChange = (e) =>{
    const {name,value} = e.target;
    setProfile({...profile,[name]:value})
  }
  const savePhoto = async(e) =>{
    e.preventDefault();
    let imageURL;
    try {
      if(
         profileImage !== null && (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.type === "image/png")
      ){
          const image = new FormData();
          image.append("file",profileImage)
          image.append("cloud_name",cloud_name)
          image.append("upload_preset",upload_preset)

          //Save Image to cloudinary
          const response = await fetch(url,{
            method:"post",
            body:image
          });
          const imgData = await response.json()
          imageURL = imgData.url.toString();
      }
      const userPhoto = {
        photo:profileImage ? imageURL :profile.photo
      }
      await dispatch(updatePhoto(userPhoto));
      setImagePreview(null);
    } catch (error) {
      toast.error(error.message);
    }
  }
  const handleChangeImage = (e) =>{
     setProfileImage(e.target.files[0]);
     setImagePreview(URL.createObjectURL(e.target.files[0]));
  }
  const saveProfile = async(e) =>{

       e.preventDefault();
       console.log(profile);
       const userData = {
        name:profile.name,
        phone:profile.phone,
        address:{
          address:profile.address,
          state:profile.state,
          country:profile.country
        }
      
       }
       
       await dispatch(updateUser(userData))
  }

  return (
    <>
    <section>
      {isLoading && <Loader />}
      <div className='container'>
        <PageMenu/>
        <h2>Profile</h2>
        <div className='--flex-start profile'>
            <Card cardClass={"card"}>
                {!isLoading && (
                    <>
                    <div className='profile-photo'>
                        <div>
                          <img src={imagePreview === null ? user?.photo : imagePreview} alt="profile"/>
                          <h3>Role : {profile?.role}</h3>
                          {imagePreview !== null && 
                            <div className='--center-all'>

                              <button className='--btn --btn-secondary' onClick={savePhoto}><AiOutlineCloudUpload size={18}/>Upload Photo</button>
                            </div>}
                        </div>
                    </div>
                    <form onSubmit={saveProfile}>
                        <p>
                            <label>Change Photo</label>
                            <input
                             type="file"
                             accept = "image/*"
                             name = "image"
                             onChange={handleChangeImage}
                            />
                        </p>
                        <p>
                            <label>Name:</label>
                            <input
                             type="text"
                             name="name"
                             value={profile?.name}
                             onChange = {handleInputChange}
                            />
                        </p>
                        <p>
                            <label>Email:</label>
                            <input
                            type="email"
                            name="email"
                            value={profile?.email}
                            onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            <label>Phone:</label>
                            <input
                            type="text"
                            name="phone"
                            value={profile?.phone}
                            onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            <label>Address:</label>
                            <input
                            type="text"
                            name="address"
                            value={profile?.address?.address}
                            onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            <label>State:</label>
                            <input
                            type="text"
                            name="state"
                            value={profile?.address?.state}
                            onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            <label>Country:</label>
                            <input
                            type="text"
                            name="country"
                            value={profile?.address?.country}
                            onChange={handleInputChange}
                            />
                        </p>
                        <button className='--btn --btn-primary --btn-block'>
                            Update Profile
                        </button>

                    </form>
                    </>
                )}
            </Card>
        </div>
      </div>
    </section>
    </>
  )
}

export const UserName = () =>{
  const {user}  = useSelector((state)=>state.auth);

  const userName = user?.name || "..."
  return(
    <span style={{color:"#ff772"}}>Hi , {shortenText(userName,9)}  | </span>
  )
}

export default Profile