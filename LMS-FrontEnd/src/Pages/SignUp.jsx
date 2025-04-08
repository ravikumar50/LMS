import { isValidElement, useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isValidEmail, isValidPassword } from "../Helpers/regexMatcher";

function SignUp(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");
    const [signUpData, setSignUpData] = useState({
        name: "",
        email : "",
        password : "",
        avatar : ""
    })

    function handleUserInput(e){
        const {name, value} = e.target;
        setSignUpData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function getImage(event){
        event.preventDefault();

        const uploadedImage = event.target.files[0];
        if(uploadedImage){
            setSignUpData((prev)=>({
                ...prev,
                avatar : uploadedImage
            }))

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load',()=>{
                setPreviewImage(fileReader.result);
            })
        }
    }

    async function createNewAccount(event){
        event.preventDefault();

        if(!signUpData.name || !signUpData.email || !signUpData.password){
            toast.error("Please fill all the fields")
            return;
        }

        if(signUpData.name.length<3){
            toast.error("Name must be at least 3 characters long")
            return;
        }

        if(!isValidEmail(signUpData.email)){
            return toast.error("Please enter a valid email address");
        }

        if (!isValidPassword(signUpData.password)) {
            return toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number or special character.");
        }

        const formData = new FormData();
        formData.append('name', signUpData.name);
        formData.append('email', signUpData.email);
        formData.append('password', signUpData.password);
        formData.append('avatar', signUpData.avatar);

        // dispatch create account action


        const response = await dispatch(createAccount(formData)).unwrap();
      //  console.log(response);
        
        if(response?.success) navigate("/");
    

        setSignUpData({
            name: "",
            email : "",
            password : "",
            avatar : ""
        })
        setPreviewImage("");
        
    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form onSubmit={createNewAccount} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold ">Registration Page</h1>

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
                        onChange={getImage}
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
                            onChange={handleUserInput}
                            value={signUpData.name}
                            className="bg-transparent px-2 py-1 border rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={handleUserInput}
                            value={signUpData.email}
                            className="bg-transparent px-2 py-1 border rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            onChange={handleUserInput}
                            value={signUpData.password}
                            className="bg-transparent px-2 py-1 border rounded-md"
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 mt-2 py-2 rounded-md font-semibold text-lg cursor-pointer text-white">
                        Create Account
                    </button>

                    <p className="text-center">
                        Already have an account ? <Link to={"/login"} className="link text-accent cursor-pointer"> Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default SignUp;