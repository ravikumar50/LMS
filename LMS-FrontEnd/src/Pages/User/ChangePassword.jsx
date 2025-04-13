import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { updatePassword } from "../../Redux/Slices/AuthSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function ChangePassword(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        oldPassword : '',
        newPassword : ''
    })

    function handleUserInput(event){
        const {name, value} = event.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function onSubmitForm(event){
        event.preventDefault();

        if(!data.oldPassword || !data.newPassword){
            return toast.error("Please fill all the fields");
        }

        const response = await dispatch(updatePassword(data)).unwrap();
       // console.log(response);
        if(response?.success) navigate("/");
        setData({
            oldPassword : '',
            newPassword : ''
        })
    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form onSubmit={onSubmitForm} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold ">Change Password</h1>


                    <div className="flex flex-col gap-1">
                        <label htmlFor="oldPassword" className="font-semibold">Old Password</label>
                        <input
                            type="password"
                            required
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter your Old Password"
                            onChange={handleUserInput}
                            value={data.oldPassword}
                            className="bg-transparent px-2 py-1 border rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword" className="font-semibold">New Password</label>
                        <input
                            type="password"
                            required
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter your New Password"
                            onChange={handleUserInput}
                            value={data.newPassword}
                            className="bg-transparent px-2 py-1 border rounded-md"
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 mt-2 py-2 rounded-md font-semibold text-lg cursor-pointer text-white">
                        Change Password
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

export default ChangePassword;