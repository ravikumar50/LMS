import { Schema,model } from "mongoose";


const courseSchema = new Schema({
    title : {
        type : String,
        required : [true, "Title is required"],
        minLength : [5, "Title must be atleast 5 character long"],
        maxLength : [50, "Title should be atmost 50 character long"],
        trim : true
    },

    description : {
        type : String,
        required : [true, "Description is required"],
        minLength : [5, "Description must be atleast 4 character long"],
        maxLength : [200, "Description should be atmost 50 character long"]
    },

    category : {
        type : String,
        required : [true, "Catogory is required"]
    },

    lectures : [
        {
            title : String,
            description : String,
            lecture  : {
                public_id : {
                    type : String,
                    required : true
                },
                secure_url : {
                    type : String,
                    required : true
                }
            }
        }
    ],

    thumbnail : {
        public_id : {
            type : String,
            required : true
        },
        secure_url : {
            type : String,
            required : true
        }
    },

    numberOfLectures : {
        type : Number,
        default : 0
    },

    createdBy : {
        type : String,
        trim : true,
        required : true
    }
},  {

    timestamps : true
})

const Course = model("Course",courseSchema);
export default Course;