import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function Profile(){
    const userData = useSelector((state)=> state.auth.data);
    
    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                   <img
                      src={userData?.avatar?.secure_url}
                      alt="User_Image"
                      className="w-40 m-auto rounded-full border-black"
                   />
                   <h3 className="text-xl font-semibold text-center capitalize">
                       {userData?.name}
                   </h3>

                   <div className="grid grid-cols-2">
                       <div className="flex flex-col">
                            <p>Email :</p>
                            <p>Role : </p>
                            <p>Subscription : </p>
                       </div>

                       <div className="flex flex-col">
                            <p>{userData.email}</p>
                            <p>{userData.role}</p>
                            <p>{userData?.subscription?.status==='active' ? "Active" : "Inactive"}</p>
                       </div>
                   </div>

                   <div className="flex items-center justify-between gap-2">
                        <Link 
                            to="/user/changepassword" 
                            className="w-1/2 bg-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 cursor-pointer text-center">    

                            <button>Change Password</button>
                        </Link>

                        <Link 
                            to="/user/editprofile" 
                            className="w-1/2 bg-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 cursor-pointer text-center">    

                            <button>Edit Profile</button>
                        </Link>
                   </div>
                   {userData?.subscription?.status==='active' &&
                      <button className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 cursor-pointer text-center">
                        Cancel Subscription
                      </button>
                   }
                </div>
            </div>
        </HomeLayout>
    )
}
export default Profile;