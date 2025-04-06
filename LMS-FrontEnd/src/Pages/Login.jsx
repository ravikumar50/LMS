import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { loginToAccount } from "../Redux/Slices/AuthSlice";

function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email : "",
        password : "",
    })

    function handleUserInput(e){
        const {name, value} = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    async function onLogin(event){
        event.preventDefault();

        if(!loginData.email || !loginData.password){
            toast.error("Please fill all the fields")
            return;
        }


        const response = await dispatch(loginToAccount(loginData)).unwrap();
      //  console.log(response);
        
        if(response?.success) navigate("/");
    

        setLoginData({
            email : "",
            password : "",
        })
        
        
    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form onSubmit={onLogin} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold ">Login Page</h1>


                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={handleUserInput}
                            value={loginData.email}
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
                            value={loginData.password}
                            className="bg-transparent px-2 py-1 border rounded-md"
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 mt-2 py-2 rounded-md font-semibold text-lg cursor-pointer text-white">
                        Login
                    </button>

                    <p className="text-center">
                        Don't have an account ? <Link to={"/signup"} className="link text-accent cursor-pointer"> SignUp</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Login;