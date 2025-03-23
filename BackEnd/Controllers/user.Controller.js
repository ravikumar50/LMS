import { arch } from "os";
import User from "../Models/user.Model.js";
import AppError from "../Utils/error.util.js";
import cloudinary from "cloudinary"; 
import fs from 'fs/promises';
import sendEmail from "../Utils/sendEmail.js";
import crypto from 'crypto';





const cookieOptions = {
    maxAge : 7*24*60*60*1000,  // 7 days
    httpOnly : true,
    secure : false
}

const register = async (req, res, next) => {
    const {name,email,password} = req.body;

    if((!name || !email || !password)){
        return next(new AppError("Please fill all the fields",400));
    }


    const userExists = await User.findOne({email});

    if(userExists){
        return next(new AppError("User already exists",400));
    }

    try{
        const user = await User.create({
            name,
            email,
            password,
            avatar : {
                public_id : email,
                secure_url : `https://ui-avatars.com/api/?name=${name}&length=1`
            }
        })

        if(!user){
            return next(new AppError("User not created",400));
        }


        // TODO file upload

        if(req.file){

            
            try{
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder : "LMS",
                    width : 250,
                    height : 250,
                    gravity : 'faces',
                    crop : 'fill'
                });
                if(result){
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    // remove file from local server
                    fs.rm(`/Upload/${req.file.filename}`)
                }
            }catch(err){
                return next(new AppError("File not uploaded",500))
            }
        }

        await user.save();

        user.password = undefined;

        const token = await user.generateJWTToken();


        res.cookie("token",token,cookieOptions);

        res.status(201).json({
            status : true,
            message : "User registered successfully",
            user
        })

       }catch(err){
        return next(new AppError(err.message,400));
    }
};


const login = async (req, res, next) => {

    try{
        
        const {email,password} = req.body;

        if(!email || !password){
            return next(new AppError("Please fill all the fields",400));
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return next(new AppError("User not Registered",400));
        }

        if(!await user.comparePassword(password)){
            return next(new AppError("Password is not correct",400));
        }
        
        const token = await user.generateJWTToken();
        user.password = undefined;
        res.cookie("token",token,cookieOptions);

        res.status(200).json({
            status : true,
            message : "User logged in successfully",
            user
        })

    }catch(err){
        return next(new AppError(err.message,500));
    }   
};

const logout = async (req, res, next) => {
    res.cookie("token",null,{
        secure : true,
        maxAge : 0,
        httpOnly : true
    }); 
    res.status(200).json({
        status : true,
        message : "User logged out successfully"
    });
};

const getProfile = async (req, res, next) => {

    try{
        const userId = req.user.id;
    
        const user = await User.findById(userId);
    
        if(!user){
            return next(new AppError("User not found", 400));
        }

        res.status(200).json({
            status : true,
            message : "User profile fetched successfully",
            user
        })
    }catch(err){
        return next(new AppError(err.message,500));
    }
};

const forgotPassword = async (req, res, next) => {
    const {email} = req.body;

    if(!email){
        return next(new AppError("Please give your email", 400));
    }

    const user = await User.findOne({email});
    if(!user){
        return next(new AppError("User not registered", 400));
    }

    const resetToken = await user.generateResetPasswordToken();

    await user.save();

    const resetPasswordURL = `localhost:${process.env.PORT}/api/v1/user/resetPassword/${resetToken}`;

    const subject = 'Reset Password';
    const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;
    
    console.log(resetPasswordURL);
    try{
        
        await sendEmail(email,subject,message);
        console.log(resetPasswordURL);
        

        res.status(200).json({
            status : true,
            message : `Reset Password token has been to ${email} successfully`
        });
    }catch(err){
        user.forgotPasswordExpire = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();
        return next(new AppError(err.message,500))
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body; 

        if (!password) {
            return next(new AppError("Please provide a new password", 400));
        }

        const forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const user = await User.findOne({
            forgotPasswordToken,
            forgotPasswordExpire: { $gt: Date.now() } 
        });

        if (!user) {
            return next(new AppError("Token is invalid or expired. Please try again.", 400));
        }

        user.password = password;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpire = undefined;

        await user.save(); 

        res.status(200).json({
            status: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { id } = req.user; 

        if (!oldPassword || !newPassword) {
            return next(new AppError("Please enter both old and new passwords", 400));
        }

        const user = await User.findById(id).select('+password'); 

        if (!user) {
            return next(new AppError("User does not exist", 400));
        }

        const isPasswordValid = await user.comparePassword(oldPassword);
        
        if (!isPasswordValid) {
            return next(new AppError("Old password is incorrect", 400));
        }

        user.password = newPassword;
        await user.save();

        user.password = undefined;
        
        res.status(200).json({
            status: true,
            message: "Password changed successfully"
        });

    } catch (err) {
        return next(new AppError(err.message, 500));
    }
};


const updateUser = async (req, res, next) => {
    try {
        const { name} = req.body;
        const { id } = req.user;

        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("User does not exist", 400));
        }

       
        if (name) {
            user.name = name;
        }
       

        if (req.file) {
            
            if (user.avatar && user.avatar.public_id) {
                await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            }

            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: "LMS",
                    width: 250,
                    height: 250,
                    gravity: "faces",
                    crop: "fill"
                });

                if (result) {
                    user.avatar = {
                        public_id: result.public_id,
                        secure_url: result.secure_url
                    };

                    
                    fs.unlink(req.file.path, (err) => {
                        if (err) console.error("Error deleting file:", err);
                    });
                }
            } catch (err) {
                return next(new AppError("File upload failed", 500));
            }
        }

        await user.save();

        res.status(200).json({
            status: true,
            message: "Profile updated successfully"
        });

    } catch (err) {
        return next(new AppError(err.message, 500));
    }
};


export { register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser};