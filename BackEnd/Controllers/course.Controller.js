import { appendFile } from "fs";
import Course from "../Models/course.Model.js"
import AppError from "../Utils/error.util.js"
import cloudinary from 'cloudinary';
import fs from 'fs/promises';

const getAllCourses = async (req, res, next)=>{

    try{
        const courses = await Course.find({});

        res.status(200).json({
            success : true,
            message : "All courses fetched succesfully",
            courses
        })
    }catch(err){
        return next(new AppError(err.message,400));
    }
}

const getLectureByCourseId = async (req, res, next)=>{
    try{
        const {id} = req.params;

        const course = await Course.findById(id);

        if(!course){
            return next(new AppError("Invalid Course Id",400));    
        }

        res.status(200).json({
            success : true,
            message : "Lectures fetched Succesfully",
            lecture : course.lectures
        })
    }catch(err){
        return next(new AppError(err.message,400));
    }
};
const createCourse = async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
        return next(new AppError("All fields are required", 400));
    }


    
    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail : {
            public_id : "Dummy",
            secure_url : "Dummy"
        },
    });

    if (!course) {
        return next(new AppError("Course could not be created, please try again", 500));
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "LMS",
                width: 250,
                height: 250,
                gravity: "faces",
                crop: "fill",
            });

            if (result) {
                course.thumbnail = {
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                };
                await fs.rm(req.file.path); // Remove local file
            }
        } catch (err) {
            return next(new AppError("File upload failed", 500));
        }
    }

    await course.save();

    res.status(201).json({
        success: true,
        message: "Course created successfully",
        course,
    });
};

const updateCourse = async (req, res, next)=>{
    try{
        const {id} = req.params;

        if(!id){
            return next(new AppError("Id is required",400));
        }

        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set : req.body
            },
            {
                runValidators : true
            }
        )

        if(!course){
            return next(new AppError("No course exists by this Id",400));
        }

        res.status(200).json({
            success : true,
            message : "Course updated Successfully",
            course
        })

    }catch(err){
        return next(new AppError(err.message,500));
    }
}

const removeCourse = async (req, res, next)=>{

    try{
        const {id} = req.params;

        if(!id){
            return next(new AppError("Id is required",400));
        }
        const course = await Course.findByIdAndDelete(id);

        if(!course){
            return next(new AppError("No course exists by this Id",400));
        }

        

        res.status(200).json({
            success : true,
            message : "Course deleted successfully",
            course
        });
    }catch(err){
        return next(new AppError(err.message,400));
    }
}

const addLectureToCourseById = async (req, res, next)=>{
    const {title, description} = req.body;
    const {id} = req.params;

    if(!title || !description){
        return next(new AppError("All feilds are required"));
    }

    const course = await Course.findById(id);

    if(!course){
        return next(new AppError("Course does not exists by this Id"));
    }

    const lectureData = {
        title,
        description,
        lecture : {}
    }

    if (req.file) {
        try {
          const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'LMS', 
            chunk_size: 50000000, 
            resource_type: 'auto',
          });
    
          if (result) {
    
            lectureData.lecture = {
                public_id: result.public_id,
                secure_url: result.secure_url
            };            
            await fs.rm(req.file.path);
          }

          
        } catch (error) {
          return next(new AppError(JSON.stringify(error) || 'File not uploaded, please try again',400));
        }
    }

    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
        success : true,
        message : "Lecture added successfully",
        course
    });   
}


const deleteLectureToCourseAndLectureId = async (req, res, next)=>{

    try{
        const {courseId,lectureId} = req.params;
    
        if(!courseId || !lectureId){
            return next(new AppError("Course Id and Lecture Id is required",400));
        }
    
        const course = await Course.findById(courseId);
    
        if(!course){
            return next(new AppError("Course does not exists by this Id"));
        }
    
        const lectureIndex = course.lectures.findIndex(lecture => lecture._id.toString() === lectureId);
        if (lectureIndex === -1) {
            return next(new AppError("Lecture not found", 404));
        }
    
        
        const lectureToDelete = course.lectures[lectureIndex];
        if (lectureToDelete.lecture && lectureToDelete.lecture.public_id) {
            await cloudinary.v2.uploader.destroy(lectureToDelete.lecture.public_id);
        }
    
        
        course.lectures.splice(lectureIndex, 1);
        course.numberOfLectures = course.lectures.length;
    
        await course.save();
    
        res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
            course
        });

    }catch(err){
        return next(new AppError(err.message,500));
    }
}



export{
    getAllCourses,
    getLectureByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
    deleteLectureToCourseAndLectureId
}