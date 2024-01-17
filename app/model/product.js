const mongoose=require('mongoose');
const account=require('./account')
const product=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        required:true,//k dc phep null
        ref:"account",
    },
    name:{
        type:String,
        required:true,
    },
    title:{
        type:String,
    },
    img:{
        data: Buffer,
        contentType: String
    }
},
{
    collection:"product",
    versionKey:false,
    timestamps:true
})
module.exports=mongoose.model("product",product)