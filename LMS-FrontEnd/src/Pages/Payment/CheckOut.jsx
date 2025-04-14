import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorPaySlice";
import toast from "react-hot-toast";
import {BiRupee} from "react-icons/bi"

function CheckOut(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const razorpayKey = useSelector((state) => state.razorpay.key)
    const subscription_id = useSelector((state) => state.razorpay.subscription_id);
    

    const paymentDetail = {
        razorpay_payment_id : '',
        razorpay_signature : '',
        razorpay_subscription_id : ''
    }

    const userData = useSelector((state) => state.auth.data)

    async function handleSubscription(event){
        event.preventDefault();
        if(!razorpayKey || !subscription_id){
            return toast.error("Something went wrong");
        }

        const options = {
            key : razorpayKey,
            subscription_id : subscription_id,
            name : "Coursify Pvt. Ltd.",
            description : "Subscription",
            theme : {
                color : "#f37254"
            },
            prefil : {
                email : userData.email,
                name : userData.name
            },
            handler : async function (response) {
                paymentDetail.razorpay_payment_id = response.razorpay_payment_id,
                paymentDetail.razorpay_signature = response.razorpay_signature,
                paymentDetail.razorpay_subscription_id = response.razorpay_subscription_id

                toast.success("Payment Successfull")

                const res  = await dispatch(verifyUserPayment(paymentDetail));
                (res?.payload?.success) ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load(){
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle(userData._id));
    }
    useEffect(()=>{
        load();
    },[])

    return(
        <HomeLayout>
            
            <form  
               noValidate
               className="min-h-[90vh] flex items-center justify-center text-white"
            >
               <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center font-bold py-4 text-2xl rounded-t-box">
                       Subscription Bundle
                    </h1>

                    <div className="px-2 space-y-5 text-center">
                        <p className="text-[17px]">
                          This purchase will allow you to access all available courses of our platform for {" "}
                          <span className="text-yellow-500 font-bold">
                             <br/>
                             1 year duration.
                          </span> {" "}
                          All the existing and new launched courses will be also available.
                        </p>

                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                           <BiRupee></BiRupee><span>499</span> only
                        </p>

                        <div className="text-gray-200">
                           <p>100% refund on cancelation</p>
                           <p>* Terms and conditions applied*</p>
                        </div>

                        <button 
                           type="submit"
                           className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 w-full absolute bottom-0 left-0 rounded-b-selector text-xl font-bold py-2"
                        >
                           Buy Now
                        </button>
                    </div>
               </div>
           
            </form>
            
        </HomeLayout>
    )
}

export default CheckOut;