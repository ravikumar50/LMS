import JWT from "jsonwebtoken";
import AppError from "../Utils/error.util.js";

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;  

    if (!token) {
        return next(new AppError("Please login to access this route", 401));
    }

    try {
        const userDetails = await JWT.verify(token, process.env.JWT_SECRET_KEY);

        req.user = userDetails;
        next();
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401));
    }
};

const authorizedRoles = (...roles) =>  (req, res, next)=>{
    const currentUserRole = req.user.role;

    if(!roles.includes(currentUserRole)){
        return next(new AppError("You donn't have permission to access this route",403))
    }

    next();
}

const authorizedSubscriber = async (req,res,next) => {
    const subscription = req.user.subscription;
    const currentUserRole = req.user.role;

    if(currentUserRole!=='ADMIN' && subscription.status!=='active'){
        return next(new AppError("Please subscribe to access this route",403))
    }

    next();
}

export {
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
};
