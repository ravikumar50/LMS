import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCourseLectures, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLectures(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();
    

    
    

    const {lectures} = useSelector((state) => state.lecture);
    const {role} = useSelector((state)=> state.auth);

    const [currVideo, setCurrVideo] = useState(0);

    async function onlectureDelete(courseId, lectureId){
        await dispatch(deleteCourseLectures({courseId : courseId, lectureId : lectureId}))
        await dispatch(getCourseLectures(courseId));
    }


    useEffect(()=>{
        if(!state) navigate("/courses");
        dispatch(getCourseLectures(state._id));
    },[])
    return(
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-5">
                <div className="text-center text-2xl text-yellow-500 font-semibold">
                      Course Name : {state.title}
                </div>

                {(lectures && lectures.length>0) ? (
                    <div className="flex justify-center gap-10 w-full">
                    {/* left section for playing videos and displaying course details to admin*/}
                    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] h-fit mb-40">
                        <video 
                                src={lectures && lectures[currVideo]?.lecture?.secure_url}
                          //  src="https://www.youtube.com/watch?v=GqqwbcgOHek"
                            className="object-fill rounded-t-lg w-full"
                            controls 
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"
                        >
                        </video>

                        <div>
                            <h1>
                                <span className="text-yellow-500"> Title : {" "}</span>
                                {lectures && lectures[currVideo]?.title}
                            </h1>
                                <p>
                                  <span className="text-yellow-500 line-clamp-4">
                                    Description : {" "}
                                  </span>
                                  {lectures && lectures[currVideo]?.description}
                               </p>
                        </div>
                    </div>

                    {/* Right Section for displaying list of lectures */}

                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 mb-40">
                        <li className="text-xl font-semibold text-yellow-500 flex items-center justify-between">
                          <p>Lectures List</p>
                          {role==='ADMIN' && (
                            <button 
                                onClick={()=> navigate("/courses/addlecture", {state : {...state}})} 
                                className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                                Add New Lecture
                            </button>
                          )}
                        </li>

                        {lectures && 
                            lectures.map((lecture,idx)=>{
                                return(
                                    <li className="space-y-2" key={lecture._id}>
                                        <p className="cursor-pointer" onClick={()=> setCurrVideo(idx)}> 
                                            <span>
                                               {" "} Lecture {idx+1} : {" "}
                                            </span>
                                            {lecture?.description}    
                                        </p>
                                        

                                        {role==='ADMIN' && (
                                            <button onClick={() => onlectureDelete(state._id, lecture._id)} className="btn btn-error px-2 py-1 rounded-md font-semibold text-sm">
                                               Delete Lecture
                                            </button>
                                        )}
                                    </li>
                                )
                            })
                        }
                    </ul>

                    </div>) : (
                    role==='ADMIN' && (
                        <button 
                            onClick={()=> navigate("/courses/addlecture", {state : {...state}})} 
                            className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                            Add New Lecture
                        </button>
                    ))
                }
            </div>
        </HomeLayout>
        )
}

export default DisplayLectures;