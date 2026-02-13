import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import { BsPersonCircle } from "react-icons/bs";
import SignUp from "../SignUp";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title : "",
        description : "",
        createdBy : "",
        category : "",
        thumbnail : null,
        previewImage : ""
    });

    function handleImageUpload(event){
        event.preventDefault();
        const uploadedImage = event.target.files[0];
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load',()=>{
                setUserInput((prev)=>({
                    ...prev,
                    previewImage : fileReader.result,
                    thumbnail : uploadedImage
                }))
            })
        }
    }

    function handleUserInput(event){
        event.preventDefault();

        const {name, value} = event.target;
        setUserInput((prev)=>({
            ...prev,
            [name] : value
        }))
    }


    async function createCourse(event){
        event.preventDefault();

        if(!userInput.title || !userInput.category  || !userInput.createdBy || !userInput.description){
            return toast.error("Please fill all the fields");
        }

        const formData = new FormData();
        formData.append('title', userInput.title);
        formData.append('description', userInput.description);
        formData.append('createdBy', userInput.createdBy);
        formData.append('category', userInput.category );
        formData.append('thumbnail', userInput.thumbnail);

        const response = await dispatch(createNewCourse(formData)).unwrap();
        
        if(response?.success) navigate("/courses");
        setUserInput({
            title : "",
            description : "",
            createdBy : "",
            category : "",
            thumbnail : null,
            previewImage : ""
        });
    }

    return(
        <HomeLayout>
            <div className="flex items-start justify-center h-[90vh] mt-5 mb-40">
                <form onSubmit={createCourse} noValidate className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-[700px] shadow-[0_0_10px_black] relative">

                    <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft onClick={navigate(-1)}/>
                    </Link>
                    <h1 className="text-center text-2xl font-bold ">Create New Course</h1>
                    
                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="thumbnail" className="cursor-pointer">
                                {userInput.previewImage ? (
                                    <img
                                    className="w-full h-44 m-auto border rounded-md"
                                    src={userInput.previewImage}
                                    alt="Course Thumbnail"
                                    />
                                ) : (
                                    <div className="w-full h-44 m-auto flex items-center justify-center border rounded-md">
                                    <h1 className="font-bold text-lg">Upload your Course Thumbnail</h1>
                                    </div>
                                )}
                                </label>

                                <input
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                className="hidden"
                                onChange={handleImageUpload}
                                accept=".jpg, .jpeg, .png, .svg" 
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="text-lg font-semibold ">Course Title</label>
                                <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                placeholder="Enter Course Title"
                                className="bg-transparent px-2 py-1 border rounded-md"
                                onChange={handleUserInput}
                                value={userInput.title}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="createdBy" className="text-lg font-semibold ">Course Instructor</label>
                                <input
                                    id="createdBy"
                                    name="createdBy"
                                    type="text"
                                    required
                                    placeholder="Enter Instructor Name"
                                    className="bg-transparent px-2 py-1 border rounded-md"
                                    onChange={handleUserInput}
                                    value={userInput.createdBy}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="category" className="text-lg font-semibold ">Course Category</label>
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    required
                                    placeholder="Enter Course Category"
                                    className="bg-transparent px-2 py-1 border rounded-md"
                                    onChange={handleUserInput}
                                    value={userInput.category}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="description" className="text-lg font-semibold ">Course Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    type="text"
                                    required
                                    placeholder="Enter Course Description"
                                    className="bg-transparent px-2 py-1 border rounded-md h-24 overflow-y-scroll resize-none"
                                    onChange={handleUserInput}
                                    value={userInput.description}
                                />
                            </div>
                        </div>
                    </main>

                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 mt-2 py-2 rounded-md font-semibold text-lg cursor-pointer text-white">
                        Create Course
                    </button>
                </form>
            
            </div>
        </HomeLayout>
    )
}
export default CreateCourse;