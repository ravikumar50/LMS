import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState } from "react";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


function EditProfile(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDataFromRedux = useSelector((state) => state.auth.data);
    const [userData, setUserData] = useState(userDataFromRedux);
    const [previewImage, setPreviewImage] = useState(userData.avatar.secure_url);
    

    function handleImageUpload(event){
        event.preventDefault();

        const uploadedImage = event.target.files[0];
        if(uploadedImage){

            setUserData((prev)=>({
                ...prev,
                avatar : uploadedImage,
            }))
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load',()=>{
                setPreviewImage(fileReader.result);
            })
        }
    }

    function handleInputChange(event){
        event.preventDefault();
        const {name,value} = event.target;
        setUserData((prev)=>({
            ...prev,
            [name] : value
        }))
    }


    async function onFormSubmit(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append('name',userData.name);
        formData.append('avatar',userData.avatar);

        const response = await dispatch(updateProfile(formData)).unwrap();
        if(response?.success) navigate("/user/profile");
    
    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
               <form
                  onSubmit={onFormSubmit}
                  className="flex flex-col justify-center gap-5 rounded-md p-4 text-white
                  w-80 min-h-[26rem] shadow-[0_0_10px_black]"
               >
                   <h1 className="text-center text-2xl font-semibold">
                        Edit Profile
                   </h1>

                   <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                        )}                    
                   </label>

                   <input 
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        onChange={handleImageUpload}
                        accept=".jpg, .jpeg, .png, .svg"   
                    />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-semibold">Name</label>
                        <input
                            type="text"
                            required
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            value={userData.name}
                            className="bg-transparent px-2 py-1 border rounded-md"
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md py-2 text-lg text-white cursor-pointer font-semibold">
                          Update Profile
                    </button>

                    <Link to="/user/profile">
                       <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                       <AiOutlineArrowLeft/> Go Back</p>
                    </Link>
               </form>
            </div>
        </HomeLayout>
    )
}
export default EditProfile;