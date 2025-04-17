import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLectures } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLectures(){

    const {state} = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [userInput, setUserInput] = useState({
        id : state._id,
        lecture : undefined,
        title : "",
        description : "",
        videoSrc : ""
    })

    function handleInputChange(event){
        const {name,value} = event.target;
        setUserInput((prev)=>({
            ...prev,
            [name] : value
        }))
    }

    function handleVideo(event){
        const video = event.target.files[0];
        const sourse = window.URL.createObjectURL(video);
        
        setUserInput((prev)=>({
            ...prev,
            lecture : video,
            videoSrc : sourse
        }))
    }

    async function onFormSubmit(event){
        event.preventDefault();
        if(!userInput.lecture || !userInput.title || !userInput.description){
            return toast.error("All feilds are mandatory");
        }
        

        const res = await dispatch(addCourseLectures(userInput));

        if(res?.payload?.success){
            setUserInput({
                id : {state}._id,
                lecture : undefined,
                title : "",
                description : "",
                videoSrc : ""
            })
            navigate("/courses")
        }
    }

    useEffect(()=>{
        if(!{state}) navigate("/courses");
    },[])

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center text-white gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg mt-5 mb-40">
                    <header className="flex items-center justify-center relative">

                        <button 
                            className="absolute left-2 text-xl text-green-500"
                            onClick={()=> navigate(-1)}   
                        >
                            <AiOutlineArrowLeft/>
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                           Add New Lecture
                        </h1>
                    </header>

                    <form
                       onSubmit={onFormSubmit}
                       className="flex flex-col gap-3 p-4"
                       noValidate
                    >

                       <div className="flex flex-col gap-1">
                            <label htmlFor="text" className="font-semibold">
                                Title
                            </label>
                            
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Enter the title of the Lecture"
                                required
                                onChange={handleInputChange}
                                value={userInput.title}
                                className="bg-transparent px-3 py-1 border rounded-md"
                            />
                       </div>

                       <div className="flex flex-col gap-1">
                            <label htmlFor="description" className="font-semibold">
                                Description
                            </label>
                            
                            <textarea
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Enter the description of the Lecture"
                                required
                                onChange={handleInputChange}
                                value={userInput.description}
                                className="bg-transparent px-3 py-1 border rounded-md resize-none overflow-y-scroll h-36"
                            />
                       </div>

                       {userInput.videoSrc ? (
                            <video 
                               muted
                               src={userInput.videoSrc}
                               controls
                               controlsList="nodownload"
                               disablePictureInPicture
                               className="object-fill rounded-t-lg w-full"
                            >
                            
                            </video>
                       ) : (
                           <div className="h-48 border flex items-center justify-center cursor-pointer rounded-md">
                               <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">Choose your video</label>
                               <input 
                                    type="file"
                                    className="hidden"
                                    id="lecture"
                                    name="lecture"
                                    onChange={handleVideo}
                                    accept="video/mp4 video/x-mp4 video/*"
                                    />
                           </div>
                       )}

                       <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
                           Add new lecture
                       </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}


export default AddLectures;