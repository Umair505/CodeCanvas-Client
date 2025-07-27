import axios from 'axios'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { uploadImage } from '../../../api/utils'
import { use, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import toast from 'react-hot-toast'

const AddPlant = () => {
  const {user} = useAuth();
  const [isUploading,setIsUploading] = useState(false);
  const [uploadedImage,setUploadedImage] = useState(null);
  const [imageError, setImageError] = useState(false);
 
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true);
    const form = e.target
    const name = form?.name?.value
    const price = form?.price?.value
    const category = form?.category?.value
    const description = form?.description?.value
    const quantity = form?.quantity?.value
    
    try{
    
     const plantData = {
         name,
         price: parseFloat(price),
         category,
         description,
         quantity: parseInt(quantity),
         image: uploadedImage,
         seller: {
           name: user?.displayName,
           email: user?.email,
           image: user?.photoURL
         }
     };
     const data = await axios.post(`${import.meta.env.VITE_API_URL}/add-plant`,plantData)
     toast.success("Plant added successfully")
     form.reset()
    }
    catch(error){
     console.error("Error adding plant:", error);
     toast.error("Failed to add plant")
   }
   finally{
     setIsUploading(false);
   }
  }

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    try{
      const imageUrl = await uploadImage(image);
    setUploadedImage(imageUrl);
    }
    catch(error){
      console.error("Error uploading image:", error);
      setImageError(true);
    }
  }

  return (
    <div>
      {/* Form */}
      <AddPlantForm handleFormSubmit={handleFormSubmit} isUploading={isUploading} uploadedImage={uploadedImage} handleImageUpload={handleImageUpload} imageError={imageError} />
    </div>
  )
}

export default AddPlant
