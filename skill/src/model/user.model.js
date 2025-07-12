import mongoose,{model, Schema} from "mongoose";

const userSchema = new Schema(
    {
        name:{
            type:String,
            required: true
        },
        username:{
            type:String,
            required: true,
            lowercase: true,
            unique:true
        },
        email:{
            type:String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
        },
        phone:{
            type:String,
            required: true,
        },
        profile:{
            type:String,
        },
        password:{
            type:String,
            required:true,
        },
        skills:{
            type:[String],
            default:[]
        }
    },{timestamps:true}
)

export const User = mongoose.model("User", userSchema)