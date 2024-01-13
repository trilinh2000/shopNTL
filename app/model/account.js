const mongoose=require('mongoose');
const account=new mongoose.Schema({
    username:{
        type:String,
        required:true,//k duoc null
        unique:true,//k duoc trung
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    verify:{
        type:Boolean,
        default:false,
    },
    img:{
        data: Buffer,
        contentType: String
    }
},
{
    collection:"account",
    versionKey:false,
    timestamps:true
})
module.exports=mongoose.model("account",account)