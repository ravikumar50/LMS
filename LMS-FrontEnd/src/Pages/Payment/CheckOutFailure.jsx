import HomeLayout from "../../Layouts/HomeLayout";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

function CheckOutFailure(){
    return(
        <HomeLayout>
           <div className="min-h-[90vh] flex items-center justify-center text-white">
               <div className="w-80 h-[26rem] flex flex-col items-center justify-center shadow-[0_0_10px_black] rounded-lg relative">
                   <h1 className="bg-red-500 absolute top-0 w-full text-center font-bold text-2xl py-4 rounded-t-lg">
                        Payment Failed
                    </h1>

                    <div className="px-4 flex flex-col items-center justify-center space-y-2">
                        <div className="text-center space-y-2">
                            <h2 className="text-lg font-semibold">
                                Oops! Your payment failed
                            </h2>
                            <p className="text-center">
                               Please try again later.
                            </p>
                        </div>
                        <RxCrossCircled className="text-red-500 text-5xl"/>
                    </div>

                    <Link to="/checkout" className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-center text-xl rounded-b-selector font-semibold">
                       <button>Try again</button>
                    </Link>
               
               </div>
           
           </div>
        </HomeLayout>
    )
}

export default CheckOutFailure;