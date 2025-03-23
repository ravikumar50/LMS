import {Schema,model} from 'mongoose'

const paymentScheme = new Schema({
    payment_id : {
        type : String,
        required : [true, "Payment id is required"]
    },
    
    subscription_id : {
        type : String,
        required : [true, "Subscription id is required"]
    },

    signature : {
        type : String,
        required : [true, "Signature id is required"]
    }
},{
    timestamps : true
})


const Payment = model("Payment",paymentScheme);

export default Payment;