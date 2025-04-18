import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function CheckOutSuccess(){
    return(
        <HomeLayout>
           <div className="min-h-[90vh] flex items-center justify-center text-white">
               <div className="w-80 h-[26rem] flex flex-col items-center justify-center shadow-[0_0_10px_black] rounded-lg relative">
                   <h1 className="bg-green-500 absolute top-0 w-full text-center font-bold text-2xl py-4 rounded-t-lg">
                        Payment Successfull
                    </h1>

                    <div className="px-4 flex flex-col items-center justify-center space-y-2">
                        <div className="text-center space-y-2">
                            <h2 className="text-lg font-semibold">
                                Welcome to the pro bundle
                            </h2>
                            <p className="text-center">
                               Now you can enjoy all the courses.
                            </p>
                        </div>
                        <AiFillCheckCircle className="text-green-500 text-5xl"/>
                    </div>

                    <Link to="/" className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-center text-xl rounded-b-selector font-semibold">
                       <button>Go to Dashboard</button>
                    </Link>
               
               </div>
           
           </div>
        </HomeLayout>
    )
}

export default CheckOutSuccess;