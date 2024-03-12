import React, { useState } from 'react'
import Card from '../../card/Card'
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./ProductForm.scss"
import { BsTrash } from "react-icons/bs";
import {toast} from "react-toastify"
const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset  = process.env.REACT_APP_UPLOAD_PRESENT
const url = `https://api.cloudinary.com/v1_1/dsedxqrca/image/upload`;



const UploadWidget = ({files,setFiles}) => {
    const [selectedImages,setSelectedImages] = useState([])
    const [images,setImages] = useState([])
    const [progress,setProgress] = useState(0);
    const [uploading,setUploading] = useState(false);

    const addImages = (e) =>{
        console.log(e.target.files)
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imagesArray  = selectedFilesArray?.map((file)=>{
            return URL.createObjectURL(file)
        })
        setImages((prevImages)=>prevImages.concat(selectedFilesArray))
        setSelectedImages((prevImages)=>prevImages.concat(imagesArray));
        e.target.value="";
    }
    const removeImage = (image) => {
        const imageIndex =selectedImages.indexOf(image);
        setSelectedImages(
            selectedImages.filter((img)=>img !== image)
        )
        setImages(
            images.filter((img,index)=> index !== imageIndex)
        )
        
    }
    const uploadImages = async() =>{
        setUploading(true);
        let imageUrls = [];
      
        const formData = new FormData(); 
        for (let i=0;i<images.length;i++){
            let file = images[i];
            formData.append("file",file);
            formData.append("upload_preset",upload_preset);
            formData.append("cloud_name",cloud_name);
            //formData.append("folder","GenZStore");

             fetch(url,{
                method:"post",
                body:formData,

            }).then((response)=>{
                console.log(response);
                return  response.json()
            })
            .then((data)=>{
                console.log(data)
                imageUrls.push(data.url);
                setProgress(imageUrls.length);
                if(imageUrls.length === images.length){
                    setFiles((prevFiles)=>prevFiles.concat(imageUrls))
                    setUploading(false);
                    console.log(files)
                    toast.success("Image upload complete")
                    setImages([])
                    setSelectedImages([])
                    setProgress(0);
                }
            }).catch((error)=>{
                setUploading(false);
                toast.error(error.message);
                console.log(error);
            })
        }
    }

  return (
    <div>
        <Card cardClass={"formcard group"}>
            <label className='uploadWidget'>
               <AiOutlineCloudUpload size={35} />
               <br/>
               <span>Click to upload up to 5 Images</span>
        
              <input 
              type="file"
              name="images"
              onChange={addImages}
              multiple
              accept='image/png , image/jpeg,image/webp'
              hidden
              />
              </label>
            <br/>
          
            
            {selectedImages.length > 0 && (
                selectedImages.length>5 ? (
                   <>
                    <p className='error'>You can't upload more than 5 images</p>
                    <br/>
                    <span>Please remove <b>{selectedImages.length -5}</b> Images of them</span>
                    </>
                    )
                :(
                  <div className='--center-all'>
                    <button className='--btn --btn-danger --btn-large'
                    disabled={uploading}
                    onClick={uploadImages}
                    >
                        {uploading ? `Uploading ${progress} of ${images.length}`:`Upload ${images.length} Image(s)`}
                    </button>
                  </div>
                )
            )}
            {/*View Selected Image */}
            <div className={selectedImages?.length > 0 ? "images" : ""}>
                 {selectedImages!== 0 && 
                    selectedImages?.map((image,index)=>{
                        return(
                            <div key={index} className='image' >
                                <img src={image} alt="productImage" width={200}/>
                                <button className="-btn"onClick={()=>removeImage(image)} >
                                    <BsTrash size={25} />
                                </button>
                                <p>{index+1}</p>
                            </div>
                        )
                    })}
            </div>
        </Card>

    </div>
  )
}

export default UploadWidget