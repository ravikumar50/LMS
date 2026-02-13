import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import {Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from "chart.js"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatData } from "../../Redux/Slices/StatsSlice";
import { getPaymentRecords } from "../../Redux/Slices/RazorPaySlice";
import {Pie, Bar} from "react-chartjs-2"
import {FaUsers} from "react-icons/fa"
import {FcSalesPerformance} from "react-icons/fc"
import {GiMoneyStack} from "react-icons/gi"



ChartJs.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);


function AdminDashboard(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

   // const {allUserCount, subscribedCounts} = useSelector((state)=> state.stats);
    const [allUserCount, subscribedCounts] = [115,60];

   // const {allPayments, finalMonths, monthlySalesRecord} = useSelector((state) => state.razorpay)

   const monthlySalesRecord = [13,10,8,5,3,6,20,12,8,24,6,11];
   const allPayments = {
       count : 13
   }
    const userData = {
        labels : ["Registered User", "Subscribed User"],
        datasets : [
            {
                label : "User Details",
                data : [allUserCount, subscribedCounts],
                backgroundColor : ["yellow", "green"],
                borderWidth : 1,
                borderColor : ["yellow", "green"],
                
            }
        ]
    }

    const salesData = {
        labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets : [
            {
                label : "Sales Record",
                data : monthlySalesRecord,
                backgroundColor : ["rgb(255, 99, 132)"],
                borderColor : ["white"],
                borderWidth : 2
            }
        ]
    }

    const myCourse = useSelector((state)=> state?.coures?.courseData);

    async function  onCourseDelete(id) {
        if(window.confirm("Are you sure you want to delete the course ?")){
            const res = await dispatch(deleteCourse(id));
            if(res.payload.success){
                await dispatch(getAllCourses());
            }
        }
    }

    useEffect(()=>{
        (async ()=> {
            await dispatch(getAllCourses());
           // await dispatch(getStatData());
          //  await dispatch(getPaymentRecords());
        })()
    },[])
    
    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white mb-40">
                <h1 className="text-center text-5xl font-semibold text-yellow-500">
                    Admin Dashboard
                </h1>



                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-[0_0_10px_black] rounded-md">
                        <div className="w-80 h-80">
                            <Pie 
                                data={userData} 
                                options={{plugins : {legend : {labels : {color : 'white'}}}}}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-[0_0_3px_black]">
                                <div className="flex flex-col">
                                    <p className="font-semibold">Registered User</p>
                                    <h3 className="text-4xl font-bold">{allUserCount}</h3>
                                </div>

                                <FaUsers className="text-5xl text-yellow-500"/>
                            </div>

                            <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-[0_0_3px_black]">
                                <div className="flex flex-col">
                                    <p className="font-semibold">Subscribed User</p>
                                    <h3 className="text-4xl font-bold">{subscribedCounts}</h3>
                                </div>
                                <FaUsers className="text-5xl text-green-500"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-10 p-5 shadow-[0_0_10px_black] rounded-md">

                        <div className="h-80 w-full relative">
                            <Bar 
                               data={salesData}
                               className="absolute h-80 bottom-0 w-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-[0_0_3px_black]">
                                <div className="flex flex-col">
                                    <p className="font-semibold">Subscription Count</p>
                                    <h3 className="text-4xl font-bold">{allPayments.count}</h3>
                                </div>

                                <FcSalesPerformance className="text-5xl text-yellow-500"/>
                            </div>

                            <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-[0_0_3px_black]">
                                <div className="flex flex-col">
                                    <p className="font-semibold">Total Revenue</p>
                                    <h3 className="text-4xl font-bold">{allPayments.count*499}</h3>
                                </div>

                                <GiMoneyStack className="text-5xl text-green-500"/>
                            </div>
                        </div>
                    
                    </div>
                </div>


                <div className="m-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-center text-3xl font-semibold">Course Overview</h1>

                        <button 
                            onClick={()=>navigate("/courses/create")}
                            className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-md text-lg px-4 py-2 font-semibold cursor-pointer"
                        >
                            Create New Course
                        </button>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AdminDashboard;