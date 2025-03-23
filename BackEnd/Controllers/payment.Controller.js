import User from "../Models/user.Model.js";
import Payment from "../Models/payment.Model.js";
import AppError from "../Utils/error.util.js";
import { razorpay } from "../server.js";
import crypto from 'crypto';

const allPayments = async (req, res, next)=>{
    try{
        const {count} = req.query;
        
        const subscriptions = await razorpay.subscriptions.all({
            count : count || 10
        });


        res.status(200).json({
            success : true,
            message : "All payments fetched Succcessfully",
            subscriptions
        })
    }catch(err){
        return next(new AppError(err.message,500));
    }
}

const getRazorpayApiKey = async (req, res, next)=>{

    try{
        res.status(200).json({
            success : true,
            message : "RazorPay API Key",
            key : process.env.RAZORPAY_KEY_ID
        });
    }catch(err){
        return next(new AppError(err.message,500));
    }
    
}

const buySubscription = async (req, res, next)=>{

    try{
        const {id} = req.body;

        const user = await User.findById(id);
        if(!user){
            return next(new AppError("User does not exits",400));
        }


        if(user.role==='ADMIN'){
            return next(new AppError("Admin cannot purchase a subscription",400))
        }

        try{
            const subscription = await razorpay.subscriptions.create({
                plan_id : process.env.RAZORPAY_PLAN_ID,
                customer_notify : 1
            });

            user.subscription.id = subscription.id;
            user.subscription.status = subscription.status;

            await user.save();

            res.status(200).json({
                success : true,
                message : "Subscribed Successfully",
                subscription_id : subscription.id
            });
        }catch (error) {
            return next(new AppError("Razorpay subscription creation failed", 500));
        }
    }catch(err){
        return next(new AppError(err.message,500));
    }
    
}

const verifySubscription = async (req, res, next)=>{

    try{
        const {id} = req.user;
        const {razorpay_payment_id, razorpay_signature, razorpay_subscription_id} = req.body;
    
        const user = await User.findById(id); 
    
        if(!user){
            return next(new AppError("User does not exits",400));
        }
    
        const subscription_id = user.subscription.id
    
        const generatedSignature = crypto
                .createHmac('Sha256', process.env.RAZORPAY_SECRET)
                .update(`${razorpay_payment_id}|${subscription_id}`)
                .digest('hex');
        
                
        if(generatedSignature!==razorpay_signature){
            return next(new AppError("Payment not verified, Please try again",500));
        }
    
        await Payment.create({
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature
        });
    
        user.subscription.status = 'active';
        await user.save();
    
        res.status(200).json({
            success : true,
            message : "Payment verified Successfully!!"
        });
        
    }catch(err){
        return next(new AppError(err.message,500));
    }

}

const cancelSubscription = async (req,res,next)=>{

    try{
        const {id} = req.user;
        const user = await User.findById(id);
        if(!user){
            return next(new AppError("User does not exits",400));
        }
        if(user.role==='ADMIN'){
            return next(new AppError("Admin cannot cancel a subscription",400))
        }
        const subscription_id = user.subscription.id;
        const subscription = await razorpay.subscriptions.cancel(subscription_id);
        user.subscription.status = subscription.status;
        await user.save();

        res.status(200).json({
            success : true,
            message : "Subscription cancelled Successfully"
        });

    }catch(err){
        return next(new AppError(err.message,500));
    }

    
}


export {
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments
}