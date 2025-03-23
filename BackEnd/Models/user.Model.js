import { Schema,model } from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from 'crypto';




const userSchema = new Schema({

    name : {
        type : String,
        required : [true,"Name is required"],
        trim : true,
        minLength : [3,"Name should be atleast 3 characters"],
        maxLength : [50,"Name should be atmost 50 characters"]
    },
    email : {
        type : String,
        required : [true,"Email is required"],
        trim : true,
        unique : true,
        lowercase : true,
        match : [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Email is invalid"]
    },
    password : {
        type : String,
        required : [true,"Password is required"],
        trim : true,
        minLength : [8,"Password should be atleast 8 characters"],
        select : false
    },
    avatar : {
        public_id : {
            type : String,
        },
        secure_url : {
            type : String
        }
    }, 
    role : {
        type : String,
        default : "USER",
        enum : ["USER","ADMIN"]
    },
    forgotPasswordToken : String,
    forgotPasswordExpire : Date,
    subscription : {
        id : String,
        status : String
    }
}, {
    timestamps : true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { 
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10); 
    next();
});


userSchema.methods = {
    generateJWTToken: async function () {
        return JWT.sign({ id: this._id, email: this.email, subscription: this.subscription, role: this.role }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    },
    
    comparePassword: async function (password) {
        return await bcrypt.compare(password, this.password); 
    },
    
    generateResetPasswordToken : async function () {
        const resetToken = crypto.randomBytes(20).toString('hex');
        this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.forgotPasswordExpire = Date.now() + 15*60*1000; // 15 min from now
        return resetToken;
    }
}


const User = model("User",userSchema);

export default User;